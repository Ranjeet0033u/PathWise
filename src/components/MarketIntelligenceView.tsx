import React, { useState } from 'react';
import { usePrism } from '../context/PrismContext';
import { REGIONAL_MARKET_HUBS } from '../data/mockData';
import { 
  TrendingUp, 
  MapPin, 
  ShieldAlert, 
  Briefcase, 
  Sparkles, 
  DollarSign, 
  BarChart3, 
  Building, 
  Compass 
} from 'lucide-react';

export const MarketIntelligenceView: React.FC = () => {
  const { selectedCareer, careers, setSelectedCareerId } = usePrism();
  const [selectedCity, setSelectedCity] = useState<string>('Chennai');

  const activeHub = REGIONAL_MARKET_HUBS.find(h => h.city === selectedCity) || REGIONAL_MARKET_HUBS[1];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-300 mb-1">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>Market Vector Intelligence</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">2026–2030 STEAM Projections</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Macro Demand & Geographic STEAM Corridors
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Live calibration of recruitment velocity, salary compensation curves, and regional innovation hubs across India.
          </p>
        </div>

        {/* Selected Career Filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium shrink-0">Focus Career:</span>
          <select
            value={selectedCareer.id}
            onChange={(e) => setSelectedCareerId(e.target.value)}
            className="px-3 py-1.5 border border-slate-800 rounded-xl bg-[#0d1222] text-xs font-semibold text-slate-200 focus:outline-none focus:border-rose-500 cursor-pointer"
          >
            {careers.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Top Market Macro Stat Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-[#090c18] rounded-2xl border border-rose-950/40 shadow-xl">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1">
            <span>Hiring Velocity</span>
            <Briefcase className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{selectedCareer.hiringVelocity}</div>
          <span className="text-[11px] text-emerald-400 font-medium">+34% 5-Yr Growth</span>
        </div>

        <div className="p-4 bg-[#090c18] rounded-2xl border border-rose-950/40 shadow-xl">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1">
            <span>Starting Compensation</span>
            <TrendingUp className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-rose-400">{selectedCareer.salaryRange.split(' - ')[0]}</div>
          <span className="text-[11px] text-slate-400">Fresher Baseline (Tier 1/2)</span>
        </div>

        <div className="p-4 bg-[#090c18] rounded-2xl border border-rose-950/40 shadow-xl">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1">
            <span>Senior Trajectory</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-emerald-400">{selectedCareer.salaryRange.split(' - ')[1] || '₹24 LPA'}</div>
          <span className="text-[11px] text-slate-400">At 4-6 Years Tenure</span>
        </div>

        <div className="p-4 bg-[#090c18] rounded-2xl border border-rose-950/40 shadow-xl">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1">
            <span>Automation Risk</span>
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">Low Risk</div>
          <span className="text-[11px] text-emerald-400">High Complex Reasoning</span>
        </div>
      </div>

      {/* Simplified India Map & Regional Demand Section */}
      <div className="bg-[#090c18] rounded-2xl border border-rose-950/40 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Where Your Skills Are in Demand</span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">
              Regional STEAM Innovation Corridors
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Click any regional cluster to inspect local hiring telemetry
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Visual SVG Map of India (Schematic with interactive nodes) */}
          <div className="lg:col-span-6 bg-[#0d1222] rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-center relative min-h-[360px]">
            <svg 
              className="w-full max-w-[340px] h-auto drop-shadow-sm" 
              viewBox="0 0 400 480" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Simplified India Outline Path */}
              <path
                d="M170 30 C 190 20, 220 25, 230 45 C 240 65, 260 70, 270 90 C 285 110, 310 130, 320 160 C 330 190, 340 210, 320 230 C 300 240, 280 250, 260 260 C 240 290, 220 340, 200 390 C 190 410, 185 440, 180 460 C 170 440, 150 380, 140 330 C 130 280, 110 240, 100 210 C 90 180, 80 160, 100 130 C 120 100, 130 80, 150 50 Z"
                className="fill-rose-950/20 stroke-rose-900/40"
                strokeWidth="2.5"
                strokeDasharray="4 4"
              />

              {/* Delhi NCR Node */}
              <g 
                onClick={() => setSelectedCity('Delhi NCR')} 
                className="cursor-pointer group"
              >
                <circle cx="185" cy="140" r={selectedCity === 'Delhi NCR' ? "12" : "8"} className={`${selectedCity === 'Delhi NCR' ? 'fill-rose-500' : 'fill-rose-400/60'} group-hover:scale-125 transition-all`} />
                <circle cx="185" cy="140" r="18" className="stroke-rose-400/40 fill-none animate-ping" />
                <text x="205" y="144" className="text-[12px] font-bold fill-slate-200 font-sans">Delhi NCR</text>
              </g>

              {/* Pune Node */}
              <g 
                onClick={() => setSelectedCity('Pune')} 
                className="cursor-pointer group"
              >
                <circle cx="155" cy="270" r={selectedCity === 'Pune' ? "12" : "8"} className={`${selectedCity === 'Pune' ? 'fill-rose-500' : 'fill-rose-400/60'} group-hover:scale-125 transition-all`} />
                <text x="85" y="274" className="text-[12px] font-bold fill-slate-200 font-sans">Pune</text>
              </g>

              {/* Hyderabad Node */}
              <g 
                onClick={() => setSelectedCity('Hyderabad')} 
                className="cursor-pointer group"
              >
                <circle cx="205" cy="290" r={selectedCity === 'Hyderabad' ? "12" : "8"} className={`${selectedCity === 'Hyderabad' ? 'fill-rose-500' : 'fill-rose-400/60'} group-hover:scale-125 transition-all`} />
                <text x="225" y="294" className="text-[12px] font-bold fill-slate-200 font-sans">Hyderabad</text>
              </g>

              {/* Bengaluru Node */}
              <g 
                onClick={() => setSelectedCity('Bengaluru')} 
                className="cursor-pointer group"
              >
                <circle cx="180" cy="350" r={selectedCity === 'Bengaluru' ? "14" : "10"} className={`${selectedCity === 'Bengaluru' ? 'fill-rose-500' : 'fill-rose-400/60'} group-hover:scale-125 transition-all`} />
                <circle cx="180" cy="350" r="22" className="stroke-rose-400/40 fill-none animate-ping" />
                <text x="75" y="354" className="text-[12px] font-bold fill-rose-300 font-sans">Bengaluru (Hub)</text>
              </g>

              {/* Chennai Node (Arjun's Home) */}
              <g 
                onClick={() => setSelectedCity('Chennai')} 
                className="cursor-pointer group"
              >
                <circle cx="215" cy="365" r={selectedCity === 'Chennai' ? "14" : "10"} className={`${selectedCity === 'Chennai' ? 'fill-sky-500' : 'fill-sky-400/60'} group-hover:scale-125 transition-all`} />
                <text x="235" y="370" className="text-[12px] font-bold fill-sky-300 font-sans">Chennai (Home)</text>
              </g>
            </svg>

            <div className="text-[11px] text-slate-400 mt-2 text-center">
              Selected Corridor: <strong className="text-white">{selectedCity}</strong>
            </div>
          </div>

          {/* Regional Hub Deep-Dive Telemetry */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 bg-[#0d1222] rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-rose-400" />
                  <h4 className="text-base font-bold text-white">{activeHub.city} Innovation Ecosystem</h4>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-950/80 text-rose-300 border border-rose-800">
                  {activeHub.demand} Demand ({activeHub.score}/100)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                <div className="p-3 bg-[#090c18] rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Primary STEAM Focus:</span>
                  <strong className="text-white font-semibold">{activeHub.topFocus}</strong>
                </div>
                <div className="p-3 bg-[#090c18] rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Average Starting Salary:</span>
                  <strong className="font-mono text-emerald-400 font-bold">{activeHub.avgStartingSalary}</strong>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <span className="font-semibold text-slate-300 block text-[11px]">Active Opportunities:</span>
                <div className="p-2.5 rounded-lg bg-[#090c18] border border-slate-800 text-rose-300 font-semibold font-mono text-xs">
                  {activeHub.activePostings}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
