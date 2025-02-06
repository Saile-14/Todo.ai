import { TaskInput } from "./TaskInput";
import { TaskCard } from "./TaskCard";
import { ScrollArea } from "./ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export interface Task {
  id:number,
  title:string,
  content:string,
  isChecked:boolean,
  createdAt:string,
}

const TaskContainer = () => {

  
  const taskss = [{id:1, title: "hsdfsd", content:"sdfsdfsdfdsf", isChecked:false, createdAt:"sdlfkjsdlfksj"}, {id:2, title: "Hejjjj", content:"jodåååå", isChecked:true, createdAt:"sdlfkjsdlfksj"}]
  

  /*  const {data: tasks, isError, isPending, error} = useGetTasks(); */

  return (
    <>
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
            {taskss.flatMap((task:Task, taskIndex:number) => {
              if (!task.isChecked) {
                return (<TaskCard
                key={taskIndex}
                id={task.id}
                title={task.title}
                content={task.content}
                isChecked={task.isChecked}
              />)

              }
              })}
            {/* {isPending && <p>Loading...</p>}
            {isError && <p>Error: {String(error)}</p>}
            {tasks! && <p>Error, no tasks found!</p>} */}
          </div>
        </ScrollArea>
        <Accordion className="border-none drop-shadow-none " type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger className="text-center justify-center bg-gray-400">Archive</AccordionTrigger>
    <AccordionContent>
    {taskss.flatMap((task:Task, taskIndex:number) => {
              if (task.isChecked) {
                return (<TaskCard
                key={taskIndex}
                id={task.id}
                title={task.title}
                content={task.content}
                isChecked={task.isChecked}
              />)

              }
              })}
    </AccordionContent>
  </AccordionItem>
</Accordion>
      </div>
      
    </div>
    </>
  );
};

export default TaskContainer;