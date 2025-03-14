
import { Trainer } from "@/types/trainer";

type BookingSummaryProps = {
  trainer: Trainer;
  selectedDay: string;
  selectedTime: string;
};

const BookingSummary = ({ trainer, selectedDay, selectedTime }: BookingSummaryProps) => {
  return (
    <div className="glass-panel p-6 sticky top-24">
      <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
      
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
          <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="font-medium">{trainer.name}</h3>
          <p className="text-gold text-sm">{trainer.specialty}</p>
        </div>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-white/70">Date:</span>
          <span className="font-medium">{selectedDay}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/70">Time:</span>
          <span className="font-medium">{selectedTime}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/70">Session:</span>
          <span className="font-medium">1 hour</span>
        </div>
      </div>
      
      <div className="border-t border-dark-300 pt-4 mb-4">
        <div className="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span className="text-gold">${trainer.price}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
