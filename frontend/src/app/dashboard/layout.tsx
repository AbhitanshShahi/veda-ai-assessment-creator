import Sidebar from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";
import MobileNavbar from "@/components/dashboard/mobile-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Topbar title="Assignments" />

          <main className="px-3 pb-24 pt-4 lg:px-4 lg:pb-6">{children}</main>
        </div>
      </div>

      <MobileNavbar />
    </div>
  );
}
