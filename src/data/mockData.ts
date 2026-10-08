import { 
  StudentProfile, 
  FamilyProfile, 
  CareerOption, 
  ExamInfo, 
  ScholarshipInfo, 
  ExpertProfile, 
  Appointment, 
  CounsellorStudentItem,
  ParentCoursePreference 
} from '../types';

export const DEFAULT_STUDENT: StudentProfile = {
  id: 'student-arjun-01',
  name: 'Arjun Swaminathan',
  age: 18,
  location: 'Chennai, Tamil Nadu',
  classDegree: 'Grade 12 (Science — PCM + Computer Science)',
  academicStream: 'Science — PCM + Computer Science',
  educationLevel: 'grade12',
  grade12Details: {
    streamGroup: 'Science — PCM + Computer Science',
    subjectMarks: {
      physics: 88,
      chemistry: 84,
      mathematics: 92,
      computerScience: 94
    },
    preferredSubjects: ['Mathematics', 'Computer Science'],
    academicStrengths: ['Analytical Problem Solving', 'Algorithmic Logic'],
    competitiveExams: ['JEE (Main & Advanced)']
  },
  beBtechDetails: {
    branch: 'CSE / IT / AI&DS / AI&ML',
    currentYear: '3rd Year',
    currentSemester: 'Semester 6',
    college: 'College of Engineering, Guindy (Anna University)',
    currentCgpa: 8.4,
    previousSemCgpa: 8.2,
    overallCgpa: 8.35,
    currentSemPercentage: 80,
    hasArrears: false,
    totalArrears: 0,
    clearedArrears: 0,
    activeArrears: 0,
    currentBacklogs: 0,
    branchSubjects: {
      'Programming': 90,
      'Data Structures': 88,
      'DBMS': 84,
      'Algorithms': 86,
      'Mathematics': 89
    },
    certifications: ['AWS Cloud Practitioner', 'NPTEL Python for Data Science'],
    projectsCompleted: '2 Completed: Smart Traffic Analytics, Fullstack MERN Portal',
    internshipExperience: '2-Month Summer Intern at SaaS Startup',
    skillLevel: 'Intermediate',
    areasNeedingImprovement: ['System Design', 'Interview DSA Optimization']
  },
  subjects: ['Physics', 'Mathematics', 'Chemistry', 'Computer Science', 'English'],
  academicScore: 89,
  skills: {
    programming: 82,
    mathematics: 91,
    communication: 68,
    problemSolving: 91,
    creativity: 74,
    leadership: 65,
    analyticalThinking: 88,
    technologyInterest: 94,
  },
  interests: ['Artificial Intelligence', 'Competitive Coding', 'Applied Robotics', 'Data Science', 'Automated Systems'],
  cognitivePreferences: {
    analyticalVsCreative: 'analytical',
    individualVsTeam: 'balanced',
    practicalVsTheoretical: 'practical',
    stabilityPreference: 'moderate',
    innovationPreference: 'high',
    workEnvironment: 'hybrid',
    higherStudyPreference: 'masters-soon',
  },
  swot: {
    strengths: [
      'Strong analytical thinking (88th percentile)',
      'High mathematical foundations & algorithmic logic (91%)',
      'High technology & AI curiosity (94%)',
      'Self-driven learner in Python and computational problem-solving'
    ],
    weaknesses: [
      'Technical communication & public presentation gap (68%)',
      'Limited real-world production project deployments',
      'Hesitation in multi-stakeholder negotiation'
    ],
    opportunities: [
      'Explosive AI/ML adoption across Chennai, Bengaluru & Hyderabad tech corridors',
      'State-backed semiconductor and deep-tech innovation initiatives',
      'Abundant merit scholarships for top percentile STEM candidates'
    ],
    threats: [
      'Intense entrance examination cut-offs for Tier-1 public institutes',
      'Fast-evolving tooling requiring continuous full-stack upskilling',
      'Risk of degree inflation in generic undergraduate engineering'
    ]
  }
};

export const DEFAULT_FAMILY: FamilyProfile = {
  annualBudgetLakhs: 4.5, // ₹4,50,000/year
  financialFlexibility: 'moderate',
  preferredLocation: 'home-state', // Southern India / Home state
  scholarshipDependency: 'preferred',
  riskAppetite: 'balanced',
  parentPreferredDomains: ['Computer Science Engineering', 'Electronics & Communication', 'Mechanical/Automobile'],
  parentStabilityPreference: 'high',
  higherEducationExpectation: 'bachelors-enough',
  expectedOutcome: 'high-starting-package'
};

