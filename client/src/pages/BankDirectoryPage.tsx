import { useLanguage } from '@/contexts/LanguageContext';
import BankDirectoryTable from '@/components/BankDirectoryTable';
import { mockBanks } from '@/data/mockData';

export default function BankDirectoryPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-card to-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t.bankDirectory}</h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            {t.bankDirectoryPageDesc}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BankDirectoryTable banks={mockBanks} />
      </div>
    </div>
  );
}
