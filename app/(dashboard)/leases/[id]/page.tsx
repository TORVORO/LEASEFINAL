"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  ResponsiveContainer, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { ArrowLeft, Pencil, FileText, AlertTriangle, Check, Calendar } from 'lucide-react';
import { LeaseOverview } from '@/components/lease/lease-overview';
import { LeaseAmortizationTable } from '@/components/lease/lease-amortization-table';
import { LeaseJournalEntries } from '@/components/lease/lease-journal-entries';

interface LeaseDetailsPageProps {
  params: {
    id: string;
  };
}

export default function LeaseDetailsPage({ params }: LeaseDetailsPageProps) {
  const { id } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [lease, setLease] = useState<any>(null);
  
  // Mock amortization data
  const amortizationData = [
    { month: 'Jan 2023', principal: 10000, interest: 3000, payment: 13000, balance: 290000 },
    { month: 'Feb 2023', principal: 10200, interest: 2800, payment: 13000, balance: 279800 },
    { month: 'Mar 2023', principal: 10400, interest: 2600, payment: 13000, balance: 269400 },
    { month: 'Apr 2023', principal: 10600, interest: 2400, payment: 13000, balance: 258800 },
    { month: 'May 2023', principal: 10800, interest: 2200, payment: 13000, balance: 248000 },
    { month: 'Jun 2023', principal: 11000, interest: 2000, payment: 13000, balance: 237000 },
    { month: 'Jul 2023', principal: 11200, interest: 1800, payment: 13000, balance: 225800 },
    { month: 'Aug 2023', principal: 11400, interest: 1600, payment: 13000, balance: 214400 },
  ];
  
  // Mock chart data for amortization
  const chartData = [
    { name: '2023', principal: 120000, interest: 35000 },
    { name: '2024', principal: 130000, interest: 25000 },
    { name: '2025', principal: 140000, interest: 15000 },
    { name: '2026', principal: 150000, interest: 5000 },
  ];

  // Simulate fetching lease data
  useEffect(() => {
    const timer = setTimeout(() => {
      const mockLease = {
        id,
        name: 'NYC Office Headquarters',
        description: 'Main office space in Midtown Manhattan',
        type: 'Finance',
        classification: 'ASC 842 Finance Lease',
        status: 'Active',
        startDate: '2023-01-01',
        endDate: '2028-12-31',
        term: 72, // months
        liability: 1250000,
        assetType: 'Buildings',
        paymentFrequency: 'Monthly',
        paymentAmount: 13000,
        interestRate: 5.25,
        assetValue: 1300000,
        lesseeIncrementalBorrowingRate: 5.25,
        leaseIncentives: 50000,
        initialDirectCosts: 25000,
        lessor: 'Manhattan Properties LLC',
        contacts: [
          { name: 'Jane Smith', email: 'jane@manhattanproperties.com', phone: '212-555-1234' }
        ],
        documents: [
          { id: 'doc1', name: 'Original Lease Agreement.pdf', type: 'application/pdf', uploadedAt: '2023-01-01T12:00:00Z' },
          { id: 'doc2', name: 'First Amendment.pdf', type: 'application/pdf', uploadedAt: '2023-02-15T14:30:00Z' }
        ],
        notes: 'Includes option to extend for 3 additional years at market rate. Tenant responsible for all repairs and maintenance.',
        paymentTerms: 'Net 15',
        securityDeposit: 39000,
        glCodes: {
          asset: '180000',
          accumulatedDepreciation: '180100',
          leasePayment: '600000',
          interestExpense: '680000'
        },
        companyEntityName: 'ABC Corporation',
      };
      
      setLease(mockLease);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/leases">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            {isLoading ? 'Loading...' : lease?.name}
          </h1>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Set Reminder
          </Button>
          <Button size="sm" asChild>
            <Link href={`/leases/${id}/edit`}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {Array(3).fill(0).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-5 bg-muted rounded w-1/3"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Lease Type</CardTitle>
                <CardDescription>Classification under ASC 842</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{lease.type}</div>
                <div className="text-sm text-muted-foreground mt-1 flex items-center">
                  <Check className="h-4 w-4 mr-1 text-green-500" />
                  Properly classified
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Lease Liability</CardTitle>
                <CardDescription>Present value of lease payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${lease.liability.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  As of {new Date().toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Lease Term</CardTitle>
                <CardDescription>Duration and key dates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{lease.term} months</div>
                <div className="text-sm text-muted-foreground mt-1 flex items-center">
                  {new Date(lease.endDate) < new Date() ? (
                    <>
                      <AlertTriangle className="h-4 w-4 mr-1 text-destructive" />
                      Expired on {new Date(lease.endDate).toLocaleDateString()}
                    </>
                  ) : (
                    <>
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      Expires on {new Date(lease.endDate).toLocaleDateString()}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 md:w-[600px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="amortization">Amortization</TabsTrigger>
              <TabsTrigger value="journal">Journal Entries</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <LeaseOverview lease={lease} />
            </TabsContent>
            
            <TabsContent value="amortization" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Amortization Schedule</CardTitle>
                  <CardDescription>Principal and interest breakdown over the lease term</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={chartData}
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
                  </div>
                  
                  <LeaseAmortizationTable data={amortizationData} />
                  
                  <div className="p-4 border-t">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Export Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="journal" className="space-y-6">
              <LeaseJournalEntries leaseId={id} />
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lease Documents</CardTitle>
                  <CardDescription>Contracts and amendments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lease.documents.map((doc: any) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{doc.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}