export const CAREER_DATABASE: CareerOption[] = [
  {
    id: 'ai-ml-engineer',
    title: 'AI / Machine Learning Engineer',
    category: 'AI & Data',
    description: 'Design and deploy deep learning models, generative AI architectures, and neural computing pipelines solving complex automated reasoning tasks.',
    matchScore: 92,
    scores: {
      studentFit: 95,
      financialFit: 87,
      marketDemand: 94,
      geographicOpportunity: 90,
      skillReadiness: 82,
      conflictIndex: 28, // Low conflict with engineering background
    },
    salaryRange: '₹8.5 LPA - ₹24 LPA',
    hiringVelocity: 'Critical',
    requiredSkills: ['Linear Algebra & Calculus', 'Python / PyTorch', 'Data Structures & Algorithms', 'Machine Learning System Design', 'MLOps'],
    studentSkillsMatched: ['Advanced Mathematics (91%)', 'Analytical Problem Solving (88%)', 'Python Foundations (82%)'],
    skillGap: ['MLOps Deployment (Docker/Kubernetes)', 'Deep Learning Frameworks (PyTorch)', 'Technical Documentation'],
    whyRecommended: {
      studentReason: 'Exceptional mathematical rigor (91%) and analytical problem solving (88%) create the ideal cognitive substrate for deep learning theory.',
      familyReason: 'Fits comfortably within the ₹4.5L/year budget through premier autonomous state colleges (Anna Univ/SSN/PSG) or NITs with high starting packages (₹12+ LPA).',
      marketReason: 'Critical hiring velocity in regional southern hubs (Bengaluru, Chennai, Hyderabad) with 34% projected 5-year hiring surge.',
      skillReason: '82% foundational readiness; manageable gap in specialized deployment tools that can be acquired through targeted university mini-projects.',
      synthesis: 'PRISM recommends this pathway because your strengths and interests align strongly with the mathematical and computational profile, the education pathway is financially feasible across both autonomous and premier state routes, and high market demand guarantees strong starting ROI.'
    },
    educationTiers: [
      {
        type: 'Low-Cost Pathway',
        institutionCategory: 'State Autonomous / Govt Engineering Colleges (e.g. CEG Anna Univ, MIT, PSG Tech)',
        annualFeeLakhs: 0.85,
        totalDegreeCostLakhs: 3.4,
        scholarshipFeasibility: 'High eligibility for State First-Graduate & Pragati schemes',
        riskAssessment: 'Low Risk',
        recommendedExams: ['TNEA (Merit-based admission)', 'JEE Main']
      },
      {
        type: 'Moderate-Cost Pathway',
        institutionCategory: 'Premier Autonomous Private Universities (SSN, Amrita, SASTRA, PES)',
        annualFeeLakhs: 2.75,
        totalDegreeCostLakhs: 11.0,
        scholarshipFeasibility: 'Merit-cum-means tuition waiver (25% to 50% for >90% marks)',
        riskAssessment: 'Moderate Risk',
        recommendedExams: ['JEE Main', 'Institutional Entrance Tests']
      },
      {
        type: 'Premium Pathway',
        institutionCategory: 'Top National Institutes / BITS Pilani / International 2+2 Dual Degrees',
        annualFeeLakhs: 5.5,
        totalDegreeCostLakhs: 22.0,
        scholarshipFeasibility: 'Corporate CSR & Institute Merit Fellowships',
        riskAssessment: 'High Financial Strain',
        recommendedExams: ['JEE Advanced', 'BITSAT']
      }
    ],
    educationTimeline: [
      { step: 'Stage 1', action: 'Undergraduate Degree', duration: 'Years 1 - 4', details: 'B.Tech / B.E. in Computer Science or Artificial Intelligence & Data Science' },
      { step: 'Stage 2', action: 'Core Skill Development', duration: 'Semesters 3 - 5', details: 'Master Linear Algebra, Probability, PyTorch, and Data Structures' },
      { step: 'Stage 3', action: 'Applied Projects', duration: 'Semesters 5 - 6', details: 'Build end-to-end computer vision and NLP models hosted on Hugging Face / GitHub' },
      { step: 'Stage 4', action: 'Industrial Internship', duration: 'Summer / Sem 7', details: '6-month apprenticeship at tech startups or deep-tech product labs in Bengaluru/Chennai' },
      { step: 'Stage 5', action: 'Placement / Specialization', duration: 'Sem 8', details: 'Campus recruitment for Junior AI Engineer or optional direct M.Tech/MS route' }
    ],
    regionalHotspots: ['Bengaluru (Very High)', 'Chennai (High)', 'Hyderabad (Very High)', 'Pune (High)']
  },
  {
    id: 'data-science-systems',
    title: 'Data Science & Big Data Systems',
    category: 'AI & Data',
    description: 'Transform massive enterprise and sensor datasets into predictive business intelligence, automated inference engines, and real-time streaming architectures.',
    matchScore: 87,
    scores: {
      studentFit: 91,
      financialFit: 89,
      marketDemand: 90,
      geographicOpportunity: 88,
      skillReadiness: 80,
      conflictIndex: 22,
    },
    salaryRange: '₹7.5 LPA - ₹20 LPA',
    hiringVelocity: 'High',
    requiredSkills: ['Applied Statistics & Calculus', 'SQL & Distributed Storage', 'Python / R Data Ecosystem', 'Data Visualization', 'Cloud Warehousing (BigQuery/Snowflake)'],
    studentSkillsMatched: ['Mathematics (91%)', 'Analytical Reasoning (88%)', 'Structured Logic (82%)'],
    skillGap: ['Enterprise SQL & Warehouse pipelines', 'Data Storytelling & Executive Presentation'],
    whyRecommended: {
      studentReason: 'High statistical intuition and analytical rigor make Arjun highly adept at discovering latent structures in high-volume data.',
      familyReason: 'Direct overlap with conventional software engineering curricula eases parental concerns; robust campus placement track record.',
      marketReason: '90% demand index with consistent openings across fintech, e-commerce, and logistics centers in South India.',
      skillReason: 'Quickest time-to-competency; fundamental math and Python skills already cover 80% of introductory requirements.',
      synthesis: 'Data Science offers an exceptional balance of strong analytical application with minimal family apprehension, backed by universal cross-industry demand.'
    },
    educationTiers: [
      {
        type: 'Low-Cost Pathway',
        institutionCategory: 'State Universities (B.Tech CSE/IT or B.Sc Data Science Honors)',
        annualFeeLakhs: 0.65,
        totalDegreeCostLakhs: 2.6,
        scholarshipFeasibility: 'Direct state post-matric scholarships',
        riskAssessment: 'Low Risk',
        recommendedExams: ['TNEA', 'CUET-UG']
      },
      {
        type: 'Moderate-Cost Pathway',
        institutionCategory: 'Tier-1 Private Universities with Big Data Centers of Excellence',
        annualFeeLakhs: 2.4,
        totalDegreeCostLakhs: 9.6,
        scholarshipFeasibility: 'Reliance Undergraduate & Institutional Dean Scholarships',
        riskAssessment: 'Moderate Risk',
        recommendedExams: ['JEE Main', 'State CET']
      },
      {
        type: 'Premium Pathway',
        institutionCategory: 'IIT Madras Online BS in Data Science + In-person Hybrid program',
        annualFeeLakhs: 3.5,
        totalDegreeCostLakhs: 14.0,
        scholarshipFeasibility: 'Direct fee waivers based on parental income brackets',
        riskAssessment: 'Low Risk',
        recommendedExams: ['Qualifier Examination']
      }
    ],
    educationTimeline: [
      { step: 'Stage 1', action: 'Undergraduate Program', duration: 'Years 1 - 4', details: 'B.Tech Computer Science / Information Tech / Applied Statistics' },
      { step: 'Stage 2', action: 'Data Wrangling & Analytics', duration: 'Semesters 2 - 4', details: 'Pandas, NumPy, PostgreSQL, Apache Spark fundamentals' },
      { step: 'Stage 3', action: 'Kaggle & Portfolio Labs', duration: 'Semesters 5 - 6', details: 'Predictive modeling competitions and dashboard deployments' },
      { step: 'Stage 4', action: 'FinTech / E-Comm Internship', duration: 'Semester 7', details: 'Applied analytics role working on live data streams' },
      { step: 'Stage 5', action: 'Industry Deployment', duration: 'Semester 8', details: 'Direct conversion to Associate Data Scientist' }
    ],
    regionalHotspots: ['Bengaluru (Very High)', 'Hyderabad (Very High)', 'Chennai (High)', 'Mumbai (High)']
  },
  {
    id: 'cybersecurity-cloud',
    title: 'Cybersecurity & Cloud Systems Architecture',
    category: 'Software & Systems',
    description: 'Defend digital infrastructure, architect resilient distributed cloud clusters, and establish zero-trust security postures across national and enterprise networks.',
    matchScore: 83,
    scores: {
      studentFit: 84,
      financialFit: 88,
      marketDemand: 89,
      geographicOpportunity: 82,
      skillReadiness: 76,
      conflictIndex: 18, // Lowest parent conflict! High perceived stability
    },
    salaryRange: '₹7.0 LPA - ₹22 LPA',
    hiringVelocity: 'High',
    requiredSkills: ['Computer Networking (TCP/IP)', 'Linux Kernel & System Internals', 'Cryptography Basics', 'Cloud Architecture (AWS/GCP)', 'Penetration Testing'],
    studentSkillsMatched: ['Problem Solving (91%)', 'Analytical Thinking (88%)', 'Python Scripting (82%)'],
    skillGap: ['Linux System Administration', 'Network Packet Analysis', 'Security Compliance Frameworks'],
    whyRecommended: {
      studentReason: 'High problem-solving scores match the adversarial thinking and deductive logic required to secure complex digital perimeters.',
      familyReason: 'Exceptionally high parent alignment (18/100 conflict) due to the government, defense, and banking sectors valuing long-term job stability.',
      marketReason: 'Zero risk of AI automation obsolescence; strict cyber defense compliance mandates make hiring non-cyclical.',
      skillReason: 'Requires foundational systems upskilling, easily bridged with hands-on lab environments (HackTheBox, TryHackMe).',
      synthesis: 'A resilient, high-security pathway with low family friction and guaranteed employment stability across private banking and national infrastructure.'
    },
    educationTiers: [
      {
        type: 'Low-Cost Pathway',
        institutionCategory: 'Govt Engineering College (B.E. Computer Science / IT / Electronics)',
        annualFeeLakhs: 0.8,
        totalDegreeCostLakhs: 3.2,
        scholarshipFeasibility: 'Central Cyber Defense Student Fellowships',
        riskAssessment: 'Low Risk',
        recommendedExams: ['TNEA', 'JEE Main']
      },
      {
        type: 'Moderate-Cost Pathway',
        institutionCategory: 'Accredited Engineering Colleges with Cisco / Fortinet Labs',
        annualFeeLakhs: 2.2,
        totalDegreeCostLakhs: 8.8,
        scholarshipFeasibility: 'Merit-based institutional grants',
        riskAssessment: 'Moderate Risk',
        recommendedExams: ['State CET', 'JEE Main']
      },
      {
        type: 'Premium Pathway',
        institutionCategory: 'Specialized National Forensic Sciences University (NFSU) / IIITs',
        annualFeeLakhs: 3.2,
        totalDegreeCostLakhs: 12.8,
        scholarshipFeasibility: 'Government Ministry of Home Affairs Grants',
        riskAssessment: 'Moderate Risk',
        recommendedExams: ['NFSU Entrance / JEE Main']
      }
    ],
    educationTimeline: [
      { step: 'Stage 1', action: 'B.Tech Core Degree', duration: 'Years 1 - 4', details: 'B.Tech in Computer Science, Information Security, or ECE' },
      { step: 'Stage 2', action: 'Networking & Linux Mastery', duration: 'Semesters 2 - 4', details: 'Deep dive into OSI model, routing protocols, bash automation' },
      { step: 'Stage 3', action: 'Hands-on CTF Competitions', duration: 'Semesters 5 - 6', details: 'Capture The Flag labs, CompTIA Security+ / AWS Cloud Architect prep' },
      { step: 'Stage 4', action: 'SOC Analyst Internship', duration: 'Semester 7', details: 'Security Operations Center incident triage experience' },
      { step: 'Stage 5', action: 'Cloud Security Role', duration: 'Semester 8', details: 'Joining enterprise security engineering or consultancy teams' }
    ],
    regionalHotspots: ['Chennai (High)', 'Bengaluru (Very High)', 'Delhi NCR (High)', 'Hyderabad (High)']
  },
  {
    id: 'robotics-automation',
    title: 'Robotics & Autonomous Hardware Systems',
    category: 'Hardware & Robotics',
    description: 'Integrate embedded microcontrollers, sensor fusion, computer vision, and mechanical kinematics to develop next-generation autonomous industrial and field robots.',
    matchScore: 81,
    scores: {
      studentFit: 85,
      financialFit: 78,
      marketDemand: 83,
      geographicOpportunity: 84,
      skillReadiness: 74,
      conflictIndex: 25,
    },
    salaryRange: '₹6.5 LPA - ₹18 LPA',
    hiringVelocity: 'High',
    requiredSkills: ['Embedded C / C++', 'ROS (Robot Operating System)', 'Control Systems & Kinematics', 'Computer Vision Basics', 'Microcontroller Interfacing (ESP32/STM32)'],
    studentSkillsMatched: ['Physics & Calculus (91%)', 'Hands-on Problem Solving (91%)', 'Analytical Mindset (88%)'],
    skillGap: ['Hardware Breadboarding & PCB Design', 'Real-Time Operating Systems (RTOS)', 'C++ Memory Management'],
    whyRecommended: {
      studentReason: 'Strong affinity for practical applied systems and physics foundations provides an intuitive grasp of kinematic equations.',
      familyReason: 'Satisfies parental desire for a tangible, classic engineering discipline (Mechatronics / Mechanical + CS) with modern prestige.',
      marketReason: 'Heavy industrial automation boom in Tamil Nadu automotive clusters (Oragadam, Sriperumbudur) and drone manufacturing.',
      skillReason: 'Requires physical component experimentation; best accelerated in makerspaces and collegiate robotics clubs.',
      synthesis: 'A physical-digital STEAM bridge that honours familial preference for traditional engineering while driving cutting-edge autonomy.'
    },
    educationTiers: [
      {
        type: 'Low-Cost Pathway',
        institutionCategory: 'Govt College of Technology / CEG Anna University (Robotics/Mechatronics/ECE)',
        annualFeeLakhs: 0.9,
        totalDegreeCostLakhs: 3.6,
        scholarshipFeasibility: 'State AICTE Pragati & Saksham grants',
        riskAssessment: 'Low Risk',
        recommendedExams: ['TNEA']
      },
      {
        type: 'Moderate-Cost Pathway',
        institutionCategory: 'Private Autonomous with Advanced Robotics Labs (PSG Tech, SSN)',
        annualFeeLakhs: 2.8,
        totalDegreeCostLakhs: 11.2,
        scholarshipFeasibility: 'Institutional merit discount',
        riskAssessment: 'Moderate Risk',
        recommendedExams: ['JEE Main', 'TNEA']
      },
      {
        type: 'Premium Pathway',
        institutionCategory: 'IITs (Robotics Minors) / BITS Pilani Mechatronics',
        annualFeeLakhs: 4.8,
        totalDegreeCostLakhs: 19.2,
        scholarshipFeasibility: 'National Merit Fellowships',
        riskAssessment: 'High Financial Strain',
        recommendedExams: ['JEE Advanced', 'BITSAT']
      }
    ],
    educationTimeline: [
      { step: 'Stage 1', action: 'B.Tech Mechatronics / ECE / Mechanical', duration: 'Years 1 - 4', details: 'Dual hardware-software curriculum' },
      { step: 'Stage 2', action: 'Microcontrollers & Sensors', duration: 'Semesters 2 - 4', details: 'C/C++ firmware, Arduino/STM32 interfacing, sensor fusion' },
      { step: 'Stage 3', action: 'Robotics Club & Competitions', duration: 'Semesters 4 - 6', details: 'Autonomous mobile robot (AMR) build with ROS2' },
      { step: 'Stage 4', action: 'OEM / Auto-Tech Internship', duration: 'Semester 7', details: 'Industrial robotics plant or EV automation laboratory' },
      { step: 'Stage 5', action: 'Automation Engineer Career', duration: 'Semester 8', details: 'Joining drone, automotive, or industrial robotics manufacturers' }
    ],
    regionalHotspots: ['Chennai Auto-Belt (Very High)', 'Bengaluru (Very High)', 'Pune (Very High)', 'Coimbatore (High)']
  },
  {
    id: 'software-distributed-systems',
    title: 'Software & Distributed Cloud Engineering',
    category: 'Software & Systems',
    description: 'Build fault-tolerant high-throughput web backends, microservices, and global distributed database infrastructure powering modern internet scale.',
    matchScore: 79,
    scores: {
      studentFit: 82,
      financialFit: 89,
      marketDemand: 88,
      geographicOpportunity: 86,
      skillReadiness: 81,
      conflictIndex: 15, // Extremely aligned with parents!
    },
    salaryRange: '₹7.0 LPA - ₹20 LPA',
    hiringVelocity: 'High',
    requiredSkills: ['Data Structures & Algorithms', 'System Architecture', 'Golang / Java / TypeScript', 'Distributed Caching & DBs', 'CI/CD Pipelines'],
    studentSkillsMatched: ['Programming (82%)', 'Problem Solving (91%)', 'Logic (88%)'],
    skillGap: ['Enterprise System Design', 'High Concurrency Benchmarking'],
    whyRecommended: {
      studentReason: 'Direct mapping of core coding competence and structural problem solving into production web infrastructure.',
      familyReason: 'Universal parent acceptance; seen as the gold standard of modern engineering employment with high recruitment volume.',
      marketReason: 'Perennial demand across all tech tiers from unicorn startups to global capability centers (GCCs).',
      skillReason: 'High current skill overlap allows rapid progression to interview readiness.',
      synthesis: 'The most stable, universally recognized software pathway offering low career risk and maximum hiring options.'
    },
    educationTiers: [
      {
        type: 'Low-Cost Pathway',
        institutionCategory: 'State Govt Engineering College (CSE/IT)',
        annualFeeLakhs: 0.75,
        totalDegreeCostLakhs: 3.0,
        scholarshipFeasibility: 'High eligibility',
        riskAssessment: 'Low Risk',
        recommendedExams: ['TNEA']
      },
      {
        type: 'Moderate-Cost Pathway',
        institutionCategory: 'Accredited Tier-2 University',
        annualFeeLakhs: 2.2,
        totalDegreeCostLakhs: 8.8,
        scholarshipFeasibility: 'Merit waivers',
        riskAssessment: 'Moderate Risk',
        recommendedExams: ['JEE Main']
      },
      {
        type: 'Premium Pathway',
        institutionCategory: 'Tier-1 Private / NITs',
        annualFeeLakhs: 3.8,
        totalDegreeCostLakhs: 15.2,
        scholarshipFeasibility: 'Alumni endowment grants',
        riskAssessment: 'Moderate Risk',
        recommendedExams: ['JEE Main']
      }
    ],
    educationTimeline: [
      { step: 'Stage 1', action: 'B.Tech Computer Science', duration: 'Years 1 - 4', details: 'Foundations in OS, DBMS, Compilers, and Networking' },
      { step: 'Stage 2', action: 'Competitive Programming', duration: 'Semesters 2 - 5', details: 'LeetCode / Codeforces algorithmic speed' },
      { step: 'Stage 3', action: 'Full-Stack Distributed Project', duration: 'Semesters 5 - 6', details: 'Scalable service with Redis, Kafka, and Postgres' },
      { step: 'Stage 4', action: 'Software Engineering Internship', duration: 'Summer / Sem 7', details: 'Product engineering intern in SaaS company' },
      { step: 'Stage 5', action: 'Full-Time SDE Role', duration: 'Semester 8', details: 'Software Development Engineer 1' }
    ],
    regionalHotspots: ['Bengaluru (Very High)', 'Hyderabad (Very High)', 'Chennai (High)', 'Pune (High)']
  },
  {
    id: 'biomedical-health-informatics',
    title: 'Biomedical Informatics & Computational Biology',
    category: 'BioTech & Health',
    description: 'Merge algorithmic genomics, physiological sensor signal processing, and medical imaging AI to revolutionize diagnostic accuracy and clinical outcomes.',
    matchScore: 76,
    scores: {
      studentFit: 78,
      financialFit: 84,
      marketDemand: 79,
      geographicOpportunity: 75,
      skillReadiness: 66,
      conflictIndex: 35,
    },
    salaryRange: '₹6.0 LPA - ₹16 LPA',
    hiringVelocity: 'Moderate',
    requiredSkills: ['Computational Genomics', 'Digital Signal Processing', 'Python / Biopython', 'Medical Imaging (DICOM)', 'Regulatory Standards (FDA/ISO)'],
    studentSkillsMatched: ['Analytical Thinking (88%)', 'Physics & Chemistry Basics (89%)'],
    skillGap: ['Cellular Biology Foundations', 'Biomedical Instrumentation'],
    whyRecommended: {
      studentReason: 'Appeals to analytical curiosity with profound societal impact and emerging computational medicine discovery.',
      familyReason: 'Prestige associated with healthcare domain; high respectability in Indian family circles.',
      marketReason: 'Emerging medical device manufacturing hubs in Andhra MedTech Zone (AMTZ) and Chennai health corridors.',
      skillReason: 'Requires bridging biological fundamentals with computational skills.',
      synthesis: 'A purpose-driven STEAM trajectory bridging life sciences and computational algorithms with strong research longevity.'
    },
    educationTiers: [
      {
        type: 'Low-Cost Pathway',
        institutionCategory: 'State Medical / Engineering Joint Departments',
        annualFeeLakhs: 0.9,
        totalDegreeCostLakhs: 3.6,
        scholarshipFeasibility: 'DBT & ICMR Student Research Fellowships',
        riskAssessment: 'Low Risk',
        recommendedExams: ['TNEA', 'NEET/State Engg']
      },
      {
        type: 'Moderate-Cost Pathway',
        institutionCategory: 'Tier-1 Private Universities with Hospitals',
        annualFeeLakhs: 2.6,
        totalDegreeCostLakhs: 10.4,
        scholarshipFeasibility: 'Health-tech foundation awards',
        riskAssessment: 'Moderate Risk',
        recommendedExams: ['JEE Main', 'Institutional Test']
      },
      {
        type: 'Premium Pathway',
        institutionCategory: 'IIT Madras Center for Computational Brain Research / AIIMS Alliances',
        annualFeeLakhs: 4.2,
        totalDegreeCostLakhs: 16.8,
        scholarshipFeasibility: 'CSIR Junior Fellowships',
        riskAssessment: 'Moderate Risk',
        recommendedExams: ['JEE Advanced', 'GATE']
      }
    ],
    educationTimeline: [
      { step: 'Stage 1', action: 'B.Tech Biomedical / Biotechnology', duration: 'Years 1 - 4', details: 'Anatomy, biomaterials, and signal processing' },
      { step: 'Stage 2', action: 'Bioinformatics Tooling', duration: 'Semesters 3 - 5', details: 'BLAST, RNA-seq pipeline analysis, Python' },
      { step: 'Stage 3', action: 'Hospital / Device Research Lab', duration: 'Semesters 5 - 6', details: 'Wearable sensor data filtering & anomaly detection' },
      { step: 'Stage 4', action: 'HealthTech Internship', duration: 'Semester 7', details: 'Diagnostics startup or multinational medical device firm' },
      { step: 'Stage 5', action: 'Computational Bio Career', duration: 'Semester 8', details: 'Bio-AI engineer or transition to research M.Tech/Ph.D.' }
    ],
    regionalHotspots: ['Chennai Medical Hub (High)', 'Hyderabad Bio-Valley (High)', 'Bengaluru (High)']
  },
  {
    id: 'cleantech-energy',
    title: 'CleanTech & Sustainable Energy Systems',
    category: 'Sustainability & Energy',
    description: 'Design smart microgrids, battery management systems (BMS) for electric vehicles, and renewable power infrastructure to decarbonize heavy industry.',
    matchScore: 74,
    scores: {
      studentFit: 76,
      financialFit: 82,
      marketDemand: 78,
      geographicOpportunity: 80,
      skillReadiness: 68,
      conflictIndex: 32,
    },
    salaryRange: '₹5.8 LPA - ₹15 LPA',
    hiringVelocity: 'Moderate',
    requiredSkills: ['Power Electronics', 'Battery Chemistry & Electrochemistry', 'MATLAB / Simulink', 'Smart Grid Protocols', 'Thermodynamics'],
    studentSkillsMatched: ['Physics & Chemistry (89%)', 'Analytical Thinking (88%)'],
    skillGap: ['Power Simulation Software (Simulink)', 'BMS Hardware Design'],
    whyRecommended: {
      studentReason: 'Strong scientific curiosity applied to urgent global climate and renewable energy transition challenges.',
      familyReason: 'Direct overlap with Electrical & Electronics Engineering (EEE) gives comfort regarding public sector (NTPC, PowerGrid) eligibility.',
      marketReason: 'Aggressive national green hydrogen mission and booming EV battery manufacturing in Tamil Nadu (Hosur/Coimbatore).',
      skillReason: 'Requires transitioning from pure software to hardware-level electro-chemical systems.',
      synthesis: 'A future-proof engineering domain combining core physical sciences with electric mobility and renewable infrastructure.'
    },
    educationTiers: [
      {
        type: 'Low-Cost Pathway',
        institutionCategory: 'State Autonomous Engineering (EEE / Energy Systems)',
        annualFeeLakhs: 0.85,
        totalDegreeCostLakhs: 3.4,
        scholarshipFeasibility: 'Ministry of New and Renewable Energy (MNRE) Fellowships',
        riskAssessment: 'Low Risk',
        recommendedExams: ['TNEA']
      },
      {
        type: 'Moderate-Cost Pathway',
        institutionCategory: 'Private Autonomous with EV Research Hubs',
        annualFeeLakhs: 2.3,
        totalDegreeCostLakhs: 9.2,
        scholarshipFeasibility: 'Corporate auto-maker sponsorship',
        riskAssessment: 'Moderate Risk',
        recommendedExams: ['JEE Main']
      },
      {
        type: 'Premium Pathway',
        institutionCategory: 'IITs (Energy Science & Engineering Departments)',
        annualFeeLakhs: 3.9,
        totalDegreeCostLakhs: 15.6,
        scholarshipFeasibility: 'Full national scholarship coverage',
        riskAssessment: 'Moderate Risk',
        recommendedExams: ['JEE Advanced']
      }
    ],
    educationTimeline: [
      { step: 'Stage 1', action: 'B.Tech Electrical & Electronics / Energy', duration: 'Years 1 - 4', details: 'Circuit analysis, thermodynamics, power generation' },
      { step: 'Stage 2', action: 'Battery & Solar Modeling', duration: 'Semesters 3 - 5', details: 'Simulink modeling of lithium-ion cells and inverters' },
      { step: 'Stage 3', action: 'CleanTech Prototype', duration: 'Semesters 5 - 6', details: 'Solar-integrated microgrid or BMS firmware project' },
      { step: 'Stage 4', action: 'EV Maker Internship', duration: 'Semester 7', details: 'Ather, Ola Electric, or TVS Motor R&D division' },
      { step: 'Stage 5', action: 'Clean Energy Engineer', duration: 'Semester 8', details: 'Energy transition engineer or battery system designer' }
    ],
    regionalHotspots: ['Hosur / Bengaluru (High)', 'Chennai (High)', 'Pune (High)', 'Gujarat Solar Hub (High)']
  },
  {
    id: 'steam-product-design-hci',
    title: 'STEAM Product Design & Human-Computer Interaction',
    category: 'Design & HCI',
    description: 'Bridge engineering fidelity with intuitive cognitive ergonomics, creating seamless physical-digital interfaces for complex scientific and AI systems.',
    matchScore: 71,
    scores: {
      studentFit: 74,
      financialFit: 76,
      marketDemand: 75,
      geographicOpportunity: 77,
      skillReadiness: 62,
      conflictIndex: 48, // Moderate-high conflict: parents worried design isn't "real engineering"
    },
    salaryRange: '₹6.5 LPA - ₹18 LPA',
    hiringVelocity: 'Moderate',
    requiredSkills: ['Design Systems & Figma', 'User Research & Cognitive Psychology', 'Design Prototyping (Three.js/React)', 'Accessibility (WCAG)', 'Information Architecture'],
    studentSkillsMatched: ['Creative Problem Solving (74%)', 'Technology Interest (94%)'],
    skillGap: ['Design Portfolio Creation', 'User Research Methodologies', 'Wireframing & Typography'],
    whyRecommended: {
      studentReason: 'High creative curiosity (74%) combined with technology interest (94%) creates rare cross-functional empathy.',
      familyReason: 'Requires parental sensitization that modern enterprise tech values UX and product designers equally with core engineers.',
      marketReason: 'Surge in B2B SaaS product companies in Chennai and Bengaluru creating demand for technical designers.',
      skillReason: 'Needs visual portfolio and user research case studies rather than competitive coding tests.',
      synthesis: 'A vibrant cross-disciplinary creative avenue; ideal if structured as Computer Science with a Design / HCI minor to reassure parents.'
    },
    educationTiers: [
      {
        type: 'Low-Cost Pathway',
        institutionCategory: 'B.Des at National Institute of Design (NID) / IDC IIT Bombay via UCEED',
        annualFeeLakhs: 2.1,
        totalDegreeCostLakhs: 8.4,
        scholarshipFeasibility: 'Central means-cum-merit fee waivers',
        riskAssessment: 'Low Risk',
        recommendedExams: ['UCEED', 'NID DAT']
      },
      {
        type: 'Moderate-Cost Pathway',
        institutionCategory: 'B.Tech CSE with HCI Minor at Private Engineering Universities',
        annualFeeLakhs: 2.6,
        totalDegreeCostLakhs: 10.4,
        scholarshipFeasibility: 'Private university merit discounts',
        riskAssessment: 'Moderate Risk',
        recommendedExams: ['JEE Main', 'TNEA']
      },
      {
        type: 'Premium Pathway',
        institutionCategory: 'Private Design Academies / International Exchange Design Schools',
        annualFeeLakhs: 6.0,
        totalDegreeCostLakhs: 24.0,
        scholarshipFeasibility: 'Limited external scholarships',
        riskAssessment: 'High Financial Strain',
        recommendedExams: ['Portfolio Review & Interview']
      }
    ],
    educationTimeline: [
      { step: 'Stage 1', action: 'B.Des or B.Tech (HCI/Design minor)', duration: 'Years 1 - 4', details: 'Ergonomics, visual communication, digital product logic' },
      { step: 'Stage 2', action: 'Design Systems & UX Research', duration: 'Semesters 2 - 4', details: 'Figma mastery, usability testing, micro-interactions' },
      { step: 'Stage 3', action: 'Public Portfolio Projects', duration: 'Semesters 5 - 6', details: 'Publish 3 comprehensive end-to-end product design case studies' },
      { step: 'Stage 4', action: 'Product Design Internship', duration: 'Semester 7', details: 'SaaS company product design apprentice' },
      { step: 'Stage 5', action: 'Associate Product Designer', duration: 'Semester 8', details: 'Full-time UX/Product design role' }
    ],
    regionalHotspots: ['Bengaluru (Very High)', 'Chennai (High)', 'Gurugram / Delhi NCR (High)', 'Pune (High)']
  }
];

