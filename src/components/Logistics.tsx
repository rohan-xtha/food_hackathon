 import React, { useState } from 'react';
import { 
  Truck, MapPin, Calendar, Clock, Navigation, Thermometer, ShieldAlert, CheckCircle, Eye, Search, ShieldCheck
} from 'lucide-react';

interface LogisticsProps {
  isNepali: boolean;
}

interface Shipment {
  id: string;
  source: string;
  destination: string;
  crop: string;
  weight: number;
  driver: string;
  driverPhone: string;
  tempCelsius: number;
  status: 'Collected' | 'In Transit' | 'Delivered' | 'Pending';
  eta: string;
  route: string;
}

export default function Logistics({ isNepali }: LogisticsProps) {
  const [selectedShipmentId, setSelectedShipmentId] = useState('LOG-209');

  const INITIAL_SHIPMENTS: Shipment[] = [
    {
      id: 'LOG-209',
      source: 'Kavre Greenhouse Grids',
      destination: 'Kathmandu Fresh Mart Center',
      crop: 'Organic Vine Tomatoes',
      weight: 450,
      driver: 'Rajesh Hamal',
      driverPhone: '+977 98510-12345',
      tempCelsius: 4.2,
      status: 'In Transit',
      eta: '45 mins remaining',
      route: 'BP Highway (Arakhan Pass Bypass)'
    },
    {
      id: 'LOG-184',
      source: 'Dhading Fields Co-op',
      destination: 'Pokhara Wholesale Warehouse',
      crop: 'Fresh Green Beans',
      weight: 2000,
      driver: 'Hari Vansha',
      driverPhone: '+977 98410-54321',
      tempCelsius: 6.8,
      status: 'Delivered',
      eta: 'Completed 2 hours ago',
      route: 'Prithvi Highway (Mugling Junction)'
    },
    {
      id: 'LOG-304',
      source: 'Ilam Farm Grids',
      destination: 'Lalitpur Organic Depot',
      crop: 'Fresh Sweet Corn',
      weight: 800,
      driver: 'Madan Krishna',
      driverPhone: '+977 98030-99999',
      tempCelsius: 18.5,
      status: 'Pending',
      eta: 'Collection starts standard 8:00 AM tomorrow',
      route: 'Mechi Highway segment'
    }
  ];

  const selectedShipment = INITIAL_SHIPMENTS.find(s => s.id === selectedShipmentId) || INITIAL_SHIPMENTS[0];

  const getStatusColor = (status: Shipment['status']) => {
    switch (status) {
      case 'In Transit': return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'Delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Collected': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-slate-100 text-slate-500 border-slate-200';
    }
  };

  return (
    <div className="space-y-8 font-sans text-xs">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold font-display text-[#154212] tracking-tight">
          FarmMitra Logistics Dispatch Center
        </h1>
        <p className="text-slate-500 text-sm mt-2">
          Verify cold-chain climate telemetry and match driver dispatch manifests on Nepalese transit highways.
        </p>
      </header>

      {/* Grid Layout splits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Shipment Lists */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-4 rounded-2xl border shadow-xs flex justify-between items-center bg-slate-50/50">
            <span className="font-bold text-slate-700 text-sm">Active Logistics Manifests</span>
            <Search className="text-slate-400 w-4.5 h-4.5" />
          </div>

          <div className="space-y-4">
            {INITIAL_SHIPMENTS.map((s) => (
              <div 
                key={s.id}
                onClick={() => setSelectedShipmentId(s.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  selectedShipmentId === s.id 
                    ? 'border-2 border-[#154212] bg-[#154212]/5 shadow-sm' 
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-extrabold text-slate-800 font-mono text-sm">{s.id}</span>
                  <span className={`px-2.5 py-0.5 rounded-full font-bold border text-[10px] ${getStatusColor(s.status)}`}>
                    {s.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-medium truncate block max-w-[280px]">From: {s.source}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Navigation className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold truncate block max-w-[280px]">To: {s.destination}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                  <span>Cargo: {s.weight} Kg {s.crop}</span>
                  <span className="text-slate-500 font-mono font-sans">{s.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Cold-Chain Telemetry details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 border shadow-lg space-y-6">
            <div className="flex justify-between items-start pb-4 border-b">
              <div>
                <h2 className="font-bold text-slate-800 text-base">Manifest Detail: {selectedShipment.id}</h2>
                <p className="text-slate-400 text-[10px] mt-0.5 uppercase tracking-wider font-semibold">
                  Assigned Route: {selectedShipment.route}
                </p>
              </div>
              <span className="bg-[#bcf0ae] text-[#002201] text-[10px] font-extrabold px-3 py-1 rounded-lg uppercase shadow-sm">
                Route Safe ✔
              </span>
            </div>

            {/* Simulated Live Route Tracker Map */}
            <div className="rounded-2xl border h-44 bg-slate-50 relative overflow-hidden flex flex-col justify-between p-4 shadow-inner">
              <div className="absolute inset-0 bg-transparent opacity-10 flex flex-col justify-around text-slate-200">
                <hr className="border-slate-900 border-dashed border-2 w-full" />
                <hr className="border-slate-900 border-dashed border-2 w-full" />
              </div>

              <div className="flex justify-between items-center relative z-10">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#154212] text-white flex items-center justify-center font-bold">
                    A
                  </div>
                  <span className="text-[9px] font-bold text-slate-500 mt-1 max-w-[80px] break-words text-center">
                    {selectedShipment.source.split(' ')[0]}
                  </span>
                </div>

                <div className="flex-grow mx-4 relative">
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        selectedShipment.status === 'Delivered' ? 'bg-[#154212] w-full' :
                        selectedShipment.status === 'In Transit' ? 'bg-sky-600 animate-pulse w-2/3' : 'bg-slate-300 w-1/12'
                      }`}
                    ></div>
                  </div>
                  {selectedShipment.status === 'In Transit' && (
                    <Truck className="w-5 h-5 text-sky-600 absolute top-[-18px] left-2/3 -translate-x-1/2 animate-bounce" />
                  )}
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold">
                    B
                  </div>
                  <span className="text-[9px] font-bold text-slate-500 mt-1 max-w-[80px] break-words text-center">
                    {selectedShipment.destination.split(' ')[0]}
                  </span>
                </div>
              </div>

              <div className="bg-white/85 p-2 rounded-xl border border-slate-200/50 flex justify-between items-center text-[10px] relative z-10 backdrop-blur-xs font-semibold">
                <span className="text-slate-400">BP Highway Transit Telemetry System</span>
                <span className="text-[#154212] font-mono">GPS Signal Locks: STABLE</span>
              </div>
            </div>

            {/* Dispatcher parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border flex items-center gap-3">
                <Thermometer className={`w-8 h-8 ${selectedShipment.tempCelsius > 10 ? 'text-[#ba1a1a]' : 'text-[#154212]'}`} />
                <div>
                  <span className="text-slate-400 text-[10px] block">REEFER TEMP TELEMETRY</span>
                  <span className="text-sm font-extrabold font-mono text-slate-800">
                    {selectedShipment.tempCelsius}°C
                  </span>
                  <span className="text-[9px] font-bold text-emerald-700 block mt-0.5 uppercase tracking-wider">
                    {selectedShipment.tempCelsius > 10 ? 'AMBIENT COLD CRITICAL' : 'OPTIMAL STORAGE'}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#bcf0ae]/20 text-[#154212] flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">ASSIGNED SHIPMENT ESCORT</span>
                  <span className="text-xs font-bold text-slate-800 block">
                    {selectedShipment.driver}
                  </span>
                  <span className="text-[9px] font-semibold text-slate-400 block mt-0.5">
                    {selectedShipment.driverPhone}
                  </span>
                </div>
              </div>
            </div>

            {/* Standard instruction checklists notes */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3 text-slate-700">
              <ShieldCheck className="text-sky-700 w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-xs text-sky-800">Standard Transport Instruction Manifest</p>
                <p className="text-[11px] text-sky-900 mt-1 leading-normal">
                  Vehicles must maintain closed-chain refrigeration below 8°C. BP Highway logistics drivers are logged in checkpoints and mandated to take cargo checks every 40 kilometers. Checkpoint confirmations are synced.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}