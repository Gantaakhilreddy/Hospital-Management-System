import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Stethoscope, Shield, User, Heart } from "lucide-react";

interface LoginCredentials {
  email: string;
  password: string;
  role: string;
}

interface LoginPageProps {
  onLogin: (credentials: LoginCredentials) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
    role: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(credentials);
  };

  const demoAccounts = [
    {
      role: "admin",
      email: "admin@hospital.com",
      password: "password",
      icon: Shield,
      title: "Hospital Administrator",
      description: "Full system access and management"
    },
    {
      role: "doctor",
      email: "doctor@hospital.com", 
      password: "password",
      icon: Stethoscope,
      title: "Medical Doctor",
      description: "Patient care and medical records"
    },
    {
      role: "patient",
      email: "user@hospital.com",
      password: "password", 
      icon: User,
      title: "Patient Portal",
      description: "Book appointments and view records"
    }
  ];

  const fillDemoCredentials = (account: typeof demoAccounts[0]) => {
    setCredentials({
      email: account.email,
      password: account.password,
      role: account.role
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-primary/10 via-background to-medical-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Hero Section */}
        <div className="hidden lg:block space-y-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-gradient-to-r from-medical-primary to-medical-secondary rounded-2xl">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-medical-primary to-medical-secondary bg-clip-text text-transparent">
                HealthCare
              </h1>
              <p className="text-muted-foreground">Management System</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-foreground">
              Modern Healthcare Management
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Streamline patient care, manage appointments, and access medical records 
              with our comprehensive hospital management platform.
            </p>
          </div>

          <div className="grid gap-4 mt-8">
            {demoAccounts.map((account) => {
              const Icon = account.icon;
              return (
                <Card 
                  key={account.role}
                  className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-medical-primary/20"
                  onClick={() => fillDemoCredentials(account)}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-2 bg-medical-primary/10 rounded-lg">
                      <Icon className="h-5 w-5 text-medical-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{account.title}</h4>
                      <p className="text-xs text-muted-foreground">{account.description}</p>
                    </div>
                    <Button variant="outline" size="sm">Try Demo</Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Login Form */}
        <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-card/95 backdrop-blur">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-r from-medical-primary to-medical-secondary rounded-2xl">
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription>Access your healthcare dashboard</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={credentials.email}
                  onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={credentials.role} onValueChange={(value) => setCredentials(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="patient">Patient</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-medical-primary to-medical-secondary hover:opacity-90 text-white font-semibold"
                disabled={!credentials.email || !credentials.password || !credentials.role}
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <p className="text-xs text-center text-muted-foreground">
                Demo credentials available above • Click any demo account to auto-fill
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}