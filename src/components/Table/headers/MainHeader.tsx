import { Header, Table, Column } from "@tanstack/react-table";
import { HeaderMenu } from "./HeaderMenu";
import { HeaderResize } from "./HeaderResize";
import { ColumnSortIcon, HeaderSort } from "./HeaderSort";
import { useHeaderDrag } from "../hooks/HeaderDrag";
import css from "../styles/table.module.css";
import { Filter } from "../components/Filter";
import { useEffect, useState } from "react";
import ToolTip from "components/Portals/headerMenuPortal";
import { RiDragMove2Line } from "react-icons/ri";

interface Props<ObjectType> {
  header: Header<ObjectType, unknown>;
  table: Table<ObjectType>;
  enableDragging?: boolean;
  enableTableConfig: boolean;
}

export function MainHeader<T>({ header, table, enableTableConfig }: Props<T>) {
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();
  const { column } = header;
  const [showDraggingIcon, setShowDraggingIcon] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [activeOption, setActiveOption] = useState("")
  const { dropRef, isDragging, previewRef, dragRef } = useHeaderDrag<T>({
    getState,
    setColumnOrder,
    columnOrder,
    column,
  });

  const toggleOnHover = (value: boolean) => {
    if (enableTableConfig) {
      setShowDraggingIcon(value);
      // setShowMenu(value);
    }
  };

  const swappIndexes = (
    source: number,
    destination: number,
    array: string[]
  ) => {
    const sourceValue = array[source];
    const destinationValue = array[destination];
    array[source] = destinationValue;
    array[destination] = sourceValue;
    return [...array];
  };

  const onClickMenuOption = (option: any) => {
    console.log("Active option on click : ", option.action)
    setActiveOption(option.action)
    const { action, column } = option;
    const desiredColumn = table.getColumn(column);
    console.log({ desiredColumn, action, column });
    switch (action) {
      case "Hide": {
        desiredColumn?.toggleVisibility();
        return;
      }
      case "Unsort": {
        desiredColumn?.clearSorting();
        return;
      }
      case "Sort Desending": {
        // optional param 'desc', is a first param of toggleSorting
        desiredColumn?.toggleSorting(true);
        return;
      }
      case "Sort Assending": {
        desiredColumn?.toggleSorting(false);
        return;
      }
      case "Freeze Left": {
        desiredColumn?.pin("left");
        return;
      }
      case "Freeze Right": {
        desiredColumn?.pin("right");
        return;
      }
      case "Unfreeze": {
        desiredColumn?.pin(false);
        return;
      }
      case "Move Start": {
        const sourceIndex = columnOrder.findIndex(
          (order: string) => order === column
        );
        setColumnOrder(swappIndexes(sourceIndex, 0, columnOrder));
        return;
      }
      case "Move End": {
        const sourceIndex = columnOrder.findIndex(
          (order: string) => order === column
        );
        setColumnOrder(
          swappIndexes(sourceIndex, columnOrder.length - 1, columnOrder)
        );
        return;
      }
      case "Move Right": {
        const sourceIndex = columnOrder.findIndex(
          (order: string) => order === column
        );
        if (sourceIndex < columnOrder.length - 1) {
          setColumnOrder(
            swappIndexes(sourceIndex, sourceIndex + 1, columnOrder)
          );
        }
        return;
      }
      case "Move Left": {
        const sourceIndex = columnOrder.findIndex(
          (order: string) => order === column
        );
        if (sourceIndex > 0) {
          setColumnOrder(
            swappIndexes(sourceIndex, sourceIndex - 1, columnOrder)
          );
        }
        return;
      }
    }
  };

  const resetColumnFilters = (column: Column<any>) => {
    column.setFilterValue(null!)
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
          // ...(!header.column.getIsPinned() && {backgroundColor: "rgb(54 57 63)"}),
          // backgroundColor: "yellow",
          ...(header.column.getIsPinned() && { zIndex: 9 }),
          [`${header.column.getIsPinned()}`]: 0,
          ...(header.column.getIsPinned() && { position: "sticky" }),
        },
      }}
      onMouseEnter={() => toggleOnHover(true)}
      onMouseLeave={() => toggleOnHover(false)}
    >
      <div ref={previewRef}>
        <div className={css.headerFlex}>
          <div></div>
          <div className={css.columnDragger} ref={dragRef}>
            {showDraggingIcon && <RiDragMove2Line size={14} />}
          </div>

          {/* <ToolTip
              display={showMenu}
              content={
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
            </ToolTip> */}

          <HeaderSort header={header} />

          <button
            onClick={() => {
              setShowMenu(prev => !prev);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
              />
            </svg>
          </button>

          {showMenu && (
            <HeaderMenu
              showMenu={showMenu}
              setShowMenu={setShowMenu}
              headerId={header.id}
              isFixed={header.column.getIsPinned()}
              onClickMenuOption={onClickMenuOption}
              activeOption={activeOption}
            />
          )}

          <div className={css.headerFlexSpacer} />
          <ColumnSortIcon isSorted={header.column.getIsSorted()} />
        </div>
        {header.column.getCanFilter() ? (
          <div>
            <Filter column={header.column} table={table} />
            <button onClick={() => resetColumnFilters(header.column)}>:x:</button>
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
