import React from 'react';
import { usePrism } from '../context/PrismContext';
import { 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Scale, 
  HeartHandshake, 
  Lightbulb, 
  Users 
} from 'lucide-react';

export const ConflictIndexView: React.FC = () => {
  const { student, family, selectedCareer, setActiveTab } = usePrism();

  const conflictScore = selectedCareer.scores.conflictIndex; // e.g. 28
  const consensusScore = 100 - conflictScore; // e.g. 72

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-300 mb-1">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>Family Alignment Architecture</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">Parent–Student Consensus</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Parent–Student Alignment Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Bridging generational divides by objectively mapping student aspirations alongside parental stability and financial prerequisites.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('experts')}
          className="px-4 py-2.5 text-xs font-semibold text-rose-300 bg-rose-950/50 border border-rose-800/80 rounded-xl hover:bg-rose-900/60 transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-md shadow-rose-950/40"
        >
          <Users className="w-4 h-4 text-rose-400" />
          <span>Mediate with Counsellor</span>
        </button>
      </div>

      {/* Main Conflict Score Meter Card */}
      <div className="bg-[#090c18] rounded-2xl border border-rose-950/40 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-mono text-2xl font-extrabold ${
              conflictScore < 35 ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800' :
              conflictScore < 60 ? 'bg-amber-950/80 text-amber-400 border border-amber-800' :
              'bg-rose-950/80 text-rose-400 border border-rose-800'
            }`}>
              {conflictScore}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                ALIGNMENT STRAIN INDEX
              </div>
              <h3 className="text-lg font-extrabold text-white">
                {conflictScore < 35 ? 'Low Alignment Strain (High Family Concord)' :
                 conflictScore < 60 ? 'Moderate Generational Friction' :
                 'Elevated Career Dissonance'}
              </h3>
              <p className="text-xs text-slate-400">Scale: 0 (Total Concord) to 100 (Polarized Divergence) · Concordance: <strong className="text-rose-400 font-mono">{consensusScore}%</strong></p>
            </div>
          </div>

          <div className="w-full sm:w-64 space-y-1.5">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span className="text-emerald-400">Concord</span>
              <span className="text-rose-400">Divergence</span>
            </div>
            <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden relative">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  conflictScore < 35 ? 'bg-emerald-500' : conflictScore < 60 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${conflictScore}%` }}
              />
            </div>
          </div>

        </div>

        {/* Dual Preferences Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6">
          
          {/* Student Side */}
          <div className="p-5 bg-[#0d1222] rounded-xl border border-rose-950/60">
            <div className="flex items-center justify-between text-xs font-bold text-rose-300 mb-2">
              <span className="flex items-center gap-1.5">
                <span>🎓</span>
                <span>STUDENT ASPIRATION</span>
              </span>
              <span className="font-mono text-rose-400">{student.name || 'Arjun'}</span>
            </div>
            <div className="text-base font-extrabold text-white mb-2">
              {selectedCareer.title}
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>• Motivated by frontier deep tech, generative systems, and autonomy</li>
              <li>• Prefers agile, innovative product environments & hackathons</li>
              <li>• Aims for specialized Master&apos;s or high-impact tech role</li>
            </ul>
          </div>

          {/* Parent Side */}
          <div className="p-5 bg-[#0d1222] rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-400 mb-2">
              <span className="flex items-center gap-1.5">
                <span>👨‍👩‍👧</span>
                <span>PARENTAL EXPECTATION</span>
              </span>
              <span className="font-mono text-emerald-400">Family Vector</span>
            </div>
            <div className="text-base font-extrabold text-white mb-2">
              Core Engineering / Verified Campus Placements
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>• Values established corporate campus recruitment & long-term stability</li>
              <li>• Budget ceiling: ₹{family.annualBudgetLakhs} Lakhs / year capacity</li>
              <li>• Preference for colleges with high reputational safety & accredited credentials</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Synthesis: Common Ground vs Difference vs Suggested Compromise */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Common Ground */}
        <div className="p-5 bg-[#090c18] rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Common Ground</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
            <li>• Both parties agree on pursuing an accredited B.E. / B.Tech STEM degree.</li>
            <li>• Shared priority on securing strong campus recruitment in top technology corridors.</li>
            <li>• Agreement that mathematics & analytical foundations are primary competitive advantages.</li>
          </ul>
        </div>

        {/* Areas of Difference */}
        <div className="p-5 bg-[#090c18] rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase mb-3">
            <Scale className="w-4 h-4 text-amber-400" />
            <span>Areas of Difference</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
            <li>• Parents worry that hyper-niche degrees may limit broad campus hiring opportunities.</li>
            <li>• Student desires startup research exposure, while parents prefer established multinational employers.</li>
          </ul>
        </div>

        {/* Suggested Compromise */}
        <div className="p-5 bg-[#090c18] rounded-2xl border border-rose-950/60 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-300 uppercase mb-3">
            <Lightbulb className="w-4 h-4 text-rose-400" />
            <span>Suggested Compromise</span>
          </div>
          <p className="text-xs text-white font-semibold mb-2">
            “Pursue a core B.Tech Computer Science Engineering degree with an AI/ML Specialization Minor.”
          </p>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Protects parental stability by qualifying for all conventional campus placements while empowering high-demand specialization research.
          </p>
        </div>

      </div>

      {/* Action Banner */}
      <div className="p-6 bg-[#090c18] rounded-2xl border border-rose-950/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div>
          <h4 className="text-sm font-bold text-white">Explore Education Roadmap for this Compromise</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            View the verified milestone sequence that satisfies both student passion and parental security.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('roadmap')}
          className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 rounded-xl transition-all shadow-md shadow-rose-950/60 flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span>VIEW CONSENSUS ROADMAP</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
