import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import IssueCategoryCard from '@/components/IssueCategoryCard';
import { issueCategories } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowLeft, CheckCircle2, CreditCard, FileText, HelpCircle, Shield, DollarSign, Users } from 'lucide-react';

export default function IssuesPage() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const iconMap: Record<string, any> = {
    account: Users,
    atm: CreditCard,
    loan: DollarSign,
    digital: Shield,
    charges: FileText,
    'customer-service': HelpCircle,
  };

  const resolutionSteps: Record<string, string[]> = {
    account: [
      'Contact your bank branch directly and request for account closure in writing',
      'Ensure all pending transactions are cleared and no negative balance exists',
      'Collect account closure form from the branch or download from bank website',
      'Submit the form with required documents (ID proof, passbook, unused cheques)',
      'Request written acknowledgment of your closure request',
      'If not resolved within 30 days, file complaint with Banking Ombudsman',
      'Keep copies of all correspondence and visit receipts',
    ],
    atm: [
      'Immediately call the bank customer care number printed on the ATM',
      'Note down the transaction reference number from SMS/ATM receipt',
      'File a complaint through mobile banking app or customer care',
      'Bank must refund within 5 working days as per RBI guidelines',
      'If amount not credited, you are entitled to Rs. 100 per day compensation',
      'Escalate to Banking Ombudsman if not resolved in 30 days',
      'Keep all transaction receipts and SMS notifications as proof',
    ],
    loan: [
      'Request loan sanction letter and review all terms and conditions',
      'Calculate effective interest rate including all processing fees',
      'Compare with advertised rate and RBI repo rate linkage',
      'Write formal complaint to bank highlighting the discrepancy',
      'Request detailed breakup of all charges and interest calculation',
      'If unresolved, approach Banking Ombudsman with documentation',
      'Consider Consumer Forum for larger disputes or unfair practices',
    ],
    digital: [
      'Immediately report the issue through bank customer care',
      'Try resetting password through forgot password option',
      'Check if account is temporarily blocked due to wrong attempts',
      'Visit nearest branch with valid ID for account unlock',
      'Request new user ID and password from branch if needed',
      'Enable all security features like OTP, biometric login',
      'Regularly update mobile number and email registered with bank',
    ],
    charges: [
      'Review your account statement and identify all unauthorized charges',
      'Check bank fee schedule to verify if charges are legitimate',
      'Write to bank customer care with specific transaction details',
      'Request immediate reversal of unauthorized or hidden charges',
      'Banks must provide 30 days notice for any fee structure changes',
      'File formal complaint if charges not reversed within 7 days',
      'Approach Banking Ombudsman with complete transaction history',
    ],
    'customer-service': [
      'Document all instances of poor service with dates and details',
      'File written complaint with branch manager or customer care',
      'Request acknowledgment and reference number for complaint',
      'Escalate to regional manager if not resolved in 7 days',
      'Approach Banking Ombudsman for severe service deficiency',
      'You can also file complaint with RBI Customer Education Portal',
      'Consider changing bank if service issues persist',
    ],
  };

  if (selectedCategory) {
    const category = issueCategories.find(c => c.id === selectedCategory);
    const steps = resolutionSteps[selectedCategory] || [];

    return (
      <div className="min-h-screen">
        <div className="bg-card border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Button
              variant="ghost"
              onClick={() => setSelectedCategory(null)}
              className="mb-4"
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Button>
            <h1 className="text-4xl font-bold mb-4">{category?.title}</h1>
            <p className="text-muted-foreground text-lg">{category?.description}</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{t.stepsToResolve}</CardTitle>
              <CardDescription>
                Follow these steps to resolve your issue effectively
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-4" data-testid={`step-${index}`}>
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-sm leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-muted rounded-lg">
                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Remember</p>
                    <p className="text-sm text-muted-foreground">
                      Always keep documentation of all communications, complaints, and transactions. 
                      This will be crucial if you need to escalate to the Banking Ombudsman or Consumer Forum.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>What is the Banking Ombudsman?</AccordionTrigger>
                <AccordionContent>
                  The Banking Ombudsman is a senior official appointed by the Reserve Bank of India 
                  to redress customer complaints against banks. The scheme is free and covers complaints 
                  related to various banking services.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How long does complaint resolution take?</AccordionTrigger>
                <AccordionContent>
                  Banks are required to resolve complaints within 30 days. If not resolved, you can 
                  escalate to the Banking Ombudsman who typically resolves cases within 30-60 days.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is there a fee to file a complaint?</AccordionTrigger>
                <AccordionContent>
                  No, filing a complaint with the Banking Ombudsman is completely free. There are no 
                  fees or charges for availing this service.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-card to-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t.issueGuide}</h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            {t.selectIssueCategory}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {issueCategories.map((category) => {
            const Icon = iconMap[category.id] || HelpCircle;
            return (
              <IssueCategoryCard
                key={category.id}
                title={category.title}
                description={category.description}
                icon={Icon}
                onClick={() => setSelectedCategory(category.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
