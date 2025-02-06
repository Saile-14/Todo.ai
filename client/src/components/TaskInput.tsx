import { useCreateTask } from '@/lib/hooks/useCreateTask';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';

export function TaskInput() {
  
  const [input, setInput] = useState("")

  const {mutate: createTask} = useCreateTask();

  function handleSubmit() {
    createTask(input);
  }

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="flex grow items-center">
          <Input
            className="mr-0 rounded-r-none h-16 w-full text-2xl"
            type="text"
            placeholder="Enter your task here for an AI generated ToDo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={handleSubmit} className="ml-0 rounded-l-none h-16 px-6" type="submit">
            Add Task
          </Button>
        </div>
      </div>
    </>
  );
}
