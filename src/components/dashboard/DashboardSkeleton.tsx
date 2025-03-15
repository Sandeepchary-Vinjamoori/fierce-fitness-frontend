
import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      {[1, 2].map((i) => (
        <div key={i} className="glass-panel overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Skeleton className="w-16 h-16 rounded-full mr-4" />
              <div>
                <Skeleton className="h-5 w-40 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[1, 2, 3].map((j) => (
                <div key={j} className="flex items-start">
                  <Skeleton className="w-5 h-5 mt-1 mr-2" />
                  <div>
                    <Skeleton className="h-3 w-24 mb-1" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-9 w-32" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSkeleton;
