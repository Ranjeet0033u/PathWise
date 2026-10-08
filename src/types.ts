export type UserRole = 'student' | 'parent' | 'counsellor';

export type ThemeMode = 'light' | 'dark';

export type AuthViewMode = 'login' | 'signup' | 'forgot-password';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  mobile?: string;
}

export type NavigationTab = 
  | 'home'
  | 'assessments'
  | 'swot'
  | 'explorer'
  | 'career-detail'
  | 'market'
  | 'financial'
  | 'conflict'
  | 'pathway'
  | 'roadmap'
  | 'scholarships'
  | 'experts'
  | 'appointments'
  | 'history'
  | 'counsellor'
  | 'family-profile'
  | 'parent-preferences'
  | 'caseload'
  | 'compare';

export type LanguageMode = 'en' | 'ta';

export interface RoadmapMilestone {
  id: string;
  title: string;
  titleTamil?: string;
  stage: 'Class 11' | 'Class 12 Early' | 'Board & Entrance Prep' | 'Admissions & TNEA';
  category: 'Academics' | 'Entrance' | 'Portfolio & Skills' | 'Family Alignment';
  completed: boolean;
  targetQuarter: string;
  details: string;
}

export interface EnhancedScholarship {
  id: string;
  name: string;
  provider: string;
  maxBenefit: string;
  eligibility: string;
  deadline: string;
  category: 'All' | 'General' | 'BC/MBC' | 'SC/ST' | 'Minority' | 'Women in STEAM';
  incomeBand: '< ₹2.5 LPA' | '₹2.5L – ₹6 LPA' | 'Any Income';
  state: 'Tamil Nadu' | 'All-India / Central';
  matchGrade: 'Direct Match' | 'Eligible' | 'Needs Application';
  documentsChecklist: {
    id: string;
    name: string;
    checked: boolean;
  }[];
}

export interface AssessmentQuestion {
  id: string;
  text: string;
  textTamil: string;
  domain: string;
  type: 'likert' | 'mcq';
  options?: {
    label: string;
    labelTamil?: string;
    value: number;
  }[];
  correctIndex?: number;
}

export interface AssessmentState {
  interestCompleted: boolean;
  aptitudeCompleted: boolean;
  interestResponses: Record<string, number>;
  aptitudeResponses: Record<string, number>;
  lastScoreDate?: string;
  calculatedAptitudePercent: number;
  calculatedInterestPercent: number;
}

export interface ScoreExplanationData {
  scoreTitle: string;
  totalScore: number;
  maxScore: number;
  formula: string;
  weights: {
    label: string;
    weightPercent: number;
    rawScore: number;
    weightedContribution: number;
    explanation: string;
  }[];
  verdictNote: string;
}

export type EducationLevel = 'grade12' | 'be_btech' | 'custom_branch';

export type AcademicBranchId = 
  | 'engineering'
  | 'medical'
  | 'arts'
  | 'commerce'
  | 'pure_sciences'
  | 'design'
  | 'law';

export interface AcademicCourseDetails {
  branchId: AcademicBranchId;
  branchName: string;
  courseName: string;
  degreeType: 'Undergraduate (Degree)' | 'Postgraduate (Masters)' | 'Diploma' | 'Higher Secondary (11th / 12th)';
  currentYear: string;
  currentSemester: string;
  institution: string;
  scoringType: 'cgpa' | 'percentage';
  overallScore: number;
  previousTermScore?: number;
  hasArrears: boolean;
  totalArrears?: number;
  clearedArrears?: number;
  activeArrears?: number;
  subjectMarks: Record<string, number>;
  certifications: string[];
  projectsCompleted: string;
  internshipExperience: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Industry Ready';
  areasNeedingImprovement: string[];
}

