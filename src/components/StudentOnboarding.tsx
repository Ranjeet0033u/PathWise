import React, { useState, useMemo } from 'react';
import { usePrism } from '../context/PrismContext';
import { AcademicBranchId, AcademicCourseDetails } from '../types';
import { PathWiseSymbol } from './PathWiseSymbol';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Brain, 
  BookOpen, 
  GraduationCap, 
  Layers, 
  Compass, 
  Zap, 
  SlidersHorizontal,
  Code,
  Cpu,
  Building2,
  Wrench,
  Activity,
  Award,
  AlertTriangle,
  FolderGit2,
  Briefcase,
  TrendingUp,
  MapPin,
  User,
  CheckCircle2,
  Plus,
  Scale,
  Palette,
  Microscope,
  Stethoscope,
  BarChart3,
  Flame,
  Globe2,
  Target,
  FileCheck,
  ChevronRight,
  School
} from 'lucide-react';

interface StudentOnboardingProps {
  onComplete: () => void;
}

// 12th Grade Streams and Subjects
type Grade12Stream = 
  | 'Science — PCM' 
  | 'Science — PCB' 
  | 'Science — PCM + Computer Science' 
  | 'Commerce' 
  | 'Humanities / Arts';

interface Grade12StreamConfig {
  id: Grade12Stream;
  name: string;
  subjects: { name: string; defaultVal: number }[];
  defaultExams: string[];
}

const GRADE12_STREAMS: Grade12StreamConfig[] = [
  {
    id: 'Science — PCM',
    name: 'Science — PCM (Physics, Chemistry, Mathematics)',
    subjects: [
      { name: 'Physics', defaultVal: 88 },
      { name: 'Chemistry', defaultVal: 85 },
      { name: 'Mathematics', defaultVal: 92 }
    ],
    defaultExams: ['JEE Main', 'JEE Advanced', 'BITSAT']
  },
  {
    id: 'Science — PCB',
    name: 'Science — PCB (Physics, Chemistry, Biology)',
    subjects: [
      { name: 'Physics', defaultVal: 84 },
      { name: 'Chemistry', defaultVal: 86 },
      { name: 'Biology', defaultVal: 94 }
    ],
    defaultExams: ['NEET (UG)', 'CUET Biology', 'State Medical CET']
  },
  {
    id: 'Science — PCM + Computer Science',
    name: 'Science — PCM + Computer Science',
    subjects: [
      { name: 'Physics', defaultVal: 88 },
      { name: 'Chemistry', defaultVal: 84 },
      { name: 'Mathematics', defaultVal: 92 },
      { name: 'Computer Science', defaultVal: 95 }
    ],
    defaultExams: ['JEE Main', 'BITSAT', 'CUET']
  },
  {
    id: 'Commerce',
    name: 'Commerce (Accountancy, Economics, Business Studies)',
    subjects: [
      { name: 'Accountancy', defaultVal: 90 },
      { name: 'Economics', defaultVal: 88 },
      { name: 'Business Studies', defaultVal: 86 },
      { name: 'Mathematics / Computer Applications', defaultVal: 89 }
    ],
    defaultExams: ['CUET Commerce', 'CA Foundation', 'IPMAT']
  },
  {
    id: 'Humanities / Arts',
    name: 'Humanities / Arts (History, Pol Science, Economics, English)',
    subjects: [
      { name: 'History', defaultVal: 86 },
      { name: 'Political Science', defaultVal: 90 },
      { name: 'Economics', defaultVal: 88 },
      { name: 'English / Languages', defaultVal: 92 }
    ],
    defaultExams: ['CUET Humanities', 'CLAT', 'NPAT']
  }
];

// UG Academic Branch Configuration
interface BranchConfig {
  id: AcademicBranchId;
  name: string;
  badge: string;
  description: string;
  icon: React.ElementType;
  courses: string[];
  defaultCertifications: string[];
  cognitiveStrengthsPrompt: string;
  recommendedVectors: { id: string; label: string; desc: string }[];
}

