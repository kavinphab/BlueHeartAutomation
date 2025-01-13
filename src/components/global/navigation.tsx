"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/temporarylogo.png";
import { usePathname } from "next/navigation";

import { UserButton } from "@clerk/nextjs";
import { Tabs } from "@/types/navigation";

type props = {
  tabs: Tabs;
};
const Navigation = ({ tabs }: props) => {
  const path = usePathname();
  const NAVTABS = tabs[path.split("/")[1]].tabs;

  return (
    <Sidebar className="text-white">
      <SidebarHeader className="flex flex-col items-center">
        <Image src={Logo} alt="TTickle Logo" />
      </SidebarHeader>
      <SidebarContent className="flex flex-col items-center">
        {NAVTABS.map((tab, index) => (
          <SidebarGroup
            key={index}
            className="flex flex-row items-center gap-2"
          >
            {tab.icon}
            <Link href={tab.link}>{tab.name}</Link>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <UserButton
          showName
          appearance={{
            elements: {
              userButtonBox: {
                flexDirection: "row-reverse",
                color: "white",
              },
            },
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
};

export default Navigation;