export const ENTRANCE_EXAMS: ExamInfo[] = [
  {
    id: 'exam-jee-main',
    name: 'JEE (Main) 2026',
    conductingBody: 'National Testing Agency (NTA)',
    targetCareers: ['AI / ML Engineer', 'Data Science & Systems', 'Cybersecurity & Cloud', 'Software Engineering'],
    eligibility: 'Class 12 Passed with Physics, Chemistry, Mathematics (>75% or top 20 percentile)',
    deadline: 'Session 1: Nov 30 | Session 2: Mar 15',
    difficulty: 'High',
    tuitionImpact: 'Gateway to NITs, IIITs, CFTIs; massive fee concessions available for lower income brackets'
  },
  {
    id: 'exam-jee-advanced',
    name: 'JEE (Advanced) 2026',
    conductingBody: 'IIT Consortium',
    targetCareers: ['AI / ML Engineer', 'Robotics Systems', 'Biomedical Informatics', 'CleanTech Systems'],
    eligibility: 'Top 2,50,000 qualifiers of JEE Main',
    deadline: 'Late April 2026',
    difficulty: 'Very High',
    tuitionImpact: 'Admission to premier IITs; 100% fee remission for family income under ₹1 LPA, 66% for ₹1-5 LPA'
  },
  {
    id: 'exam-tnea',
    name: 'TNEA (Tamil Nadu Engineering Admissions)',
    conductingBody: 'Directorate of Technical Education (DOTE)',
    targetCareers: ['All STEAM Engineering Pathways'],
    eligibility: 'Tamil Nadu Class 12 PCM Cut-off / Domicile / Merit Ranking',
    deadline: 'June 2026',
    difficulty: 'Moderate',
    tuitionImpact: 'Lowest cost pathway: ₹35k - ₹85k per year for premier colleges like CEG, MIT Anna Univ, PSG Tech'
  },
  {
    id: 'exam-bitsat',
    name: 'BITSAT 2026',
    conductingBody: 'BITS Pilani',
    targetCareers: ['AI / ML', 'Software Systems', 'Data Science'],
    eligibility: 'Class 12 with aggregate >75% in PCM and >60% in each subject',
    deadline: 'April 2026',
    difficulty: 'High',
    tuitionImpact: 'High tuition, but provides up to 80% Merit-Cum-Means scholarships for top 10 percentile'
  },
  {
    id: 'exam-viteee',
    name: 'VITEEE 2026',
    conductingBody: 'VIT University',
    targetCareers: ['Computer Science', 'Robotics', 'Cybersecurity'],
    eligibility: 'Class 12 PCM aggregate >60%',
    deadline: 'March 2026',
    difficulty: 'Moderate',
    tuitionImpact: 'Category-1 fees (Rank 1-20,000) are affordable at ₹1.98 LPA; Category-5 reaches ₹4.95 LPA'
  },
  {
    id: 'exam-cuet',
    name: 'CUET-UG (Central Universities Entrance Test)',
    conductingBody: 'National Testing Agency',
    targetCareers: ['Data Science (B.Sc)', 'Computational Bio', 'HCI/Cognitive Science'],
    eligibility: 'Class 12 in relevant streams',
    deadline: 'March 2026',
    difficulty: 'Moderate',
    tuitionImpact: 'Nominal tuition (₹15k - ₹35k / year) at premier central universities'
  }
];

