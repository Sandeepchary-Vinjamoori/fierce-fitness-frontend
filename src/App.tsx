
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

import Index from "./pages/Index";
import Goals from "./pages/Goals";
import Trainers from "./pages/Trainers";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import PaymentProvider from "./components/PaymentProvider";
import { useAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

// Route that requires authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen bg-dark flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/goals" element={<Goals />} />
      <Route path="/trainers" element={<Trainers />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/checkout" element={
        <ProtectedRoute>
          <PaymentProvider>
            <Checkout />
          </PaymentProvider>
        </ProtectedRoute>
      } />
      <Route path="/pricing" element={<NotFound />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <NotFound />
        </ProtectedRoute>
      } />
      <Route path="/login" element={<Navigate to="/auth" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
