import React, { useState } from 'react';
import { usePrism } from '../context/PrismContext';
import { EXPERTS } from '../data/mockData';
import { ExpertProfile } from '../types';
import { 
  Users, 
  Star, 
  Calendar, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  X,
  Info 
} from 'lucide-react';

export const ExpertDirectoryView: React.FC = () => {
  const { appointments, addAppointment, setActiveTab } = usePrism();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [bookingExpert, setBookingExpert] = useState<ExpertProfile | null>(null);

  // Booking Form State
  const [bookDate, setBookDate] = useState('2026-10-15');
  const [bookTime, setBookTime] = useState('04:30 PM');
  const [bookMode, setBookMode] = useState<'Video Call' | 'In-Person Counselling' | 'Voice Session'>('Video Call');
  const [bookNotes, setBookNotes] = useState('Discussion on AI/ML vs Computer Engineering with family.');
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const categories = ['All', 'Career Counsellor', 'Industry Mentor', 'Education Advisor', 'STEAM Mentor'];

  const filteredExperts = EXPERTS.filter(e => 
    selectedCategory === 'All' || e.category === selectedCategory
  );

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingExpert) return;

    addAppointment({
      expertId: bookingExpert.id,
      expertName: bookingExpert.name,
      expertRole: bookingExpert.role,
      date: bookDate,
      time: bookTime,
      mode: bookMode,
      status: 'Upcoming',
      notes: bookNotes
    });

    setBookedSuccess(true);
    setTimeout(() => {
      setBookedSuccess(false);
      setBookingExpert(null);
      setActiveTab('appointments');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-300 mb-1">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>Human Counsel In The Loop</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">Verified STEAM Advisors</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Expert Guidance & STEAM Mentorship
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Connect with seasoned academicians, hiring managers, and financial aid specialists to validate your PRISM recommendations.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('appointments')}
          className="px-4 py-2 text-xs font-semibold text-slate-200 bg-[#0d1222] border border-slate-800 rounded-xl hover:border-rose-800/80 hover:text-white transition-colors cursor-pointer"
        >
          My Appointments ({appointments.length})
        </button>
      </div>

      {/* Demo / Sample Mentor Profiles Banner */}
      <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 flex items-center justify-between text-xs text-amber-200/90 gap-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span><strong>Sample Demonstrator Notice:</strong> Mentor profiles and certified counsellor credentials are sample demo personas for hackathon demonstration. Video rooms and consultations are simulated.</span>
        </div>
        <span className="text-[11px] font-mono text-amber-400/80 shrink-0 hidden sm:inline">Demo System</span>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium ${
              selectedCategory === cat 
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold shadow-md shadow-rose-950/60' 
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Expert Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredExperts.map(expert => (
          <div 
            key={expert.id}
            className="p-6 bg-[#090c18] rounded-2xl border border-rose-950/40 hover:border-rose-500/60 shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-500 text-white font-bold text-base flex items-center justify-center shrink-0 shadow-md shadow-rose-950/40">
                    {expert.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-bold text-white">{expert.name}</h3>
                      {expert.verified && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-xs text-rose-300 font-medium">{expert.role}</p>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-400">
                        Demo Mentor
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-amber-400 font-mono text-xs font-bold shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{expert.rating}</span>
                  <span className="text-slate-400 font-normal">({expert.reviewsCount})</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {expert.bio}
              </p>

              {/* Specialization Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {expert.specialization.split(', ').map((spec: string) => (
                  <span key={spec} className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#0d1222] border border-slate-800 text-slate-300">
                    {spec}
                  </span>
                ))}
              </div>

              {/* Meta Stats Box */}
              <div className="p-3 bg-[#0d1222] rounded-xl border border-slate-800 space-y-1 text-xs mb-4">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Experience:</span>
                  <strong>{expert.experienceYears}+ Years in Industry / Academia</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Availability:</span>
                  <strong className="text-rose-300">{expert.availability}</strong>
                </div>
              </div>
            </div>

            {/* Action button */}
            <button
              onClick={() => setBookingExpert(expert)}
              className="w-full py-2.5 px-3 text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 rounded-xl shadow-md shadow-rose-950/60 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule 1-on-1 Consultation</span>
            </button>
          </div>
        ))}
      </div>

      {/* Booking Form Modal */}
      {bookingExpert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#090c18] rounded-2xl p-6 sm:p-8 shadow-2xl border border-rose-950/80 relative text-left">
            <button
              onClick={() => setBookingExpert(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {bookedSuccess ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-1">Appointment Confirmed!</h3>
                <p className="text-xs text-slate-300">Redirecting to your scheduled appointments...</p>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-4 text-xs">
                <div>
                  <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block mb-1">
                    Book Consultation Slot
                  </span>
                  <h3 className="text-xl font-bold text-white">{bookingExpert.name}</h3>
                  <p className="text-xs text-slate-400">{bookingExpert.role}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">Preferred Date</label>
                    <input 
                      type="date"
                      value={bookDate}
                      onChange={(e) => setBookDate(e.target.value)}
                      className="w-full p-2 border border-slate-800 rounded-xl bg-[#0d1222] text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">Select Time Slot</label>
                    <select
                      value={bookTime}
                      onChange={(e) => setBookTime(e.target.value)}
                      className="w-full p-2 border border-slate-800 rounded-xl bg-[#0d1222] text-white"
                    >
                      {['10:00 AM', '02:00 PM', '04:30 PM', '06:00 PM'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Meeting Mode</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Video Call', 'In-Person Counselling', 'Voice Session'].map(mode => (
                      <button
                        type="button"
                        key={mode}
                        onClick={() => setBookMode(mode as any)}
                        className={`p-2 rounded-xl text-center border transition-all ${
                          bookMode === mode 
                            ? 'bg-rose-950/80 border-rose-600 text-rose-200 font-bold' 
                            : 'bg-[#0d1222] border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Topic / Agenda for Discussion</label>
                  <textarea
                    rows={3}
                    value={bookNotes}
                    onChange={(e) => setBookNotes(e.target.value)}
                    placeholder="E.g. Validating AI/ML vs CSE; evaluating college tier options..."
                    className="w-full p-2.5 border border-slate-800 rounded-xl bg-[#0d1222] text-white placeholder-slate-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setBookingExpert(null)}
                    className="px-4 py-2 font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 font-bold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 rounded-xl shadow-md shadow-rose-950/60 cursor-pointer"
                  >
                    Confirm & Reserve Slot
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
