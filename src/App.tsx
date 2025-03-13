
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Goals from "./pages/Goals";
import Trainers from "./pages/Trainers";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import PaymentProvider from "./components/PaymentProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/checkout" element={
            <PaymentProvider>
              <Checkout />
            </PaymentProvider>
          } />
          <Route path="/pricing" element={<NotFound />} />
          <Route path="/dashboard" element={<NotFound />} />
          <Route path="/login" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
