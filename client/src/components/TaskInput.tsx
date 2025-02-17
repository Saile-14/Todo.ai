
import { useCreateTask } from '@/lib/hooks/useCreateTask';
import { Button } from './ui/button';

import { useState } from 'react';
import { InputTextBox } from './ui/input-textbox';

export function TaskInput() {
  
  const [input, setInput] = useState("")

  const {mutate: createTask} = useCreateTask();

  function handleSubmit() {
    createTask(input);
    setInput("");
  }

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="flex grow items-center">
          <InputTextBox
            className="mr-0 text-sm rounded-r-none h-16 w-full "
            type="text"
            placeholder="Enter your task here for an AI generated ToDo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={handleSubmit} className="ml-0 rounded-l-none h-16 px-6 text-xl text-white" type="submit">
            Add Task
          </Button>
        </div>
      </div>
    </>
  );
}
