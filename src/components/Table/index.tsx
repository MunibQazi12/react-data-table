import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { useQuery } from 'react-query';
import LoadingSpinner from '../LoadingSpinner';
import { ServerError } from '../ServerError';
import { TableConfig } from './models/TableOptions';
import { TableRenderer } from './TableRender';

interface Props<DataType> {
  requestPath?: string;
  localData?: DataType[];
  queryId?: string;
  columnsDef: ColumnDef<DataType, unknown>[];
  onClick?: (row: DataType) => void;
  config?: TableConfig;
}

export function ZTable<DataType>({
  requestPath,
  localData,
  queryId,
  columnsDef,
  onClick,
  config,
}: Props<DataType>) {
  const { isLoading, data, isError, error } = useQuery(
    // 'not-enabled' is used to avoid Missing queryFn when the query is not enabled.
    queryId || requestPath! || 'not-enabled',
    () => {
      return axios.get(requestPath!);
    },
    {
      select: (res): DataType[] => {
        return res?.data.products;
      },
      onSuccess: data => {},
      refetchOnReconnect: 'always',
      refetchOnWindowFocus: 'always',
      refetchOnMount: 'always',
      enabled: !!requestPath,
    }
  );

  if (!!requestPath) {
    if (isError) {
      console.log(error);
      return <ServerError />;
    }

    if (isLoading) {
      return <LoadingSpinner />;
    }
  } else {
    if (!localData) {
      return <h1>TABLE ERROR :: Please Provide a valid data source</h1>;
    }
  }

  return (
    <div>
      {
        <TableRenderer
          columnsDef={columnsDef}
          dataList={data !== undefined ? data : localData!}
          onClick={onClick}
          config={config}
        />
      }
    </div>
  );
}
