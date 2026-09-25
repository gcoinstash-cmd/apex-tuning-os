import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  ShieldCheck, 
  Wrench, 
  Gauge, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Database,
  Lock,
  Radio,
  Car,
  Sliders,
  Cpu,
  Activity
} from 'lucide-react';
import { BookingRecord, TicketStatus } from '../types';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingRecord[];
  onUpdateStatus: (ticketId: string, newStatus: TicketStatus) => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ 
  isOpen, 
  onClose,
  bookings,
  onUpdateStatus
}) => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<'bays' | 'dyno' | 'inventory' | 'telemetry'>('bays');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'apextuning2026') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleAutoFill = () => {
    setPasscode('apextuning2026');
    setIsAuthenticated(true);
    setError(false);
  };

  const dynoLogs = [
    { id: 'DYNO-881', vehicle: 'Porsche 911 GT3 RS (991.2)', runType: 'Stage 2 ECU Sweep', baselineHp: 520, tunedHp: 574, torque: '+48 lb-ft', tech: "Rick 'Dyno' Sterling", status: 'VERIFIED' },
    { id: 'DYNO-882', vehicle: 'BMW M4 Competition', runType: 'E85 FlexFuel Map', baselineHp: 503, tunedHp: 612, torque: '+92 lb-ft', tech: "Rick 'Dyno' Sterling", status: 'LOGGED' },
    { id: 'DYNO-883', vehicle: 'Nissan GT-R Nismo (R35)', runType: 'Boost Controller Calibration', baselineHp: 600, tunedHp: 710, torque: '+105 lb-ft', tech: "Kenji Sato", status: 'ANALYZING' },
    { id: 'DYNO-884', vehicle: 'Audi RS6 Avant (C8)', runType: 'Transmission TCU Remap', baselineHp: 591, tunedHp: 665, torque: '+65 lb-ft', tech: "Sarah Alvarez", status: 'VERIFIED' },
  ];

  const workshopBays = [
    { id: 'BAY-01', name: 'Bay 1: General Diagnostics', tech: 'Sarah Alvarez', lift: 'Rotary 2-Post (10k lb)', vehicle: 'Audi RS7 Sportback', status: 'OCCUPIED' },
    { id: 'BAY-02', name: 'Bay 2: Active Race Lift', tech: 'Marcus Thorne', lift: 'BendPak Alignment Lift', vehicle: 'BMW M4 Competition', status: 'IN_SERVICE' },
    { id: 'BAY-03', name: 'Bay 3: AWD Chassis Dyno', tech: "Rick 'Dyno' Sterling", lift: 'Dynojet 424xLC2 Linx', vehicle: 'Porsche Cayman GT4', status: 'LIVE_TEST' },
    { id: 'BAY-04', name: 'Bay 4: Fabrication & Exhaust', tech: 'Devon Vance', lift: '4-Post Storage Lift', vehicle: 'Chevrolet Corvette C8 Z06', status: 'OPEN' },
    { id: 'BAY-05', name: 'Bay 5: Detailing Cleanroom', tech: 'Kenji Sato', lift: 'Scissor Prep Rack', vehicle: 'Tesla Model S Plaid', status: 'CURING_9H' },
  ];

  const performanceParts = [
    { sku: 'MOT-660-FL', name: 'Motul RBF660 Racing Brake Fluid (500ml)', stock: 24, reorder: 6, unitCost: '$19.50', supplier: 'Motul Motorsport NA' },
    { sku: 'IPD-PLEN-991', name: 'IPD 82mm Competition Plenum Kit', stock: 3, reorder: 1, unitCost: '$995.00', supplier: 'IPD Plenums USA' },
    { sku: 'NGK-RACE-88', name: 'NGK Racing Iridium Spark Plugs (Step Colder)', stock: 48, reorder: 16, unitCost: '$16.20', supplier: 'Turner Motorsport' },
    { sku: 'GY-CERAM-9H', name: 'Gyeon Q² MOHS EVO 9H Ceramic Base (50ml)', stock: 8, reorder: 2, unitCost: '$120.00', supplier: 'Gyeon Quartz Direct' },
    { sku: 'BMC-AIR-M3', name: 'BMC High-Performance Panel Air Filters (Pair)', stock: 5, reorder: 2, unitCost: '$165.00', supplier: 'BMC Filters Italy' },
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-4xl bg-[#0A0B0E] border-2 border-[#FF5F1F]/40 shadow-[0_0_50px_rgba(255,95,31,0.25)] rounded-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/90">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#FF5F1F] rounded-full animate-ping" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF5F1F] font-bold flex items-center gap-2">
              <Terminal size={14} /> APEX_TUNING_OS // WORKSHOP_OPERATOR_GATE
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-[#FF5F1F] transition-colors p-1 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Login Screen */
          <div className="p-8 md:p-12 flex flex-col items-center text-center font-mono">
            <div className="w-16 h-16 rounded-full bg-[#FF5F1F]/10 border border-[#FF5F1F]/40 flex items-center justify-center text-[#FF5F1F] mb-6 shadow-[0_0_20px_rgba(255,95,31,0.3)]">
              <Lock size={28} />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white mb-2 font-display">
              Workshop Operator Authorization
            </h3>
            <p className="text-slate-400 text-base font-semibold max-w-md mb-8 font-sans">
              Enter garage security credentials to manage active service bays, tune maps, live dyno logs, and customer vehicle tickets.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
              <div>
                <input 
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="SECURITY PASSKEY"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white font-mono text-center tracking-[0.3em] uppercase focus:outline-none focus:border-[#FF5F1F] focus:ring-1 focus:ring-[#FF5F1F] transition-all"
                />
                {error && (
                  <p className="text-red-400 text-xs mt-2 flex items-center justify-center gap-1">
                    <AlertCircle size={12} /> INVALID WORKSHOP KEY. TRY THE DEMO CHEAT CODE.
                  </p>
                )}
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-[#FF5F1F] hover:bg-[#ff763f] text-black font-bold text-base font-semibold min-h-[44px] uppercase tracking-widest rounded-md transition-all shadow-[0_0_20px_rgba(255,95,31,0.4)] cursor-pointer"
              >
                Access Workshop Command
              </button>
            </form>

            {/* 1-Click Auto Fill Demo Passkey */}
            <div className="mt-8 pt-6 border-t border-white/10 w-full max-w-sm flex flex-col items-center">
              <span className="text-xs font-semibold tracking-wider text-slate-300 uppercase tracking-widest mb-2 font-mono">
                Commercial Demo Bypass Gate
              </span>
              <button 
                type="button"
                onClick={handleAutoFill}
                className="px-5 py-3 min-h-[44px] bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-base font-semibold min-h-[44px] font-mono tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer"
              >
                <ShieldCheck size={14} /> 1-Click Auto-Fill (apextuning2026)
              </button>
            </div>
          </div>
        ) : (
          /* Authenticated Admin Suite */
          <div className="flex-1 flex flex-col overflow-hidden font-mono">
            {/* Top Stat Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border-b border-white/10 text-xs">
              <div className="bg-[#0A0B0E] p-4 flex flex-col">
                <span className="text-slate-400 text-xs font-semibold tracking-wider uppercase">Service Bays Active</span>
                <span className="text-xl font-bold text-[#FF5F1F] mt-1">4 / 5 BAYS</span>
              </div>
              <div className="bg-[#0A0B0E] p-4 flex flex-col">
                <span className="text-slate-400 text-xs font-semibold tracking-wider uppercase">Dyno Logs (Today)</span>
                <span className="text-xl font-bold text-emerald-400 mt-1">4 SWEEPS</span>
              </div>
              <div className="bg-[#0A0B0E] p-4 flex flex-col">
                <span className="text-slate-400 text-xs font-semibold tracking-wider uppercase">Work Orders Pending</span>
                <span className="text-xl font-bold text-amber-400 mt-1">{bookings.length} CARS</span>
              </div>
              <div className="bg-[#0A0B0E] p-4 flex flex-col">
                <span className="text-slate-400 text-xs font-semibold tracking-wider uppercase">Telemetry Protocol</span>
                <span className="text-xl font-bold text-cyan-400 mt-1">OBD_II_ENCRYPTED</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-white/10 bg-black/60 px-6 gap-6 text-xs overflow-x-auto">
              <button 
                onClick={() => setActiveTab('bays')}
                className={`py-3 flex items-center gap-2 uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'bays' 
                    ? 'border-[#FF5F1F] text-[#FF5F1F] font-bold' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Wrench size={14} /> Active Work Orders ({bookings.length})
              </button>
              <button 
                onClick={() => setActiveTab('dyno')}
                className={`py-3 flex items-center gap-2 uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'dyno' 
                    ? 'border-[#FF5F1F] text-[#FF5F1F] font-bold' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Gauge size={14} /> Dyno Telemetry Sweeps (4)
              </button>
              <button 
                onClick={() => setActiveTab('inventory')}
                className={`py-3 flex items-center gap-2 uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'inventory' 
                    ? 'border-[#FF5F1F] text-[#FF5F1F] font-bold' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Cpu size={14} /> Workshop Bay Fleet (5)
              </button>
              <button 
                onClick={() => setActiveTab('telemetry')}
                className={`py-3 flex items-center gap-2 uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'telemetry' 
                    ? 'border-[#FF5F1F] text-[#FF5F1F] font-bold' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Database size={14} /> Performance Parts Inventory (5)
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {activeTab === 'bays' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                    <span>LIVE QUEUED VEHICLE TICKETS</span>
                    <span className="text-[#FF5F1F]">CLICK TO ADVANCE STATUS IN REALTIME</span>
                  </div>
                  {bookings.map((booking) => (
                    <div 
                      key={booking.id} 
                      className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-[#FF5F1F]/40 transition-all"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white font-mono">{booking.ticketId}</span>
                          <span className="px-2 py-0.5 rounded text-xs font-semibold tracking-wider font-bold bg-[#FF5F1F]/15 text-[#FF5F1F] border border-[#FF5F1F]/30 uppercase">
                            {booking.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 font-sans mt-1">
                          <strong>{booking.customerName}</strong> — {booking.vehicleMake} {booking.vehicleModel}
                        </p>
                        <p className="text-xs font-semibold text-slate-300 font-mono mt-0.5">
                          Date: {booking.selectedDate} @ {booking.selectedTime} | Estimate: ${booking.priceEstimate}
                        </p>
                        {booking.notes && (
                          <p className="text-xs font-semibold tracking-wider text-zinc-400 italic mt-1 font-sans">
                            Notes: "{booking.notes}"
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={booking.status}
                          onChange={(e) => onUpdateStatus(booking.ticketId, e.target.value as TicketStatus)}
                          className="bg-neutral-900 border border-neutral-700 text-xs text-white rounded px-2.5 py-1.5 font-mono focus:border-[#FF5F1F] focus:outline-none cursor-pointer"
                        >
                          <option value="inspection">Inspection</option>
                          <option value="parts_ordered">Parts Ordered</option>
                          <option value="in_progress">In Progress</option>
                          <option value="quality_check">Quality Check</option>
                          <option value="ready">Ready for Pickup</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'dyno' && (
                <div className="space-y-3">
                  <div className="text-xs text-slate-400 mb-2">AWD CHASSIS DYNO TELEMETRY LOGS (CALIBRATION LAB)</div>
                  {dynoLogs.map((log) => (
                    <div key={log.id} className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{log.vehicle}</span>
                          <span className="text-xs font-semibold tracking-wider font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                            {log.torque}
                          </span>
                        </div>
                        <p className="text-base text-zinc-200 leading-relaxed font-sans mt-1">
                          Test: {log.runType} | Baseline: {log.baselineHp} BHP ➔ Tuned: <strong className="text-emerald-400">{log.tunedHp} BHP</strong>
                        </p>
                        <p className="text-xs font-semibold tracking-wider text-slate-300 font-mono mt-0.5">
                          Tuner: {log.tech} | Record: {log.id}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded uppercase">
                        {log.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'inventory' && (
                <div className="space-y-3">
                  <div className="text-xs text-slate-400 mb-2">WORKSHOP SERVICE BAY MONITOR</div>
                  {workshopBays.map((bay) => (
                    <div key={bay.id} className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <span className="font-bold text-white text-sm">{bay.name}</span>
                        <p className="text-base text-zinc-200 leading-relaxed font-sans mt-1">
                          Assigned Lead: {bay.tech} | Equipment: {bay.lift}
                        </p>
                        <p className="text-xs font-semibold tracking-wider text-slate-300 font-mono mt-0.5">
                          Current Vehicle: <strong className="text-slate-200">{bay.vehicle}</strong>
                        </p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-bold rounded uppercase border ${
                        bay.status === 'OPEN' 
                          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' 
                          : 'bg-[#FF5F1F]/15 text-[#FF5F1F] border-[#FF5F1F]/30'
                      }`}>
                        {bay.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'telemetry' && (
                <div className="space-y-3">
                  <div className="text-xs text-slate-400 mb-2">SUPPLIER SKU PERFORMANCE PARTS INVENTORY</div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-black/60 border-b border-white/10 text-slate-400 uppercase text-xs font-semibold tracking-wider">
                        <tr>
                          <th className="p-3">SKU</th>
                          <th className="p-3">Component Description</th>
                          <th className="p-3">Stock</th>
                          <th className="p-3">Unit Cost</th>
                          <th className="p-3">Wholesale Vendor</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {performanceParts.map((part) => (
                          <tr key={part.sku} className="hover:bg-white/5 transition-colors">
                            <td className="p-3 font-bold text-white">{part.sku}</td>
                            <td className="p-3 text-slate-300 font-sans">{part.name}</td>
                            <td className="p-3">
                              <span className={`font-bold ${part.stock <= part.reorder ? 'text-red-400' : 'text-emerald-400'}`}>
                                {part.stock} units
                              </span>
                            </td>
                            <td className="p-3 text-slate-200">{part.unitCost}</td>
                            <td className="p-3 text-slate-400 text-xs font-semibold">{part.supplier}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Status Ticker */}
            <div className="px-6 py-3 border-t border-white/10 bg-black/90 flex flex-wrap justify-between items-center text-xs font-semibold tracking-wider text-slate-300">
              <span className="flex items-center gap-2">
                <Radio size={12} className="text-[#FF5F1F] animate-pulse" />
                DATABASE LINK: SUPABASE_RLS_SECURED
              </span>
              <span>APEX TUNING OPERATING SYSTEM v1.0.0</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
