'use client';

import './globals.css';
import Sidebar from '@/components/Sidebar';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isPublic = pathname?.startsWith('/public');

    return (
        <html lang='es'>
            <body className="bg-slate-50 overflow-x-hidden">
                {!isPublic && <Sidebar />}
                <div className={`${!isPublic ? 'lg:pl-64' : 'w-full'} transition-all duration-300`}>
                    <main className="min-h-screen">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
