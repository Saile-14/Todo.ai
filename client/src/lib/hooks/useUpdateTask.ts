import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { updateTask, updateTaskData } from "../mutations/updateTask";
import { Task } from "@/components/TaskContainer";
/* import { TaskCardProps } from "@/components/TaskCard"; */

export type updateTaskVariables = {
    taskId: number,
    data: updateTaskData,
}

export function useUpdateTask (
  options?: UseMutationOptions<any , Error, updateTaskVariables>
) {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: updateTaskVariables) => updateTask(variables.taskId, variables.data), ...options,
    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['tasks', newTodo.taskId] })
        
      // Snapshot the previous value
      const previousTodo = queryClient.getQueryData(['tasks', newTodo.taskId])
        
      // Optimistically update to the new value
      queryClient.setQueryData(['tasks', newTodo.taskId], newTodo)
        
      // Return a context with the previous and new todo
      return { previousTodo, newTodo }
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(
        ['todos', context!.newTodo.taskId],
              context!.previousTodo,
      )
    },
    onSettled: (newTodo) => {
      queryClient.invalidateQueries({ queryKey: ['tasks', newTodo.taskId] })
    },
        

  })
}