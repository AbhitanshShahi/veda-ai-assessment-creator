"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BookOpen,
  FileText,
  Home,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

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
    href: "/dashboard/assignments",
    icon: FileText,
  },
  {
    label: "AI Toolkit",
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

  return (
    <aside className="hidden lg:flex h-[calc(100vh-32px)] w-[290px] sticky top-4 ml-4 flex-col rounded-[32px] bg-[#f8f8f8] px-6 py-7 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#ececec]">
      <div className="flex items-center gap-3">
        <div className="relative h-[58px] w-[58px] overflow-hidden rounded-2xl shadow-md">
          <Image
            src="/assets/logo-2.png"
            alt="VedaAI Logo"
            fill
            className="object-cover"
          />
        </div>

        <h1 className="text-[32px] font-bold tracking-[-1px] text-black">
          VedaAI
        </h1>
      </div>

      <button className="mt-10 flex items-center justify-center gap-2 rounded-full border border-orange-400 bg-gradient-to-b from-[#2f2f2f] to-black px-5 py-4 text-white shadow-[0_8px_25px_rgba(249,115,22,0.25)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(249,115,22,0.35)]">
        <Sparkles size={18} />

        <span className="text-[15px] font-medium">Create Assignment</span>
      </button>

      <nav className="mt-12 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-[16px] transition-all duration-200 ${
                isActive
                  ? "bg-white text-black shadow-sm"
                  : "text-neutral-500 hover:bg-white hover:text-black"
              }`}
            >
              <Icon size={21} strokeWidth={2} />

              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex-1" />

      <Link
        href="/dashboard/settings"
        className="flex items-center gap-3 rounded-2xl px-4 py-3 text-neutral-500 transition-all duration-200 hover:bg-white hover:text-black"
      >
        <Settings size={20} />

        <span className="font-medium">Settings</span>
      </Link>

      <div className="mt-5 flex items-center gap-3 rounded-[28px] bg-[#f3f3f3] p-4 shadow-inner border border-[#ebebeb]">
        <Image
          src="/assets/school-avatar.png"
          alt="School"
          width={54}
          height={54}
          className="rounded-full"
        />

        <div>
          <p className="text-[15px] font-semibold text-black">
            Delhi Public School
          </p>

          <p className="text-sm text-neutral-500">Bokaro Steel City</p>
        </div>
      </div>
    </aside>
  );
}
