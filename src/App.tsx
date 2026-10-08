import React, { useState } from 'react';
import { PrismProvider, usePrism } from './context/PrismContext';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';
import { StudentOnboarding } from './components/StudentOnboarding';
import { StudentSwotView } from './components/StudentSwotView';
import { FamilyProfileView } from './components/FamilyProfileView';
import { AnalysisPipelineModal } from './components/AnalysisPipelineModal';
import { DashboardLayout } from './components/DashboardLayout';
import { MainDashboard } from './components/MainDashboard';
import { ParentDashboard } from './components/ParentDashboard';
import { CareerExplorer } from './components/CareerExplorer';
import { CareerDetailView } from './components/CareerDetailView';
import { FinancialFeasibilityView } from './components/FinancialFeasibilityView';
import { ConflictIndexView } from './components/ConflictIndexView';
import { MarketIntelligenceView } from './components/MarketIntelligenceView';
import { CareerRoadmapView } from './components/CareerRoadmapView';
import { ScholarshipDirectoryView } from './components/ScholarshipDirectoryView';
import { SelfAssessmentHub } from './components/SelfAssessmentHub';
import { ExpertDirectoryView } from './components/ExpertDirectoryView';
import { AppointmentsView } from './components/AppointmentsView';
import { HistoryView } from './components/HistoryView';
import { CounsellorDashboard } from './components/CounsellorDashboard';
import { ParentCourseRecommender } from './components/ParentCourseRecommender';
import { AskPrismDrawer } from './components/AskPrismDrawer';
import { ExplainableScoreDrawer } from './components/ExplainableScoreDrawer';
import { DemoVideoRoomModal } from './components/DemoVideoRoomModal';
import { FamilyConversationGuideModal } from './components/FamilyConversationGuideModal';
import { StudentDetailDrawer } from './components/StudentDetailDrawer';
import { CareerReportPrintModal } from './components/CareerReportPrintModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { CareerCompareView } from './components/CareerCompareView';

