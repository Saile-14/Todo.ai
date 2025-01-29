import { api } from "../axios";

export async function deleteTask(taskId: number) {
  return await api.delete(`/tasks/${taskId}`);
}