import { EnhancedScholarship } from '../types';

export const INITIAL_SCHOLARSHIPS: EnhancedScholarship[] = [
  {
    id: 'sch-tn-fg',
    name: 'Tamil Nadu First Graduate Tuition Concession',
    provider: 'Government of Tamil Nadu (Directorate of Technical Education)',
    maxBenefit: '₹25,000 / year (Direct Tuition Fee Waiver)',
    eligibility: 'Student whose siblings or parents have not completed any degree; admitted via TNEA single window counseling.',
    deadline: 'July 31, 2026',
    category: 'All',
    incomeBand: 'Any Income',
    state: 'Tamil Nadu',
    matchGrade: 'Direct Match',
    documentsChecklist: [
      { id: 'doc-1', name: 'First Graduate Certificate from Tahsildar', checked: true },
      { id: 'doc-2', name: 'Joint Declaration by Parent & Student', checked: true },
      { id: 'doc-3', name: 'Family Ration Card / Smart Card Copy', checked: false },
      { id: 'doc-4', name: '10th & 12th Marksheet Certificates', checked: true }
    ]
  },
  {
    id: 'sch-prism-stem',
    name: 'PRISM Merit-Cum-Means STEAM Innovation Fellowship',
    provider: 'PathWise Industry STEAM Consortium',
    maxBenefit: '₹1,20,000 / year + Industrial Research Mentorship',
    eligibility: 'Score >85% in PCM/CS with demonstrated passion in software, AI, or clean energy prototypes; family budget gap > ₹2L.',
    deadline: 'August 15, 2026',
    category: 'All',
    incomeBand: '₹2.5L – ₹6 LPA',
    state: 'Tamil Nadu',
    matchGrade: 'Direct Match',
    documentsChecklist: [
      { id: 'doc-p1', name: 'PRISM Student Vector SWOT Analytics Report', checked: true },
      { id: 'doc-p2', name: 'Income Certificate / ITR of Parents', checked: false },
      { id: 'doc-p3', name: 'GitHub or Science Project Prototype Proof', checked: true },
      { id: 'doc-p4', name: 'School Headmaster Recommendation Letter', checked: false }
    ]
  },
  {
    id: 'sch-aicte-pragati',
    name: 'AICTE Pragati Scholarship for Girls in Technical Education',
    provider: 'All India Council for Technical Education (AICTE)',
    maxBenefit: '₹50,000 / year (4 Years for Degree Engineering)',
    eligibility: 'Female candidates admitted to 1st year of AICTE-approved degree engineering; family income < ₹8 LPA.',
    deadline: 'October 30, 2026',
    category: 'Women in STEAM',
    incomeBand: '₹2.5L – ₹6 LPA',
    state: 'All-India / Central',
    matchGrade: 'Eligible',
    documentsChecklist: [
      { id: 'doc-pr1', name: 'Aadhaar Card Linked Bank Passbook', checked: true },
      { id: 'doc-pr2', name: 'AICTE College Admission Allotment Letter', checked: false },
      { id: 'doc-pr3', name: 'Family Income Certificate issued by Revenue Authority', checked: false },
      { id: 'doc-pr4', name: 'Bonafide Student Certificate', checked: false }
    ]
  },
  {
    id: 'sch-post-matric-scst',
    name: 'Tamil Nadu Post-Matric Scholarship (SC / ST / SCC)',
    provider: 'Adi Dravidar and Tribal Welfare Dept, TN',
    maxBenefit: '100% Compulsory Tuition Fee Reimbursement + ₹12,000 Hostel Allowance',
    eligibility: 'SC/ST/SCA students pursuing accredited higher professional education with parental income under ₹2.5 LPA.',
    deadline: 'November 15, 2026',
    category: 'SC/ST',
    incomeBand: '< ₹2.5 LPA',
    state: 'Tamil Nadu',
    matchGrade: 'Needs Application',
    documentsChecklist: [
      { id: 'doc-sc1', name: 'Permanent Community Certificate Card', checked: true },
      { id: 'doc-sc2', name: 'Income Certificate (< ₹2.5 LPA)', checked: true },
      { id: 'doc-sc3', name: 'College Fee Receipt & Bank Account IFSC Code', checked: false },
      { id: 'doc-sc4', name: '12th Transfer Certificate (TC)', checked: false }
    ]
  },
  {
    id: 'sch-bc-mbc-merit',
    name: 'Tamil Nadu BC / MBC / DNC Higher Education Welfare Grant',
    provider: 'Backward Classes and Minorities Welfare Dept, TN',
    maxBenefit: '₹35,000 / year + Special Book Allowance',
    eligibility: 'BC / MBC / DNC students admitted into Govt or Aided engineering colleges with parental annual income under ₹2.5 LPA.',
    deadline: 'September 20, 2026',
    category: 'BC/MBC',
    incomeBand: '< ₹2.5 LPA',
    state: 'Tamil Nadu',
    matchGrade: 'Eligible',
    documentsChecklist: [
      { id: 'doc-bc1', name: 'Community Certificate (BC/MBC/DNC)', checked: true },
      { id: 'doc-bc2', name: 'Income Certificate from Revenue Authority', checked: false },
      { id: 'doc-bc3', name: 'College Admission Order', checked: false }
    ]
  },
  {
    id: 'sch-reliance',
    name: 'Reliance Foundation Undergraduate STEAM Scholarship',
    provider: 'Reliance Foundation',
    maxBenefit: 'Up to ₹2,00,000 Total Grant + Mentorship Network',
    eligibility: '1st year full-time undergraduate students in Computer Science, IT, AI, Math or Sciences; Aptitude test score >75%.',
    deadline: 'September 30, 2026',
    category: 'All',
    incomeBand: '₹2.5L – ₹6 LPA',
    state: 'All-India / Central',
    matchGrade: 'Eligible',
    documentsChecklist: [
      { id: 'doc-r1', name: 'Online Reliance Aptitude Test Scorecard', checked: false },
      { id: 'doc-r2', name: 'Class 12 Board Marksheet (>70%)', checked: true },
      { id: 'doc-r3', name: 'College ID or Bonafide Letter', checked: false },
      { id: 'doc-r4', name: 'Household Annual Income Proof', checked: false }
    ]
  }
];
