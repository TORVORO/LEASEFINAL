import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpRight, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface UpcomingLeasesListProps {
  isLoading?: boolean;
}

export function UpcomingLeasesList({ isLoading = false }: UpcomingLeasesListProps) {
  // Mock data for upcoming leases
  const upcomingLeases = [
    {
      id: "1",
      name: "Delivery Fleet - Trucks",
      expiryDate: "2023-08-31",
      daysLeft: 82,
      status: "renewal",
    },
    {
      id: "2",
      name: "Chicago Warehouse",
      expiryDate: "2023-09-15",
      daysLeft: 97,
      status: "renewal",
    },
    {
      id: "3",
      name: "Office Furniture",
      expiryDate: "2023-10-01",
      daysLeft: 113,
      status: "remeasurement",
    },
    {
      id: "4",
      name: "Data Center Servers",
      expiryDate: "2023-11-30",
      daysLeft: 173,
      status: "termination",
    },
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "renewal":
        return <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800">Renewal</Badge>;
      case "remeasurement":
        return <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900 dark:text-orange-300 dark:border-orange-800">Remeasurement</Badge>;
      case "termination":
        return <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-800">Termination</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border rounded-md p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-4 max-h-[280px] overflow-y-auto pr-1">
      {upcomingLeases.map((lease) => (
        <div key={lease.id} className="border rounded-md p-4 hover:bg-muted/50 transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{lease.name}</h4>
              <div className="flex items-center mt-1">
                <p className="text-sm text-muted-foreground mr-2">
                  Expires: {new Date(lease.expiryDate).toLocaleDateString()}
                </p>
                {lease.daysLeft < 90 && (
                  <div className="flex items-center text-amber-600 text-xs">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {lease.daysLeft} days left
                  </div>
                )}
              </div>
              <div className="mt-2">
                {getStatusBadge(lease.status)}
              </div>
            </div>
            <Button variant="ghost" size="sm" className="h-8">
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}