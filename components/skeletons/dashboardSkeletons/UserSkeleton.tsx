import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function BreadCrumbSkeleton() {
  return (
    <>
      <div className="mb-4 flex items-center space-x-1 text-sm  text-muted-foreground">
        <Skeleton className="h-6 w-[80px]" />
        <Skeleton className="h-6 w-[50px]" />
      </div>
    </>
  );
}
export function HeadingSkeleton() {
  return (
    <>
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-[150px] " />
          <Skeleton className="h-6 w-[200px]" />
        </div>
        <Skeleton className="h-12 w-[150px] " />
      </div>
    </>
  );
}
export function IputeSkeleton() {
  return (
    <>
      <div className=" rounded-md  py-2">
        <Skeleton className="h-8 w-[300px] " />
      </div>
    </>
  );
}
export function TableSkeleton() {
  return (
    <>
      {" "}
      <div className="rounded-lg border bg-card">
        <table className="w-full caption-bottom text-sm relative">
          <thead className="[&amp;_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </th>
              <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </th>
              <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </th>
              <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </th>
              <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </th>
              <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]"></th>
            </tr>
          </thead>
          <tbody className="[&amp;_tr:last-child]:border-0">
            <tr
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              data-state="false"
            >
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
            </tr>
            <tr
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              data-state="false"
            >
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
            </tr>
            <tr
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              data-state="false"
            >
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
            </tr>
            <tr
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              data-state="false"
            >
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
            </tr>
            <tr
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              data-state="false"
            >
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
            </tr>
            <tr
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              data-state="false"
            >
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
            </tr>
            <tr
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              data-state="false"
            >
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
            </tr>
            <tr
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              data-state="false"
            >
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
            </tr>
            <tr
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              data-state="false"
            >
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
            </tr>
            <tr
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              data-state="false"
            >
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
            </tr>
            <tr
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              data-state="false"
            >
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
              <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                <Skeleton className="h-8 w-full " />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
export function UserSkeleton() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumbSkeleton />
        <HeadingSkeleton />
        <IputeSkeleton />
        {/* <TableSkeleton /> */}
      </div>
    </>
  );
}
