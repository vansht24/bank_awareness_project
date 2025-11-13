import EmailTemplateForm from '../EmailTemplateForm';

export default function EmailTemplateFormExample() {
  const banks = [
    { name: 'State Bank of India', email: 'customercare@sbi.co.in' },
    { name: 'HDFC Bank', email: 'customer.service@hdfcbank.com' },
  ];

  const issueTypes = [
    { value: 'atm-failed', label: 'Failed ATM Transaction' },
    { value: 'unauthorized-debit', label: 'Unauthorized Debit' },
  ];

  return (
    <div className="p-4">
      <EmailTemplateForm banks={banks} issueTypes={issueTypes} />
    </div>
  );
}
