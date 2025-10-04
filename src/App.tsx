import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollTopButton } from "@/components/ui/ScrollTopButton";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import IndexSupabase from "./pages/IndexSupabase";
import NotFound from "./pages/NotFound";
import Professionals from "./pages/Professionals";
import CategoryPage from "./pages/CategoryPage";
import CityPage from "./pages/CityPage";
import ProfessionalProfile from "./pages/ProfessionalProfile";
import TestPage from "./pages/TestPage";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import Profilo from "./pages/Profilo";
import Registrati from "./pages/Registrati";
import Preferiti from "./pages/Preferiti";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexSupabase />} />
          <Route path="/mock" element={<Index />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/come-funziona" element={<HowItWorks />} />
          <Route path="/professionisti" element={<Professionals />} />
          <Route path="/professionisti/:category" element={<CategoryPage />} />
          <Route path="/professionisti/:category/:city" element={<CityPage />} />
          <Route path="/professionisti/:category/:city/:slug" element={<ProfessionalProfile />} />
          <Route path="/accedi" element={<Login />} />
          <Route path="/registrati" element={<Registrati />} />
          <Route 
            path="/profilo" 
            element={
              <ProtectedRoute>
                <Profilo />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/preferiti" 
            element={
              <ProtectedRoute>
                <Preferiti />
              </ProtectedRoute>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* Scroll to Top Button - Visibile su TUTTE le pagine */}
        <ScrollTopButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
