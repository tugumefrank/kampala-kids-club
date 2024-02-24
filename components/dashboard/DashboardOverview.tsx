import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { ArrowDownIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import {
  DashboardSkeleton,
  CardsSkeleton,
  RevenueChartSkeleton,
} from "@/components/skeletons/dashboardSkeletons/DashboardSkeleton";
import DashboardStatsCards from "@/components/dashboard/DashboardStatsCards";
import RecentTransactions from "./RecentTransactions";
import { getTotalAmount } from "@/lib/actions/ChildOrder.actions";
import { cn } from "@/lib/utils";
import { WithdrawButton } from "./WithdrawButton";
type DashboardOverviewProps = {
  userName: String;
};
const DashboardOverview = async ({ userName }: DashboardOverviewProps) => {
  const totalAmount = await getTotalAmount();
  return (
    <ScrollArea className="h-full">
      <div className="container flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col   justify-between space-y-2 lg:flex-col lg:gap-4">
          <h2 className="text-3xl justify-center font-bold tracking-tight">
            Hi 👋,{userName} !
          </h2>
          <div className="flex flex-col space-y-2 items-end">
            <div className="hidden md:flex items-center space-x-2">
              {/* <CalendarDateRangePicker />
              <Button>Download</Button> */}
            </div>

            <Card className={cn("w-full sm:w-[300px]")}>
              <CardContent className="flex flex-col items-center justify-center gap-2 h-full sm:flex-row">
                <p className="text-sm font-medium leading-none mt-4 mb-0 sm:mb-0">
                  Available Bal.{" "}
                  <span className="text-black font-semibold">
                    UGX.{totalAmount}
                  </span>
                </p>
                <WithdrawButton />
              </CardContent>
            </Card>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Reports
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Suspense fallback={<RevenueChartSkeleton />}>
              <DashboardStatsCards />
            </Suspense>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
              <Suspense fallback={<CardsSkeleton />}>
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <RevenueChart />
                  </CardContent>
                </Card>
              </Suspense>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>
                    Your most recent Transactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentTransactions />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
};

export default DashboardOverview;
