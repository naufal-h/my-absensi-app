"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { CalendarClock, Clock8 } from "lucide-react";
import { NavHeader } from "../navigation/nav-header";
import { NavMain } from "../navigation/nav-main";
import { NavUser } from "../navigation/nav-user";

const data = {
  user: {
    name: "Nama",
    email: "nama@dexagroup.com",
    avatar: "/pfp.jpg",
  },

  navMain: [
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
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
