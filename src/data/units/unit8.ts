import { UnitData } from '../../types/index.ts';

export const unit8Data: UnitData = {
  id: 'unit-8',
  unitNumber: 8,
  unitNameEn: 'IT security and safety',
  unitNameVi: 'An toàn & Bảo mật Thông tin',
  pageRange: 'Trang 60 - 67',
  level: 'CEF A1 - A2 (College IT)',
  grammarFocusEn: 'Expressing possibility (may / might + infinitive) & Expressing prohibition (mustn\'t, aren\'t allowed to, shouldn\'t)',
  grammarFocusVi: 'Diễn đạt khả năng (may / might) và Cấm đoán, khuyến nghị an toàn (mustn\'t, aren\'t allowed to, shouldn\'t)',
  overviewVi: 'Các mối đe dọa an ninh mạng (Trojan, worm, spyware, adware), giải pháp phòng vệ (firewall, 2FA, biometric, encryption) và tư thế chuẩn công thái học khi dùng máy.',
  vocabList: [
    {
      id: 'u8-1',
      word: 'spyware',
      phonetics: '/ˈspaɪ.weər/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'phần mềm gián điệp',
      definitionEn: 'software that affects privacy; sends information about the use of a computer system without consent',
      exampleSentence: 'Spyware sends confidential data about your web browsing back to an unknown party.',
      exampleVietnamese: 'Phần mềm gián điệp gửi dữ liệu bí mật về thói quen duyệt web của bạn về cho kẻ lạ.',
      category: 'Threats'
    },
    {
      id: 'u8-2',
      word: 'Trojan',
      phonetics: '/ˈtrəʊ.dʒən/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'mã độc Trojan (ngụy trang)',
      definitionEn: 'a program which is usually free but secretly contains malicious files',
      exampleSentence: 'The file appeared to be a useful utility, but it was actually a disguised Trojan.',
      exampleVietnamese: 'Tệp tin trông như một tiện ích hữu dụng nhưng thực chất là mã độc Trojan ngụy trang.',
      category: 'Threats'
    },
    {
      id: 'u8-3',
      word: 'worm',
      phonetics: '/wɜːm/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'sâu máy tính (tự lây lan)',
      definitionEn: 'malware that spreads automatically across networks without user action and acts in OS',
      exampleSentence: 'A worm replicates and spreads through network vulnerabilities without human intervention.',
      exampleVietnamese: 'Sâu máy tính tự nhân bản và lây lan qua các lỗ hổng mạng mà không cần thao tác của con người.',
      category: 'Threats'
    },
    {
      id: 'u8-4',
      word: 'adware',
      phonetics: '/ˈæd.weər/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'phần mềm quảng cáo bất tiện',
      definitionEn: 'a program that automatically plays or displays unwanted commercials on a computer',
      exampleSentence: 'Adware clutters the screen with unwanted pop-up advertisements while browsing.',
      exampleVietnamese: 'Phần mềm quảng cáo làm màn hình tràn ngập các cửa sổ pop-up không mong muốn khi duyệt web.',
      category: 'Threats'
    },
    {
      id: 'u8-5',
      word: 'biometric scanning',
      phonetics: '/ˌbaɪ.əʊˈmet.rɪk ˈskæn.ɪŋ/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'quét sinh trắc học (vân tay, mống mắt)',
      definitionEn: 'authentication method that uses physical traits like fingerprint or iris scanning',
      exampleSentence: 'Biometric scanning ensures only authorized personnel can enter the data center.',
      exampleVietnamese: 'Quét sinh trắc học đảm bảo chỉ nhân sự được ủy quyền mới có thể vào trung tâm dữ liệu.',
      category: 'Security Solutions'
    },
    {
      id: 'u8-6',
      word: 'ergonomics',
      phonetics: '/ˌɜː.ɡəˈnɒm.ɪks/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'công thái học (tư thế làm việc an toàn)',
      definitionEn: 'workstation health guidelines: feet flat on the floor, screen at eye level, straight wrists',
      exampleSentence: 'Proper workstation ergonomics prevents back strain and eye fatigue for developers.',
      exampleVietnamese: 'Công thái học bàn làm việc đúng chuẩn giúp lập trình viên tránh đau lưng và mỏi mắt.',
      category: 'Health & Safety'
    }
  ],
  matchingPairs: [
    { id: 'm8-1', english: 'spyware', vietnamese: 'Phần mềm ảnh hưởng quyền riêng tư, bí mật gửi dữ liệu ra ngoài', category: 'Malware' },
    { id: 'm8-2', english: 'Trojan', vietnamese: 'Chương trình ngụy trang miễn phí nhưng chứa mã độc hại ngầm', category: 'Malware' },
    { id: 'm8-3', english: 'worm', vietnamese: 'Mã độc tự lây lan qua mạng mà không cần người dùng thao tác', category: 'Malware' },
    { id: 'm8-4', english: 'adware', vietnamese: 'Chương trình tự động kích hoạt và phát quảng cáo liên tục', category: 'Malware' },
    { id: 'm8-5', english: 'biometric scanning', vietnamese: 'Xác thực bảo mật thông qua quét vân tay hoặc nhận diện khuôn mặt', category: 'Solutions' }
  ],
  gapFillExercises: [
    {
      id: 'gf8-1',
      sentenceWithBlank: 'You _____ give your password to anyone under company regulations.',
      missingWord: 'mustn\'t',
      options: ['mustn\'t', 'may', 'should', 'don\'t have to'],
      hintVi: 'Lệnh cấm tuyệt đối theo quy định bảo mật trang 65',
      explanation: 'Trang 65: "You mustn\'t give your password to anyone. Expressing prohibition."'
    },
    {
      id: 'gf8-2',
      sentenceWithBlank: 'You _____ have a virus on your computer; let me scan it. (khả năng có thể)',
      missingWord: 'may',
      options: ['may', 'must', 'are', 'shall'],
      hintVi: 'Diễn đạt một khả năng không chắc chắn 100% trong hiện tại',
      explanation: 'Trang 61: "We use may/might + infinitive without to to talk about things that are possible: You may have a virus on your computer."'
    },
    {
      id: 'gf8-3',
      sentenceWithBlank: 'Make sure your forearms and hands are in a _____ line with the desk.',
      missingWord: 'straight',
      options: ['straight', 'curved', 'round', 'bent'],
      hintVi: 'Tư thế công thái học chuẩn: cẳng tay và bàn tay tạo đường thẳng',
      explanation: 'Trang 62: "Make sure your forearms and hands are in a straight line."'
    }
  ],
  unscrambleChallenges: [
    {
      id: 'us8-1',
      correctSentence: 'You mustn\'t give your password to anyone',
      jumbledWords: ['give', 'mustn\'t', 'anyone', 'password', 'to', 'You', 'your'],
      translationVi: 'Bạn không được phép đưa mật khẩu của mình cho bất kỳ ai.',
      grammarTipVi: 'Cấu trúc cấm đoán: S + mustn\'t + V-bare.'
    },
    {
      id: 'us8-2',
      correctSentence: 'You should have your feet flat on the floor',
      jumbledWords: ['floor', 'feet', 'the', 'have', 'on', 'You', 'flat', 'should', 'your'],
      translationVi: 'Bạn nên đặt bàn chân phẳng trên sàn nhà khi ngồi làm việc.',
      grammarTipVi: 'Khuyên bảo về an toàn lao động: should + have...'
    }
  ],
  roleplayScenario: {
    id: 'rp-u8',
    title: 'Xử lý laptop nghi nhiễm mã độc (Security Incident & Advice)',
    scenarioDescriptionVi: 'Bạn là chuyên gia an ninh mạng Ales. Ludek mang laptop tới nhờ kiểm tra vì máy chạy loạn xạ và có nguy cơ mất đồ án. Hãy tư vấn cài đặt phần mềm và đặt mật khẩu WLAN!',
    studentRole: 'IT Security Expert (Ales)',
    colleagueRole: 'Student / Trainee (Ludek)',
    context: 'Pearson Longman Unit 8 p.61 - Dialogue on security solutions',
    steps: [
      {
        stepId: 1,
        speakerName: 'Ludek',
        speakerRole: 'Colleague',
        speakerAvatar: '🧑‍🎓',
        npcDialogueEn: "Ales, can you check my laptop? Nothing seems to work, and I'm afraid I may lose my final project!",
        npcDialogueVi: 'Ales, bạn xem giúp laptop của mình được không? Máy chạy loạn cào cào và mình sợ mất đồ án tốt nghiệp quá!',
        studentTaskVi: 'Chẩn đoán nguy cơ nhiễm phần mềm gián điệp và khuyên cài đặt phần mềm phòng chống.',
        options: [
          {
            id: 'opt1-a',
            dialogEn: 'You might have spyware on your computer. You should install a good spyware doctor program and protect your WLAN access with a strong password.',
            dialogVi: 'Máy bạn có thể đã nhiễm spyware. Bạn nên cài chương trình diệt spyware uy tín và đặt mật khẩu mạnh cho mạng WLAN.',
            isBest: true,
            score: 10,
            feedbackVi: 'Tuyệt vời! Bám sát chuẩn câu thoại của Ales trang 61 và 77.'
          },
          {
            id: 'opt1-b',
            dialogEn: 'Don\'t worry, click on every pop-up commercial you see.',
            dialogVi: 'Đừng lo, cứ bấm vào mọi quảng cáo pop-up bạn thấy trên màn hình.',
            isBest: false,
            score: 0,
            feedbackVi: 'Gây nguy hiểm nghiêm trọng hơn cho an toàn thông tin.'
          }
        ]
      }
    ]
  },
  reviewQuiz10: [
    {
      id: 'q8-1',
      game_type: 'quiz',
      question: 'Which type of malware affects privacy by secretly sending computer usage data?',
      options: ['Spyware', 'Hardware firewall', 'Power cord', 'Trackball'],
      correct_answer: 'Spyware',
      explanation: 'Trang 60: "Spyware: affects privacy. It does not take control of a computer system, but sends information about the use of a computer system."',
      sourceContext: 'Unit 8 p.60'
    },
    {
      id: 'q8-2',
      game_type: 'quiz',
      question: 'What is a "Trojan" in computer security (Unit 8 p.60)?',
      options: ['A program which is usually free but contains malicious files', 'An official Windows update', 'A network cable connector', 'A mechanical keyboard key'],
      correct_answer: 'A program which is usually free but contains malicious files',
      explanation: 'Trang 60: "Trojan: A program which is usually free but contains malicious files."',
      sourceContext: 'Unit 8 p.60'
    },
    {
      id: 'q8-3',
      game_type: 'quiz',
      question: 'Which malware spreads automatically without user action and acts in the operating system?',
      options: ['Worm', 'Adware', 'Browser hijacker', 'Calculator'],
      correct_answer: 'Worm',
      explanation: 'Trang 60: "Worm: Spreads without the user taking action and usually acts in operation system."',
      sourceContext: 'Unit 8 p.60'
    },
    {
      id: 'q8-4',
      game_type: 'quiz',
      question: 'Which security solution uses physical characteristics such as fingerprint scanning?',
      options: ['Biometric scanning', 'Paper sticky note', 'Optical mouse', 'USB cord'],
      correct_answer: 'Biometric scanning',
      explanation: 'Trang 61: "Biometric scanning is an authentication method based on personal biological traits."',
      sourceContext: 'Unit 8 p.61'
    },
    {
      id: 'q8-5',
      game_type: 'quiz',
      question: 'Choose the sentence expressing a rule / prohibition:',
      options: ['You mustn\'t give your password to anyone.', 'You may have a virus.', 'You might come tomorrow.', 'You could buy a computer.'],
      correct_answer: 'You mustn\'t give your password to anyone.',
      explanation: 'Trang 65: "We use mustn\'t for a rule or requirement (prohibition): You mustn\'t give your password to anyone."',
      sourceContext: 'Unit 8 p.65'
    },
    {
      id: 'q8-6',
      game_type: 'quiz',
      question: 'According to workstation health and safety (p.62), how should the top of the screen be positioned?',
      options: ['At or slightly below eye level', 'High above the head on the ceiling', 'Flat on the floor under the table', 'Behind the chair'],
      correct_answer: 'At or slightly below eye level',
      explanation: 'Trang 62: "Make sure the top of the screen is at or slightly below eye level."',
      sourceContext: 'Unit 8 p.62'
    },
    {
      id: 'q8-7',
      game_type: 'quiz',
      question: 'What password recommendation is given in Unit 8 p.64?',
      options: ['Use 6 to 8 characters, mix uppercase, lowercase, numbers, and symbols; change every 9 weeks', 'Use your birthday 123456', 'Use the word password', 'Never use numbers or punctuation'],
      correct_answer: 'Use 6 to 8 characters, mix uppercase, lowercase, numbers, and symbols; change every 9 weeks',
      explanation: 'Trang 64: "Choose a password that is difficult to guess: use between 6 and 8 characters, intermix letters, numbers, and punctuation marks. Change your password every 9 weeks."',
      sourceContext: 'Unit 8 p.64'
    },
    {
      id: 'q8-8',
      game_type: 'quiz',
      question: 'According to Computer Dos and Don\'ts (p.63), what must you NOT do while the PC is on?',
      options: ['Do not disconnect the keyboard, mouse, or any peripheral', 'Do not look at the monitor', 'Do not breathe near the computer', 'Do not sit on the chair'],
      correct_answer: 'Do not disconnect the keyboard, mouse, or any peripheral',
      explanation: 'Trang 63: "Things you should not do: Do not disconnect the keyboard, mouse, monitor, printer or any peripheral if the PC is on."',
      sourceContext: 'Unit 8 p.63'
    },
    {
      id: 'q8-9',
      game_type: 'quiz',
      question: 'Complete the sentence with possibility modal: "The program _____ not run properly if there is a virus."',
      options: ['might', 'should to', 'mustn\'t', 'has'],
      correct_answer: 'might',
      explanation: 'Trang 61: "We use may/might + infinitive to talk about possibility: The program might not run properly."',
      sourceContext: 'Unit 8 p.61'
    },
    {
      id: 'q8-10',
      game_type: 'quiz',
      question: 'Who should employees notify immediately when a security breach occurs (p.64)?',
      options: ['Their supervisor or IT help desk', 'The newspaper', 'Their social media friends', 'Nobody at all'],
      correct_answer: 'Their supervisor or IT help desk',
      explanation: 'Trang 64: "Employees must notify their supervisor or IT help desk about any damage, misuse, irregularities or security breaches."',
      sourceContext: 'Unit 8 p.64'
    }
  ],
  lessonPlan: {
    unitNumber: 8,
    lessonTitle: 'Unit 8: IT Security & Safety - Cyber Threats, Ergonomics & Prohibitions',
    targetAudience: 'Sinh viên CNTT / Người đi làm trong doanh nghiệp công nghệ',
    duration: '45 phút (1 tiết)',
    learningObjectives: {
      language: [
        'Phân loại và định nghĩa các chủng loại phần mềm độc hại (virus, worm, Trojan, spyware, adware).',
        'Sử dụng động từ tình thái chỉ khả năng (may / might) và cấm đoán (mustn\'t, aren\'t allowed to).',
        'Diễn đạt các nguyên tắc an toàn công thái học tại bàn máy tính.'
      ],
      digitalCompetence: [
        'DigComp 2.2 - Lĩnh vực 4: An toàn số (Bảo vệ dữ liệu, phòng chống mã độc, sức khỏe công thái học).',
        'DigComp 2.2 - Lĩnh vực 2: Báo cáo sự cố an ninh mạng chuyên nghiệp.'
      ]
    },
    phases: [
      {
        timeMinutes: '00 - 08 (8 phút)',
        phaseId: 'warmup',
        phaseNameVi: 'I. Khởi động (Cyber Threat Brainstorming)',
        phaseNameEn: 'Threats Warm-up',
        teacherActivity: 'Chiếu hình ảnh máy tính bị pop-up cảnh báo; hỏi sinh viên các loại virus/malware họ từng gặp.',
        studentActivity: 'Xem flashcards phân loại mã độc hại và nghe phát âm tiếng Anh chuẩn.',
        digitalTools: ['Threat Visual Flashcards', 'Màn chiếu 16:9'],
        digCompCompetence: '4.1 Nhận diện nguy cơ an toàn số'
      },
      {
        timeMinutes: '08 - 18 (10 phút)',
        phaseId: 'teaching_vocab',
        phaseNameVi: 'II. Dạy phân biệt chủng mã độc & Giải pháp (Malware Taxonomy)',
        phaseNameEn: 'Malware Taxonomy & Solutions',
        teacherActivity: 'Phân tích sự khác biệt cốt lõi giữa Worm (tự lây qua mạng) và Trojan (ngụy trang miễn phí).',
        studentActivity: 'Luyện tập phát âm với Web Audio và ghi nhớ định nghĩa tiếng Việt tương ứng.',
        digitalTools: ['Native Speech AI', 'Cybersecurity Glossary'],
        digCompCompetence: '4.2 Quản trị mật khẩu và thiết bị'
      },
      {
        timeMinutes: '18 - 25 (7 phút)',
        phaseId: 'checking_vocab',
        phaseNameVi: 'III. Minigame ghép đôi an ninh mạng (Security Matching Game)',
        phaseNameEn: 'Matching Game Challenge',
        teacherActivity: 'Khởi chạy game nối mã độc với hành vi gây hại.',
        studentActivity: 'Thi đấu ghép đúng các cặp từ và nhận điểm số combo.',
        digitalTools: ['Matching Game Engine', 'Classroom Leaderboard'],
        digCompCompetence: '2.1 Tương tác số'
      },
      {
        timeMinutes: '25 - 35 (10 phút)',
        phaseId: 'drilling',
        phaseNameVi: 'IV. Luyện tập cấm đoán & Công thái học (Prohibition & Ergonomics Drilling)',
        phaseNameEn: 'Modals & Health Rules Drilling',
        teacherActivity: 'Hướng dẫn bài tập điền từ: You mustn\'t give your password... và tư thế bàn làm việc.',
        studentActivity: 'Làm bài tập điền từ khuyết và sắp xếp câu quy định văn phòng.',
        digitalTools: ['Gap-fill Interactive Engine', 'Sentence Unscramble'],
        digCompCompetence: '4.3 Bảo vệ sức khỏe thể chất khi làm việc số'
      },
      {
        timeMinutes: '35 - 45 (10 phút)',
        phaseId: 'roleplay_writing',
        phaseNameVi: 'V. Đóng vai xử lý máy nhiễm mã độc (Security Incident Response)',
        phaseNameEn: 'Incident Roleplay & Report',
        teacherActivity: 'Tổ chức đối thoại giữa chuyên viên Ales và bạn Ludek bị nhiễm spyware.',
        studentActivity: 'Thực hành đối thoại theo vai; lập mẫu báo cáo Incident Report ngắn theo trang 66.',
        digitalTools: ['Roleplay Simulator', 'Incident Report Interactive Template'],
        digCompCompetence: '4.1 Phòng vệ an ninh số và phản hồi sự cố'
      }
    ]
  }
};
