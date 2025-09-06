import { 
  Users, 
  Calendar, 
  UserCheck, 
  FileText, 
  TestTube, 
  Pill, 
  BarChart3, 
  Settings,
  Stethoscope,
  ClipboardList,
  Heart,
  User,
  UserPlus
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  userRole: string;
}

export function AppSidebar({ userRole }: AppSidebarProps) {
  const location = useLocation();
  
  const adminMenuItems = [
    { title: "Overview", url: "/admin", icon: BarChart3 },
    { title: "Patients", url: "/admin/patients", icon: Users },
    { title: "Doctors", url: "/admin/doctors", icon: UserCheck },
    { title: "Appointments", url: "/admin/appointments", icon: Calendar },
    { title: "Laboratory", url: "/admin/lab", icon: TestTube },
    { title: "Pharmacy", url: "/admin/pharmacy", icon: Pill },
    { title: "Reports", url: "/admin/reports", icon: FileText },
    { title: "Settings", url: "/admin/settings", icon: Settings },
  ];

  const doctorMenuItems = [
    { title: "My Appointments", url: "/doctor", icon: Calendar },
    { title: "Patients", url: "/doctor/patients", icon: Users },
    { title: "Lab Requests", url: "/doctor/lab", icon: TestTube },
    { title: "Profile", url: "/doctor/profile", icon: User },
  ];

  const patientMenuItems = [
    { title: "Dashboard", url: "/patient", icon: Heart },
    { title: "Book Appointment", url: "/patient/appointments", icon: Calendar },
    { title: "My Records", url: "/patient/records", icon: ClipboardList },
    { title: "Doctors", url: "/patient/doctors", icon: Stethoscope },
    { title: "Profile", url: "/patient/profile", icon: User },
  ];

  const getMenuItems = () => {
    switch (userRole) {
      case 'admin':
        return adminMenuItems;
      case 'doctor':
        return doctorMenuItems;
      case 'patient':
        return patientMenuItems;
      default:
        return [];
    }
  };

  const getRoleTitle = () => {
    switch (userRole) {
      case 'admin':
        return 'Administration';
      case 'doctor':
        return 'Doctor Portal';
      case 'patient':
        return 'Patient Portal';
      default:
        return 'Healthcare';
    }
  };

  const isActive = (path: string) => {
    if (path === `/${userRole}`) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar className="w-72 transition-all duration-300 border-r border-border bg-card">
      <SidebarContent>
        {/* Logo Section */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-medical-primary to-medical-secondary rounded-xl">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg bg-gradient-to-r from-medical-primary to-medical-secondary bg-clip-text text-transparent">
                HealthCare
              </h2>
              <p className="text-sm text-muted-foreground">{getRoleTitle()}</p>
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive: navIsActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                          navIsActive || isActive(item.url)
                            ? "bg-medical-primary text-white shadow-md"
                            : "text-foreground hover:bg-accent hover:text-accent-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="font-medium">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}