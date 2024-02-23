import React from "react";
import { GetForms } from "@/lib/actions/formBuilder.actions";
import FormCard from "@/components/formStatsPage/FormCard";
import NoFormsCard from "@/components/formStatsPage/NoFormsCard";

export default async function FormCards({
  searchText,
}: {
  searchText: string;
}) {
  const forms = await GetForms({
    query: searchText,
  });
  console.log(forms);
  if (!forms || forms.length === 0) {
    return <NoFormsCard />;
  }
  return (
    <>
      {forms?.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}
