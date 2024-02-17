import { Skeleton } from "@/components/ui/skeleton";
// skeletom for a single card
export function CardSkeleton() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm ">
      <div className="p-2 flex flex-col  space-y-0 pb-2 mb-2">
        <Skeleton className="h-[125px] w-full rounded-xl" />

        <div className="p-2 flex flex-col flex-start space-y-2 pb-2 mb-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
      </div>
    </div>
  );
}

// skeletom for a 4 cards
export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}
// dashboard revenue chard skeleton
export function RevenueChartSkeleton() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm col-span-4 ">
      <div className="flex flex-col space-y-1.5 p-4">
        <Skeleton className="h-[400px]  w-full rounded-lg" />
      </div>
    </div>
  );
}

// dasboard single row sales skeleton
export function SalesSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4 px-4">
      <div className="flex items-center ">
        <Skeleton className="mr-2 h-8 w-8 rounded-full" />

        <div className="min-w-0 m-2">
          <Skeleton className="h-5 w-40 rounded-md" />
          <Skeleton className="mt-2 h-4 w-12 rounded-md" />
        </div>
      </div>
      <Skeleton className="mt-2 h-4 w-12 rounded-md" />
    </div>
  );
}
// recent sales skeleton
export function LatestSalesSkeleton() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm col-span-4 md:col-span-3">
      <div className="flex flex-col space-y-1.5 p-6">
        <Skeleton className="mt-2 h-4 w-full rounded-md" />
        <Skeleton className="mt-2 h-4 w-full rounded-md" />
      </div>

      <SalesSkeleton />
      <SalesSkeleton />
      <SalesSkeleton />
      <SalesSkeleton />
      <SalesSkeleton />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-row justify-between  gap-6">
          <Skeleton className="mt-2 h-12 w-1/2 rounded-lg border  shadow-sm " />
          <Skeleton className="mt-2 h-12 w-1/2 rounded-md border p-4" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7 P-4">
          <RevenueChartSkeleton />
          <LatestSalesSkeleton />
        </div>
      </div>
    </>
  );
}
