import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: string;
  userName: string;
  onLogout: () => void;
}

export function DashboardLayout({ children, userRole, userName, onLogout }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar userRole={userRole} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader userName={userName} userRole={userRole} onLogout={onLogout} />
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}