"use client";

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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { UserProfile } from '@/components/settings/user-profile';
import { BillingInfo } from '@/components/settings/billing-info';
import { TeamMembers } from '@/components/settings/team-members';
import { SaveIcon, User, CreditCard, Users } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>
      
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
          <TabsTrigger value="account">
            <User className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="h-4 w-4 mr-2" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="team">
            <Users className="h-4 w-4 mr-2" />
            Team
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Manage your personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserProfile />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Customize your experience with LeaseLight
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifications</h3>
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email updates about your account and leases
                      </p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="renewal-reminders">Renewal Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified 30 days before a lease is due to expire
                      </p>
                    </div>
                    <Switch id="renewal-reminders" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="journal-alerts">Journal Entry Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Be notified when new journal entries are ready
                      </p>
                    </div>
                    <Switch id="journal-alerts" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Application Settings</h3>
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Switch between light and dark themes
                      </p>
                    </div>
                    <Switch id="dark-mode" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="compact-view">Compact View</Label>
                      <p className="text-sm text-muted-foreground">
                        Show more information with less whitespace
                      </p>
                    </div>
                    <Switch id="compact-view" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>
                  <SaveIcon className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing" className="space-y-6">
          <BillingInfo />
        </TabsContent>
        
        <TabsContent value="team" className="space-y-6">
          <TeamMembers />
        </TabsContent>
      </Tabs>
    </div>
  );
}