import { CellContext, RowData } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import css from '../styles/table.module.css';

declare module '@tanstack/react-table' {
  //TODO: fix TData not used.
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

interface Props<T> {
  info: CellContext<T, unknown>;
  initValue?: string;
  onBlurFormatter?: (value: string) => string;
}

export function EditableCell<T>({
  info,
  initValue,
  onBlurFormatter,
}: Props<T>) {
  const rowIndex = info.row.index;
  const columnId = info.column.id;

  const [value, setValue] = useState(initValue);

  useEffect(() => {
    if (Number(initValue) !== Number(value)) {
      // console.log('initValue ----------------> ', initValue);
      // console.log('value ----------------> ', value);
      setValue(initValue);
    }
  }, [initValue, value]);

  const onBlur = () => {
    info.table.options.meta?.updateData(rowIndex, columnId, value);
    // console.log('rowIndex ----------------> ', rowIndex);
    // console.log('columnId ----------------> ', columnId);
    // console.log('value ----------------> ', value);
  };

  const input = (
    <div className={css.editableCell}>
      <input
        //TODO: generic:
        type='number'
        value={value as string}
        onChange={event => {
          let value = event.target.value;
          info.table.options.meta?.updateData(rowIndex, columnId, value);
          setValue(value);
        }}
        onBlur={event => {
          let value = event.target.value;
          if (onBlurFormatter) {
            value = onBlurFormatter(value);
          }
          setValue(value);
          onBlur();
        }}
      />
    </div>
  );

  return input;
}

// const onBlur = useCallback(() => {
//   info.table.options.meta?.updateData(rowIndex, columnId, value);
//   console.log('value ----------------> ', value);
//   console.log(info.table.getRowModel().rows);
// }, [value]);

// // const onBlur = () => {
// //   info.table.options.meta?.updateData(rowIndex, columnId, value);
// //   // console.log('rowIndex ----------------> ', rowIndex);
// //   // console.log('columnId ----------------> ', columnId);
// //   // console.log('value ----------------> ', value);
// // };

// useEffect(() => {
//   console.log(' useEffect useEffect');
//   console.log('value = ', initValue);

//   info.table.options.meta?.updateData(rowIndex, columnId, initValue);
//   setValue(initValue);
// }, [initValue]);
