/* import { TaskCardProps } from "@/components/TaskCard"; */
import { api } from "../axios";

interface Task {
    id: number,
    title: string,
    content: string,
    isChecked: boolean

}

export interface updateTaskData {
    title?: string,
    content?: string,
    isChecked?: boolean,
}

export async function updateTask(taskId:number , data: updateTaskData): Promise<Task> {
  const response = await api.patch(`/tasks/${taskId}`, data);
  return response.data;
}