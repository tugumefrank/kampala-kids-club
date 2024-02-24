"use client";
import { formSchema, formSchemaType } from "@/schemas/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";
import { CreateForm } from "@/lib/actions/formBuilder.actions";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/components/hooks/use-media-query";
import React, { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "./ui/drawer";
import { FormFileUploader } from "./shared/FormFileUploader";
import { useUploadThing } from "@/lib/uploadthing";
import { Checkbox } from "./ui/checkbox";

function CreateFormBtn() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const { startUpload } = useUploadThing("imageUploader");

  async function onSubmit(values: formSchemaType) {
    console.log(values);
    let uploadedImageUrl = values.formImageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        toast({
          title: "Error",
          description: "error uploading image",
        });
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    try {
      const formId = await CreateForm({
        ...values,
        formImageUrl: uploadedImageUrl,
      });

      toast({
        title: "Success",
        description: "Form created successfully",
      });

      router.push(`/builder/${formId}`);
    } catch (error) {
      console.error("Error creating form:", error);
      toast({
        title: "Error",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    }
  }

  const renderFormFields = () => (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea rows={isDesktop ? 3 : 5} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="formImageUrl"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Upload Form Banner Image(optional)</FormLabel>
            <FormControl className="h-60">
              <FormFileUploader
                onFieldChange={field.onChange}
                imageUrl={field.value}
                setFiles={setFiles}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                {/* <Image
                      src="/assets/icons/dollar.svg"
                      alt="dollar"
                      width={24}
                      height={24}
                      className="filter-grey"
                    /> */}
                <Input
                  type="number"
                  placeholder="Enter Price in UGX if not a free form "
                  {...field}
                  className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  disabled={form.watch("isFree")}
                />
                <FormField
                  control={form.control}
                  name="isFree"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center">
                          <label
                            htmlFor="isFree"
                            className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Free Form
                          </label>
                          <Checkbox
                            onCheckedChange={field.onChange}
                            checked={field.value}
                            id="isFree"
                            className="mr-2 h-5 w-5 border-2 border-primary-500"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        onClick={form.handleSubmit(onSubmit)}
        disabled={form.formState.isSubmitting}
        className="w-full mt-6"
      >
        {!form.formState.isSubmitting && <span>Save</span>}
        {form.formState.isSubmitting && <ImSpinner2 className="animate-spin" />}
      </Button>
    </form>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={"outline"}
            className="group border border-primary h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
          >
            <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
            <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
              Create new form
            </p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[620px]  bg-slate-200 ">
          <DialogHeader>
            <DialogTitle>Create form</DialogTitle>
            <DialogDescription>
              Create a new form to start collecting responses
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>{renderFormFields()}</Form>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant={"outline"}
          className="group border border-primary h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
        >
          <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
          <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
            Create new form
          </p>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="  bg-slate-200 p-4">
        <DrawerHeader className="text-center">
          <DrawerTitle>Create form</DrawerTitle>
          <DrawerDescription>
            Create a new form to start collecting responses
          </DrawerDescription>
        </DrawerHeader>
        <Form {...form}>{renderFormFields()}</Form>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default CreateFormBtn;
