import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { type Language } from '@/lib/i18n';
import { Languages, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: t.home },
    { href: '/circulars', label: t.circulars },
    { href: '/issues', label: t.issueGuide },
    { href: '/email-templates', label: t.emailTemplates },
    { href: '/banks', label: t.bankDirectory },
  ];

  // Add all the languages you want to support here
  const languages: { value: Language; label: string; native: string }[] = [
    { value: 'en', label: 'English', native: 'English' },
    { value: 'hi', label: 'Hindi', native: 'हिंदी' },
    { value: 'mr', label: 'Marathi', native: 'मराठी' },
    { value: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { value: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { value: 'te', label: 'Telugu', native: 'తెలుగు' },
    { value: 'bn', label: 'Bengali', native: 'বাংলা' },
    { value: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  ];

  const currentLang = languages.find((l) => l.value === language);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">B</span>
              </div>
              <span className="font-semibold text-lg hidden sm:inline-block">{t.appTitle}</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={location === item.href ? 'secondary' : 'ghost'}
                  size="sm"
                  data-testid={`nav-${item.href.slice(1) || 'home'}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
              <SelectTrigger
                className="w-[140px] h-9"
                data-testid="select-language"
              >
                <div className="flex items-center gap-2">
                  <Languages className="h-4 w-4" />
                  <SelectValue>{currentLang?.native || language}</SelectValue>
                </div>
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value} data-testid={`language-${lang.value}`}>
                    {lang.native}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={location === item.href ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`nav-mobile-${item.href.slice(1) || 'home'}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}