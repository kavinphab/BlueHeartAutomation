import Navigation from "@/components/global/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TABS } from "@/data/admin/navigation";
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
