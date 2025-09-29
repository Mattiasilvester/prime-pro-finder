import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Professionals from "./pages/Professionals";
import CategoryPage from "./pages/CategoryPage";
import CityPage from "./pages/CityPage";
import ProfessionalProfile from "./pages/ProfessionalProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/professionisti" element={<Professionals />} />
          <Route path="/professionisti/:category" element={<CategoryPage />} />
          <Route path="/professionisti/:category/:city" element={<CityPage />} />
          <Route path="/professionisti/:category/:city/:slug" element={<ProfessionalProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
