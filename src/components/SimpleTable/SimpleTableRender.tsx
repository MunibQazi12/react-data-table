import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './List.module.css';

interface Props<DataType> {
  dataList: DataType[];
  columnsDef: ColumnDef<DataType, unknown>[];
  title: string;
  onAddNavigateTo?: string;
  onAllNavigateTo?: string;
  onRowClick?: (row: DataType) => void;
}

export function SimpleTableRender<DataType>({
  dataList,
  columnsDef,
  title,
  onAddNavigateTo,
  onAllNavigateTo,
  onRowClick,
}: Props<DataType>) {
  const [data, setData] = useState<DataType[]>(() => dataList);

  useEffect(() => {
    setData(dataList);
  }, [dataList]);

  const [columns] = useState(() => [...columnsDef]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const navigate = useNavigate();

  return (
    <div className={css.tableContainer}>
      <div className={css.tableHeader}>
        <div className={css.title}>{title}</div>
        <div className={css.actions}>
          {onAddNavigateTo && (
            <button
              className={css.action}
              onClick={() => {
                navigate(onAddNavigateTo);
              }}
            >
              Add
            </button>
          )}
          {onAllNavigateTo && (
            <button
              className={css.action}
              onClick={() => {
                navigate(onAllNavigateTo);
              }}
            >
              All
            </button>
          )}
        </div>
      </div>
      <table
        {...{
          className: css.table,
          // style: {
          //   width: table.getCenterTotalSize(),
          // },
        }}
      >
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  {...{
                    className: css.th,
                    key: header.id,
                    colSpan: header.colSpan,
                    style: {
                      minWidth: header.getSize(),
                      //   width: header.getSize(),
                    },
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className={css.tr}
              onClick={() => {
                if (onRowClick) {
                  onRowClick(table.getRow(row.id).original);
                }
              }}
            >
              {row.getVisibleCells().map(cell => (
                <td
                  {...{
                    key: cell.id,
                    className: css.td,
                    style: { width: cell.column.getSize() },
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
  );
}
