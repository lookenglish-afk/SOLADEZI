import { UnitData } from '../../types/index.ts';

export const unit2Data: UnitData = {
  id: 'unit-2',
  unitNumber: 2,
  unitNameEn: 'Computer systems',
  unitNameVi: 'Hệ thống Máy tính (Phần cứng, Phần mềm & Quy chuẩn)',
  pageRange: 'Trang 12 - 19',
  level: 'CEF A1 - A2 (College IT)',
  grammarFocusEn: 'Comparatives (-er, more/less than), Superlatives (the -est, the most/least), Modals (must, can, have to)',
  grammarFocusVi: 'So sánh hơn, So sánh nhất và Động từ khuyết thiếu quy định sử dụng máy tính (must, can, have to)',
  overviewVi: 'Linh kiện phần cứng máy tính (motherboard, CPU, RAM, PSU), phần mềm ứng dụng/hệ thống, so sánh cấu hình và quy tắc sử dụng máy tính nơi công sở.',
  vocabList: [
    {
      id: 'u2-1',
      word: 'motherboard',
      phonetics: '/ˈmʌð.ə.bɔːd/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'bo mạch chủ',
      definitionEn: 'the main printed circuit board containing the principal components of a computer',
      exampleSentence: 'The CPU and main memory are installed directly onto the motherboard.',
      exampleVietnamese: 'CPU và bộ nhớ chính được gắn trực tiếp lên bo mạch chủ.',
      category: 'Hardware'
    },
    {
      id: 'u2-2',
      word: 'CPU (Processor)',
      phonetics: '/ˌsiː.piːˈjuː/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'bộ vi xử lý trung tâm',
      definitionEn: 'Central Processing Unit; the brains of the computer where calculations take place',
      exampleSentence: 'Your processor is faster than mine and handles computing tasks smoothly.',
      exampleVietnamese: 'Bộ vi xử lý của bạn nhanh hơn của tôi và xử lý tác vụ rất mượt mà.',
      category: 'Hardware'
    },
    {
      id: 'u2-3',
      word: 'main memory (RAM)',
      phonetics: '/meɪn ˈmem.ər.i/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'bộ nhớ trong chính (RAM)',
      definitionEn: 'Random Access Memory used to hold programs and data currently in use',
      exampleSentence: 'This computer has a bigger memory, so it can run heavy software without lag.',
      exampleVietnamese: 'Máy tính này có bộ nhớ lớn hơn, vì thế chạy phần mềm nặng không bị giật.',
      category: 'Hardware'
    },
    {
      id: 'u2-4',
      word: 'power supply unit',
      phonetics: '/ˈpaʊə səˌplaɪ ˈjuː.nɪt/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'bộ nguồn máy tính',
      definitionEn: 'a component that supplies power to at least one electric load (converts AC to DC)',
      exampleSentence: 'Connect the power supply unit properly before switching the computer on.',
      exampleVietnamese: 'Hãy kết nối bộ nguồn đúng cách trước khi bật máy tính lên.',
      category: 'Hardware'
    },
    {
      id: 'u2-5',
      word: 'expansion cards',
      phonetics: '/ɪkˈspæn.ʃən kɑːdz/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'card mở rộng (đồ họa, âm thanh)',
      definitionEn: 'printed circuit boards that can be inserted to add functionality like video graphics',
      exampleSentence: 'He inserted a dedicated expansion card to improve graphic rendering speed.',
      exampleVietnamese: 'Anh ấy đã gắn thêm một card mở rộng chuyên dụng để tăng tốc xử lý đồ họa.',
      category: 'Hardware'
    },
    {
      id: 'u2-6',
      word: 'application software',
      phonetics: '/ˌæp.lɪˈkeɪ.ʃən ˈsɒft.weər/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'phần mềm ứng dụng',
      definitionEn: 'software designed to perform specific tasks for users, such as word processing or photo editing',
      exampleSentence: 'Office suites and photo imaging tools are typical examples of application software.',
      exampleVietnamese: 'Bộ ứng dụng văn phòng và công cụ chỉnh sửa ảnh là những ví dụ điển hình của phần mềm ứng dụng.',
      category: 'Software'
    },
    {
      id: 'u2-7',
      word: 'troubleshoot',
      phonetics: '/ˈtrʌb.əl.ʃuːt/',
      partOfSpeech: 'verb',
      vietnameseMeaning: 'tìm và khắc phục sự cố',
      definitionEn: 'to trace and solve problems with a system or software',
      exampleSentence: 'Rob is troubleshooting the software to find out why it stopped running.',
      exampleVietnamese: 'Rob đang tìm và khắc phục sự cố phần mềm để biết tại sao nó ngừng chạy.',
      category: 'Action'
    },
    {
      id: 'u2-8',
      word: 'optical disk drive',
      phonetics: '/ˈɒp.tɪ.kəl dɪsk draɪv/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'ổ đĩa quang (đọc đĩa CD/DVD)',
      definitionEn: 'a disk drive that uses laser light to read or write data from optical discs',
      exampleSentence: 'They are using the optical disk drive to burn backup data onto CDs.',
      exampleVietnamese: 'Họ đang sử dụng ổ đĩa quang để ghi dữ liệu sao lưu ra đĩa CD.',
      category: 'Hardware'
    }
  ],
  matchingPairs: [
    { id: 'm2-1', english: 'motherboard', vietnamese: 'Bo mạch chủ kết nối các linh kiện chính của máy tính', category: 'Hardware' },
    { id: 'm2-2', english: 'power supply unit', vietnamese: 'Bộ nguồn biến đổi và cung cấp điện năng cho case', category: 'Hardware' },
    { id: 'm2-3', english: 'troubleshooting', vietnamese: 'Quá trình phát hiện và xử lý sự cố kỹ thuật', category: 'Tasks' },
    { id: 'm2-4', english: 'main memory (RAM)', vietnamese: 'Bộ nhớ lưu trữ tạm thời các chương trình đang hoạt động', category: 'Hardware' },
    { id: 'm2-5', english: 'mustn\'t eat food at desk', vietnamese: 'Không được phép ăn uống tại bàn làm việc có máy tính', category: 'Rules' }
  ],
  gapFillExercises: [
    {
      id: 'gf2-1',
      sentenceWithBlank: 'That monitor is _____ than mine. (big)',
      missingWord: 'bigger',
      options: ['bigger', 'more big', 'biggest', 'bigness'],
      hintVi: 'Tính từ ngắn "big" trong câu so sánh hơn cần gấp đôi phụ âm cuối trước khi thêm -er',
      explanation: 'Trang 13: "The new monitor was bigger than the old monitor."'
    },
    {
      id: 'gf2-2',
      sentenceWithBlank: 'This version of the software is the _____ to use. (easy)',
      missingWord: 'easiest',
      options: ['easiest', 'most easy', 'easier', 'easyest'],
      hintVi: 'So sánh nhất với tính từ ngắn kết thúc bằng "-y": đổi y thành -iest',
      explanation: 'Trang 14: "That software is the easiest to use."'
    },
    {
      id: 'gf2-3',
      sentenceWithBlank: 'You _____ eat food at your desk or put drinks on the computer.',
      missingWord: 'mustn\'t',
      options: ['mustn\'t', 'don\'t have to', 'can', 'should'],
      hintVi: 'Điều cấm tuyệt đối theo nội quy công ty trang 18',
      explanation: 'Trang 18: "I mustn\'t eat food at my desk or put drinks on the computer."'
    },
    {
      id: 'gf2-4',
      sentenceWithBlank: 'I _____ to back up files every day because that is automatic.',
      missingWord: 'don\'t have to',
      options: ['don\'t have to', 'mustn\'t', 'cannot', 'am not'],
      hintVi: 'Việc không bắt buộc / không cần thiết làm vì hệ thống đã tự động',
      explanation: 'Trang 18: "We use don\'t have to for something that is not necessary: I don\'t have to back up files every day - that\'s automatic."'
    }
  ],
  unscrambleChallenges: [
    {
      id: 'us2-1',
      correctSentence: 'Your processor is faster than mine',
      jumbledWords: ['faster', 'mine', 'is', 'processor', 'than', 'Your'],
      translationVi: 'Bộ vi xử lý của bạn nhanh hơn của tôi.',
      grammarTipVi: 'Cấu trúc so sánh hơn tính từ ngắn: S + be + adj-er + than + pronoun.'
    },
    {
      id: 'us2-2',
      correctSentence: 'I have to log in using my username and password',
      jumbledWords: ['my', 'in', 'have', 'and', 'log', 'I', 'password', 'to', 'using', 'username'],
      translationVi: 'Tôi phải đăng nhập bằng cách sử dụng tên người dùng và mật khẩu của mình.',
      grammarTipVi: 'Cấu trúc biểu thị sự cần thiết: have to + V-infinitive.'
    }
  ],
  roleplayScenario: {
    id: 'rp-u2',
    title: 'Tư vấn lựa chọn máy tính cho nhóm bán hàng (Recommending Hardware)',
    scenarioDescriptionVi: 'Bạn là chuyên viên phần cứng IT. Đồng nghiệp Bob đang phân vân giữa 2 dòng máy tính xách tay cho đội ngũ bán hàng di động. Hãy đưa ra so sánh và tư vấn hợp lý!',
    studentRole: 'IT Hardware Specialist (Daisy)',
    colleagueRole: 'Sales Manager (Bob)',
    context: 'Pearson Longman Unit 2 p.12 - Dialogue on hardware comparison',
    steps: [
      {
        stepId: 1,
        speakerName: 'Bob',
        speakerRole: 'Sales Manager',
        speakerAvatar: '👨‍💼',
        npcDialogueEn: 'Which laptop is better for our sales team? They travel a lot to meet customers.',
        npcDialogueVi: 'Laptop nào tốt hơn cho đội bán hàng của chúng ta? Họ phải di chuyển nhiều để gặp khách.',
        studentTaskVi: 'So sánh kích thước và trọng lượng giữa 2 mẫu máy theo trang 12.',
        options: [
          {
            id: 'opt1-a',
            dialogEn: 'Well, this model is lighter and smaller, which makes it much easier to carry when traveling.',
            dialogVi: 'Mẫu này nhẹ hơn và nhỏ hơn, giúp việc mang theo khi đi công tác dễ dàng hơn nhiều.',
            isBest: true,
            score: 10,
            feedbackVi: 'Tuyệt vời! Áp dụng so sánh hơn "lighter and smaller" rất đúng ngữ cảnh di động.'
          },
          {
            id: 'opt1-b',
            dialogEn: 'Buy the heaviest computer with 10 fans.',
            dialogVi: 'Mua cái máy nặng nhất có 10 quạt đi.',
            isBest: false,
            score: 2,
            feedbackVi: 'Máy quá nặng không phù hợp cho nhân viên phải di chuyển nhiều.'
          }
        ]
      }
    ]
  },
  reviewQuiz10: [
    {
      id: 'q2-1',
      game_type: 'quiz',
      question: 'Which hardware component connects the CPU, memory, and expansion cards together?',
      options: ['Motherboard', 'Monitor', 'Optical disk drive', 'Mouse'],
      correct_answer: 'Motherboard',
      explanation: 'Trang 12: Bo mạch chủ (Motherboard) là bản mạch chính gắn kết vi xử lý, bộ nhớ và các cổng cắm mở rộng.',
      sourceContext: 'Unit 2 p.12'
    },
    {
      id: 'q2-2',
      game_type: 'quiz',
      question: 'What does CPU stand for in computer hardware?',
      options: ['Central Processing Unit', 'Computer Power Unit', 'Core Programming Utility', 'Central Protocol User'],
      correct_answer: 'Central Processing Unit',
      explanation: 'Trang 12: "CPU (Central Processing Unit or Processor)" là bộ vi xử lý của hệ thống.',
      sourceContext: 'Unit 2 p.12'
    },
    {
      id: 'q2-3',
      game_type: 'quiz',
      question: 'Choose the correct comparative form: "This software is _____ than the old version."',
      options: ['more reliable', 'reliabler', 'most reliable', 'more reliabler'],
      correct_answer: 'more reliable',
      explanation: 'Trang 13: "reliable" là tính từ dài, dạng so sánh hơn là "more reliable than".',
      sourceContext: 'Unit 2 p.13'
    },
    {
      id: 'q2-4',
      game_type: 'quiz',
      question: 'What is the irregular comparative form of the adjective "bad"?',
      options: ['worse', 'badder', 'worst', 'more bad'],
      correct_answer: 'worse',
      explanation: 'Trang 13: "bad -> worse (That screen resolution is much worse than before!)"',
      sourceContext: 'Unit 2 p.13'
    },
    {
      id: 'q2-5',
      game_type: 'quiz',
      question: 'What is the superlative form of "good"?',
      options: ['the best', 'the goodest', 'the better', 'the most good'],
      correct_answer: 'the best',
      explanation: 'Trang 14: "good -> the best (I really like this website. It\'s the best I\'ve seen.)"',
      sourceContext: 'Unit 2 p.14'
    },
    {
      id: 'q2-6',
      game_type: 'quiz',
      question: 'Complete the sentence with the correct continuous form: "Are you _____ the software now?"',
      options: ['installing', 'installed', 'installs', 'install'],
      correct_answer: 'installing',
      explanation: 'Trang 16: "Are you installing it now? - We use the present continuous for actions taking place at the time of speaking."',
      sourceContext: 'Unit 2 p.16'
    },
    {
      id: 'q2-7',
      game_type: 'quiz',
      question: 'Complete the sentence: "Rob is _____ the software to find the problem."',
      options: ['troubleshooting', 'burning', 'typing', 'inserting'],
      correct_answer: 'troubleshooting',
      explanation: 'Trang 17: "Rob is troubleshooting the software."',
      sourceContext: 'Unit 2 p.17'
    },
    {
      id: 'q2-8',
      game_type: 'quiz',
      question: 'Which modal verb expresses strict obligation or prohibition in the office?',
      options: ['must / mustn\'t', 'can / can\'t', 'could', 'might'],
      correct_answer: 'must / mustn\'t',
      explanation: 'Trang 18: "We use must and mustn\'t for obligations. (You must come to work on time. You mustn\'t be late.)"',
      sourceContext: 'Unit 2 p.18'
    },
    {
      id: 'q2-9',
      game_type: 'quiz',
      question: 'According to Ben in Unit 2 p.18, why doesn\'t he have to back up files every day?',
      options: ['Because it is automatic', 'Because he doesn\'t care', 'Because he has no files', 'Because his computer is broken'],
      correct_answer: 'Because it is automatic',
      explanation: 'Trang 18: "I don\'t have to back up files every day - that\'s automatic."',
      sourceContext: 'Unit 2 p.18'
    },
    {
      id: 'q2-10',
      game_type: 'quiz',
      question: 'Which component supplies direct electric current to the motherboard and internal drives?',
      options: ['Power supply unit', 'Keyboard', 'Webcam', 'Expansion slot'],
      correct_answer: 'Power supply unit',
      explanation: 'Trang 12: Bộ nguồn máy tính (Power supply unit) là linh kiện cung cấp nguồn điện cho toàn hệ thống.',
      sourceContext: 'Unit 2 p.12'
    }
  ],
  lessonPlan: {
    unitNumber: 2,
    lessonTitle: 'Unit 2: Computer Systems - Hardware Specs & Digital Workplace Rules',
    targetAudience: 'Sinh viên năm nhất CNTT / Kỹ thuật viên bảo trì phần cứng',
    duration: '45 phút (1 tiết học)',
    learningObjectives: {
      language: [
        'Nhận diện và gọi tên chính xác 11 linh kiện phần cứng máy tính.',
        'Sử dụng câu so sánh hơn và so sánh nhất để phân tích thông số kỹ thuật (RAM, CPU, HDD).',
        'Sử dụng modal verbs (must, mustn\'t, don\'t have to) diễn đạt quy chuẩn an toàn số.'
      ],
      digitalCompetence: [
        'DigComp 2.2 - Lĩnh vực 1: Thông tin và dữ liệu số (So sánh cấu hình phần cứng).',
        'DigComp 2.2 - Lĩnh vực 4: An toàn số (Bảo vệ thiết bị và tuân thủ quy tắc văn phòng).'
      ]
    },
    phases: [
      {
        timeMinutes: '00 - 08 (8 phút)',
        phaseId: 'warmup',
        phaseNameVi: 'I. Khởi động (Hardware Visual Warm-up)',
        phaseNameEn: 'Hardware Identification',
        teacherActivity: 'Chiếu sơ đồ thùng máy tính (case diagram) và yêu cầu nhận diện các vị trí linh kiện.',
        studentActivity: 'Lật thẻ Flashcard tìm nhanh tên tiếng Anh tương ứng của bo mạch chủ, CPU và nguồn.',
        digitalTools: ['Interactive Hardware Flashcards', 'Màn hình tương tác 16:9'],
        digCompCompetence: '1.1 Duyệt và lọc dữ liệu phần cứng'
      },
      {
        timeMinutes: '08 - 18 (10 phút)',
        phaseId: 'teaching_vocab',
        phaseNameVi: 'II. Dạy từ vựng & Cấu trúc so sánh (Hardware Specs & Comparatives)',
        phaseNameEn: 'Vocabulary & Comparatives',
        teacherActivity: 'Giới thiệu tính từ mô tả thông số: fast/faster, reliable/more reliable, heavy/lighter.',
        studentActivity: 'Thực hành phát âm cùng audio, đọc to bảng thông số so sánh hai thanh nhớ flash drive.',
        digitalTools: ['Native Speech Synthesis', 'Spec Sheet Interactive Viewer'],
        digCompCompetence: '1.2 Đánh giá dữ liệu công nghệ'
      },
      {
        timeMinutes: '18 - 25 (7 phút)',
        phaseId: 'checking_vocab',
        phaseNameVi: 'III. Thử thách nối định nghĩa (Hardware Matching)',
        phaseNameEn: 'Matching Game Challenge',
        teacherActivity: 'Bật minigame ghép từ và bấm giờ thi đấu giữa các nhóm.',
        studentActivity: 'Ghép linh kiện với chức năng và dịch nghĩa tiếng Việt.',
        digitalTools: ['Matching Game Module', 'Classroom Timer'],
        digCompCompetence: '2.1 Tương tác số'
      },
      {
        timeMinutes: '25 - 35 (10 phút)',
        phaseId: 'drilling',
        phaseNameVi: 'IV. Luyện tập ngữ pháp & Quy tắc văn phòng (Modals Practice)',
        phaseNameEn: 'Modals of Obligation Drilling',
        teacherActivity: 'Điều phối bài tập trắc nghiệm và điền từ về quy định sử dụng máy tính nơi công sở.',
        studentActivity: 'Điền must, mustn\'t, don\'t have to vào các câu tình huống an toàn.',
        digitalTools: ['Gap-fill Interactive Engine', 'Instant Feedback System'],
        digCompCompetence: '4.1 Bảo vệ thiết bị số'
      },
      {
        timeMinutes: '35 - 45 (10 phút)',
        phaseId: 'roleplay_writing',
        phaseNameVi: 'V. Tư vấn chọn thiết bị (Hardware Advisory Simulation)',
        phaseNameEn: 'Consulting Sales Team',
        teacherActivity: 'Đặt tình huống tư vấn laptop cho phòng kinh doanh di động.',
        studentActivity: 'Thực hành đóng vai và chọn các lý do kỹ thuật thuyết phục.',
        digitalTools: ['Roleplay Simulator', 'Google Docs mini template'],
        digCompCompetence: '2.4 Hợp tác và giao tiếp công việc'
      }
    ]
  }
};
