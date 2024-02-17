"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { User } from "@/constants/data";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { AvatarImage } from "@radix-ui/react-avatar";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "IMAGE",
    accessorKey: "image",
    cell: ({ row }) => {
      // Extract initials from name
      const initials = row.original.childName
        .split(/\s+/)
        .map((namePart) => namePart[0])
        .join("")
        .toUpperCase();
      return (
        <div className="flex-shrink-0 h-12 w-12">
          <Avatar className="flex h-12 w-12 items-center justify-center space-y-0 border">
            <AvatarImage src={row.original.childPhotoUrl} alt="Avatar" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: "childName",
    header: " NAME",
  },
  {
    accessorKey: "childAge",
    header: "AGE",
  },
  {
    accessorKey: "parentGuardianName",
    header: "PARENT",
  },
  {
    accessorKey: "whatsappNumber",
    header: " CONTACT",
  },
  {
    accessorKey: "residentialAddress",
    header: "ADDRESS",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
