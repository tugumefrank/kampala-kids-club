"use client";
import { DashboardNav } from "@/components/dashboard-nav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DashItems,
  EventItems,
  FormItems,
  TransactionItems,
} from "@/constants/data";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { Separator } from "../ui/separator";

const sections = [
  { title: "Dashboard", items: DashItems },
  { title: "Forms", items: FormItems },
  { title: "Events", items: EventItems },
  { title: "Transactions", items: TransactionItems },
];
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // playlists: Playlist[];
}

export function MobileSidebar({ className }: SidebarProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="space-y-4 py-4 ">
            <div className="px-3 py-2">
              <div className="space-y-1">
                {sections.map((section, index) => (
                  <div key={index} className="flex flex-col pb-10">
                    <div className="flex justify-between align-middle items-center overflow-hidden gap-2">
                      <h3 className="mb-2 px-4 text-[14px] text-primary font-semibold tracking-tight">
                        {section.title}
                      </h3>
                      <Separator />
                    </div>

                    <DashboardNav items={section.items} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
