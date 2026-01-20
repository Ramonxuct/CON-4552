import React from 'react';
import { Monitor, Image as ImageIcon, Video, Play, Edit3, ExternalLink, Maximize2 } from 'lucide-react';
import PassengerBoard from '@/components/SIV/PassengerBoard';
import Link from 'next/link';

export default function ScreensPage() {
    return (
        <div className="p-8">
            <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Gestión de Contenidos y Pantallas</h1>
                    <p className="text-slate-500 mt-1 font-medium">Control remoto de imágenes, videos y datos en tiempo real</p>
                </div>
                <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
                    <Monitor className="w-4 h-4" /> Configurar Nueva Pantalla
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">

                {/* SIV Main Board Preview */}
                <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden group relative col-span-1 lg:col-span-2 2xl:col-span-2">
                    <div className="absolute top-4 right-4 z-20">
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse shadow-lg shadow-red-900/50">
                            En Vivo
                        </span>
                    </div>

                    {/* Native Preview Container - No scaling needed, just aspect ratio */}
                    <div className="relative w-full aspect-video overflow-hidden bg-black">
                        <PassengerBoard isPreview={true} />

                        {/* Overlay Controls */}
                        <div className="absolute inset-0 bg-slate-900/0 hover:bg-slate-900/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[2px]">
                            <Link
                                href="/public/board"
                                target="_blank"
                                className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                            >
                                <button className="px-8 py-4 bg-white/10 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md border border-white/20 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 shadow-2xl">
                                    <Maximize2 className="w-5 h-5" /> Abrir Pantalla Completa
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="p-8 bg-slate-900 border-t border-slate-800">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-black text-white tracking-tight mb-1">Panel Principal de Dársenas</h3>
                                <p className="text-slate-400 font-medium text-sm">SIV - Sistema de Información Visual (Dársenas 1-20)</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="p-3 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 hover:text-white transition-colors">
                                    <Edit3 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Other Screens (Mock) */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex gap-4 items-center group hover:shadow-md transition-all">
                        <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-guada-purple/10 group-hover:text-guada-purple transition-colors">
                            <Video className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-900 text-lg">Hall - Promoción Turismo</h4>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">Reproduciendo: spot_guada_2026.mp4</p>
                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-green-500 w-2/3 h-full rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex gap-4 items-center group hover:shadow-md transition-all">
                        <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                            <ImageIcon className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-900 text-lg">Totem Entrada</h4>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">Imagen: bienvenida_invierno.jpg</p>
                            <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                Programado
                            </span>
                        </div>
                    </div>

                    <div className="bg-guada-purple rounded-3xl p-6 text-white relative overflow-hidden">
                        <div className="absolute -right-10 -bottom-10 opacity-20 transform rotate-12">
                            <Monitor className="w-40 h-40" />
                        </div>
                        <h3 className="text-2xl font-black mb-2 relative z-10">Control de Emergencia</h3>
                        <p className="text-white/80 text-sm font-medium mb-6 relative z-10">
                            Activa mensajes de alerta en todas las pantallas simultáneamente.
                        </p>
                        <button className="w-full py-3 bg-white text-guada-purple rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/90 transition-colors relative z-10">
                            Gestionar Alertas
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
