/* import { TaskCardProps } from "@/components/TaskCard"; */
import { api } from "../axios";

interface Task {
    id: number,
    title: string,
    description: string,
    checked: boolean

}

export interface updateTaskData {
    title?: string,
    description?: string,
    checked?: boolean,
}

export async function updateTask(id:number , data: updateTaskData): Promise<Task> {
  const response = await api.put(`/tasks/${id}`, data);
  return response.data;
}