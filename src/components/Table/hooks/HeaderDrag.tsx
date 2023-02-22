import {
  Column,
  ColumnOrderState,
  TableState,
  Updater,
} from '@tanstack/react-table';
import { useDrag, useDrop } from 'react-dnd';
import { HeaderReorder } from '../headers/HeaderReorder';

interface Props<ObjectType> {
  getState: () => TableState;
  setColumnOrder: (updater: Updater<ColumnOrderState>) => void;
  columnOrder: ColumnOrderState;
  column: Column<ObjectType, unknown>;
}

export function useHeaderDrag<T>({
  getState,
  setColumnOrder,
  columnOrder,
  column,
}: Props<T>) {
  const [, dropRef] = useDrop({
    accept: 'column',
    drop: (draggedColumn: Column<T>) => {
      const newColumnOrder = HeaderReorder(
        draggedColumn.id,
        column.id,
        columnOrder
      );
      setColumnOrder(newColumnOrder);
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: 'column',
  });

  return { dropRef, isDragging, previewRef, dragRef };
}
// import { Column, flexRender, Header, Table } from '@tanstack/react-table';
// import { useDrag, useDrop } from 'react-dnd';
// import { Reorder } from './Reorder';
// import { ColumnMenu } from './ColumnMenu';
// import { ColumnSort, ColumnSortIcon } from './ColumnSort';
// import { ColumnResize } from './ColumnResize';

// interface Props<ObjectType> {
//   header: Header<ObjectType, unknown>;
//   table: Table<ObjectType>;
// }

// export function ColumnDrag<T>({ header, table }: Props<T>) {
//   const { getState, setColumnOrder } = table;
//   const { columnOrder } = getState();
//   const { column } = header;

//   const [, dropRef] = useDrop({
//     accept: 'column',
//     drop: (draggedColumn: Column<T>) => {
//       const newColumnOrder = Reorder(draggedColumn.id, column.id, columnOrder);
//       setColumnOrder(newColumnOrder);
//     },
//   });

//   const [{ isDragging }, dragRef, previewRef] = useDrag({
//     collect: monitor => ({
//       isDragging: monitor.isDragging(),
//     }),
//     item: () => column,
//     type: 'column',
//   });

//   return (
//     <th
//       {...{
//         ref: dropRef,
//         key: header.id,
//         colSpan: header.colSpan,
//         style: {
//           width: header.getSize(),
//           opacity: isDragging ? 0.5 : 1,
//         },
//       }}
//     >
//       <div ref={previewRef}>
//         <div className='headerFlex'>
//           <div className='columnDragger' ref={dragRef}>
//             <ColumnMenu />
//           </div>
//           <ColumnSort header={header} />
//           <div className='headerFlexSpacer' />
//           <ColumnSortIcon isSorted={header.column.getIsSorted()} />
//         </div>
//         <ColumnResize
//           getIsResizing={header.column.getIsResizing}
//           getResizeHandler={header.getResizeHandler}
//         />
//       </div>
//     </th>
//   );
// }
