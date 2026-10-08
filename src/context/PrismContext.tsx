import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { 
  UserRole, 
  NavigationTab, 
  StudentProfile, 
  FamilyProfile, 
  CareerOption, 
  Appointment,
  AuthUser,
  AuthViewMode,
  ParentCoursePreference,
  ParentCriteriaWeights,
  CourseRecommendationScore,
  LanguageMode,
  ThemeMode,
  RoadmapMilestone,
  EnhancedScholarship,
  AssessmentState,
  ScoreExplanationData
} from '../types';
import { 
  DEFAULT_STUDENT, 
  DEFAULT_FAMILY, 
  CAREER_DATABASE, 
  INITIAL_APPOINTMENTS,
  INITIAL_PARENT_PREFERENCES,
  BASE_COURSES_CATALOG
} from '../data/mockData';
import { INITIAL_SCHOLARSHIPS } from '../data/scholarshipsData';
import { INITIAL_ROADMAP_MILESTONES } from '../data/roadmapData';
import { COUNSELLOR_STUDENTS, DetailedCounsellorStudent } from '../data/counsellorData';

const STORAGE_KEY = 'PATHWISE_PRISM_V3_STATE';

interface PrismMetrics {
  overallPrismScore: number;
  studentFit: number;
  financialFit: number;
  marketAlignment: number;
  conflictIndex: number;
  skillReadiness: number;
  geographicOpportunity: number;
}

export interface AppNotification {
  id: string;
  title: string;
  detail: string;
  time: string;
  read: boolean;
  type: 'budget' | 'assessment' | 'appointment' | 'scholarship';
}

