import { Ellipsis } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useUpdateTask } from "@/lib/hooks/useUpdateTask";
import { useDeleteTask } from "@/lib/hooks/useDeleteTask";

export function TaskOptionsButton({initialTitle, initialContent, id}: {initialTitle:string, initialContent:string, id:number}) {

  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const {mutate: updateTask} = useUpdateTask();
  const {mutate: deleteTask} = useDeleteTask();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  function handleEditSubmit() {
    updateTask({taskId: id, data:{ title: title, content: content}})
  }

  function handleDeleteSubmit() { 
    console.log(id);
    deleteTask(id);
  }

  

  return (
    <>
     <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="" onCloseAutoFocus={(e) => e.preventDefault()}>
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem className="w-full text-center justify-center" onSelect={(e) => e.preventDefault()}>
                Edit task
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="container" onCloseAutoFocus={(e) => e.preventDefault()}>
              <DialogTitle>Edit</DialogTitle>
              <Input className="text-left font-semibold" value={title} placeholder="Title" onChange={(e)=>setTitle(e.target.value)}/>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message">Description</Label>
                <Textarea value={content} onChange={(e)=>setContent(e.target.value)} rows={6} placeholder="Task Description!" className="mi"/>
              </div> 
              <div className="flex justify-end space-x-4">
                <DialogClose asChild>
                  <Button onClick={() => handleEditSubmit()} variant="outline" size="sm">Apply</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button size="sm">Close</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
          <DropdownMenuSeparator />
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem className="w-full text-center justify-center" onSelect={(e) => e.preventDefault()}>
                Delete task
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent onCloseAutoFocus={(e) => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete task {id}.
                </DialogDescription>
                <div className="flex justify-end space-x-4">
                  <DialogClose asChild>
                    <Button onClick={() => handleDeleteSubmit()} variant="destructive" size="sm">Confirm</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button size="sm">Close</Button>
                  </DialogClose>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>  
      
    </>
  );
}