export const SCHOLARSHIPS: ScholarshipInfo[] = [
  {
    id: 'sch-prism-grant',
    name: 'PRISM STEAM Merit-Cum-Means Grant',
    provider: 'PRISM Education Foundation',
    maxBenefit: '₹1,20,000 / year + Mentorship',
    eligibility: 'Class 12 STEM score >85%, Family Income < ₹6 LPA, Enrolled in Accredited STEAM B.Tech/B.Sc',
    deadline: 'July 31, 2026',
    matchGrade: 'Direct Match'
  },
  {
    id: 'sch-reliance',
    name: 'Reliance Foundation Undergraduate Scholarship',
    provider: 'Reliance Foundation',
    maxBenefit: 'Up to ₹2,00,000 over degree duration',
    eligibility: 'Undergraduate student in first year, Merit test + Family Income < ₹15 LPA',
    deadline: 'October 15, 2026',
    matchGrade: 'Direct Match'
  },
  {
    id: 'sch-pragati',
    name: 'AICTE Pragati & Saksham Scholarship Scheme',
    provider: 'All India Council for Technical Education (AICTE)',
    maxBenefit: '₹50,000 / year towards tuition and books',
    eligibility: 'Admitted to AICTE approved technical degree through state centralized counseling',
    deadline: 'December 31, 2026',
    matchGrade: 'Eligible'
  },
  {
    id: 'sch-central-sector',
    name: 'Central Sector Scheme of Scholarships (CSSS)',
    provider: 'Ministry of Education, Govt of India',
    maxBenefit: '₹20,000 / year for graduation & PG',
    eligibility: 'Top 20th percentile in State Board Class 12, Family income < ₹4.5 LPA',
    deadline: 'November 30, 2026',
    matchGrade: 'Eligible'
  },
  {
    id: 'sch-first-grad',
    name: 'Tamil Nadu First Graduate Tuition Concession',
    provider: 'Govt of Tamil Nadu',
    maxBenefit: '100% Tuition Fee Waiver (approx ₹25k - ₹50k/yr)',
    eligibility: 'First member of the family pursuing undergraduate graduation in Tamil Nadu',
    deadline: 'At time of TNEA Counselling',
    matchGrade: 'Needs Application'
  }
];

