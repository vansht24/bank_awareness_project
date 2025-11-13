import { useLanguage } from '@/contexts/LanguageContext';
import EmailTemplateForm from '@/components/EmailTemplateForm';
import { mockBanks, issueTypes } from '@/data/mockData';

export default function EmailTemplatesPage() {
  const { t } = useLanguage();

  const bankOptions = mockBanks.map(bank => ({
    name: bank.name,
    email: bank.email,
  }));

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-card to-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t.emailTemplates}</h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            {t.emailTemplatesPageDesc}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EmailTemplateForm banks={bankOptions} issueTypes={issueTypes} />
      </div>
    </div>
  );
}
