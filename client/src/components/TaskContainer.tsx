import { TaskInput } from "./TaskInput";
import { TaskCard } from "./TaskCard";
import { ScrollArea } from "./ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { useGetTasks } from "@/lib/hooks/useGetTasks";

export interface Task {
  id:number,
  title:string,
  description:string,
  checked:boolean,
}


const TaskContainer = () => {

  
  /* const taskss = [{id:1, title: "hsdfsd", content:"sdfsdfsdfdsf", checked:false, createdAt:"sdlfkjsdlfksj"}, {id:2, title: "Hejjjj", content:"jodåååå", checked:true, createdAt:"sdlfkjsdlfksj"}] */
  
  const {data: tasks} = useGetTasks();
  console.log(tasks)
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
            {tasks ? tasks.flatMap((task:Task, taskIndex:number) => {
              if (!task.checked) {
                return (<TaskCard
                key={taskIndex}
                id={task.id}
                title={task.title}
                description={task.description}
                checked={task.checked}
              />)

              }
              }) : null}
            
            {/* {isPending && <p>Loading...</p>}
            {isError && <p>Error: {String(error)}</p>}
            {tasks! && <p>Error, no tasks found!</p>} */}
          </div>
        </ScrollArea>
        {/* <Accordion className="border-none drop-shadow-none " type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger className="text-center justify-center bg-gray-400">Archive</AccordionTrigger>
    <AccordionContent>
    {taskss.flatMap((task:Task, taskIndex:number) => {
              if (task.checked) {
                return (<TaskCard
                key={taskIndex}
                id={task.id}
                title={task.title}
                content={task.content}
                checked={task.checked}
              />)

              }
              })}
    </AccordionContent>
  </AccordionItem>
</Accordion> */}
<Accordion className="border-none drop-shadow-none" type="single" collapsible>
  <AccordionItem value="item-1">
    {/* Folder Tab Styling for AccordionTrigger */}
    <AccordionTrigger
      className="justify-center rounded-t-xl   hover:no-underline backface-hidden bg-gray-300 max-w-40 max-h-20 mx-auto ml-0 [clip-path:polygon(0_60%,71%_60%,100%_100%,0%_100%)] transition-transform duration-300  relative"
    >
      {/* Archive Text */}
      <span className="pt-12 pr-4">
    Archive
  </span>
    </AccordionTrigger>
    <AccordionContent className="border-t-2">
    {tasks ? tasks.flatMap((task:Task, taskIndex:number) => {
              if (task.checked) {
                return (<TaskCard
                key={taskIndex}
                id={task.id}
                title={task.title}
                description={task.description}
                checked={task.checked}
              />)

              }
              }) : null}
    </AccordionContent>
  </AccordionItem>
</Accordion>
      </div>
      
    </div>
    </>
  );
};

export default TaskContainer;