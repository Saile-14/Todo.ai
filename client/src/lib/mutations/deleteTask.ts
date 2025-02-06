import { api } from "../axios";

export async function deleteTask(taskId: number): Promise<void>{
  console.log("taskid in deletetask", taskId)
  return await api.delete(`/tasks/${taskId}`);
}