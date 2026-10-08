import React, { useState } from 'react';
import { usePrism } from '../context/PrismContext';
import { X, Calendar, Clock, Video, CheckCircle2, AlertTriangle, Sparkles, User, Wallet, FileText, Send } from 'lucide-react';

export const StudentDetailDrawer: React.FC = () => {
  const { 
    inspectStudentId, 
    setInspectStudentId, 
    counsellorStudents, 
    addAppointment,
    openDemoVideoRoom
  } = usePrism();

  const [bookingDate, setBookingDate] = useState('Tomorrow');
  const [bookingTime, setBookingTime] = useState('04:30 PM');
  const [bookingMode, setBookingMode] = useState<'Video Call' | 'In-Person Counselling' | 'Voice Session'>('Video Call');
  const [customNote, setCustomNote] = useState('');
  const [isBookedSuccess, setIsBookedSuccess] = useState(false);

  if (!inspectStudentId) return null;

  const targetStudent = counsellorStudents.find(s => s.id === inspectStudentId);
  if (!targetStudent) return null;

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    addAppointment({
      expertId: 'counsellor-kavitha',
      expertName: 'Dr. Kavitha Ramanathan (Counsellor)',
      expertRole: 'Senior STEAM Academic Advisor',
      date: bookingDate,
      time: bookingTime,
      mode: bookingMode,
      status: 'Upcoming',
      notes: customNote || `Intervention for ${targetStudent.name} (${targetStudent.status}): Address budget gap ₹${targetStudent.budgetGap}L & parental alignment.`
    });
    setIsBookedSuccess(true);
    setTimeout(() => {
      setIsBookedSuccess(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-[#070b19] border-l border-rose-950/60 h-full overflow-y-auto shadow-2xl flex flex-col p-6 text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-label="Counsellor Student Inspection Drawer"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-rose-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-950/80 border border-rose-800/80 flex items-center justify-center text-rose-400 font-extrabold text-base">
              {targetStudent.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-white">{targetStudent.name}</h2>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                  targetStudent.status === 'High Conflict'
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : targetStudent.status === 'Financial Risk'
                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                    : targetStudent.status === 'Needs Review'
                    ? 'bg-blue-950 text-blue-300 border border-blue-800'
                    : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}>
                  {targetStudent.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{targetStudent.classDegree} • {targetStudent.email}</p>
            </div>
          </div>
          <button
            onClick={() => setInspectStudentId(null)}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-6 space-y-6 flex-1">
          {/* PRISM Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-[#0d1222] rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase font-mono">PRISM Score</span>
              <span className="font-mono text-xl font-extrabold text-white block mt-0.5">
                {targetStudent.prismScore}/100
              </span>
            </div>
            <div className="p-3 bg-[#0d1222] rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase font-mono">Student Fit</span>
              <span className="font-mono text-xl font-extrabold text-emerald-400 block mt-0.5">
                {targetStudent.studentFit}%
              </span>
            </div>
            <div className="p-3 bg-[#0d1222] rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase font-mono">Financial Fit</span>
              <span className="font-mono text-xl font-extrabold text-rose-400 block mt-0.5">
                {targetStudent.financialFit}%
              </span>
            </div>
            <div className="p-3 bg-[#0d1222] rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase font-mono">Conflict Index</span>
              <span className="font-mono text-xl font-extrabold text-amber-400 block mt-0.5">
                {targetStudent.conflictIndex}/100
              </span>
            </div>
          </div>

          {/* Budget vs Degree Cost Breakdown */}
          <div className="p-4 rounded-2xl bg-[#090c18] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-white">
              <span className="flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5 text-rose-400" />
                <span>Financial Vector &amp; Budget Gap Analysis</span>
              </span>
              <span className={`font-mono text-[11px] ${targetStudent.budgetGap > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {targetStudent.budgetGap > 0 ? `Deficit: -₹${targetStudent.budgetGap}L` : 'Surplus: Fully Funded'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-[#050814] border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Annual Budget:</span>
                <strong className="text-white font-mono">₹{targetStudent.familyAnnualBudget}L/yr</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-[#050814] border border-slate-800">
                <span className="text-[10px] text-slate-400 block">4-Yr Capacity:</span>
                <strong className="text-white font-mono">₹{(targetStudent.familyAnnualBudget * 4).toFixed(1)}L</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-[#050814] border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Degree Cost:</span>
                <strong className="text-white font-mono">₹{targetStudent.targetDegreeCost}L</strong>
              </div>
            </div>
          </div>

          {/* Student Aspiration vs Parental Expectation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#090c18] border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-purple-400 font-bold uppercase block">Student Aspiration</span>
              <p className="font-semibold text-white">{targetStudent.studentAspiration}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#090c18] border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-rose-400 font-bold uppercase block">Parent Preference</span>
              <p className="font-semibold text-white">{targetStudent.parentTopPreference}</p>
            </div>
          </div>

          {/* AI Suggested Intervention Notes */}
          <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-900/50 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span>AI-Suggested Counsellor Intervention Strategy</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {targetStudent.aiInterventionNotes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">•</span>
                  <span className="leading-relaxed">{note}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Fast Session Booking Form */}
          <form onSubmit={handleBookSession} className="p-4 rounded-2xl bg-[#090c18] border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-rose-400" />
              <span>Schedule 1-on-1 Intervention Session</span>
            </h3>

            {isBookedSuccess && (
              <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in duration-150">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Session booked! Added to global Appointments schedule &amp; student notifications.</span>
              </div>
            )}

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Date</label>
                <select
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full p-2 rounded-lg bg-[#050814] border border-slate-700 text-xs text-white"
                >
                  <option value="Tomorrow">Tomorrow</option>
                  <option value="Thursday, March 12">Thursday, Mar 12</option>
                  <option value="Saturday, March 14">Saturday, Mar 14</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Time</label>
                <select
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full p-2 rounded-lg bg-[#050814] border border-slate-700 text-xs text-white"
                >
                  <option value="04:30 PM">04:30 PM</option>
                  <option value="05:30 PM">05:30 PM</option>
                  <option value="07:00 PM">07:00 PM</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Mode</label>
                <select
                  value={bookingMode}
                  onChange={(e) => setBookingMode(e.target.value as any)}
                  className="w-full p-2 rounded-lg bg-[#050814] border border-slate-700 text-xs text-white"
                >
                  <option value="Video Call">Video Call</option>
                  <option value="In-Person Counselling">In-Person</option>
                  <option value="Voice Session">Phone Call</option>
                </select>
              </div>
            </div>

            <textarea
              placeholder="Session agenda or specific parent concern note..."
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#050814] border border-slate-700 text-xs text-white placeholder:text-slate-500 h-16 resize-none focus:outline-none focus:border-rose-500"
            />

            <div className="flex items-center justify-between gap-3 pt-1">
              <button
                type="button"
                onClick={() => openDemoVideoRoom(`Intervention Session: ${targetStudent.name}`)}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#0d1222] hover:bg-[#141b33] border border-slate-700 text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Video className="w-3.5 h-3.5 text-rose-400" />
                <span>Simulate Video Call</span>
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-700 to-pink-600 hover:from-rose-600 hover:to-pink-500 shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirm Appointment</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
