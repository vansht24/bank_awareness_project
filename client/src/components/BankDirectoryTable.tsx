import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, Copy, ExternalLink, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface Bank {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  type: 'Public' | 'Private' | 'Cooperative' | 'Foreign';
}

interface BankDirectoryTableProps {
  banks: Bank[];
}

export default function BankDirectoryTable({ banks }: BankDirectoryTableProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBanks = banks.filter((bank) =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bank.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast({
      title: 'Copied!',
      description: `Email ${email} copied to clipboard`,
    });
  };

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div>
          <CardTitle className="text-2xl">{t.bankDirectory}</CardTitle>
          <CardDescription className="text-base mt-2">
            Contact information for major Indian banks - Updated regularly
          </CardDescription>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t.searchBanks}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-11"
            data-testid="input-search-banks"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.bankName}</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>{t.customerEmail}</TableHead>
                <TableHead>{t.phone}</TableHead>
                <TableHead>{t.website}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBanks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No banks found
                  </TableCell>
                </TableRow>
              ) : (
                filteredBanks.map((bank) => (
                  <TableRow key={bank.id} data-testid={`row-bank-${bank.id}`}>
                    <TableCell className="font-medium">{bank.name}</TableCell>
                    <TableCell>
                      <span className="text-xs px-2 py-1 bg-secondary rounded-md">
                        {bank.type}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{bank.email}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => copyEmail(bank.email)}
                          data-testid={`button-copy-${bank.id}`}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {bank.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <a
                        href={bank.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary hover:underline text-sm"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Visit
                      </a>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
