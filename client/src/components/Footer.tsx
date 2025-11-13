import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">B</span>
              </div>
              <h3 className="font-semibold text-lg">{t.appTitle}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.tagline}
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">{t.quickLinks}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">{t.aboutUs}</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">{t.howToUse}</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">{t.faqs}</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">{t.contactUs}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">{t.legalDisclaimer}</h4>
            <p className="text-xs text-muted-foreground">
              {t.disclaimerText}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} BankRight. {t.allRightsReserved}.</p>
        </div>
      </div>
    </footer>
  );
}
