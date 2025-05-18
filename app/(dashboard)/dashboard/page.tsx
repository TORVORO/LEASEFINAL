"use client";

import { useState, useEffect } from 'react';
import { 
  BarChart,
  ResponsiveContainer,
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, FileUpIcon, PlusIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { LeaseStatusCard } from '@/components/dashboard/lease-status-card';
import { RecentActivityList } from '@/components/dashboard/recent-activity-list';
import { UpcomingLeasesList } from '@/components/dashboard/upcoming-leases-list';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Mock data - would come from Supabase in production
const amortizationData = [
  { name: 'Jan', principal: 4000, interest: 2400 },
  { name: 'Feb', principal: 3000, interest: 2210 },
  { name: 'Mar', principal: 2000, interest: 2290 },
  { name: 'Apr', principal: 2780, interest: 2000 },
  { name: 'May', principal: 1890, interest: 1900 },
  { name: 'Jun', principal: 2390, interest: 1800 },
];

const leaseTypeData = [
  { name: 'Operating', value: 65 },
  { name: 'Finance', value: 35 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))'];

export default function DashboardPage() {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [leaseCount, setLeaseCount] = useState(0);
  const [totalLiability, setTotalLiability] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLeaseCount(12);
      setTotalLiability(1245678);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/leases/import">
              <FileUpIcon className="mr-2 h-4 w-4" />
              Import Leases
            </Link>
          </Button>
          <Button asChild>
            <Link href="/leases/new">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add New Lease
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <LeaseStatusCard
          title="Total Leases"
          value={leaseCount}
          description="Active lease contracts"
          icon="Files"
          trend="up"
          trendValue="2"
          isLoading={isLoading}
        />
        <LeaseStatusCard
          title="Total Liability"
          value={totalLiability}
          isCurrency={true}
          description="Present value of lease obligations"
          icon="DollarSign"
          trend="down"
          trendValue="5.2"
          isLoading={isLoading}
        />
        <LeaseStatusCard
          title="Avg Lease Term"
          value={5.3}
          unit="years"
          description="Average remaining lease term"
          icon="Clock"
          trend="up"
          trendValue="0.3"
          isLoading={isLoading}
        />
        <LeaseStatusCard
          title="Upcoming Renewals"
          value={2}
          description="Leases expiring in next 90 days"
          icon="Calendar"
          trend="none"
          isLoading={isLoading}
        />
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="amortization">Amortization</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Lease Classification</CardTitle>
                <CardDescription>Distribution of operating vs. finance leases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={leaseTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {leaseTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest lease-related changes</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivityList isLoading={isLoading} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="amortization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Amortization Schedule</CardTitle>
              <CardDescription>Principal vs. interest payments over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={amortizationData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="principal" name="Principal" fill="hsl(var(--chart-1))" />
                    <Bar dataKey="interest" name="Interest" fill="hsl(var(--chart-2))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="compliance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Compliance Calendar</CardTitle>
                <CardDescription>Important lease dates and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-4">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                  <CardDescription>Renewal and remeasurement dates</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <UpcomingLeasesList isLoading={isLoading} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}