import React, { useState } from 'react';
import { usePrism } from '../context/PrismContext';
import { COUNSELLOR_STUDENTS } from '../data/mockData';
import { CounsellorStudentItem } from '../types';
import { 
  Users, 
  AlertTriangle, 
  Wallet, 
  Sparkles, 
  TrendingUp, 
  ShieldAlert, 
  Search, 
  ChevronRight, 
  CheckCircle2, 
  X, 
  Eye,
  GraduationCap,
  Calendar
} from 'lucide-react';

export const CounsellorDashboard: React.FC = () => {
  const { student, setStudent, setActiveTab } = usePrism();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentInspection, setSelectedStudentInspection] = useState<CounsellorStudentItem | null>(null);

  const filteredStudents = COUNSELLOR_STUDENTS.filter(s => {
    const matchesFilter = filterStatus === 'All' || s.status === filterStatus;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.topCareer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleInspectStudent = (std: CounsellorStudentItem) => {
    setSelectedStudentInspection(std);
  };

  const handleLoadStudentIntoWorkspace = (std: CounsellorStudentItem) => {
    setStudent(prev => ({
      ...prev,
      name: std.name,
      classDegree: std.classDegree,
    }));
    setSelectedStudentInspection(null);
    setActiveTab('home');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-300 mb-1">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>Counsellor & Institutional Command View</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">Cohort Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Student Guidance & Risk Triage
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Monitor students across parental alignment conflict, financial feasibility bottlenecks, and competitive STEAM readiness.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveTab('appointments')}
            className="px-4 py-2 text-xs font-semibold text-slate-200 bg-[#0d1222] border border-slate-800 rounded-xl hover:border-rose-800/80 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-rose-400" />
            <span>Manage Schedule</span>
          </button>
        </div>
      </div>

      {/* 4 Core Cohort Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="p-5 bg-[#090c18] rounded-2xl border border-rose-950/40 shadow-xl">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1">
            <span>Students Analysed</span>
            <Users className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-white tabular-nums">
            142
          </div>
          <span className="text-[11px] text-slate-400">Total active profiles</span>
        </div>

        <div className="p-5 bg-[#090c18] rounded-2xl border border-rose-900/60 shadow-xl">
          <div className="flex items-center justify-between text-xs font-semibold text-rose-300 mb-1">
            <span>High Conflict Cases</span>
            <ShieldAlert className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-rose-400 tabular-nums">
            18
          </div>
          <span className="text-[11px] text-rose-300 font-medium">Conflict Index &gt; 50/100</span>
        </div>

        <div className="p-5 bg-[#090c18] rounded-2xl border border-amber-900/60 shadow-xl">
          <div className="flex items-center justify-between text-xs font-semibold text-amber-300 mb-1">
            <span>Financial Risk Cases</span>
            <Wallet className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-amber-400 tabular-nums">
            12
          </div>
          <span className="text-[11px] text-amber-300 font-medium">Budget shortfall alerts</span>
        </div>

        <div className="p-5 bg-[#090c18] rounded-2xl border border-sky-900/60 shadow-xl">
          <div className="flex items-center justify-between text-xs font-semibold text-sky-300 mb-1">
            <span>Needing Guidance</span>
            <AlertTriangle className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-sky-400 tabular-nums">
            24
          </div>
          <span className="text-[11px] text-sky-300 font-medium">Pending 1-on-1 strategy</span>
        </div>

      </div>

      {/* Filter and Search Bar Deck */}
      <div className="bg-[#090c18] rounded-2xl border border-rose-950/40 p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search students or careers..."
            className="w-full bg-[#0d1222] border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500/80 focus:ring-1 focus:ring-rose-500/40 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs">
          {['All', 'Stable', 'High Conflict', 'Financial Risk', 'Needs Review'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-bold ${
                filterStatus === st 
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-950/60 ring-1 ring-rose-400/40' 
                  : 'bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800/80'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

      </div>

      {/* Student Table */}
      <div className="bg-[#090c18] rounded-2xl border border-rose-950/40 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0d1222] border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Top Career Recommendation</th>
                <th className="py-3.5 px-4 text-center">PRISM Score</th>
                <th className="py-3.5 px-4 text-center">Conflict Index</th>
                <th className="py-3.5 px-4 text-center">Financial Fit</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {filteredStudents.map(std => (
                <tr key={std.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <strong className="text-white font-semibold block">{std.name}</strong>
                    <span className="text-slate-400 text-[11px]">{std.classDegree}</span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-200">
                    {std.topCareer}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-rose-400 tabular-nums">
                    {std.prismScore}%
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-semibold tabular-nums">
                    <span className={std.conflictIndex > 50 ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                      {std.conflictIndex}/100
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-semibold text-emerald-400 tabular-nums">
                    {std.financialFit}%
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      std.status === 'Stable' ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800' :
                      std.status === 'High Conflict' ? 'bg-rose-950/80 text-rose-300 border-rose-800' :
                      std.status === 'Financial Risk' ? 'bg-amber-950/80 text-amber-300 border-amber-800' :
                      'bg-sky-950/80 text-sky-300 border-sky-800'
                    }`}>
                      {std.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleInspectStudent(std)}
                      className="px-3 py-1.5 text-xs font-semibold text-rose-300 bg-rose-950/50 hover:bg-rose-900/60 border border-rose-800/80 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Deep-Dive Inspection Modal */}
      {selectedStudentInspection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-[#090c18] rounded-2xl shadow-2xl border border-rose-950/80 p-6 sm:p-8">
            <button
              onClick={() => setSelectedStudentInspection(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block mb-1">
                Student Case Inspection
              </span>
              <h3 className="text-xl font-bold text-white">{selectedStudentInspection.name}</h3>
              <p className="text-xs text-slate-400">{selectedStudentInspection.classDegree} · Assessed {selectedStudentInspection.lastAssessed}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 p-3.5 bg-[#0d1222] rounded-xl border border-slate-800 text-center text-xs mb-4">
              <div>
                <span className="text-slate-400 block text-[11px]">Overall PRISM:</span>
                <strong className="font-mono text-base font-extrabold text-rose-400">{selectedStudentInspection.prismScore}%</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Conflict Index:</span>
                <strong className="font-mono text-base font-extrabold text-rose-400">{selectedStudentInspection.conflictIndex}/100</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Financial Fit:</span>
                <strong className="font-mono text-base font-extrabold text-emerald-400">{selectedStudentInspection.financialFit}%</strong>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300 mb-6">
              <p><strong className="text-white">Primary Recommended Trajectory:</strong> {selectedStudentInspection.topCareer}</p>
              <p><strong className="text-white">Counsellor Alert Status:</strong> {selectedStudentInspection.status}</p>
              <div className="p-3 bg-rose-950/40 rounded-xl border border-rose-900/60 text-slate-200">
                <strong className="text-rose-300">Diagnostic Note:</strong> {selectedStudentInspection.conflictIndex > 50 
                  ? 'Significant divergence detected between student preference and parental budget/tradition expectations. Immediate family mediation session recommended.'
                  : 'Profile demonstrates strong multi-vector alignment. Proceed with standardized milestone execution.'}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={() => setSelectedStudentInspection(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => handleLoadStudentIntoWorkspace(selectedStudentInspection)}
                className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 rounded-xl shadow-md shadow-rose-950/60 transition-colors cursor-pointer"
              >
                Load Into Active Workspace
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
