import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Clock, 
  User, 
  CheckCircle,
  TestTube,
  FileText,
  Stethoscope
} from "lucide-react";

export function DoctorDashboard() {
  const { toast } = useToast();
  const todayAppointments = [
    {
      id: 1,
      patient: "John Doe",
      time: "09:00 AM",
      type: "Consultation",
      status: "upcoming",
      duration: "30 min"
    },
    {
      id: 2,
      patient: "Sarah Wilson",
      time: "10:30 AM", 
      type: "Follow-up",
      status: "upcoming",
      duration: "15 min"
    },
    {
      id: 3,
      patient: "Mike Brown",
      time: "11:00 AM",
      type: "Check-up",
      status: "completed",
      duration: "45 min"
    },
    {
      id: 4,
      patient: "Emily Davis",
      time: "02:00 PM",
      type: "Consultation",
      status: "upcoming",
      duration: "30 min"
    },
    {
      id: 5,
      patient: "Robert Lee",
      time: "03:30 PM",
      type: "Surgery Consultation",
      status: "upcoming",
      duration: "60 min"
    }
  ];

  const recentPatients = [
    {
      name: "John Doe",
      lastVisit: "2024-01-15",
      condition: "Hypertension",
      status: "Stable"
    },
    {
      name: "Sarah Wilson", 
      lastVisit: "2024-01-14",
      condition: "Diabetes",
      status: "Under Treatment"
    },
    {
      name: "Mike Brown",
      lastVisit: "2024-01-14",
      condition: "Regular Check-up",
      status: "Healthy"
    }
  ];

  const labRequests = [
    {
      patient: "John Doe",
      test: "Blood Sugar Test",
      requested: "2024-01-15",
      status: "pending"
    },
    {
      patient: "Sarah Wilson",
      test: "Cholesterol Panel", 
      requested: "2024-01-14",
      status: "completed"
    },
    {
      patient: "Mike Brown",
      test: "Complete Blood Count",
      requested: "2024-01-14", 
      status: "completed"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'upcoming':
        return 'bg-medical-primary text-white';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Doctor Dashboard</h1>
          <p className="text-muted-foreground">Your appointments and patient care</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => toast({ title: "Lab Test Request", description: "Lab test request form opened." })}
            variant="outline" 
            className="border-medical-primary/20"
          >
            <TestTube className="mr-2 h-4 w-4" />
            Request Lab Test
          </Button>
          <Button 
            onClick={() => toast({ title: "New Prescription", description: "Prescription form opened." })}
            className="bg-gradient-to-r from-medical-primary to-medical-secondary text-white"
          >
            <FileText className="mr-2 h-4 w-4" />
            New Prescription
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-medical-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Today's Appointments</p>
              </div>
              <Calendar className="h-8 w-8 text-medical-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-medical-secondary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Active Patients</p>
              </div>
              <User className="h-8 w-8 text-medical-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-medical-accent/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Lab Results</p>
              </div>
              <TestTube className="h-8 w-8 text-medical-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-success/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Completed Today</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Today's Appointments */}
        <Card className="lg:col-span-2 border-medical-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-medical-primary" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Your appointments for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-card-hover transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-medical-primary/10 rounded-lg">
                      <Clock className="h-4 w-4 text-medical-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{appointment.patient}</p>
                      <p className="text-xs text-muted-foreground">{appointment.type} • {appointment.duration}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{appointment.time}</p>
                    <Badge className={`text-xs ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-medical-primary/20">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={() => toast({ title: "Patient History", description: "Patient history viewer opened." })}
              variant="outline" 
              className="w-full justify-start h-12 border-medical-primary/20 hover:bg-medical-primary/10"
            >
              <User className="mr-2 h-4 w-4" />
              View Patient History
            </Button>
            <Button 
              onClick={() => toast({ title: "Write Prescription", description: "Prescription writing interface opened." })}
              variant="outline" 
              className="w-full justify-start h-12 border-medical-secondary/20 hover:bg-medical-secondary/10"
            >
              <FileText className="mr-2 h-4 w-4" />
              Write Prescription
            </Button>
            <Button 
              onClick={() => toast({ title: "Order Lab Tests", description: "Lab test ordering interface opened." })}
              variant="outline" 
              className="w-full justify-start h-12 border-medical-accent/20 hover:bg-medical-accent/10"
            >
              <TestTube className="mr-2 h-4 w-4" />
              Order Lab Tests
            </Button>
            <Button 
              onClick={() => toast({ title: "Mark Complete", description: "Appointment marked as completed." })}
              variant="outline" 
              className="w-full justify-start h-12 border-success/20 hover:bg-success/10"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark Complete
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Patients */}
        <Card className="border-medical-primary/20">
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
            <CardDescription>Recently treated patients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPatients.map((patient, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-semibold text-sm">{patient.name}</p>
                    <p className="text-xs text-muted-foreground">{patient.condition}</p>
                    <p className="text-xs text-muted-foreground">Last visit: {patient.lastVisit}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {patient.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lab Requests */}
        <Card className="border-medical-primary/20">
          <CardHeader>
            <CardTitle>Lab Requests</CardTitle>
            <CardDescription>Recent lab test requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {labRequests.map((request, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-semibold text-sm">{request.patient}</p>
                    <p className="text-xs text-muted-foreground">{request.test}</p>
                    <p className="text-xs text-muted-foreground">Requested: {request.requested}</p>
                  </div>
                  <Badge className={`text-xs ${getStatusColor(request.status)}`}>
                    {request.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}