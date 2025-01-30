import { TaskInput } from "./TaskInput";
import { TaskCard } from "./TaskCard";
import { ScrollArea } from "./ui/scroll-area";
import { useGetTasks } from "@/lib/hooks/useGetTasks";

const TaskContainer = () => {

  interface Task {
    id:number,
    title:string,
    content:string,
    isChecked:boolean,
    createdAt:string,
  }
  

  const {data: tasks, status, error} = useGetTasks();

  const handleCheckChange = (id: number, isChecked: boolean) => {
  };

  return (
    <div className="flex flex-col items-center min-h-[89vh] pt-4 ">
      <div className="w-full max-w-4xl mx-auto bg-[#F5F5F5] rounded-lg p-6 h-[calc(100vh-10rem)] flex flex-col">
        
        {/* TaskInput */}
        <div className="sticky top-0 bg-[#F5F5F5] z-10 pb-4">
          <TaskInput />
        </div>

        {/* Divider Line */}
        <div className="border-t border-gray-300 my-4"></div>

        {/* Task Cards */}
        <ScrollArea className="flex-1">
          <div className="space-y-4">
            {tasks?.map((task:Task , taskIndex: number) => (
              <TaskCard
                key={taskIndex}
                id={task.id}
                title={task.title}
                content={task.content}
                isChecked={task.isChecked}
                onCheckChange={handleCheckChange}
              />
            ))}
            {status === 'pending' && <p>Loading...</p>}
            {status == 'error' && <p>Error: {String(error)}</p>}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TaskContainer;