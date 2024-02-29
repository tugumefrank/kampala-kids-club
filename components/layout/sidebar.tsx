import { DashboardNav } from "@/components/dashboard-nav";
import { cn } from "@/lib/utils";
import {
  DashItems,
  FormItems,
  EventItems,
  TransactionItems,
} from "@/constants/data";
import { Separator } from "../ui/separator";

const sections = [
  { title: "Dashboard", items: DashItems },
  { title: "Forms", items: FormItems },
  { title: "Events", items: EventItems },
  { title: "Transactions", items: TransactionItems },
];

export default function Sidebar() {
  return (
    <nav
      className={cn(`relative hidden h-screen border-r pt-16 lg:block w-72 `)}
    >
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
    </nav>
  );
}
