import React, { useState } from 'react';
import { usePrism } from '../context/PrismContext';
import { Video, Mic, MicOff, VideoOff, PhoneOff, Users, MessageSquare, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const DemoVideoRoomModal: React.FC = () => {
  const { isDemoVideoRoomOpen, setIsDemoVideoRoomOpen, activeDemoVideoExpert } = usePrism();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isJoined, setIsJoined] = useState(false);

  if (!isDemoVideoRoomOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl bg-[#090c18] border border-rose-950/70 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-label="Demo Video Consultation Room"
      >
        {/* Top Bar */}
        <div className="px-6 py-4 bg-[#050814] border-b border-rose-950/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>PRISM Secure Tele-Counselling Suite</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/60 uppercase">
                  Simulated Demo
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                1-on-1 Certified STEAM Guidance Session with {activeDemoVideoExpert}
              </p>
            </div>
          </div>
          <button
            onClick={() => { setIsDemoVideoRoomOpen(false); setIsJoined(false); }}
            className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
          >
            Leave Room
          </button>
        </div>

        {/* Video Area */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          {/* Expert Tile */}
          <div className="relative rounded-2xl bg-[#0d1222] border border-slate-800 min-h-[220px] flex flex-col justify-between p-4 overflow-hidden shadow-inner">
            <div className="flex items-center justify-between text-xs text-slate-400 z-10">
              <span className="flex items-center gap-1.5 font-semibold text-rose-300">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>Certified STEAM Counsellor</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800">
                Online (Live)
              </span>
            </div>

            <div className="text-center my-auto z-10">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-900 to-pink-600 border-2 border-rose-400 flex items-center justify-center mx-auto text-xl font-extrabold text-white shadow-xl shadow-rose-950/80 mb-2">
                {activeDemoVideoExpert.split(' ').slice(-1)[0][0] || 'E'}
              </div>
              <h4 className="font-bold text-white text-sm">{activeDemoVideoExpert}</h4>
              <p className="text-[11px] text-slate-400">Senior Academic Director, Chennai Tech Cluster</p>
              {isJoined && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 text-xs text-emerald-300 border border-slate-700 animate-pulse">
                  <span>“Reviewing Arjun&apos;s TNEA Cutoff &amp; AI Pathways...”</span>
                </div>
              )}
            </div>

            <div className="text-[10px] text-slate-500 font-mono z-10">
              HD Video • 1080p • 256-bit Encrypted
            </div>
          </div>

          {/* Student Tile */}
          <div className="relative rounded-2xl bg-[#0d1222] border border-slate-800 min-h-[220px] flex flex-col justify-between p-4 overflow-hidden shadow-inner">
            <div className="flex items-center justify-between text-xs text-slate-400 z-10">
              <span className="font-semibold text-white">Arjun Swaminathan (You)</span>
              <span className="text-[10px] text-slate-400">Grade 12 Student</span>
            </div>

            <div className="text-center my-auto z-10">
              {isVideoOn ? (
                <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center mx-auto text-xl font-extrabold text-white mb-2">
                  AS
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-600 mb-2">
                  <VideoOff className="w-8 h-8" />
                </div>
              )}
              <h4 className="font-bold text-white text-sm">Arjun Swaminathan</h4>
              <p className="text-[11px] text-slate-400">PCM + CS • Tamil Nadu</p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 z-10">
              <span>Mic: {isMicOn ? 'Active' : 'Muted'}</span>
              <span>Camera: {isVideoOn ? 'Active' : 'Off'}</span>
            </div>
          </div>
        </div>

        {/* Demo Notice Banner */}
        <div className="px-6 py-3 bg-rose-950/40 border-t border-b border-rose-900/40 flex items-center gap-3 text-xs text-rose-200">
          <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0" />
          <span>
            <strong>Hackathon Demo Note:</strong> This simulates a live WebRTC tele-counselling video room where Indian parents and students review the PRISM alignment score with certified counsellors.
          </span>
        </div>

        {/* Bottom Control Bar */}
        <div className="px-6 py-4 bg-[#050814] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                isMicOn 
                  ? 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-white' 
                  : 'bg-rose-950/80 border-rose-800 text-rose-300'
              }`}
            >
              {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              <span>{isMicOn ? 'Mute' : 'Unmute'}</span>
            </button>

            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                isVideoOn 
                  ? 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-white' 
                  : 'bg-rose-950/80 border-rose-800 text-rose-300'
              }`}
            >
              {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              <span>{isVideoOn ? 'Stop Camera' : 'Start Camera'}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {!isJoined ? (
              <button
                onClick={() => setIsJoined(true)}
                className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
              >
                Join Consultation (Simulated)
              </button>
            ) : (
              <button
                onClick={() => { setIsJoined(false); setIsDemoVideoRoomOpen(false); }}
                className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-950/50 transition-all flex items-center gap-2 cursor-pointer"
              >
                <PhoneOff className="w-4 h-4" />
                <span>End Consultation</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
