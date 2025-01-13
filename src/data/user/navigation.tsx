import { Newspaper, Pencil } from "lucide-react";
import { Tabs } from "@/types/navigation";

export const TABS: Tabs = {
  user: {
    expand: true,
    tabs: [
      {
        name: "Configuration",
        link: "/user/configuration",
        icon: <Pencil />,
      },
      {
        name: "Newsletter",
        link: "/user/newsletter",
        icon: <Newspaper />,
      },
    ],
  },
};
