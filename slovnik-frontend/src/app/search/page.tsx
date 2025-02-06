import { Suspense } from 'react';
import SearchContent from './searchPage';
import Loading from '@/components/ui/loading';

export default function SearchPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SearchContent />
    </Suspense>
  );
}