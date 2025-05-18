"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, FileUp, Search, SlidersHorizontal } from 'lucide-react';
import { LeaseTableSkeleton } from '@/components/lease/lease-table-skeleton';
import { LeaseStatusBadge } from '@/components/lease/lease-status-badge';

interface Lease {
  id: string;
  name: string;
  type: 'Finance' | 'Operating';
  status: 'Active' | 'Expired' | 'Draft';
  startDate: string;
  endDate: string;
  liability: number;
  asset: string;
}

export default function LeasesPage() {
  const [leases, setLeases] = useState<Lease[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading data from Supabase
  useEffect(() => {
    const timer = setTimeout(() => {
      const mockLeases: Lease[] = [
        {
          id: '1',
          name: 'NYC Office Headquarters',
          type: 'Finance',
          status: 'Active',
          startDate: '2023-01-01',
          endDate: '2028-12-31',
          liability: 1250000,
          asset: 'Buildings'
        },
        {
          id: '2',
          name: 'Delivery Fleet - Trucks',
          type: 'Operating',
          status: 'Active',
          startDate: '2022-06-15',
          endDate: '2026-06-14',
          liability: 350000,
          asset: 'Vehicles'
        },
        {
          id: '3',
          name: 'Manufacturing Equipment',
          type: 'Finance',
          status: 'Active',
          startDate: '2023-03-01',
          endDate: '2028-02-28',
          liability: 780000,
          asset: 'Equipment'
        },
        {
          id: '4',
          name: 'Chicago Warehouse',
          type: 'Operating',
          status: 'Draft',
          startDate: '2023-08-01',
          endDate: '2026-07-31',
          liability: 420000,
          asset: 'Buildings'
        },
        {
          id: '5',
          name: 'Office Furniture',
          type: 'Operating',
          status: 'Expired',
          startDate: '2020-02-15',
          endDate: '2023-02-14',
          liability: 0,
          asset: 'Furniture'
        },
        {
          id: '6',
          name: 'Data Center Servers',
          type: 'Finance',
          status: 'Active',
          startDate: '2022-11-01',
          endDate: '2027-10-31',
          liability: 965000,
          asset: 'IT Equipment'
        },
      ];
      
      setLeases(mockLeases);
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter leases based on search query and filters
  const filteredLeases = leases.filter(lease => {
    const matchesSearch = lease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lease.asset.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lease.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesType = typeFilter === 'all' || lease.type.toLowerCase() === typeFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Leases</h1>
        <div className="flex w-full sm:w-auto items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/leases/import">
              <FileUp className="mr-2 h-4 w-4" />
              Import
            </Link>
          </Button>
          <Button asChild>
            <Link href="/leases/new">
              <Plus className="mr-2 h-4 w-4" />
              Add New Lease
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
        <div className="relative w-full sm:w-auto max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search leases..."
            className="pl-8 w-full sm:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="operating">Operating</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        {isLoading ? (
          <LeaseTableSkeleton rowCount={5} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Asset Type</TableHead>
                <TableHead>Lease Type</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead className="text-right">Liability</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeases.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No leases found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredLeases.map((lease) => (
                  <TableRow key={lease.id}>
                    <TableCell className="font-medium">
                      <Link href={`/leases/${lease.id}`} className="hover:underline">
                        {lease.name}
                      </Link>
                    </TableCell>
                    <TableCell>{lease.asset}</TableCell>
                    <TableCell>
                      <Badge variant={lease.type === 'Finance' ? 'default' : 'secondary'}>
                        {lease.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(lease.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(lease.endDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">${lease.liability.toLocaleString()}</TableCell>
                    <TableCell>
                      <LeaseStatusBadge status={lease.status} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}