import BankDirectoryTable from '../BankDirectoryTable';

export default function BankDirectoryTableExample() {
  const banks = [
    {
      id: '1',
      name: 'State Bank of India',
      email: 'customercare@sbi.co.in',
      phone: '1800-11-2211',
      website: 'https://www.sbi.co.in',
      type: 'Public' as const,
    },
    {
      id: '2',
      name: 'HDFC Bank',
      email: 'customer.service@hdfcbank.com',
      phone: '1800-202-6161',
      website: 'https://www.hdfcbank.com',
      type: 'Private' as const,
    },
  ];

  return (
    <div className="p-4">
      <BankDirectoryTable banks={banks} />
    </div>
  );
}
