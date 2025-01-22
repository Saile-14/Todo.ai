import { TaskInput } from "./TaskInput";
import { TaskCard } from "./TaskCard";
/* import { useState } from "react";
 */
const TaskContainer = () => {
  const tasks = [
    { id: 1, title: "Task 1", content: "This is the first task." },
    { id: 2, title: "Task 2", content: "This is the second task." },
    { id: 3, title: "Task 3", content: "This is the third task." },
  ];



  /* const task = {id:() => {let i = 3; i++}, title:taskTitle, content:()=>{tasktitle*3}}

  const [taskTitle, setTaskTitle] = useState("");
   */

  return (
    <div className="flex flex-col items-center min-h-screen py-8 animated-background">
      <div className="w-full max-w-4xl mx-auto bg-[#F5F5F5] rounded-lg p-6">
        <TaskInput />

        <div className="mt-8 space-y-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              content={task.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskContainer;