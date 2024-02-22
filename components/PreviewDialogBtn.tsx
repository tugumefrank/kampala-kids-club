import React from "react";
import { Button } from "./ui/button";
import { MdPreview } from "react-icons/md";
import useDesigner from "./hooks/useDesigner";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { FormElements } from "./FormElements";
import { X } from "lucide-react";
import Image from "next/image";

function PreviewDialogBtn(formImageUrl: any) {
  console.log(formImageUrl);
  const photoValue = formImageUrl && formImageUrl.formImageUrl;
  console.log(photoValue);

  const { elements } = useDesigner();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="gap-2">
          <MdPreview className="h-6 w-6" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-full  max-w-full bg-[#E2E8F0]  dark:bg-slate-950 flex flex-col flex-grow p-0 gap-0 mt-1">
        <div className="px-4 py-2 border-b bg-white  dark:bg-black">
          <p className="text-lg font-bold text-black dark:text-white">
            Form preview
          </p>
          <p className="text-sm text-black dark:text-white">
            This is how your form will look like to your users.
          </p>
        </div>
        <div className="flex flex-col flex-grow items-center justify-center p-4 bg-[#E2E8F0] dark:bg-zinc-900 overflow-y-auto  ">
          {photoValue && (
            <div className="max-w-[760px] flex flex-col gap-4  bg-white dark:bg-black w-full border-t-4 border-indigo-500 rounded-lg mb-10">
              <Image
                src={photoValue}
                alt="hero image"
                width={1000}
                height={1000}
                className="h-full max-h-[200px] object-cover object-center rounded-lg"
              />
            </div>
          )}

          <div className="max-w-[760px] flex flex-col gap-4 flex-grow bg-white dark:bg-black w-full p-8 overflow-y-auto  border-t-8 border-indigo-500 rounded-lg">
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
            className="absolute right-2 top-2 rounded-full p-2 bg-slate-400 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4 " />
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default PreviewDialogBtn;
