import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LandingHeader } from '@/components/layout/landing-header';
import { LandingFooter } from '@/components/layout/landing-footer';
import { FeatureCard } from '@/components/marketing/feature-card';
import { TestimonialCard } from '@/components/marketing/testimonial-card';
import { PricingCard } from '@/components/marketing/pricing-card';
import { FaFilePdf, FaChartLine, FaCalendarAlt, FaUsers } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/90 to-primary px-4 py-20 md:py-32 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Simplify ASC 842 Lease Accounting
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-md">
                LeaseLight makes lease compliance effortless with automatic classification, amortization schedules, and journal entries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
                  <Link href="/register">
                    Start Free Trial
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="#features">
                    Learn More
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-white/80">No credit card required • 14-day free trial</p>
            </div>
            <div className="relative hidden md:block">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-lg shadow-2xl p-4 border border-white/20 transform rotate-1">
                <img 
                  src="https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="LeaseLight Dashboard Preview" 
                  className="rounded shadow-lg"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-xl p-3 border border-white/20 transform -rotate-3 w-48">
                <div className="bg-white/90 rounded p-2">
                  <div className="h-2 bg-chart-1 rounded-full w-3/4 mb-2"></div>
                  <div className="h-2 bg-chart-2 rounded-full w-1/2 mb-2"></div>
                  <div className="h-2 bg-chart-3 rounded-full w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-12 -left-12 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Features That Simplify Compliance</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your lease portfolio and maintain ASC 842 compliance
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<FaFilePdf className="h-10 w-10 text-primary" />}
              title="PDF Processing & OCR"
              description="Automatic data extraction from lease documents with our advanced OCR technology"
            />
            <FeatureCard 
              icon={<FaChartLine className="h-10 w-10 text-primary" />}
              title="Automated Calculations"
              description="Generate amortization schedules and journal entries with a single click"
            />
            <FeatureCard 
              icon={<FaCalendarAlt className="h-10 w-10 text-primary" />}
              title="Compliance Calendar"
              description="Never miss important renewal or remeasurement dates with automated alerts"
            />
            <FeatureCard 
              icon={<FaUsers className="h-10 w-10 text-primary" />}
              title="Team Collaboration"
              description="Securely share lease information with your team using role-based permissions"
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Trusted by Finance Teams</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See what accounting professionals are saying about LeaseLight
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="LeaseLight cut our monthly close process for leases by 75%. The automatic journal entries are a game-changer."
              author="Sarah Johnson"
              role="Controller, Acme Corp"
              avatarUrl="https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <TestimonialCard 
              quote="The PDF extraction alone is worth the price. We went from manual data entry to a fully automated process."
              author="Michael Chen"
              role="CFO, TechStart Inc"
              avatarUrl="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <TestimonialCard 
              quote="Our auditors were impressed with the detailed documentation and reports generated by LeaseLight."
              author="Jessica Williams"
              role="Accounting Manager, Global Retail"
              avatarUrl="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
          </div>
        </div>
      </section>
      
      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your organization's needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard 
              title="Starter"
              price="199"
              description="Perfect for small businesses with a limited lease portfolio"
              features={[
                "Up to 20 leases",
                "PDF extraction",
                "Basic reporting",
                "Email support",
                "Single user"
              ]}
              ctaText="Start Free Trial"
              ctaLink="/register"
              popular={false}
            />
            <PricingCard 
              title="Professional"
              price="399"
              description="Ideal for growing businesses with more complex needs"
              features={[
                "Up to 100 leases",
                "Advanced reporting",
                "Custom templates",
                "Priority support",
                "Up to 5 users"
              ]}
              ctaText="Start Free Trial"
              ctaLink="/register"
              popular={true}
            />
            <PricingCard 
              title="Enterprise"
              price="999"
              description="Comprehensive solution for large organizations"
              features={[
                "Unlimited leases",
                "Custom integrations",
                "Dedicated account manager",
                "SOC 2 compliance",
                "Unlimited users"
              ]}
              ctaText="Contact Sales"
              ctaLink="/contact"
              popular={false}
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary py-16 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Simplify Your Lease Accounting?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of companies already using LeaseLight to streamline their ASC 842 compliance.
          </p>
          <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
            <Link href="/register">
              Start Your Free Trial Today
            </Link>
          </Button>
          <p className="text-sm mt-4 text-white/80">No credit card required • 14-day free trial</p>
        </div>
      </section>
      
      <LandingFooter />
    </div>
  );
}