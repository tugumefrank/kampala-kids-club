"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import Image from "next/image";

import { DeleteFormConfirmation } from "./DeleteFormConfirmation";
import { useRouter } from "next/navigation";
import UpdateSubmitedForm from "./UpdateSubmitedForm";

export default function FormCard({ form }: { form: any }) {
  console.log(form);
  console.log(form.content);
  const contentArray = JSON.parse(form.content);
  console.log(contentArray);
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate capitalize text-[16px] max-w-[110px] font-bold sm:max-w-[200px] sm:text-lg">
            {form.name}
          </span>
          {form.published && (
            <div className="bg-red  flex items-center justify-end gap-2">
              <Badge>Published</Badge>
              <div className=" flex  gap-2 rounded-xl bg-white   transition-all">
                <UpdateSubmitedForm formId={form._id} />
                <DeleteFormConfirmation formId={form._id} />
              </div>
            </div>
          )}

          {!form.published && (
            <div className="bg-red  flex items-center justify-end gap-2">
              <Badge variant={"destructive"}>Draft</Badge>
              <div className=" flex  gap-2 rounded-xl bg-white   transition-all">
                <DeleteFormConfirmation formId={form._id} />
              </div>
            </div>
          )}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form.published && (
            <span className="flex items-center gap-2">
              <LuView className="text-muted-foreground" />
              <span>{form.visits.toLocaleString()}</span>
              <FaWpforms className="text-muted-foreground" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button asChild className="w-full mt-2 text-md gap-4">
            <Link href={`/dashboard/myforms/forms/${form._id}`}>
              View submissions <BiRightArrowAlt />
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button
            asChild
            variant={"secondary"}
            className="w-full mt-2 text-md gap-4"
          >
            <Link href={`/builder/${form._id}`}>
              Edit form <FaEdit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
