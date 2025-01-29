import { api } from "../axios";

export async function updateTask(taskId: number, data: string[]) {
    const response = await api.patch(`/tasks/${taskId}`, data);
    return response.data;
}