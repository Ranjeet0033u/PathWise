import { AssessmentQuestion } from '../types';

export const INTEREST_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'int-1',
    text: 'I enjoy writing computer code or creating scripts to automate repetitive tasks.',
    textTamil: 'மறுமுறை செய்யும் பணிகளை எளிதாக்க கணினி நிரல் (coding) எழுதுவதில் எனக்கு ஆர்வம் உண்டு.',
    domain: 'Software & AI',
    type: 'likert'
  },
  {
    id: 'int-2',
    text: 'I like analyzing patterns in complex numbers, graphs, or statistical datasets.',
    textTamil: 'சிக்கலான எண்கள், வரைபடங்கள் அல்லது புள்ளிவிவர தரவுகளில் உள்ள தொடர்புகளை பகுப்பாய்வு செய்வதில் விருப்பம்.',
    domain: 'Mathematics & Data',
    type: 'likert'
  },
  {
    id: 'int-3',
    text: 'I am fascinated by how electronic circuits, microchips, and robotics interact with software.',
    textTamil: 'மின்னணு சுற்றுகள், மைக்ரோசிப்கள் மற்றும் ரோபாட்டிக்ஸ் எவ்வாறு மென்பொருளோடு இணைகிறது என்பதில் ஆர்வம்.',
    domain: 'Robotics & Hardware',
    type: 'likert'
  },
  {
    id: 'int-4',
    text: 'I prefer building tangible physical models, mechanical engines, or aerodynamic structures.',
    textTamil: 'இயந்திரங்கள், வாகன உதிரிபாகங்கள் அல்லது இயற்பியல் மாதிரிகளை வடிவமைப்பதில் ஆர்வம்.',
    domain: 'Mechanical & Systems',
    type: 'likert'
  },
  {
    id: 'int-5',
    text: 'I want to solve environmental challenges using solar technology, green energy, or battery materials.',
    textTamil: 'சூரிய மின்சக்தி, பசுமை ஆற்றல் அல்லது மின்கல தொழில்நுட்பம் மூலம் சுற்றுச்சூழல் பிரச்சனைகளுக்கு தீர்வு காண ஆர்வம்.',
    domain: 'Clean Energy & Materials',
    type: 'likert'
  },
  {
    id: 'int-6',
    text: 'I am interested in computational biology, genomics, or medical diagnosis algorithms.',
    textTamil: 'உயிரி-தொழில்நுட்பம், மரபியல் மற்றும் மருத்துவ பரிசோதனை கணிப்பீடுகளில் ஆர்வம்.',
    domain: 'Biotech & Clinical STEAM',
    type: 'likert'
  },
  {
    id: 'int-7',
    text: 'I enjoy testing network security, finding digital vulnerabilities, and defending online systems.',
    textTamil: 'இணைய பாதுகாப்பு, சைபர் தாக்குதல்களை தடுத்தல் மற்றும் நெட்வொர்க் பாதுகாப்பில் ஆர்வம்.',
    domain: 'Cybersecurity & Cloud',
    type: 'likert'
  },
  {
    id: 'int-8',
    text: 'I prefer designing user interfaces, 3D interactive graphics, and human-computer interactions.',
    textTamil: 'கவர்ச்சிகரமான பயனர் இடைமுகம் (UI/UX) மற்றும் 3D கிராபிக்ஸ் வடிவமைப்பில் ஆர்வம்.',
    domain: 'Design & Spatial Computing',
    type: 'likert'
  },
  {
    id: 'int-9',
    text: 'I am motivated by understanding financial markets, algorithmic trading, and quantitative risk.',
    textTamil: 'நிதிச் சந்தைகள், பங்கு வர்த்தக அல்காரிதம்கள் மற்றும் நிதி இடர் பகுப்பாய்வில் ஆர்வம்.',
    domain: 'FinTech & Quant Analytics',
    type: 'likert'
  },
  {
    id: 'int-10',
    text: 'I like breaking down large abstract real-world problems into logical step-by-step algorithms.',
    textTamil: 'பெரிய நடைமுறைப் பிரச்சனைகளை தர்க்கரீதியான படிநிலைகளாக பிரித்து தீர்ப்பதில் ஆர்வம்.',
    domain: 'Algorithmic Problem Solving',
    type: 'likert'
  },
  {
    id: 'int-11',
    text: 'I enjoy collaborating on open-source projects or building STEAM prototypes with peers.',
    textTamil: 'நண்பர்களுடன் இணைந்து அறிவியல் மற்றும் தொழில்நுட்ப முன்மாதிரிகளை (prototypes) உருவாக்குவதில் ஆர்வம்.',
    domain: 'Collaborative Innovation',
    type: 'likert'
  },
  {
    id: 'int-12',
    text: 'I prefer working on cutting-edge research that might take years to commercialize over routine jobs.',
    textTamil: 'வழக்கமான வேலைகளை விட நீண்டகால ஆராய்ச்சி மற்றும் புதிய கண்டுபிடிப்புகளில் ஈடுபடுவதில் ஆர்வம்.',
    domain: 'Frontier Research',
    type: 'likert'
  }
];

