import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@/components/LoginPage";
import { DashboardLayout } from "@/components/DashboardLayout";
import { AdminDashboard } from "@/components/dashboards/AdminDashboard";
import { DoctorDashboard } from "@/components/dashboards/DoctorDashboard";
import { PatientDashboard } from "@/components/dashboards/PatientDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

interface User {
  email: string;
  role: string;
  name: string;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (credentials: { email: string; password: string; role: string }) => {
    // In a real app, this would validate against backend
    // For demo purposes, we'll create a mock user based on role
    const userName = credentials.role === 'admin' ? 'Admin User' : 
                    credentials.role === 'doctor' ? 'Dr. Smith' : 'John Doe';
    
    setUser({
      email: credentials.email,
      role: credentials.role,
      name: userName
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const renderDashboard = () => {
    if (!user) return <Navigate to="/login" replace />;

    const dashboardContent = () => {
      switch (user.role) {
        case 'admin':
          return <AdminDashboard />;
        case 'doctor':
          return <DoctorDashboard />;
        case 'patient':
          return <PatientDashboard />;
        default:
          return <div>Invalid role</div>;
      }
    };

    return (
      <DashboardLayout 
        userRole={user.role} 
        userName={user.name} 
        onLogout={handleLogout}
      >
        {dashboardContent()}
      </DashboardLayout>
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/login" 
              element={
                user ? <Navigate to={`/${user.role}`} replace /> : <LoginPage onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/" 
              element={
                user ? <Navigate to={`/${user.role}`} replace /> : <Navigate to="/login" replace />
              } 
            />
            <Route path="/admin/*" element={renderDashboard()} />
            <Route path="/doctor/*" element={renderDashboard()} />
            <Route path="/patient/*" element={renderDashboard()} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;