interface PrismContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  language: LanguageMode;
  setLanguage: (lang: LanguageMode) => void;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  student: StudentProfile;
  setStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;
  family: FamilyProfile;
  setFamily: React.Dispatch<React.SetStateAction<FamilyProfile>>;
  annualBudgetLakhs: number;
  totalFourYearBudget: number;
  updateAnnualBudget: (amount: number) => void;
  careers: CareerOption[];
  selectedCareerId: string;
  setSelectedCareerId: (id: string) => void;
  selectedCareer: CareerOption;
  overallMetrics: PrismMetrics;
  appointments: Appointment[];
  addAppointment: (newApt: Omit<Appointment, 'id'>) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (val: boolean) => void;
  runAnalysisPipeline: (targetTab?: NavigationTab) => void;
  loadDemoProfile: () => void;
  isChatOpen: boolean;
  setIsChatOpen: (val: boolean) => void;
  historyLog: {
    id: string;
    action: string;
    timestamp: string;
    detail: string;
  }[];
  parentPreferences: ParentCoursePreference;
  setParentPreferences: React.Dispatch<React.SetStateAction<ParentCoursePreference>>;
  updateParentWeight: (key: keyof ParentCriteriaWeights, val: number) => void;
  courseRecommendationScores: CourseRecommendationScore[];
  
  // New Single Source of Truth additions
  assessmentState: AssessmentState;
  submitInterestAssessment: (answers: Record<string, number>) => void;
  submitAptitudeAssessment: (answers: Record<string, number>, percentScore: number) => void;
  retakeAssessment: () => void;
  
  scholarships: EnhancedScholarship[];
  toggleScholarshipDoc: (scholarshipId: string, docId: string) => void;
  
  roadmapMilestones: RoadmapMilestone[];
  toggleMilestone: (milestoneId: string) => void;
  roadmapProgressPercent: number;

  compareCareerIds: string[];
  toggleCompareCareer: (careerId: string) => void;
  clearCompareCareers: () => void;

  counsellorStudents: DetailedCounsellorStudent[];
  inspectStudentId: string | null;
  setInspectStudentId: (id: string | null) => void;

  explainScoreData: ScoreExplanationData | null;
  openExplainScore: (data: ScoreExplanationData) => void;
  closeExplainScore: () => void;

  isDemoVideoRoomOpen: boolean;
  setIsDemoVideoRoomOpen: (val: boolean) => void;
  activeDemoVideoExpert: string;
  openDemoVideoRoom: (expertName: string) => void;

  isFamilyGuideOpen: boolean;
  setIsFamilyGuideOpen: (val: boolean) => void;

  isReportPrintOpen: boolean;
  setIsReportPrintOpen: (val: boolean) => void;

  isGlobalSearchOpen: boolean;
  setIsGlobalSearchOpen: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  notifications: AppNotification[];
  markNotificationsAsRead: () => void;

  // Authentication State & Handlers
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  authView: AuthViewMode | null;
  setAuthView: (view: AuthViewMode | null) => void;
  isViewingLanding: boolean;
  setIsViewingLanding: (val: boolean) => void;
  isOnboarding: boolean;
  setIsOnboarding: (val: boolean) => void;
  login: (emailOrUsername: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<void>;
  loginDemo: (targetRole: UserRole) => void;
  signup: (userData: { name: string; email: string; mobile: string; password: string; role: UserRole }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const PrismContext = createContext<PrismContextType | undefined>(undefined);

export const PrismProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved state or default
  const savedState = useMemo(() => {
    try {
      const item = localStorage.getItem(STORAGE_KEY);
      if (item) {
        return JSON.parse(item);
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
    return null;
  }, []);

  const [role, setRoleState] = useState<UserRole>(savedState?.role || 'student');
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const explicit = localStorage.getItem('PATHWISE_THEME');
      if (explicit === 'light' || explicit === 'dark') return explicit;
      if (savedState?.theme === 'light' || savedState?.theme === 'dark') return savedState.theme;
    } catch {
      // ignore
    }
    return 'dark';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    try {
      localStorage.setItem('PATHWISE_THEME', theme);
    } catch {
      // ignore
    }
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    }
  }, [theme]);

  const [language, setLanguage] = useState<LanguageMode>(savedState?.language || 'en');
  const [activeTab, setActiveTab] = useState<NavigationTab>(savedState?.activeTab || 'home');
  const [student, setStudent] = useState<StudentProfile>(savedState?.student || DEFAULT_STUDENT);
  const [family, setFamily] = useState<FamilyProfile>(savedState?.family || DEFAULT_FAMILY);
  const [parentPreferences, setParentPreferences] = useState<ParentCoursePreference>(
    savedState?.parentPreferences || INITIAL_PARENT_PREFERENCES
  );
  const [selectedCareerId, setSelectedCareerId] = useState<string>(savedState?.selectedCareerId || 'ai-ml-engineer');
  const [appointments, setAppointments] = useState<Appointment[]>(savedState?.appointments || INITIAL_APPOINTMENTS);
  const [scholarships, setScholarships] = useState<EnhancedScholarship[]>(savedState?.scholarships || INITIAL_SCHOLARSHIPS);
  const [roadmapMilestones, setRoadmapMilestones] = useState<RoadmapMilestone[]>(savedState?.roadmapMilestones || INITIAL_ROADMAP_MILESTONES);
  const [compareCareerIds, setCompareCareerIds] = useState<string[]>(savedState?.compareCareerIds || ['ai-ml-engineer', 'data-science-systems']);
  const [counsellorStudents, setCounsellorStudents] = useState<DetailedCounsellorStudent[]>(savedState?.counsellorStudents || COUNSELLOR_STUDENTS);
  
  const [assessmentState, setAssessmentState] = useState<AssessmentState>(savedState?.assessmentState || {
    interestCompleted: true,
    aptitudeCompleted: true,
    interestResponses: {},
    aptitudeResponses: {},
    lastScoreDate: 'Today, 09:30 AM',
    calculatedAptitudePercent: 91,
    calculatedInterestPercent: 88
  });

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [inspectStudentId, setInspectStudentId] = useState<string | null>(null);

  // Modals & Drawers
  const [explainScoreData, setExplainScoreData] = useState<ScoreExplanationData | null>(null);
  const [isDemoVideoRoomOpen, setIsDemoVideoRoomOpen] = useState<boolean>(false);
  const [activeDemoVideoExpert, setActiveDemoVideoExpert] = useState<string>('Dr. S. Meenakshi Sundaram');
  const [isFamilyGuideOpen, setIsFamilyGuideOpen] = useState<boolean>(false);
  const [isReportPrintOpen, setIsReportPrintOpen] = useState<boolean>(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-1',
      title: 'Family Budget Set: ₹4.5 Lakhs/year',
      detail: 'Annual tuition constraint active (₹18.0L total 4-year capacity). Financial fit updated.',
      time: '10m ago',
      read: false,
      type: 'budget'
    },
    {
      id: 'notif-2',
      title: 'TN First Graduate Waiver Eligible',
      detail: 'Check documents checklist in Scholarship Matcher to save ₹25,000/year.',
      time: '1h ago',
      read: false,
      type: 'scholarship'
    },
    {
      id: 'notif-3',
      title: 'Consultation Scheduled',
      detail: '1-on-1 STEAM Guidance booked with Dr. S. Meenakshi Sundaram.',
      time: '2h ago',
      read: true,
      type: 'appointment'
    }
  ]);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(savedState?.currentUser || {
    id: 'user-arjun',
    name: 'Arjun Swaminathan',
    email: 'demo@prism.ai',
    role: 'student'
  });
  const [authView, setAuthView] = useState<AuthViewMode | null>(null);
  const [isViewingLanding, setIsViewingLanding] = useState<boolean>(false);
  const [isOnboarding, setIsOnboarding] = useState<boolean>(false);

  const [historyLog, setHistoryLog] = useState([
    {
      id: 'h-1',
      action: 'Initial Student Vector Generated',
      timestamp: 'Today, 09:30 AM',
      detail: 'Aptitude 91%, Math 91%, Analytical 88%, Tech Interest 94%'
    },
    {
      id: 'h-2',
      action: 'Family Profile Mapped',
      timestamp: 'Today, 09:42 AM',
      detail: 'Annual Budget: ₹4.50 Lakhs/yr (Total 4-Yr: ₹18.0L), Risk Appetite: Balanced'
    },
    {
      id: 'h-3',
      action: 'Multi-Vector Synthesis Completed',
      timestamp: 'Today, 09:45 AM',
      detail: 'PRISM Score: 92/100, Conflict Index: 28/100'
    }
  ]);

  // Derived budget values (Single Source of Truth)
  const annualBudgetLakhs = family.annualBudgetLakhs || 4.5;
  const totalFourYearBudget = parseFloat((annualBudgetLakhs * 4).toFixed(2));

  // Cross-role responsive update for Annual Budget
  const updateAnnualBudget = (newAnnual: number) => {
    const clamped = Math.max(0.5, Math.min(25, Number(newAnnual.toFixed(1))));
    setFamily(prev => ({
      ...prev,
      annualBudgetLakhs: clamped
    }));
    setParentPreferences(prev => ({
      ...prev,
      maxAnnualFeeLakhs: clamped
    }));
    // Sync with Counsellor student #1 (Arjun)
    setCounsellorStudents(prev => prev.map(s => {
      if (s.id === 'stud-1') {
        const gap = Math.max(0, s.targetDegreeCost - (clamped * 4));
        return {
          ...s,
          familyAnnualBudget: clamped,
          budgetGap: parseFloat(gap.toFixed(1)),
          status: gap > 3 ? 'Financial Risk' : s.conflictIndex > 50 ? 'High Conflict' : 'Stable'
        };
      }
      return s;
    }));
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: `Annual Budget Updated: ₹${clamped.toFixed(1)}L/yr`,
        detail: `New 4-year capacity is ₹${(clamped * 4).toFixed(1)} Lakhs. Financial Fit & Counsellor risk triage live-recalculated.`,
        time: 'Just now',
        read: false,
        type: 'budget'
      },
      ...prev
    ]);
  };

  const updateParentWeight = (key: keyof ParentCriteriaWeights, val: number) => {
    setParentPreferences(prev => {
      const updated = {
        ...prev,
        criteriaWeights: {
          ...prev.criteriaWeights,
          [key]: val
        }
      };
      return updated;
    });
  };

  // Switch role and update sidebar/tab permissions
  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole === 'parent') {
      setActiveTab('parent-preferences');
    } else if (newRole === 'counsellor') {
      setActiveTab('counsellor');
    } else {
      if (activeTab === 'counsellor' || activeTab === 'caseload' || activeTab === 'parent-preferences') {
        setActiveTab('home');
      }
    }
  };

  // Self-assessment completion logic that updates PRISM scores & re-ranks careers
  const submitInterestAssessment = (answers: Record<string, number>) => {
    const values = Object.values(answers);
    const avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 4;
    const calculatedPercent = Math.min(98, Math.max(60, Math.round((avg / 5) * 100)));

    setAssessmentState(prev => ({
      ...prev,
      interestCompleted: true,
      interestResponses: answers,
      calculatedInterestPercent: calculatedPercent,
      lastScoreDate: 'Just now'
    }));

    // Live update student skills
    setStudent(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        technologyInterest: calculatedPercent,
        analyticalThinking: Math.min(96, Math.max(75, Math.round((prev.skills.analyticalThinking + calculatedPercent) / 2)))
      }
    }));

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Interest Inventory Completed',
        detail: `Score: ${calculatedPercent}% STEAM alignment. PRISM Vector Radar & Career rankings re-synthesized.`,
        time: 'Just now',
        read: false,
        type: 'assessment'
      },
      ...prev
    ]);
  };

  const submitAptitudeAssessment = (answers: Record<string, number>, percentScore: number) => {
    setAssessmentState(prev => ({
      ...prev,
      aptitudeCompleted: true,
      aptitudeResponses: answers,
      calculatedAptitudePercent: percentScore,
      lastScoreDate: 'Just now'
    }));

    setStudent(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        mathematics: percentScore,
        problemSolving: Math.min(98, Math.max(70, Math.round((prev.skills.problemSolving + percentScore) / 2)))
      }
    }));

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Aptitude Quiz Completed',
        detail: `Cognitive Score: ${percentScore}%. Math & Problem Solving metrics updated.`,
        time: 'Just now',
        read: false,
        type: 'assessment'
      },
      ...prev
    ]);
  };

  const retakeAssessment = () => {
    setAssessmentState({
      interestCompleted: false,
      aptitudeCompleted: false,
      interestResponses: {},
      aptitudeResponses: {},
      calculatedAptitudePercent: 91,
      calculatedInterestPercent: 88,
      lastScoreDate: undefined
    });
    setActiveTab('assessments');
  };

  const toggleScholarshipDoc = (scholarshipId: string, docId: string) => {
    setScholarships(prev => prev.map(s => {
      if (s.id === scholarshipId) {
        return {
          ...s,
          documentsChecklist: s.documentsChecklist.map(d => 
            d.id === docId ? { ...d, checked: !d.checked } : d
          )
        };
      }
      return s;
    }));
  };

  const toggleMilestone = (milestoneId: string) => {
    setRoadmapMilestones(prev => prev.map(m => 
      m.id === milestoneId ? { ...m, completed: !m.completed } : m
    ));
  };

  const roadmapProgressPercent = useMemo(() => {
    if (!roadmapMilestones.length) return 0;
    const completedCount = roadmapMilestones.filter(m => m.completed).length;
    return Math.round((completedCount / roadmapMilestones.length) * 100);
  }, [roadmapMilestones]);

  const toggleCompareCareer = (careerId: string) => {
    setCompareCareerIds(prev => {
      if (prev.includes(careerId)) {
        return prev.filter(id => id !== careerId);
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], careerId]; // shift out first
      }
      return [...prev, careerId];
    });
  };

  const clearCompareCareers = () => setCompareCareerIds([]);

  const openExplainScore = (data: ScoreExplanationData) => setExplainScoreData(data);
  const closeExplainScore = () => setExplainScoreData(null);

  const openDemoVideoRoom = (expertName: string) => {
    setActiveDemoVideoExpert(expertName);
    setIsDemoVideoRoomOpen(true);
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Recalculate Career rankings and scores dynamically based on Student and Family vectors
  const careers = useMemo(() => {
    return CAREER_DATABASE.map((c) => {
      // 1. Calculate Student Fit based on student's actual skills and interests
      let studentSkillSum = 0;
      if (c.id === 'ai-ml-engineer') {
        studentSkillSum = (student.skills.mathematics * 0.35) + 
                          (student.skills.analyticalThinking * 0.35) + 
                          (student.skills.programming * 0.2) + 
                          (student.skills.technologyInterest * 0.1);
      } else if (c.id === 'data-science-systems') {
        studentSkillSum = (student.skills.mathematics * 0.4) + 
                          (student.skills.problemSolving * 0.3) + 
                          (student.skills.programming * 0.15) + 
                          (student.skills.analyticalThinking * 0.15);
      } else if (c.id === 'cybersecurity-cloud') {
        studentSkillSum = (student.skills.problemSolving * 0.35) + 
                          (student.skills.analyticalThinking * 0.25) + 
                          (student.skills.programming * 0.25) + 
                          (student.skills.communication * 0.15);
      } else if (c.id === 'robotics-automation') {
        studentSkillSum = (student.skills.problemSolving * 0.35) + 
                          (student.skills.mathematics * 0.3) + 
                          (student.skills.creativity * 0.2) + 
                          (student.skills.programming * 0.15);
      } else if (c.id === 'software-distributed-systems') {
        studentSkillSum = (student.skills.programming * 0.4) + 
                          (student.skills.problemSolving * 0.3) + 
                          (student.skills.analyticalThinking * 0.2) + 
                          (student.skills.mathematics * 0.1);
      } else if (c.id === 'biomedical-health-informatics') {
        studentSkillSum = (student.skills.analyticalThinking * 0.4) + 
                          (student.skills.mathematics * 0.3) + 
                          (student.academicScore * 0.3);
      } else if (c.id === 'cleantech-energy') {
        studentSkillSum = (student.skills.mathematics * 0.35) + 
                          (student.skills.problemSolving * 0.35) + 
                          (student.skills.analyticalThinking * 0.3);
      } else {
        studentSkillSum = (student.skills.creativity * 0.4) + 
                          (student.skills.technologyInterest * 0.3) + 
                          (student.skills.communication * 0.3);
      }

      const calculatedStudentFit = Math.min(99, Math.max(50, Math.round(studentSkillSum)));

      // 2. Calculate Financial Fit based on family's annual budget
      const moderateAnnualCost = c.educationTiers[1].annualFeeLakhs;
      let financialScore = 80;
      if (family.annualBudgetLakhs >= moderateAnnualCost) {
        financialScore = Math.min(96, Math.round(85 + (family.annualBudgetLakhs - moderateAnnualCost) * 4));
      } else {
        const gap = moderateAnnualCost - family.annualBudgetLakhs;
        financialScore = Math.max(50, Math.round(80 - gap * 10));
      }
      if (family.scholarshipDependency === 'critical') {
        financialScore = Math.round(financialScore * 0.92);
      }

      // 3. Calculate Parent-Student Conflict Index
      let conflictScore = 25;
      const isDomainPreferredByParent = family.parentPreferredDomains.some(d => 
        (d.includes('Computer') && (c.id.includes('ai') || c.id.includes('data') || c.id.includes('software'))) ||
        (d.includes('Electronics') && (c.id.includes('robotics') || c.id.includes('cybersecurity'))) ||
        (d.includes('Mechanical') && (c.id.includes('robotics') || c.id.includes('cleantech')))
      );

      if (!isDomainPreferredByParent) {
        conflictScore += 25;
      }
      if (c.id === 'steam-product-design-hci' && family.parentStabilityPreference === 'high') {
        conflictScore += 20;
      }
      if (family.riskAppetite === 'conservative' && c.hiringVelocity !== 'Critical') {
        conflictScore += 10;
      }
      conflictScore = Math.min(95, Math.max(12, conflictScore));

      // 4. PRISM Overall Formula:
      // 30% Student Fit + 25% Financial Feasibility + 25% Market Demand + 10% Geographic Opportunity + 10% Skill Readiness
      const studentFitWeighted = calculatedStudentFit * 0.30;
      const financialFitWeighted = financialScore * 0.25;
      const marketDemandWeighted = c.scores.marketDemand * 0.25;
      const geographicOpportunityWeighted = c.scores.geographicOpportunity * 0.10;
      const skillReadinessWeighted = c.scores.skillReadiness * 0.10;

      const overallPrismScore = Math.round(
        studentFitWeighted + 
        financialFitWeighted + 
        marketDemandWeighted + 
        geographicOpportunityWeighted + 
        skillReadinessWeighted
      );

      return {
        ...c,
        matchScore: overallPrismScore,
        scores: {
          ...c.scores,
          studentFit: calculatedStudentFit,
          financialFit: financialScore,
          conflictIndex: conflictScore,
        }
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }, [student, family]);

  // Overall metrics of the top matched career
  const topCareer = careers[0] || CAREER_DATABASE[0];
  const overallMetrics: PrismMetrics = useMemo(() => {
    return {
      overallPrismScore: topCareer.matchScore,
      studentFit: topCareer.scores.studentFit,
      financialFit: topCareer.scores.financialFit,
      marketAlignment: topCareer.scores.marketDemand,
      conflictIndex: topCareer.scores.conflictIndex,
      skillReadiness: topCareer.scores.skillReadiness,
      geographicOpportunity: topCareer.scores.geographicOpportunity
    };
  }, [topCareer]);

  const selectedCareer = useMemo(() => {
    return careers.find(c => c.id === selectedCareerId) || topCareer;
  }, [careers, selectedCareerId, topCareer]);

  const addAppointment = (newApt: Omit<Appointment, 'id'>) => {
    const id = `apt-${Date.now()}`;
    const item: Appointment = { ...newApt, id };
    setAppointments(prev => [item, ...prev]);
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: `Session Confirmed with ${item.expertName}`,
        detail: `${item.date} at ${item.time} via ${item.mode}. Visible in Student & Counsellor views.`,
        time: 'Just now',
        read: false,
        type: 'appointment'
      },
      ...prev
    ]);
    setHistoryLog(prev => [
      {
        id: `h-${Date.now()}`,
        action: `Booked Consultation: ${item.expertName}`,
        timestamp: 'Just now',
        detail: `${item.date} at ${item.time} via ${item.mode}`
      },
      ...prev
    ]);
  };

  const runAnalysisPipeline = (targetTab: NavigationTab = 'home') => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setActiveTab(targetTab);
    }, 3200);
  };

  const loadDemoProfile = () => {
    setStudent(DEFAULT_STUDENT);
    setFamily(DEFAULT_FAMILY);
    setSelectedCareerId('ai-ml-engineer');
    setRole('student');
    setCurrentUser({
      id: 'demo-arjun',
      name: 'Arjun Swaminathan',
      email: 'demo@prism.ai',
      role: 'student'
    });
    setAuthView(null);
    setIsOnboarding(false);
    setIsViewingLanding(false);
    setActiveTab('home');

    setHistoryLog(prev => [
      {
        id: `h-demo-${Date.now()}`,
        action: "Demo Profile Loaded (Arjun Swaminathan)",
        timestamp: 'Just now',
        detail: 'Pre-populated with 18 y/o STEAM student in Chennai'
      },
      ...prev
    ]);
  };

  // Mock Authentication Methods
  const login = async (emailOrUsername: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const trimmedInput = emailOrUsername.trim().toLowerCase();

    if (!trimmedInput || !password) {
      return { success: false, error: 'Please enter your email and password.' };
    }

    if ((trimmedInput === 'demo@prism.ai' || trimmedInput === 'arjun') && password === 'demo123') {
      setCurrentUser({
        id: 'user-arjun',
        name: 'Arjun Swaminathan',
        email: 'demo@prism.ai',
        role: 'student'
      });
      setRole('student');
      setStudent(DEFAULT_STUDENT);
      setAuthView(null);
      setIsViewingLanding(false);
      setActiveTab('home');
      return { success: true };
    }

    if ((trimmedInput === 'parent@prism.ai' || trimmedInput === 'parent') && password === 'demo123') {
      setCurrentUser({
        id: 'user-parent',
        name: 'Swaminathan V. (Parent)',
        email: 'parent@prism.ai',
        role: 'parent'
      });
      setRole('parent');
      setFamily(DEFAULT_FAMILY);
      setAuthView(null);
      setIsViewingLanding(false);
      setActiveTab('parent-preferences');
      return { success: true };
    }

    if ((trimmedInput === 'counsellor@prism.ai' || trimmedInput === 'counsellor') && password === 'demo123') {
      setCurrentUser({
        id: 'user-counsellor',
        name: 'Dr. Kavitha Ramanathan',
        email: 'counsellor@prism.ai',
        role: 'counsellor'
      });
      setRole('counsellor');
      setAuthView(null);
      setIsViewingLanding(false);
      setActiveTab('counsellor');
      return { success: true };
    }

    if (password === 'demo123' || password.length >= 6) {
      const detectedRole: UserRole = trimmedInput.includes('parent') ? 'parent' : trimmedInput.includes('counsellor') ? 'counsellor' : 'student';
      const cleanName = trimmedInput.split('@')[0].replace('.', ' ').replace(/^./, c => c.toUpperCase());
      
      setCurrentUser({
        id: `user-${Date.now()}`,
        name: cleanName || 'PRISM User',
        email: trimmedInput.includes('@') ? trimmedInput : `${trimmedInput}@prism.ai`,
        role: detectedRole
      });
      setRole(detectedRole);
      setAuthView(null);
      setIsViewingLanding(false);

      if (detectedRole === 'student') {
        setActiveTab('home');
      } else if (detectedRole === 'parent') {
        setActiveTab('parent-preferences');
      } else {
        setActiveTab('counsellor');
      }
      return { success: true };
    }

    return { success: false, error: 'Incorrect email or password.' };
  };

  const loginDemo = (targetRole: UserRole) => {
    if (targetRole === 'student') {
      login('demo@prism.ai', 'demo123');
    } else if (targetRole === 'parent') {
      login('parent@prism.ai', 'demo123');
    } else {
      login('counsellor@prism.ai', 'demo123');
    }
  };

  const loginWithGoogle = async () => {
    setCurrentUser({
      id: 'google-arjun',
      name: 'Arjun Swaminathan',
      email: 'arjun.swami@gmail.com',
      role: 'student'
    });
    setRole('student');
    setStudent(DEFAULT_STUDENT);
    setAuthView(null);
    setIsViewingLanding(false);
    setActiveTab('home');
  };

  const signup = async (userData: { name: string; email: string; mobile: string; password: string; role: UserRole }): Promise<{ success: boolean; error?: string }> => {
    if (!userData.name || !userData.email || !userData.password) {
      return { success: false, error: 'Please fill in all required fields.' };
    }

    const newUser: AuthUser = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      mobile: userData.mobile
    };

    setCurrentUser(newUser);
    setRole(userData.role);
    setAuthView(null);
    setIsViewingLanding(false);

    if (userData.role === 'student') {
      setStudent(prev => ({ ...prev, name: userData.name }));
      setActiveTab('assessments');
    } else if (userData.role === 'parent') {
      setActiveTab('parent-preferences');
    } else {
      setActiveTab('counsellor');
    }

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setRole('student');
    setAuthView(null);
    setIsViewingLanding(true);
  };

  // Dynamic Course Recommendation Score Calculation based on Parent Preferences
  const courseRecommendationScores = useMemo<CourseRecommendationScore[]>(() => {
    return BASE_COURSES_CATALOG.map(course => {
      const jobStabilityScore = course.baseStability;
      const maxFee = family.annualBudgetLakhs || 4.5;
      let feeAffordabilityScore = 100;
      if (course.tuitionPerYearLakhs <= maxFee) {
        feeAffordabilityScore = Math.round(100 - (course.tuitionPerYearLakhs / maxFee) * 10);
      } else {
        const overflow = course.tuitionPerYearLakhs - maxFee;
        feeAffordabilityScore = Math.max(25, Math.round(100 - (overflow / maxFee) * 85));
      }

      const campusPlacementScore = course.basePlacementRate;
      const mathScore = student.skills?.mathematics || 90;
      const analyticalScore = student.skills?.analyticalThinking || 88;
      const studentAptitudeScore = Math.round((mathScore * 0.55) + (analyticalScore * 0.45));
      const locationScore = 92;

      const isPreferredStream = parentPreferences.preferredStreams.length === 0 || 
        parentPreferences.preferredStreams.some(s => 
          s.toLowerCase().includes(course.stream.toLowerCase()) || 
          course.stream.toLowerCase().includes(s.toLowerCase())
        );
      const streamConcordanceScore = isPreferredStream ? 100 : 50;

      const weights = parentPreferences.criteriaWeights;
      const totalWeights = (weights.jobStability + weights.feeAffordability + weights.campusPlacement + weights.studentAptitude + weights.locationProximity) || 100;

      const weightedStability = (jobStabilityScore * weights.jobStability) / totalWeights;
      const weightedFee = (feeAffordabilityScore * weights.feeAffordability) / totalWeights;
      const weightedPlacement = (campusPlacementScore * weights.campusPlacement) / totalWeights;
      const weightedAptitude = (studentAptitudeScore * weights.studentAptitude) / totalWeights;
      const weightedLocation = (locationScore * weights.locationProximity) / totalWeights;

      const rawBaseScore = weightedStability + weightedFee + weightedPlacement + weightedAptitude + weightedLocation;
      const streamMultiplier = isPreferredStream ? 1.04 : 0.90;
      const totalRecommendationScore = Math.min(99, Math.max(45, Math.round(rawBaseScore * streamMultiplier)));

      const calculationSteps = [
        `1. Job Stability: ${jobStabilityScore}/100 × ${weights.jobStability}% weight = +${weightedStability.toFixed(1)} pts`,
        `2. Tuition Affordability (vs ₹${maxFee.toFixed(1)}L limit): ${feeAffordabilityScore}/100 × ${weights.feeAffordability}% weight = +${weightedFee.toFixed(1)} pts`,
        `3. Campus Placement Velocity: ${campusPlacementScore}/100 × ${weights.campusPlacement}% weight = +${weightedPlacement.toFixed(1)} pts`,
        `4. Student Aptitude Congruence: ${studentAptitudeScore}/100 × ${weights.studentAptitude}% weight = +${weightedAptitude.toFixed(1)} pts`,
        `5. Regional Location & Safety: ${locationScore}/100 × ${weights.locationProximity}% weight = +${weightedLocation.toFixed(1)} pts`,
        `6. Parental Stream Preference Alignment (${isPreferredStream ? 'Selected Preferred Stream ✓' : 'Alternative Stream'}): Multiplier × ${streamMultiplier}`,
        `Total Calculated Score: ${totalRecommendationScore}% Recommendation Match`
      ];

      return {
        courseId: course.courseId,
        courseName: course.courseName,
        stream: course.stream,
        degreeType: course.degreeType,
        careerTitle: course.careerTitle,
        totalRecommendationScore,
        breakdown: {
          jobStabilityScore,
          feeAffordabilityScore,
          campusPlacementScore,
          studentAptitudeScore,
          locationScore,
          streamConcordanceScore
        },
        formulaExplanation: {
          weightedJobStability: parseFloat(weightedStability.toFixed(1)),
          weightedFeeAffordability: parseFloat(weightedFee.toFixed(1)),
          weightedCampusPlacement: parseFloat(weightedPlacement.toFixed(1)),
          weightedStudentAptitude: parseFloat(weightedAptitude.toFixed(1)),
          weightedLocation: parseFloat(weightedLocation.toFixed(1)),
          streamBonus: isPreferredStream ? 4 : -10,
          calculationSteps
        },
        tuitionPerYearLakhs: course.tuitionPerYearLakhs,
        projectedStartingCTC: course.projectedStartingCTC,
        stabilityIndex: course.baseStability,
        placementRate: course.basePlacementRate,
        topInstitutions: course.topInstitutions
      };
    }).sort((a, b) => b.totalRecommendationScore - a.totalRecommendationScore);
  }, [BASE_COURSES_CATALOG, parentPreferences, student, family.annualBudgetLakhs]);

  // Save state to localStorage whenever key values change
  useEffect(() => {
    try {
      const stateToPersist = {
        role,
        theme,
        language,
        activeTab,
        student,
        family,
        parentPreferences,
        selectedCareerId,
        appointments,
        scholarships,
        roadmapMilestones,
        compareCareerIds,
        counsellorStudents,
        assessmentState,
        currentUser
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [
    role,
    theme,
    language,
    activeTab,
    student,
    family,
    parentPreferences,
    selectedCareerId,
    appointments,
    scholarships,
    roadmapMilestones,
    compareCareerIds,
    counsellorStudents,
    assessmentState,
    currentUser
  ]);

  return (
    <PrismContext.Provider
      value={{
        role,
        setRole,
        theme,
        setTheme,
        toggleTheme,
        language,
        setLanguage,
        activeTab,
        setActiveTab,
        student,
        setStudent,
        family,
        setFamily,
        annualBudgetLakhs,
        totalFourYearBudget,
        updateAnnualBudget,
        careers,
        selectedCareerId,
        setSelectedCareerId,
        selectedCareer,
        overallMetrics,
        appointments,
        addAppointment,
        isAnalyzing,
        setIsAnalyzing,
        runAnalysisPipeline,
        loadDemoProfile,
        isChatOpen,
        setIsChatOpen,
        historyLog,
        parentPreferences,
        setParentPreferences,
        updateParentWeight,
        courseRecommendationScores,
        assessmentState,
        submitInterestAssessment,
        submitAptitudeAssessment,
        retakeAssessment,
        scholarships,
        toggleScholarshipDoc,
        roadmapMilestones,
        toggleMilestone,
        roadmapProgressPercent,
        compareCareerIds,
        toggleCompareCareer,
        clearCompareCareers,
        counsellorStudents,
        inspectStudentId,
        setInspectStudentId,
        explainScoreData,
        openExplainScore,
        closeExplainScore,
        isDemoVideoRoomOpen,
        setIsDemoVideoRoomOpen,
        activeDemoVideoExpert,
        openDemoVideoRoom,
        isFamilyGuideOpen,
        setIsFamilyGuideOpen,
        isReportPrintOpen,
        setIsReportPrintOpen,
        isGlobalSearchOpen,
        setIsGlobalSearchOpen,
        searchQuery,
        setSearchQuery,
        notifications,
        markNotificationsAsRead,
        currentUser,
        isAuthenticated: !!currentUser,
        authView,
        setAuthView,
        isViewingLanding,
        setIsViewingLanding,
        isOnboarding,
        setIsOnboarding,
        login,
        loginWithGoogle,
        loginDemo,
        signup,
        logout
      }}
    >
      {children}
    </PrismContext.Provider>
  );
};

export const usePrism = () => {
  const context = useContext(PrismContext);
  if (!context) {
    throw new Error('usePrism must be used within a PrismProvider');
  }
  return context;
};
