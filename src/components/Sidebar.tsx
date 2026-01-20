'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, TrendingUp, Calendar as CalendarIcon, Monitor, Megaphone } from 'lucide-react';

export default function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/', icon: LayoutDashboard },
        { name: 'Calendario', href: '/calendar', icon: CalendarIcon },
        { name: 'Compañías', href: '/companies', icon: Users },
        { name: 'Facturación', href: '/admin/billing', icon: TrendingUp },
        { name: 'Megafonía', href: '/admin/announcements', icon: Megaphone },
        { name: 'Pantallas', href: '/admin/screens', icon: Monitor },
    ];

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col z-20 shadow-xl shadow-slate-200/50">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="w-12 h-12 bg-[#8A1D5B] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-200 overflow-hidden">
                        <img src="/images/alvar_fanez.png" alt="Guadalajara" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <span className="font-black text-slate-900 text-lg leading-none block uppercase tracking-tighter">Guadalajara</span>
                        <span className="text-[10px] font-bold text-[#8A1D5B] uppercase tracking-[0.2em]">Estación Bus</span>
                    </div>
                </div>


                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all group ${isActive
                                    ? 'bg-[#8A1D5B] text-white shadow-lg shadow-purple-200'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-[#8A1D5B]'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#8A1D5B]'}`} />
                                {item.name}
                            </Link>

                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto p-6">
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 overflow-hidden relative group">
                    <img src="/images/station_bg.png" alt="Estación" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700" />
                    <p className="relative text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Local Identity</p>
                    <p className="relative text-xs font-bold text-slate-600">Ayuntamiento de Guadalajara</p>
                </div>
            </div>
        </aside>
    );
}