export const EXPERTS: ExpertProfile[] = [
  {
    id: 'exp-dr-kavitha',
    name: 'Dr. Kavitha Ramanathan',
    role: 'Senior Academic & STEAM Pathways Advisor',
    category: 'Career Counsellor',
    experienceYears: 16,
    rating: 4.9,
    reviewsCount: 312,
    specialization: 'Engineering Stream Mapping, Anna Univ & IIT Admissions, Student-Parent Consensus',
    availability: 'Available Today (4:30 PM)',
    bio: 'Former Academic Dean at MIT Chennai; guided over 4,000 students through multi-disciplinary STEAM degree selection and scholarship strategies.',
    verified: true
  },
  {
    id: 'exp-siddharth',
    name: 'Siddharth Iyer',
    role: 'Staff Machine Learning Architect',
    category: 'Industry Mentor',
    experienceYears: 11,
    rating: 4.95,
    reviewsCount: 184,
    specialization: 'AI/ML Engineering, Open Source Portfolios, Bengaluru Tech Hiring Horizons',
    availability: 'Tomorrow (6:00 PM)',
    bio: 'Staff AI Engineer leading generative modeling pipelines; alumni of PSG Tech and IISc; active hiring manager for deep-tech internships.',
    verified: true
  },
  {
    id: 'exp-ananya',
    name: 'Ananya Deshmukh',
    role: 'Education Financing & Scholarship Strategist',
    category: 'Education Advisor',
    experienceYears: 9,
    rating: 4.85,
    reviewsCount: 140,
    specialization: 'Education Loans, Merit-cum-Means Feasibility, Tier-1 ROI Planning',
    availability: 'Available Thursday (3:00 PM)',
    bio: 'Specialist in educational financial planning; helps middle-income families optimize education budgets without compromising student career aspirations.',
    verified: true
  },
  {
    id: 'exp-prof-raghavan',
    name: 'Prof. S. Raghavan',
    role: 'Emerging Tech & Mechatronics Mentor',
    category: 'STEAM Mentor',
    experienceYears: 20,
    rating: 4.92,
    reviewsCount: 260,
    specialization: 'Robotics, IoT Systems, Hardware-Software Dual Careers, Patent Prototypes',
    availability: 'Available Friday (5:00 PM)',
    bio: 'Professor Emeritus in Autonomous Systems; guides students transitioning from traditional engineering to high-velocity robotics and sensor design.',
    verified: true
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-01',
    expertId: 'exp-dr-kavitha',
    expertName: 'Dr. Kavitha Ramanathan',
    expertRole: 'Senior Academic & STEAM Pathways Advisor',
    date: 'Oct 12, 2026',
    time: '4:30 PM - 5:15 PM',
    mode: 'Video Call',
    status: 'Upcoming',
    notes: 'Reviewing AI/ML vs Computer Engineering specialization with parents; resolving budget concerns.'
  },
  {
    id: 'apt-02',
    expertId: 'exp-siddharth',
    expertName: 'Siddharth Iyer',
    expertRole: 'Staff Machine Learning Architect',
    date: 'Sep 28, 2026',
    time: '6:00 PM - 6:45 PM',
    mode: 'Video Call',
    status: 'Completed',
    notes: 'Discussed Python & PyTorch project roadmap and Kaggle competitions for 1st-year students.'
  }
];

