"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Bell,
  ArrowLeft,
  ChevronDown,
  Menu,
} from "lucide-react";

import { useAuthStore } from "@/store/auth.store";

interface TopbarProps {
  title: string;
}

export default function Topbar({
  title,
}: TopbarProps) {
  const router = useRouter();

  const { user } = useAuthStore();

  return (
    <header className="sticky top-3 z-40 px-3 pt-3 lg:px-4">
      <div className="flex h-15 w-full items-center justify-between rounded-[18px] border border-[#ededed] bg-[#f8f8f8] px-3 shadow-[0_8px_30px_rgba(0,0,0,0.04)] lg:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#efefef] transition hover:bg-[#e7e7e7] lg:hidden">
            <Menu size={18} />
          </button>

          <button
            onClick={() => router.back()}
            className="hidden h-9 w-9 items-center justify-center rounded-full bg-[#efefef] transition hover:bg-[#e7e7e7] lg:flex"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="min-w-0">
            <h1 className="truncate text-[17px] font-bold tracking-[-0.4px] text-[#2b2b2b] lg:text-[20px]">
              {title}
            </h1>

            <p className="hidden text-[12px] text-[#7a7a7a] md:block">
              Welcome back, {user?.name || "User"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#efefef] transition hover:bg-[#e7e7e7] lg:h-10 lg:w-10">
            <Bell size={17} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500" />
          </button>

          <button className="flex items-center gap-2 rounded-full bg-[#efefef] py-1 pl-1.5 pr-2 transition hover:bg-[#e7e7e7] lg:pr-3">
            <Image
              src="/assets/school-avatar.png"
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />

            <div className="hidden text-left sm:block">
              <p className="max-w-22.5 truncate text-[13px] font-semibold text-[#2b2b2b]">
                {user?.name || "User"}
              </p>

              <p className="max-w-27.5 truncate text-[11px] text-[#7a7a7a]">
                {user?.schoolName || "School"}
              </p>
            </div>

            <ChevronDown
              size={15}
              className="hidden text-[#7a7a7a] sm:block"
            />
          </button>
        </div>
      </div>
    </header>
  );
}