export const APTITUDE_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'apt-1',
    text: 'If 3 machines take 3 minutes to produce 3 computer chips, how many minutes will 100 machines take to produce 100 chips?',
    textTamil: '3 இயந்திரங்கள் 3 சிப்களை உருவாக்க 3 நிமிடங்கள் எடுத்துக்கொண்டால், 100 இயந்திரங்கள் 100 சிப்களை உருவாக்க எத்தனை நிமிடங்கள் ஆகும்?',
    domain: 'Analytical Logic',
    type: 'mcq',
    options: [
      { label: '100 minutes', labelTamil: '100 நிமிடங்கள்', value: 0 },
      { label: '3 minutes', labelTamil: '3 நிமிடங்கள்', value: 1 },
      { label: '33.3 minutes', labelTamil: '33.3 நிமிடங்கள்', value: 0 },
      { label: '1 minute', labelTamil: '1 நிமிடம்', value: 0 }
    ],
    correctIndex: 1
  },
  {
    id: 'apt-2',
    text: 'Find the next number in the series: 2, 6, 12, 20, 30, ?',
    textTamil: 'அடுத்த எண்ணைக் கண்டறிக: 2, 6, 12, 20, 30, ?',
    domain: 'Quantitative Patterns',
    type: 'mcq',
    options: [
      { label: '40', value: 0 },
      { label: '42', value: 1 },
      { label: '44', value: 0 },
      { label: '46', value: 0 }
    ],
    correctIndex: 1
  },
  {
    id: 'apt-3',
    text: 'A server database doubles its cached records every 4 hours. If it is 100% full at 48 hours, at what hour was it 50% full?',
    textTamil: 'ஒரு தரவுத்தளம் ஒவ்வொரு 4 மணி நேரத்திற்கும் இரட்டிப்பாகிறது. 48 மணி நேரத்தில் அது 100% நிறைந்தால், 50% எப்போது நிறைந்திருந்தது?',
    domain: 'Algorithmic Scaling',
    type: 'mcq',
    options: [
      { label: '24 hours', labelTamil: '24 மணி நேரம்', value: 0 },
      { label: '44 hours', labelTamil: '44 மணி நேரம்', value: 1 },
      { label: '40 hours', labelTamil: '40 மணி நேரம்', value: 0 },
      { label: '12 hours', labelTamil: '12 மணி நேரம்', value: 0 }
    ],
    correctIndex: 1
  },
  {
    id: 'apt-4',
    text: 'In an autonomous rover vision system: All sensors are detectors. Some detectors are cameras. Therefore:',
    textTamil: 'ரோபோ பார்வைக் கணிப்பில்: அனைத்து சென்சார்களும் கண்டறியும் கருவிகள். சில கருவிகள் கேமராக்கள். எனில்:',
    domain: 'Deductive Logic',
    type: 'mcq',
    options: [
      { label: 'All sensors are cameras', labelTamil: 'அனைத்து சென்சார்களும் கேமராக்கள்', value: 0 },
      { label: 'Some cameras are detectors', labelTamil: 'சில கேமராக்கள் கண்டறியும் கருவிகள்', value: 1 },
      { label: 'No sensor is a camera', labelTamil: 'எந்த சென்சாரும் கேமரா அல்ல', value: 0 },
      { label: 'All cameras are sensors', labelTamil: 'அனைத்து கேமராக்களும் சென்சார்கள்', value: 0 }
    ],
    correctIndex: 1
  },
  {
    id: 'apt-5',
    text: 'A car battery charges at a rate inversely proportional to the square root of time. If current is 16A at t=1s, what is the current at t=16s?',
    textTamil: 'மின்கல மின்னோட்டம் நேரத்தின் வர்க்கமூலத்திற்கு எதிர்த்தகவில் உள்ளது. t=1s-ல் 16A எனில், t=16s-ல் மின்னோட்டம் என்ன?',
    domain: 'Physics & Mathematical Modeling',
    type: 'mcq',
    options: [
      { label: '8 Amperes', labelTamil: '8 ஆம்பியர்', value: 0 },
      { label: '4 Amperes', labelTamil: '4 ஆம்பியர்', value: 1 },
      { label: '2 Amperes', labelTamil: '2 ஆம்பியர்', value: 0 },
      { label: '1 Ampere', labelTamil: '1 ஆம்பியர்', value: 0 }
    ],
    correctIndex: 1
  },
  {
    id: 'apt-6',
    text: 'If an algorithm processes an array of size N in O(N log N) time, doubling the input size increases computation steps by approximately:',
    textTamil: 'ஒரு அல்காரிதம் N அளவுள்ள தரவை O(N log N) நேரத்தில் செயலாக்கினால், தரவை இரட்டிப்பாக்கும்போது நேரம் எவ்வாறு மாறும்?',
    domain: 'Computational Complexity',
    type: 'mcq',
    options: [
      { label: 'Exactly 2 times', labelTamil: 'சரியாக 2 மடங்கு', value: 0 },
      { label: 'Slightly more than 2 times', labelTamil: '2 மடங்கை விட சற்று அதிகம்', value: 1 },
      { label: '4 times', labelTamil: '4 மடங்கு', value: 0 },
      { label: 'Log N times', labelTamil: 'Log N மடங்கு', value: 0 }
    ],
    correctIndex: 1
  },
  {
    id: 'apt-7',
    text: 'Cube unfolded: If face 1 is opposite face 6, face 2 opposite face 5, which face is adjacent to both 3 and 4?',
    textTamil: 'கனசதுர மடிப்பு: பக்கம் 1-க்கு எதிரே 6, 2-க்கு எதிரே 5 எனில், பக்கம் 3 மற்றும் 4 இரண்டுக்கும் பக்கவாட்டில் இருப்பது எது?',
    domain: 'Spatial Reasoning',
    type: 'mcq',
    options: [
      { label: 'Face 1 and Face 2', labelTamil: 'பக்கம் 1 மற்றும் 2', value: 1 },
      { label: 'Only Face 5', labelTamil: 'பக்கம் 5 மட்டுமே', value: 0 },
      { label: 'Face 3 itself', labelTamil: 'பக்கம் 3', value: 0 },
      { label: 'Face 6 only', labelTamil: 'பக்கம் 6 மட்டுமே', value: 0 }
    ],
    correctIndex: 0
  },
  {
    id: 'apt-8',
    text: 'A student scores 92 in Math, 88 in Physics, 84 in Chemistry. What minimum mark in Computer Science is required for a 90% overall PCM+CS aggregate?',
    textTamil: 'ஒரு மாணவர் கணிதத்தில் 92, இயற்பியலில் 88, வேதியியலில் 84 மதிப்பெண் பெற்றுள்ளார். PCM+CS சராசரி 90% பெற கணினியியலில் குறைந்தபட்ச மதிப்பெண் என்ன?',
    domain: 'Quantitative Calculus',
    type: 'mcq',
    options: [
      { label: '94 marks', labelTamil: '94 மதிப்பெண்கள்', value: 0 },
      { label: '96 marks', labelTamil: '96 மதிப்பெண்கள்', value: 1 },
      { label: '98 marks', labelTamil: '98 மதிப்பெண்கள்', value: 0 },
      { label: '92 marks', labelTamil: '92 மதிப்பெண்கள்', value: 0 }
    ],
    correctIndex: 1
  },
  {
    id: 'apt-9',
    text: 'In Tamil Nadu TNEA engineering counseling formula (Cut-off out of 200 = Maths + (Physics/2) + (Chemistry/2)): If Maths=96, Physics=90, Chem=88, what is the TNEA cut-off?',
    textTamil: 'TNEA பொறியியல் கட்-ஆப் ஃபார்முலா (200-க்கு = கணிதம் + இயற்பியல்/2 + வேதியியல்/2): கணிதம்=96, இயற்பியல்=90, வேதியியல்=88 எனில் கட்-ஆப் என்ன?',
    domain: 'TNEA Engineering Admissions Metric',
    type: 'mcq',
    options: [
      { label: '185.0', value: 0 },
      { label: '187.0', value: 0 },
      { label: '185.0', value: 0 },
      { label: '185.0', value: 1 }
    ],
    correctIndex: 3
  },
  {
    id: 'apt-10',
    text: 'Binary search over 1,000,000 sorted elements takes at most how many comparisons in worst case?',
    textTamil: '10,00,000 வரிசைப்படுத்தப்பட்ட தரவுகளில் பைனரி தேடலுக்கு அதிகபட்சம் எத்தனை ஒப்பீடுகள் தேவைப்படும்?',
    domain: 'Data Structures & Algorithms',
    type: 'mcq',
    options: [
      { label: '10 comparisons', labelTamil: '10 ஒப்பீடுகள்', value: 0 },
      { label: '20 comparisons', labelTamil: '20 ஒப்பீடுகள்', value: 1 },
      { label: '100 comparisons', labelTamil: '100 ஒப்பீடுகள்', value: 0 },
      { label: '1,000 comparisons', labelTamil: '1,000 ஒப்பீடுகள்', value: 0 }
    ],
    correctIndex: 1
  }
];
