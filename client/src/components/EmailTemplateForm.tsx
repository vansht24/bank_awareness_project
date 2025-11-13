import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { Copy, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmailTemplateFormProps {
  banks: { name: string; email: string }[];
  issueTypes: { value: string; label: string }[];
}

export default function EmailTemplateForm({ banks, issueTypes }: EmailTemplateFormProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    accountNumber: '',
    issueType: '',
    bank: '',
    description: '',
  });
  const [generatedTemplate, setGeneratedTemplate] = useState('');

  const handleGenerate = () => {
    const selectedBank = banks.find(b => b.name === formData.bank);
    const selectedIssue = issueTypes.find(i => i.value === formData.issueType);
    
    const template = `Subject: ${selectedIssue?.label} - Account ${formData.accountNumber}

Dear Sir/Madam,

I am writing to bring to your attention an issue I am facing with my account.

Account Holder Name: ${formData.name}
Account Number: ${formData.accountNumber}
Issue Type: ${selectedIssue?.label}

Description:
${formData.description}

I request you to please look into this matter urgently and resolve the issue at the earliest. I would appreciate a prompt response regarding the steps being taken to address my concern.

Thank you for your attention to this matter.

Yours sincerely,
${formData.name}`;

    setGeneratedTemplate(template);
    toast({
      title: t.templateGenerated,
      description: 'You can now copy the template',
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedTemplate);
    toast({
      title: 'Copied!',
      description: 'Email template copied to clipboard',
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">{t.generateEmail}</CardTitle>
          <CardDescription className="text-base">Fill in your details to generate a professional complaint email template</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t.yourName}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              data-testid="input-name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="account">{t.accountNumber}</Label>
            <Input
              id="account"
              value={formData.accountNumber}
              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
              data-testid="input-account"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bank">{t.selectBank}</Label>
            <Select value={formData.bank} onValueChange={(value) => setFormData({ ...formData, bank: value })}>
              <SelectTrigger id="bank" data-testid="select-bank">
                <SelectValue placeholder={t.selectBank} />
              </SelectTrigger>
              <SelectContent>
                {banks.map((bank) => (
                  <SelectItem key={bank.name} value={bank.name}>
                    {bank.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="issue">{t.issueType}</Label>
            <Select value={formData.issueType} onValueChange={(value) => setFormData({ ...formData, issueType: value })}>
              <SelectTrigger id="issue" data-testid="select-issue">
                <SelectValue placeholder={t.issueType} />
              </SelectTrigger>
              <SelectContent>
                {issueTypes.map((issue) => (
                  <SelectItem key={issue.value} value={issue.value}>
                    {issue.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t.description}</Label>
            <Textarea
              id="description"
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              data-testid="textarea-description"
            />
          </div>

          <Button
            className="w-full"
            onClick={handleGenerate}
            disabled={!formData.name || !formData.bank || !formData.issueType}
            data-testid="button-generate"
          >
            <Mail className="h-4 w-4 mr-2" />
            {t.generate}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Email Preview</CardTitle>
          <CardDescription className="text-base">
            {formData.bank && banks.find(b => b.name === formData.bank)?.email ? (
              <div className="flex items-center gap-2 mt-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-primary font-medium">To: {banks.find(b => b.name === formData.bank)?.email}</span>
              </div>
            ) : (
              <span className="text-muted-foreground">Select bank to see recipient email</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {generatedTemplate ? (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <pre className="text-sm whitespace-pre-wrap font-sans" data-testid="text-template">
                  {generatedTemplate}
                </pre>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleCopy}
                data-testid="button-copy"
              >
                <Copy className="h-4 w-4 mr-2" />
                {t.copyToClipboard}
              </Button>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Fill the form and click generate to see the email template</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
