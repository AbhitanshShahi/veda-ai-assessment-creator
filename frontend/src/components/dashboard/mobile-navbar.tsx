"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BookOpen, FileText, Home, Sparkles } from "lucide-react";

const navItems = [
  {
    label: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Assignments",
    href: "/dashboard/assignment",
    icon: FileText,
  },
  {
    label: "Toolkit",
    href: "/dashboard/toolkit",
    icon: Sparkles,
  },
  {
    label: "Library",
    href: "/dashboard/library",
    icon: BookOpen,
  },
];

export default function MobileNavbar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-3 left-1/2 z-50 w-[calc(100%-24px)] max-w-md -translate-x-1/2 lg:hidden">
      <div className="flex items-center justify-between rounded-[24px] border border-[#2a2a2a] bg-black/95 px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-18 flex-col items-center justify-center gap-1 rounded-[18px] px-3 py-2 transition-all duration-200 ${
                isActive ? "bg-[#1a1a1a] text-white" : "text-[#a1a1a1]"
              }`}
            >
              <Icon size={20} strokeWidth={2} />

              <span className="text-[11px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
