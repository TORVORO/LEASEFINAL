"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSupabase } from '@/components/providers/supabase-provider';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { FileText, AlignJustify, User, LogOut, Settings, Bell, Search } from 'lucide-react';

interface DashboardHeaderProps {
  onSidebarOpen: () => void;
}

export function DashboardHeader({ onSidebarOpen }: DashboardHeaderProps) {
  const router = useRouter();
  const { supabase } = useSupabase();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSignOut = async () => {
    setIsLoading(true);
    
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
      router.push("/login");
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center bg-background border-b px-4">
      <div className="flex items-center gap-2 md:hidden">
        <Button variant="ghost" size="icon" onClick={onSidebarOpen}>
          <AlignJustify className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="md:hidden ml-2">
        <Link href="/dashboard" className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <span className="font-bold">LeaseLight</span>
        </Link>
      </div>
      
      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Search className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              <div className="p-3 hover:bg-muted rounded-md cursor-pointer">
                <p className="font-medium text-sm">Lease expiring soon</p>
                <p className="text-muted-foreground text-xs">NYC Office Headquarters expires in 30 days</p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
              </div>
              <div className="p-3 hover:bg-muted rounded-md cursor-pointer">
                <p className="font-medium text-sm">New team member added</p>
                <p className="text-muted-foreground text-xs">John Doe has been added to your team</p>
                <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
              </div>
              <div className="p-3 hover:bg-muted rounded-md cursor-pointer">
                <p className="font-medium text-sm">Journal entries ready</p>
                <p className="text-muted-foreground text-xs">Monthly journal entries are ready for review</p>
                <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/notifications" className="w-full cursor-pointer">
                View all notifications
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={isLoading}
              onClick={handleSignOut}
              className="cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}