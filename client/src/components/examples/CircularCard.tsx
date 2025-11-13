import CircularCard from '../CircularCard';

export default function CircularCardExample() {
  const sampleCircular = {
    id: '1',
    number: 'RBI/2024-25/123',
    title: 'Guidelines on Digital Lending and Customer Protection',
    summary: 'RBI issues comprehensive guidelines to regulate digital lending platforms and protect customer interests. Key measures include mandatory disclosure of all charges, cooling-off period for loans, and restrictions on unauthorized access to mobile data.',
    fullContent: 'Detailed content of the circular...',
    date: '15 Jan 2025',
    category: 'Digital Banking',
    authority: 'Reserve Bank of India',
  };

  return (
    <div className="p-4 max-w-sm">
      <CircularCard circular={sampleCircular} />
    </div>
  );
}
