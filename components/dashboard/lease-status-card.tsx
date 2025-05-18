"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDownIcon, ArrowUpIcon, Files, DollarSign, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaseStatusCardProps {
  title: string;
  value: number;
  description: string;
  icon: "Files" | "DollarSign" | "Clock" | "Calendar";
  trend?: "up" | "down" | "none";
  trendValue?: string;
  isCurrency?: boolean;
  unit?: string;
  isLoading?: boolean;
}

export function LeaseStatusCard({
  title,
  value,
  description,
  icon,
  trend = "none",
  trendValue,
  isCurrency = false,
  unit = "",
  isLoading = false,
}: LeaseStatusCardProps) {
  const formatValue = () => {
    if (isCurrency) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    }
    
    if (unit) {
      return `${value} ${unit}`;
    }
    
    return value;
  };
  
  const getIcon = () => {
    switch (icon) {
      case "Files":
        return <Files className="h-4 w-4" />;
      case "DollarSign":
        return <DollarSign className="h-4 w-4" />;
      case "Clock":
        return <Clock className="h-4 w-4" />;
      case "Calendar":
        return <Calendar className="h-4 w-4" />;
      default:
        return <Files className="h-4 w-4" />;
    }
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium leading-none">{title}</p>
          <div className="rounded-full bg-muted p-1.5">
            {getIcon()}
          </div>
        </div>
        
        {isLoading ? (
          <>
            <Skeleton className="h-9 w-2/3 mt-2" />
            <Skeleton className="h-4 w-3/4 mt-2" />
          </>
        ) : (
          <>
            <div className="text-2xl font-bold">{formatValue()}</div>
            <div className="flex items-center pt-1">
              {trend !== "none" && (
                <div
                  className={cn(
                    "flex items-center text-xs font-medium mr-2",
                    trend === "up" ? "text-emerald-500" : "text-red-500"
                  )}
                >
                  {trend === "up" ? (
                    <ArrowUpIcon className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-3 w-3 mr-1" />
                  )}
                  {trendValue}%
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                {description}
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}