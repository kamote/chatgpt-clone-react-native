import api from "@/utils/axios";

export interface ICredentials {
  email: string;
  password: string;
}

export const login = async (payload: ICredentials) => {
  const resp = await api.post(`/api/v1/auth/login`, payload);

  return resp.data;
};