import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/lib/queries/getTasks"

export function useGetTasks () {
    return useQuery({
        queryKey: ['tasks'],
        queryFn: getTasks,
    });
}