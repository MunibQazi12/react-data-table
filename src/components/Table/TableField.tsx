import { ColumnDef } from '@tanstack/react-table';
import { SortCol, TableRenderer } from './TableRender';
import { useField } from 'formik';
import { uidDefaultColumn } from './helpers/defaultColumns';
import { defaultSortColumns } from './helpers/defaultSortColumns';

interface Props<DataType> {
  columnsDef: ColumnDef<DataType, unknown>[];
  data: DataType[];
  onRowSelectionChange?: (rows: DataType[]) => void;
  onEdit?: (
    rows: DataType[],
    rowIndex: number,
    columnId: string,
    value: any
  ) => void;
  enableSelection?: boolean;
  name: string;
  sortColumns?: SortCol[];
}

export function TableField<DataType>({
  columnsDef,
  data,
  enableSelection = false,
  onRowSelectionChange,
  onEdit,
  sortColumns,
  ...props
}: Props<DataType>) {
  const [field, meta, helper] = useField(props);

  // console.log('data data data data data data data data data ');
  // console.log(props.name);
  // console.log(data);

  return (
    <div>
      <div>
        <TableRenderer
          {...field}
          {...props}
          columnsDef={columnsDef}
          dataList={data}
          sortColumns={sortColumns}
          initialSelection={meta.initialValue}
          enableSelection={enableSelection}
          onRowSelectionChange={(rows: DataType[]) => {
            helper.setValue(rows);
            if (onRowSelectionChange) {
              onRowSelectionChange(rows);
            }
          }}
          onEdit={(
            rows: DataType[],
            rowIndex: number,
            columnId: string,
            value: any
          ) => {
            helper.setValue(rows);
            if (onEdit) {
              onEdit(rows, rowIndex, columnId, value);
            }
          }}
        />
      </div>
    </div>
  );
}
