import React from "react";
import { GetFormStats } from "@/lib/actions/formBuilder.actions";
import StatsCards from "@/components/formStatsPage/StatsCards";

export default async function CardStatsWrapper() {
  const stats = await GetFormStats();
  console.log(stats);
  return <StatsCards loading={false} data={stats} />;
}
