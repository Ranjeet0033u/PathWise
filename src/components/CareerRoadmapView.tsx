import React, { useState } from 'react';
import { usePrism } from '../context/PrismContext';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  BookOpen, 
  Code, 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  ArrowRight, 
  Share2 
} from 'lucide-react';

export const CareerRoadmapView: React.FC = () => {
  const { selectedCareer, student, setActiveTab } = usePrism();

  const [milestones, setMilestones] = useState([
    {
      id: 'm-1',
      stage: 'NOW (Foundations)',
      title: 'Class 12 STEM & Entrance Exam Prep',
      duration: 'Present - May 2026',
      completed: true,
      action: 'Solidify Class 12 PCM scores (>85%) and prepare for JEE Main & TNEA counseling.',
      skills: ['Advanced Calculus', 'Mechanics', 'Electrochemistry', 'Python Foundations'],
      resources: ['NCERT STEM Masterbooks', 'JEE Main Question Archive', 'TNEA Rank Predictor']
    },
    {
      id: 'm-2',
      stage: 'EDUCATION (Years 1 - 2)',
      title: 'Undergraduate Engineering Foundations',
      duration: 'Year 1 & 2 of B.Tech',
      completed: false,
      action: 'Enroll in B.Tech Computer Science / AI-Data Specialization at Anna Univ / SSN / PSG Tech.',
      skills: ['Data Structures & Algorithms', 'Discrete Mathematics', 'Computer Architecture', 'Object-Oriented C++/Python'],
      resources: ['MIT OpenCourseWare 6.006', 'LeetCode Algorithmic Fundamentals', 'CS50 AI']
    },
    {
      id: 'm-3',
      stage: 'SKILL DEVELOPMENT (Year 2 - 3)',
      title: 'Deep Learning & Systems Mastery',
      duration: 'Semesters 3 to 5',
      completed: false,
      action: 'Master mathematical deep learning theory, tensor operations, and PyTorch architectures.',
      skills: ['PyTorch', 'Vectorized Linear Algebra', 'MLOps (Docker, MLflow)', 'SQL & BigQuery'],
      resources: ['Fast.ai Practical Deep Learning', 'DeepLearning.AI Specialization', 'PyTorch Documentation']
    },
    {
      id: 'm-4',
      stage: 'PROJECTS & RESEARCH (Year 3)',
      title: 'Public Open-Source AI Prototypes',
      duration: 'Semesters 5 & 6',
      completed: false,
      action: 'Build and deploy 3 production-grade open source projects on GitHub & Hugging Face Spaces.',
      skills: ['Full-Stack ML Deployment', 'API Development (FastAPI)', 'Model Fine-Tuning', 'Technical Writing'],
      resources: ['Hugging Face Hub', 'Kaggle Competition Tier', 'GitHub Developer Portfolio']
    },
    {
      id: 'm-5',
      stage: 'EXPERIENCE & INTERNSHIP (Year 3 - 4)',
      title: 'Industrial AI/ML Engineering Internship',
      duration: 'Summer before Final Year',
      completed: false,
      action: 'Target 8-12 week funded software engineering / data internship in Bengaluru, Hyderabad, or Chennai.',
      skills: ['Enterprise Git Flow', 'Model Monitoring', 'Cross-Functional Collaboration', 'System Optimization'],
      resources: ['Internshala STEAM Top 500', 'LinkedIn Tech Recruiter Network', 'AngelList Wellfound']
    },
    {
      id: 'm-6',
      stage: 'PLACEMENT & CAREER LAUNCH (Final Year)',
      title: 'Full-Time Campus Placement & Off-Campus Drives',
      duration: 'Semesters 7 & 8',
      completed: false,
      action: 'Convert PPO or crack Day 1 tier-1 recruiter interviews (Target CTC: ₹12L - ₹20L).',
      skills: ['System Design Interviews', 'Coding Speed Optimization', 'Behavioural & Leadership Matrix'],
      resources: ['PRISM Mock Interview AI', 'NeetCode 150', 'Past Campus Placement Papers']
    }
  ]);

  const toggleMilestone = (id: string) => {
    setMilestones(prev => prev.map(m => m.id === id ? { ...m, completed: !m.completed } : m));
  };

  const completedCount = milestones.filter(m => m.completed).length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-300 mb-1">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>Execution Timeline</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-white font-bold">{selectedCareer.title}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Personalized STEAM Career Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            A milestone-by-milestone bridge connecting where you stand today to your target industry career.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-4 bg-[#090c18] p-3.5 rounded-2xl border border-rose-950/40 shadow-xl">
          <div className="text-right">
            <span className="font-mono text-xl font-bold text-rose-400 tabular-nums">
              {completedCount} of {milestones.length}
            </span>
            <span className="text-[11px] text-slate-400 block">Milestones Done</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-950/80 border border-rose-800/80 flex items-center justify-center font-bold text-rose-300 text-xs">
            {Math.round((completedCount / milestones.length) * 100)}%
          </div>
        </div>
      </div>

      {/* Visual Timeline Path */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-rose-950">
        
        {milestones.map((m) => (
          <div key={m.id} className="relative group">
            
            {/* Timeline Circle Bullet */}
            <button
              onClick={() => toggleMilestone(m.id)}
              className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                m.completed 
                  ? 'border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-950/60' 
                  : 'border-slate-700 bg-[#090c18] text-slate-500 hover:border-rose-500 hover:text-rose-400'
              }`}
              title="Toggle milestone completion"
            >
              {m.completed ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-3.5 h-3.5" />}
            </button>

            {/* Card Content */}
            <div className={`p-5 rounded-2xl border transition-all ${
              m.completed 
                ? 'bg-[#090c18] border-emerald-800/80' 
                : 'bg-[#090c18] border-rose-950/40 hover:border-rose-500/60 shadow-xl'
            }`}>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider font-mono">
                    {m.stage}
                  </span>
                  {m.completed && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                      COMPLETED
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{m.duration}</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-white mb-2">
                {m.title}
              </h3>

              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                {m.action}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1.5 flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-rose-400" />
                    <span>Skills Acquired:</span>
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {m.skills.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded bg-[#0d1222] border border-slate-800 text-slate-300 text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                    <span>Recommended Curated Resources:</span>
                  </span>
                  <ul className="space-y-0.5 text-slate-300 text-[11px]">
                    {m.resources.map(r => (
                      <li key={r}>• {r}</li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};
