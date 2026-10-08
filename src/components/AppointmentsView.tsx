import React from 'react';
import { usePrism } from '../context/PrismContext';
import { 
  Calendar, 
  Clock, 
  Video, 
  CheckCircle2, 
  Plus, 
  PhoneCall, 
  Building 
} from 'lucide-react';

export const AppointmentsView: React.FC = () => {
  const { appointments, setActiveTab, openDemoVideoRoom } = usePrism();

  const upcoming = appointments.filter(a => a.status === 'Upcoming');
  const past = appointments.filter(a => a.status !== 'Upcoming');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-300 mb-1">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>Consultation Schedule</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">Parent-Student Consensus</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            My Counselling Appointments
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Track scheduled strategy sessions with senior academic mentors and admissions experts.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('experts')}
          className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 rounded-xl shadow-md shadow-rose-950/60 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Book New Consultation</span>
        </button>
      </div>

      {/* Upcoming Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Calendar className="w-4 h-4 text-rose-400" />
          <span>Upcoming Sessions ({upcoming.length})</span>
        </h3>

        {upcoming.length === 0 ? (
          <div className="p-8 bg-[#090c18] rounded-2xl border border-slate-800 text-center text-slate-400 text-xs">
            No upcoming appointments scheduled yet. Book a session with an expert to review your roadmap.
          </div>
        ) : (
          <div className="space-y-3">
            {upcoming.map(item => (
              <div 
                key={item.id}
                className="p-5 bg-[#090c18] rounded-2xl border border-rose-950/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 flex items-center justify-center shrink-0">
                    {item.mode === 'Video Call' ? <Video className="w-5 h-5" /> :
                     item.mode === 'Voice Session' ? <PhoneCall className="w-5 h-5" /> :
                     <Building className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-bold text-white">{item.expertName}</h4>
                      <span className="text-xs text-rose-300 font-medium">({item.expertRole})</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-950/80 text-rose-300 border border-rose-800">
                        {item.mode}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-rose-400" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-rose-400" />
                        {item.time}
                      </span>
                    </div>

                    {item.notes && (
                      <p className="text-xs text-slate-300 mt-2 bg-[#0d1222] p-2.5 rounded-xl border border-slate-800">
                        <strong className="text-rose-300">Agenda:</strong> {item.notes}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0 gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                    Confirmed
                  </span>
                  <button 
                    onClick={() => openDemoVideoRoom(item.expertName)}
                    className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Video className="w-3.5 h-3.5 text-rose-400" />
                    <span>Join Video Room →</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
