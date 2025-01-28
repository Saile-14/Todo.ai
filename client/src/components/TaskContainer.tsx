import { useState } from "react";
import { TaskInput } from "./TaskInput";
import { TaskCard } from "./TaskCard";
import { ScrollArea } from "./ui/scroll-area"; // Import ScrollArea

const TaskContainer = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Walk The Dog", content: "You should try to walk the dog if its not raining, do not forget the poopbags and also staysafe! a normal walk might take 30 mins", isChecked: false },
    { id: 2, title: "Task 2", content: "This is the second task.", isChecked: true },
    { id: 3, title: "Task 3", content: "This is the third task.", isChecked: false },
    { id: 4, title: "Task 4", content: "This is the fourth task.", isChecked: true },
    { id: 5, title: "Task 5", content: "This is the fifth task.", isChecked: false },
    { id: 6, title: "Task 6", content: "This is the sixth task.", isChecked: true },
    { id: 7, title: "Task 7", content: "This is the seventh task.", isChecked: false },
    { id: 8, title: "Task 8", content: "This is the eighth task.", isChecked: true },
  ]);

  const handleCheckChange = (id: number, isChecked: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isChecked } : task
      )
    );
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
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                content={task.content}
                isChecked={task.isChecked}
                onCheckChange={handleCheckChange}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TaskContainer;