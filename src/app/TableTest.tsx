import { ColumnDef } from '@tanstack/react-table';
import { ZTable } from 'components/Table';

interface Product {
  id: string;
  title: string;
}

export const productColumns: ColumnDef<Product>[] = [
  {
    id: 'id',
    header: 'ID',
    accessorKey: 'id',
    cell: info => info.getValue(),
  },
  {
    id: 'title',
    header: 'Title',
    accessorKey: 'title',
    cell: info => info.getValue(),
  },
  {
    id: 'description',
    header: 'Description',
    accessorKey: 'description',
    cell: info => info.getValue(),
  },
  {
    id: 'price',
    header: 'Price (USD)',
    accessorKey: 'price',
    cell: info => info.getValue(),
  },
];

export const TableTest = () => {
  return (
    <div className='m-4'>
      <ZTable<Product>
        requestPath='https://dummyjson.com/products'
        columnsDef={productColumns}
      />
    </div>
  );
};

export default TableTest;
