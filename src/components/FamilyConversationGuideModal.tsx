import React, { useState, useEffect } from 'react';
import { usePrism } from '../context/PrismContext';
import { Sparkles, MessageCircle, X, Share2, Check, Loader2, ShieldCheck, HeartHandshake, UserCheck, Languages } from 'lucide-react';

interface GuideData {
  mediationSummary: string;
  studentTalkingPoints: string[];
  parentReassurancePoints: string[];
}

export const FamilyConversationGuideModal: React.FC = () => {
  const { 
    isFamilyGuideOpen, 
    setIsFamilyGuideOpen, 
    student, 
    family, 
    selectedCareer, 
    overallMetrics, 
    language,
    setLanguage 
  } = usePrism();

  const [isLoading, setIsLoading] = useState(false);
  const [guideData, setGuideData] = useState<GuideData | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const isTamil = language === 'ta';

  const fetchGuide = async (lang: 'en' | 'ta') => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/family-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: student.name,
          careerTitle: selectedCareer.title,
          strainScore: overallMetrics.conflictIndex,
          familyContext: family,
          language: lang
        })
      });
      const json = await res.json();
      if (json.data) {
        setGuideData(json.data);
      }
    } catch (e) {
      console.error('Failed to load family conversation guide', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFamilyGuideOpen) {
      fetchGuide(language);
    }
  }, [isFamilyGuideOpen, language]);

  if (!isFamilyGuideOpen) return null;

  const handleShare = () => {
    if (!guideData) return;
    const shareText = `PathWise Family Conversation Guide for ${student.name} (${selectedCareer.title}):\n\nMediation Summary:\n${guideData.mediationSummary}\n\nStudent Talking Points:\n${guideData.studentTalkingPoints.map((p, i) => `${i+1}. ${p}`).join('\n')}\n\nParent Reassurance Points:\n${guideData.parentReassurancePoints.map((p, i) => `${i+1}. ${p}`).join('\n')}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl bg-[#090c18] border border-rose-950/70 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] text-slate-100 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Family Conversation Guide"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#050814] border-b border-rose-950/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-950/80 border border-rose-800/80 flex items-center justify-center text-rose-400 shadow-md shadow-rose-950/50">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800/60 uppercase font-bold">
                  {isTamil ? 'AI குடும்ப சமரச வழிகாட்டி' : 'AI Mediation Engine'}
                </span>
                <span className="text-xs text-slate-400">
                  Alignment Strain: <strong className="text-amber-400 font-mono">{overallMetrics.conflictIndex}/100</strong>
                </span>
              </div>
              <h2 className="text-base font-bold text-white mt-0.5">
                {isTamil ? 'குடும்ப உரையாடல் & சமரச வழிகாட்டி' : 'Family Conversation & Mediation Guide'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(isTamil ? 'en' : 'ta')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#0d1222] border border-slate-700 text-slate-200 hover:text-white transition-colors cursor-pointer"
              title="Toggle English / Tamil"
            >
              <Languages className="w-3.5 h-3.5 text-rose-400" />
              <span>{isTamil ? 'English' : 'தமிழ்'}</span>
            </button>

            <button
              onClick={() => setIsFamilyGuideOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {isLoading ? (
            <div className="py-16 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto" />
              <p className="text-xs text-slate-300 font-medium">
                {isTamil ? 'Gemini AI குடும்ப சமரச புள்ளிகளை உருவாக்குகிறது...' : 'Synthesizing neutral mediation points via Gemini Flash...'}
              </p>
            </div>
          ) : guideData ? (
            <>
              {/* Neutral Mediation Summary */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 to-slate-900 border border-rose-900/50 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                  <Sparkles className="w-4 h-4 text-rose-400" />
                  <span>{isTamil ? 'நடுநிலையான சமரச சுருக்கம் (Mediation Summary)' : 'Neutral Common Ground Synthesis'}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {guideData.mediationSummary}
                </p>
              </div>

              {/* Two columns: Student Talking Points & Parent Reassurance Points */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 3 Talking Points for Student */}
                <div className="p-5 rounded-2xl bg-[#090c18] border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      {isTamil ? 'மாணவருக்கான 3 முக்கிய கருத்துக்கள்' : '3 Talking Points for Student'}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {guideData.studentTalkingPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3 Reassurance Points for Parents */}
                <div className="p-5 rounded-2xl bg-[#090c18] border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                    <ShieldCheck className="w-4 h-4 text-rose-400" />
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      {isTamil ? 'பெற்றோருக்கான 3 உறுதிமொழிகள்' : '3 Reassurance Points for Parents'}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {guideData.parentReassurancePoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <span className="w-5 h-5 rounded-full bg-rose-950 border border-rose-800 text-rose-400 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-xs text-slate-400">
              {isTamil ? 'தகவல்கள் கிடைக்கவில்லை.' : 'Unable to generate conversation guide.'}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#050814] border-t border-rose-950/40 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] text-slate-400">
            {isTamil ? 'கலந்தாலோசிப்பிற்கு பின் குடும்ப பட்ஜெட் மற்றும் விருப்பங்களை புதுப்பிக்கலாம்.' : 'Use this guide during dinner or weekend family college discussions.'}
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              disabled={isLoading || !guideData}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-700 to-pink-600 hover:from-rose-600 hover:to-pink-500 shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isCopied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              <span>{isCopied ? (isTamil ? 'நகலெடுக்கப்பட்டது!' : 'Copied to Clipboard!') : (isTamil ? 'பெற்றோருடன் பகிர்க' : 'Share with Parent')}</span>
            </button>
            <button
              onClick={() => setIsFamilyGuideOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 transition-colors cursor-pointer"
            >
              {isTamil ? 'மூடுக' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