const BRANCH_CONFIGS: BranchConfig[] = [
  {
    id: 'engineering',
    name: 'Engineering & Technology',
    badge: 'B.E. / B.Tech / Tech',
    description: 'Computer Science, AI, Electronics, Mechanical, Civil & emerging technologies',
    icon: Cpu,
    courses: [
      'B.E. / B.Tech Computer Science & Engineering (CSE)',
      'B.E. / B.Tech AI & Data Science (AI & DS / AI & ML)',
      'B.E. / B.Tech Electronics & Communication (ECE)',
      'B.E. / B.Tech Electrical & Electronics (EEE)',
      'B.E. / B.Tech Mechanical Engineering',
      'B.E. / B.Tech Civil Engineering',
      'B.E. / B.Tech Information Technology (IT)',
      'B.E. / B.Tech Biotechnology / Chemical Engineering',
      'Other Engineering / Tech Course'
    ],
    defaultCertifications: ['AWS Cloud Practitioner', 'Python Data Structures', 'Full Stack Development', 'DSA LeetCode 200+'],
    cognitiveStrengthsPrompt: 'Assess your engineering logic, algorithmic problem solving and architectural thinking.',
    recommendedVectors: [
      { id: 'gen-ai', label: 'Generative AI & LLM Systems', desc: 'Enterprise agentic systems, fine-tuning & prompt architecture' },
      { id: 'cloud-devops', label: 'Cloud & Distributed Platforms', desc: 'Kubernetes, multi-cloud microservices & high throughput' },
      { id: 'robotics', label: 'Autonomous Robotics & IoT', desc: 'ROS, edge computing, mechatronics & cyber-physical control' },
      { id: 'vlsi-semiconductors', label: 'VLSI & Embedded Silicon', desc: 'Chip design, FPGA synthesis & hardware security' },
      { id: 'cybersecurity', label: 'Cyber Defense & Zero Trust', desc: 'Offensive security, threat intelligence & cryptography' },
      { id: 'greentech-ev', label: 'CleanTech & Electric Mobility', desc: 'Battery management, smart grid & sustainable materials' }
    ]
  },
  {
    id: 'medical',
    name: 'Medical & Healthcare',
    badge: 'MBBS / BDS / Allied Health',
    description: 'Clinical Medicine, Surgery, Dental, Pharmacy, Nursing & Biomedical Sciences',
    icon: Stethoscope,
    courses: [
      'MBBS (Medicine & Surgery)',
      'BDS (Dental Surgery)',
      'B.Pharm / Pharm.D (Pharmacy & Clinical Trials)',
      'B.Sc Nursing & Healthcare Operations',
      'B.P.T (Physiotherapy & Rehabilitation)',
      'BAMS / BHMS (Ayurvedic & Alternative Medicine)',
      'B.Sc Biotechnology & Biomedical Science',
      'Other Healthcare Course'
    ],
    defaultCertifications: ['Basic Life Support (BLS)', 'Clinical Data Management', 'Good Clinical Practice (GCP)', 'Infection Control'],
    cognitiveStrengthsPrompt: 'Calibrate your diagnostic deduction, patient empathy and high-pressure recall.',
    recommendedVectors: [
      { id: 'clinical-specialty', label: 'Super-Specialty Clinical Practice', desc: 'Cardiology, Neurology, Oncology & surgical excellence' },
      { id: 'healthtech-ai', label: 'HealthTech & AI Diagnostics', desc: 'Medical imaging AI, digital therapeutics & telehealth' },
      { id: 'public-health', label: 'Epidemiology & Global Public Health', desc: 'WHO/health policy, pandemic defense & healthcare equity' },
      { id: 'pharma-trials', label: 'Pharma Discovery & Clinical Trials', desc: 'Novel drug development, genomics & regulatory affairs' },
      { id: 'hospital-mgmt', label: 'Healthcare Strategy & Hospital Ops', desc: 'NABH quality, tertiary care management & health systems' }
    ]
  },
  {
    id: 'arts',
    name: 'Arts & Humanities',
    badge: 'B.A. / Humanities / Media',
    description: 'Economics, Psychology, Literature, Journalism, Political Science & Public Policy',
    icon: BookOpen,
    courses: [
      'B.A. Economics & Econometrics',
      'B.A. Psychology & Behavioral Science',
      'B.A. English Literature & Communications',
      'B.A. Journalism & Mass Communication',
      'B.A. Political Science & Public Administration',
      'B.A. History, Sociology & Social Policy',
      'Other Arts & Humanities Course'
    ],
    defaultCertifications: ['Data Journalism (Python)', 'Behavioral Economics (Copenhagen)', 'Policy Analysis & Briefing', 'Content Strategy'],
    cognitiveStrengthsPrompt: 'Assess your qualitative synthesis, empathetic discourse and societal impact vision.',
    recommendedVectors: [
      { id: 'public-policy', label: 'Public Policy & Think Tanks', desc: 'Government advisory, governance research & impact consulting' },
      { id: 'behavioral-insights', label: 'Behavioral Insights & UX Strategy', desc: 'Applied psychology in tech, nudging & consumer behavior' },
      { id: 'media-journalism', label: 'Digital Media & Investigative Journalism', desc: 'Multimedia narrative, podcasting & data investigative reporting' },
      { id: 'international-relations', label: 'Diplomacy & Global Relations', desc: 'Foreign policy, UN bodies, trade diplomacy & NGO leadership' },
      { id: 'publishing-content', label: 'Creative Direction & Publishing', desc: 'Editorial leadership, transmedia storytelling & copyright' }
    ]
  },
  {
    id: 'commerce',
    name: 'Commerce & Management',
    badge: 'B.Com / BBA / BMS / FinTech',
    description: 'Accounting, Corporate Finance, Business Management, Investment & FinTech',
    icon: TrendingUp,
    courses: [
      'B.Com (Honours / Accounting & Finance)',
      'BBA / BBM (Business Administration & Operations)',
      'BMS (Bachelor of Management Studies)',
      'Chartered Accountancy (CA) / CS Professional Track',
      'B.Com FinTech & Digital Banking',
      'Other Commerce / Business Course'
    ],
    defaultCertifications: ['Financial Modeling & Valuation (FMVA)', 'Bloomberg Market Concepts', 'CFA Level 1 Candidate', 'Advanced Excel & PowerBI'],
    cognitiveStrengthsPrompt: 'Evaluate your quantitative acumen, market risk appraisal and organizational strategy.',
    recommendedVectors: [
      { id: 'investment-banking', label: 'Investment Banking & M&A', desc: 'Capital markets, financial syndication & private equity' },
      { id: 'fintech-strategy', label: 'FinTech & Neo-Banking', desc: 'UPI protocols, algorithmic trading & crypto compliance' },
      { id: 'management-consulting', label: 'Management Consulting & Strategy', desc: 'McKinsey/Bain problem solving, turnaround & profitability' },
      { id: 'big4-assurance', label: 'Audit, Tax & Corporate Governance', desc: 'Big 4 risk advisory, forensic accounting & global tax' },
      { id: 'brand-marketing', label: 'Growth Marketing & Product Management', desc: 'Performance marketing, CAC/LTV & omnichannel retail' }
    ]
  },
  {
    id: 'pure_sciences',
    name: 'Pure Sciences & Research',
    badge: 'B.Sc / BS-MS / Research',
    description: 'Mathematics, Physics, Chemistry, Statistics, Data Sciences & Scientific R&D',
    icon: Microscope,
    courses: [
      'B.Sc Mathematics & Statistics',
      'B.Sc Physics & Applied Optics',
      'B.Sc Chemistry & Material Science',
      'B.Sc Data Science & Computational Science',
      'Integrated BS-MS (IISER / NISER / Central Univ)',
      'Other Pure Science Course'
    ],
    defaultCertifications: ['R & Python for Scientific Computing', 'LaTeX Technical Publishing', 'NPTEL Deep Learning', 'CSIR-NET Aspirant'],
    cognitiveStrengthsPrompt: 'Calibrate your theoretical curiosity, proof rigor and statistical reasoning.',
    recommendedVectors: [
      { id: 'quantum-computing', label: 'Quantum Computing & Algorithms', desc: 'Qiskit, quantum simulation & post-quantum encryption' },
      { id: 'materials-nanotech', label: 'Advanced Materials & Nanotechnology', desc: 'Graphene, solid-state batteries & semiconductor alloys' },
      { id: 'data-actuarial', label: 'Actuarial & Quantitative Analytics', desc: 'Stochastic calculus, hedge funds & algorithmic risk' },
      { id: 'deep-space-astro', label: 'Astrophysics & Space Science', desc: 'Satellite telemetry, cosmology & ISRO/NASA research' }
    ]
  },
  {
    id: 'design',
    name: 'Design & Creative Media',
    badge: 'B.Des / B.Arch / Creative',
    description: 'UI/UX, Architecture, Digital Product Design, 3D Game Art, Animation & VFX',
    icon: Palette,
    courses: [
      'B.Arch (Architecture & Spatial Planning)',
      'B.Des UI/UX & Digital Product Design',
      'B.Des Graphic & Visual Communication',
      'B.Des Product & Industrial Design',
      'B.Sc Animation, Game Art & VFX',
      'Other Creative Design Course'
    ],
    defaultCertifications: ['Google UX Design Certificate', 'Figma Design System Mastery', 'Blender 3D Environment Art', 'Adobe Creative Suite Certified'],
    cognitiveStrengthsPrompt: 'Assess your visual empathy, divergent exploration and tactile prototyping.',
    recommendedVectors: [
      { id: 'spatial-ux', label: 'Spatial UX & XR Interfaces', desc: 'Apple Vision Pro, AR glasses & conversational design' },
      { id: 'sustainable-arch', label: 'Sustainable & Biophilic Architecture', desc: 'Zero-carbon buildings, BIM Revit & urban resilience' },
      { id: 'game-creative', label: '3D Game Art & Virtual Production', desc: 'Unreal Engine 5, virtual sets & real-time cinematic VFX' },
      { id: 'brand-identity', label: 'Global Brand Architecture & Systems', desc: 'Cross-platform visual languages & packaging design' }
    ]
  },
  {
    id: 'law',
    name: 'Law & Legal Studies',
    badge: 'B.A. LL.B / Corporate Law',
    description: 'Corporate Law, Constitutional Law, Intellectual Property, Cyber Law & Litigation',
    icon: Scale,
    courses: [
      'B.A. LL.B (5-Year Integrated Honors)',
      'B.B.A. LL.B (5-Year Corporate Law Track)',
      'LL.B (3-Year Professional Law Degree)',
      'CLAT / Pre-Law Foundation Track',
      'Other Legal Studies Course'
    ],
    defaultCertifications: ['WIPO Intellectual Property Certificate', 'Commercial Contract Drafting', 'Cyber Law & Data Privacy (GDPR)', 'Moot Court Finalist'],
    cognitiveStrengthsPrompt: 'Assess your adversarial argumentation, regulatory scrutiny and statutory precision.',
    recommendedVectors: [
      { id: 'corporate-ma-law', label: 'Corporate M&A & Securities Law', desc: 'Cross-border deals, SEBI regulations & private fund structuring' },
      { id: 'tech-cyber-law', label: 'AI, Tech & Cyber Law', desc: 'Digital Personal Data Protection Act, AI ethics & platform liability' },
      { id: 'ip-patent-litigation', label: 'Patent & Intellectual Property Law', desc: 'Pharma patent barriers, copyright tribunals & tech trademark' },
      { id: 'arbitration-dispute', label: 'International Commercial Arbitration', desc: 'Cross-jurisdictional dispute resolution & bilateral trade' }
    ]
  }
];

