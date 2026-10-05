import { TestUnit, TestSubmission } from '../types/index.ts';

const CUSTOM_TESTS_KEY = 'nmt_custom_tests_v2';
const TEST_SUBMISSIONS_KEY = 'nmt_test_submissions_v2';

export const defaultTestUnits: TestUnit[] = [
  {
    id: 'test-u1',
    unitCode: 'TEST-U1',
    title: 'Unit 1 Progress Test: Working in the IT Industry',
    descriptionVi: 'Đề kiểm tra tiến độ Unit 1: Vị trí việc làm CNTT, đại từ sở hữu, thì hiện tại đơn và từ viết tắt IT (HTML, FTP, WLAN).',
    timeLimitMinutes: 15,
    totalQuestions: 10,
    createdAt: '2026-10-05',
    questions: [
      {
        id: 'u1-t1',
        question: 'Who is responsible for setting up firewalls, wireless connection, usernames and passwords?',
        options: ['Network administrator', 'Software developer', 'Database analyst', 'Hardware cashier'],
        correctAnswer: 'Network administrator',
        explanation: 'Unit 1 p.6 & p.11: Network administrator chịu trách nhiệm thiết lập tường lửa và quyền truy cập mạng.',
        points: 10
      },
      {
        id: 'u1-t2',
        question: 'Karl is a software developer. He _____ and develops computer games.',
        options: ['designs', 'designing', 'design', 'are designing'],
        correctAnswer: 'designs',
        explanation: 'Unit 1 p.6 & Audio 5: Karl designs and develops computer games (thì hiện tại đơn ngôi he).',
        points: 10
      },
      {
        id: 'u1-t3',
        question: 'What does HTML stand for in Unit 1 p.10?',
        options: ['HyperText Markup Language', 'High Tech Machine Language', 'Home Tool Markup Level', 'Hyperlink Text Main Line'],
        correctAnswer: 'HyperText Markup Language',
        explanation: 'Unit 1 p.10: HTML (HyperText Markup Language) describes the structure of a web page.',
        points: 10
      },
      {
        id: 'u1-t4',
        question: 'What does FTP stand for?',
        options: ['File Transfer Protocol', 'Fast Transmission Process', 'Folder Terminal Point', 'Format Text Program'],
        correctAnswer: 'File Transfer Protocol',
        explanation: 'Unit 1 p.10: FTP is a standard network protocol used to copy a file from one host to another.',
        points: 10
      },
      {
        id: 'u1-t5',
        question: 'Wojtek is a database administrator. He _____ and presents electronic data.',
        options: ['analyses', 'analysing', 'analyse', 'are analysing'],
        correctAnswer: 'analyses',
        explanation: 'Unit 1 p.6 & Audio 5: Wojtek analyses and presents electronic data.',
        points: 10
      },
      {
        id: 'u1-t6',
        question: 'Choose the correct preposition: "The CISCO security workshop starts _____ 9.15."',
        options: ['at', 'in', 'on', 'for'],
        correctAnswer: 'at',
        explanation: 'Unit 1 p.8: "We use at with clock times: It starts at 9.15."',
        points: 10
      },
      {
        id: 'u1-t7',
        question: 'What is Andrew\'s job in Unit 1 p.6?',
        options: ['IT support officer', 'Network architect', 'Sales manager', 'Company accountant'],
        correctAnswer: 'IT support officer',
        explanation: 'Unit 1 p.6: Andrew is an IT support officer. His job is to make sure all of the computers work properly.',
        points: 10
      },
      {
        id: 'u1-t8',
        question: 'Complete the sentence: "Eli and Guido are system maintenance officers. _____ job is to keep systems going."',
        options: ['Their', 'Our', 'His', 'Her'],
        correctAnswer: 'Their',
        explanation: 'Unit 1 p.5: Eli and Guido là ngôi thứ ba số nhiều nên dùng tính từ sở hữu "Their".',
        points: 10
      },
      {
        id: 'u1-t9',
        question: 'What does WLAN stand for?',
        options: ['Wireless Local Area Network', 'Wide Local Access Node', 'Web Linked Area Network', 'World Local Area Network'],
        correctAnswer: 'Wireless Local Area Network',
        explanation: 'Unit 1 p.10: WLAN uses high-frequency radio waves to communicate between nodes.',
        points: 10
      },
      {
        id: 'u1-t10',
        question: 'Choose the standard business question for asking someone\'s occupation in IT:',
        options: ['What do you do?', 'What are you do?', 'What do you doing?', 'How do you do your work?'],
        correctAnswer: 'What do you do?',
        explanation: 'Unit 1 p.6: "What do you do? - I am a programmer."',
        points: 10
      }
    ]
  },
  {
    id: 'test-u2',
    unitCode: 'TEST-U2',
    title: 'Unit 2 Progress Test: Computer Systems & Hardware',
    descriptionVi: 'Đề kiểm tra Unit 2: Linh kiện phần cứng máy tính (Motherboard, CPU, RAM, PSU), câu so sánh và quy tắc an toàn công sở.',
    timeLimitMinutes: 15,
    totalQuestions: 10,
    createdAt: '2026-10-05',
    questions: [
      {
        id: 'u2-t1',
        question: 'Which component is the main printed circuit board containing principal components of a computer?',
        options: ['Motherboard', 'Monitor', 'Optical disk drive', 'Mouse'],
        correctAnswer: 'Motherboard',
        explanation: 'Unit 2 p.12: Motherboard (bo mạch chủ) kết nối CPU, RAM và các khe cắm mở rộng.',
        points: 10
      },
      {
        id: 'u2-t2',
        question: 'What does CPU stand for in computer hardware?',
        options: ['Central Processing Unit', 'Computer Power Unit', 'Core Programming Utility', 'Central Protocol User'],
        correctAnswer: 'Central Processing Unit',
        explanation: 'Unit 2 p.12: CPU (Central Processing Unit or Processor) là bộ vi xử lý trung tâm.',
        points: 10
      },
      {
        id: 'u2-t3',
        question: 'Complete the comparative: "That monitor is _____ than mine. (big)"',
        options: ['bigger', 'more big', 'biggest', 'bigness'],
        correctAnswer: 'bigger',
        explanation: 'Unit 2 p.13: "big" gấp đôi phụ âm cuối trước khi thêm -er: bigger than.',
        points: 10
      },
      {
        id: 'u2-t4',
        question: 'What is the comparative form of the irregular adjective "bad"?',
        options: ['worse', 'badder', 'worst', 'more bad'],
        correctAnswer: 'worse',
        explanation: 'Unit 2 p.13: bad -> worse (That screen resolution is much worse than before!).',
        points: 10
      },
      {
        id: 'u2-t5',
        question: 'Which modal verb expresses strict prohibition at the office desk?',
        options: ['mustn\'t', 'don\'t have to', 'can', 'should'],
        correctAnswer: 'mustn\'t',
        explanation: 'Unit 2 p.18: "You mustn\'t eat food at your desk or put drinks on the computer."',
        points: 10
      },
      {
        id: 'u2-t6',
        question: 'What does Ben say about backing up files in Unit 2 p.18?',
        options: ['I don\'t have to back up files every day - that\'s automatic', 'I must back up files every hour', 'I can\'t back up files', 'I shouldn\'t use files'],
        correctAnswer: 'I don\'t have to back up files every day - that\'s automatic',
        explanation: 'Unit 2 p.18: We use don\'t have to for something that is not necessary because it is automated.',
        points: 10
      },
      {
        id: 'u2-t7',
        question: 'Complete the sentence: "Rob is _____ the software to find the issue."',
        options: ['troubleshooting', 'burning', 'inserting', 'typing'],
        correctAnswer: 'troubleshooting',
        explanation: 'Unit 2 p.17: Rob is troubleshooting the software.',
        points: 10
      },
      {
        id: 'u2-t8',
        question: 'Which component supplies power to all parts of the computer?',
        options: ['Power supply unit', 'Keypad', 'Headphone', 'Expansion slot'],
        correctAnswer: 'Power supply unit',
        explanation: 'Unit 2 p.12: Power supply unit (bộ nguồn) cấp điện áp cho bo mạch và ổ đĩa.',
        points: 10
      },
      {
        id: 'u2-t9',
        question: 'Choose the correct superlative: "This software is the _____ to use. (easy)"',
        options: ['easiest', 'most easy', 'easier', 'easyest'],
        correctAnswer: 'easiest',
        explanation: 'Unit 2 p.14: easy đổi thành easiest.',
        points: 10
      },
      {
        id: 'u2-t10',
        question: 'What is the function of an expansion card (graphic/video)?',
        options: ['To add video or audio capabilities to the motherboard', 'To clean the computer fan', 'To supply high voltage AC power', 'To type letters'],
        correctAnswer: 'To add video or audio capabilities to the motherboard',
        explanation: 'Unit 2 p.12: Expansion cards add specific capabilities like 3D graphics rendering.',
        points: 10
      }
    ]
  },
  {
    id: 'test-midterm',
    unitCode: 'MIDTERM-EXAM',
    title: 'Midterm Comprehensive Test (Units 1 - 4)',
    descriptionVi: 'Đề thi giữa kỳ tổng hợp: Ngành CNTT, Phần cứng, Quy trình làm website (7 bước) và 6 bước xử lý dữ liệu CSDL.',
    timeLimitMinutes: 25,
    totalQuestions: 10,
    createdAt: '2026-10-05',
    questions: [
      {
        id: 'mid-1',
        question: 'What is the second step in website development according to Unit 3 p.24?',
        options: ['Analyse the information from the customer', 'Test the website', 'Write HTML coding', 'Create the invoice'],
        correctAnswer: 'Analyse the information from the customer',
        explanation: 'Unit 3 p.24: (1) First, discuss with customer... (2) Secondly, analyse the information from the customer.',
        points: 10
      },
      {
        id: 'mid-2',
        question: 'What does "bounce rate" measure in website analytics?',
        options: ['Percentage of visitors who leave after viewing only one page', 'Total number of connected cables', 'Speed of the CPU', 'Weight of the laptop'],
        correctAnswer: 'Percentage of visitors who leave after viewing only one page',
        explanation: 'Unit 3 p.22: Bounce rate là tỷ lệ khách thoát trang ngay sau khi chỉ xem một trang duy nhất.',
        points: 10
      },
      {
        id: 'mid-3',
        question: 'What is the correct order of the first 3 steps in data processing (Unit 4 p.30)?',
        options: ['Collection -> Sorting -> Coding', 'Tabulation -> Entry -> Validation', 'Validation -> Collection -> Sorting', 'Entry -> Sorting -> Tabulation'],
        correctAnswer: 'Collection -> Sorting -> Coding',
        explanation: 'Unit 4 p.30 & 73: 1. Collection (thu thập), 2. Sorting (phân loại), 3. Coding (mã hóa).',
        points: 10
      },
      {
        id: 'mid-4',
        question: 'What does "data validation" mean in Unit 4?',
        options: ['Clean the data and double-check for faults and inconsistencies', 'Delete all database tables', 'Buy more hard disks', 'Format the operating system'],
        correctAnswer: 'Clean the data and double-check for faults and inconsistencies',
        explanation: 'Unit 4 p.30: Validation là làm sạch và kiểm tra chéo các mâu thuẫn/lỗi dữ liệu.',
        points: 10
      },
      {
        id: 'mid-5',
        question: 'Which emerging technology allows colleagues to share resources and software over the Internet (Unit 4 p.32)?',
        options: ['Cloud computing', 'Magnetic tape', 'Dot matrix printer', 'Floppy disk'],
        correctAnswer: 'Cloud computing',
        explanation: 'Unit 4 p.32: Cloud computing cho phép chia sẻ tài nguyên, phần mềm qua mạng Internet.',
        points: 10
      },
      {
        id: 'mid-6',
        question: 'Choose the polite request structure (Unit 4 p.29):',
        options: ['Could you help me a moment, please?', 'Could you to help me, please?', 'Could you helping me, please?', 'Are you help me?'],
        correctAnswer: 'Could you help me a moment, please?',
        explanation: 'Unit 4 p.29: Could you + bare infinitive (không to).',
        points: 10
      },
      {
        id: 'mid-7',
        question: 'Which company department works with data about "profits, tax, loans, shares and cash" (Unit 4 p.34)?',
        options: ['Finance', 'Human resources', 'Production', 'Customer relations'],
        correctAnswer: 'Finance',
        explanation: 'Unit 4 p.34: Finance quản lý số liệu tài chính, thuế, lợi nhuận và cổ phần.',
        points: 10
      },
      {
        id: 'mid-8',
        question: 'What is the purpose of an educational website (Unit 3 p.20)?',
        options: ['To share knowledge and enable online learning', 'To sell physical clothes only', 'To show movie trailers only', 'To crack software passwords'],
        correctAnswer: 'To share knowledge and enable online learning',
        explanation: 'Unit 3 p.20: Educational websites aim to share knowledge and enable online learning.',
        points: 10
      },
      {
        id: 'mid-9',
        question: 'Complete the sentence: "We need a _____ users to test the website." (countable plural)',
        options: ['few', 'little', 'much', 'lot'],
        correctAnswer: 'few',
        explanation: 'Unit 5 p.36: We use "a few" with countable plural nouns (users).',
        points: 10
      },
      {
        id: 'mid-10',
        question: 'What does a systems analyst do in an IT company (Unit 1)?',
        options: ['Studies computer systems and solves computer problems', 'Carries computer boxes in warehouse', 'Writes handwritten sales receipts', 'Draws cartoon characters'],
        correctAnswer: 'Studies computer systems and solves computer problems',
        explanation: 'Unit 1 p.6 & Audio 5: "Heba: I\'m a system analyst. I solve computer problems."',
        points: 10
      }
    ]
  }
];

