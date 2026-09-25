import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Cpu, 
  ShieldCheck, 
  ChevronRight, 
  Calendar,
  Activity,
  Phone
} from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  shopName?: string;
  onOpenAdmin: () => void;
}

export default function Navbar({ onNavigate, activeSection, shopName, onOpenAdmin }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'services', label: 'Capabilities' },
    { id: 'booking', label: 'Scheduler' },
    { id: 'tracker', label: 'Live Telemetry' },
    { id: 'pricing', label: 'Packages' },
    { id: 'reviews', label: 'Proof' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#0A0B0E]/90 backdrop-blur-xl transition-all">
      {/* Top Telemetry Strip */}
      <div className="hidden md:flex border-b border-white/[0.05] bg-black/40 px-6 py-1.5 justify-between items-center text-xs font-semibold tracking-wider font-mono tracking-widest text-zinc-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE STATION: <strong className="text-emerald-400 font-bold">2 SERVICE BAYS OPEN</strong>
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400">
            CHASSIS DYNO: <strong className="text-white">AWD READY</strong>
          </span>
        </div>
        <div className="flex items-center gap-4 text-zinc-400">
          <span className="flex items-center gap-1 text-zinc-300">
            <ShieldCheck size={11} className="text-accent-orange" />
            <span>OEM CERTIFIED DIAGNOSTICS</span>
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-accent-orange font-bold">LOS ANGELES, CA</span>
        </div>
      </div>

      {/* Main Luxury Navigation Bar */}
      <div className="mx-auto flex max-w-7xl h-18 md:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Mark */}
        <div 
          onClick={() => handleNavClick('home')} 
          className="flex cursor-pointer items-center space-x-3 group"
          id="nav-logo"
        >
          {/* Futuristic Badge Emblem */}
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-neutral-900 to-black border border-white/10 group-hover:border-accent-orange/50 transition-all shadow-lg shadow-black/60">
            <Cpu className="h-5 w-5 text-accent-orange group-hover:scale-110 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-orange"></span>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5 font-display text-lg sm:text-xl font-black tracking-wider text-white">
              <span>{shopName ? shopName.split(' ')[0] : 'APEX'}</span>
              <span className="text-accent-orange font-light tracking-normal">//</span>
              <span className="text-zinc-400 font-semibold tracking-wide">
                {shopName && shopName.split(' ').length > 1 ? shopName.split(' ').slice(1).join(' ') : 'TUNING'}
              </span>
            </div>
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-zinc-300 font-medium">
              Precision Dyno Lab
            </span>
          </div>
        </div>

        {/* Center: Clean Modern Nav Links */}
        <nav className="hidden lg:flex items-center space-x-1 p-1 bg-white/[0.03] border border-white/[0.06] rounded-full backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-full font-mono text-xs font-semibold font-medium tracking-wider uppercase transition-all relative cursor-pointer ${
                  isActive 
                    ? 'text-white bg-white/10 shadow-sm' 
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="navPill"
                    className="absolute inset-0 rounded-full border border-accent-orange/40 bg-accent-orange/5"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: High-Ticket CTAs */}
        <div className="hidden md:flex items-center space-x-3 font-mono text-xs">
          {/* Admin Door Trigger */}
          <button
            onClick={onOpenAdmin}
            className="group px-3.5 py-2.5 rounded-lg border border-accent-orange/30 bg-accent-orange/[0.06] hover:bg-accent-orange/[0.15] hover:border-accent-orange/60 text-accent-orange text-base font-semibold min-h-[44px] font-semibold tracking-wider font-bold tracking-widest uppercase transition-all flex items-center gap-2 cursor-pointer shadow-sm shadow-accent-orange/5"
          >
            <span className="w-1.5 h-1.5 bg-accent-orange rounded-full animate-ping" />
            <span>[ WORKSHOP PASS ]</span>
          </button>
          
          {/* Main High-Conversion Booking Button */}
          <button
            onClick={() => handleNavClick('booking')}
            className="relative group overflow-hidden rounded-lg bg-gradient-to-r from-accent-orange via-orange-500 to-amber-500 px-5 py-2.5 text-center font-display text-xs font-bold uppercase tracking-wider text-black hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-accent-orange/20 cursor-pointer"
            id="nav-cta"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span>Book Bay</span>
              <ChevronRight size={13} className="stroke-[3px] group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>
        </div>

        {/* Mobile Header Right */}
        <div className="flex md:hidden items-center space-x-2.5">
          <button
            onClick={onOpenAdmin}
            className="px-2.5 py-1.5 rounded border border-accent-orange/40 bg-accent-orange/10 text-accent-orange font-mono text-[9px] font-bold uppercase tracking-wider flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 bg-accent-orange rounded-full animate-ping" />
            PASS
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-neutral-900 text-zinc-300 hover:text-white active:scale-95 transition-all cursor-pointer"
            aria-label="Toggle navigation menu"
            id="mobile-menu-trigger"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-neutral-900 bg-[#0A0B0E]/98 backdrop-blur-2xl px-6 py-6"
          >
            {/* Live Station Banner Mobile */}
            <div className="mb-4 flex items-center justify-between p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 font-mono text-xs font-semibold tracking-wider">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                2 Service Bays Open
              </span>
              <span className="text-zinc-300 uppercase">AWD Dyno Ready</span>
            </div>

            <div className="flex flex-col space-y-2 font-mono text-xs">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`py-3 px-4 rounded-lg text-left uppercase tracking-wider font-semibold transition-colors flex items-center justify-between ${
                    activeSection === item.id 
                      ? 'bg-accent-orange/10 text-accent-orange border border-accent-orange/30' 
                      : 'text-zinc-300 hover:bg-neutral-900/50'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight size={14} className="text-zinc-600" />
                </button>
              ))}

              <div className="pt-4 space-y-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full rounded-lg border border-accent-orange/40 bg-accent-orange/10 py-3 font-mono text-xs font-bold uppercase tracking-wider text-accent-orange flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 bg-accent-orange rounded-full animate-ping" />
                  [ WORKSHOP PASSKEY DEMO ]
                </button>

                <button
                  onClick={() => handleNavClick('booking')}
                  className="w-full rounded-lg bg-gradient-to-r from-accent-orange via-orange-500 to-amber-500 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-black shadow-lg shadow-accent-orange/20 cursor-pointer"
                >
                  Book Appointment Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
