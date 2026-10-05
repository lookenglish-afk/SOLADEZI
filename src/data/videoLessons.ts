import { VideoLesson } from '../types/index.ts';

export const defaultVideoLessons: VideoLesson[] = [
  {
    id: 'vid-u1',
    unitNumber: 1,
    title: 'Unit 1: Working in IT - Job Roles & Workplace Meeting',
    descriptionVi: 'Video mô phỏng môi trường làm việc phòng CNTT, các chức danh nghề nghiệp và giới thiệu đồng nghiệp.',
    // Standard reliable open-source MP4 video stream
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    durationSeconds: 15,
    checkpoints: [
      {
        id: 'cp1-1',
        timestampSeconds: 4,
        question: 'Which IT professional is responsible for setting up firewalls and network security?',
        options: ['Network administrator', 'Software developer', 'Database analyst', 'Marketing manager'],
        correctAnswer: 'Network administrator',
        explanationVi: 'Theo Pearson Unit 1: Network administrator chịu trách nhiệm thiết lập tường lửa, bảo mật và tài khoản người dùng.'
      },
      {
        id: 'cp1-2',
        timestampSeconds: 10,
        question: 'What does Karl do as a software developer?',
        options: ['Designs and develops computer games', 'Fixes network cables', 'Cleans the printer', 'Orders stationary'],
        correctAnswer: 'Designs and develops computer games',
        explanationVi: 'Theo Unit 1 trang 6 & Audio 5: "Karl: I\'m a software developer. I design and develop computer games."'
      }
    ]
  },
  {
    id: 'vid-u2',
    unitNumber: 2,
    title: 'Unit 2: Computer Systems - Hardware Components & Architecture',
    descriptionVi: 'Khám phá cấu trúc thùng máy tính, vi xử lý CPU, bộ nhớ RAM và bo mạch chủ.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    durationSeconds: 15,
    checkpoints: [
      {
        id: 'cp2-1',
        timestampSeconds: 5,
        question: 'Which component is the main printed circuit board connecting CPU and RAM?',
        options: ['Motherboard', 'Power supply unit', 'Mouse', 'Optical drive'],
        correctAnswer: 'Motherboard',
        explanationVi: 'Trang 12: Bo mạch chủ (Motherboard) là bản mạch chính gắn kết vi xử lý và bộ nhớ RAM.'
      },
      {
        id: 'cp2-2',
        timestampSeconds: 11,
        question: 'Choose the correct comparative: "Your processor is _____ than mine."',
        options: ['faster', 'more fast', 'fastest', 'more faster'],
        correctAnswer: 'faster',
        explanationVi: 'Trang 13: "fast" là tính từ ngắn, dạng so sánh hơn là "faster than".'
      }
    ]
  },
  {
    id: 'vid-u7',
    unitNumber: 7,
    title: 'Unit 7: IT Support - Helpdesk Fault Diagnosis & Repair Tools',
    descriptionVi: 'Quy trình xử lý sự cố tiếp nhận tại quầy Helpdesk và bộ dụng cụ chống tĩnh điện.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    durationSeconds: 15,
    checkpoints: [
      {
        id: 'cp7-1',
        timestampSeconds: 5,
        question: 'Which tool is worn on the wrist to prevent electrostatic discharge (ESD)?',
        options: ['Anti-static wrist strap', 'Tweezers', 'Hex key set', 'Ratchet driver'],
        correctAnswer: 'Anti-static wrist strap',
        explanationVi: 'Trang 56: Vòng đeo tay chống tĩnh điện (anti-static wrist strap) bảo vệ vi mạch khỏi phóng tĩnh điện.'
      },
      {
        id: 'cp7-2',
        timestampSeconds: 11,
        question: 'Complete the sentence: "This tool is used for _____ the screws."',
        options: ['tightening', 'tighten', 'to tighten', 'tightened'],
        correctAnswer: 'tightening',
        explanationVi: 'Trang 57: Cấu trúc "used for + V-ing": This tool is used for tightening the screws.'
      }
    ]
  }
];