export interface Grade12Details {
  streamGroup: 'Science — PCM' | 'Science — PCB' | 'Science — PCM + Computer Science' | 'Commerce' | 'Humanities / Arts';
  subjectMarks: {
    physics?: number;
    chemistry?: number;
    mathematics?: number;
    biology?: number;
    computerScience?: number;
    accountancy?: number;
    economics?: number;
    businessStudies?: number;
    mathOrComputerApp?: number;
    history?: number;
    politicalScience?: number;
    englishLanguages?: number;
  };
  preferredSubjects: string[];
  academicStrengths: string[];
  competitiveExams: string[];
}

export interface BeBtechDetails {
  branch: 'CSE / IT / AI&DS / AI&ML' | 'ECE' | 'EEE' | 'Mechanical' | 'Civil' | 'Other';
  currentYear: string;
  currentSemester: string;
  college: string;
  currentCgpa: number;
  previousSemCgpa: number;
  overallCgpa: number;
  currentSemPercentage?: number;
  hasArrears: boolean;
  totalArrears?: number;
  clearedArrears?: number;
  activeArrears?: number;
  currentBacklogs?: number;
  branchSubjects: Record<string, number>;
  certifications: string[];
  projectsCompleted: string;
  internshipExperience: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Industry Ready';
  areasNeedingImprovement: string[];
}

export interface StudentProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  classDegree: string;
  academicStream: string;
  educationLevel?: EducationLevel;
  grade12Details?: Grade12Details;
  beBtechDetails?: BeBtechDetails;
  academicCourseDetails?: AcademicCourseDetails;
  subjects: string[];
  academicScore: number; // percentage
  skills: {
    programming: number; // 0 - 100
    mathematics: number;
    communication: number;
    problemSolving: number;
    creativity: number;
    leadership: number;
    analyticalThinking: number;
    technologyInterest: number;
  };
  interests: string[];
  cognitivePreferences: {
    analyticalVsCreative: 'analytical' | 'balanced' | 'creative';
    individualVsTeam: 'individual' | 'balanced' | 'team';
    practicalVsTheoretical: 'practical' | 'balanced' | 'theoretical';
    stabilityPreference: 'high' | 'moderate' | 'flexible';
    innovationPreference: 'high' | 'moderate' | 'conservative';
    workEnvironment: 'hybrid' | 'campus-lab' | 'office' | 'remote';
    higherStudyPreference: 'immediate-job' | 'masters-soon' | 'research-phd';
  };
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
}

export interface FamilyProfile {
  annualBudgetLakhs: number; // e.g. 5 (means ₹5,00,000 / year)
  financialFlexibility: 'strict' | 'moderate' | 'high';
  preferredLocation: 'home-state' | 'all-india' | 'international-ready';
  scholarshipDependency: 'critical' | 'preferred' | 'optional';
  riskAppetite: 'conservative' | 'balanced' | 'high';
  parentPreferredDomains: string[];
  parentStabilityPreference: 'very-high' | 'high' | 'moderate';
  higherEducationExpectation: 'bachelors-enough' | 'masters-essential' | 'flexible';
  expectedOutcome: 'early-employment' | 'high-starting-package' | 'prestigious-brand';
}

export interface MarketMetrics {
  careerId: string;
  careerTitle: string;
  demandIndex: number; // 0 - 100
  hiringVelocity: 'High' | 'Very High' | 'Critical' | 'Moderate';
  entrySalaryLPA: number;
  midSalaryLPA: number;
  seniorSalaryLPA: number;
  projectedFiveYearGrowth: number; // percentage, e.g. 34%
  economicDisruptionRisk: 'Low' | 'Moderate' | 'High';
  regionalDemand: {
    city: string;
    level: 'Moderate' | 'High' | 'Very High';
    openingsGrowth: string;
  }[];
  emergingSubdisciplines: string[];
}

export interface EducationPathwayTier {
  type: 'Low-Cost Pathway' | 'Moderate-Cost Pathway' | 'Premium Pathway';
  institutionCategory: string;
  annualFeeLakhs: number;
  totalDegreeCostLakhs: number;
  scholarshipFeasibility: string;
  riskAssessment: 'Low Risk' | 'Moderate Risk' | 'High Financial Strain';
  recommendedExams: string[];
}

