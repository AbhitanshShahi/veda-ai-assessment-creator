"use client";

import Image from "next/image";

import Link from "next/link";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  Bell,
  ArrowLeft,
  ChevronDown,
  Menu,
  LogOut,
  Settings,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

import { useAuthStore } from "@/store/auth.store";

interface TopbarProps {
  title: string;
}

export default function Topbar({
  title,
}: TopbarProps) {
  const router = useRouter();

  const pathname = usePathname();

  const {
    user,
    logout,
  } = useAuthStore();

  return (
    <header className="sticky top-3 z-40 px-3 pt-3 lg:px-4">
      <div className="flex h-15 w-full items-center justify-between rounded-[20px] border border-[#ededed] bg-[#f8f8f8] px-3 shadow-[0_10px_35px_rgba(0,0,0,0.05)] lg:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex items-center gap-2 lg:hidden">
            <Image
              src="/assets/logo-2.png"
              alt="VedaAI"
              width={38}
              height={38}
              className="rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.12)]"
            />

            <span className="text-[22px] font-bold tracking-[-1px] text-[#2b2b2b]">
              VedaAI
            </span>
          </div>

          <button
            onClick={() => router.back()}
            className="hidden h-9 w-9 items-center justify-center rounded-full bg-[#efefef] transition hover:bg-[#e7e7e7] lg:flex"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="hidden min-w-0 lg:block">
            <h1 className="truncate text-[20px] font-bold tracking-[-0.4px] text-[#2b2b2b]">
              {title}
            </h1>

            <p className="text-[12px] text-[#7a7a7a]">
              Welcome back, {user?.name || "User"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#efefef] transition hover:bg-[#e7e7e7] lg:h-10 lg:w-10">
            <Bell size={17} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full bg-[#efefef] py-1 pl-1.5 pr-2 transition hover:bg-[#e7e7e7] lg:pr-3">
                <Image
                  src="/assets/school-avatar.png"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />

                <div className="hidden text-left sm:block">
                  <p className="max-w-[90px] truncate text-[13px] font-semibold text-[#2b2b2b]">
                    {user?.name || "User"}
                  </p>

                  <p className="max-w-[110px] truncate text-[11px] text-[#7a7a7a]">
                    {user?.schoolName || "School"}
                  </p>
                </div>

                <ChevronDown
                  size={15}
                  className="hidden text-[#7a7a7a] sm:block"
                />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-[260px] rounded-2xl border border-[#ececec] bg-white p-2 shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
            >
              <DropdownMenuLabel className="px-3 py-2">
                <div className="flex flex-col">
                  <span className="text-[14px] font-semibold text-[#2b2b2b]">
                    {user?.name}
                  </span>

                  <span className="text-[12px] text-[#7a7a7a]">
                    {user?.email}
                  </span>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <div className="px-3 py-2">
                <p className="text-[12px] font-medium text-[#7a7a7a]">
                  School
                </p>

                <p className="mt-1 text-[13px] font-semibold text-[#2b2b2b]">
                  {user?.schoolName}
                </p>
              </div>

              <div className="px-3 pb-2">
                <p className="text-[12px] font-medium text-[#7a7a7a]">
                  Class
                </p>

                <p className="mt-1 text-[13px] font-semibold text-[#2b2b2b]">
                  {user?.selectedClass}
                </p>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={async () => {
                  await logout();

                  router.push("/login");
                }}
                className="mt-1 cursor-pointer rounded-xl px-3 py-2.5 font-medium text-red-500 transition-colors focus:bg-red-50 focus:text-red-600"
              >
                <LogOut
                  size={16}
                  className="mr-2"
                />

                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#efefef] transition hover:bg-[#e7e7e7] lg:hidden">
                <Menu size={18} />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-[200px] rounded-2xl border border-[#ececec] bg-white p-2 shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
            >
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/settings"
                  className="flex cursor-pointer items-center rounded-xl px-3 py-2.5"
                >
                  <Settings
                    size={16}
                    className="mr-2"
                  />

                  Settings
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={async () => {
                  await logout();

                  router.push("/login");
                }}
                className="cursor-pointer rounded-xl px-3 py-2.5 text-red-500 focus:bg-red-50 focus:text-red-600"
              >
                <LogOut
                  size={16}
                  className="mr-2"
                />

                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}