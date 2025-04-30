"use client";

import { Briefcase, Home, List, ListTodo, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

import AppSideBarFooter from "./app-side-bar-footer";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function AppSideBar() {
  const pathname = usePathname();
  const items = [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
      color: "#863C48",
    },
    {
      title: "Tasks",
      url: "/dashboard/tasks",
      icon: ListTodo,
      color: "#634AB0",
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader>
            <SidebarGroupLabel className="text-2xl text-white font-bold font-nunito my-2">
              My Tasks 🏠
            </SidebarGroupLabel>
          </SidebarHeader>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="">
                  <SidebarMenuButton
                    asChild
                    className="h-12 px-3 text-md font-medium transition-colors rounded-2xl"
                  >
                    <Link
                      href={item.url}
                      className={cn(
                        pathname === item.url
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      )}
                    >
                      <item.icon color={item.color} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarGroupContent>
            <SidebarGroupLabel className="text-lg text-white font-bold font-nunito my-7 pt-10">
              Categories 📋
            </SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem key={"all"}>
                <SidebarMenuButton
                  asChild
                  className="h-12 px-3 text-md font-medium transition-colors rounded-2xl cursor-pointer"
                >
                  <article>
                    <List color="#6366f1" />
                    <span>All</span>
                  </article>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem key={"personal"}>
                <SidebarMenuButton
                  asChild
                  className="h-12 px-3 text-md font-medium transition-colors rounded-2xl cursor-pointer"
                >
                  <article>
                    <User color="#10b981" />
                    <span>Personal</span>
                  </article>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem key={"work"}>
                <SidebarMenuButton
                  asChild
                  className="h-12 px-3 text-md font-medium transition-colors rounded-2xl cursor-pointer"
                >
                  <article>
                    <Briefcase color="#f59e0b" />
                    <span>Work</span>
                  </article>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="w-full">
          <AppSideBarFooter />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
