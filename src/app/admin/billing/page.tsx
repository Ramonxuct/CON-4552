'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, Download, Plus, Search, FileText, Calendar, Edit3, Trash2, CheckCircle2, AlertCircle, Printer, Send } from 'lucide-react';
import { mockCompanies } from '@/lib/mockData'; // Keep for now if used for rendering colors until invoice refactor is complete


export default function BillingPage() {
    const [showNewInvoice, setShowNewInvoice] = useState(false);
    const [invoices, setInvoices] = useState<any[]>([]); // Using any for now to match API response shape quickly
    const [companies, setCompanies] = useState<any[]>([]);

    useEffect(() => {
        // Fetch Invoices
        fetch('/api/invoices')
            .then(res => res.json())
            .then(data => setInvoices(data))
            .catch(err => console.error('Error fetching invoices', err));

        // Fetch Companies (for colors)
        fetch('/api/companies')
            .then(res => res.json())
            .then(data => setCompanies(data))
            .catch(err => console.error('Error fetching companies', err));
    }, []);


    const handleDownloadPDF = (id: string) => {
        alert(`Generando PDF para la factura ${id}... Esta funcionalidad simula la descarga de un documento oficial con el sello del Ayuntamiento de Guadalajara.`);
    };

    return (
        <div className="p-4 md:p-8">
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Facturación y Cánones</h1>
                    <p className="text-slate-500 mt-1 font-medium text-sm">Liquidación de servicios de transporte - Estación Guadalajara</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all text-sm font-bold flex items-center justify-center gap-2">
                        <TrendingUp className="w-4 h-4" /> Informes de Ingresos
                    </button>
                    <button
                        onClick={() => setShowNewInvoice(true)}
                        className="w-full sm:w-auto px-5 py-2.5 bg-[#8A1D5B] text-white rounded-xl hover:bg-[#8A1D5B]/90 shadow-lg shadow-purple-200 transition-all text-sm font-bold flex items-center justify-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Crear Nueva Factura
                    </button>
                </div>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10">

                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-emerald-50 p-2.5 rounded-xl">
                            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                        </div>
                        <span className="text-emerald-500 font-bold text-xs uppercase tracking-widest">+12% este mes</span>
                    </div>
                    <p className="text-3xl font-black text-slate-900 tracking-tight mb-1">€25,910.70</p>
                    <h3 className="text-slate-500 text-sm font-bold">Total Facturado (Enero 2026)</h3>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-amber-50 p-2.5 rounded-xl">
                            <AlertCircle className="w-6 h-6 text-amber-600" />
                        </div>
                        <span className="text-amber-500 font-bold text-xs uppercase tracking-widest">3 Facturas</span>
                    </div>
                    <p className="text-3xl font-black text-slate-900 tracking-tight mb-1">€8,900.20</p>
                    <h3 className="text-slate-500 text-sm font-bold">Pendiente de Cobro</h3>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-guada-purple/5 p-2.5 rounded-xl">
                            <FileText className="w-6 h-6 text-guada-purple" />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-slate-900 tracking-tight mb-1">12</p>
                    <h3 className="text-slate-500 text-sm font-bold">Compañías Activas con Canon</h3>
                </div>
            </div>

            {/* Invoice Table */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <h2 className="text-xl font-bold text-slate-900">Historial de Facturación</h2>
                    <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="Buscar factura..." className="w-full sm:w-64 pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#8A1D5B]/20" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">

                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ID Factura</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Compañía</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Concepto</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Fecha</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Importe</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Estado</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {invoices.map((inv) => (
                                <tr key={inv.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4 font-black text-slate-900 text-sm">{inv.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: inv.company?.color || '#ccc' }}></div>
                                            <span className="text-sm font-bold text-slate-700">{inv.company?.name || 'Compañía desconocida'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-500">{inv.type}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-500">{new Date(inv.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-sm font-black text-slate-900">€{parseFloat(inv.amount).toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${inv.status === 'Pagada' ? 'bg-emerald-100 text-emerald-700' :
                                            inv.status === 'Pendiente' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleDownloadPDF(inv.id)} className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-guada-purple transition-all shadow-sm">
                                                <Download className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-guada-purple transition-all shadow-sm">
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-red-600 transition-all shadow-sm">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* New Invoice Slider (Mock Context) */}
                {showNewInvoice && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-end">
                        <div className="w-full max-w-xl bg-white h-full shadow-2xl p-10 overflow-auto slide-in-right">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Nueva Factura</h2>
                                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Emisión de documento oficial</p>
                                </div>
                                <button onClick={() => setShowNewInvoice(false)} className="bg-slate-50 p-3 rounded-2xl hover:bg-slate-100 transition-colors">
                                    <Plus className="w-6 h-6 rotate-45 text-slate-400" />
                                </button>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Compañía Receptora</label>
                                    <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-guada-purple/20 outline-none font-bold text-slate-900">
                                        {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Tipo de Concepto</label>
                                        <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-guada-purple/20 outline-none font-bold text-slate-900">
                                            <option>Canon por Dársena</option>
                                            <option>Consumo Eléctrico</option>
                                            <option>Mantenimiento</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Importe (€)</label>
                                        <input type="number" placeholder="0.00" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-guada-purple/20 outline-none font-black text-slate-900" />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Notas / Observaciones</label>
                                    <textarea rows={4} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-guada-purple/20 outline-none font-medium text-slate-700" placeholder="Añadir detalles adicionales..."></textarea>
                                </div>

                                <div className="pt-10 border-t border-slate-100 flex gap-4">
                                    <button className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                                        <Printer className="w-4 h-4" /> Guardar Borrador
                                    </button>
                                    <button onClick={() => setShowNewInvoice(false)} className="flex-1 py-4 bg-guada-purple text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-guada-purple/90 shadow-xl shadow-purple-200 transition-all flex items-center justify-center gap-2">
                                        <Send className="w-4 h-4" /> Emitir y Enviar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

