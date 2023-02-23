import {
  ColumnDef, PaginationState,
} from '@tanstack/react-table';
import axios from 'axios';
import { useQuery } from 'react-query';
import LoadingSpinner from '../LoadingSpinner';
import { ServerError } from '../ServerError';
import { TableConfig } from './models/TableOptions';
import { TableRenderer } from './TableRender';
import { useState } from "react"

interface Props<DataType> {
  requestPath?: string;
  localData?: DataType[];
  queryId?: string;
  columnsDef: ColumnDef<DataType, unknown>[];
  onClick?: (row: DataType) => void;
  config?: TableConfig;
}

interface APIData<DataType> {
  products: DataType[];
  limit: number;
  skip: number;
  total: number;
}

export function ZTable<DataType>({
  requestPath,
  localData,
  queryId,
  columnsDef,
  onClick,
  config,
}: Props<DataType>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { isLoading, data, isError, error } = useQuery(
    // 'not-enabled' is used to avoid Missing queryFn when the query is not enabled.
    [queryId || requestPath! || 'not-enabled', pagination],
    () => {
      const queryString = `?skip=${pagination.pageIndex}&limit=${pagination.pageSize}`;
      return axios.get((requestPath+queryString)!);
    },
    {
      select: (res): APIData<DataType> => {
        return res?.data;
      },
      onSuccess: data => { },
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

  const {limit=10, total=0, products  }  = data || {}

  return (
    <div>
      {
        <TableRenderer
          columnsDef={columnsDef}
          dataList={products || localData!}
          // onClick={onClick}
          config={config}
          pageCount={total/limit}
          pagination={pagination}
          setPagination={setPagination}
        />
      }
    </div>
  );
}
