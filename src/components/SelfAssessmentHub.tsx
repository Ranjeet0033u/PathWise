import React, { useState } from 'react';
import { usePrism } from '../context/PrismContext';
import { INTEREST_QUESTIONS, APTITUDE_QUESTIONS } from '../data/assessmentQuestions';
import { 
  Brain, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  BarChart3, 
  Play, 
  RotateCcw, 
  X, 
  Check, 
  AlertCircle,
  Award,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

export const SelfAssessmentHub: React.FC = () => {
  const { 
    student, 
    assessmentState, 
    submitInterestAssessment, 
    submitAptitudeAssessment, 
    retakeAssessment, 
    setActiveTab, 
    language 
  } = usePrism();

  const isTamil = language === 'ta';

  // Active quiz runner state
  const [activeQuizType, setActiveQuizType] = useState<'interest' | 'aptitude' | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [tempAnswers, setTempAnswers] = useState<Record<string, number>>({});
  const [isCompletedModal, setIsCompletedModal] = useState<boolean>(false);
  const [lastCompletedScore, setLastCompletedScore] = useState<number>(0);

  // Start a specific test
  const handleStartQuiz = (type: 'interest' | 'aptitude') => {
    setActiveQuizType(type);
    setCurrentQuestionIndex(0);
    setTempAnswers({});
  };

  const currentQuestions = activeQuizType === 'interest' ? INTEREST_QUESTIONS : APTITUDE_QUESTIONS;
  const currentQ = currentQuestions[currentQuestionIndex];

  const handleSelectAnswer = (val: number) => {
    if (!currentQ) return;
    setTempAnswers(prev => ({
      ...prev,
      [currentQ.id]: val
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Finish quiz!
      if (activeQuizType === 'interest') {
        const values = Object.values(tempAnswers);
        const avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 4;
        const percent = Math.min(99, Math.max(65, Math.round((avg / 5) * 100)));
        submitInterestAssessment(tempAnswers);
        setLastCompletedScore(percent);
        setIsCompletedModal(true);
        setActiveQuizType(null);
      } else {
        // Aptitude scoring: check correct choices
        let correctCount = 0;
        APTITUDE_QUESTIONS.forEach(q => {
          if (tempAnswers[q.id] === q.correctIndex) {
            correctCount++;
          }
        });
        const percent = Math.round((correctCount / APTITUDE_QUESTIONS.length) * 100);
        submitAptitudeAssessment(tempAnswers, percent);
        setLastCompletedScore(percent);
        setIsCompletedModal(true);
        setActiveQuizType(null);
      }
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-300 mb-1">
            <Brain className="w-3.5 h-3.5 text-rose-400" />
            <span>Interactive Assessment Battery</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">Live Cognitive Calibration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Self-Assessment Hub &amp; Aptitude Diagnostics
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Complete the Interest Inventory and Aptitude Quiz to live-calibrate your PRISM SWOT profile, update Math/Logic metrics, and re-rank top careers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={retakeAssessment}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-[#0d1222] hover:bg-[#141b33] border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
            <span>Reset &amp; Retake Battery</span>
          </button>
        </div>
      </div>

      {/* Completion Banner */}
      {assessmentState.interestCompleted && assessmentState.aptitudeCompleted && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-[#090c18] to-slate-900 border border-emerald-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-700 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Full Battery Completed &amp; Grounded</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Cognitive Aptitude: <strong className="text-emerald-400 font-mono">{assessmentState.calculatedAptitudePercent}%</strong> • Domain Interest: <strong className="text-rose-400 font-mono">{assessmentState.calculatedInterestPercent}%</strong> • Last calibrated: {assessmentState.lastScoreDate || 'Today'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('swot')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>View SWOT &amp; Radar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Test Selection Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: STEAM Interest Inventory */}
        <div className="p-6 bg-[#090c18] rounded-2xl border border-rose-950/60 hover:border-rose-800/80 shadow-xl transition-all flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800/60 uppercase font-bold">
                Domain Preference
              </span>
              <span className="text-slate-400 flex items-center gap-1 font-mono text-[11px]">
                <Clock className="w-3 h-3" />
                12 Questions • ~6 mins
              </span>
            </div>

            <h3 className="text-lg font-extrabold text-white">
              STEAM Interest Inventory (12 Questions)
            </h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Measures passion across Software &amp; AI, Applied Robotics, Clean Energy, Computational Biology, FinTech, and Collaborative Innovation.
            </p>

            <div className="my-4 p-3.5 rounded-xl bg-[#050814] border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Diagnostic Status:</span>
                <span className={`font-mono font-bold ${assessmentState.interestCompleted ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {assessmentState.interestCompleted ? '✓ Completed (88% Passion Index)' : 'Pending Calibration'}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${assessmentState.interestCompleted ? 'bg-emerald-500' : 'bg-slate-700'}`}
                  style={{ width: assessmentState.interestCompleted ? '100%' : '0%' }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
            <span className="text-[11px] text-slate-500 font-mono">Likert 1–5 Scale</span>
            <button
              onClick={() => handleStartQuiz('interest')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-700 to-pink-600 hover:from-rose-600 hover:to-pink-500 shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{assessmentState.interestCompleted ? 'Retake Inventory' : 'Start Interest Inventory'}</span>
            </button>
          </div>
        </div>

        {/* Card 2: Cognitive Aptitude Quiz */}
        <div className="p-6 bg-[#090c18] rounded-2xl border border-rose-950/60 hover:border-rose-800/80 shadow-xl transition-all flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/60 uppercase font-bold">
                Cognitive Aptitude
              </span>
              <span className="text-slate-400 flex items-center gap-1 font-mono text-[11px]">
                <Clock className="w-3 h-3" />
                10 Questions • ~8 mins
              </span>
            </div>

            <h3 className="text-lg font-extrabold text-white">
              STEM &amp; Algorithmic Aptitude Quiz (10 Questions)
            </h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Objective timed logic problems evaluating Quantitative Series, Computational Complexity O(N log N), Deductive Logic, Spatial Cube rotations, and TNEA cutoff formulas.
            </p>

            <div className="my-4 p-3.5 rounded-xl bg-[#050814] border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Diagnostic Status:</span>
                <span className={`font-mono font-bold ${assessmentState.aptitudeCompleted ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {assessmentState.aptitudeCompleted ? '✓ Completed (91% Cognitive Aptitude)' : 'Pending Calibration'}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${assessmentState.aptitudeCompleted ? 'bg-purple-500' : 'bg-slate-700'}`}
                  style={{ width: assessmentState.aptitudeCompleted ? '100%' : '0%' }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
            <span className="text-[11px] text-slate-500 font-mono">Multiple Choice • Auto-Scored</span>
            <button
              onClick={() => handleStartQuiz('aptitude')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{assessmentState.aptitudeCompleted ? 'Retake Aptitude Quiz' : 'Start Aptitude Quiz'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* =========================================================================
          LIVE QUIZ RUNNER MODAL
         ========================================================================= */}
      {activeQuizType && currentQ && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div 
            className="w-full max-w-2xl bg-[#090c18] border border-rose-950/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100"
            role="dialog"
            aria-modal="true"
            aria-label="Running Assessment"
          >
            {/* Modal Top Bar */}
            <div className="px-6 py-4 bg-[#050814] border-b border-rose-950/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-rose-400 uppercase font-bold tracking-wider">
                  {activeQuizType === 'interest' ? 'STEAM INTEREST INVENTORY' : 'STEM APTITUDE DIAGNOSTIC'}
                </span>
                <h3 className="text-sm font-bold text-white">
                  Question {currentQuestionIndex + 1} of {currentQuestions.length}
                </h3>
              </div>
              <button
                onClick={() => setActiveQuizType(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-900 h-1.5">
              <div 
                className="bg-gradient-to-r from-rose-600 to-pink-500 h-1.5 transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
              />
            </div>

            {/* Question Body */}
            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-slate-500 uppercase">
                  Domain: {currentQ.domain}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  {currentQ.text}
                </h2>
                {currentQ.textTamil && (
                  <p className="text-xs text-rose-300/90 leading-relaxed font-sans">
                    {currentQ.textTamil}
                  </p>
                )}
              </div>

              {/* Interaction Type: Likert 1 to 5 for Interest, or MCQ Choices for Aptitude */}
              {activeQuizType === 'interest' ? (
                <div className="space-y-3 pt-2">
                  <span className="text-xs text-slate-400 block font-medium">Select your resonance:</span>
                  <div className="grid grid-cols-5 gap-2 text-center text-xs">
                    {[
                      { val: 1, label: 'Strongly Disagree', labelTamil: 'முற்றிலும் உடன்படவில்லை' },
                      { val: 2, label: 'Disagree', labelTamil: 'உடன்படவில்லை' },
                      { val: 3, label: 'Neutral', labelTamil: 'நடுநிலை' },
                      { val: 4, label: 'Agree', labelTamil: 'உடன்படுகிறேன்' },
                      { val: 5, label: 'Strongly Agree', labelTamil: 'முற்றிலும் உடன்படுகிறேன்' }
                    ].map(item => {
                      const isSelected = tempAnswers[currentQ.id] === item.val;
                      return (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => handleSelectAnswer(item.val)}
                          className={`p-3 rounded-xl border flex flex-col items-center justify-between min-h-[75px] transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-rose-950 border-rose-500 text-white shadow-md shadow-rose-950/80 ring-1 ring-rose-500'
                              : 'bg-[#0d1222] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-[#141b33]'
                          }`}
                        >
                          <span className="font-mono font-extrabold text-sm text-rose-400">{item.val}</span>
                          <span className="text-[10px] leading-tight block mt-1">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5 pt-2">
                  <span className="text-xs text-slate-400 block font-medium">Select the correct answer:</span>
                  {currentQ.options?.map((opt, idx) => {
                    const isSelected = tempAnswers[currentQ.id] === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectAnswer(idx)}
                        className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-purple-950/80 border-purple-500 text-white ring-1 ring-purple-500 shadow-md'
                            : 'bg-[#0d1222] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-[#141b33]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs flex items-center justify-center font-bold text-slate-400 shrink-0">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <div>
                            <span className="font-medium text-white">{opt.label}</span>
                            {opt.labelTamil && (
                              <span className="text-[11px] text-purple-300 block mt-0.5">{opt.labelTamil}</span>
                            )}
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-purple-400" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Bottom Controls */}
            <div className="px-6 py-4 bg-[#050814] border-t border-rose-950/40 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
              >
                Previous
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={tempAnswers[currentQ.id] === undefined}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-700 to-pink-600 hover:from-rose-600 hover:to-pink-500 shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
              >
                <span>{currentQuestionIndex === currentQuestions.length - 1 ? 'Submit & Calculate Score' : 'Next Question'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion Feedback Modal */}
      {isCompletedModal && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#090c18] border border-rose-950/80 rounded-3xl p-6 text-center shadow-2xl space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-700 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold block">
                DIAGNOSTIC COMPLETED &amp; RE-RANKED
              </span>
              <h3 className="text-xl font-extrabold text-white mt-1">
                Diagnostic Score: {lastCompletedScore}%
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Your PRISM multi-vector scores and top career alignments have been dynamically recalculated. Mathematical problem solving and analytical thinking traits are synchronized with the recommendations engine.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => { setIsCompletedModal(false); setActiveTab('explorer'); }}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-700 to-pink-600 hover:from-rose-600 hover:to-pink-500 shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>View Re-Ranked Careers (Explorer)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsCompletedModal(false)}
                className="w-full py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
              >
                Stay on Assessment Hub
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
