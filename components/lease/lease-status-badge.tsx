import { Badge } from "@/components/ui/badge";

interface LeaseStatusBadgeProps {
  status: string;
}

export function LeaseStatusBadge({ status }: LeaseStatusBadgeProps) {
  switch (status.toLowerCase()) {
    case "active":
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800">
          Active
        </Badge>
      );
    case "expired":
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-200 dark:border-red-800">
          Expired
        </Badge>
      );
    case "draft":
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800">
          Draft
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}