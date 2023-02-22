import { Header, Table } from '@tanstack/react-table';
import { HeaderMenu } from './HeaderMenu';
import { HeaderResize } from './HeaderResize';
import { ColumnSortIcon, HeaderSort } from './HeaderSort';
import { useHeaderDrag } from '../hooks/HeaderDrag';
import css from '../styles/table.module.css';
import { Filter } from '../components/Filter';
import { useState } from 'react';

interface Props<ObjectType> {
  header: Header<ObjectType, unknown>;
  table: Table<ObjectType>;
  enableDragging?: boolean;
}

export function MainHeader<T>({
  header,
  table,
}: Props<T>) {
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();
  const { column } = header;
  const [showDraggingIcon, setShowDraggingIcon] = useState(false)
  const [showMenu, setShowMenu] = useState(false);
  const { dropRef, isDragging, previewRef, dragRef } = useHeaderDrag<T>({
    getState,
    setColumnOrder,
    columnOrder,
    column,
  });

  const toggleOnHover = (value: boolean) => {
    setShowDraggingIcon(value)
    setShowMenu(value)
  }

  return (
    <th
      {...{
        className: css.th,
        ref: dropRef,
        key: header.id,
        colSpan: header.colSpan,
        style: {
          width: header.getSize(),
          opacity: isDragging ? 0.5 : 1,
        },
      }}
      onMouseEnter={() => toggleOnHover(true)}
      onMouseLeave={() => toggleOnHover(false)}
    >
      <div ref={previewRef}>
        <div className={css.headerFlex}>
          {showDraggingIcon && (
            <div className={css.columnDragger} ref={dragRef}>
              <HeaderMenu
                showMenu={showMenu}
                setShowMenu={setShowMenu}
              />
            </div>
          )}
          <HeaderSort header={header} />
          <div className={css.headerFlexSpacer} />
          <ColumnSortIcon isSorted={header.column.getIsSorted()} />
        </div>
        {header.column.getCanFilter() ? (
          <div>
            <Filter column={header.column} table={table} />
          </div>
        ) : null}

        <HeaderResize
          getIsResizing={header.column.getIsResizing}
          getResizeHandler={header.getResizeHandler}
        />
      </div>
    </th>
  );
}
