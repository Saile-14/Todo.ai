import { Checkbox } from "./ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { TaskOptionsButton } from "./TaskOptionsButton";
import { updateTaskVariables, useUpdateTask } from "@/lib/hooks/useUpdateTask";

export interface TaskCardProps {
  id: number;
  title: string;
  description: string;
  checked: boolean;
  createdAt?: Date;
}

export const TaskCard = ({ id, title, description, checked }: TaskCardProps) => {
  const {mutate: updateTask} = useUpdateTask();
  function onCheckChange(variables: updateTaskVariables) {
  
    updateTask(variables)
  }
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value={`item-${id}`}
        className="border-b-0 rounded-lg  hover:bg-gray-50 transition-colors"
      >
        {/* Wrap the entire card content in AccordionTrigger */}
        <AccordionTrigger className="w-full rounded-lg text-left hover:no-underline p-4">
          <div className="flex items-center w-full">


            {/* Checkbox */}
            <div
              
              className="flex-none" 
            >
              <label htmlFor={`task-${id}`} className="cursor-pointer" onClick={(e) => e.stopPropagation()} >
                <Checkbox
                  id={`task-${id}`}
                  checked={checked}
                  onCheckedChange={(checked) => onCheckChange({id: id, data:{checked:checked as boolean}})}
                  className="w-8 h-8"
                  
                />
              </label>
            </div>

            {/* Title */}
            <div className="text-2xl ml-6  font-medium ">
              {title}
            </div>
            <div className="ml-auto mr-8">
              <TaskOptionsButton initialTitle={title} initialContent={description} id={id} />
            </div>
          
          </div>
        </AccordionTrigger>
        

        {/* Content */}
        <AccordionContent className="px-12 pb-4  font-light text-lg overflow-hidden data-[state=open]:animate-accordion-open data-[state=closed]:animate-accordion-close">
          <div className="pt-2">
            {description}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};