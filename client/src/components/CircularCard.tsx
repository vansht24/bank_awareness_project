import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export interface Circular {
  id: string;
  number: string;
  title: string;
  summary: string;
  fullContent: string;
  date: string;
  category: string;
  authority: string;
}

interface CircularCardProps {
  circular: Circular;
}

export default function CircularCard({ circular }: CircularCardProps) {
  const { t } = useLanguage();
  const [showFull, setShowFull] = useState(false);

  return (
    <>
      <Card className="hover-elevate h-full flex flex-col group transition-all" data-testid={`card-circular-${circular.id}`}>
        <CardHeader className="space-y-3 pb-3">
          <div className="flex items-start justify-between gap-2">
            <Badge variant="secondary" className="text-xs font-medium" data-testid={`badge-category-${circular.id}`}>
              {circular.category}
            </Badge>
            <span className="text-xs text-muted-foreground font-mono">{circular.number}</span>
          </div>
          <CardTitle className="text-base font-semibold line-clamp-2 leading-snug group-hover:text-primary transition-colors" data-testid={`text-title-${circular.id}`}>
            {circular.title}
          </CardTitle>
          <CardDescription className="flex items-center gap-2 text-xs">
            <Calendar className="h-3 w-3 flex-shrink-0" />
            <span className="font-medium">{circular.date}</span>
            <span className="mx-1">•</span>
            <span className="truncate">{circular.authority}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-3">
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed" data-testid={`text-summary-${circular.id}`}>
            {circular.summary}
          </p>
        </CardContent>
        <CardFooter className="pt-0">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => setShowFull(true)}
            data-testid={`button-view-${circular.id}`}
          >
            <FileText className="h-4 w-4 mr-2" />
            {t.viewFullCircular}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showFull} onOpenChange={setShowFull}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{circular.category}</Badge>
              <span className="text-sm text-muted-foreground">{circular.number}</span>
            </div>
            <DialogTitle className="text-xl">{circular.title}</DialogTitle>
            <DialogDescription className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {circular.date}
              <span className="mx-1">•</span>
              {circular.authority}
            </DialogDescription>
          </DialogHeader>
          <div className="w-full h-[60vh]">
            <iframe
              src={circular.fullContent}
              className="w-full h-full border rounded"
              title={circular.title}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
