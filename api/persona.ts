import type { IPersonaItem } from '@/types/persona';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import api from "@/utils/axios";

// ----------------------------------------------------------------------

interface IGetPersonasQueryParams {
  limit: number;
  offset: number;
  sort?: string | null;
}

const getPersonas = async (params: IGetPersonasQueryParams | undefined) => {
  const queryParams = {
    limit: params?.limit,
    offset: params?.offset,
    sort: params?.sort,
  };

  const resp = await api.get('/v1/personas', {
    params: queryParams,
  });

  return resp.data;
};

export function useGetPersonas(params: IGetPersonasQueryParams) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['personas', params],
    queryFn: () => getPersonas(params),
  });

  const memoizedValue = useMemo(
    () => ({
      personas: (data?.personas as IPersonaItem[]) || [],
      personasTotal: data?.records_total,
      personasLoading: isLoading,
      personasError: error,
      personasEmpty: !isLoading && !data?.personas.length,
      personasRefetch: refetch,
    }),
    [data?.personas, data?.records_total, error, isLoading, refetch]
  );

  return memoizedValue;
}

interface IPersonaItemUpdate {
  id?: string;
  name: string;
}

export const updatePersona = async (data: IPersonaItemUpdate) => {
  const { id, ...rest } = data;
  const resp = await api.put(`/v1/personas/${id}`, rest);

  return resp.data;
};

interface IPersonaItemCreate {
  id?: string;
  name: string;
}

export const createPersona = async (data: IPersonaItemCreate) => {
  const { id, ...rest } = data;
  const resp = await api.post(`/v1/personas`, rest);

  return resp.data;
};