const AppContent: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    isAnalyzing, 
    setIsAnalyzing, 
    role, 
    runAnalysisPipeline, 
    authView, 
    setAuthView, 
    isViewingLanding, 
    setIsViewingLanding, 
    isAuthenticated, 
    currentUser, 
    logout,
    isOnboarding,
    setIsOnboarding
  } = usePrism();

  // Transition handlers
  const handleStartOnboarding = () => {
    setIsViewingLanding(false);
    if (isAuthenticated) {
      setIsOnboarding(true);
      setActiveTab('assessments');
    } else {
      setAuthView('signup');
    }
  };

  const handleOnboardingComplete = () => {
    setIsOnboarding(false);
    setActiveTab('swot');
  };

  const handleContinueToFamily = () => {
    setActiveTab('family-profile');
  };

  const handleSaveFamilyAndRunAnalysis = () => {
    runAnalysisPipeline('home');
  };

  const handlePipelineFinished = () => {
    setIsAnalyzing(false);
    setActiveTab('home');
  };

  const isInDashboard = !authView && !isViewingLanding && !isOnboarding;

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Navigation Bar - Only displayed on Landing, Auth, or Onboarding views */}
      {!isInDashboard && <Header />}

      {/* Main View Area */}
      <main className="flex-1">
        {/* Dedicated Auth Views */}
        {authView === 'login' && <LoginPage />}
        {authView === 'signup' && <SignUpPage />}
        {authView === 'forgot-password' && <ForgotPasswordPage />}

        {/* Regular App Views when not in an auth sub-page */}
        {!authView && (
          <>
            {isViewingLanding ? (
              <LandingPage onStartOnboarding={handleStartOnboarding} />
            ) : isOnboarding ? (
              <StudentOnboarding onComplete={handleOnboardingComplete} />
            ) : (
              <DashboardLayout>
                {activeTab === 'home' && role === 'student' && <MainDashboard />}
                {activeTab === 'home' && role === 'parent' && <ParentDashboard />}
                {activeTab === 'home' && role === 'counsellor' && <CounsellorDashboard />}
                
                {activeTab === 'swot' && (
                  <StudentSwotView onContinueToFamily={handleContinueToFamily} />
                )}
                {activeTab === 'family-profile' && (
                  <FamilyProfileView onSaveFamily={handleSaveFamilyAndRunAnalysis} />
                )}
                {activeTab === 'explorer' && <CareerExplorer />}
                {activeTab === 'career-detail' && <CareerDetailView />}
                {activeTab === 'financial' && <FinancialFeasibilityView />}
                {activeTab === 'conflict' && <ConflictIndexView />}
                {activeTab === 'market' && <MarketIntelligenceView />}
                {activeTab === 'pathway' && <CareerDetailView />}
                {activeTab === 'roadmap' && <CareerRoadmapView />}
                {activeTab === 'scholarships' && <ScholarshipDirectoryView />}
                {activeTab === 'assessments' && <SelfAssessmentHub />}
                {activeTab === 'experts' && <ExpertDirectoryView />}
                {activeTab === 'parent-preferences' && <ParentCourseRecommender />}
                {activeTab === 'appointments' && <AppointmentsView />}
                {activeTab === 'history' && <HistoryView />}
                {activeTab === 'counsellor' && <CounsellorDashboard />}
                {activeTab === 'caseload' && <CounsellorDashboard />}
                {activeTab === 'compare' && <CareerCompareView />}
              </DashboardLayout>
            )}
          </>
        )}
      </main>

      {/* Bottom Footer Bar - Only shown on Landing page */}
      {isViewingLanding && (
        <footer className="border-t border-rose-950/40 bg-[#050814] py-5 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center text-sm font-extrabold tracking-tight">
              <span className="text-white">Path</span>
              <span className="text-[#f43f5e]">Wise</span>
            </div>
            <span className="text-slate-600">·</span>
            <span>Student + Family + Market Multi-Vector STEAM Decision System</span>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-slate-400">
                  Signed in as <strong className="text-white">{currentUser?.name}</strong> ({role})
                </span>
                <span className="text-slate-700">·</span>
                <button
                  onClick={() => {
                    setIsViewingLanding(!isViewingLanding);
                    setAuthView(null);
                  }}
                  className="text-rose-400 hover:text-rose-300 font-semibold cursor-pointer transition-colors"
                >
                  {isViewingLanding ? '← Return to Dashboard' : 'View Landing Page'}
                </button>
                <span className="text-slate-700">·</span>
                <button
                  onClick={logout}
                  className="text-rose-500 hover:text-rose-400 font-medium cursor-pointer transition-colors"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsViewingLanding(true);
                    setAuthView(null);
                  }}
                  className="text-rose-400 hover:text-rose-300 font-semibold cursor-pointer transition-colors"
                >
                  Landing Page
                </button>
                <span className="text-slate-700">·</span>
                <button
                  onClick={() => {
                    setAuthView('login');
                    setIsViewingLanding(false);
                  }}
                  className="text-slate-300 hover:text-white font-medium cursor-pointer transition-colors"
                >
                  Log In
                </button>
                <span className="text-slate-700">·</span>
                <button
                  onClick={() => {
                    setAuthView('signup');
                    setIsViewingLanding(false);
                  }}
                  className="text-slate-300 hover:text-white font-medium cursor-pointer transition-colors"
                >
                  Create Account
                </button>
              </>
            )}
          </div>
        </div>
      </footer>
      )}

      {/* Animated Multi-Vector Pipeline Solver Modal */}
      {isAnalyzing && (
        <AnalysisPipelineModal onComplete={handlePipelineFinished} />
      )}

      {/* Floating Ask PRISM AI Assistant Drawer */}
      <AskPrismDrawer />

      {/* Global Interactive Modals & Drawers */}
      <ExplainableScoreDrawer />
      <DemoVideoRoomModal />
      <FamilyConversationGuideModal />
      <StudentDetailDrawer />
      <CareerReportPrintModal />
      <GlobalSearchModal />
    </div>
  );
};

export default function App() {
  return (
    <PrismProvider>
      <AppContent />
    </PrismProvider>
  );
}
