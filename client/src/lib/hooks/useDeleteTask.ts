import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../mutations/deleteTask";
import { Task } from "@/components/TaskContainer";
import { Variable } from "lucide-react";

export function useDeleteTask ( options?: UseMutationOptions<any, Error, number>) {

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ( taskId: number) => deleteTask(taskId), ...options,
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({queryKey: ['tasks', taskId]});
  
      const previousTasks: Task[] = queryClient.getQueryData(['tasks', taskId]) as Task[];
      
      if (previousTasks) {
        queryClient.setQueryData(['tasks', taskId], () =>
          previousTasks.filter((task: Task) => task.id !== taskId)
        );
      }
  
      return { previousTasks, taskId };
    },
    onError: (_err, taskId , context) => {
      queryClient.setQueryData(['tasks', taskId], context!.previousTasks);
    },
    onSettled: (_newData, _error, taskId ) => {
      queryClient.invalidateQueries({queryKey: ['tasks', taskId]});
  }})
}