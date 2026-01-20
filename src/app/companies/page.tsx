'use client';

import React, { useState, useEffect } from 'react';

import { Users, Mail, Phone, Bus, Shield, ExternalLink, Plus, Search, Filter, Loader2 } from 'lucide-react';

export default function CompaniesPage() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('/api/companies')
            .then(res => res.json())
            .then(data => {
                setCompanies(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch companies', err);
                setLoading(false);
            });
    }, []);

    const filtered = companies.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.cif.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;


    return (
        <div className="p-4 md:p-8">
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Compañías de Transporte</h1>
                    <p className="text-slate-500 mt-1 font-medium text-sm">Gestión de concesiones y flotas de la estación</p>
                </div>
                <button className="w-full lg:w-auto px-5 py-3 bg-[#8A1D5B] text-white rounded-xl hover:bg-[#8A1D5B]/90 shadow-lg shadow-purple-200 transition-all text-sm font-bold flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" /> Nueva Compañía
                </button>
            </header>

            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o CIF..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#8A1D5B]/20 outline-none transition-all placeholder:text-slate-400 text-slate-700 font-medium shadow-sm"
                    />
                </div>
                <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[#8A1D5B] hover:border-[#8A1D5B]/30 transition-all w-fit">
                    <Filter className="w-5 h-5" />
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8">

                {filtered.map((company) => (
                    <div key={company.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all overflow-hidden group">
                        {/* Header with Corporate Color */}
                        <div className="h-24 relative" style={{ backgroundColor: company.color + '15' }}>
                            <div className="absolute inset-0 opacity-10" style={{
                                backgroundImage: `radial-gradient(circle at 2px 2px, ${company.color} 1px, transparent 0)`,
                                backgroundSize: '24px 24px'
                            }}></div>
                            <div className="absolute -bottom-6 left-8">
                                <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center border-4 border-white overflow-hidden p-3">
                                    <div className="w-full h-full rounded-lg flex items-center justify-center text-white font-black text-xl" style={{ backgroundColor: company.color }}>
                                        {company.name.charAt(0)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 pt-10">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 group-hover:text-guada-purple transition-colors">{company.name}</h2>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{company.cif}</span>
                                </div>
                                <div className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border" style={{ borderColor: company.color, color: company.color }}>
                                    Activa
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                                        <Mail className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <span className="text-sm font-bold">{company.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                                        <Phone className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <span className="text-sm font-bold">{company.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                                        <Bus className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <span className="text-sm font-bold">{company.fleet_size} Vehículos en flota</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button className="py-3 bg-slate-50 text-slate-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                                    <Shield className="w-3.5 h-3.5" /> Seguros
                                </button>
                                <button className="py-3 bg-white border border-slate-200 text-slate-900 rounded-xl font-bold text-xs uppercase tracking-widest hover:border-guada-purple hover:text-guada-purple transition-all flex items-center justify-center gap-2">
                                    <ExternalLink className="w-3.5 h-3.5" /> Detalle
                                </button>
                            </div>
                        </div>

                        {/* Progress/Usage Mini Chart */}
                        <div className="px-8 pb-6">
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ocupación Media</span>
                                <span className="text-xs font-black text-slate-900">78%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full rounded-full transition-all duration-1000" style={{ width: '78%', backgroundColor: company.color }}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
