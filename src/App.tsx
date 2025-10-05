import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollTopButton } from "@/components/ui/ScrollTopButton";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

// Lazy load pages for better performance
const IndexSupabase = lazy(() => import("./pages/IndexSupabase"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Professionals = lazy(() => import("./pages/Professionals"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const CityPage = lazy(() => import("./pages/CityPage"));
const ProfessionalProfile = lazy(() => import("./pages/ProfessionalProfile"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Login = lazy(() => import("./pages/Login"));
const Profilo = lazy(() => import("./pages/Profilo"));
const Registrati = lazy(() => import("./pages/Registrati"));
const Preferiti = lazy(() => import("./pages/Preferiti"));
const Prenotazioni = lazy(() => import("./pages/Prenotazioni"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingSkeleton />}>
          <Routes>
            <Route path="/" element={<IndexSupabase />} />
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
            <Route 
              path="/prenotazioni" 
              element={
                <ProtectedRoute>
                  <Prenotazioni />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        {/* Scroll to Top Button - Visibile su TUTTE le pagine */}
        <ScrollTopButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
