import BreadCrumb from "@/components/breadcrumb";
import { fetchAllChildren } from "@/lib/actions/register.actions";

import {
  TableSkeleton,
  UserSkeleton,
} from "@/components/skeletons/dashboardSkeletons/UserSkeleton";
import { UserClient } from "@/components/tables/user-tables/client";
import { User, users } from "@/constants/data";
import { Suspense } from "react";

const breadcrumbItems = [{ title: "User", link: "/dashboard/user" }];

export default async function page() {
  const children = await fetchAllChildren();

  console.log(children);

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <Suspense fallback={<UserSkeleton />}>
          <BreadCrumb items={breadcrumbItems} />
        </Suspense>

        <Suspense fallback={<TableSkeleton />}>
          <UserClient data={children} />
        </Suspense>
      </div>
    </>
  );
}
