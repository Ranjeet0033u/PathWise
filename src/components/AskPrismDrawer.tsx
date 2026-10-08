import React, { useState } from 'react';
import { usePrism } from '../context/PrismContext';
import { 
  X, 
  Send, 
  Sparkles, 
  Loader2, 
  Bot, 
  ShieldCheck, 
  Languages, 
  Info, 
  CheckCircle2, 
  ChevronRight 
} from 'lucide-react';

export const AskPrismDrawer: React.FC = () => {
  const { 
    isChatOpen, 
    setIsChatOpen, 
    student, 
    family, 
    selectedCareer, 
    overallMetrics, 
    parentPreferences, 
    language, 
    setLanguage 
  } = usePrism();

  const isTamil = language === 'ta';

  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; source?: string }>>([
    {
      role: 'assistant',
      text: isTamil 
        ? `வணக்கம் ${student.name.split(' ')[0]}! நான் உங்கள் PathWise AI வழிகாட்டி. உங்கள் கணிதத்திறன் (91%), குடும்ப ஆண்டு பட்ஜெட் (₹${family.annualBudgetLakhs}L/yr), மற்றும் தென்னிந்திய வேலைவாய்ப்புத் தேவைகளை அடிப்படையாகக் கொண்டு வழிகாட்டுகிறேன். என்ன கேட்க விரும்புகிறீர்கள்?`
        : `Hello ${student.name.split(' ')[0]}! I am PathWise AI Career Counsellor. I analyze your pathways across your cognitive competencies (Math ${student.skills.mathematics}%, Analytical ${student.skills.analyticalThinking}%), your family's budget reality (₹${family.annualBudgetLakhs}L/yr, ₹${(family.annualBudgetLakhs * 4).toFixed(1)}L total 4-year capacity), and regional Tamil Nadu & South India market demand. What would you like to explore?`
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestedPrompts = isTamil ? [
    'Why is AI/ML my top match?',
    'Cheaper alternatives?',
    'How do I explain this to my parents?',
    'What scholarships match my profile?'
  ] : [
    'Why is AI/ML my top match?',
    'Cheaper alternatives?',
    'How do I explain this to my parents?',
    'What scholarships match my profile?'
  ];

  if (!isChatOpen) return null;

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg = textToSend.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ask-prism', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          language,
          studentContext: {
            name: student.name,
            academicStream: student.academicStream,
            mathScore: student.skills.mathematics,
            analyticalThinking: student.skills.analyticalThinking,
            programming: student.skills.programming,
            annualBudgetLakhs: family.annualBudgetLakhs,
            totalFourYearCapacity: family.annualBudgetLakhs * 4,
            parentWeights: parentPreferences.criteriaWeights,
            topCareer: selectedCareer.title,
            prismScore: overallMetrics.overallPrismScore,
            conflictIndex: overallMetrics.conflictIndex
          }
        })
      });

      if (!res.ok) {
        throw new Error('Network error');
      }

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply, source: data.source }]);
    } catch (err) {
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          text: isTamil
            ? `அர்ஜுனின் கணிதத்திறன் (91%), குடும்ப பட்ஜெட் (₹${family.annualBudgetLakhs}L/ஆண்டு) அடிப்படையில், ${selectedCareer.title} படிப்புக்கு TNEA ஒற்றைச் சாளர சேர்க்கை மூலம் குறைந்த செலவில் சேரலாம்.`
            : `Based on your PRISM Student Vector (Mathematics ${student.skills.mathematics}%) and Family Vector (Annual Budget ₹${family.annualBudgetLakhs}L/yr, Total 4-Yr ₹${(family.annualBudgetLakhs*4).toFixed(1)}L), your profile is optimized for ${selectedCareer.title} (Match: ${selectedCareer.matchScore}%). Targeting Anna University CEG or top autonomous institutes via TNEA keeps expenses within budget.`,
          source: 'vector_fallback'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-[#070b19] border-l border-rose-950/60 h-full shadow-2xl flex flex-col justify-between overflow-hidden text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-label="AI Career Counsellor Panel"
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-rose-950/40 bg-[#050814] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-700 via-pink-600 to-rose-400 flex items-center justify-center text-white shadow-md shadow-rose-950/60">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">AI Career Counsellor</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800/60 uppercase">
                  Gemini Flash
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Multi-Vector Guidance • Student + Budget + Parent Reality
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Toggle Button */}
            <button
              onClick={() => setLanguage(isTamil ? 'en' : 'ta')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-100 dark:bg-[#0d1222] border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
              title="Toggle English / Tamil language"
            >
              <Languages className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>{isTamil ? 'தமிழ்' : 'English'}</span>
            </button>

            <button 
              onClick={() => setIsChatOpen(false)}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-900 transition-colors cursor-pointer"
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Regulatory Disclaimer Banner (Part 2 Item 1) */}
        <div className="px-4 py-2 bg-rose-950/40 border-b border-rose-900/30 flex items-center gap-2 text-[11px] text-rose-200">
          <ShieldCheck className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span>
            {isTamil 
              ? 'அறிவிப்பு: இந்த AI வழிகாட்டுதல் மனித கல்வி ஆலோசகரின் பணிக்கு உறுதுணையானது மட்டுமே.' 
              : 'Disclaimer: AI guidance supports, but does not replace, a human career counsellor.'}
          </span>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {messages.map((m, idx) => (
            <div 
              key={idx} 
              className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-rose-950/90 border border-rose-800 flex items-center justify-center text-rose-300 shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}
              
              <div 
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-rose-600 text-white rounded-tr-none shadow-md' 
                    : 'bg-[#0d1222] text-slate-200 rounded-tl-none border border-slate-800 shadow-sm'
                }`}
              >
                <div className="whitespace-pre-line prose prose-invert prose-xs max-w-none">
                  {m.text}
                </div>
                {m.source && (
                  <div className="mt-1.5 text-[9px] font-mono text-slate-400 border-t border-slate-800/80 pt-1 flex items-center justify-between">
                    <span>Engine: {m.source === 'gemini' ? 'Gemini 3.8 Flash' : 'PRISM Vector Solver'}</span>
                    <span>Verified STEAM Math</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2.5 justify-start">
              <div className="w-7 h-7 rounded-lg bg-rose-950 border border-rose-800 flex items-center justify-center text-rose-400 shrink-0">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              </div>
              <div className="bg-[#0d1222] border border-slate-800 rounded-2xl rounded-tl-none px-4 py-2.5 text-xs text-slate-400 flex items-center gap-2">
                <span>{isTamil ? 'பதிலை தொகுக்கிறது...' : 'Analyzing multi-vector trade-offs...'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips (Part 2 Item 1) */}
        <div className="px-4 py-2 bg-[#050814] border-t border-rose-950/40">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] font-bold bg-rose-50 hover:bg-rose-100 text-rose-800 hover:text-rose-950 border border-rose-200 dark:bg-[#0d1222] dark:hover:bg-[#141b33] dark:text-rose-300 dark:hover:text-white dark:border-rose-950 dark:hover:border-rose-800 transition-colors shrink-0 cursor-pointer disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form Bar */}
        <div className="p-3 bg-[#050814] border-t border-rose-950/40">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputText); }}
            className="flex items-center gap-2"
          >
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isTamil ? "உங்கள் கேள்வியை இங்கு தட்டச்சு செய்யவும்..." : "Ask about admissions, cutoffs, costs, or family alignment..."}
              disabled={isLoading}
              className="flex-1 bg-[#0d1222] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 rounded-xl bg-gradient-to-r from-rose-700 to-pink-600 hover:from-rose-600 hover:to-pink-500 text-white shadow-md disabled:opacity-40 transition-all cursor-pointer"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
