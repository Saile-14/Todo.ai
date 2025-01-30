import { ReactEventHandler, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useCreateTask } from '@/lib/hooks/useCreateTask';
import { MutateOptions } from '@tanstack/react-query';

export function TaskInput() {

  const [title, setTitle] = useState("");
  const {mutate, isPending, error} = useCreateTask();

  const handleSubmit = async () => {
    mutate({title: title, content: title.repeat(3)})
    setTitle("");
  }

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="flex grow items-center">
          <Input
            className="mr-0 rounded-r-none h-16 w-full text-2xl"
            type="text"
            placeholder="Enter your task here for an AI generated ToDo"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <Button onClick={handleSubmit} className="ml-0 rounded-l-none h-16 px-6" type="submit">
            Add Task
          </Button>
        </div>
      </div>
    </>
  );
}
