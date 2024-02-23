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

export default function FormCard({ form }: { form: any }) {
  console.log(form);
  console.log(form.content);
  const contentArray = JSON.parse(form.content);
  console.log(contentArray);
  if (false) {
    return (
      <div className="flex-center min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
        <h3 className="p-bold-20 md:h5-bold">No Forms Found</h3>
        <p className="p-regular-14">come back later</p>
      </div>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">{form.name}</span>
          {form.published && <Badge>Published</Badge>}
          {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
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
            <Link href={`/dashboard/myforms/forms/${form.id}`}>
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
            <Link href={`/builder/${form.id}`}>
              Edit form <FaEdit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
