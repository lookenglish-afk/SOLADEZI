import { UnitData } from '../../types/index.ts';

export const unit4Data: UnitData = {
  id: 'unit-4',
  unitNumber: 4,
  unitNameEn: 'Databases & Data Processing',
  unitNameVi: 'Cơ sở Dữ liệu & Xử lý Dữ liệu',
  pageRange: 'Trang 28 - 35',
  level: 'CEF A1 - A2 (College IT)',
  grammarFocusEn: 'Polite requests (Could you / Would you / Can you + infinitive) & Giving advice (should / shouldn\'t, would recommend)',
  grammarFocusVi: 'Lời đề nghị lịch sự (Could you / Would you...) và Đưa ra lời khuyên kỹ thuật (should / would recommend)',
  overviewVi: 'Khái niệm cơ sở dữ liệu, các bước xử lý dữ liệu (collection, sorting, coding, entry, validation, tabulation), giải pháp lưu trữ đám mây và phòng ban doanh nghiệp.',
  vocabList: [
    {
      id: 'u4-1',
      word: 'data collection',
      phonetics: '/ˈdeɪ.tə kəˈlek.ʃən/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'thu thập dữ liệu thô',
      definitionEn: 'the first step: gather the raw data which you want to process',
      exampleSentence: 'In the first step, you gather the raw data; that is called data collection.',
      exampleVietnamese: 'Ở bước đầu tiên, bạn thu thập dữ liệu thô; bước đó được gọi là thu thập dữ liệu.',
      category: 'Data Processing'
    },
    {
      id: 'u4-2',
      word: 'data validation',
      phonetics: '/ˈdeɪ.tə ˌvæl.ɪˈdeɪ.ʃən/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'xác thực / làm sạch dữ liệu',
      definitionEn: 'clean the data and double-check for faults and inconsistencies',
      exampleSentence: 'Data validation is vital to ensure no corrupted or incorrect records enter the database.',
      exampleVietnamese: 'Xác thực dữ liệu rất quan trọng để đảm bảo không có bản ghi lỗi hay sai lệch nào vào CSDL.',
      category: 'Data Processing'
    },
    {
      id: 'u4-3',
      word: 'data tabulation',
      phonetics: '/ˈdeɪ.tə ˌtæb.jʊˈleɪ.ʃən/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'lập bảng biểu dữ liệu',
      definitionEn: 'format and arrange the data into table format so that it can be analysed',
      exampleSentence: 'Finally, we format the records into rows and columns during data tabulation.',
      exampleVietnamese: 'Cuối cùng, chúng tôi định dạng các bản ghi thành các hàng và cột trong bước lập bảng biểu.',
      category: 'Data Processing'
    },
    {
      id: 'u4-4',
      word: 'cloud computing',
      phonetics: '/klaʊd kəmˈpjuː.tɪŋ/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'điện toán đám mây',
      definitionEn: 'technology that allows sharing resources, software and data over the Internet',
      exampleSentence: 'Cloud computing allows colleagues in an organisation to share files remotely over the Internet.',
      exampleVietnamese: 'Điện toán đám mây cho phép đồng nghiệp trong cơ quan chia sẻ tệp từ xa qua Internet.',
      category: 'Storage'
    },
    {
      id: 'u4-5',
      word: 'external hard drive',
      phonetics: '/ɪkˈstɜː.nəl hɑːd draɪv/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'ổ cứng gắn ngoài di động',
      definitionEn: 'a portable storage drive that plugs into a computer via USB to back up files',
      exampleSentence: 'Sandy recommended an external hard drive with automatic backup feature.',
      exampleVietnamese: 'Sandy đã khuyên nên mua một ổ cứng gắn ngoài có tính năng tự động sao lưu.',
      category: 'Storage'
    }
  ],
  matchingPairs: [
    { id: 'm4-1', english: 'collection', vietnamese: 'Thu thập dữ liệu thô cần đưa vào xử lý', category: 'Data Steps' },
    { id: 'm4-2', english: 'sorting', vietnamese: 'Tạo danh mục để phân chia dữ liệu vào các nhóm phù hợp', category: 'Data Steps' },
    { id: 'm4-3', english: 'coding', vietnamese: 'Sắp xếp và hệ thống hóa dữ liệu theo mã quy ước', category: 'Data Steps' },
    { id: 'm4-4', english: 'entry', vietnamese: 'Nhập dữ liệu trực tiếp vào hệ thống', category: 'Data Steps' },
    { id: 'm4-5', english: 'validation', vietnamese: 'Làm sạch và kiểm tra chéo lỗi, điểm mâu thuẫn', category: 'Data Steps' },
    { id: 'm4-6', english: 'tabulation', vietnamese: 'Định dạng dữ liệu thành cấu trúc bảng để phân tích', category: 'Data Steps' }
  ],
  gapFillExercises: [
    {
      id: 'gf4-1',
      sentenceWithBlank: 'Could you _____ me a moment, please? (help)',
      missingWord: 'help',
      options: ['help', 'to help', 'helping', 'helped'],
      hintVi: 'Sau could you dùng động từ nguyên mẫu không to (bare infinitive)',
      explanation: 'Trang 29 (Language box): "We use can/could/would you + infinitive without to when we ask somebody to do something."'
    },
    {
      id: 'gf4-2',
      sentenceWithBlank: 'You _____ buy an external hard drive for backup. (khuyên nên)',
      missingWord: 'should',
      options: ['should', 'should to', 'mustn\'t', 'wouldn\'t'],
      hintVi: 'Động từ chỉ lời khuyên tích cực',
      explanation: 'Trang 33: "You should buy a flash drive. We use should/would + infinitive without to to give advice."'
    },
    {
      id: 'gf4-3',
      sentenceWithBlank: 'A database is used to _____ our financial information and records.',
      missingWord: 'store',
      options: ['store', 'spread', 'delete', 'cancel'],
      hintVi: 'Lưu trữ thông tin tài chính',
      explanation: 'Trang 31: "This database is used to store our financial information."'
    }
  ],
  unscrambleChallenges: [
    {
      id: 'us4-1',
      correctSentence: 'Could you please explain what a database is?',
      jumbledWords: ['a', 'database', 'what', 'Could', 'please', 'you', 'explain', 'is?'],
      translationVi: 'Bạn có thể vui lòng giải thích cơ sở dữ liệu là gì được không?',
      grammarTipVi: 'Câu yêu cầu lịch sự: Could you please + V-bare...?'
    },
    {
      id: 'us4-2',
      correctSentence: 'I would recommend an external hard drive with automatic backup',
      jumbledWords: ['backup', 'with', 'would', 'I', 'an', 'external', 'recommend', 'hard', 'automatic', 'drive'],
      translationVi: 'Tôi khuyên bạn nên dùng một ổ cứng gắn ngoài có tính năng tự động sao lưu.',
      grammarTipVi: 'Đưa ra lời khuyên: I would recommend + noun phrase.'
    }
  ],
  roleplayScenario: {
    id: 'rp-u4',
    title: 'Hỗ trợ đồng nghiệp tra cứu ngân sách trong cơ sở dữ liệu (Database Lookup)',
    scenarioDescriptionVi: 'Bạn là chuyên viên Tim. Chris cần tra cứu số liệu cuốn sách Basic French từ hệ thống TRD (Tracking Resource Database) nhưng quên thao tác. Hãy hướng dẫn bạn ấy từng bước!',
    studentRole: 'IT Senior Colleague (Tim)',
    colleagueRole: 'Colleague (Chris)',
    context: 'Pearson Longman Unit 4 p.28 - TRD Database Navigation Dialogue',
    steps: [
      {
        stepId: 1,
        speakerName: 'Chris',
        speakerRole: 'Colleague',
        speakerAvatar: '🧑‍💻',
        npcDialogueEn: "Tim, could you help me a moment, please? I need some information from the database, but I don't know how to get it.",
        npcDialogueVi: 'Tim, bạn giúp mình một lát được không? Mình cần lấy thông tin trong CSDL nhưng không biết lấy thế nào.',
        studentTaskVi: 'Sẵn sàng hỗ trợ và hướng dẫn bước đầu tiên (đăng nhập).',
        options: [
          {
            id: 'opt1-a',
            dialogEn: 'Sure, no problem! First, enter your name and password, then press Enter.',
            dialogVi: 'Được chứ, không vấn đề gì! Đầu tiên, bạn nhập tên và mật khẩu rồi bấm Enter.',
            isBest: true,
            score: 10,
            feedbackVi: 'Chính xác! Lời thoại bám sát trang 28: "Enter your name and password and press Enter."'
          },
          {
            id: 'opt1-b',
            dialogEn: 'I am sleeping now. Go find someone else.',
            dialogVi: 'Tôi đang ngủ. Đi tìm người khác đi.',
            isBest: false,
            score: 0,
            feedbackVi: 'Thái độ thiếu hợp tác trong môi trường làm việc.'
          }
        ]
      }
    ]
  },
  reviewQuiz10: [
    {
      id: 'q4-1',
      game_type: 'quiz',
      question: 'What is the first step in the data processing cycle (Unit 4 p.30)?',
      options: ['Data collection', 'Data validation', 'Data tabulation', 'Data entry'],
      correct_answer: 'Data collection',
      explanation: 'Trang 30 & 73: "Right, the first step in the process is you gather the raw data which you want to process. That\'s called collection."',
      sourceContext: 'Unit 4 p.30 & p.73'
    },
    {
      id: 'q4-2',
      game_type: 'quiz',
      question: 'What happens during "data validation" (Unit 4 p.30)?',
      options: ['Clean the data and double-check for faults and inconsistencies', 'Delete all records permanently', 'Buy new hard drives', 'Send emails to all staff'],
      correct_answer: 'Clean the data and double-check for faults and inconsistencies',
      explanation: 'Trang 30 & 73: "Validation: clean the data and double-check for faults and inconsistencies."',
      sourceContext: 'Unit 4 p.30 & p.73'
    },
    {
      id: 'q4-3',
      game_type: 'quiz',
      question: 'What does "data tabulation" mean?',
      options: ['Arrange the data into table format so that it can be analysed', 'Print paper files to warehouse', 'Change network password', 'Install a new antivirus'],
      correct_answer: 'Arrange the data into table format so that it can be analysed',
      explanation: 'Trang 30: "Tabulation: format and arrange the data so that it can be analysed."',
      sourceContext: 'Unit 4 p.30 & p.73'
    },
    {
      id: 'q4-4',
      game_type: 'quiz',
      question: 'Which technology allows colleagues to share resources, software, and data over the Internet (p.32)?',
      options: ['Cloud computing', 'Magnetic tape', 'Dot matrix printer', 'Floppy disk'],
      correct_answer: 'Cloud computing',
      explanation: 'Trang 32: "One emerging technology in this area is cloud computing. This allows colleagues in an organisation to share resources, software and information over the Internet."',
      sourceContext: 'Unit 4 p.32'
    },
    {
      id: 'q4-5',
      game_type: 'quiz',
      question: 'Which modal structure is correct for a polite request?',
      options: ['Could you help me, please?', 'Could you to help me, please?', 'Could you helping me, please?', 'Are you could help me?'],
      correct_answer: 'Could you help me, please?',
      explanation: 'Trang 29: "We use can/could/would you + infinitive without to: Could you help me, please?"',
      sourceContext: 'Unit 4 p.29'
    },
    {
      id: 'q4-6',
      game_type: 'quiz',
      question: 'Which company department works with data about "profits, tax, loans, shares and cash" (p.34)?',
      options: ['Finance', 'Human resources', 'Production', 'Customer relations'],
      correct_answer: 'Finance',
      explanation: 'Trang 34: "1. Finance matches c) data about profits, tax, loans, shares and cash."',
      sourceContext: 'Unit 4 p.34'
    },
    {
      id: 'q4-7',
      game_type: 'quiz',
      question: 'Which department works with "CVs, job descriptions, employee personal data, and training" (p.34)?',
      options: ['Human resources', 'Sales', 'Technical support', 'Stock management'],
      correct_answer: 'Human resources',
      explanation: 'Trang 34: "Human resources works with personal data: CVs, job descriptions, employee personal data, training."',
      sourceContext: 'Unit 4 p.34'
    },
    {
      id: 'q4-8',
      game_type: 'quiz',
      question: 'What special feature did Sandy recommend for Tim\'s backup drive (p.33 & p.74)?',
      options: ['One that backs up automatically from computer when connected', 'A gold colored case', 'A drive with games pre-installed', 'A wireless speaker attached'],
      correct_answer: 'One that backs up automatically from computer when connected',
      explanation: 'Trang 74 (Audio script 28): "I\'d really recommend you get one that backs up automatically from your computer when it is connected."',
      sourceContext: 'Unit 4 p.33 & p.74'
    },
    {
      id: 'q4-9',
      game_type: 'quiz',
      question: 'Why was Jumbo Book Store struggling with sales data in Unit 4 p.35?',
      options: ['Because they used handwritten sales reports delivered by a driver', 'Because their computers had viruses', 'Because they had no books', 'Because customers refused to read'],
      correct_answer: 'Because they used handwritten sales reports delivered by a driver',
      explanation: 'Trang 35: "The store manager finds it very difficult to track sales because he uses handwritten sales reports... it takes 5 to 6 hours to compile data."',
      sourceContext: 'Unit 4 p.35'
    },
    {
      id: 'q4-10',
      game_type: 'quiz',
      question: 'Complete the sentence: "A database is a collection _____ records."',
      options: ['of', 'for', 'between', 'with'],
      correct_answer: 'of',
      explanation: 'Trang 31: "A database is a collection of records."',
      sourceContext: 'Unit 4 p.31'
    }
  ],
  lessonPlan: {
    unitNumber: 4,
    lessonTitle: 'Unit 4: Databases - 6 Data Processing Steps & Polite Workplace Requests',
    targetAudience: 'Sinh viên CNTT ngành Quản trị Cơ sở Dữ liệu & Hệ thống Thông tin',
    duration: '45 phút (1 tiết)',
    learningObjectives: {
      language: [
        'Nắm vững 6 bước xử lý dữ liệu: Collection -> Sorting -> Coding -> Entry -> Validation -> Tabulation.',
        'Sử dụng thành thạo cấu trúc đề nghị lịch sự (Could you / Would you + V-bare).',
        'Đưa ra khuyến nghị thiết bị lưu trữ và sao lưu dữ liệu (should / would recommend).'
      ],
      digitalCompetence: [
        'DigComp 2.2 - Lĩnh vực 1: Quản trị và tổ chức dữ liệu số.',
        'DigComp 2.2 - Lĩnh vực 4: Bảo mật sao lưu và phòng ngừa thảm họa dữ liệu.'
      ]
    },
    phases: [
      {
        timeMinutes: '00 - 08 (8 phút)',
        phaseId: 'warmup',
        phaseNameVi: 'I. Khởi động (Database Query Warm-up)',
        phaseNameEn: 'Database Concept & Warm-up',
        teacherActivity: 'Chiếu bảng cơ sở dữ liệu mẫu gồm Columns, Rows, Fields và hỏi sinh viên mục đích lưu trữ.',
        studentActivity: 'Xem flashcards thuật ngữ và làm câu hỏi trắc nghiệm nhận diện cấu trúc CSDL.',
        digitalTools: ['Database Diagram Viewer', 'Màn hình 16:9'],
        digCompCompetence: '1.1 Khai thác dữ liệu số'
      },
      {
        timeMinutes: '08 - 18 (10 phút)',
        phaseId: 'teaching_vocab',
        phaseNameVi: 'II. Dạy 6 bước xử lý dữ liệu (6 Data Processing Steps)',
        phaseNameEn: 'Data Processing Cycle',
        teacherActivity: 'Giảng giải 6 bước theo giáo trình: collection, sorting, coding, entry, validation, tabulation.',
        studentActivity: 'Lắng nghe phát âm, ghi nhớ định nghĩa tiếng Việt tương ứng cho từng bước.',
        digitalTools: ['Native Speech AI', 'Interactive Data Flow Engine'],
        digCompCompetence: '1.2 Đánh giá dữ liệu'
      },
      {
        timeMinutes: '18 - 25 (7 phút)',
        phaseId: 'checking_vocab',
        phaseNameVi: 'III. Thử thách nối cặp bước xử lý (Data Step Matching Game)',
        phaseNameEn: 'Matching Game Challenge',
        teacherActivity: 'Khởi động Matching Game ghép tên bước kỹ thuật với hoạt động cụ thể.',
        studentActivity: 'Ghép cặp nhanh, thi đấu tính điểm và giải thích ngắn gọn.',
        digitalTools: ['Matching Game Component', 'Leaderboard Live'],
        digCompCompetence: '2.1 Tương tác số'
      },
      {
        timeMinutes: '25 - 35 (10 phút)',
        phaseId: 'drilling',
        phaseNameVi: 'IV. Luyện tập câu đề nghị & Khuyên bảo (Polite Requests Drilling)',
        phaseNameEn: 'Grammar Drilling',
        teacherActivity: 'Hướng dẫn bài tập ngữ pháp với "Could you help me...", "You should buy...".',
        studentActivity: 'Làm bài tập điền từ khuyết và sắp xếp câu hoàn chỉnh.',
        digitalTools: ['Gap-fill Interactive Engine', 'Sentence Unscramble'],
        digCompCompetence: '2.2 Chia sẻ thông tin số'
      },
      {
        timeMinutes: '35 - 45 (10 phút)',
        phaseId: 'roleplay_writing',
        phaseNameVi: 'V. Đóng vai hỗ trợ tra cứu CSDL (Helpdesk Simulation)',
        phaseNameEn: 'Workplace Roleplay',
        teacherActivity: 'Tổ chức đóng vai: Chris cần lấy dữ liệu sách Basic French từ phần mềm TRD.',
        studentActivity: 'Thực hành hội thoại đóng vai và tư vấn thiết bị sao lưu tự động cho doanh nghiệp.',
        digitalTools: ['Roleplay Simulator', 'Cloud Backup Planner'],
        digCompCompetence: '4.2 Bảo vệ dữ liệu cá nhân & cơ quan'
      }
    ]
  }
};
