
import { ReactNode } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
// In a real app, this would be in a .env file
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

interface PaymentProviderProps {
  children: ReactNode;
}

const PaymentProvider = ({ children }: PaymentProviderProps) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default PaymentProvider;
