import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { useQuery } from 'react-query';
import LoadingSpinner from '../LoadingSpinner';
import { ServerError } from '../ServerError';
import { SimpleTableRender } from './SimpleTableRender';

interface Props<DataType> {
  requestPath: string;
  queryId?: string;
  columnsDef: ColumnDef<DataType, unknown>[];
  title: string;
  onAddNavigateTo?: string;
  onAllNavigateTo?: string;
  onRowClick?: (row: DataType) => void;
}

function SimpleTable<DataType>({
  requestPath,
  queryId,
  columnsDef,
  title,
  onAddNavigateTo,
  onAllNavigateTo,
  onRowClick,
}: Props<DataType>) {
  const { isLoading, data, isError, error } = useQuery(
    queryId || requestPath,
    () => {
      return axios.get(requestPath);
    },
    {
      select: (res): DataType[] => {
        return res?.data.data.rows;
      },
    }
  );

  if (isError) {
    console.log(error);
    return <ServerError />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {data !== undefined && (
        <SimpleTableRender
          columnsDef={columnsDef}
          dataList={data}
          title={title}
          onAddNavigateTo={onAddNavigateTo}
          onAllNavigateTo={onAllNavigateTo}
          onRowClick={onRowClick}
        />
      )}
    </div>
  );
}

export default SimpleTable;
