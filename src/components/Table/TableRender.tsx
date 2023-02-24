import {
  ColumnDef,
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  //### Filters
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  // getPaginationRowModel,
  FilterFn,
  Row,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { IndeterminateCheckbox } from './components/IndeterminateCheckbox';
import { MainHeader } from './headers/MainHeader';
import { uidDefaultColumn } from './helpers/defaultColumns';
import { defaultSortColumns } from './helpers/defaultSortColumns';
import { TableConfig } from './models/TableOptions';
import css from './styles/table.module.css';
import { DebounceInput } from 'react-debounce-input';


export interface SortCol {
  id: string;
  desc: boolean;
}

interface Props<DataType> {
  dataList: DataType[];
  columnsDef: ColumnDef<DataType, unknown>[];
  onRowSelectionChange?: (rows: DataType[]) => void;
  enableSelection?: boolean;
  onEdit?: (
    rows: DataType[],
    rowIndex: number,
    columnId: string,
    value: any
  ) => void;
  onClick?: (row: DataType) => void;
  initialSelection?: DataType[];
  sortColumns?: SortCol[];
  pinning?: {
    columnPinning: any,
    setColumnPinning: any
  },
  visibility?: {
    setColumnVisibility: any,
    columnVisibility: any
  },
  config?: TableConfig;
  filters?: {
    columnFilters: Array<any>,
    setColumnFilters: any,
    globalFilter: string,
    setGlobalFilter: any
  }
  Pagination?: {
    pagination: any,
    setPagination: any,
    pageCount: number
  }
}

export function TableRenderer<DataType>({
  dataList,
  columnsDef,
  onRowSelectionChange,
  enableSelection = false,
  initialSelection,
  onEdit,
  onClick,
  sortColumns,
  Pagination,
  //Table filters
  filters,
  //columns pinning
  pinning,
  //columns visibility
  visibility,
  //TODO: link all config values:
  config = {
    enableSorting: true,
    enableFilters: true,
    enableResizing: true,
    enableDragging: true,
  },
}: Props<DataType>) {
  const [data, setData] = useState<DataType[]>(() => dataList);
  const [showFilters, setShowFilters] = useState(true)
  const [enableTableConfig, setEnableTableConfig] = useState(true)
  const { pageCount, pagination, setPagination } = Pagination || {}
  const { columnPinning, setColumnPinning } = pinning || {}
  const { setColumnVisibility, columnVisibility } = visibility || {}
  const {
    columnFilters,
    setColumnFilters,
    globalFilter,
    setGlobalFilter
  } = filters || {}
  useEffect(() => {
    setData(dataList);
  }, [dataList]);


  const [columns] = useState(() =>
    enableSelection
      ? [
        {
          id: 'select',
          fixed: "right",
          header: ({ table }: any) => (
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />
          ),
          cell: ({ row }: any) => (
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          ),
        },
        ...columnsDef,
      ]
      : [...columnsDef]
  );

  //TODO: add multi columns check in case sorting is needed for multiple columns in defaultSortColumns.
  if (!sortColumns && columnsDef.includes(uidDefaultColumn)) {
    sortColumns = defaultSortColumns;
  }

  const [sorting, setSorting] = useState<SortingState>(
    sortColumns ? sortColumns : []
  );

  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    columns.map(column => {
      return column.id as string;
    })
  );

  const [rowSelection, setRowSelection] = useState({});

  const fuzzyFilter: FilterFn<any> = (
    row,
    columnId,
    value,
    addMeta
  ): boolean => {
    return true;
  };

  //### Filters
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);


  // console.log({ data })

  const table = useReactTable({
    pageCount,
    data,
    columns,
    //### Filters
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      columnOrder,
      sorting,
      //### Filters
      columnFilters,
      globalFilter,
      rowSelection,
      columnVisibility,
      columnPinning,
      pagination
    },
    columnResizeMode: 'onChange',
    onColumnPinningChange: setColumnPinning,
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: enableSelection,
    enableMultiRowSelection: enableSelection,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    //### Filters
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData(old => {
          return old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          });
        });
        if (onEdit) {
          const editedData: DataType[] = table
            .getRowModel()
            .rows.map(row => row.original);
          onEdit(editedData, rowIndex, columnId, value);
        }
      },
    },
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: false,
    enableFilters: showFilters && enableTableConfig,
    enableColumnResizing: config.enableResizing && enableTableConfig,
    enableSorting: config.enableSorting && enableTableConfig,
    manualPagination: true && enableTableConfig,
  });

  useEffect(() => {
    if (onRowSelectionChange) {
      const selectedData: DataType[] = table
        .getSelectedRowModel()
        .rows.map(row => row.original);
      onRowSelectionChange(selectedData);
    }
  }, [rowSelection]);

  useEffect(() => {
    if (enableSelection && initialSelection) {
      const selectedRowsList: any = {};
      // console.log('ROWs');
      // console.log(initialSelection);
      const rows: Row<any>[] = table.getRowModel().rows;
      //TODO: insurae that all rows passed to table have an id. make them of type DataType extends {id: number}. same applies for dataRow below. I only changed them to any to find index by id not by object comparsion.
      const originalRows: any[] = rows.map(row => row.original);
      initialSelection.forEach((dataRow: any) => {
        // console.log('dataRow ====> ', dataRow);
        // const index = originalRows.indexOf(dataRow);

        const index = originalRows.findIndex(
          original => original.id === dataRow.id
        );

        if (index === -1) {
          throw Error('Could not find dataRow in originalRows');
        }

        // console.log('FOUND AT INDEX ....');
        // console.log(`Original INDEX = ${index}`);
        // console.log(`Row INDEX ${rows[index].id}`);

        // console.log('rows ====> ', rows);
        // console.log('index ====> ', index);
        // console.log('rows[index] ====> ', rows[index]);
        // console.log('rows[index].id ====> ', rows[index].id);
        selectedRowsList[rows[index].id] = true;
      });

      setRowSelection(selectedRowsList);

      // table
      // .getRowModel()
      // .rows.map(row => row.original)
      //TODO: make sure all rows in all tables must have an id. maybe DataType extends {id: number}
      // .forEach((row: DataType) => {
      // if(initialSelection.includes())
      // console.log(row.id);
      // });
    }
  }, [enableSelection, initialSelection]);

  return (
    <div className={css.tableContainer}>
      {/* <GlobalSearch
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      /> */}
      <div className={css.tableHeaderBtn}>
        <button
          className={css.action}
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Hide' : 'Show'} Filters
        </button>

        <button
          className={css.action}
          onClick={() => setEnableTableConfig(!enableTableConfig)}
        >
          {enableTableConfig ? 'Lock' : 'Unlock'} Table
        </button>

        <button
          className={css.action}
          onClick={() => setColumnVisibility({})}
        >
          Show Hidden Columns
        </button>
        <button
        >
          <DebounceInput
            value={globalFilter ?? ''}
            onChange={e => setGlobalFilter(String(e.target.value))}
            className={`${css.filterInput} p-2 font-lg shadow border border-block`}
            placeholder="Search all columns..."
            debounceTimeout={300}
          />
        </button>
      </div>


      <div style={{ overflow: "auto", borderRadius: "16px" }}>
        <table
          {...{
            className: css.table,
            style: {
              width: table.getCenterTotalSize(),
            },
          }}
        >
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <MainHeader
                    key={header.id}
                    header={header}
                    table={table}
                    enableDragging={config.enableDragging}
                    enableTableConfig={enableTableConfig}
                  />
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                className={`${css.tr} ${onClick ? css.trWithOnClick : ''}`}
                onClick={() => {
                  if (onClick) {
                    onClick(row.original);
                  }
                }}
              >
                {row.getVisibleCells().map(cell => (
                  <td
                    {...{
                      key: cell.id,
                      className: css.td,
                      style: {
                        width: cell.column.getSize(),
                        minWidth: cell.column.getSize(),
                        
                        // zIndex: 9,
                        [`${cell.column.getIsPinned()}`]: 0,
                        position: cell.column.getIsPinned() ? "sticky" : "unset"
                      },
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* <div className="flex items-center gap-2  mb-20">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div> */}

<div className={`${css.tablePagination} mt-4 flex items-center gap-2 mb-20`}>
		  	<span className="flex items-center gap-1">
				<div>Page</div>
				<strong>
					{table.getState().pagination.pageIndex + 1} of{' '}
					{table.getPageCount()}
				</strong>
			</span>
        	<span className="flex items-center gap-1">
          		| Go to page:
          		<input
					type="number"
					defaultValue={table.getState().pagination.pageIndex + 1}
					onChange={e => {
						const page = e.target.value ? Number(e.target.value) - 1 : 0
						table.setPageIndex(page)
					}}
					className={css.paginationInput}
          		/>
        	</span>
			<button
				className={css.paginationArrow}
				onClick={() => table.setPageIndex(0)}
				disabled={!table.getCanPreviousPage()}
			>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  					<path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
				</svg>
			</button>
			<button
				className={css.paginationArrow}
				onClick={() => table.previousPage()}
				disabled={!table.getCanPreviousPage()}
			>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  					<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
				</svg>
			</button>
			
        	<select
				value={table.getState().pagination.pageSize}
				className={css.paginationSelect}
				onChange={e => {
					table.setPageSize(Number(e.target.value))
				}}
        	>
          		{[10, 20, 30, 40, 50].map(pageSize => (
					<option key={pageSize} value={pageSize}>
					Show {pageSize}
					</option>
          		))}
        	</select>
			<button
				className={css.paginationArrow}
				onClick={() => table.nextPage()}
				disabled={!table.getCanNextPage()}
			>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  					<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
				</svg>
			</button>
			<button
				className={css.paginationArrow}
				onClick={() => table.setPageIndex(table.getPageCount() - 1)}
				disabled={!table.getCanNextPage()}
			>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  					<path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
				</svg>
			</button>
      	</div>
    </div>
  );
}
