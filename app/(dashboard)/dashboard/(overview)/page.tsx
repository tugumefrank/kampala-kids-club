"use server";

import DashboardOverview from "@/components/dashboard/DashboardOverview";
import { auth } from "@clerk/nextjs";

const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));
export default async function page() {
  const { sessionClaims } = auth();
  const userName = sessionClaims?.userName as string;

  return <DashboardOverview userName={userName} />;
}
