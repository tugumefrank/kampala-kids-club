import React from "react";
import { Button } from "./ui/button";
import { MdPreview } from "react-icons/md";
import useDesigner from "./hooks/useDesigner";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { FormElements } from "./FormElements";
import { X } from "lucide-react";

function PreviewDialogBtn() {
  const { elements } = useDesigner();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="gap-2">
          <MdPreview className="h-6 w-6" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full bg-[#E2E8F0]  dark:bg-slate-950 flex flex-col flex-grow p-0 gap-0">
        <div className="px-4 py-2 border-b">
          <p className="text-lg font-bold text-black dark:text-white">
            Form preview
          </p>
          <p className="text-sm text-black dark:text-white">
            This is how your form will look like to your users.
          </p>
        </div>
        <div className="bg-accent flex flex-col flex-grow items-center justify-center p-4 bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-y-auto">
          <div className="max-w-[700px] flex flex-col gap-4 flex-grow bg-[#E2E8F0] dark:bg-slate-950 h-full w-full rounded-2xl p-8 overflow-y-auto">
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent;
              return (
                <FormComponent key={element.id} elementInstance={element} />
              );
            })}
          </div>
        </div>
        <DialogClose asChild>
          <button
            className="absolute right-4 top-4 rounded-full p-2 bg-slate-400 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            aria-label="Close"
          >
            <X className="h-6 w-6 " />
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default PreviewDialogBtn;
