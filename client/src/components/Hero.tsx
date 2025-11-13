import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, Shield, FileText, Mail, Languages } from 'lucide-react';
import { Link } from 'wouter';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden bg-white">
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200 mb-4">
            <Shield className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-900 font-medium">{t.trustedBy}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            {t.appTitle}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t.tagline}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="/circulars">
              <Button size="lg" variant="default" data-testid="button-browse-circulars">
                <FileText className="h-5 w-5 mr-2" />
                {t.browseAllCirculars}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link href="/issues">
              <Button
                size="lg"
                variant="outline"
                data-testid="button-find-solution"
              >
                <Shield className="h-5 w-5 mr-2" />
                {t.findSolution}
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-xl p-8 text-center border border-blue-100 hover:shadow-lg transition-all">
            <FileText className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-gray-900 mb-2">500+</div>
            <div className="text-gray-600 text-sm font-medium">{t.totalCirculars}</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-8 text-center border border-blue-100 hover:shadow-lg transition-all">
            <Languages className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-gray-900 mb-2">4</div>
            <div className="text-gray-600 text-sm font-medium">{t.languagesSupported}</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-8 text-center border border-blue-100 hover:shadow-lg transition-all">
            <Mail className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-gray-900 mb-2">50+</div>
            <div className="text-gray-600 text-sm font-medium">{t.banksCovered}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
