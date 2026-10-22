import { useLocation, useRoutes } from 'react-router-dom';
import BottomNav from './BottomNav';
import { useBookFlip } from './BookFlipContext';
import { pageRoutes } from '../routes';

export default function Layout() {
  const location = useLocation();
  const { pageRef } = useBookFlip();
  const page = useRoutes(pageRoutes, location);

  return (
    <div className="min-h-screen bg-gray-950 font-sans text-gray-100 antialiased">
      {/* The page surface of the book. It is snapshotted by the flip layer
          right before the router swaps its content. */}
      <main ref={pageRef} className="mx-auto w-full max-w-2xl px-6 pb-40">
        {page}
      </main>
      <BottomNav />
    </div>
  );
}
