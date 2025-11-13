import type { Circular } from '@/components/CircularCard';
import type { Bank } from '@/components/BankDirectoryTable';

export const mockCirculars: Circular[] = [
  {
    id: '1',
    number: 'RBI/2024-25/123',
    title: 'Master Direction on Digital Lending Platforms - Customer Protection Framework',
    summary: 'The Reserve Bank mandates all digital lending platforms operating in India to adhere to strict customer protection norms. Platforms must ensure complete transparency in interest rate disclosure, prohibition on accessing borrower mobile data without consent, and implementation of a 3-day cooling-off period for all loans. Non-compliance may result in penalties up to ₹1 crore.',
    fullContent: `The Reserve Bank of India has issued comprehensive guidelines to regulate digital lending platforms and ensure customer protection in the rapidly evolving digital lending ecosystem.

Key Provisions:
1. All digital lending platforms must be registered with RBI
2. Complete transparency in disclosure of all charges and fees
3. Cooling-off period of 3 days for borrowers to cancel loans without penalty
4. Prohibition on unauthorized access to mobile phone data
5. Fair practices code for recovery agents
6. Mandatory grievance redressal mechanism

These guidelines aim to protect customers from predatory lending practices while promoting innovation in the digital lending space.`,
    date: '15 Jan 2025',
    category: 'Digital Banking',
    authority: 'Reserve Bank of India',
  },
  {
    id: '2',
    number: 'RBI/2024-25/089',
    title: 'Cybersecurity Framework 2025 - Additional Factor Authentication Requirements',
    summary: 'Banks are now required to implement Additional Factor Authentication (AFA) for all digital transactions exceeding ₹10,000. Mandatory SMS and email alerts must be sent within 30 seconds of transaction initiation. Real-time fraud monitoring systems with AI/ML capabilities must be deployed by March 31, 2025.',
    fullContent: `Enhanced security measures have been mandated to protect customers against online banking fraud and unauthorized transactions.

Implementation Requirements:
1. Mandatory multi-factor authentication for transactions above Rs. 10,000
2. Real-time SMS and email alerts for all transactions
3. Biometric authentication for high-value transactions
4. Transaction velocity checks and spending limits
5. Customer education programs on cybersecurity

Banks must implement these measures within 90 days from the date of this circular.`,
    date: '08 Jan 2025',
    category: 'Cybersecurity',
    authority: 'Reserve Bank of India',
  },
  {
    id: '3',
    number: 'SEBI/HO/2024/245',
    title: 'Circular on Mis-selling Prevention in Bancassurance and Investment Products',
    summary: 'SEBI introduces stringent norms to prevent mis-selling of investment products through bank branches. Banks must maintain separate counters for deposit and investment products. Mandatory video recording of investment advice exceeding ₹5 lakhs. 15-day free-look period with full refund for all investment products. Heavy penalties for non-compliance.',
    fullContent: `SEBI has issued guidelines to protect investors who purchase investment products through banks, ensuring clear differentiation from traditional deposit products.

Key Requirements:
1. Clear distinction between deposits and investments
2. Risk disclosure in simple language
3. 15-day cooling-off period for all investment products
4. Mandatory recording of investment advice
5. Quarterly portfolio statements

These measures aim to prevent mis-selling and ensure informed decision-making by customers.`,
    date: '22 Dec 2024',
    category: 'Investment',
    authority: 'SEBI',
  },
  {
    id: '4',
    number: 'RBI/2024-25/067',
    title: 'KYC Simplification for Senior Citizens and Differently-Abled Persons',
    summary: 'Special provisions introduced to simplify KYC processes for senior citizens above 75 years and differently-abled customers, including video-based KYC and doorstep banking services.',
    fullContent: `The RBI has introduced customer-friendly KYC norms for senior citizens and differently-abled persons to ensure financial inclusion.

Special Provisions:
1. Video-based KYC for senior citizens above 75 years
2. Doorstep banking services for KYC verification
3. Simplified documentation requirements
4. Assistance from bank officials for form filling
5. Extended validity of KYC for senior citizens

Banks are required to implement these provisions immediately and train staff accordingly.`,
    date: '10 Dec 2024',
    category: 'Customer Service',
    authority: 'Reserve Bank of India',
  },
  {
    id: '5',
    number: 'RBI/2024-25/045',
    title: 'Compensation Policy for Failed ATM Transactions',
    summary: 'Banks must compensate customers Rs. 100 per day for failed ATM transactions where amount is debited but cash not dispensed, with auto-credit within 5 working days.',
    fullContent: `Clear compensation guidelines have been established for failed ATM transactions to protect customer interests.

Compensation Framework:
1. Automatic reversal of amount within 5 working days
2. Compensation of Rs. 100 per day for delayed reversal
3. SMS alerts for failed transactions
4. Dedicated helpline for ATM-related complaints
5. Monthly reporting of ATM failures

Customers need not file complaints if auto-reversal happens within the stipulated timeframe.`,
    date: '28 Nov 2024',
    category: 'ATM Services',
    authority: 'Reserve Bank of India',
  },
  {
    id: '6',
    number: 'BO/2024/089',
    title: 'Banking Ombudsman Scheme - Enhanced Powers and Faster Resolution',
    summary: 'Banking Ombudsman granted enhanced powers to settle disputes up to Rs. 50 lakhs with a mandate to resolve complaints within 30 days.',
    fullContent: `The Banking Ombudsman Scheme has been strengthened to provide faster and more effective grievance redressal.

Key Enhancements:
1. Increased monetary jurisdiction to Rs. 50 lakhs
2. Timeline of 30 days for complaint resolution
3. Digital filing of complaints through online portal
4. Video conferencing for hearings
5. Binding nature of Ombudsman's decisions on banks

Customers can approach the Ombudsman after exhausting bank's internal grievance mechanism.`,
    date: '15 Nov 2024',
    category: 'Consumer Rights',
    authority: 'Banking Ombudsman',
  },
];

