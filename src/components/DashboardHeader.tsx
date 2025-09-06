import { Bell, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface DashboardHeaderProps {
  userName: string;
  userRole: string;
  onLogout: () => void;
}

export function DashboardHeader({ userName, userRole, onLogout }: DashboardHeaderProps) {
  const { toast } = useToast();
  const getRoleColor = () => {
    switch (userRole) {
      case 'admin':
        return 'bg-error text-error-foreground';
      case 'doctor':
        return 'bg-medical-primary text-white';
      case 'patient':
        return 'bg-medical-secondary text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRoleLabel = () => {
    switch (userRole) {
      case 'admin':
        return 'Administrator';
      case 'doctor':
        return 'Doctor';
      case 'patient':
        return 'Patient';
      default:
        return 'User';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-8 w-8" />
          <div className="hidden md:block">
            <h1 className="text-lg font-semibold text-foreground">{getRoleLabel()} Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, {userName}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button 
            onClick={() => toast({ title: "Notifications", description: "You have 3 new notifications" })}
            variant="ghost" 
            size="icon" 
            className="relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-error rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 px-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-medical-primary text-white font-semibold">
                    {userName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{userName}</p>
                  <Badge variant="secondary" className={`text-xs ${getRoleColor()}`}>
                    {getRoleLabel()}
                  </Badge>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast({ title: "Profile", description: "Profile settings opened" })}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast({ title: "Settings", description: "Settings panel opened" })}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={onLogout}
                className="text-error focus:text-error focus:bg-error/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}