import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatarUrl: string;
}

export function TestimonialCard({ quote, author, role, avatarUrl }: TestimonialCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="mb-4 text-lg italic">"{quote}"</div>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={avatarUrl} alt={author} />
            <AvatarFallback>{author[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{author}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}