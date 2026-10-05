import { UnitData } from '../../types/index.ts';

export const unit7Data: UnitData = {
  id: 'unit-7',
  unitNumber: 7,
  unitNameEn: 'IT support & Hardware Repair',
  unitNameVi: 'Hỗ trợ Kỹ thuật CNTT & Sửa chữa Phần cứng',
  pageRange: 'Trang 52 - 59',
  level: 'CEF A1 - A2 (College IT)',
  grammarFocusEn: 'Present perfect (Have you checked...? / The screen has gone blank) & Explaining use of tools (used for + -ing / used to + verb)',
  grammarFocusVi: 'Thì Hiện tại hoàn thành trong chẩn đoán sự cố & Cấu trúc mô tả công dụng dụng cụ (used for + V-ing / used to + V)',
  overviewVi: 'Quy trình tiếp nhận và chẩn đoán sự cố Help Desk, bộ dụng cụ sửa chữa phần cứng chuyên nghiệp, thiết bị đo kiểm và phiếu hỗ trợ dịch vụ.',
  vocabList: [
    {
      id: 'u7-1',
      word: 'anti-static wrist strap',
      phonetics: '/ˌæn.ti ˈstæt.ɪk rɪst stræp/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'vòng đeo tay chống tĩnh điện (ESD)',
      definitionEn: 'a strap used to prevent electrostatic discharge when touching delicate electronic circuits',
      exampleSentence: 'Always wear an anti-static wrist strap to prevent electrostatic discharge to the motherboard.',
      exampleVietnamese: 'Luôn đeo vòng tay chống tĩnh điện để tránh phóng tĩnh điện làm hỏng bo mạch chủ.',
      category: 'Repair Tools'
    },
    {
      id: 'u7-2',
      word: 'multimeter',
      phonetics: '/ˈmʌl.tɪˌmiː.tər/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'đồng hồ đo vạn năng',
      definitionEn: 'measures AC/DC voltage, current, and resistance to troubleshoot electrical problems in power supplies',
      exampleSentence: 'The technician used a multimeter to measure the DC voltage from the power supply unit.',
      exampleVietnamese: 'Kỹ thuật viên đã dùng đồng hồ vạn năng để đo điện áp một chiều từ bộ nguồn máy tính.',
      category: 'Diagnostic Tools'
    },
    {
      id: 'u7-3',
      word: 'cable tester',
      phonetics: '/ˈkeɪ.bəl ˈtes.tər/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'thiết bị kiểm tra cáp mạng',
      definitionEn: 'an electronic device that checks the electrical connections and continuity in wired devices',
      exampleSentence: 'A cable tester checks whether all eight pins of the RJ-45 network cable are correctly wired.',
      exampleVietnamese: 'Máy kiểm tra cáp kiểm tra xem 8 chân của dây mạng RJ-45 có được bấm chính xác không.',
      category: 'Diagnostic Tools'
    },
    {
      id: 'u7-4',
      word: 'reversible ratchet driver',
      phonetics: '/rɪˈvɜː.sə.bəl ˈrætʃ.ɪt ˈdraɪ.vər/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'tô vít bánh cóc hai chiều (kèm nhiều đầu khẩu)',
      definitionEn: 'used for easy driving and loosening of screws and nuts with interchangeable bits',
      exampleSentence: 'The kit includes a reversible ratchet driver with 20 different sized bits.',
      exampleVietnamese: 'Bộ dụng cụ bao gồm một tô vít bánh cóc hai chiều cùng 20 đầu khẩu kích cỡ khác nhau.',
      category: 'Repair Tools'
    },
    {
      id: 'u7-5',
      word: 'wire cutter/stripper',
      phonetics: '/waɪər ˈkʌt.ər ˈstrɪp.ər/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'kìm cắt và tuốt dây điện',
      definitionEn: 'tool used for cutting wire or removing the plastic insulation neatly',
      exampleSentence: 'Use the wire stripper to remove the insulation without damaging the copper wires.',
      exampleVietnamese: 'Sử dụng kìm tuốt dây để bóc lớp vỏ cách điện mà không làm đứt lõi đồng.',
      category: 'Repair Tools'
    },
    {
      id: 'u7-6',
      word: 'three-pronged port',
      phonetics: '/θriː prɒŋd pɔːt/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'cổng cắm 3 chấu (nguồn điện)',
      definitionEn: 'the three-pin socket on the back of the desktop power supply for the main power cable',
      exampleSentence: 'The power cable should go in the three-pronged port on the computer case.',
      exampleVietnamese: 'Dây nguồn nên được cắm chặt vào cổng 3 chấu ở phía sau thùng máy tính.',
      category: 'Hardware Ports'
    }
  ],
  matchingPairs: [
    { id: 'm7-1', english: 'reversible ratchet driver', vietnamese: 'Dụng cụ vặn ốc và bu-lông dễ dàng bằng cơ chế bánh cóc', category: 'Tools' },
    { id: 'm7-2', english: 'anti-static wrist strap', vietnamese: 'Vòng tay ngăn ngừa hiện tượng phóng điện tĩnh gây hại linh kiện', category: 'Tools' },
    { id: 'm7-3', english: 'tweezers', vietnamese: 'Dụng cụ kẹp để gắp các vật thể và ốc vít nhỏ trong case', category: 'Tools' },
    { id: 'm7-4', english: 'wire cutter/stripper', vietnamese: 'Dụng cụ dùng để cắt dây hoặc bóc lớp vỏ cách điện', category: 'Tools' },
    { id: 'm7-5', english: 'multimeter', vietnamese: 'Đo điện áp AC/DC, dòng điện và điện trở kiểm tra nguồn', category: 'Diagnostic' },
    { id: 'm7-6', english: 'cable tester', vietnamese: 'Kiểm tra đường truyền tín hiệu kết nối trong dây cáp', category: 'Diagnostic' }
  ],
  gapFillExercises: [
    {
      id: 'gf7-1',
      sentenceWithBlank: 'Have you _____ the cable connections? (check)',
      missingWord: 'checked',
      options: ['checked', 'check', 'checking', 'checks'],
      hintVi: 'Thì hiện tại hoàn thành nghi vấn: Have you + V3/ed?',
      explanation: 'Trang 52 & 53: "Have you checked the cable connections? Yes, I have. / No, I haven\'t."'
    },
    {
      id: 'gf7-2',
      sentenceWithBlank: 'This tool is used for _____ the screws. (tighten)',
      missingWord: 'tightening',
      options: ['tightening', 'tighten', 'to tighten', 'tightened'],
      hintVi: 'Sau "used for" động từ luôn ở dạng V-ing',
      explanation: 'Trang 57 (Language box): "We use used for + verb with -ing: This tool is used for tightening the screws."'
    },
    {
      id: 'gf7-3',
      sentenceWithBlank: 'We use tweezers _____ hold small objects in tight computer spaces.',
      missingWord: 'to',
      options: ['to', 'for', 'about', 'at'],
      hintVi: 'Sau "use [something]" chỉ mục đích dùng "to + V-bare"',
      explanation: 'Trang 57: "used/use to + verb: We use tweezers to hold small objects."'
    }
  ],
  unscrambleChallenges: [
    {
      id: 'us7-1',
      correctSentence: 'Have you checked if the power cable is plugged in?',
      jumbledWords: ['cable', 'plugged', 'power', 'Have', 'checked', 'the', 'you', 'is', 'in?', 'if'],
      translationVi: 'Bạn đã kiểm tra xem dây nguồn đã được cắm vào chưa?',
      grammarTipVi: 'Câu hỏi Hiện tại hoàn thành: Have you + checked + if-clause?'
    },
    {
      id: 'us7-2',
      correctSentence: 'This tool is used for tightening and removing screws',
      jumbledWords: ['removing', 'used', 'This', 'tightening', 'tool', 'and', 'for', 'is', 'screws'],
      translationVi: 'Dụng cụ này được sử dụng để siết chặt và tháo rời các ốc vít.',
      grammarTipVi: 'Cấu trúc công dụng: S + is used for + V-ing.'
    }
  ],
  roleplayScenario: {
    id: 'rp-u7',
    title: 'Xử lý sự cố máy tính tại quầy IT Help Desk (Help Desk Call)',
    scenarioDescriptionVi: 'Bạn là chuyên viên Haider tại IT Help Desk. Maryam từ phòng Nhân sự gọi điện báo máy tính không bật lên được. Hãy chẩn đoán từng bước một cách nhã nhặn!',
    studentRole: 'IT Help Desk Technician (Haider)',
    colleagueRole: 'User from HR (Maryam)',
    context: 'Pearson Longman Unit 7 p.52 - Fault diagnosis dialogue',
    steps: [
      {
        stepId: 1,
        speakerName: 'Maryam',
        speakerRole: 'HR Employee',
        speakerAvatar: '👩‍💼',
        npcDialogueEn: "Hello, IT Help Desk? I switched my computer off yesterday and today I can't turn it on. Can you help me?",
        npcDialogueVi: 'A lô phòng hỗ trợ IT? Hôm qua tôi tắt máy tính mà hôm nay bật không lên. Bạn giúp tôi với?',
        studentTaskVi: 'Trấn an người dùng và hỏi thăm kết nối dây cáp theo trang 52.',
        options: [
          {
            id: 'opt1-a',
            dialogEn: "Don't worry. Have you checked the cable connections? Make sure all cables are tight and fully plugged in.",
            dialogVi: 'Đừng lo lắng. Chị đã kiểm tra các đầu nối dây cáp chưa? Hãy đảm bảo tất cả dây cáp đều cắm chặt và tiếp xúc tốt.',
            isBest: true,
            score: 10,
            feedbackVi: 'Tuyệt vời! Bám sát chuẩn câu thoại của Haider trang 52: "Have you checked the cable connections? Make sure all cables are tight and fully plugged in."'
          },
          {
            id: 'opt1-b',
            dialogEn: 'Throw it into garbage bin and purchase a supercomputer.',
            dialogVi: 'Vứt vào sọt rác đi và mua một siêu máy tính mới.',
            isBest: false,
            score: 0,
            feedbackVi: 'Thái độ hoàn toàn sai quy chuẩn chăm sóc khách hàng và kỹ thuật.'
          }
        ]
      },
      {
        stepId: 2,
        speakerName: 'Maryam',
        speakerRole: 'HR Employee',
        speakerAvatar: '👩‍💼',
        npcDialogueEn: "I found one cable that is unplugged. It's the power cable. Where should it go?",
        npcDialogueVi: 'Tôi thấy có một sợi dây bị tuột ra rồi. Là dây nguồn. Nó cắm vào đâu vậy?',
        studentTaskVi: 'Chỉ rõ vị trí cổng cắm nguồn 3 chấu phía sau case máy tính.',
        options: [
          {
            id: 'opt2-a',
            dialogEn: 'The power cable should go in the three-pronged port on the computer case.',
            dialogVi: 'Dây nguồn nên được cắm vào cổng ba chấu ở phía sau thùng máy tính.',
            isBest: true,
            score: 10,
            feedbackVi: 'Chính xác! Lời thoại từ trang 52: "The power cable should go in the three-pronged port on the computer."'
          },
          {
            id: 'opt2-b',
            dialogEn: 'Plug it into the CD drive drawer.',
            dialogVi: 'Cắm nó vào khay ổ đĩa CD đi.',
            isBest: false,
            score: 1,
            feedbackVi: 'Hướng dẫn nguy hiểm và làm hỏng thiết bị phần cứng.'
          }
        ]
      }
    ]
  },
  reviewQuiz10: [
    {
      id: 'q7-1',
      game_type: 'quiz',
      question: 'Which tool is used to prevent electrostatic discharge when repairing computers?',
      options: ['Anti-static wrist strap', 'Flathead screwdriver', 'Three-prong holder', 'Hammer'],
      correct_answer: 'Anti-static wrist strap',
      explanation: 'Trang 56: "anti-static wrist strap: used to prevent electrostatic discharge (ESD)."',
      sourceContext: 'Unit 7 p.56'
    },
    {
      id: 'q7-2',
      game_type: 'quiz',
      question: 'What does a multimeter measure in diagnostic testing (p.57)?',
      options: ['Electrical properties such as AC/DC voltage, current and resistance', 'Internet download speed', 'Size of monitors in inches', 'Number of words in a document'],
      correct_answer: 'Electrical properties such as AC/DC voltage, current and resistance',
      explanation: 'Trang 57: "A multimeter measures electrical properties such as AC or DC voltage, current and resistance."',
      sourceContext: 'Unit 7 p.57'
    },
    {
      id: 'q7-3',
      game_type: 'quiz',
      question: 'Complete the rule: "This tool is used for _____ the screws."',
      options: ['tightening', 'tighten', 'to tighten', 'tightened'],
      correct_answer: 'tightening',
      explanation: 'Trang 57: "used for + verb with -ing: This tool is used for tightening the screws."',
      sourceContext: 'Unit 7 p.57'
    },
    {
      id: 'q7-4',
      game_type: 'quiz',
      question: 'Complete the rule: "We use tweezers _____ hold small objects."',
      options: ['to', 'for', 'about', 'by'],
      correct_answer: 'to',
      explanation: 'Trang 57: "used/use to + verb: We use tweezers to hold small objects."',
      sourceContext: 'Unit 7 p.57'
    },
    {
      id: 'q7-5',
      game_type: 'quiz',
      question: 'In Unit 7 p.52, why couldn\'t Maryam turn on her desktop computer?',
      options: ['The power cable was unplugged', 'The CPU caught fire', 'She forgot her password', 'The internet was down'],
      correct_answer: 'The power cable was unplugged',
      explanation: 'Trang 52: "I have one cable that is unplugged. It\'s the power cable... Maybe the cleaners disconnected your PC by mistake last night."',
      sourceContext: 'Unit 7 p.52'
    },
    {
      id: 'q7-6',
      game_type: 'quiz',
      question: 'What is a "cable tester" used for (p.57)?',
      options: ['Checks the electrical connections in wired devices and cables', 'Downloads video games', 'Calculates company tax', 'Heats up coffee'],
      correct_answer: 'Checks the electrical connections in wired devices and cables',
      explanation: 'Trang 57: "A cable tester is an electronic device that checks the electrical connections in wired devices."',
      sourceContext: 'Unit 7 p.57'
    },
    {
      id: 'q7-7',
      game_type: 'quiz',
      question: 'Choose the correct sentence in present perfect tense:',
      options: ['She hasn\'t finished the report.', 'She hasn\'t finishing the report.', 'She not finished the report.', 'She have finished not the report.'],
      correct_answer: 'She hasn\'t finished the report.',
      explanation: 'Trang 53: "We use have/has + past participle: She hasn\'t finished the report."',
      sourceContext: 'Unit 7 p.53'
    },
    {
      id: 'q7-8',
      game_type: 'quiz',
      question: 'What is the irregular past participle of the verb "do"?',
      options: ['done', 'did', 'doed', 'doing'],
      correct_answer: 'done',
      explanation: 'Trang 53 (Irregular table): "do -> done; be -> been; see -> seen".',
      sourceContext: 'Unit 7 p.53'
    },
    {
      id: 'q7-9',
      game_type: 'quiz',
      question: 'Where should the power cable be plugged into on the computer (p.52)?',
      options: ['In the three-pronged port on the computer', 'In the audio jack', 'In the USB port', 'In the HDMI slot'],
      correct_answer: 'In the three-pronged port on the computer',
      explanation: 'Trang 52: "The power cable should go in the three-pronged port on the computer."',
      sourceContext: 'Unit 7 p.52'
    },
    {
      id: 'q7-10',
      game_type: 'quiz',
      question: 'What should Sylvia do if her deleted file is found in the Recycle Bin (p.55)?',
      options: ['Move it to a folder in My Documents', 'Format the hard drive', 'Call the police', 'Shut down the PC immediately'],
      correct_answer: 'Move it to a folder in My Documents',
      explanation: 'Trang 55 (Service Report): "If the file is in the Recycle Bin, move it to a folder in My Documents."',
      sourceContext: 'Unit 7 p.55'
    }
  ],
  lessonPlan: {
    unitNumber: 7,
    lessonTitle: 'Unit 7: IT Support - Help Desk Diagnostics & Hardware Tool Usage',
    targetAudience: 'Sinh viên CNTT chuyên ngành Kỹ thuật máy tính & Dịch vụ hỗ trợ người dùng',
    duration: '45 phút (1 tiết)',
    learningObjectives: {
      language: [
        'Nắm vững tên gọi các dụng cụ sửa chữa: ratchet driver, wire stripper, tweezers, anti-static wrist strap.',
        'Sử dụng cấu trúc giải thích chức năng (used for + V-ing / used to + V).',
        'Thực hành thì hiện tại hoàn thành trong chẩn đoán lỗi (Have you checked...?).'
      ],
      digitalCompetence: [
        'DigComp 2.2 - Lĩnh vực 5: Giải quyết vấn đề kỹ thuật (Technical Problem Solving).',
        'DigComp 2.2 - Lĩnh vực 2: Giao tiếp hỗ trợ khách hàng qua hệ thống Ticket.'
      ]
    },
    phases: [
      {
        timeMinutes: '00 - 08 (8 phút)',
        phaseId: 'warmup',
        phaseNameVi: 'I. Khởi động (Hardware Toolkit Warm-up)',
        phaseNameEn: 'Toolkit Recognition',
        teacherActivity: 'Chiếu hình ảnh hộp đồ nghề sửa chữa máy tính (kit case) và đặt câu đố nhận diện dụng cụ.',
        studentActivity: 'Lật flashcards tìm tên dụng cụ tương ứng và nghe phát âm chuẩn.',
        digitalTools: ['Toolkit Visual Flashcards', 'Màn hình 16:9'],
        digCompCompetence: '1.1 Nhận diện thiết bị số'
      },
      {
        timeMinutes: '08 - 18 (10 phút)',
        phaseId: 'teaching_vocab',
        phaseNameVi: 'II. Dạy từ vựng & Cấu trúc chức năng (Tool Functionality & Grammar)',
        phaseNameEn: 'Used for / Used to',
        teacherActivity: 'Giới thiệu ngữ pháp: used for + V-ing và used to + V-bare qua ví dụ kẹp tweezers và vòng tĩnh điện.',
        studentActivity: 'Luyện đọc các câu mẫu và thực hành phát âm với Web Speech AI.',
        digitalTools: ['Native Speech AI', 'Grammar Rule Cards'],
        digCompCompetence: '5.2 Nhận diện nhu cầu công cụ kỹ thuật'
      },
      {
        timeMinutes: '18 - 25 (7 phút)',
        phaseId: 'checking_vocab',
        phaseNameVi: 'III. Minigame ghép nối dụng cụ (Tool Matching Game)',
        phaseNameEn: 'Matching Challenge',
        teacherActivity: 'Bật minigame ghép nối tên dụng cụ với công dụng kỹ thuật.',
        studentActivity: 'Thi đấu ghép cặp nhanh trên bảng tương tác lớp học.',
        digitalTools: ['Matching Game Engine', 'Classroom Timer'],
        digCompCompetence: '2.1 Tương tác số'
      },
      {
        timeMinutes: '25 - 35 (10 phút)',
        phaseId: 'drilling',
        phaseNameVi: 'IV. Luyện tập chẩn đoán lỗi (Fault Diagnosis Drilling)',
        phaseNameEn: 'Present Perfect Drilling',
        teacherActivity: 'Điều phối bài tập trắc nghiệm và điền từ hiện tại hoàn thành (checked, unplugged, blank).',
        studentActivity: 'Hoàn thành bài tập điền từ khuyết và sắp xếp câu hỏi chẩn đoán.',
        digitalTools: ['Gap-fill Interactive Engine', 'Sentence Builder'],
        digCompCompetence: '5.1 Khắc phục sự cố kỹ thuật số'
      },
      {
        timeMinutes: '35 - 45 (10 phút)',
        phaseId: 'roleplay_writing',
        phaseNameVi: 'V. Đóng vai xử lý cuộc gọi Help Desk (IT Help Desk Simulation)',
        phaseNameEn: 'Help Desk Phone Call Roleplay',
        teacherActivity: 'Chia cặp mô phỏng cuộc gọi giữa Maryam (nhân sự) và Haider (IT kỹ thuật).',
        studentActivity: 'Chọn lời thoại phù hợp và điền phiếu sự cố (Help Desk Ticket) trên màn hình.',
        digitalTools: ['Roleplay Simulator', 'Interactive Service Report Form'],
        digCompCompetence: '2.4 Giao tiếp nghiệp vụ số'
      }
    ]
  }
};
