import { FilterField } from './FilterField';

interface Props {
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const GlobalSearch = ({ globalFilter, setGlobalFilter }: Props) => {
  return (
    <FilterField
      value={globalFilter ?? ''}
      onChange={value => setGlobalFilter(String(value))}
      className='p-2 font-lg shadow border border-block'
      placeholder='Search all columns...'
    />
  );
};
