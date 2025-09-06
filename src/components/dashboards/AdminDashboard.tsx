import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  UserCheck, 
  Calendar, 
  TestTube, 
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle
} from "lucide-react";

export function AdminDashboard() {
  const { toast } = useToast();
  const stats = [
    {
      title: "Total Patients",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-medical-primary"
    },
    {
      title: "Active Doctors",
      value: "52",
      change: "+2",
      trend: "up", 
      icon: UserCheck,
      color: "text-medical-secondary"
    },
    {
      title: "Today's Appointments",
      value: "87",
      change: "+15%",
      trend: "up",
      icon: Calendar,
      color: "text-medical-accent"
    },
    {
      title: "Lab Tests Pending",
      value: "23",
      change: "-8%",
      trend: "down",
      icon: TestTube,
      color: "text-warning"
    }
  ];

  const recentAppointments = [
    {
      id: 1,
      patient: "John Doe",
      doctor: "Dr. Smith",
      time: "09:00 AM",
      status: "confirmed",
      type: "Consultation"
    },
    {
      id: 2,
      patient: "Jane Wilson",
      doctor: "Dr. Johnson",
      time: "10:30 AM", 
      status: "pending",
      type: "Follow-up"
    },
    {
      id: 3,
      patient: "Mike Brown",
      doctor: "Dr. Davis",
      time: "02:00 PM",
      status: "completed",
      type: "Surgery"
    },
    {
      id: 4,
      patient: "Sarah Lee",
      doctor: "Dr. Wilson",
      time: "03:30 PM",
      status: "confirmed",
      type: "Check-up"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'completed':
        return 'bg-medical-primary text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return CheckCircle;
      case 'pending':
        return Clock;
      case 'completed':
        return CheckCircle;
      default:
        return AlertCircle;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Hospital overview and management</p>
        </div>
        <Button 
          onClick={() => toast({ title: "Report Generated", description: "Hospital analytics report has been generated successfully." })}
          className="bg-gradient-to-r from-medical-primary to-medical-secondary text-white"
        >
          Generate Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="relative overflow-hidden border-medical-primary/20 hover:shadow-lg transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className={`h-3 w-3 ${stat.trend === 'up' ? 'text-success' : 'text-error'}`} />
                  <p className={`text-xs ${stat.trend === 'up' ? 'text-success' : 'text-error'}`}>
                    {stat.change} from last month
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Appointments */}
        <Card className="lg:col-span-2 border-medical-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-medical-primary" />
              Today's Appointments
            </CardTitle>
            <CardDescription>Recent and upcoming patient appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAppointments.map((appointment) => {
                const StatusIcon = getStatusIcon(appointment.status);
                return (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-card-hover transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-medical-primary/10 rounded-lg">
                        <StatusIcon className="h-4 w-4 text-medical-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{appointment.patient}</p>
                        <p className="text-xs text-muted-foreground">with {appointment.doctor}</p>
                        <p className="text-xs text-muted-foreground">{appointment.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{appointment.time}</p>
                      <Badge className={`text-xs ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-medical-primary/20">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={() => toast({ title: "Add Patient", description: "Patient registration form opened." })}
              variant="outline" 
              className="w-full justify-start h-12 border-medical-primary/20 hover:bg-medical-primary/10"
            >
              <Users className="mr-2 h-4 w-4" />
              Add New Patient
            </Button>
            <Button 
              onClick={() => toast({ title: "Register Doctor", description: "Doctor registration form opened." })}
              variant="outline" 
              className="w-full justify-start h-12 border-medical-secondary/20 hover:bg-medical-secondary/10"
            >
              <UserCheck className="mr-2 h-4 w-4" />
              Register Doctor
            </Button>
            <Button 
              onClick={() => toast({ title: "Schedule Appointment", description: "Appointment scheduling interface opened." })}
              variant="outline" 
              className="w-full justify-start h-12 border-medical-accent/20 hover:bg-medical-accent/10"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Appointment
            </Button>
            <Button 
              onClick={() => toast({ title: "Lab Test Request", description: "Lab test request form opened." })}
              variant="outline" 
              className="w-full justify-start h-12 border-warning/20 hover:bg-warning/10"
            >
              <TestTube className="mr-2 h-4 w-4" />
              Lab Test Request
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="border-medical-primary/20">
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Current hospital operations overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
              <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
              <p className="font-semibold text-success">System Online</p>
              <p className="text-xs text-muted-foreground">All services operational</p>
            </div>
            <div className="text-center p-4 bg-medical-primary/10 rounded-lg border border-medical-primary/20">
              <Users className="h-8 w-8 text-medical-primary mx-auto mb-2" />
              <p className="font-semibold">42 Active Staff</p>
              <p className="text-xs text-muted-foreground">Currently on duty</p>
            </div>
            <div className="text-center p-4 bg-medical-secondary/10 rounded-lg border border-medical-secondary/20">
              <TestTube className="h-8 w-8 text-medical-secondary mx-auto mb-2" />
              <p className="font-semibold">Lab Capacity: 78%</p>
              <p className="text-xs text-muted-foreground">Tests being processed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}