export const mockBanks: Bank[] = [
  {
    id: '1',
    name: 'State Bank of India',
    email: 'customercare@sbi.co.in',
    phone: '1800-11-2211',
    website: 'https://www.sbi.co.in',
    type: 'Public',
  },
  {
    id: '2',
    name: 'HDFC Bank',
    email: 'customer.service@hdfcbank.com',
    phone: '1800-202-6161',
    website: 'https://www.hdfcbank.com',
    type: 'Private',
  },
  {
    id: '3',
    name: 'ICICI Bank',
    email: 'customer.care@icicibank.com',
    phone: '1860-120-7777',
    website: 'https://www.icicibank.com',
    type: 'Private',
  },
  {
    id: '4',
    name: 'Punjab National Bank',
    email: 'care@pnb.co.in',
    phone: '1800-180-2222',
    website: 'https://www.pnbindia.in',
    type: 'Public',
  },
  {
    id: '5',
    name: 'Axis Bank',
    email: 'customer.care@axisbank.com',
    phone: '1860-419-5555',
    website: 'https://www.axisbank.com',
    type: 'Private',
  },
  {
    id: '6',
    name: 'Bank of Baroda',
    email: 'customercare@bankofbaroda.com',
    phone: '1800-102-4455',
    website: 'https://www.bankofbaroda.in',
    type: 'Public',
  },
  {
    id: '7',
    name: 'Kotak Mahindra Bank',
    email: 'service.helpdesk@kotak.com',
    phone: '1860-266-2666',
    website: 'https://www.kotak.com',
    type: 'Private',
  },
  {
    id: '8',
    name: 'IDBI Bank',
    email: 'customercare@idbi.co.in',
    phone: '1800-209-4324',
    website: 'https://www.idbibank.in',
    type: 'Public',
  },
];

export const issueCategories = [
  {
    id: 'account',
    title: 'Account Issues',
    description: 'Problems with account opening, closure, or maintenance',
  },
  {
    id: 'atm',
    title: 'ATM/Card Issues',
    description: 'Failed transactions, card blocking, or ATM disputes',
  },
  {
    id: 'loan',
    title: 'Loan Disputes',
    description: 'Issues with loan processing, interest rates, or EMI',
  },
  {
    id: 'digital',
    title: 'Digital Banking',
    description: 'Online/mobile banking, UPI, or digital payment issues',
  },
  {
    id: 'charges',
    title: 'Unauthorized Charges',
    description: 'Unexpected fees, charges, or deductions',
  },
  {
    id: 'customer-service',
    title: 'Customer Service',
    description: 'Poor service, delayed response, or staff behavior',
  },
];

export const issueTypes = [
  { value: 'account-closure', label: 'Account Closure Delay' },
  { value: 'unauthorized-debit', label: 'Unauthorized Debit' },
  { value: 'atm-failed', label: 'Failed ATM Transaction' },
  { value: 'card-block', label: 'Card Blocking Issue' },
  { value: 'loan-processing', label: 'Loan Processing Delay' },
  { value: 'interest-rate', label: 'Interest Rate Dispute' },
  { value: 'upi-failed', label: 'UPI Transaction Failed' },
  { value: 'net-banking', label: 'Net Banking Access Issue' },
  { value: 'hidden-charges', label: 'Hidden Charges' },
  { value: 'poor-service', label: 'Poor Customer Service' },
];
