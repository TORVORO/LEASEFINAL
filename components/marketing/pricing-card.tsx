import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  popular?: boolean;
}

export function PricingCard({
  title,
  price,
  description,
  features,
  ctaText,
  ctaLink,
  popular = false,
}: PricingCardProps) {
  return (
    <Card className={cn(
      "flex flex-col overflow-hidden transition-all",
      popular && "border-primary shadow-md relative"
    )}>
      {popular && (
        <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/3 rotate-45 bg-primary text-white text-xs py-1 px-8 font-medium">
          Popular
        </div>
      )}
      
      <CardHeader className={cn(
        "pb-6",
        popular && "bg-primary/5"
      )}>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <div className="mt-4 space-y-2">
          <div className="flex items-baseline text-4xl font-bold">
            ${price}
            <span className="ml-1 text-base font-medium text-muted-foreground">/mo</span>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardHeader>
      
      <CardContent className="flex flex-col justify-between flex-1 p-6 pt-4">
        <div className="space-y-4">
          <p className="font-medium">Includes:</p>
          <ul className="space-y-2">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-1">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Button 
          className={cn("mt-6 w-full", popular ? "" : "mt-auto")}
          variant={popular ? "default" : "outline"} 
          asChild
        >
          <Link href={ctaLink}>{ctaText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}