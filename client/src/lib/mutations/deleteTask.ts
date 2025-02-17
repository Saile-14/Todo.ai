import { api } from "../axios";

export async function deleteTask(id: number): Promise<void>{
  return await api.delete(`/tasks/${id}`);
}