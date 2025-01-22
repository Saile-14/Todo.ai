import { Checkbox } from "./ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface TaskCardProps {
  id: number;
  title: string;
  content: string;
  isChecked: boolean;
  onCheckChange: (id: number, isChecked: boolean) => void;
}

export const TaskCard = ({ id, title, content, isChecked, onCheckChange }: TaskCardProps) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value={`item-${id}`}
        className="border-b-0 rounded-lg  hover:bg-gray-50 transition-colors"
      >
        {/* Wrap the entire card content in AccordionTrigger */}
        <AccordionTrigger className="w-full text-left hover:no-underline p-4">
          <div className="flex items-center space-x-4 w-full">

            {/* Checkbox */}
            <div
              onClick={(e) => e.stopPropagation()} 
              className="flex-none" 
            >
              <label htmlFor={`task-${id}`} className="cursor-pointer">
                <Checkbox
                  id={`task-${id}`}
                  checked={isChecked}
                  onCheckedChange={(checked) => onCheckChange(id, checked as boolean)}
                />
              </label>
            </div>

            {/* Title */}
            <div className="text-lg font-medium flex-1">
              {title}
            </div>
          </div>
        </AccordionTrigger>

        {/* Content */}
        <AccordionContent className="px-4 pb-4 text-center text-gray-600 overflow-hidden data-[state=open]:animate-accordion-open data-[state=closed]:animate-accordion-close">
          <div className="pt-2">
            {content}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};