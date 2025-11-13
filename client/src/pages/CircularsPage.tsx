import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import CircularCard from '@/components/CircularCard';
import type { Circular } from '@/components/CircularCard';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function CircularsPage() {
  const { t } = useLanguage();
  const [circulars, setCirculars] = useState<Circular[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Fetch circulars from API
  useEffect(() => {
    async function fetchCirculars() {
      try {
        const response = await fetch('/api/circulars');
        if (!response.ok) {
          throw new Error('Failed to fetch circulars');
        }
        const data = await response.json();
        setCirculars(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    
    fetchCirculars();
  }, []);

  const categories = ['all', ...Array.from(new Set(circulars.map(c => c.category)))];

  const filteredCirculars = circulars
    .filter((circular) => {
      const matchesSearch = 
        circular.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        circular.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || circular.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-card to-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t.circulars}</h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            {t.circularsPageDesc}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertDescription>Error loading circulars: {error}</AlertDescription>
          </Alert>
        ) : (
          <>
            <Card className="p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                    data-testid="input-search-circulars"
                  />
                </div>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-[200px]" data-testid="select-category-filter">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.slice(1).map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px]" data-testid="select-sort">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">{t.newest}</SelectItem>
                    <SelectItem value="oldest">{t.oldest}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>

            <div className="mb-6 text-sm text-muted-foreground">
              Showing {filteredCirculars.length} of {circulars.length} circulars
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCirculars.map((circular) => (
                <CircularCard key={circular.id} circular={circular} />
              ))}
            </div>

            {filteredCirculars.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-medium mb-2">{t.noCircularsFound}</h3>
                <p className="text-muted-foreground">{t.tryAdjustingFilters}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}