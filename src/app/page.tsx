'use client';

import React, { useState, useEffect } from 'react';
import MovementCard from '@/components/dashboard/MovementCard';
import { mockMovements } from '@/lib/mockData';
import { Movement } from '@/types';
import { LayoutDashboard, Users, TrendingUp, Calendar as CalendarIcon, Filter, Search, Plus, X } from 'lucide-react';

export default function DashboardPage() {
    const [movements, setMovements] = useState<Movement[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [showNewModal, setShowNewModal] = useState(false);


    useEffect(() => {
        setLoading(true);
        fetch('/api/movements')
            .then(res => res.json())
            .then(data => {
                setMovements(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching movements', err);
                setLoading(false);
            });
    }, []);


    const filteredMovements = movements.filter(m => {
        const matchesSearch =
            m.bus?.license_plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.company?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.route?.destination.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || m.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const stats = [
        { label: 'Salidas Hoy', value: '42', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Llegadas Hoy', value: '38', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Dársenas Libres', value: '14/25', icon: LayoutDashboard, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Festivo Próximo', value: '24 Ene', icon: CalendarIcon, color: 'text-amber-600', bg: 'bg-amber-50' },
    ];

    return (
        <div className="p-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Control de Movimientos</h1>
                    <p className="text-slate-500 mt-1 font-medium">Gestión en tiempo real de la Estación de Guadalajara</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 shadow-sm transition-all text-sm font-medium flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" /> 19 de Enero, 2026
                    </button>
                    <button
                        onClick={() => setShowNewModal(true)}
                        className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all text-sm font-bold flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Nuevo Registro
                    </button>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.bg} p-2.5 rounded-xl`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Estado</span>
                        </div>
                        <p className="text-3xl font-black text-slate-900 tracking-tighter mb-1">{stat.value}</p>
                        <h3 className="text-slate-500 text-sm font-bold">{stat.label}</h3>
                    </div>
                ))}
            </div>

            {/* Filters/Search */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar matrícula, ruta o compañía..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400 text-slate-700 font-medium shadow-sm"
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                    {[
                        { id: 'all', label: 'Todos' },
                        { id: 'scheduled', label: 'Programados' },
                        { id: 'arrived', label: 'En dársena' },
                        { id: 'delayed', label: 'Retrasados' }
                    ].map((s) => (
                        <button
                            key={s.id}
                            onClick={() => setStatusFilter(s.id)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${statusFilter === s.id
                                ? 'bg-guada-purple text-white shadow-lg shadow-guada-purple/20'
                                : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                                }`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Movements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {loading ? (
                    Array(4).fill(0).map((_, i) => (
                        <div key={i} className="bg-slate-100 animate-pulse h-64 rounded-2xl border border-slate-200"></div>
                    ))
                ) : (
                    filteredMovements.map((m) => (
                        <MovementCard key={m.id} movement={m} />
                    ))
                )}
            </div>

            {filteredMovements.length === 0 && !loading && (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                    <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-slate-600 font-bold">No se han encontrado resultados</p>
                    <p className="text-slate-400 text-sm mt-1">Prueba con otros términos o filtros</p>
                    <button
                        onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}
                        className="mt-6 text-blue-600 font-bold text-sm hover:underline"
                    >
                        Limpiar todos los filtros
                    </button>
                </div>
            )}

            {/* New Record Modal (Mock) */}
            {showNewModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden scale-in">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-slate-900">Nuevo Registro de Movimiento</h2>
                            <button
                                onClick={() => setShowNewModal(false)}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-slate-400" />
                            </button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Matrícula</label>
                                    <input type="text" placeholder="0000-XXX" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Compañía</label>
                                    <select className="w-full p-3 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                                        <option>Alsa</option>
                                        <option>Avanza</option>
                                        <option>Samar</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Dársena Asignada</label>
                                <input type="text" placeholder="D12" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono" />
                            </div>
                            <button
                                onClick={() => setShowNewModal(false)}
                                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all mt-4"
                            >
                                Confirmar Registro
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
