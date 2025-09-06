import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Clock, 
  Stethoscope, 
  FileText,
  TestTube,
  Heart,
  User,
  Plus
} from "lucide-react";

export function PatientDashboard() {
  const { toast } = useToast();
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Smith",
      specialty: "Cardiologist",
      date: "2024-01-20",
      time: "10:00 AM",
      type: "Regular Check-up",
      status: "confirmed"
    },
    {
      id: 2,
      doctor: "Dr. Mike Johnson",
      specialty: "General Physician", 
      date: "2024-01-25",
      time: "02:30 PM",
      type: "Follow-up",
      status: "confirmed"
    }
  ];

  const recentRecords = [
    {
      date: "2024-01-15",
      doctor: "Dr. Sarah Smith",
      diagnosis: "Routine Check-up",
      prescription: "Vitamin D supplement",
      status: "completed"
    },
    {
      date: "2024-01-10",
      doctor: "Dr. Mike Johnson", 
      diagnosis: "Blood Pressure Monitoring",
      prescription: "Continue current medication",
      status: "completed"
    },
    {
      date: "2024-01-05",
      doctor: "Dr. Emily Davis",
      diagnosis: "Annual Physical",
      prescription: "Lab tests recommended",
      status: "completed"
    }
  ];

  const labResults = [
    {
      test: "Complete Blood Count",
      date: "2024-01-15",
      result: "Normal",
      status: "completed"
    },
    {
      test: "Cholesterol Panel",
      date: "2024-01-10", 
      result: "Slightly elevated",
      status: "completed"
    },
    {
      test: "Blood Sugar",
      date: "2024-01-18",
      result: "Pending",
      status: "pending"
    }
  ];

  const availableDoctors = [
    {
      name: "Dr. Sarah Smith",
      specialty: "Cardiologist",
      rating: 4.9,
      nextAvailable: "Tomorrow 9:00 AM"
    },
    {
      name: "Dr. Mike Johnson",
      specialty: "General Physician",
      rating: 4.8,
      nextAvailable: "Today 3:00 PM"
    },
    {
      name: "Dr. Emily Davis", 
      specialty: "Internal Medicine",
      rating: 4.7,
      nextAvailable: "Jan 22, 10:00 AM"
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patient Portal</h1>
          <p className="text-muted-foreground">Manage your health and appointments</p>
        </div>
        <Button 
          onClick={() => toast({ title: "Book Appointment", description: "Appointment booking interface opened." })}
          className="bg-gradient-to-r from-medical-primary to-medical-secondary text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Book Appointment
        </Button>
      </div>

      {/* Health Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-medical-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Upcoming Appointments</p>
              </div>
              <Calendar className="h-8 w-8 text-medical-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-medical-secondary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Medical Records</p>
              </div>
              <FileText className="h-8 w-8 text-medical-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-medical-accent/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">3</p>
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
                <p className="text-2xl font-bold">Healthy</p>
                <p className="text-sm text-muted-foreground">Overall Status</p>
              </div>
              <Heart className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upcoming Appointments */}
        <Card className="lg:col-span-2 border-medical-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-medical-primary" />
              Upcoming Appointments
            </CardTitle>
            <CardDescription>Your scheduled medical appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-card-hover transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-medical-primary/10 rounded-lg">
                      <Stethoscope className="h-4 w-4 text-medical-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{appointment.doctor}</p>
                      <p className="text-xs text-muted-foreground">{appointment.specialty}</p>
                      <p className="text-xs text-muted-foreground">{appointment.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{appointment.date}</p>
                    <p className="text-sm text-muted-foreground">{appointment.time}</p>
                    <Badge className={`text-xs ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </Badge>
                  </div>
                </div>
              ))}
              
              {upcomingAppointments.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No upcoming appointments</p>
                  <Button 
                    onClick={() => toast({ title: "Book Appointment", description: "Appointment booking interface opened." })}
                    variant="outline" 
                    className="mt-2"
                  >
                    Book an Appointment
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Available Doctors */}
        <Card className="border-medical-primary/20">
          <CardHeader>
            <CardTitle>Available Doctors</CardTitle>
            <CardDescription>Book with available specialists</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {availableDoctors.map((doctor, index) => (
              <div key={index} className="p-3 border border-border rounded-lg hover:bg-card-hover transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-sm">{doctor.name}</p>
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3 text-medical-accent" />
                    <span className="text-xs">{doctor.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{doctor.specialty}</p>
                <p className="text-xs text-success mb-2">Available: {doctor.nextAvailable}</p>
                <Button 
                  onClick={() => toast({ title: "Book Now", description: `Booking appointment with ${doctor.name}` })}
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                >
                  Book Now
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Medical Records */}
        <Card className="border-medical-primary/20">
          <CardHeader>
            <CardTitle>Recent Medical Records</CardTitle>
            <CardDescription>Your recent medical history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRecords.map((record, index) => (
                <div key={index} className="p-3 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-sm">{record.date}</p>
                    <Badge className={`text-xs ${getStatusColor(record.status)}`}>
                      {record.status}
                    </Badge>
                  </div>
                  <p className="text-sm">{record.diagnosis}</p>
                  <p className="text-xs text-muted-foreground">Dr: {record.doctor}</p>
                  <p className="text-xs text-muted-foreground">Prescription: {record.prescription}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lab Results */}
        <Card className="border-medical-primary/20">
          <CardHeader>
            <CardTitle>Lab Results</CardTitle>
            <CardDescription>Your recent test results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {labResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-semibold text-sm">{result.test}</p>
                    <p className="text-xs text-muted-foreground">Date: {result.date}</p>
                    <p className="text-xs">{result.result}</p>
                  </div>
                  <Badge className={`text-xs ${getStatusColor(result.status)}`}>
                    {result.status}
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