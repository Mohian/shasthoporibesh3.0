
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PatientRegistration from "./pages/Registration/PatientRegistration";
import DoctorRegistration from "./pages/Registration/DoctorRegistration";
import BloodBankRegistration from "./pages/Registration/BloodBankRegistration";
import DiagnosticRegistration from "./pages/Registration/DiagnosticRegistration";
import Doctors from "./pages/Doctors";
import BloodBanks from "./pages/BloodBanks";
import Diagnostics from "./pages/Diagnostics";
import Hospitals from "./pages/Hospitals";
import Prescriptions from "./pages/Prescriptions";
import Appointments from "./pages/Appointments";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register/patient" element={<PatientRegistration />} />
            <Route path="/register/doctor" element={<DoctorRegistration />} />
            <Route path="/register/bloodbank" element={<BloodBankRegistration />} />
            <Route path="/register/diagnostic" element={<DiagnosticRegistration />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/blood-banks" element={<BloodBanks />} />
            <Route path="/diagnostics" element={<Diagnostics />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/prescriptions" element={<Prescriptions />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
