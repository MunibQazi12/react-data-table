import { Header, Table } from '@tanstack/react-table';
import { HeaderMenu } from './HeaderMenu';
import { HeaderResize } from './HeaderResize';
import { ColumnSortIcon, HeaderSort } from './HeaderSort';
import { useHeaderDrag } from '../hooks/HeaderDrag';
import css from '../styles/table.module.css';
import { Filter } from '../components/Filter';
import { useState } from 'react';
import ToolTip from 'components/Portals/headerMenuPortal';
import { RiDragMove2Line } from 'react-icons/ri';


interface Props<ObjectType> {
  header: Header<ObjectType, unknown>;
  table: Table<ObjectType>;
  enableDragging?: boolean;
  enableTableConfig: boolean
}

export function MainHeader<T>({
  header,
  table,
  enableTableConfig
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
    if (enableTableConfig) {
      setShowDraggingIcon(value)
      setShowMenu(value)
    }
  }


  const swappIndexes = (source: number, destination: number, array: string[]) => {
    const sourceValue = array[source]
    const destinationValue = array[destination]
    array[source] = destinationValue
    array[destination] = sourceValue
    return [...array]
  }

  const onClickMenuOption = (option: any) => {
    const { action, column } = option
    const desiredColumn = table.getColumn(column)
    console.log({ desiredColumn, action, column })
    switch (action) {
      case 'Hide': {
        desiredColumn?.toggleVisibility()
        return
      }
      case 'Unsort': {
        desiredColumn?.clearSorting()
        return
      }
      case 'Sort Desending': {
        // optional param 'desc', is a first param of toggleSorting 
        desiredColumn?.toggleSorting(true)
        return
      }
      case 'Sort Assending': {
        desiredColumn?.toggleSorting(false)
        return
      }
      case 'Freeze Left': {
        desiredColumn?.pin('left')
        return
      }
      case 'Freeze Right': {
        desiredColumn?.pin('right')
        return
      }
      case 'Unfreeze': {
        desiredColumn?.pin(false)
        return
      }
      case 'Move Start': {
        const sourceIndex = columnOrder.findIndex((order: string) => order === column)
        setColumnOrder(swappIndexes(sourceIndex, 0, columnOrder))
        return
      }
      case 'Move End': {
        const sourceIndex = columnOrder.findIndex((order: string) => order === column)
        setColumnOrder(swappIndexes(sourceIndex, (columnOrder.length - 1), columnOrder))
        return
      }
      case 'Move Right': {
        const sourceIndex = columnOrder.findIndex((order: string) => order === column)
        if (sourceIndex < (columnOrder.length - 1)) {
          setColumnOrder(swappIndexes(sourceIndex, (sourceIndex + 1), columnOrder))
        }
        return
      }
      case 'Move Left': {
        const sourceIndex = columnOrder.findIndex((order: string) => order === column)
        if (sourceIndex > 0) {
          setColumnOrder(swappIndexes(sourceIndex, (sourceIndex - 1), columnOrder))
        }
        return
      }
    }
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
          minWidth: header.column.getSize(),
          backgroundColor: "rgb(54 57 63)",
          // zIndex: 9,
          [`${header.column.getIsPinned()}`]: 0,
          [header.column.getIsPinned() ? 'position' : '']: "sticky"
        }
      }}
      onMouseEnter={() => toggleOnHover(true)}
      onMouseLeave={() => toggleOnHover(false)}
    >
      <div ref={previewRef}>
        <div className={css.headerFlex}>
          {showDraggingIcon &&
            <div className={css.columnDragger} ref={dragRef}>
              <RiDragMove2Line size={14} />
            </div>
          }

          <ToolTip display={showMenu} content={
            <HeaderMenu
              showMenu={showMenu}
              setShowMenu={setShowMenu}
              headerId={header.id}
              isFixed={header.column.getIsPinned()}
              onClickMenuOption={onClickMenuOption}
            />
          }
          >
            <HeaderSort header={header} />
          </ToolTip>

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
    </th >
  );
}
