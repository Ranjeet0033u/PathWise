import React, { useMemo } from 'react';
import { usePrism } from '../context/PrismContext';
import { Search, X, Briefcase, Award, GraduationCap, ChevronRight, Sparkles } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { 
    isGlobalSearchOpen, 
    setIsGlobalSearchOpen, 
    searchQuery, 
    setSearchQuery, 
    careers, 
    scholarships, 
    setSelectedCareerId, 
    setActiveTab 
  } = usePrism();

  if (!isGlobalSearchOpen) return null;

  const queryClean = (searchQuery || '').trim().toLowerCase();

  const filteredCareers = useMemo(() => {
    if (!queryClean) return careers.slice(0, 4);
    return careers.filter(c => 
      c.title.toLowerCase().includes(queryClean) ||
      c.category.toLowerCase().includes(queryClean) ||
      c.requiredSkills.some(s => s.toLowerCase().includes(queryClean)) ||
      c.description.toLowerCase().includes(queryClean)
    );
  }, [careers, queryClean]);

  const filteredScholarships = useMemo(() => {
    if (!queryClean) return scholarships.slice(0, 3);
    return scholarships.filter(s => 
      s.name.toLowerCase().includes(queryClean) ||
      s.provider.toLowerCase().includes(queryClean) ||
      s.state.toLowerCase().includes(queryClean) ||
      s.category.toLowerCase().includes(queryClean)
    );
  }, [scholarships, queryClean]);

  const handleSelectCareer = (id: string) => {
    setSelectedCareerId(id);
    setActiveTab('career-detail');
    setIsGlobalSearchOpen(false);
  };

  const handleSelectScholarship = () => {
    setActiveTab('scholarships');
    setIsGlobalSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-[#090c18] border border-rose-950/70 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-label="PathWise Global Search"
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 bg-[#050814] border-b border-rose-950/40 flex items-center gap-3">
          <Search className="w-5 h-5 text-rose-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search STEAM careers, skills (Python, Math), scholarships, or TNEA cutoffs..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsGlobalSearchOpen(false)}
            className="text-xs text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 font-bold"
          >
            Esc
          </button>
        </div>

        {/* Search Results */}
        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-6">
          {/* Quick Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-600 dark:text-slate-500 text-[11px] font-mono font-bold">Quick filters:</span>
            {['AI / ML', 'Robotics', 'Python', 'Scholarship', 'TNEA', 'Cybersecurity'].map(chip => (
              <button
                key={chip}
                onClick={() => setSearchQuery(chip)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#0d1222] hover:bg-slate-200 dark:hover:bg-[#141b33] border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-[11px] font-bold transition-colors cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Careers Section */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-rose-400" />
              <span>Matched Careers ({filteredCareers.length})</span>
            </h3>
            {filteredCareers.length === 0 ? (
              <p className="text-xs text-slate-500 py-2">No matching careers found.</p>
            ) : (
              <div className="space-y-2">
                {filteredCareers.map(c => (
                  <div
                    key={c.id}
                    onClick={() => handleSelectCareer(c.id)}
                    className="p-3 rounded-xl bg-[#0d1222] hover:bg-[#141b33] border border-slate-800 hover:border-rose-900/80 flex items-center justify-between transition-colors cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-rose-300 transition-colors">
                          {c.title}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/60">
                          {c.matchScore}% Match
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                        CTC: {c.salaryRange} • Velocity: {c.hiringVelocity}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Scholarships Section */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>Matched Scholarships ({filteredScholarships.length})</span>
            </h3>
            {filteredScholarships.length === 0 ? (
              <p className="text-xs text-slate-500 py-2">No matching scholarships found.</p>
            ) : (
              <div className="space-y-2">
                {filteredScholarships.map(s => (
                  <div
                    key={s.id}
                    onClick={handleSelectScholarship}
                    className="p-3 rounded-xl bg-[#0d1222] hover:bg-[#141b33] border border-slate-800 hover:border-emerald-800 flex items-center justify-between transition-colors cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {s.name}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                          {s.state}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                        Benefit: {s.maxBenefit} • Deadline: {s.deadline}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#050814] border-t border-rose-950/40 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Search across PRISM careers, skills, scholarships and government quotas.</span>
          <span className="font-mono text-slate-400">PathWise Search v2</span>
        </div>
      </div>
    </div>
  );
};
