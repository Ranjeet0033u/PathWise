import React, { useState } from 'react';
import { usePrism } from '../context/PrismContext';
import { ENTRANCE_EXAMS } from '../data/mockData';
import { 
  GraduationCap, 
  Search, 
  Award, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Coins,
  Filter,
  CheckSquare,
  Square,
  Clock,
  ShieldCheck,
  Info
} from 'lucide-react';

export const ScholarshipDirectoryView: React.FC = () => {
  const { scholarships, toggleScholarshipDoc, student } = usePrism();
  const [activeTabSub, setActiveTabSub] = useState<'scholarships' | 'exams'>('scholarships');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Matcher Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedIncomeBand, setSelectedIncomeBand] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');

  const filteredScholarships = scholarships.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.eligibility.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory || s.category === 'All';
    const matchesIncome = selectedIncomeBand === 'All' || s.incomeBand === selectedIncomeBand || s.incomeBand === 'Any Income';
    const matchesState = selectedState === 'All' || s.state === selectedState;

    return matchesSearch && matchesCategory && matchesIncome && matchesState;
  });

  const filteredExams = ENTRANCE_EXAMS.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.conductingBody.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.targetCareers.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-300 mb-1">
            <Award className="w-3.5 h-3.5 text-rose-400" />
            <span>Scholarship Matcher &amp; Gateway Directory</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">Financial Burden Mitigation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Scholarship Matcher &amp; Entrance Portals
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Filter funding by community category, family income band, and domicile state. Complete document checklists to secure fee waivers.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2">
          <div className="p-1 bg-slate-100 dark:bg-[#090c18] border border-slate-300 dark:border-slate-800 rounded-xl flex text-xs font-semibold">
            <button
              onClick={() => setActiveTabSub('scholarships')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTabSub === 'scholarships' 
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold shadow-md shadow-rose-950/60' 
                  : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Scholarships ({scholarships.length})
            </button>
            <button
              onClick={() => setActiveTabSub('exams')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTabSub === 'exams' 
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold shadow-md shadow-rose-950/60' 
                  : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Entrance Exams ({ENTRANCE_EXAMS.length})
            </button>
          </div>
        </div>
      </div>

      {/* Indicative Legal Disclaimer Banner (Part 1 Item 6) */}
      <div className="p-3 bg-[#0d1222] border border-slate-800 rounded-xl flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-rose-400 shrink-0" />
          <span>
            <strong>Indicative Notice:</strong> All grant amounts, cut-offs, and eligibility criteria are indicative estimates. Always verify on official state / central admissions portals.
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-400 shrink-0">Last updated: March 2026</span>
      </div>

      {/* Filter Controls Bar */}
      {activeTabSub === 'scholarships' && (
        <div className="p-4 bg-[#090c18] rounded-2xl border border-rose-950/40 space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search scholarship name, provider, or criteria..."
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-800 rounded-xl bg-[#050814] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 rounded-xl bg-[#050814] border border-slate-800 text-xs text-white focus:outline-none focus:border-rose-500 w-full sm:w-auto"
            >
              <option value="All">All Categories</option>
              <option value="General">General Category</option>
              <option value="BC/MBC">BC / MBC / DNC</option>
              <option value="SC/ST">SC / ST Welfare</option>
              <option value="Women in STEAM">Women in STEAM</option>
            </select>

            {/* Income Band Filter */}
            <select
              value={selectedIncomeBand}
              onChange={(e) => setSelectedIncomeBand(e.target.value)}
              className="p-2 rounded-xl bg-[#050814] border border-slate-800 text-xs text-white focus:outline-none focus:border-rose-500 w-full sm:w-auto"
            >
              <option value="All">All Income Bands</option>
              <option value="< ₹2.5 LPA">&lt; ₹2.5 LPA</option>
              <option value="₹2.5L – ₹6 LPA">₹2.5L – ₹6 LPA</option>
              <option value="Any Income">Any Income</option>
            </select>

            {/* Domicile State Filter */}
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="p-2 rounded-xl bg-[#050814] border border-slate-800 text-xs text-white focus:outline-none focus:border-rose-500 w-full sm:w-auto"
            >
              <option value="All">All States</option>
              <option value="Tamil Nadu">Tamil Nadu Focus</option>
              <option value="All-India / Central">All-India / Central</option>
            </select>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
            <span>Showing {filteredScholarships.length} of {scholarships.length} matched schemes</span>
            <span>Check off required documents to track application readiness</span>
          </div>
        </div>
      )}

      {/* Scholarships List */}
      {activeTabSub === 'scholarships' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in duration-150">
          {filteredScholarships.length === 0 ? (
            <div className="col-span-2 p-12 text-center rounded-2xl bg-[#090c18] border border-slate-800 space-y-2">
              <p className="text-xs text-slate-400">No scholarships match the selected filters.</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSelectedIncomeBand('All'); setSelectedState('All'); setSearchQuery(''); }}
                className="text-xs text-rose-400 hover:underline font-bold"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            filteredScholarships.map(sch => {
              const checkedCount = sch.documentsChecklist.filter(d => d.checked).length;
              const totalDocs = sch.documentsChecklist.length;
              const docsReady = checkedCount === totalDocs;

              return (
                <div key={sch.id} className="p-5 bg-[#090c18] rounded-2xl border border-rose-950/40 hover:border-rose-800/80 transition-all shadow-xl flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="text-[10px] font-semibold text-rose-400 uppercase tracking-wider block mb-0.5 font-mono">
                          {sch.provider}
                        </span>
                        <h3 className="text-base font-bold text-white leading-tight">
                          {sch.name}
                        </h3>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase shrink-0 ${
                        sch.matchGrade === 'Direct Match' 
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                          : sch.matchGrade === 'Eligible'
                          ? 'bg-blue-950/80 text-blue-300 border border-blue-800'
                          : 'bg-amber-950/80 text-amber-300 border border-amber-800'
                      }`}>
                        {sch.matchGrade}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {sch.eligibility}
                    </p>

                    <div className="p-3 bg-[#0d1222] rounded-xl space-y-2 text-xs border border-slate-800 mb-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Financial Aid Benefit:</span>
                        <strong className="text-emerald-400 font-mono text-sm">{sch.maxBenefit}</strong>
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-400 flex items-center gap-1 font-mono">
                          <Calendar className="w-3 h-3 text-rose-400" />
                          Deadline: {sch.deadline}
                        </span>
                        <span className="font-mono text-slate-400">{sch.state} • {sch.incomeBand}</span>
                      </div>
                    </div>

                    {/* Checkable Documents Checklist (Part 2 Item 7) */}
                    <div className="p-3 bg-[#050814] rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-300 flex items-center gap-1.5">
                          <CheckSquare className="w-3.5 h-3.5 text-rose-400" />
                          <span>Documents Checklist ({checkedCount}/{totalDocs} Ready)</span>
                        </span>
                        <span className={`text-[10px] font-mono ${docsReady ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {docsReady ? '✓ All Prepared' : 'Documents Pending'}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {sch.documentsChecklist.map(doc => (
                          <div 
                            key={doc.id}
                            onClick={() => toggleScholarshipDoc(sch.id, doc.id)}
                            className="flex items-center gap-2 text-xs text-slate-300 hover:text-white cursor-pointer select-none"
                          >
                            <span className={`w-3.5 h-3.5 rounded flex items-center justify-center font-bold text-[9px] shrink-0 ${doc.checked ? 'bg-emerald-600 text-white' : 'border border-slate-600'}`}>
                              {doc.checked ? '✓' : ''}
                            </span>
                            <span className={doc.checked ? 'line-through text-slate-500' : ''}>
                              {doc.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-500 font-mono">
                      Apply via official TN / National Portal
                    </span>
                    <button
                      onClick={() => alert(`Redirecting to verified portal for ${sch.name}. Keep your ${sch.documentsChecklist[0]?.name || 'documents'} ready.`)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 hover:text-slate-900 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Entrance Exams List */}
      {activeTabSub === 'exams' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in duration-150">
          {filteredExams.map(ex => (
            <div key={ex.id} className="p-5 bg-[#090c18] rounded-2xl border border-rose-950/40 shadow-xl flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider block mb-0.5 font-mono">
                      {ex.conductingBody}
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {ex.name}
                    </h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                    ex.difficulty === 'Very High' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {ex.difficulty} Difficulty
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {ex.eligibility}
                </p>

                <div className="p-3 bg-[#0d1222] rounded-xl space-y-1.5 text-xs border border-slate-800 mb-3">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-400 flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3 text-rose-400" />
                      Registration Window: {ex.deadline}
                    </span>
                  </div>
                  <div className="pt-1 border-t border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Fee Impact:</span>
                    <strong className="text-white font-mono text-[11px]">{ex.tuitionImpact}</strong>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-500 font-mono">
                  State / National Gateway
                </span>
                <button
                  onClick={() => alert(`Exam details for ${ex.name}: Syllabus & counseling schedule available on conducting portal.`)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 hover:text-slate-900 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Syllabus &amp; Portals</span>
                  <ExternalLink className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
