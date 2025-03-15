
// Mock data for bookings - in a real app, this would come from your database
export const mockBookings = [
  {
    id: "1",
    trainerName: "Alex Rodriguez",
    trainerImage: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specialty: "Strength & Conditioning",
    plan: "3 Months Plan",
    startDate: "2023-11-15",
    endDate: "2024-02-15",
    nextSession: "Monday, 10:00 AM",
    canUpgrade: true
  },
  {
    id: "2",
    trainerName: "Sarah Johnson",
    trainerImage: "https://images.unsplash.com/photo-1609899464110-a7caddaef3cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specialty: "Nutrition & Fat Loss",
    plan: "1 Day (Single Session)",
    startDate: "2023-11-20",
    endDate: "2023-11-20",
    nextSession: "Wednesday, 2:00 PM",
    canUpgrade: true
  }
];

// Available upgrade options
export const upgradeOptions = {
  "1 Day (Single Session)": [
    { duration: "3 Months Plan", price: 9450, savingsPercentage: 10 },
    { duration: "6 Months Plan", price: 17850, savingsPercentage: 15 },
    { duration: "1 Year Plan", price: 31500, savingsPercentage: 25 }
  ],
  "3 Months Plan": [
    { duration: "6 Months Plan", price: 8925, savingsPercentage: 15 },
    { duration: "1 Year Plan", price: 17850, savingsPercentage: 25 }
  ],
  "6 Months Plan": [
    { duration: "1 Year Plan", price: 11900, savingsPercentage: 25 }
  ],
  "1 Year Plan": []
};
