import IssueCategoryCard from '../IssueCategoryCard';
import { CreditCard } from 'lucide-react';

export default function IssueCategoryCardExample() {
  return (
    <div className="p-4 max-w-sm">
      <IssueCategoryCard
        title="ATM/Card Issues"
        description="Failed transactions, card blocking, or ATM disputes"
        icon={CreditCard}
        onClick={() => console.log('Category clicked')}
      />
    </div>
  );
}
