import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Shadcn Dashboard Starter",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-y-auto">
        <Sidebar />
        <main className="w-full pt-16  bg-[#E2E8F0] dark:bg-zinc-900 overflow-y-auto ">
          {children}
        </main>
      </div>
    </>
  );
}