export interface CareerOption {
  id: string;
  title: string;
  category: 'AI & Data' | 'Software & Systems' | 'Hardware & Robotics' | 'BioTech & Health' | 'Sustainability & Energy' | 'Design & HCI';
  description: string;
  matchScore: number; // calculated overall PRISM score
  scores: {
    studentFit: number;
    financialFit: number;
    marketDemand: number;
    geographicOpportunity: number;
    skillReadiness: number;
    conflictIndex: number;
  };
  salaryRange: string;
  hiringVelocity: 'High' | 'Very High' | 'Critical' | 'Moderate';
  requiredSkills: string[];
  studentSkillsMatched: string[];
  skillGap: string[];
  whyRecommended: {
    studentReason: string;
    familyReason: string;
    marketReason: string;
    skillReason: string;
    synthesis: string;
  };
  educationTiers: EducationPathwayTier[];
  educationTimeline: {
    step: string;
    action: string;
    duration: string;
    details: string;
  }[];
  regionalHotspots: string[];
}

export interface ExamInfo {
  id: string;
  name: string;
  conductingBody: string;
  targetCareers: string[];
  eligibility: string;
  deadline: string;
  difficulty: 'Moderate' | 'High' | 'Very High';
  tuitionImpact: string;
}

export interface ScholarshipInfo {
  id: string;
  name: string;
  provider: string;
  maxBenefit: string;
  eligibility: string;
  deadline: string;
  matchGrade: 'Direct Match' | 'Eligible' | 'Needs Application';
}

export interface ExpertProfile {
  id: string;
  name: string;
  role: string;
  category: 'Career Counsellor' | 'Industry Mentor' | 'Education Advisor' | 'STEAM Mentor';
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  specialization: string;
  availability: string;
  bio: string;
  verified: boolean;
}

export interface Appointment {
  id: string;
  expertId: string;
  expertName: string;
  expertRole: string;
  date: string;
  time: string;
  mode: 'Video Call' | 'In-Person Counselling' | 'Voice Session';
  status: 'Upcoming' | 'Completed' | 'Rescheduled';
  notes: string;
}

export interface CounsellorStudentItem {
  id: string;
  name: string;
  classDegree: string;
  topCareer: string;
  prismScore: number;
  studentFit: number;
  financialFit: number;
  conflictIndex: number;
  status: 'Stable' | 'High Conflict' | 'Financial Risk' | 'Needs Review';
  lastAssessed: string;
}

export interface ParentCriteriaWeights {
  jobStability: number;      // e.g. 30 (%)
  feeAffordability: number;  // e.g. 25 (%)
  campusPlacement: number;   // e.g. 25 (%)
  studentAptitude: number;   // e.g. 10 (%)
  locationProximity: number; // e.g. 10 (%)
}

export interface ParentCoursePreference {
  preferredStreams: string[];
  maxAnnualFeeLakhs: number;
  criteriaWeights: ParentCriteriaWeights;
  preferredInstitutionType: string;
  locationPreference: string;
  riskTolerance: 'Conservative (High Stability)' | 'Balanced' | 'High Growth (Frontier Tech)';
}

export interface CourseRecommendationScore {
  courseId: string;
  courseName: string;
  stream: string;
  degreeType: string;
  totalRecommendationScore: number; // 0 - 100
  careerTitle: string;
  breakdown: {
    jobStabilityScore: number;     // 0 - 100
    feeAffordabilityScore: number; // 0 - 100
    campusPlacementScore: number;  // 0 - 100
    studentAptitudeScore: number;  // 0 - 100
    locationScore: number;         // 0 - 100
    streamConcordanceScore: number;// 0 - 100
  };
  formulaExplanation: {
    weightedJobStability: number;
    weightedFeeAffordability: number;
    weightedCampusPlacement: number;
    weightedStudentAptitude: number;
    weightedLocation: number;
    streamBonus: number;
    calculationSteps: string[];
  };
  tuitionPerYearLakhs: number;
  projectedStartingCTC: string;
  stabilityIndex: number;
  placementRate: number;
  topInstitutions: string[];
}

