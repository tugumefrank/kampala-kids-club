import useDesigner from "@/components/hooks/useDesigner";
import { toast } from "@/components/ui/use-toast";
import { UpdateFormContent } from "./actions/formBuilder.actions";

export const updateFormContent = async (id: string) => {
  const { elements } = useDesigner();

  try {
    const jsonElements = JSON.stringify(elements);
    await UpdateFormContent(id, jsonElements);
    toast({
      title: "Success",
      description: "Your form has been saved",
    });
  } catch (error) {
    toast({
      title: "Error",
      description: "Something went wrong",
      variant: "destructive",
    });
  }
};