export const StudentOnboarding: React.FC<StudentOnboardingProps> = ({ onComplete }) => {
  const { student, setStudent } = usePrism();
  const [currentStep, setCurrentStep] = useState<number>(1);

  // ==========================================
  // TOP QUESTION: 12TH GRADE OR UG?
  // ==========================================
  const [educationStage, setEducationStage] = useState<'grade12' | 'ug'>('ug');

  // Student Basic Identity
  const [studentName, setStudentName] = useState(student.name || 'Arjun Swaminathan');
  const [studentAge, setStudentAge] = useState(student.age || (educationStage === 'grade12' ? 17 : 20));
  const [studentLocation, setStudentLocation] = useState(student.location || 'Chennai, Tamil Nadu');

  // ==========================================
  // 12TH GRADE DETAILS
  // ==========================================
  const [selected12Stream, setSelected12Stream] = useState<Grade12Stream>('Science — PCM + Computer Science');
  const [schoolName12, setSchoolName12] = useState('DAV Boys Senior Secondary School, Chennai');
  const [board12, setBoard12] = useState('CBSE');
  const [overall12Percentage, setOverall12Percentage] = useState<number>(88);
  const [stream12Marks, setStream12Marks] = useState<Record<string, number>>({
    'Physics': 88,
    'Chemistry': 84,
    'Mathematics': 92,
    'Computer Science': 95
  });
  const [preferredSubjects12, setPreferredSubjects12] = useState<string[]>(['Mathematics', 'Computer Science']);
  const [strengths12, setStrengths12] = useState<string[]>(['Analytical Problem Solving', 'Logic & Algorithms']);
  const [exams12, setExams12] = useState<string[]>(['JEE Main', 'BITSAT']);

  // Handle 12th stream change
  const handle12StreamChange = (stream: Grade12Stream) => {
    setSelected12Stream(stream);
    const cfg = GRADE12_STREAMS.find(s => s.id === stream) || GRADE12_STREAMS[0];
    const newMarks: Record<string, number> = {};
    cfg.subjects.forEach(subj => {
      newMarks[subj.name] = subj.defaultVal;
    });
    setStream12Marks(newMarks);
    setExams12(cfg.defaultExams.slice(0, 2));
  };

  // ==========================================
  // UG DETAILS (NO PERCENTAGE! CGPA ONLY!)
  // ==========================================
  const [selectedBranchId, setSelectedBranchId] = useState<AcademicBranchId>('engineering');
  const currentBranchConfig = useMemo(() => {
    return BRANCH_CONFIGS.find(b => b.id === selectedBranchId) || BRANCH_CONFIGS[0];
  }, [selectedBranchId]);

  const [selectedCourse, setSelectedCourse] = useState<string>(
    'B.E. / B.Tech Computer Science & Engineering (CSE)'
  );

  const [degreeLevel, setDegreeLevel] = useState<string>('Undergraduate (Degree)');
  const [currentYear, setCurrentYear] = useState<string>('3rd Year');
  const [currentSemester, setCurrentSemester] = useState<string>('Semester 6');
  const [institution, setInstitution] = useState<string>(
    student.location.includes('Chennai') ? 'Anna University (College of Engineering, Guindy)' : 'National Institute of Technology'
  );

  // UG Academic Performance (CGPA only, NO percentage sliders)
  const [overallCgpa, setOverallCgpa] = useState<number>(8.4);
  const [previousSemCgpa, setPreviousSemCgpa] = useState<number>(8.2);
  const [hasArrears, setHasArrears] = useState<boolean>(false);
  const [activeArrears, setActiveArrears] = useState<number>(0);
  const [clearedArrears, setClearedArrears] = useState<number>(0);

  // Additional Academic Indicators for UG
  const [certifications, setCertifications] = useState<string[]>([
    'Full Stack Web Development',
    'AWS Cloud Foundations'
  ]);
  const [newCertInput, setNewCertInput] = useState('');
  const [projectsCompleted, setProjectsCompleted] = useState<string>(
    'AI-powered Career Engine (React + TypeScript), Automated Attendance System'
  );
  const [internshipExperience, setInternshipExperience] = useState<string>('Completed 1 Summer Internship (3 Months)');
  const [skillLevel, setSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Industry Ready'>('Intermediate');
  const [improvementAreas, setImprovementAreas] = useState<string[]>([
    'Competitive Algorithmic Speed',
    'System Design Interviews'
  ]);

  // When branch changes in UG
  const handleBranchSelect = (branchId: AcademicBranchId) => {
    setSelectedBranchId(branchId);
    const cfg = BRANCH_CONFIGS.find(b => b.id === branchId) || BRANCH_CONFIGS[0];
    setSelectedCourse(cfg.courses[0]);
    setCertifications(cfg.defaultCertifications.slice(0, 2));

    if (branchId === 'engineering') {
      setImprovementAreas(['Competitive Algorithmic Speed', 'System Design Interviews']);
    } else if (branchId === 'medical') {
      setImprovementAreas(['Pharmacology Drug Memorization', 'Clinical Case Presentation']);
    } else if (branchId === 'commerce') {
      setImprovementAreas(['DCF Financial Modeling', 'Taxation Code Revisions']);
    } else if (branchId === 'arts') {
      setImprovementAreas(['Quantitative Econometrics', 'Long-form Policy Briefs']);
    } else if (branchId === 'pure_sciences') {
      setImprovementAreas(['Stochastic Mathematical Proofs', 'Lab Instrumentation Rigor']);
    } else if (branchId === 'design') {
      setImprovementAreas(['Interactive Micro-Animations', 'User Research Depth']);
    } else if (branchId === 'law') {
      setImprovementAreas(['Speed Case Law Citations', 'Oral Moot Argumentation']);
    }
  };

  // STEP 2: Calibrated Competencies & Cognitive Strengths
  const [cognitiveProfile, setCognitiveProfile] = useState({
    analyticalVsCreative: 'analytical' as 'analytical' | 'balanced' | 'creative',
    individualVsTeam: 'team' as 'individual' | 'balanced' | 'team',
    practicalVsTheoretical: 'practical' as 'practical' | 'balanced' | 'theoretical',
    pressureHandling: 85,
    deepFocusHours: 6,
    problemSolvingConfidence: 88,
    leadershipAspiration: 80,
    adaptabilityToChange: 84
  });

  // STEP 3: Domain Vectors & Industry Alignment
  const [selectedVectors, setSelectedVectors] = useState<string[]>([
    'gen-ai',
    'cloud-devops'
  ]);

  const toggleVector = (vecId: string) => {
    if (selectedVectors.includes(vecId)) {
      if (selectedVectors.length > 1) {
        setSelectedVectors(selectedVectors.filter(v => v !== vecId));
      }
    } else {
      setSelectedVectors([...selectedVectors, vecId]);
    }
  };

  // STEP 4: Career Horizon & Family Reality
  const [careerHorizon, setCareerHorizon] = useState({
    primaryGoal: 'High-Growth Tech Placement' as string,
    targetSalaryLPA: '12 - 18 LPA',
    placementTimeline: 'Immediate Campus Placement (Within 6 months)',
    higherStudyIntent: 'immediate-job' as 'immediate-job' | 'masters-soon' | 'research-phd',
    preferredWorkEnvironment: 'hybrid' as 'hybrid' | 'campus-lab' | 'office' | 'remote',
    locationPreference: 'all-india' as 'home-state' | 'all-india' | 'international-ready',
    familyAnnualBudgetLakhs: 6,
    familyFinancialFlexibility: 'moderate' as 'strict' | 'moderate' | 'high',
    riskAppetite: 'balanced' as 'conservative' | 'balanced' | 'high'
  });

  // Finish Onboarding
  const handleFinish = () => {
    const is12th = educationStage === 'grade12';

    // Academic score: For 12th it is overall %; for UG it is converted from CGPA (CGPA * 9.5)
    const calculatedPercent = is12th ? overall12Percentage : Math.round(overallCgpa * 9.5);

    // Dynamic skills object
    const skills = {
      programming: is12th ? (stream12Marks['Computer Science'] || 75) : 88,
      mathematics: is12th ? (stream12Marks['Mathematics'] || 85) : Math.round(overallCgpa * 10),
      communication: cognitiveProfile.individualVsTeam === 'team' ? 88 : 78,
      problemSolving: cognitiveProfile.problemSolvingConfidence,
      creativity: cognitiveProfile.analyticalVsCreative === 'creative' ? 90 : cognitiveProfile.analyticalVsCreative === 'balanced' ? 82 : 72,
      leadership: cognitiveProfile.leadershipAspiration,
      analyticalThinking: cognitiveProfile.analyticalVsCreative === 'analytical' ? 92 : 84,
      technologyInterest: 90
    };

    const degreeLabel = is12th 
      ? `Grade 12 (${selected12Stream})`
      : `${selectedCourse} • ${currentYear}`;

    const swotStrengths = is12th ? [
      `Solid 12th Grade baseline: ${overall12Percentage}% in ${selected12Stream}`,
      `High marks in core subjects: ${Object.entries(stream12Marks).map(([k, v]) => `${k} (${v}%)`).join(', ')}`,
      `Active preparation for entrance exams: ${exams12.join(', ')}`,
      `${cognitiveProfile.problemSolvingConfidence}% confidence in analytical aptitude`
    ] : [
      `Strong academic baseline: ${overallCgpa} CGPA in ${selectedCourse}`,
      `${institution} • ${currentYear}`,
      `${internshipExperience} with verified practical project execution`,
      `${cognitiveProfile.problemSolvingConfidence}% confidence in domain execution`
    ];

    const swotWeaknesses = is12th ? [
      'Transitioning from board curriculum to competitive entrance ranks',
      'Requires hands-on coding or practical lab exposure beyond textbooks'
    ] : (
      improvementAreas.length > 0 
        ? improvementAreas.map(area => `Growth frontier: ${area}`)
        : ['Needs expanded portfolio projects for tier-1 placement']
    );

    if (!is12th && hasArrears && activeArrears > 0) {
      swotWeaknesses.unshift(`Active standing backlogs (${activeArrears} subjects) require clearance prior to campus placement`);
    }

    const swotOpportunities = is12th ? [
      `Broad choice of premier undergraduate streams across ${selected12Stream}`,
      `Early alignment with high-demand career vectors: ${selectedVectors.join(', ')}`,
      `Eligible for top merit scholarships with ${overall12Percentage}% score`
    ] : [
      `Direct access to ${careerHorizon.targetSalaryLPA} campus recruitment`,
      `Verified professional certifications: ${certifications.join(', ')}`,
      `High hiring velocity in ${selectedCourse}`
    ];

    const swotThreats = [
      `Applicant density for premium ${careerHorizon.targetSalaryLPA} packages requires distinct project proof`,
      careerHorizon.familyFinancialFlexibility === 'strict'
        ? 'Limited financial buffer highlights need for immediate placement'
        : 'Rapid technological evolution requires continuous learning'
    ];

    setStudent({
      ...student,
      name: studentName,
      age: Number(studentAge),
      location: studentLocation,
      classDegree: degreeLabel,
      academicStream: is12th ? `12th Grade (${selected12Stream})` : `${currentBranchConfig.name} (${selectedCourse})`,
      educationLevel: is12th ? 'grade12' : 'custom_branch',
      academicScore: calculatedPercent,
      skills,
      interests: selectedVectors.map(v => {
        const item = currentBranchConfig.recommendedVectors.find(rv => rv.id === v);
        return item ? item.label : v;
      }),
      cognitivePreferences: {
        analyticalVsCreative: cognitiveProfile.analyticalVsCreative,
        individualVsTeam: cognitiveProfile.individualVsTeam,
        practicalVsTheoretical: cognitiveProfile.practicalVsTheoretical,
        stabilityPreference: careerHorizon.riskAppetite === 'conservative' ? 'high' : 'moderate',
        innovationPreference: 'high',
        workEnvironment: careerHorizon.preferredWorkEnvironment,
        higherStudyPreference: careerHorizon.higherStudyIntent
      },
      swot: {
        strengths: swotStrengths,
        weaknesses: swotWeaknesses,
        opportunities: swotOpportunities,
        threats: swotThreats
      }
    });

    onComplete();
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-950/70 border border-rose-800/60 text-rose-300 text-xs font-semibold mb-3 shadow-md shadow-rose-950/50">
            <PathWiseSymbol className="w-4 h-4" />
            <span>PATHWISE ENGINE • 4-STEP CALIBRATION</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Calibrate Your Evidence-Based STEAM Vector
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Tell us whether you completed 12th Grade or are pursuing an Undergraduate degree to construct your tailored career trajectory.
          </p>

          {/* Stepper Progress Bar */}
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2 z-0" />
              <div 
                className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#9f1239] via-[#e11d48] to-[#f43f5e] -translate-y-1/2 z-0 transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              />

              {[
                { step: 1, title: educationStage === 'grade12' ? '12th Grade Marks' : 'UG Academic Details', icon: GraduationCap },
                { step: 2, title: 'Competencies', icon: Brain },
                { step: 3, title: 'Domain Vectors', icon: Target },
                { step: 4, title: 'Reality & Horizon', icon: SlidersHorizontal }
              ].map(({ step, title, icon: Icon }) => {
                const isActive = currentStep === step;
                const isPassed = currentStep > step;

                return (
                  <button
                    key={step}
                    onClick={() => {
                      if (step < currentStep) setCurrentStep(step);
                    }}
                    className={`relative z-10 flex flex-col items-center group ${
                      step <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-md ${
                      isActive 
                        ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white ring-4 ring-rose-500/20 scale-110 shadow-rose-950/60'
                        : isPassed
                        ? 'bg-rose-800 text-white'
                        : 'bg-slate-900 text-slate-500 border border-slate-800'
                    }`}>
                      {isPassed ? <Check className="w-5 h-5 text-white" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <span className={`mt-2 text-xs font-semibold ${
                      isActive ? 'text-rose-400' : isPassed ? 'text-slate-300' : 'text-slate-500'
                    }`}>
                      {title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* STEP 1: 12TH GRADE OR UG */}
        {currentStep === 1 && (
          <div className="space-y-8 animate-fadeIn">
            {/* Basic Info Ribbon */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg backdrop-blur-sm">
              <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-2">
                <User className="w-4 h-4" /> Personal Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    placeholder="e.g. Arjun Swaminathan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Age</label>
                  <input
                    type="number"
                    value={studentAge}
                    onChange={(e) => setStudentAge(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    placeholder="e.g. 18 or 21"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={studentLocation}
                    onChange={(e) => setStudentLocation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    placeholder="e.g. Chennai, Tamil Nadu"
                  />
                </div>
              </div>
            </div>

            {/* TOP QUESTION: HAS THE PERSON FINISHED 12TH OR UG? */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="mb-4 pb-3 border-b border-slate-800">
                <div className="text-xs font-bold uppercase tracking-wider text-purple-400">Step 1 • Academic Level</div>
                <h2 className="text-xl font-bold text-white mt-0.5">
                  Have you finished / in 12th Grade or an Undergraduate (UG) student?
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Select your current status to customize marks capture and pathway mapping.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 12th Grade Option */}
                <button
                  type="button"
                  onClick={() => setEducationStage('grade12')}
                  className={`text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    educationStage === 'grade12'
                      ? 'bg-purple-950/50 border-purple-500 ring-2 ring-purple-500/30 shadow-lg shadow-purple-950/50'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      educationStage === 'grade12' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300'
                    }`}>
                      <School className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                      educationStage === 'grade12' ? 'bg-purple-900 text-purple-200 border border-purple-500/40' : 'bg-slate-800 text-slate-400'
                    }`}>
                      Pre-College / 12th
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">Finished 12th / Grade 12 Student</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Capture 12th Board marks (PCM / PCB / Commerce / Arts), cutoffs, and competitive entrance goals.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className={educationStage === 'grade12' ? 'text-purple-300 font-semibold' : 'text-slate-500'}>
                      Requires 12th marks &amp; stream
                    </span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      educationStage === 'grade12' ? 'border-purple-400 bg-purple-500 text-white' : 'border-slate-700'
                    }`}>
                      {educationStage === 'grade12' && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                </button>

                {/* Undergraduate (UG) Option */}
                <button
                  type="button"
                  onClick={() => setEducationStage('ug')}
                  className={`text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    educationStage === 'ug'
                      ? 'bg-purple-950/50 border-purple-500 ring-2 ring-purple-500/30 shadow-lg shadow-purple-950/50'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      educationStage === 'ug' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300'
                    }`}>
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                      educationStage === 'ug' ? 'bg-purple-900 text-purple-200 border border-purple-500/40' : 'bg-slate-800 text-slate-400'
                    }`}>
                      College Degree / UG
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">Undergraduate (UG Student)</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    B.E. / B.Tech, MBBS, B.Com, B.A., B.Sc, etc. Evaluated via branch, course, CGPA &amp; backlogs (no subject percentages).
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className={educationStage === 'ug' ? 'text-purple-300 font-semibold' : 'text-slate-500'}>
                      CGPA only • No percentage sliders
                    </span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      educationStage === 'ug' ? 'border-purple-400 bg-purple-500 text-white' : 'border-slate-700'
                    }`}>
                      {educationStage === 'ug' && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* ==============================================================
                BRANCH 1: IF THE PERSON FINISHED 12TH GRADE -> GET MARKS & DETAILS
               ============================================================== */}
            {educationStage === 'grade12' && (
              <div className="space-y-6">
                {/* 12th Stream Selection */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-purple-400">12th Grade Stream</div>
                      <h3 className="text-lg font-bold text-white mt-0.5">Select Your 12th Group / Stream</h3>
                    </div>
                    <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
                      Determines required subject marks
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {GRADE12_STREAMS.map((str) => {
                      const isSelected = selected12Stream === str.id;
                      return (
                        <button
                          key={str.id}
                          type="button"
                          onClick={() => handle12StreamChange(str.id)}
                          className={`text-left p-4 rounded-xl border transition-all ${
                            isSelected
                              ? 'bg-purple-950/60 border-purple-500 ring-2 ring-purple-500/20 text-white shadow-md'
                              : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-bold text-sm">{str.id}</span>
                            {isSelected && <Check className="w-4 h-4 text-purple-400" />}
                          </div>
                          <p className="text-[11px] text-slate-400">{str.name}</p>
                        </button>
                      );
                    })}
                  </div>

                  {/* School & Board */}
                  <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">School / Junior College Name</label>
                      <input
                        type="text"
                        value={schoolName12}
                        onChange={(e) => setSchoolName12(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                        placeholder="e.g. DAV Senior Secondary School"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Board of Examination</label>
                      <select
                        value={board12}
                        onChange={(e) => setBoard12(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="CBSE">CBSE (Central Board of Secondary Education)</option>
                        <option value="ICSE / ISC">ISC / ICSE (Council for the Indian School Certificate)</option>
                        <option value="State Board">State Board (Tamil Nadu, Maharashtra, Karnataka, etc.)</option>
                        <option value="International (IB / Cambridge)">International (IB / Cambridge IGCSE/A-Levels)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 12th Subject Marks Sliders */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-purple-400">12th Grade Academic Marks</div>
                      <h3 className="text-lg font-bold text-white mt-0.5">Subject Percentage Scores for {selected12Stream}</h3>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1 rounded-lg">
                      <span className="text-xs text-slate-400 font-semibold">Overall 12th %:</span>
                      <input
                        type="number"
                        min="40"
                        max="100"
                        value={overall12Percentage}
                        onChange={(e) => setOverall12Percentage(Number(e.target.value))}
                        className="w-14 text-sm font-black bg-transparent border-b border-purple-500 text-purple-300 text-center focus:outline-none"
                      />
                      <span className="text-xs text-purple-400 font-bold">%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(stream12Marks).map(([subj, val]) => (
                      <div key={subj} className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-semibold text-slate-200">{subj}</span>
                          <span className="text-xs font-bold text-purple-400 bg-purple-950/80 border border-purple-800/80 px-2 py-0.5 rounded">
                            {val}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="40"
                          max="100"
                          value={val}
                          onChange={(e) => {
                            setStream12Marks({
                              ...stream12Marks,
                              [subj]: Number(e.target.value)
                            });
                          }}
                          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Competitive Exams */}
                  <div className="mt-5 pt-4 border-t border-slate-800">
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Competitive Exam Preparation (Targeting / Cleared)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['JEE Main', 'JEE Advanced', 'NEET (UG)', 'CUET', 'BITSAT', 'NDA', 'CLAT', 'State CET'].map((exam) => {
                        const isSelected = exams12.includes(exam);
                        return (
                          <button
                            key={exam}
                            type="button"
                            onClick={() => {
                              if (isSelected) setExams12(exams12.filter(e => e !== exam));
                              else setExams12([...exams12, exam]);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                              isSelected
                                ? 'bg-purple-900/60 border-purple-500 text-purple-200'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {isSelected ? `✓ ${exam}` : `+ ${exam}`}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ==============================================================
                BRANCH 2: IF THE PERSON IS UG -> REMOVE ACADEMIC PERCENTAGE!
               ============================================================== */}
            {educationStage === 'ug' && (
              <div className="space-y-6">
                {/* 1. WHICH BRANCH? */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-purple-400">UG Step 1A • Primary Field</div>
                      <h3 className="text-lg font-bold text-white mt-0.5">Which Academic Branch are you in?</h3>
                    </div>
                    <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
                      Select 1 discipline
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {BRANCH_CONFIGS.map((branch) => {
                      const Icon = branch.icon;
                      const isSelected = selectedBranchId === branch.id;

                      return (
                        <button
                          key={branch.id}
                          type="button"
                          onClick={() => handleBranchSelect(branch.id)}
                          className={`text-left p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                            isSelected
                              ? 'bg-purple-950/40 border-purple-500 ring-2 ring-purple-500/30 shadow-lg shadow-purple-950/50'
                              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                                isSelected ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300'
                              }`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                                isSelected ? 'bg-purple-900/70 text-purple-200 border border-purple-500/40' : 'bg-slate-800 text-slate-400'
                              }`}>
                                {branch.badge}
                              </span>
                            </div>
                            <h4 className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                              {branch.name}
                            </h4>
                            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                              {branch.description}
                            </p>
                          </div>

                          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                            <span className={isSelected ? 'text-purple-300 font-semibold' : 'text-slate-500'}>
                              {branch.courses.length} courses
                            </span>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-purple-400 bg-purple-500 text-white' : 'border-slate-700'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. WHICH COURSE? */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-purple-400">UG Step 1B • Specific Degree</div>
                      <h3 className="text-lg font-bold text-white mt-0.5">Which Course or Degree in {currentBranchConfig.name}?</h3>
                    </div>
                    <span className="text-xs text-purple-300 bg-purple-950/60 px-2.5 py-1 rounded-full border border-purple-800/50">
                      {currentBranchConfig.name}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {currentBranchConfig.courses.map((course) => {
                      const isSelected = selectedCourse === course;
                      return (
                        <button
                          key={course}
                          type="button"
                          onClick={() => setSelectedCourse(course)}
                          className={`text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-purple-950/50 border-purple-500 text-white ring-1 ring-purple-500/40 shadow-sm'
                              : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-purple-400 bg-purple-500 text-white' : 'border-slate-700'
                            }`}>
                              {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                            </div>
                            <span className="text-xs sm:text-sm font-medium">{course}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Institution and Year */}
                  <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Current Year</label>
                      <select
                        value={currentYear}
                        onChange={(e) => setCurrentYear(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="Final Year (4th Year)">Final Year (4th Year)</option>
                        <option value="Graduated">Graduated</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Current Semester</label>
                      <select
                        value={currentSemester}
                        onChange={(e) => setCurrentSemester(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="Semester 1">Semester 1</option>
                        <option value="Semester 2">Semester 2</option>
                        <option value="Semester 3">Semester 3</option>
                        <option value="Semester 4">Semester 4</option>
                        <option value="Semester 5">Semester 5</option>
                        <option value="Semester 6">Semester 6</option>
                        <option value="Semester 7">Semester 7</option>
                        <option value="Semester 8">Semester 8</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">College / University</label>
                      <input
                        type="text"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                        placeholder="e.g. Anna University, IIT, DU"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. UG ACADEMIC PERFORMANCE (CGPA ONLY, NO PERCENTAGE SLIDERS!) */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-purple-400">UG Performance Metrics</div>
                      <h3 className="text-lg font-bold text-white mt-0.5">CGPA &amp; Standing History (No Percentage Required)</h3>
                    </div>
                    <span className="text-xs text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/50">
                      Standard 10-Point CGPA Scale
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Cumulative CGPA</label>
                      <div className="flex items-baseline gap-2">
                        <input
                          type="number"
                          step="0.05"
                          min="4"
                          max="10"
                          value={overallCgpa}
                          onChange={(e) => setOverallCgpa(Number(e.target.value))}
                          className="text-2xl font-black bg-transparent border-b border-purple-500 w-24 text-white focus:outline-none"
                        />
                        <span className="text-xs text-slate-400">/ 10.0</span>
                      </div>
                      <p className="text-[11px] text-emerald-400 mt-2 font-medium">
                        {overallCgpa >= 8.5 ? '🌟 First Class with Distinction' : overallCgpa >= 7.5 ? '✓ First Class' : 'Second Class'}
                      </p>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Previous Semester CGPA</label>
                      <div className="flex items-baseline gap-2">
                        <input
                          type="number"
                          step="0.05"
                          min="4"
                          max="10"
                          value={previousSemCgpa}
                          onChange={(e) => setPreviousSemCgpa(Number(e.target.value))}
                          className="text-2xl font-black bg-transparent border-b border-slate-700 w-24 text-white focus:outline-none focus:border-purple-500"
                        />
                        <span className="text-xs text-slate-400">/ 10.0</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-2">Previous term consistency</p>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-semibold text-slate-400">Arrears / Backlogs</label>
                        <button
                          type="button"
                          onClick={() => setHasArrears(!hasArrears)}
                          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            !hasArrears ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}
                        >
                          {hasArrears ? 'Has Backlogs' : 'Zero Arrears'}
                        </button>
                      </div>

                      {hasArrears ? (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div>
                            <label className="block text-[10px] text-slate-400">Cleared</label>
                            <input
                              type="number"
                              min="0"
                              value={clearedArrears}
                              onChange={(e) => setClearedArrears(Number(e.target.value))}
                              className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-amber-400">Active</label>
                            <input
                              type="number"
                              min="0"
                              value={activeArrears}
                              onChange={(e) => setActiveArrears(Number(e.target.value))}
                              className="w-full bg-amber-950/40 border border-amber-700/60 rounded px-2 py-1 text-xs text-amber-200"
                            />
                          </div>
                        </div>
                      ) : (
                        <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Clean academic standing
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 4. PRACTICAL READINESS & EXPERIENCE (NO SUBJECT PERCENTAGE SLIDERS!) */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <div className="mb-4 pb-3 border-b border-slate-800">
                    <div className="text-xs font-bold uppercase tracking-wider text-purple-400">UG Experience &amp; Practical Indicators</div>
                    <h3 className="text-lg font-bold text-white mt-0.5">
                      Certifications, Projects &amp; Internship Milestones
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {/* Certifications */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-2">
                        Professional &amp; Technical Certifications
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {certifications.map((cert) => (
                          <span
                            key={cert}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-950/70 text-purple-200 border border-purple-800/60"
                          >
                            <Award className="w-3.5 h-3.5 text-purple-400" />
                            {cert}
                            <button
                              type="button"
                              onClick={() => setCertifications(certifications.filter(c => c !== cert))}
                              className="hover:text-red-400 ml-1 text-slate-400"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2 max-w-md">
                        <input
                          type="text"
                          placeholder="Add certification (e.g. AWS, NPTEL, GCP)"
                          value={newCertInput}
                          onChange={(e) => setNewCertInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && newCertInput.trim()) {
                              e.preventDefault();
                              if (!certifications.includes(newCertInput.trim())) {
                                setCertifications([...certifications, newCertInput.trim()]);
                              }
                              setNewCertInput('');
                            }
                          }}
                          className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white flex-1 focus:outline-none focus:border-purple-500"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newCertInput.trim() && !certifications.includes(newCertInput.trim())) {
                              setCertifications([...certifications, newCertInput.trim()]);
                              setNewCertInput('');
                            }
                          }}
                          className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Projects */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Completed Engineering / Domain Projects
                      </label>
                      <input
                        type="text"
                        value={projectsCompleted}
                        onChange={(e) => setProjectsCompleted(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                        placeholder="e.g. AI Career Predictor, Autonomous Rover, Clinical Case Survey"
                      />
                    </div>

                    {/* Internship & Skill Level */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Internship Experience
                        </label>
                        <select
                          value={internshipExperience}
                          onChange={(e) => setInternshipExperience(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                        >
                          <option value="No internships yet (Seeking 1st)">No internships yet (Seeking 1st)</option>
                          <option value="Completed 1 Summer Internship (1-3 Months)">Completed 1 Summer Internship (1-3 Months)</option>
                          <option value="Completed 2+ Technical Internships">Completed 2+ Technical Internships</option>
                          <option value="Ongoing Long-Term Corporate Internship">Ongoing Long-Term Corporate Internship</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Practical Industry Readiness Level
                        </label>
                        <select
                          value={skillLevel}
                          onChange={(e) => setSkillLevel(e.target.value as any)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                        >
                          <option value="Beginner">Beginner • Academic theory only</option>
                          <option value="Intermediate">Intermediate • Builds projects independently</option>
                          <option value="Advanced">Advanced • Production-grade code / domain depth</option>
                          <option value="Industry Ready">Industry Ready • Interview &amp; placement prepped</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Button for Step 1 */}
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-900/40 transition-all cursor-pointer"
              >
                Continue to Step 2: Calibrate Competencies
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: COMPETENCIES & COGNITIVE STRENGTHS */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-400">Step 2 • Cognitive Calibration</div>
                  <h2 className="text-xl font-bold text-white mt-0.5">
                    How You Think &amp; Solve Problems
                  </h2>
                </div>
                <span className="text-xs text-purple-300 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-800/50">
                  {educationStage === 'grade12' ? `12th Grade (${selected12Stream})` : selectedCourse}
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                {educationStage === 'grade12'
                  ? 'Assess your foundation logic, mathematical reasoning and problem-solving confidence.'
                  : currentBranchConfig.cognitiveStrengthsPrompt}
              </p>

              <div className="space-y-6">
                {/* Analytical vs Creative */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-slate-300">Cognitive Approach Mode</span>
                    <span className="text-xs font-bold text-purple-400 capitalize">{cognitiveProfile.analyticalVsCreative}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(['analytical', 'balanced', 'creative'] as const).map(mode => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setCognitiveProfile({ ...cognitiveProfile, analyticalVsCreative: mode })}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                          cognitiveProfile.analyticalVsCreative === mode
                            ? 'bg-purple-950 border-purple-500 text-purple-200'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {mode === 'analytical' ? '🔬 Rigorous & Analytical' : mode === 'balanced' ? '⚖️ Balanced Integrator' : '💡 Creative & Divergent'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Collaboration Style */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-slate-300">Execution Dynamic</span>
                    <span className="text-xs font-bold text-purple-400 capitalize">{cognitiveProfile.individualVsTeam}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(['individual', 'balanced', 'team'] as const).map(style => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => setCognitiveProfile({ ...cognitiveProfile, individualVsTeam: style })}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                          cognitiveProfile.individualVsTeam === style
                            ? 'bg-purple-950 border-purple-500 text-purple-200'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {style === 'individual' ? '👤 Deep Solo Focus' : style === 'balanced' ? '🤝 Flexible Co-Worker' : '👥 High-Impact Team Leader'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Confidence Sliders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-slate-300">Complex Problem-Solving Confidence</span>
                      <span className="text-xs font-bold text-purple-400">{cognitiveProfile.problemSolvingConfidence}%</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={cognitiveProfile.problemSolvingConfidence}
                      onChange={(e) => setCognitiveProfile({ ...cognitiveProfile, problemSolvingConfidence: Number(e.target.value) })}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-slate-300">High-Pressure Resilience</span>
                      <span className="text-xs font-bold text-purple-400">{cognitiveProfile.pressureHandling}%</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={cognitiveProfile.pressureHandling}
                      onChange={(e) => setCognitiveProfile({ ...cognitiveProfile, pressureHandling: Number(e.target.value) })}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Step 1
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-900/40"
              >
                Continue to Step 3: Domain Vectors
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DOMAIN VECTORS & INDUSTRY ALIGNMENT */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-400">Step 3 • Future Trajectory</div>
                  <h2 className="text-xl font-bold text-white mt-0.5">
                    Select Your High-Growth Career Vectors
                  </h2>
                </div>
                <span className="text-xs text-slate-400">
                  Select 2 to 4 focus vectors
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                PRISM maps your academic foundation to market intelligence, hiring velocity and compensation trends.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentBranchConfig.recommendedVectors.map((vec) => {
                  const isSelected = selectedVectors.includes(vec.id);

                  return (
                    <button
                      key={vec.id}
                      type="button"
                      onClick={() => toggleVector(vec.id)}
                      className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                        isSelected
                          ? 'bg-purple-950/50 border-purple-500 ring-2 ring-purple-500/20 shadow-md'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <h4 className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                          {vec.label}
                        </h4>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                          isSelected ? 'border-purple-400 bg-purple-500 text-white' : 'border-slate-700'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                        {vec.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Competencies
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-900/40"
              >
                Continue to Step 4: Reality &amp; Horizon
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CAREER HORIZON & FAMILY REALITY */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-400">Step 4 • Practical Alignment</div>
                  <h2 className="text-xl font-bold text-white mt-0.5">
                    Career Horizon, Financial Feasibility &amp; Family Alignment
                  </h2>
                </div>
                <span className="text-xs text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/50">
                  Prism Reality Engine
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Anchors your goals against compensation tiers, family budgets, and practical career milestones.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Target Salary Band */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Target Starting Compensation Band
                  </label>
                  <select
                    value={careerHorizon.targetSalaryLPA}
                    onChange={(e) => setCareerHorizon({ ...careerHorizon, targetSalaryLPA: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="6 - 10 LPA">₹6 - 10 LPA • Consistent Core / Product Tier</option>
                    <option value="12 - 18 LPA">₹12 - 18 LPA • High-Growth Tech &amp; Finance Tier</option>
                    <option value="20 - 32 LPA">₹20 - 32 LPA • Premium R&amp;D / Global Product Tier</option>
                    <option value="35+ LPA / Global">₹35+ LPA / Global Remote</option>
                  </select>
                </div>

                {/* Immediate vs Higher Study */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Next Step Priority
                  </label>
                  <select
                    value={careerHorizon.higherStudyIntent}
                    onChange={(e) => setCareerHorizon({ ...careerHorizon, higherStudyIntent: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="immediate-job">Immediate Campus Placement / Employment</option>
                    <option value="masters-soon">Masters within 1-2 Years (MS / M.Tech / MBA)</option>
                    <option value="research-phd">Doctoral / Deep Research Specialization</option>
                  </select>
                </div>

                {/* Work Environment */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Preferred Work Environment
                  </label>
                  <select
                    value={careerHorizon.preferredWorkEnvironment}
                    onChange={(e) => setCareerHorizon({ ...careerHorizon, preferredWorkEnvironment: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="hybrid">Hybrid (Collaborative Office + Remote)</option>
                    <option value="office">On-Site Corporate / Tech Park</option>
                    <option value="campus-lab">R&amp;D Lab / Clinical Facility</option>
                    <option value="remote">Fully Distributed / Remote</option>
                  </select>
                </div>

                {/* Location Mobility */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Location Mobility
                  </label>
                  <select
                    value={careerHorizon.locationPreference}
                    onChange={(e) => setCareerHorizon({ ...careerHorizon, locationPreference: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="all-india">Pan-India (Bengaluru, Hyderabad, Chennai, Pune, Delhi NCR)</option>
                    <option value="home-state">Home State / Regional Center</option>
                    <option value="international-ready">International Ready (US / Europe / Singapore / Gulf)</option>
                  </select>
                </div>
              </div>

              {/* Family Budget Section */}
              <div className="mt-5 p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-slate-300">
                    Annual Family Education &amp; Upskilling Budget
                  </span>
                  <span className="text-xs font-bold text-purple-400">
                    ₹{careerHorizon.familyAnnualBudgetLakhs} Lakhs / Year
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={careerHorizon.familyAnnualBudgetLakhs}
                  onChange={(e) => setCareerHorizon({ ...careerHorizon, familyAnnualBudgetLakhs: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>₹1 Lakh (Scholarship Critical)</span>
                  <span>₹6 Lakhs (Balanced)</span>
                  <span>₹25 Lakhs (High Mobility)</span>
                </div>
              </div>
            </div>

            {/* Profile Summary Card */}
            <div className="bg-gradient-to-br from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-500/30 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <PathWiseSymbol className="w-10 h-10 shrink-0" />
                <div>
                  <div className="flex items-center gap-2 text-purple-300 text-xs font-bold">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    READY TO SYNTHESIZE STUDENT VECTOR
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">
                    {studentName} • {educationStage === 'grade12' ? `12th Grade (${selected12Stream})` : `${selectedCourse} (${currentYear})`}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {educationStage === 'grade12' ? `${overall12Percentage}% Overall 12th Marks` : `${overallCgpa} CGPA (No % required)`} • Target: {careerHorizon.targetSalaryLPA}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleFinish}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 hover:from-purple-500 hover:to-indigo-500 text-white shadow-xl shadow-purple-900/50 transition-all cursor-pointer"
                >
                  GENERATE MY PRISM VECTOR
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
