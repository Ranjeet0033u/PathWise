import { CounsellorStudentItem } from '../types';

export interface DetailedCounsellorStudent extends CounsellorStudentItem {
  email: string;
  phone: string;
  familyAnnualBudget: number; // in Lakhs
  targetDegreeCost: number;   // in Lakhs
  budgetGap: number;          // targetDegreeCost - (familyAnnualBudget * 4)
  parentTopPreference: string;
  studentAspiration: string;
  aiInterventionNotes: string[];
}

export const COUNSELLOR_STUDENTS: DetailedCounsellorStudent[] = [
  {
    id: 'stud-1',
    name: 'Arjun Swaminathan',
    classDegree: 'Grade 12 (Science — PCM + CS)',
    topCareer: 'AI / Machine Learning Engineer',
    prismScore: 92,
    studentFit: 95,
    financialFit: 87,
    conflictIndex: 28,
    status: 'Stable',
    lastAssessed: 'Today (Live Sync)',
    email: 'arjun.swami@example.com',
    phone: '+91 98401 23456',
    familyAnnualBudget: 4.5,
    targetDegreeCost: 11.0,
    budgetGap: 0, // 4.5 * 4 = 18L capacity >= 11.0L
    parentTopPreference: 'Computer Science & Engineering (Anna Univ / SSN)',
    studentAspiration: 'Deep Learning & Autonomous Intelligent Systems',
    aiInterventionNotes: [
      'Strong alignment between student capability (Math 91%) and parental budget capacity.',
      'Recommend TNEA choice-filling strategy prioritizing CEG Anna University and SSN.',
      'Suggest strengthening technical communication before university campus interviews.'
    ]
  },
  {
    id: 'stud-2',
    name: 'Priya Ramaswamy',
    classDegree: 'Grade 12 (PCM + Biology)',
    topCareer: 'Biomedical Data Science',
    prismScore: 84,
    studentFit: 91,
    financialFit: 52,
    conflictIndex: 68,
    status: 'High Conflict',
    lastAssessed: 'Yesterday',
    email: 'priya.r@example.com',
    phone: '+91 94440 98765',
    familyAnnualBudget: 2.8,
    targetDegreeCost: 18.5,
    budgetGap: 7.3, // Capacity: 11.2L vs 18.5L
    parentTopPreference: 'Government MBBS / Traditional NEET Route',
    studentAspiration: 'Computational Genomics & AI Healthcare Research',
    aiInterventionNotes: [
      'High friction: Parents invested 2 years in NEET coaching, student strongly resists clinical medicine.',
      'Budget gap of ₹7.3 Lakhs for private biomedical engineering; recommend government aided biotechnology seats.',
      'Urgent family mediation required to present dual-advantage STEAM alternatives.'
    ]
  },
  {
    id: 'stud-3',
    name: 'Karthi Velu',
    classDegree: 'Grade 12 (PCM + Computer Science)',
    topCareer: 'Aerospace Systems & Propulsion',
    prismScore: 78,
    studentFit: 89,
    financialFit: 44,
    conflictIndex: 72,
    status: 'Financial Risk',
    lastAssessed: '3 days ago',
    email: 'karthi.v@example.com',
    phone: '+91 98841 55667',
    familyAnnualBudget: 2.0,
    targetDegreeCost: 16.0,
    budgetGap: 8.0, // Capacity: 8.0L vs 16.0L
    parentTopPreference: 'Local Polytechnic / Immediate Employment or Bank Exam',
    studentAspiration: 'Aero-Propulsion Simulation & Satellite Navigation',
    aiInterventionNotes: [
      'Severe budget deficit: Family annual capacity ₹2.0L vs private aerospace fees ₹4.0L/yr.',
      'High risk of student dropping out or taking predatory unregulated education loans.',
      'Immediate action: Guide student to Tamil Nadu Post-Matric / First Graduate concession + MIT Anna University Aeronautical Department via TNEA merit.'
    ]
  },
  {
    id: 'stud-4',
    name: 'Divya Balaji',
    classDegree: 'Grade 12 (PCM + Electronics)',
    topCareer: 'Robotics & Embedded Automation',
    prismScore: 88,
    studentFit: 86,
    financialFit: 82,
    conflictIndex: 42,
    status: 'Needs Review',
    lastAssessed: '5 days ago',
    email: 'divya.b@example.com',
    phone: '+91 97910 11223',
    familyAnnualBudget: 3.5,
    targetDegreeCost: 12.0,
    budgetGap: 0,
    parentTopPreference: 'Safe ECE Degree in Tier-2 College Near Home (Coimbatore)',
    studentAspiration: 'Robotics Automation in Bengaluru Tech Corridor',
    aiInterventionNotes: [
      'Moderate parental anxiety regarding out-of-state/metro hostel relocation.',
      'Excellent cognitive readiness in hardware-software interfaces.',
      'Schedule 1-on-1 parent reassurance call focusing on campus security and top MNC recruiters.'
    ]
  },
  {
    id: 'stud-5',
    name: 'Sneha Natarajan',
    classDegree: 'Grade 12 (Science — PCM)',
    topCareer: 'Cybersecurity & Cloud Defense',
    prismScore: 90,
    studentFit: 88,
    financialFit: 89,
    conflictIndex: 22,
    status: 'Stable',
    lastAssessed: '1 week ago',
    email: 'sneha.n@example.com',
    phone: '+91 99620 44556',
    familyAnnualBudget: 5.0,
    targetDegreeCost: 10.5,
    budgetGap: 0,
    parentTopPreference: 'IT / Computer Science with High Campus Placement',
    studentAspiration: 'Ethical Hacking, Network Security & Cloud Governance',
    aiInterventionNotes: [
      'Harmonious alignment: Parents prioritize job security which perfectly matches cybersecurity demand.',
      'Financial feasibility fully secured under family capacity.',
      'Advise student to register for NPTEL / Cisco cybersecurity certifications in Class 12.'
    ]
  }
];
