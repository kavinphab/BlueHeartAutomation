import { Users, Cog, ChartNoAxesCombined, Newspaper } from "lucide-react";
import { Tabs } from "@/types/navigation";

export const TABS: Tabs = {
  admin: {
    expand: true,
    tabs: [
      {
        name: "Configuration",
        link: "/admin/configuration",
        icon: <Cog />,
      },
      {
        name: "Engagement",
        link: "/admin/engagement",
        icon: <ChartNoAxesCombined />,
      },
      {
        name: "Management",
        link: "/admin/manage",
        icon: <Users />,
      },
      {
        name: "Newsletter",
        link: "/admin/newsletter",
        icon: <Newspaper />,
      },
    ],
  },
};
