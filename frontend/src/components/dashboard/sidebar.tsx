"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  FileText,
  Home,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  {
    label: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "My Groups",
    href: "/dashboard/groups",
    icon: Users,
  },
  {
    label: "Assignments",
    href: "/dashboard/assignment",
    icon: FileText,
  },
  {
    label: "AI Teacher’s Toolkit",
    href: "/dashboard/toolkit",
    icon: Sparkles,
  },
  {
    label: "My Library",
    href: "/dashboard/library",
    icon: BookOpen,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { user, logout } = useAuthStore();

  return (
    <aside className="hidden lg:flex w-70 shrink-0 p-3">
      <div className="sticky top-3 flex h-166.25 w-full flex-col justify-between rounded-[16px] border border-[#ededed] bg-[#f8f8f8] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-[16px] shadow-[0_4px_10px_rgba(0,0,0,0.12)]">
              <Image
                src="/assets/logo-2.png"
                alt="VedaAI Logo"
                fill
                className="object-cover"
              />
            </div>

            <h1 className="text-[25px] font-bold tracking-[-1px] text-[#2b2b2b]">
              VedaAI
            </h1>
          </div>

          <Link
            href="/dashboard/assignment/create"
            className="mt-8 flex items-center justify-center gap-2 rounded-full border border-[#ff7a45] bg-linear-to-b from-[#2d2d2d] to-black py-3 text-white shadow-[0_6px_18px_rgba(255,122,69,0.18)] transition-all duration-300 hover:scale-[1.015]"
          >
            <Sparkles size={15} />

            <span className="text-[14px] font-medium">Create Assignment</span>
          </Link>

          <nav className="mt-10 flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-[14px] px-4 py-3 text-[14px] xl:text-[15px] transition-all duration-200 ${
                    isActive
                      ? "bg-[#efefef] text-black font-semibold"
                      : "text-[#7a7a7a] hover:bg-[#efefef] hover:text-black"
                  }`}
                >
                  <Icon size={19} strokeWidth={2} />

                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-1">
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 rounded-[14px] px-4 py-3 text-[14px] xl:text-[15px] text-[#7a7a7a] transition-all duration-200 hover:bg-[#efefef] hover:text-black"
          >
            <Settings size={18} />

            <span className="font-medium">Settings</span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="mt-4 flex w-full items-center gap-3 rounded-[20px] bg-[#efefef] p-3 text-left transition-all duration-200 hover:bg-[#e8e8e8]">
                <Image
                  src="/assets/school-avatar.png"
                  alt="School Profile Avatar"
                  width={46}
                  height={46}
                  className="shrink-0 rounded-full object-cover"
                />

                <div className="min-w-0 flex flex-col">
                  <p className="truncate text-[14px] font-semibold leading-tight text-[#2b2b2b]">
                    {user?.name || "User"}
                  </p>

                  <p className="mt-0.5 truncate text-[13px] text-[#7a7a7a]">
                    {user?.schoolName || "School"}
                  </p>
                </div>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="top"
              align="start"
              className="mb-2 w-65 rounded-[22px] border border-[#ececec] bg-white p-3 font-sans shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-center gap-3 border-b border-[#f1f1f1] pb-3">
                <Image
                  src="/assets/school-avatar.png"
                  alt="School Header Profile"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />

                <div className="min-w-0">
                  <p className="truncate text-[15px] font-semibold text-black">
                    {user?.name || "User"}
                  </p>

                  <p className="truncate text-[13px] text-[#7a7a7a]">
                    {user?.email || "email@example.com"}
                  </p>
                </div>
              </div>

              <div className="space-y-2 px-1 py-3">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-[#8a8a8a]">
                    School
                  </p>

                  <p className="mt-0.5 truncate text-[14px] font-semibold text-black">
                    {user?.schoolName || "School Name"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-[#8a8a8a]">
                    Class Profile
                  </p>

                  <p className="mt-0.5 text-[14px] font-semibold text-black">
                    Class {user?.selectedClass || "N/A"}
                  </p>
                </div>
              </div>

              <DropdownMenuItem
                onClick={async () => {
                  await logout();

                  router.push("/login");
                }}
                className="mt-1 cursor-pointer rounded-xl px-3 py-2.5 font-medium text-red-500 transition-colors focus:bg-red-50 focus:text-red-600"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  );
}
