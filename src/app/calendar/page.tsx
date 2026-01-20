'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalIcon, Clock, MapPin, Bus, User, Search, Filter } from 'lucide-react';
import { Movement } from '@/types';

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDate());
    const [dailyMovements, setDailyMovements] = useState<Movement[]>([]);

    useEffect(() => {
        // Fetch movements for the active day (or all for now and filter client side)
        fetch('/api/movements')
            .then(res => res.json())
            .then((data: Movement[]) => {
                // Initial filter for today
                setDailyMovements(data);
            });
    }, []);

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const monthName = currentDate.toLocaleString('es-ES', { month: 'long' });
    const year = currentDate.getFullYear();

    const days = [];
    const prevMonthDays = firstDayOfMonth(year, currentDate.getMonth());
    const totalDays = daysInMonth(year, currentDate.getMonth());

    // Fill previous month padding
    for (let i = 0; i < prevMonthDays; i++) {
        days.push({ day: null, current: false });
    }

    // Fill current month
    for (let i = 1; i <= totalDays; i++) {
        days.push({ day: i, current: true });
    }

    const nextMonth = () => setCurrentDate(new Date(year, currentDate.getMonth() + 1, 1));
    const prevMonth = () => setCurrentDate(new Date(year, currentDate.getMonth() - 1, 1));

    return (
        <div className="flex flex-col h-screen bg-slate-50/50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-6">
                    <div className="bg-guada-purple/10 p-3 rounded-2xl">
                        <CalIcon className="w-6 h-6 text-guada-purple" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 capitalize leading-none mb-1">{monthName} {year}</h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Gestión de Calendario Operativo</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                    <button onClick={prevMonth} className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all text-slate-400 hover:text-guada-purple">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="px-6 py-2 bg-white shadow-sm rounded-xl text-xs font-black uppercase text-guada-purple tracking-widest border border-slate-100">
                        Hoy
                    </button>
                    <button onClick={nextMonth} className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all text-slate-400 hover:text-guada-purple">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex -space-x-2 mr-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-black">
                                {i}
                            </div>
                        ))}
                    </div>
                    <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                        Sincronizar Rutas
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Main Calendar Grid */}
                <div className="flex-1 overflow-auto p-8">
                    <div className="grid grid-cols-7 gap-px bg-slate-200/50 border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                        {['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'].map(d => (
                            <div key={d} className="bg-slate-50 py-4 text-center text-[10px] font-black text-slate-400 tracking-widest uppercase">
                                {d}
                            </div>
                        ))}

                        {days.map((d, i) => (
                            <div
                                key={i}
                                onClick={() => d.day && setSelectedDay(d.day)}
                                className={`min-h-[140px] bg-white p-4 transition-all relative cursor-pointer group hover:bg-slate-50/80 ${!d.day ? 'bg-slate-50/40' : ''
                                    } ${selectedDay === d.day ? 'ring-2 ring-guada-purple ring-inset bg-guada-purple/5' : ''}`}
                            >
                                {d.day && (
                                    <>
                                        <span className={`text-sm font-black ${selectedDay === d.day ? 'text-guada-purple' : 'text-slate-900'
                                            }`}>{d.day}</span>

                                        {/* Mock event indicators */}
                                        {d.day === 19 && (
                                            <div className="mt-3 space-y-1">
                                                <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-[9px] font-black uppercase truncate border border-emerald-200">
                                                    42 Llegadas
                                                </div>
                                                <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-[9px] font-black uppercase truncate border border-blue-200">
                                                    38 Salidas
                                                </div>
                                                <div className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-[9px] font-black uppercase truncate border border-amber-200">
                                                    Festivo Local
                                                </div>
                                            </div>
                                        )}

                                        {d.day > 19 && d.day < 25 && (
                                            <div className="mt-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mx-auto"></div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Day Detail Sidebar */}
                <div className="w-96 bg-white border-l border-slate-200 overflow-auto p-8 flex flex-col">
                    {selectedDay ? (
                        <>
                            <div className="mb-8">
                                <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">{selectedDay} {monthName}</h2>
                                <div className="flex items-center gap-2">
                                    <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Lunes</span>
                                    <span className="text-slate-400 text-xs font-bold">Sin incidencias graves</span>
                                </div>
                            </div>

                            <div className="space-y-6 flex-1">
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Movimientos Destacados</h3>
                                    {dailyMovements.filter(m => new Date(m.scheduled_time).getDate() === selectedDay).map(m => (
                                        <div key={m.id} className="p-4 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all cursor-pointer">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full bg-guada-purple"></div>
                                                    <span className="text-xs font-black uppercase tracking-tighter text-slate-900">{m.route?.destination}</span>
                                                </div>
                                                <span className="text-[10px] font-black text-slate-400">{new Date(m.scheduled_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-slate-600 mb-4">
                                                <Bus className="w-3.5 h-3.5" />
                                                <span className="text-[10px] font-bold uppercase">{m.bus?.license_plate} • {m.company?.name}</span>
                                            </div>
                                            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <MapPin className="w-3 h-3" />
                                                    <span className="text-[9px] font-black uppercase">Dársena {m.bay_number}</span>
                                                </div>
                                                <button className="text-[9px] font-black text-guada-purple uppercase tracking-widest hover:underline">Ver Trazabilidad</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button className="mt-8 w-full py-4 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                                <Search className="w-4 h-4" /> Buscar en este día
                            </button>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                            <CalIcon className="w-12 h-12 mb-4 text-slate-300" />
                            <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">Selecciona un día para ver detalles</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
