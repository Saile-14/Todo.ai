import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // adjust the import path as needed
import { Button } from "@/components/ui/button"; // adjust the import path as needed

const ArchiveDrawer: React.FC = () => {
  return (
    <div className="relative w-4/5 h-[500px] mx-auto mt-12 border border-gray-300 rounded-md overflow-hidden bg-white">
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
