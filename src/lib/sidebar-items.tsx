"use client";

import type { LucideIcon } from "lucide-react";
import { CalendarClock, Clock8, Users } from "lucide-react";

export interface SidebarNavItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export const adminSidebarItems: SidebarNavItem[] = [
  { title: "Data Karyawan", url: "/admin/karyawan", icon: Users },
  {
    title: "Riwayat Absensi",
    url: "/admin/riwayat-absensi",
    icon: CalendarClock,
  },
];

export const employeeSidebarItems: SidebarNavItem[] = [
  {
    title: "Absensi",
    url: "/employee/absensi",
    icon: Clock8,
  },
  {
    title: "Riwayat Absensi",
    url: "/employee/riwayat-absensi",
    icon: CalendarClock,
  },
];