export const COUNSELLOR_STUDENTS: CounsellorStudentItem[] = [
  {
    id: 'std-arjun',
    name: 'Arjun Swaminathan',
    classDegree: 'Grade 12 (PCM+CS)',
    topCareer: 'AI / Machine Learning',
    prismScore: 89,
    studentFit: 95,
    financialFit: 87,
    conflictIndex: 28,
    status: 'Stable',
    lastAssessed: 'Today, 10:15 AM'
  },
  {
    id: 'std-priya',
    name: 'Priya Sundaram',
    classDegree: 'Grade 12 (Biology+Math)',
    topCareer: 'Biomedical Informatics',
    prismScore: 84,
    studentFit: 92,
    financialFit: 61,
    conflictIndex: 54,
    status: 'High Conflict',
    lastAssessed: 'Yesterday'
  },
  {
    id: 'std-vikram',
    name: 'Vikram Chandran',
    classDegree: 'B.Tech 1st Year',
    topCareer: 'Cybersecurity Architecture',
    prismScore: 82,
    studentFit: 86,
    financialFit: 84,
    conflictIndex: 19,
    status: 'Stable',
    lastAssessed: '3 days ago'
  },
  {
    id: 'std-sneha',
    name: 'Sneha Patel',
    classDegree: 'Grade 12 (PCM)',
    topCareer: 'Product Design & HCI',
    prismScore: 75,
    studentFit: 88,
    financialFit: 52,
    conflictIndex: 68,
    status: 'Needs Review',
    lastAssessed: 'Oct 02, 2026'
  },
  {
    id: 'std-rahul',
    name: 'Rahul Varma',
    classDegree: 'Grade 12 (PCM)',
    topCareer: 'Robotics & Automation',
    prismScore: 78,
    studentFit: 83,
    financialFit: 58,
    conflictIndex: 42,
    status: 'Financial Risk',
    lastAssessed: 'Sep 29, 2026'
  },
  {
    id: 'std-meera',
    name: 'Meera Krishnan',
    classDegree: 'Grade 12 (PCM+CS)',
    topCareer: 'Data Science & Big Data',
    prismScore: 88,
    studentFit: 90,
    financialFit: 89,
    conflictIndex: 22,
    status: 'Stable',
    lastAssessed: 'Sep 25, 2026'
  }
];

