import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-950 font-sans text-gray-100 antialiased">
      <main className="mx-auto w-full max-w-2xl px-6 pb-40">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
