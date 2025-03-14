
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { PaymentProvider } from '@/components/PaymentProvider';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

// Pages
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Goals from '@/pages/Goals';
import Trainers from '@/pages/Trainers';
import Checkout from '@/pages/Checkout';
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <PaymentProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/auth" element={<Auth />} />
            <Route 
              path="/checkout" 
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </PaymentProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
