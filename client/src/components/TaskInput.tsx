import { Button } from './ui/button';
import { Input } from './ui/input';

export function TaskInput() {
  return (
    <>
      <div className="flex w-full justify-center">
        <div className="flex grow items-center">
          <Input
            className="mr-0 rounded-r-none h-16 w-full text-2xl"
            type="text"
            placeholder="Enter your task here for an AI generated ToDo"
          />
          <Button className="ml-0 rounded-l-none h-16 px-6" type="submit">
            Add Task
          </Button>
        </div>
      </div>
    </>
  );
}
