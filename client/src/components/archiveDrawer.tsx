import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // adjust the import path as needed
import { Button } from "@/components/ui/button"; // adjust the import path as needed

const ArchiveDrawer: React.FC = () => {
  return (
    <div className="relative">
      {/* Folder Tab */}
      <div
  className="w-40 h-12 bg-blue-500 cursor-pointer transition-transform duration-300 hover:translate-y-[-10px]"
  style={{ clipPath: "polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)" }}
>
        <p className="text-white text-center pt-3">Click Me</p>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <h1 className="text-xl font-semibold mb-4">Task Container</h1>
        <p>Your main content goes here.</p>
      </div>

      {/* Shadcn Sheet Component */}
      <Sheet>
        {/* Use asChild so the button can be styled with shadcn/tailwind components */}
        <SheetTrigger asChild>
          <div className="absolute bottom-4 right-4">
            <Button variant="default">Open Menu</Button>
          </div>
        </SheetTrigger>

        {/* SheetContent: specifying `side="bottom"` makes it slide up from the bottom */}
        <SheetContent side="bottom" className="rounded-t-md">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Slide-Up Menu</h2>
            <p>This is your slide-up menu content.</p>
            {/* You can add more interactive content here */}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ArchiveDrawer;
