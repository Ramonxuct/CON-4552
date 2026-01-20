'use client';

import React from 'react';
import { Movement } from '@/types';
import { Clock, Navigation, Bus as BusIcon, MapPin } from 'lucide-react';

interface MovementCardProps {
    movement: Movement;
}

const MovementCard: React.FC<MovementCardProps> = ({ movement }) => {
    const statusColors = {
        scheduled: 'bg-blue-100 text-blue-800',
        arrived: 'bg-green-100 text-green-800',
        departed: 'bg-gray-100 text-gray-800',
        delayed: 'bg-amber-100 text-amber-800',
        cancelled: 'bg-red-100 text-red-800',
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${statusColors[movement.status]}`}>
                    {movement.status === 'scheduled' ? 'Programado' :
                        movement.status === 'arrived' ? 'En dársena' :
                            movement.status === 'delayed' ? 'Retrasado' :
                                movement.status === 'departed' ? 'Salida' : movement.status}
                </span>
                <div className="flex items-center text-slate-500 text-sm">
                    <Clock className="w-4 h-4 mr-1.5" />
                    {new Date(movement.scheduled_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>

            <div className="flex items-center mb-4">
                <div className="bg-slate-100 p-2.5 rounded-lg mr-4">
                    <BusIcon className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 text-lg tracking-tight uppercase">{movement.bus?.license_plate}</h3>
                    <p className="text-slate-500 text-sm font-medium">{movement.company?.name}</p>
                </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-50">
                <div className="flex items-center text-slate-600">
                    <MapPin className="w-4 h-4 mr-2.5 opacity-60" />
                    <span className="text-sm font-medium">Dársena {movement.bay_number || 'TBD'}</span>
                </div>
                <div className="flex items-center text-slate-600">
                    <Navigation className="w-4 h-4 mr-2.5 opacity-60" />
                    <span className="text-sm font-medium">{movement.route?.origin} → {movement.route?.destination}</span>
                </div>
            </div>

            {movement.type === 'arrival' ? (
                <div className="mt-5 pt-4 bg-emerald-50 -mx-5 -mb-5 px-5 py-3 rounded-b-xl border-t border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wide">
                    Llegada Próxima
                </div>
            ) : (
                <div className="mt-5 pt-4 bg-blue-50 -mx-5 -mb-5 px-5 py-3 rounded-b-xl border-t border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide">
                    Salida Programada
                </div>
            )}
        </div>
    );
};

export default MovementCard;
