import { Skeleton } from "@/components/ui/skeleton";
import { FileText, User, AlertTriangle, Clock, Check } from "lucide-react";

interface RecentActivityListProps {
  isLoading?: boolean;
}

export function RecentActivityList({ isLoading = false }: RecentActivityListProps) {
  // Mock data for recent activity
  const activities = [
    {
      id: 1,
      title: "Lease document uploaded",
      description: "NYC Office Headquarters",
      time: "2 hours ago",
      icon: <FileText className="h-4 w-4" />,
      iconBg: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      title: "Team member added",
      description: "Sarah Johnson",
      time: "Yesterday",
      icon: <User className="h-4 w-4" />,
      iconBg: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      title: "Lease expiring soon",
      description: "Delivery Fleet - Trucks",
      time: "2 days ago",
      icon: <AlertTriangle className="h-4 w-4" />,
      iconBg: "bg-amber-100 text-amber-600",
    },
    {
      id: 4,
      title: "Journal entries created",
      description: "Monthly entries for May 2023",
      time: "3 days ago",
      icon: <Check className="h-4 w-4" />,
      iconBg: "bg-purple-100 text-purple-600",
    },
    {
      id: 5,
      title: "Lease term updated",
      description: "Manufacturing Equipment",
      time: "1 week ago",
      icon: <Clock className="h-4 w-4" />,
      iconBg: "bg-indigo-100 text-indigo-600",
    },
  ];
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-start gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3">
          <div className={`rounded-full p-2 ${activity.iconBg} dark:bg-opacity-20`}>
            {activity.icon}
          </div>
          <div>
            <p className="text-sm font-medium">{activity.title}</p>
            <p className="text-xs text-muted-foreground">{activity.description}</p>
            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}