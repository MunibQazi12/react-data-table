import { CellContext } from '@tanstack/react-table';

export const uidDefaultColumn = {
  id: 'id',
  header: 'UID',
  accessorKey: 'id',
  cell: (info: CellContext<any, unknown>) => info.getValue(),
};
