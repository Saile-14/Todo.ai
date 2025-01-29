import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../mutations/updateTask";

export function useUpdateTask (data:string[]) {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (taskId:number) => updateTask(taskId, data),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['todos']})

    })
}