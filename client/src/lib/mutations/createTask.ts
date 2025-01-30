import { api } from "../axios";



export async function createTask(task: {title: string, content: string}) {
  const response = await api.post('/tasks', task);
  return response.data;
}