import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../mutations/createTask";

export function useCreateTask () {

    const queryClient = useQueryClient()

    const mutate = useMutation({
        mutationFn: createTask,
        onSuccess: () =>  queryClient.invalidateQueries({ queryKey: ['tasks'] }),
        onError: (error) => {console.log('Error creating task', error)},
    })

    return mutate;
}