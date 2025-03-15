
import { useState } from 'react';
import BookingCard from './BookingCard';

type BookingType = {
  id: string;
  trainerName: string;
  trainerImage: string;
  specialty: string;
  plan: string;
  startDate: string;
  endDate: string;
  nextSession: string;
  canUpgrade: boolean;
};

type ActiveBookingsProps = {
  bookings: BookingType[];
  upgradeOptions: Record<string, { duration: string; price: number; savingsPercentage: number }[]>;
};

const ActiveBookings = ({ bookings, upgradeOptions }: ActiveBookingsProps) => {
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  
  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <BookingCard 
          key={booking.id}
          booking={booking}
          selectedBooking={selectedBooking}
          setSelectedBooking={setSelectedBooking}
          upgradeOptions={upgradeOptions}
        />
      ))}
    </div>
  );
};

export default ActiveBookings;
