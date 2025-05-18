"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, ArrowLeft, FileUp, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { PDFUploader } from '@/components/lease/pdf-uploader';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Lease name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  assetType: z.string().min(1, {
    message: "Please select an asset type.",
  }),
  lessor: z.string().min(2, {
    message: "Lessor name must be at least 2 characters.",
  }),
  leaseType: z.string().min(1, {
    message: "Please select a lease type.",
  }),
  startDate: z.date({
    required_error: "Start date is required.",
  }),
  endDate: z.date({
    required_error: "End date is required.",
  }),
  paymentAmount: z.coerce.number().positive({
    message: "Payment amount must be a positive number.",
  }),
  paymentFrequency: z.string().min(1, {
    message: "Please select a payment frequency.",
  }),
  interestRate: z.coerce.number().positive({
    message: "Interest rate must be a positive number.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewLeasePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('manual');
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      assetType: '',
      lessor: '',
      leaseType: '',
      paymentAmount: 0,
      paymentFrequency: '',
      interestRate: 0,
    },
  });

  function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(data);
      toast({
        title: 'Lease created',
        description: 'Your new lease has been created successfully.',
      });
      router.push('/leases');
      setIsSubmitting(false);
    }, 1500);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/leases">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Add New Lease</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="pdf">Upload PDF</TabsTrigger>
        </TabsList>
        
        <TabsContent value="manual" className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lease Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Office Space Lease" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter a descriptive name for this lease
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="assetType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Asset Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select asset type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="buildings">Buildings</SelectItem>
                              <SelectItem value="equipment">Equipment</SelectItem>
                              <SelectItem value="vehicles">Vehicles</SelectItem>
                              <SelectItem value="land">Land</SelectItem>
                              <SelectItem value="it_equipment">IT Equipment</SelectItem>
                              <SelectItem value="furniture">Furniture & Fixtures</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            The type of asset being leased
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide details about this lease"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Lease Details</h3>
                  <Separator className="mb-6" />
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="lessor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lessor</FormLabel>
                          <FormControl>
                            <Input placeholder="Lessor Company Name" {...field} />
                          </FormControl>
                          <FormDescription>
                            The entity you are leasing from
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="leaseType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lease Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select lease type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="finance">Finance Lease</SelectItem>
                              <SelectItem value="operating">Operating Lease</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            ASC 842 classification
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Start Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>End Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="paymentAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Amount</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="0.01" {...field} />
                          </FormControl>
                          <FormDescription>
                            Regular payment amount
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="paymentFrequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Frequency</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="quarterly">Quarterly</SelectItem>
                              <SelectItem value="semi-annually">Semi-Annually</SelectItem>
                              <SelectItem value="annually">Annually</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            How often payments are made
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="interestRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interest Rate (%)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="0.01" {...field} />
                          </FormControl>
                          <FormDescription>
                            Implicit rate or incremental borrowing rate
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                  onClick={() => router.push('/leases')}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Lease
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>
        
        <TabsContent value="pdf" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <PDFUploader />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}