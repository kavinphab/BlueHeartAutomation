import { SidebarProvider } from "@/components/ui/sidebar";
import Navigation from "@/components/global/navigation";
import { TABS } from "@/data/user/navigation";

type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <SidebarProvider>
        <Navigation tabs={TABS} />
        {children}
      </SidebarProvider>
    </div>
  );
};

export default Layout;
