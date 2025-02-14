import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { updateTask, updateTaskData } from "../mutations/updateTask";
/* import { TaskCardProps } from "@/components/TaskCard"; */

export type updateTaskVariables = {
    id: number,
    data: updateTaskData,
}

export function useUpdateTask (
  options?: UseMutationOptions<any , Error, updateTaskVariables>
) {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: updateTaskVariables) => updateTask(variables.id, variables.data), ...options,
    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['tasks'] })
        
      // Snapshot the previous value
      const previousTodo = queryClient.getQueryData(['tasks'])
        
      // Optimistically update to the new value
      queryClient.setQueryData(['tasks'], newTodo)
        
      // Return a context with the previous and new todo
      return { previousTodo, newTodo }
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(
        ['todos', context!.newTodo.id],
              context!.previousTodo,
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
        

  })
}