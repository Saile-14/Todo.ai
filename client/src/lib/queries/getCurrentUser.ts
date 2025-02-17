import { api } from "../axios";

export interface UserId {
  id: number;
}

export const getCurrentUser = async (): Promise<UserId> => {
  const { data } = await api.get('/current-user');
  return data;
};