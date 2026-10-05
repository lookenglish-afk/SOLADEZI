import { UnitData } from '../../types/index.ts';

export const unit1Data: UnitData = {
  id: 'unit-1',
  unitNumber: 1,
  unitNameEn: 'Working in the IT industry',
  unitNameVi: 'Làm việc trong Ngành CNTT',
  pageRange: 'Trang 4 - 11',
  level: 'CEF A1 - A2 (College IT)',
  grammarFocusEn: 'Present tense of be (am, is, are) & Present simple for routines',
  grammarFocusVi: 'Thì hiện tại đơn của To Be (am, is, are) & Thì hiện tại đơn diễn tả công việc, thói quen',
  overviewVi: 'Giới thiệu bản thân và người khác, nghề nghiệp CNTT, hỏi đáp cá nhân, lịch trình công việc và từ viết tắt CNTT.',
  vocabList: [
    {
      id: 'u1-1',
      word: 'network administrator',
      phonetics: '/ˈnet.wɜːk ədˈmɪn.ɪ.streɪ.tər/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'quản trị viên mạng',
      definitionEn: 'a person responsible for setting up and maintaining computer networks, firewalls and passwords',
      exampleSentence: 'Mahmoud is our network administrator; he sets up firewalls and usernames.',
      exampleVietnamese: 'Mahmoud là quản trị viên mạng của chúng tôi; anh ấy thiết lập tường lửa và tên người dùng.',
      category: 'Job Roles'
    },
    {
      id: 'u1-2',
      word: 'software developer',
      phonetics: '/ˈsɒft.weər dɪˈvel.ə.pər/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'lập trình viên / nhà phát triển phần mềm',
      definitionEn: 'a specialist who designs, codes, and develops computer programs and games',
      exampleSentence: 'Karl is a software developer. He designs and develops computer games.',
      exampleVietnamese: 'Karl là một lập trình viên phần mềm. Anh ấy thiết kế và phát triển trò chơi máy tính.',
      category: 'Job Roles'
    },
    {
      id: 'u1-3',
      word: 'systems analyst',
      phonetics: '/ˈsɪs.təmz ˈæn.ə.lɪst/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'chuyên viên phân tích hệ thống',
      definitionEn: 'a professional who studies computer systems and solves technical computer problems',
      exampleSentence: 'Heba is a system analyst. She solves complex computer problems.',
      exampleVietnamese: 'Heba là chuyên viên phân tích hệ thống. Cô ấy xử lý các sự cố máy tính phức tạp.',
      category: 'Job Roles'
    },
    {
      id: 'u1-4',
      word: 'database analyst',
      phonetics: '/ˈdeɪ.tə.beɪs ˈæn.ə.lɪst/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'chuyên viên phân tích cơ sở dữ liệu',
      definitionEn: 'a person who analyses, organizes and presents electronic data',
      exampleSentence: 'Wojtek is a database analyst. He analyses and presents electronic data.',
      exampleVietnamese: 'Wojtek là chuyên viên phân tích cơ sở dữ liệu. Anh ấy phân tích và trình bày dữ liệu điện tử.',
      category: 'Job Roles'
    },
    {
      id: 'u1-5',
      word: 'IT support officer',
      phonetics: '/aɪˈtiː səˈpɔːt ˈɒf.ɪ.sər/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'nhân viên hỗ trợ kỹ thuật CNTT',
      definitionEn: 'a technician who makes sure all computer systems work properly and supports staff',
      exampleSentence: 'Andrew is an IT support officer. His job is to make sure all of the computers work properly.',
      exampleVietnamese: 'Andrew là nhân viên hỗ trợ CNTT. Công việc của anh ấy là đảm bảo máy tính hoạt động trơn tru.',
      category: 'Job Roles'
    },
    {
      id: 'u1-6',
      word: 'firewall',
      phonetics: '/ˈfaɪə.wɔːl/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'tường lửa (bảo mật mạng)',
      definitionEn: 'security software or hardware that prevents unauthorized network access',
      exampleSentence: 'Sylvia creates usernames and sets up firewalls to protect company data.',
      exampleVietnamese: 'Sylvia tạo tài khoản người dùng và thiết lập tường lửa để bảo vệ dữ liệu doanh nghiệp.',
      category: 'IT Security'
    },
    {
      id: 'u1-7',
      word: 'WLAN',
      phonetics: '/ˈwɪəˌlæn/',
      partOfSpeech: 'acronym',
      vietnameseMeaning: 'mạng cục bộ không dây (Wireless Local Area Network)',
      definitionEn: 'A type of local-area network that uses high-frequency radio waves to communicate between nodes',
      exampleSentence: 'WLAN uses high-frequency radio waves to connect computers wirelessly.',
      exampleVietnamese: 'WLAN dùng sóng vô tuyến tần số cao để kết nối các máy tính không dây.',
      category: 'Networking'
    },
    {
      id: 'u1-8',
      word: 'data processing',
      phonetics: '/ˈdeɪ.tə ˈprəʊ.ses.ɪŋ/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'xử lý dữ liệu',
      definitionEn: 'the collection and manipulation of items of data to produce meaningful information',
      exampleSentence: 'Mark and Latika work in the data processing department.',
      exampleVietnamese: 'Mark và Latika làm việc tại bộ phận xử lý dữ liệu.',
      category: 'Operations'
    }
  ],
  matchingPairs: [
    { id: 'm1', english: 'network administrator', vietnamese: 'Quản trị viên mạng (thiết lập tường lửa & quyền truy cập)', category: 'IT Jobs' },
    { id: 'm2', english: 'software developer', vietnamese: 'Lập trình viên (thiết kế và lập trình ứng dụng/game)', category: 'IT Jobs' },
    { id: 'm3', english: 'systems analyst', vietnamese: 'Chuyên viên phân tích hệ thống (tìm và giải quyết sự cố)', category: 'IT Jobs' },
    { id: 'm4', english: 'database analyst', vietnamese: 'Chuyên viên phân tích CSDL (phân tích và trình bày dữ liệu)', category: 'IT Jobs' },
    { id: 'm5', english: 'HTML', vietnamese: 'Ngôn ngữ đánh dấu siêu văn bản mô tả cấu trúc trang web', category: 'Acronyms' },
    { id: 'm6', english: 'FTP', vietnamese: 'Giao thức truyền file giữa các máy chủ mạng', category: 'Acronyms' }
  ],
  gapFillExercises: [
    {
      id: 'gf1-1',
      sentenceWithBlank: 'Mahmoud is our network administrator. _____ job is to support you.',
      missingWord: 'His',
      options: ['His', 'Her', 'Their', 'Our'],
      hintVi: 'Mahmoud là nam giới, đại từ sở hữu tương ứng là gì?',
      explanation: 'Dựa theo trang 5 bài đọc: "Mahmoud is our network administrator. His job is to support you."'
    },
    {
      id: 'gf1-2',
      sentenceWithBlank: 'Eli and Guido are system maintenance officers. _____ job is to keep our systems going.',
      missingWord: 'Their',
      options: ['Their', 'Our', 'His', 'Her'],
      hintVi: 'Eli và Guido là số nhiều (họ)',
      explanation: 'Trang 5: "Eli and Guido are system maintenance officers. Their job is to keep our systems going."'
    },
    {
      id: 'gf1-3',
      sentenceWithBlank: 'The CISCO network security workshop _____ at 9.15 and finishes at 4.00.',
      missingWord: 'starts',
      options: ['starts', 'start', 'is starting', 'started'],
      hintVi: 'Lịch trình hội thảo diễn ra cố định, chia thì hiện tại đơn ngôi thứ 3 số ít',
      explanation: 'Trang 8: Schedules: "It starts at 9.15. / It begins at 8.30."'
    },
    {
      id: 'gf1-4',
      sentenceWithBlank: 'What does FTP _____ for? - It means File Transfer Protocol.',
      missingWord: 'stand',
      options: ['stand', 'mean', 'spells', 'stands'],
      hintVi: 'Cụm từ cố định để hỏi nghĩa của từ viết tắt: "What does ... stand for?"',
      explanation: 'Trang 10: "What does P2P stand for? It stands for person-to-person."'
    }
  ],
  unscrambleChallenges: [
    {
      id: 'us1-1',
      correctSentence: "I'm a network administrator and I set firewalls",
      jumbledWords: ['network', "I'm", 'firewalls', 'a', 'and', 'set', 'administrator', 'I'],
      translationVi: 'Tôi là một quản trị viên mạng và tôi thiết lập tường lửa.',
      grammarTipVi: 'Cấu trúc giới thiệu nghề nghiệp: I am a/an + Job title.'
    },
    {
      id: 'us1-2',
      correctSentence: 'What workshop do you want to attend today?',
      jumbledWords: ['you', 'workshop', 'attend', 'What', 'do', 'to', 'today', 'want'],
      translationVi: 'Bạn muốn tham dự buổi hội thảo nào ngày hôm nay?',
      grammarTipVi: 'Câu hỏi có từ để hỏi: What + noun + do + subject + verb...?'
    }
  ],
  roleplayScenario: {
    id: 'rp-u1',
    title: 'Giới thiệu đồng nghiệp mới tại phòng IT (Meeting & Introducing Colleagues)',
    scenarioDescriptionVi: 'Bạn là trưởng nhóm kỹ thuật (Jessica Martin). Hôm nay đón nhân viên mới gia nhập đội ngũ IT Support. Hãy thực hiện hội thoại chào đón chuyên nghiệp!',
    studentRole: 'IT Support Team Leader (Jessica Martin)',
    colleagueRole: 'New Colleague (Khalid Ali / Sharifa)',
    context: 'Pearson Longman Unit 1 p.4 & p.11 - Workplace Introductions',
    steps: [
      {
        stepId: 1,
        speakerName: 'Khalid Ali',
        speakerRole: 'New IT Employee',
        speakerAvatar: '👨‍💻',
        npcDialogueEn: "Good morning! My name is Khalid Ali. I'm the new trainee in the IT department.",
        npcDialogueVi: 'Chào buổi sáng! Tên tôi là Khalid Ali. Tôi là thực tập sinh mới ở phòng CNTT.',
        studentTaskVi: 'Đáp lại lời chào và bày tỏ sự hân hạnh được gặp mặt theo đúng văn phong công sở.',
        options: [
          {
            id: 'opt1-a',
            dialogEn: "Pleased to meet you, Khalid. I'm Jessica Martin, the IT Support team leader. Welcome to the team!",
            dialogVi: 'Rất vui được gặp bạn, Khalid. Tôi là Jessica Martin, trưởng nhóm hỗ trợ CNTT. Chào mừng bạn gia nhập đội ngũ!',
            isBest: true,
            score: 10,
            feedbackVi: 'Chính xác! Câu chào hỏi chuẩn mực từ Unit 1 p.4: "Pleased to meet you... Welcome to the team."'
          },
          {
            id: 'opt1-b',
            dialogEn: 'Hey, sit over there. I am busy with server right now.',
            dialogVi: 'Này, ngồi đằng kia đi. Tôi đang bận máy chủ.',
            isBest: false,
            score: 2,
            feedbackVi: 'Chưa lịch sự và thiếu tính chuyên nghiệp trong giao tiếp đón người mới.'
          }
        ]
      },
      {
        stepId: 2,
        speakerName: 'Khalid Ali',
        speakerRole: 'New IT Employee',
        speakerAvatar: '👨‍💻',
        npcDialogueEn: 'Thank you! Could you introduce the other colleagues working around here?',
        npcDialogueVi: 'Cảm ơn chị! Chị có thể giới thiệu các đồng nghiệp khác làm việc ở đây không?',
        studentTaskVi: 'Giới thiệu Mahmoud và nhiệm vụ của anh ấy bằng mẫu câu trang 4 và 5.',
        options: [
          {
            id: 'opt2-a',
            dialogEn: 'This is Mahmoud. He is our network administrator. His job is to set up firewalls and usernames.',
            dialogVi: 'Đây là Mahmoud. Anh ấy là quản trị viên mạng. Nhiệm vụ của anh ấy là cài đặt tường lửa và tài khoản.',
            isBest: true,
            score: 10,
            feedbackVi: 'Rất xuất sắc! Sử dụng đúng đại từ chỉ định "This is...", danh từ nghề nghiệp và đại từ sở hữu "His job".'
          },
          {
            id: 'opt2-b',
            dialogEn: 'Mahmoud there. He does many things on computer.',
            dialogVi: 'Mahmoud kia kìa. Anh ta làm nhiều thứ trên máy.',
            isBest: false,
            score: 3,
            feedbackVi: 'Câu thiếu cấu trúc ngữ pháp chuẩn và từ vựng chuyên ngành IT.'
          }
        ]
      }
    ]
  },
  reviewQuiz10: [
    {
      id: 'q1-1',
      game_type: 'quiz',
      question: 'Which job role is responsible for setting up firewalls, usernames, and passwords?',
      options: ['Network administrator', 'Software developer', 'Database analyst', 'Marketing assistant'],
      correct_answer: 'Network administrator',
      explanation: 'Theo Unit 1 trang 6 và 11: "A network administrator is responsible for setting up firewalls, wireless connection, usernames and passwords."',
      sourceContext: 'Unit 1 p.6 & p.11'
    },
    {
      id: 'q1-2',
      game_type: 'quiz',
      question: 'What does a software developer do according to Unit 1?',
      options: ['Designs and develops computer games and programs', 'Sets up network cables and hardware', 'Cleans the computer cases', 'Answers phone calls all day'],
      correct_answer: 'Designs and develops computer games and programs',
      explanation: 'Theo Audio script Unit 1: "Karl: I\'m a software developer. I design and develop computer games."',
      sourceContext: 'Unit 1 p.6 & p.70'
    },
    {
      id: 'q1-3',
      game_type: 'quiz',
      question: 'Complete the sentence: "Wojtek is a database administrator. He _____ and presents data."',
      options: ['analyses', 'analysing', 'analyse', 'are analysing'],
      correct_answer: 'analyses',
      explanation: 'Chủ ngữ ngôi thứ 3 số ít "He" ở thì hiện tại đơn với động từ "analyse" thêm "-s" thành "analyses". (Audio script p.70)',
      sourceContext: 'Unit 1 p.6 & p.70'
    },
    {
      id: 'q1-4',
      game_type: 'quiz',
      question: 'What does the acronym HTML stand for in the textbook?',
      options: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Level', 'Hyper Transfer Machine Link'],
      correct_answer: 'HyperText Markup Language',
      explanation: 'Trang 10: "HTML (HyperText Markup Language) is a mark-up language used to describe the structure of a web page."',
      sourceContext: 'Unit 1 p.10'
    },
    {
      id: 'q1-5',
      game_type: 'quiz',
      question: 'What does the acronym FTP stand for?',
      options: ['File Transfer Protocol', 'Fast Transmission Process', 'Folder Transfer Program', 'File Terminal Path'],
      correct_answer: 'File Transfer Protocol',
      explanation: 'Trang 10: "FTP (File Transfer Protocol): a standard network protocol used to copy a file from one host to another."',
      sourceContext: 'Unit 1 p.10'
    },
    {
      id: 'q1-6',
      game_type: 'quiz',
      question: 'Complete the dialogue: "Tim: Hi everybody, this _____ Ingrid. All: Hi!"',
      options: ['is', 'are', 'am', 'be'],
      correct_answer: 'is',
      explanation: 'Trang 4, Ex 2: "Tim: Hi everybody, this is Ingrid." Cấu trúc giới thiệu người thứ ba: "This is + [Name]".',
      sourceContext: 'Unit 1 p.4'
    },
    {
      id: 'q1-7',
      game_type: 'quiz',
      question: 'In Unit 1, which preposition is used with specific clock times (e.g. 9.15, 8.30)?',
      options: ['at', 'in', 'on', 'for'],
      correct_answer: 'at',
      explanation: 'Trang 8 (Language box): "We use at with clock times. It starts at 9.15. We have a break at 12.45."',
      sourceContext: 'Unit 1 p.8'
    },
    {
      id: 'q1-8',
      game_type: 'quiz',
      question: 'What does WLAN stand for?',
      options: ['Wireless Local Area Network', 'Wide Local Access Node', 'Web Linked Area Network', 'World Local Area Network'],
      correct_answer: 'Wireless Local Area Network',
      explanation: 'Trang 10: "WLAN (Wireless Local Area Network): A type of local-area network that uses high-frequency radio waves to communicate between nodes."',
      sourceContext: 'Unit 1 p.10'
    },
    {
      id: 'q1-9',
      game_type: 'quiz',
      question: 'What is Andrew\'s responsibility as an IT support officer (Unit 1 p.6)?',
      options: ['To make sure all of the computers work properly', 'To write purchase orders for books', 'To sell Dell computers', 'To design marketing banners'],
      correct_answer: 'To make sure all of the computers work properly',
      explanation: 'Trang 6: "Andrew. His job is to make sure all of the computers work properly."',
      sourceContext: 'Unit 1 p.6'
    },
    {
      id: 'q1-10',
      game_type: 'quiz',
      question: 'Choose the correct sentence in present simple for asking someone\'s job:',
      options: ['What do you do?', 'What are you do?', 'What do you doing?', 'What does you do?'],
      correct_answer: 'What do you do?',
      explanation: 'Trang 6 (Language box): "What do you do? I\'m a programmer."',
      sourceContext: 'Unit 1 p.6'
    }
  ],
  lessonPlan: {
    unitNumber: 1,
    lessonTitle: 'Unit 1: Working in the IT Industry - Meeting People & Job Roles',
    targetAudience: 'Sinh viên năm nhất ngành CNTT / Cao đẳng - Đại học (CEFR A1-A2)',
    duration: '1 tiết học tiêu chuẩn (45 phút)',
    learningObjectives: {
      language: [
        'Chào hỏi, giới thiệu bản thân và đồng nghiệp trong môi trường doanh nghiệp công nghệ.',
        'Hỏi đáp về công việc CNTT, nhiệm vụ chuyên môn và lịch làm việc.',
        'Sử dụng chính xác thì hiện tại đơn của To Be (am/is/are) và động từ chỉ thói quen.',
        'Hiểu và đánh vần chính xác các từ viết tắt công nghệ (HTML, FTP, WLAN, P2P, IP).'
      ],
      digitalCompetence: [
        'Khung DigComp 2.2 - Lĩnh vực 2: Giao tiếp và cộng tác số (Interacting through digital technologies).',
        'Sử dụng bảng tương tác / Padlet chia sẻ lời chào đa văn hóa.',
        'Thực hành mô phỏng giao tiếp số qua email công việc và công cụ ghi âm trực tuyến.'
      ]
    },
    phases: [
      {
        timeMinutes: '00 - 08 (8 phút)',
        phaseId: 'warmup',
        phaseNameVi: 'I. Khởi động & Kích hoạt kiến thức (Warm-up & Speaking)',
        phaseNameEn: 'Warm-up & Ice-breaker',
        teacherActivity: 'Chiếu hình ảnh văn phòng IT đa quốc gia; đặt câu hỏi kích thích tư duy: "How do you greet people in IT companies?" và cho chơi mini quiz khởi động.',
        studentActivity: 'Xem flashcards từ vựng chức danh IT; trả lời nhanh câu hỏi trắc nghiệm warm-up trên màn hình lớp học.',
        digitalTools: ['Interactive Flashcards trên NMT App', 'Padlet / Mentimeter', 'Màn chiếu 16:9'],
        digCompCompetence: '2.1 Tương tác thông qua các công nghệ số'
      },
      {
        timeMinutes: '08 - 18 (10 phút)',
        phaseId: 'teaching_vocab',
        phaseNameVi: 'II. Dạy từ vựng & Thuật ngữ CNTT (Teaching Vocabulary)',
        phaseNameEn: 'Vocabulary Acquisition',
        teacherActivity: 'Giới thiệu 5 vị trí việc làm IT (Network admin, Software dev, Systems analyst, Database analyst, IT support) gắn liền với mô tả nhiệm vụ thực tế trong sách.',
        studentActivity: 'Lắng nghe phát âm chuẩn bằng Web Audio; đọc đồng thanh và ghi chú nghĩa tiếng Việt kèm ví dụ.',
        digitalTools: ['Audio Pronunciation Native AI', 'Từ điển số thuật ngữ CNTT', 'Quizlet / LMS'],
        digCompCompetence: '1.2 Đánh giá và lưu trữ dữ liệu thông tin số'
      },
      {
        timeMinutes: '18 - 25 (7 phút)',
        phaseId: 'checking_vocab',
        phaseNameVi: 'III. Kiểm tra từ vựng nhanh (Checking Vocabulary)',
        phaseNameEn: 'Vocabulary Fast-Check',
        teacherActivity: 'Mở minigame "Matching Game" ghép cặp từ tiếng Anh với định nghĩa tiếng Việt; chia lớp thành 2 đội thi đấu.',
        studentActivity: 'Học sinh xung phong lên bảng tương tác hoặc thao tác trên điện thoại ghép đúng các cặp từ.',
        digitalTools: ['Trò chơi Matching Game trên web app', 'Live Leaderboard', 'Wordwall'],
        digCompCompetence: '2.2 Chia sẻ thông tin và nội dung qua công cụ số'
      },
      {
        timeMinutes: '25 - 35 (10 phút)',
        phaseId: 'drilling',
        phaseNameVi: 'IV. Luyện tập ngữ pháp & Cấu trúc câu (Drilling & Grammar Focus)',
        phaseNameEn: 'Drilling & Structural Practice',
        teacherActivity: 'Hướng dẫn cấu trúc To Be và thì hiện tại đơn; điều phối bài tập điền từ khuyết (Gap-fill) và sắp xếp trật tự từ (Sentence Unscramble).',
        studentActivity: 'Làm bài tập điền từ và kéo thả câu trực tiếp; xem phản hồi tức thì và giải thích trích xuất từ sách giáo khoa.',
        digitalTools: ['Gap-fill Challenge Component', 'Unscramble Sentence Engine'],
        digCompCompetence: '3.1 Phát triển nội dung số cá nhân'
      },
      {
        timeMinutes: '35 - 45 (10 phút)',
        phaseId: 'roleplay_writing',
        phaseNameVi: 'V. Đóng vai tình huống & Viết email công sở (Role-play & Writing)',
        phaseNameEn: 'Workplace Simulation & Email Communication',
        teacherActivity: 'Giao tình huống: Chào đón nhân viên mới gia nhập nhóm IT Support; hướng dẫn viết email giới thiệu bản thân theo mẫu trang 11.',
        studentActivity: 'Thực hành hội thoại đóng vai với AI Simulator trên web app; gõ thử email phản hồi cho chị Jessica Martin.',
        digitalTools: ['Workplace Roleplay Simulator', 'Giả lập Form Email công sở', 'Loom/Flip ghi âm nói'],
        digCompCompetence: '2.4 Hợp tác và giao tiếp chuyên nghiệp số (Netiquette)'
      }
    ]
  }
};
