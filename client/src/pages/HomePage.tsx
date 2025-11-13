import { useLanguage } from '@/contexts/LanguageContext';
import Hero from '@/components/Hero';
import CircularCard from '@/components/CircularCard';
import IssueCategoryCard from '@/components/IssueCategoryCard';
import { mockCirculars, issueCategories } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight, CreditCard, FileText, HelpCircle, Shield, DollarSign, Users } from 'lucide-react';

export default function HomePage() {
  const { t } = useLanguage();

  const iconMap: Record<string, any> = {
    account: Users,
    atm: CreditCard,
    loan: DollarSign,
    digital: Shield,
    charges: FileText,
    'customer-service': HelpCircle,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex-1">
        <section className="mb-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">{t.recentCirculars}</h2>
              <p className="text-muted-foreground text-lg">{t.recentCircularsDesc}</p>
            </div>
            <Link href="/circulars">
              <Button variant="outline" data-testid="button-view-all-circulars">
                {t.browseAllCirculars}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCirculars.slice(0, 6).map((circular) => (
              <CircularCard key={circular.id} circular={circular} />
            ))}
          </div>
        </section>

        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">{t.commonIssues}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.commonIssuesDesc}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {issueCategories.map((category) => {
              const Icon = iconMap[category.id] || HelpCircle;
              return (
                <IssueCategoryCard
                  key={category.id}
                  title={category.title}
                  description={category.description}
                  icon={Icon}
                  onClick={() => window.location.href = '/issues'}
                />
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
