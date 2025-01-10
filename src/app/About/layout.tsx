'use client';
import { usePathname } from 'next/navigation';

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      {children}
      {!pathname.match(/^\/About\/Posts\/\d+$/) && (
        <div>You might also like: ...</div>
      )}
    </>
  );
}