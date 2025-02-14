import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getTasks } from "@/lib/queries/getTasks"
import { Task } from "@/components/TaskContainer";

export function useGetTasks ():  UseQueryResult<Task[],Error> {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });
}