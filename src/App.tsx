import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ForCorporates from "./pages/ForCorporates";
import ForSchools from "./pages/ForSchools";
import ForMentors from "./pages/ForMentors";
import ForStudents from "./pages/ForStudents";
import Login from "./pages/Login";
import CorporateSignup from "./pages/CorporateSignup";
import CorporateDashboard from "./pages/CorporateDashboard";
import MentorSignup from "./pages/MentorSignup";
import SchoolSignup from "./pages/SchoolSignup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/for-corporates" element={<ForCorporates />} />
          <Route path="/for-schools" element={<ForSchools />} />
          <Route path="/for-mentors" element={<ForMentors />} />
          <Route path="/for-students" element={<ForStudents />} />
          <Route path="/login" element={<Login />} />
          <Route path="/corporate-signup" element={<CorporateSignup />} />
          <Route path="/corporate-dashboard" element={<CorporateDashboard />} />
          <Route path="/mentor-signup" element={<MentorSignup />} />
          <Route path="/school-signup" element={<SchoolSignup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
