"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { FileText, Download, Printer, Mail, Clock, Settings } from 'lucide-react';
import { ReportCard } from '@/components/reports/report-card';
import { SavedReportsList } from '@/components/reports/saved-reports-list';
import { JournalEntryPreview } from '@/components/reports/journal-entry-preview';

export default function ReportsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select defaultValue="current">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Period</SelectItem>
              <SelectItem value="previous">Previous Period</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="standard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
          <TabsTrigger value="standard">Standard Reports</TabsTrigger>
          <TabsTrigger value="journal">Journal Entries</TabsTrigger>
          <TabsTrigger value="saved">Saved Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="standard" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ReportCard
              title="Lease Rollforward"
              description="Changes in ROU assets and lease liabilities for the period"
              icon={<FileText className="h-5 w-5" />}
              href="/reports/rollforward"
            />
            <ReportCard
              title="Lease Maturity Analysis"
              description="Future lease payments categorized by maturity dates"
              icon={<Clock className="h-5 w-5" />}
              href="/reports/maturity"
            />
            <ReportCard
              title="ASC 842 Disclosure Report"
              description="Generate all required footnote disclosures"
              icon={<FileText className="h-5 w-5" />}
              href="/reports/disclosure"
            />
            <ReportCard
              title="Lease Expense Summary"
              description="Summary of all lease-related expenses"
              icon={<FileText className="h-5 w-5" />}
              href="/reports/expense"
            />
            <ReportCard
              title="Lease Contract Listing"
              description="Detailed listing of all lease contracts"
              icon={<FileText className="h-5 w-5" />}
              href="/reports/contracts"
            />
            <ReportCard
              title="Custom Report"
              description="Create a customized report with selected fields"
              icon={<Settings className="h-5 w-5" />}
              href="/reports/custom"
              variant="outline"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="journal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Journal Entries</CardTitle>
              <CardDescription>
                Preview and export journal entries for your accounting system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Select defaultValue="month">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Monthly Entry</SelectItem>
                      <SelectItem value="quarter">Quarterly Entry</SelectItem>
                      <SelectItem value="year">Annual Entry</SelectItem>
                      <SelectItem value="inception">Initial Recognition</SelectItem>
                    </SelectContent>
                  </Select>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border hidden md:block"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                </div>
              </div>
              
              <JournalEntryPreview date={date} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="saved" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Saved Reports</CardTitle>
              <CardDescription>
                Access your previously generated reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SavedReportsList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}