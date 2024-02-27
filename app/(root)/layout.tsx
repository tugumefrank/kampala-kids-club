import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" flex h-screen flex-col bg-slate-200">
      <Header />
      <main className="flex-1 bg-slate-200">{children}</main>
      <Footer />
    </div>
  );
}
