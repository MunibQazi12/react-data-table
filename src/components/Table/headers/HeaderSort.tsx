import { flexRender, Header, SortDirection } from '@tanstack/react-table';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import css from '../styles/table.module.css';

interface Props<ObjectType> {
  header: Header<ObjectType, unknown>;
}

export function HeaderSort<T>({ header }: Props<T>) {
  return (
    <div>
      <div
        {...{
          className: header.column.getCanSort() ? css.sortDiv : '',
          onClick: header.column.getToggleSortingHandler(),
        }}
      >
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
      </div>
    </div>
  );
}

interface IconProps {
  isSorted: false | SortDirection;
}

export function ColumnSortIcon({ isSorted }: IconProps) {
  return (
    <div>
      {{
        asc: <GoTriangleDown className={css.sortIcon} size={16} />,
        desc: <GoTriangleUp className={css.sortIcon} size={16} />,
        false: (
          <GoTriangleUp
            className={css.sortIcon}
            color='transparent'
            size={16}
          />
        ),
      }[isSorted as string] ?? null}
    </div>
  );
}
