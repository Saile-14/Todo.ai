import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { AlertDialogContent } from "@radix-ui/react-alert-dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";


export function TaskOptionsButton({initialTitle, initialContent, id}: {initialTitle:string, initialContent:string, id:number}) {

    const [title, setTitle] = useState(initialTitle)
    const [content, setContent] = useState(initialContent)

    return (
    <>
        <DropdownMenu >
            <DropdownMenuTrigger ><Ellipsis /></DropdownMenuTrigger>
            <DropdownMenuContent className="" onClick={(e)=>e.stopPropagation()} onCloseAutoFocus={(e) => e.preventDefault()}>
    <Dialog >
      <DialogTrigger className="w-full text-center justify-center">
        <DropdownMenuItem className="w-full text-center justify-center" onSelect={(e) => e.preventDefault()} >
          Update task
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="container" onCloseAutoFocus={(e) => e.preventDefault()} >
          <DialogTitle>Update form</DialogTitle>
          <Input value={title}
              placeholder="Title"
              onChange={(e)=>setTitle(e.target.value)}/>
            <div className="grid w-full gap-1.5">
                <Label htmlFor="message">Description</Label>
                <Textarea value={content} onChange={(e)=>setContent(e.target.value)} rows={6} placeholder="Task Description!" className="mi"/>
            </div>
          
      </DialogContent>
    </Dialog>
    <DropdownMenuSeparator />
    <Dialog>
      <DialogTrigger className="w-full text-center justify-center">
        <DropdownMenuItem className="w-full text-center justify-center" onSelect={(e) => e.preventDefault()}>
          Delete task
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent /* className="container" */ onCloseAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete
            task {id}.
          </DialogDescription>
          <div className="flex justify-end space-x-4">
            <Button variant="destructive" size="sm">Confirm</Button>
            <DialogClose asChild>
                <Button size="sm">
                    Close
                </Button>
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