export const REGIONAL_MARKET_HUBS = [
  {
    city: 'Bengaluru',
    state: 'Karnataka',
    demand: 'Very High',
    score: 96,
    topFocus: 'Generative AI, Deep-Tech Startups, Cloud Infrastructure',
    avgStartingSalary: '₹10.5 LPA',
    activePostings: '38,400+ STEAM openings'
  },
  {
    city: 'Chennai',
    state: 'Tamil Nadu',
    demand: 'High',
    score: 91,
    topFocus: 'Enterprise SaaS, Automotive Autonomy, Industrial IoT, HealthTech',
    avgStartingSalary: '₹8.8 LPA',
    activePostings: '24,200+ STEAM openings'
  },
  {
    city: 'Hyderabad',
    state: 'Telangana',
    demand: 'Very High',
    score: 93,
    topFocus: 'AI Research Labs, Bio-Informatics, Global Capability Centers (GCCs)',
    avgStartingSalary: '₹9.4 LPA',
    activePostings: '29,800+ STEAM openings'
  },
  {
    city: 'Pune',
    state: 'Maharashtra',
    demand: 'High',
    score: 86,
    topFocus: 'Automotive Embedded Systems, Manufacturing Automation, FinTech',
    avgStartingSalary: '₹8.2 LPA',
    activePostings: '19,500+ STEAM openings'
  },
  {
    city: 'Delhi NCR',
    state: 'National Capital Region',
    demand: 'High',
    score: 89,
    topFocus: 'Consumer Tech, Enterprise Platforms, Policy & Cyber Defense',
    avgStartingSalary: '₹9.0 LPA',
    activePostings: '27,100+ STEAM openings'
  }
];

export const SELF_ASSESSMENTS_CATALOG = [
  {
    id: 'apt-stem',
    title: 'Aptitude & Spatial Logic Assessment',
    category: 'Cognitive',
    questionsCount: 20,
    durationMinutes: 25,
    description: 'Measures pattern recognition, abstract algebraic deduction, and dimensional spatial orientation.',
    progress: 100,
    completed: true,
    score: '91 / 100',
    lastTaken: 'Completed today'
  },
  {
    id: 'int-steam',
    title: 'STEAM Interest Vector Inventory',
    category: 'Interests',
    questionsCount: 28,
    durationMinutes: 15,
    description: 'Identifies deep intrinsic enthusiasm across computing, biological sciences, physical hardware, and human-centered design.',
    progress: 100,
    completed: true,
    score: '94% Tech Alignment',
    lastTaken: 'Completed today'
  },
  {
    id: 'skill-gap-eval',
    title: 'Software & Mathematical Skill Gap Audit',
    category: 'Technical',
    questionsCount: 25,
    durationMinutes: 30,
    description: 'Diagnoses exact proficiencies in Python syntax, calculus derivatives, and algorithmic Big-O complexities.',
    progress: 80,
    completed: false,
    score: '82% Readiness',
    lastTaken: 'In Progress'
  },
  {
    id: 'comm-prof',
    title: 'Communication & Collaborative Profile',
    category: 'Soft Competencies',
    questionsCount: 15,
    durationMinutes: 12,
    description: 'Evaluates technical documentation capability, interpersonal cross-functional communication, and group problem solving.',
    progress: 100,
    completed: true,
    score: '68 / 100 (Identified Gap)',
    lastTaken: 'Completed 2 days ago'
  },
  {
    id: 'lead-profile',
    title: 'Engineering Leadership & Initiative',
    category: 'Leadership',
    questionsCount: 15,
    durationMinutes: 15,
    description: 'Measures readiness for project ownership, sprint management, and proactive technical inquiry.',
    progress: 60,
    completed: false,
    score: 'Pending Completion',
    lastTaken: 'Not started'
  },
  {
    id: 'learning-style',
    title: 'Cognitive Learning & Retention Style',
    category: 'Learning',
    questionsCount: 12,
    durationMinutes: 10,
    description: 'Discovers whether you retain complex systems through visual architecture, hands-on coding, or theoretical proofs.',
    progress: 100,
    completed: true,
    score: 'Kinesthetic-Visual (86%)',
    lastTaken: 'Completed 5 days ago'
  }
];

