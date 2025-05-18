"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { AlignJustify, X, FileText } from 'lucide-react';

export function LandingHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">LeaseLight</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex gap-6">
          <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
            Pricing
          </Link>
          <Link href="/blog" className="text-sm font-medium transition-colors hover:text-primary">
            Blog
          </Link>
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">
              Log in
            </Link>
          </Button>
          <Button asChild>
            <Link href="/register">
              Sign up
            </Link>
          </Button>
        </div>
        
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <AlignJustify className="h-6 w-6" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[350px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link 
                href="#features" 
                className="block px-2 py-2 text-lg font-medium hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#pricing"
                className="block px-2 py-2 text-lg font-medium hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/blog"
                className="block px-2 py-2 text-lg font-medium hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/contact"
                className="block px-2 py-2 text-lg font-medium hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 border-t mt-2">
                <div className="flex flex-col gap-3">
                  <Button variant="outline" className="w-full" asChild>
                    <Link 
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link 
                      href="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </Button>
                </div>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}