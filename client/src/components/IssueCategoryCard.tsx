import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type LucideIcon } from 'lucide-react';

interface IssueCategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
}

export default function IssueCategoryCard({ title, description, icon: Icon, onClick }: IssueCategoryCardProps) {
  return (
    <Card
      className="hover-elevate active-elevate-2 cursor-pointer transition-all h-full group border-2"
      onClick={onClick}
      data-testid={`card-issue-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <CardHeader className="text-center space-y-4 p-6">
        <div className="mx-auto mb-2 h-16 w-16 flex items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">{title}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
