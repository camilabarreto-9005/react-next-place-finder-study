import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DeleteConfirmation({ onConfirm }) {  

  return (
    <DialogContent className="sm:max-w-sm font-sans">
      <div className="w-full flex flex-col justify-between text-center">
        <DialogTitle className="text-xl">Are you sure?</DialogTitle>
        <DialogDescription className="text-lg">Do you really want to remove this place?</DialogDescription>
        <div className="grid grid-cols-2 gap-4 mt-4 max-sm:grid-cols-1">
          <DialogClose asChild>
          <Button variant="default" onClick={onConfirm} className="bg-lime-700 min-h-[40px]">
            Yes
          </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="default" className="bg-stone-700 min-h-[40px]">No</Button>
          </DialogClose>
        </div>
      </div>
    </DialogContent>
  );
}
