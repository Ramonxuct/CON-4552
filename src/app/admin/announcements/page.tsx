'use client';

import React, { useState, useEffect } from 'react';
import { Megaphone, Play, Settings, Bell, History, Volume2, ShieldAlert, X, Mic, Circle, Square, Calendar, Monitor, Layers, Radio, Music, CheckCircle2 } from 'lucide-react';


export default function AnnouncementsPage() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [selectedZone, setSelectedZone] = useState('Todas');
    const [activeTab, setActiveTab] = useState('directo');
    const [notification, setNotification] = useState<string | null>(null);

    const showNotify = (msg: string) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), 3000);
    };


    const zones = ['Todas', 'Andén Norte', 'Andén Sur', 'Sala de Espera', 'Taquillas', 'Exterior'];
    const quickAnnouncements = [
        { id: 1, title: 'Llegada Próxima', color: 'bg-emerald-500' },
        { id: 2, title: 'Retraso 15min', color: 'bg-amber-500' },
        { id: 3, title: 'Objeto Perdido', color: 'bg-blue-500' },
        { id: 4, title: 'Cierre Estación', color: 'bg-slate-900' },
    ];

    return (
        <div className="p-8 pb-32">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div className="flex items-center gap-4">
                    <div className="bg-guada-purple p-4 rounded-3xl shadow-xl shadow-purple-200">
                        <Megaphone className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Estación Multimedia</h1>
                        <p className="text-slate-500 mt-1 font-medium italic">SIA (Megafonía) & SIV (Sistemas de Información Visual)</p>
                    </div>
                </div>

                {/* Master Volume / Controls */}
                <div className="flex items-center gap-6 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3">
                        <Volume2 className="w-5 h-5 text-slate-400" />
                        <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-guada-purple rounded-full" style={{ width: '65%' }}></div>
                        </div>
                    </div>
                    <div className="h-8 w-px bg-slate-100"></div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sistema Online</span>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div className="flex gap-2 mb-8 bg-slate-100 p-1.5 rounded-2xl w-fit">
                {[
                    { id: 'directo', icon: Radio, label: 'Control Directo' },
                    { id: 'biblioteca', icon: Music, label: 'Biblioteca Audio' },
                    { id: 'programar', icon: Calendar, label: 'Programación' },
                    { id: 'pantallas', icon: Monitor, label: 'Matrix SIV' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === tab.id ? 'bg-white shadow-sm text-guada-purple' : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" /> {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                {/* Main Control Panel */}
                <div className="xl:col-span-2 space-y-8">
                    {activeTab === 'directo' && (
                        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="w-1.5 h-6 bg-slate-100 rounded-full overflow-hidden flex flex-col justify-end">
                                            <div className="w-full bg-guada-purple opacity-20" style={{ height: Math.random() * 100 + '%' }}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <h2 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3">
                                <Radio className="w-6 h-6 text-guada-purple" /> Consola de Emisión en Vivo
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Zona de Emisión</label>
                                        <div className="flex flex-wrap gap-2">
                                            {zones.map(z => (
                                                <button
                                                    key={z}
                                                    onClick={() => setSelectedZone(z)}
                                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${selectedZone === z ? 'bg-guada-purple border-guada-purple text-white shadow-lg shadow-purple-200' : 'bg-white border-slate-100 text-slate-400 hover:border-guada-purple/30'
                                                        }`}
                                                >
                                                    {z}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Configuración de Salida</label>
                                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-bold text-slate-600">Prioridad Máxima</span>
                                                <div className="w-10 h-6 bg-guada-purple rounded-full relative p-1 cursor-pointer">
                                                    <div className="w-4 h-4 bg-white rounded-full absolute right-1"></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-bold text-slate-600">Gong de Entrada</span>
                                                <div className="w-10 h-6 bg-emerald-500 rounded-full relative p-1 cursor-pointer">
                                                    <div className="w-4 h-4 bg-white rounded-full absolute right-1"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center justify-center p-8 bg-slate-900 rounded-3xl shadow-2xl relative">
                                    {isRecording ? (
                                        <div className="absolute top-6 left-6 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                                            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Grabando...</span>
                                        </div>
                                    ) : (
                                        <div className="absolute top-6 left-6 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Listo</span>
                                        </div>
                                    )}

                                    <button
                                        onMouseDown={() => { setIsRecording(true); setIsPlaying(true); }}
                                        onMouseUp={() => { setIsRecording(false); setIsPlaying(false); }}
                                        className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${isRecording ? 'bg-red-600 shadow-[0_0_50px_rgba(220,38,38,0.5)] scale-95' : 'bg-guada-purple hover:scale-105 shadow-[0_0_30px_rgba(138,29,91,0.3)]'
                                            }`}
                                    >
                                        <Mic className={`w-12 h-12 text-white ${isRecording ? 'animate-pulse' : ''}`} />
                                    </button>
                                    <p className="mt-8 text-white font-black uppercase tracking-widest text-xs">Mantener para hablar</p>
                                    <p className="text-slate-500 text-[10px] mt-2 font-bold italic underline cursor-pointer">Configurar micrófono</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'pantallas' && (
                        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden relative">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
                                    <Layers className="w-6 h-6 text-guada-purple" /> Matrix de Información Visual (SIV)
                                </h2>
                                <button className="px-4 py-2 bg-guada-orange text-black rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-guada-orange/20">
                                    Interrumpir Todas (BREAK-IN)
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="bg-slate-50 p-4 rounded-3xl border border-slate-200 group hover:border-guada-purple transition-all">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-sm">Pantalla 0{i}</h4>
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Andén Norte</p>
                                            </div>
                                            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                        </div>
                                        <div className="aspect-video bg-slate-900 rounded-xl mb-4 overflow-hidden relative border-2 border-slate-800">
                                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40">
                                                <Monitor className="w-8 h-8 text-white mb-2" />
                                                <span className="text-[10px] text-white font-bold uppercase">Previsualización</span>
                                            </div>
                                        </div>
                                        <select className="w-full p-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase outline-none focus:ring-2 focus:ring-guada-purple/20">
                                            <option>Llegadas / Salidas</option>
                                            <option>Publicidad Turística</option>
                                            <option>Noticias Ayuntamiento</option>
                                            <option>Aviso Emergencia</option>
                                        </select>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Library and History */}
                <div className="space-y-8">
                    <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white overflow-hidden relative">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm font-black uppercase tracking-widest">Biblioteca Rápida</h3>
                            <button className="text-guada-orange hover:underline text-[10px] font-black uppercase">Gestionar</button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {quickAnnouncements.map(qa => (
                                <button
                                    key={qa.id}
                                    onClick={() => showNotify(`Reproduciendo: ${qa.title} en ${selectedZone}`)}
                                    className="p-4 bg-white/10 border border-white/20 rounded-2xl hover:bg-white/20 transition-all text-left flex flex-col gap-3 group"
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${qa.color} shadow-lg shadow-${qa.color}/20 text-white font-bold`}>
                                        <Play className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-300 group-hover:text-white transition-colors">{qa.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center justify-between">
                            Historial Reciente <History className="w-4 h-4 text-slate-400" />
                        </h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div
                                    key={i}
                                    onClick={() => showNotify("Reproduciendo aviso histórico...")}
                                    className="flex gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-slate-100"
                                >
                                    <div className="bg-blue-50 p-2.5 rounded-xl">
                                        <Megaphone className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-slate-900">Salida Próxima - Dársena 0{i + 3}</p>
                                        <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Hace {12 * i} min • Sala de Espera</p>
                                    </div>
                                    <Play className="w-4 h-4 text-slate-300" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Notification Toast */}
            {notification && (
                <div className="fixed bottom-10 right-10 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-right-10 z-[100] border-t-4 border-guada-orange">
                    <div className="bg-emerald-500 p-2 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-sm tracking-tight">{notification}</span>
                    <button onClick={() => setNotification(null)} className="ml-4 opacity-50 hover:opacity-100"><X className="w-4 h-4" /></button>
                </div>
            )}


            {/* Float Recording Bar */}
            {isRecording && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-red-600 px-8 py-4 rounded-full shadow-2xl flex items-center gap-6 text-white scale-in">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                        <span className="font-black text-sm uppercase tracking-widest">Rec: 00:04</span>
                    </div>
                    <div className="flex gap-1">
                        {Array(20).fill(0).map((_, i) => (
                            <div key={i} className="w-1 bg-white/40 h-8 rounded-full flex flex-col justify-center">
                                <div className="w-full bg-white rounded-full" style={{ height: Math.random() * 100 + '%' }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
