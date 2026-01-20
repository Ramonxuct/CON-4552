'use client';

import React, { useState, useEffect } from 'react';
import { Bus, Clock, MapPin, Info, Megaphone, ShieldAlert, AlertTriangle } from 'lucide-react';


import { Movement } from '@/types';

export default function PassengerBoard({ type = 'all', isPreview = false }: { type?: 'arrivals' | 'departures' | 'all', isPreview?: boolean }) {
    const [time, setTime] = useState(new Date());
    const [movements, setMovements] = useState<Movement[]>([]);
    const [breakIn, setBreakIn] = useState<{ active: boolean; message: string; type: 'info' | 'emergency' }>({
        active: false,
        message: '',
        type: 'info'
    });

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);

        // Fetch movements initially and polling every 30s
        const fetchMovements = () => {
            fetch('/api/movements')
                .then(res => res.json())
                .then(data => setMovements(data))
                .catch(err => console.error('Error fetching movements', err));
        };

        fetchMovements();
        const pollTimer = setInterval(fetchMovements, 30000);

        // Simulation of a break-in announcement every 45s for demo
        const interval = setInterval(() => {
            setBreakIn({
                active: true,
                message: "📢 ATENCIÓN: Se recuerda a los señores pasajeros que el uso de mascarilla es recomendable en zonas de gran afluencia. Gracias.",
                type: 'info'
            });
            setTimeout(() => setBreakIn(prev => ({ ...prev, active: false })), 8000);
        }, 45000);

        return () => {
            clearInterval(timer);
            clearInterval(interval);
            clearInterval(pollTimer);
        };
    }, []);

    const filtered = movements.filter(m => {
        if (type === 'arrivals') return m.type === 'arrival';
        if (type === 'departures') return m.type === 'departure';
        return true;
    });

    return (
        <div className={`bg-slate-900 text-white font-sans overflow-hidden flex flex-col relative ${isPreview ? 'h-full rounded-3xl' : 'min-h-screen'}`}>

            {/* Break-in / Emergency Overlay */}
            {breakIn.active && (
                <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500 ${breakIn.type === 'emergency' ? 'bg-red-600/95' : 'bg-guada-purple/95'
                    } backdrop-blur-xl p-8`}>
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                    <div className={`${isPreview ? 'scale-50 mb-2' : 'mb-10'} bg-white/10 p-10 rounded-full border-4 border-white/20`}>
                        <Megaphone className={`${isPreview ? 'w-16 h-16' : 'w-32 h-32'} text-white animate-bounce`} />
                    </div>
                    <h2 className={`${isPreview ? 'text-4xl' : 'text-8xl'} font-black uppercase tracking-tighter mb-8 shadow-2xl`}>Aviso Importante</h2>
                    <p className={`${isPreview ? 'text-xl' : 'text-5xl'} font-bold leading-tight max-w-5xl balance`}>
                        {breakIn.message}
                    </p>
                    <div className="mt-20 flex gap-4">
                        <div className="w-4 h-4 bg-white rounded-full animate-ping"></div>
                        <div className="w-4 h-4 bg-white/50 rounded-full"></div>
                        <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                    </div>
                </div>
            )}

            {/* Header */}
            <header className={`${isPreview ? 'p-4' : 'p-8'} bg-guada-purple flex justify-between items-center shadow-2xl border-b-4 border-guada-orange z-10`}>
                <div className="flex items-center gap-6">
                    <div className={`${isPreview ? 'w-10 h-10' : 'w-16 h-16'} bg-white rounded-2xl flex items-center justify-center p-2`}>
                        <img src="/images/alvar_fanez.png" alt="Guadalajara" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h1 className={`${isPreview ? 'text-2xl' : 'text-4xl'} font-black uppercase tracking-tighter leading-none mb-1`}>Guadalajara Estación</h1>
                        <p className={`text-guada-orange font-bold tracking-[0.3em] uppercase ${isPreview ? 'text-[10px]' : 'text-sm'}`}>SIV - Sistema de Información Visual</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className={`${isPreview ? 'text-3xl' : 'text-6xl'} font-mono font-black tabular-nums`}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    <div className={`text-guada-orange font-bold uppercase tracking-widest ${isPreview ? 'text-[10px]' : 'text-sm'}`}>{time.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
                </div>
            </header>

            {/* Content Table */}
            <div className={`flex-1 ${isPreview ? 'p-4' : 'p-10'} z-0`}>
                <div className={`flex bg-white/5 border-b border-white/20 pb-4 mb-4 ${isPreview ? 'px-4' : 'px-10'} text-guada-orange font-black text-sm uppercase tracking-[0.3em]`}>
                    <div className="w-[12%]">Hora</div>
                    <div className="w-[40%]">Destino / Origen</div>
                    <div className="w-[20%]">Compañía</div>
                    <div className="w-[12%] text-center">Dársena</div>
                    <div className="w-[16%] text-right">Estado</div>
                </div>

                <div className="space-y-3">
                    {filtered.map((m, i) => (
                        <div key={m.id}
                            className={`flex items-center ${isPreview ? 'px-4 py-4' : 'px-10 py-7'} rounded-[2.5rem] transition-all border-l-8 hover:shadow-2xl shadow-lg relative overflow-hidden group mb-4`}
                            style={{
                                background: `linear-gradient(90deg, ${m.company?.color}30 0%, ${m.company?.color}10 50%, rgba(255,255,255,0.02) 100%)`,
                                borderColor: m.company?.color
                            }}
                        >
                            {/* Glass effect background overlay */}
                            <div className="absolute inset-0 backdrop-blur-[2px] -z-10"></div>

                            <div className={`w-[12%] ${isPreview ? 'text-2xl' : 'text-4xl'} font-mono font-black flex items-center gap-4 relative z-10`}>
                                <Clock className={`${isPreview ? 'w-5 h-5' : 'w-8 h-8'} text-white/60`} />
                                {new Date(m.scheduled_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className={`w-[40%] ${isPreview ? 'text-2xl' : 'text-5xl'} font-black uppercase tracking-tighter text-white group-hover:scale-[1.02] transition-transform origin-left relative z-10`} style={{ textShadow: `0 0 30px ${m.company?.color}60` }}>
                                {m.route?.destination}
                            </div>
                            <div className="w-[20%] flex items-center gap-4 relative z-10">
                                <div className={`${isPreview ? 'px-2 py-1 gap-2' : 'px-4 py-2 gap-3'} rounded-xl bg-black/30 backdrop-blur-md border border-white/10 flex items-center`}>
                                    <div className="w-4 h-4 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: m.company?.color, color: m.company?.color }}></div>
                                    <span className={`${isPreview ? 'text-sm' : 'text-2xl'} font-bold text-white capitalize`}>{m.company?.name}</span>
                                </div>
                            </div>
                            <div className="w-[12%] text-center relative z-10">
                                <span className={`bg-white text-slate-900 ${isPreview ? 'px-3 py-1 text-xl rounded-lg' : 'px-6 py-2 rounded-2xl text-4xl'} font-black inline-block min-w-[4.5rem] shadow-xl`}>
                                    {m.bay_number || '--'}
                                </span>
                            </div>
                            <div className="w-[16%] text-right relative z-10">
                                <span className={`${isPreview ? 'text-sm px-2 py-1' : 'text-2xl px-4 py-2'} font-black uppercase tracking-widest rounded-xl shadow-lg ${m.status === 'delayed' ? 'bg-red-500 text-white animate-pulse' :
                                    m.status === 'arrived' ? 'bg-emerald-500 text-white' : 'bg-blue-500 text-white'
                                    }`}>
                                    {m.status === 'scheduled' ? 'A tiempo' :
                                        m.status === 'arrived' ? 'En dársena' :
                                            m.status === 'delayed' ? 'Retrasado' : m.status}
                                </span>
                            </div>
                        </div>
                    ))}

                    {/* Placeholder for more content */}
                    {filtered.length < 5 && Array(5 - filtered.length).fill(0).map((_, i) => (
                        <div key={`empty-${i}`} className="flex items-center px-10 py-7 rounded-[2.5rem] bg-white/[0.02] border-2 border-dashed border-white/5 opacity-20">
                            <div className="w-full text-center text-xs font-black tracking-widest uppercase">Espacio Reservado para Información</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer / Scrolling Info */}
            <footer className={`bg-black/40 backdrop-blur-md ${isPreview ? 'p-3 gap-2' : 'p-6 md:p-8 gap-10'} flex items-center border-t border-white/10 mt-auto z-10`}>
                <div className={`bg-guada-orange text-black ${isPreview ? 'px-3 py-1 text-[8px]' : 'px-4 md:px-6 py-2 text-[10px] md:text-xs'} rounded-xl md:rounded-2xl font-black uppercase shadow-2xl shadow-guada-orange/20 animate-pulse shrink-0`}>Información</div>
                <div className="flex-1 overflow-hidden">
                    <p className={`${isPreview ? 'text-xs' : 'text-xl md:text-3xl'} font-bold whitespace-nowrap animate-marquee`}>
                        📢 Recordamos a los viajeros que deben permanecer en las zonas de espera hasta la llegada de su vehículo. • Bienvenidos a la nueva Estación de Autobuses de Guadalajara. • ¡Feliz viaje!
                    </p>
                </div>
                {!isPreview && (
                    <div className="hidden sm:flex items-center gap-4 text-slate-400 shrink-0">
                        <Info className="w-5 h-5 md:w-6 md:h-6" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Atención: 010</span>
                    </div>
                )}
            </footer>


            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                .animate-marquee {
                    display: inline-block;
                    animation: marquee 40s linear infinite;
                }
                .balance {
                    text-wrap: balance;
                }
            `}</style>
        </div>
    );
}
