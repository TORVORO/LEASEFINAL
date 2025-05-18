"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSupabase } from "@/components/providers/supabase-provider";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { Loader2 } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { supabase } = useSupabase();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        router.push("/login");
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, supabase.auth]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        className="hidden md:block md:w-64 flex-shrink-0 border-r"
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader 
          onSidebarOpen={() => setIsSidebarOpen(true)} 
        />
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}