export class TestStorageService {
  static saveCustomTest(test: TestUnit): void {
    try {
      const saved = localStorage.getItem(CUSTOM_TESTS_KEY);
      const custom: TestUnit[] = saved ? JSON.parse(saved) : [];
      const updated = [test, ...custom.filter(t => t.id !== test.id)];
      localStorage.setItem(CUSTOM_TESTS_KEY, JSON.stringify(updated));
    } catch {
      // storage error
    }
  }

  static deleteTest(testId: string): void {
    try {
      const saved = localStorage.getItem(CUSTOM_TESTS_KEY);
      const custom: TestUnit[] = saved ? JSON.parse(saved) : [];
      const filtered = custom.filter(t => t.id !== testId);
      localStorage.setItem(CUSTOM_TESTS_KEY, JSON.stringify(filtered));

      // Also support tracking deleted standard tests
      const deletedStdKey = 'nmt_deleted_std_tests_v1';
      const deletedStd: string[] = JSON.parse(localStorage.getItem(deletedStdKey) || '[]');
      if (!deletedStd.includes(testId)) {
        deletedStd.push(testId);
        localStorage.setItem(deletedStdKey, JSON.stringify(deletedStd));
      }
    } catch {
      // storage error
    }
  }

  static getAllTests(): TestUnit[] {
    try {
      const saved = localStorage.getItem(CUSTOM_TESTS_KEY);
      const custom: TestUnit[] = saved ? JSON.parse(saved) : [];
      const deletedStdKey = 'nmt_deleted_std_tests_v1';
      const deletedStd: string[] = JSON.parse(localStorage.getItem(deletedStdKey) || '[]');
      const activeStandards = defaultTestUnits.filter(t => !deletedStd.includes(t.id));
      return [...activeStandards, ...custom];
    } catch {
      return defaultTestUnits;
    }
  }

  static getSubmissions(): TestSubmission[] {
    try {
      const saved = localStorage.getItem(TEST_SUBMISSIONS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  static saveSubmission(sub: TestSubmission): void {
    try {
      const existing = this.getSubmissions();
      const updated = [sub, ...existing.filter(s => s.id !== sub.id)];
      localStorage.setItem(TEST_SUBMISSIONS_KEY, JSON.stringify(updated));
    } catch {
      // storage error
    }
  }

  static clearSubmissions(): void {
    try {
      localStorage.removeItem(TEST_SUBMISSIONS_KEY);
    } catch {
      // ignore
    }
  }
}