export const INITIAL_PARENT_PREFERENCES: ParentCoursePreference = {
  preferredStreams: [
    'Engineering & Technology (CSE, AI, Software)',
    'Data Science & Analytics'
  ],
  maxAnnualFeeLakhs: 4.5,
  criteriaWeights: {
    jobStability: 30,
    feeAffordability: 25,
    campusPlacement: 25,
    studentAptitude: 10,
    locationProximity: 10
  },
  preferredInstitutionType: 'Premier Autonomous & State Govt',
  locationPreference: 'South India / Regional Tech Hubs',
  riskTolerance: 'Balanced'
};

export interface BaseCourseDefinition {
  courseId: string;
  courseName: string;
  stream: string;
  degreeType: string;
  careerTitle: string;
  baseStability: number;
  basePlacementRate: number;
  tuitionPerYearLakhs: number;
  projectedStartingCTC: string;
  riskLevel: 'Low Risk' | 'Moderate' | 'Emerging';
  topInstitutions: string[];
}

export const BASE_COURSES_CATALOG: BaseCourseDefinition[] = [
  {
    courseId: 'btech-cse-core',
    courseName: 'B.Tech in Computer Science & Engineering (Core)',
    stream: 'Engineering & Technology (CSE, AI, Software)',
    degreeType: '4-Year Undergraduate Degree',
    careerTitle: 'Software & Distributed Cloud Engineering',
    baseStability: 96,
    basePlacementRate: 95,
    tuitionPerYearLakhs: 2.2,
    projectedStartingCTC: '₹8.5 LPA - ₹18 LPA',
    riskLevel: 'Low Risk',
    topInstitutions: ['Anna Univ (CEG/MIT)', 'PSG Tech Coimbatore', 'SSN College of Engineering', 'NIT Trichy']
  },
  {
    courseId: 'btech-ai-ml',
    courseName: 'B.Tech in Artificial Intelligence & Machine Learning',
    stream: 'Engineering & Technology (CSE, AI, Software)',
    degreeType: '4-Year Specialized Degree',
    careerTitle: 'AI / Machine Learning Engineer',
    baseStability: 94,
    basePlacementRate: 94,
    tuitionPerYearLakhs: 2.75,
    projectedStartingCTC: '₹10 LPA - ₹24 LPA',
    riskLevel: 'Moderate',
    topInstitutions: ['IIT Madras (IDDD)', 'BITS Pilani', 'Amrita Vishwa Vidyapeetham', 'VIT Vellore']
  },
  {
    courseId: 'btech-data-science',
    courseName: 'B.Tech in Data Science & Big Data Systems',
    stream: 'Data Science & Analytics',
    degreeType: '4-Year Engineering Degree',
    careerTitle: 'Data Science & Big Data Systems',
    baseStability: 92,
    basePlacementRate: 91,
    tuitionPerYearLakhs: 2.5,
    projectedStartingCTC: '₹8.0 LPA - ₹18 LPA',
    riskLevel: 'Low Risk',
    topInstitutions: ['PSG Tech', 'SASTRA Deemed University', 'PES University Bengaluru', 'Shiv Nadar Univ']
  },
  {
    courseId: 'btech-ece',
    courseName: 'B.Tech in Electronics & Communication Engineering (ECE)',
    stream: 'Electronics & Hardware Systems',
    degreeType: '4-Year Core Engineering',
    careerTitle: 'VLSI & Embedded Systems Engineer',
    baseStability: 91,
    basePlacementRate: 88,
    tuitionPerYearLakhs: 2.0,
    projectedStartingCTC: '₹7.5 LPA - ₹16 LPA',
    riskLevel: 'Low Risk',
    topInstitutions: ['NIT Surathkal', 'Anna University', 'Govt College of Technology', 'Thapar Institute']
  },
  {
    courseId: 'btech-robotics',
    courseName: 'B.Tech in Robotics & Autonomous Systems / Mechatronics',
    stream: 'Robotics & Industrial Automation',
    degreeType: '4-Year Multi-Disciplinary Degree',
    careerTitle: 'Robotics & Autonomous Systems',
    baseStability: 87,
    basePlacementRate: 85,
    tuitionPerYearLakhs: 2.8,
    projectedStartingCTC: '₹7.5 LPA - ₹15 LPA',
    riskLevel: 'Moderate',
    topInstitutions: ['IIT Madras', 'PSG Tech Robotics Lab', 'SRM University', 'Manipal Institute of Tech']
  },
  {
    courseId: 'btech-cloud-devops',
    courseName: 'B.Tech in Cloud Computing & DevOps Infrastructure',
    stream: 'Engineering & Technology (CSE, AI, Software)',
    degreeType: '4-Year Applied Engineering',
    careerTitle: 'Cloud & DevOps Engineer',
    baseStability: 93,
    basePlacementRate: 92,
    tuitionPerYearLakhs: 2.6,
    projectedStartingCTC: '₹8.0 LPA - ₹17 LPA',
    riskLevel: 'Low Risk',
    topInstitutions: ['SSN College', 'Amity Institute of Tech', 'KL University', 'Bennett University']
  },
  {
    courseId: 'bcom-fintech',
    courseName: 'B.Com / BBA in FinTech & Business Analytics',
    stream: 'Management & Commerce / FinTech',
    degreeType: '3-Year Quantitative Business Degree',
    careerTitle: 'Quantitative Financial Analyst',
    baseStability: 89,
    basePlacementRate: 86,
    tuitionPerYearLakhs: 1.8,
    projectedStartingCTC: '₹6.5 LPA - ₹14 LPA',
    riskLevel: 'Low Risk',
    topInstitutions: ['Loyola College Chennai', 'Christ University Bengaluru', 'Symbiosis Pune', 'NMIMS Mumbai']
  },
  {
    courseId: 'bsc-applied-math',
    courseName: 'B.Sc (Hons) in Mathematics & Computing',
    stream: 'Pure & Applied Sciences',
    degreeType: '3–4 Year Honors Science Degree',
    careerTitle: 'Computational Scientist & Cryptographer',
    baseStability: 90,
    basePlacementRate: 84,
    tuitionPerYearLakhs: 1.2,
    projectedStartingCTC: '₹7.0 LPA - ₹16 LPA',
    riskLevel: 'Low Risk',
    topInstitutions: ['Chennai Mathematical Institute (CMI)', 'ISI Kolkata', 'IIT Kharagpur BS', 'Madras Christian College']
  }
];

