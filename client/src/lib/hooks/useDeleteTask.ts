import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../mutations/deleteTask";
import { Task } from "@/components/TaskContainer";


export function useDeleteTask ( options?: UseMutationOptions<any, Error, number>) {

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ( id: number) => deleteTask(id), ...options,
    onMutate: async (id) => {
      await queryClient.cancelQueries({queryKey: ['tasks', id]});
  
      const previousTasks: Task[] = queryClient.getQueryData(['tasks', id]) as Task[];
      
      if (previousTasks) {
        queryClient.setQueryData(['tasks', id], () =>
          previousTasks.filter((task: Task) => task.id !== id)
        );
      }
  
      return { previousTasks, id };
    },
    onError: (_err, id , context) => {
      queryClient.setQueryData(['tasks', id], context!.previousTasks);
    },
    onSettled: (_newData, _error, id ) => {
      queryClient.invalidateQueries({queryKey: ['tasks', id]});
  }})
}