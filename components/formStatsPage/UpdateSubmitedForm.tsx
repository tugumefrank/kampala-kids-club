import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { updateFormPublishedStatus } from "@/lib/actions/formBuilder.actions";
import { Button } from "../ui/button";

const UpdateSubmitedForm = ({ formId }: { formId: string }) => {
  const [newformId, setNewformId] = useState<string>(formId);
  const handleUpdateFormStatus = async () => {
    try {
      // Call the function to update the form's published status to false
      const updatedForm = await updateFormPublishedStatus(formId);
      const { _id: newId } = updatedForm;
      setNewformId(newId);
      console.log(newId);
    } catch (error) {
      console.error("Error updating form status:", error);
    }
  };
  return (
    <>
      <Button
        onClick={handleUpdateFormStatus}
        className="p-0 bg-transparent hover:bg-transparent"
        asChild
      >
        <Link href={`/builder/${newformId}`}>
          <Image
            src="/assets/icons/edit.svg"
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
      </Button>
    </>
  );
};

export default UpdateSubmitedForm;
