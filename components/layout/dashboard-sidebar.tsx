"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  FileText,
  Settings,
  Users,
  BarChart3,
  X,
  CreditCard,
  FileUp,
  HelpCircle,
} from 'lucide-react';

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function DashboardSidebar({
  isOpen,
  onClose,
  className,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  
  const navItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: 'Leases',
      href: '/leases',
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: 'Reports',
      href: '/reports',
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: 'Import',
      href: '/leases/import',
      icon: <FileUp className="h-5 w-5" />,
    },
    {
      title: 'Team',
      href: '/settings/team',
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: 'Billing',
      href: '/settings/billing',
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <Settings className="h-5 w-5" />,
    },
  ];
  
  return (
    <div
      className={cn(
        'flex flex-col h-full bg-background transition-transform',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0',
        className
      )}
    >
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">LeaseLight</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 md:hidden"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition-colors',
                pathname === item.href
                  ? 'bg-muted'
                  : 'text-muted-foreground'
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-4">
        <div className="rounded-md bg-muted p-4">
          <div className="mb-2 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Need Help?</h4>
          </div>
          <p className="mb-3 text-xs text-muted-foreground">
            Have questions or need assistance with your lease accounting?
          </p>
          <Button size="sm" variant="outline" className="w-full">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}