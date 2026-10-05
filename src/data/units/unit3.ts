import { UnitData } from '../../types/index.ts';

export const unit3Data: UnitData = {
  id: 'unit-3',
  unitNumber: 3,
  unitNameEn: 'Websites',
  unitNameVi: 'Phát triển & Phân tích Website',
  pageRange: 'Trang 20 - 27',
  level: 'CEF A1 - A2 (College IT)',
  grammarFocusEn: 'Question words (Which, What, Why, When, How many, How long) & Describing steps in a process (First, Secondly, Then, After that, Finally)',
  grammarFocusVi: 'Từ để hỏi và Trình tự các bước trong quy trình phát triển website (First, Secondly, Then, After that, Finally)',
  overviewVi: 'Mục đích các loại website (thương mại, tin tức, giáo dục), chỉ số phân tích lưu lượng truy cập (traffic, bounce rate, pageviews) và 7 bước quy chuẩn làm web.',
  vocabList: [
    {
      id: 'u3-1',
      word: 'website traffic',
      phonetics: '/ˈweb.saɪt ˈtræf.ɪk/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'lưu lượng truy cập website',
      definitionEn: 'the movement and actions of external visitors coming to your website',
      exampleSentence: 'Sarah requested a report about our monthly website traffic.',
      exampleVietnamese: 'Sarah đã yêu cầu báo cáo về lưu lượng truy cập website hàng tháng của chúng tôi.',
      category: 'Analytics'
    },
    {
      id: 'u3-2',
      word: 'page optimisation',
      phonetics: '/peɪdʒ ˌɒp.tɪ.maɪˈzeɪ.ʃən/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'tối ưu hóa trang web',
      definitionEn: 'the process of increasing the number of visitors and speed of your site',
      exampleSentence: 'Good page optimisation helps the site load quickly and rank higher on search engines.',
      exampleVietnamese: 'Tối ưu hóa trang web tốt giúp trang tải nhanh và có thứ hạng cao hơn trên công cụ tìm kiếm.',
      category: 'Development'
    },
    {
      id: 'u3-3',
      word: 'meta tag',
      phonetics: '/ˈmet.ə tæɡ/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'thẻ mô tả dữ liệu ẩn (meta tag)',
      definitionEn: 'invisible information such as a hidden keyword embedded on a web page',
      exampleSentence: 'Search engines read the meta tag to understand the contents of the page.',
      exampleVietnamese: 'Các công cụ tìm kiếm đọc thẻ meta tag để hiểu nội dung của trang web.',
      category: 'SEO'
    },
    {
      id: 'u3-4',
      word: 'bounce rate',
      phonetics: '/baʊns reɪt/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'tỷ lệ thoát trang',
      definitionEn: 'the percentage of visitors who leave the website after viewing only one single page',
      exampleSentence: 'The analytics dashboard shows a bounce rate of 67.83% for the landing page.',
      exampleVietnamese: 'Bảng điều khiển phân tích hiển thị tỷ lệ thoát trang là 67.83% cho trang đích.',
      category: 'Analytics'
    },
    {
      id: 'u3-5',
      word: 'website specification',
      phonetics: '/ˈweb.saɪt ˌspes.ɪ.fɪˈkeɪ.ʃən/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'bản đặc tả kỹ thuật website',
      definitionEn: 'a detailed document outlining requirements, structure, and features of a proposed site',
      exampleSentence: 'After analysing the customer requirements, the team creates a website specification.',
      exampleVietnamese: 'Sau khi phân tích yêu cầu khách hàng, nhóm tiến hành lập bản đặc tả kỹ thuật website.',
      category: 'Process'
    },
    {
      id: 'u3-6',
      word: 'commercial website',
      phonetics: '/kəˈmɜː.ʃəl ˈweb.saɪt/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'website thương mại',
      definitionEn: 'a website created by businesses to sell products or services online',
      exampleSentence: 'Companies develop commercial websites like Amazon to sell goods to worldwide customers.',
      exampleVietnamese: 'Các doanh nghiệp xây dựng website thương mại như Amazon để bán hàng cho khách hàng toàn cầu.',
      category: 'Web Types'
    }
  ],
  matchingPairs: [
    { id: 'm3-1', english: 'traffic', vietnamese: 'Sự di chuyển và thao tác của người dùng ghé thăm trang web', category: 'Analytics' },
    { id: 'm3-2', english: 'meta tag', vietnamese: 'Thông tin ẩn (từ khóa ngầm) nằm trong mã nguồn trang web', category: 'Analytics' },
    { id: 'm3-3', english: 'visitor map', vietnamese: 'Bản đồ vị trí địa lý nơi khách truy cập đến', category: 'Analytics' },
    { id: 'm3-4', english: 'user profile', vietnamese: 'Hồ sơ người dùng và lịch sử các trang họ đã duyệt qua', category: 'Analytics' },
    { id: 'm3-5', english: 'page optimisation', vietnamese: 'Giải pháp gia tăng số lượng khách truy cập và tốc độ trang', category: 'Analytics' }
  ],
  gapFillExercises: [
    {
      id: 'gf3-1',
      sentenceWithBlank: 'First, discuss with the customer. Secondly, _____ the information from the customer.',
      missingWord: 'analyse',
      options: ['analyse', 'test', 'sell', 'repair'],
      hintVi: 'Bước 2 trong quy trình phát triển website trang 24: phân tích thông tin',
      explanation: 'Trang 24: "(1) First, discuss... (2) Secondly, analyse the information from the customer."'
    },
    {
      id: 'gf3-2',
      sentenceWithBlank: '_____ people visit our website every day? - About 20,000.',
      missingWord: 'How many',
      options: ['How many', 'How much', 'Which', 'Where'],
      hintVi: 'Hỏi số lượng danh từ đếm được số nhiều (people)',
      explanation: 'Trang 23 (Language box): "We use how many to ask about quantity of countable items: How many people visit our website every day?"'
    },
    {
      id: 'gf3-3',
      sentenceWithBlank: 'Educational websites aim to share knowledge and _____ online learning.',
      missingWord: 'enable',
      options: ['enable', 'block', 'prevent', 'delete'],
      hintVi: 'Cho phép hoặc tạo điều kiện cho việc học trực tuyến (trang 20)',
      explanation: 'Trang 20: "Educational websites aim to share knowledge and enable online learning."'
    }
  ],
  unscrambleChallenges: [
    {
      id: 'us3-1',
      correctSentence: 'First discuss with the customer their requirements',
      jumbledWords: ['customer', 'First', 'their', 'with', 'requirements', 'the', 'discuss'],
      translationVi: 'Đầu tiên, hãy thảo luận với khách hàng về các yêu cầu của họ.',
      grammarTipVi: 'Dùng từ chỉ thứ tự "First" khi bắt đầu mô tả quy trình.'
    },
    {
      id: 'us3-2',
      correctSentence: 'How many people visit your website every month?',
      jumbledWords: ['visit', 'website', 'month', 'every', 'people', 'many', 'How', 'your'],
      translationVi: 'Có bao nhiêu người ghé thăm website của bạn mỗi tháng?',
      grammarTipVi: 'Câu hỏi số lượng: How many + Plural noun + do/does + S + V?'
    }
  ],
  roleplayScenario: {
    id: 'rp-u3',
    title: 'Tiếp nhận yêu cầu thiết kế web từ khách hàng (Client Website Brief)',
    scenarioDescriptionVi: 'Bạn là chuyên viên thiết kế web. Đại diện công ty Learning Now Ltd muốn bạn tư vấn và phát triển một cổng học trực tuyến mới. Hãy trao đổi chuẩn xác theo trang 24 & 27!',
    studentRole: 'Web Developer / Project Lead',
    colleagueRole: 'Customer (Learning Now Ltd Representative)',
    context: 'Pearson Longman Unit 3 p.24 & p.27 - Website Development Process',
    steps: [
      {
        stepId: 1,
        speakerName: 'Customer Rep',
        speakerRole: 'Client from Learning Now Ltd',
        speakerAvatar: '👩‍🏫',
        npcDialogueEn: 'Hello! Our company wants a new website to promote language courses for young adults worldwide. What is our first step?',
        npcDialogueVi: 'Xin chào! Công ty chúng tôi muốn làm một website mới để quảng bá khóa học tiếng cho thanh thiếu niên toàn cầu. Bước đầu tiên cần làm là gì?',
        studentTaskVi: 'Nêu bước 1 trong quy trình phát triển website chuẩn mực.',
        options: [
          {
            id: 'opt1-a',
            dialogEn: 'First, we discuss your specific requirements, target audience, and the features you need, such as audio and interactivity.',
            dialogVi: 'Đầu tiên, chúng ta cùng thảo luận về các yêu cầu cụ thể, đối tượng mục tiêu và các tính năng như âm thanh và tương tác.',
            isBest: true,
            score: 10,
            feedbackVi: 'Hoàn hảo! Bám sát chuẩn quy trình Bước 1 trang 24: "First, discuss with the customer their requirements".'
          },
          {
            id: 'opt1-b',
            dialogEn: 'Just pay money and we code immediately without any plan.',
            dialogVi: 'Cứ trả tiền đi rồi chúng tôi viết mã ngay không cần kế hoạch.',
            isBest: false,
            score: 1,
            feedbackVi: 'Không đúng quy trình chuyên nghiệp của một kỹ sư phần mềm.'
          }
        ]
      }
    ]
  },
  reviewQuiz10: [
    {
      id: 'q3-1',
      game_type: 'quiz',
      question: 'What is the primary purpose of a commercial website?',
      options: ['To sell products or services', 'To entertain only with funny videos', 'To display personal blog photos only', 'To share school homework'],
      correct_answer: 'To sell products or services',
      explanation: 'Trang 20: "Companies develop commercial websites to sell products or services."',
      sourceContext: 'Unit 3 p.20'
    },
    {
      id: 'q3-2',
      game_type: 'quiz',
      question: 'What does "bounce rate" mean in website analytics?',
      options: ['The percentage of people who view only one page on the website', 'The total number of servers connected', 'The speed of network cables', 'The time spent paying by credit card'],
      correct_answer: 'The percentage of people who view only one page on the website',
      explanation: 'Trang 22: "Bounce rate indicates the percentage of visitors who view only one page on the website before leaving."',
      sourceContext: 'Unit 3 p.22'
    },
    {
      id: 'q3-3',
      game_type: 'quiz',
      question: 'In website development steps (p.24), what comes right after discussing requirements?',
      options: ['Analyse the information from the customer', 'Test the website', 'Publish the site immediately', 'Write HTML coding'],
      correct_answer: 'Analyse the information from the customer',
      explanation: 'Trang 24: "Secondly, analyse the information from the customer."',
      sourceContext: 'Unit 3 p.24'
    },
    {
      id: 'q3-4',
      game_type: 'quiz',
      question: 'Which website analysis tool shows invisible keywords used by search engines?',
      options: ['meta tag', 'visitor map', 'traffic counter', 'audio player'],
      correct_answer: 'meta tag',
      explanation: 'Trang 22: "meta tag: invisible information (e.g. a hidden keyword) on a website."',
      sourceContext: 'Unit 3 p.22'
    },
    {
      id: 'q3-5',
      game_type: 'quiz',
      question: 'What is the correct order of sequence connectors in describing a process?',
      options: ['First, Secondly, Then, After that, Finally', 'Finally, First, Then, Secondly', 'Next, First, After that, Finally', 'Firstly, Finally, Next, Secondly'],
      correct_answer: 'First, Secondly, Then, After that, Finally',
      explanation: 'Trang 24 (Language box): "First, Secondly, Thirdly, Then, After that, Finally".',
      sourceContext: 'Unit 3 p.24'
    },
    {
      id: 'q3-6',
      game_type: 'quiz',
      question: 'Which question word is used to ask for the reason for something?',
      options: ['Why', 'Which', 'When', 'How many'],
      correct_answer: 'Why',
      explanation: 'Trang 21: "We use why to ask the reason for something. (Why do you use Wikipedia?)"',
      sourceContext: 'Unit 3 p.21'
    },
    {
      id: 'q3-7',
      game_type: 'quiz',
      question: 'How do you say the number 500,000 in English (p.23)?',
      options: ['five hundred thousand (or half a million)', 'fifty thousand', 'five million', 'fifty hundred'],
      correct_answer: 'five hundred thousand (or half a million)',
      explanation: 'Trang 23: "500,000 = five hundred thousand / half a million".',
      sourceContext: 'Unit 3 p.23'
    },
    {
      id: 'q3-8',
      game_type: 'quiz',
      question: 'Who writes the code in HTML after the website content is drafted (p.24)?',
      options: ['Programmers', 'The accountant', 'Security guards', 'Cleaning staff'],
      correct_answer: 'Programmers',
      explanation: 'Trang 24: "(6) give the project to programmers for HTML coding."',
      sourceContext: 'Unit 3 p.24'
    },
    {
      id: 'q3-9',
      game_type: 'quiz',
      question: 'What is the final step before publishing a website on the Internet (p.24)?',
      options: ['Test the website', 'Disconnect the computer', 'Turn off the server', 'Delete the content'],
      correct_answer: 'Test the website',
      explanation: 'Trang 24: "(7) Finally, test the website."',
      sourceContext: 'Unit 3 p.24'
    },
    {
      id: 'q3-10',
      game_type: 'quiz',
      question: 'Complete the sentence: "There _____ a lot of photos on this website."',
      options: ['are', 'is', 'has', 'have'],
      correct_answer: 'are',
      explanation: 'Trang 26: "There are / aren\'t used with plural nouns: There are a lot of photos on this website."',
      sourceContext: 'Unit 3 p.26'
    }
  ],
  lessonPlan: {
    unitNumber: 3,
    lessonTitle: 'Unit 3: Websites - Architecture, Web Analytics & Process Sequencing',
    targetAudience: 'Sinh viên CNTT chuyên ngành Thiết kế & Phát triển Web',
    duration: '45 phút (1 tiết)',
    learningObjectives: {
      language: [
        'Sử dụng các từ chỉ trình tự (First, Secondly, Then, After that, Finally) để thuyết trình quy trình 7 bước làm web.',
        'Sử dụng các chỉ số Web Analytics (traffic, pageviews, bounce rate) trong thảo luận kỹ thuật.',
        'Đặt câu hỏi số lượng và mục đích (How many, Why, Which).'
      ],
      digitalCompetence: [
        'DigComp 2.2 - Lĩnh vực 3: Sáng tạo nội dung số (Phân tích cấu trúc website).',
        'DigComp 2.2 - Lĩnh vực 1: Khai thác và đọc dữ liệu Web Analytics.'
      ]
    },
    phases: [
      {
        timeMinutes: '00 - 08 (8 phút)',
        phaseId: 'warmup',
        phaseNameVi: 'I. Khởi động (Website Typology Warm-up)',
        phaseNameEn: 'Types of Websites',
        teacherActivity: 'Chiếu giao diện Wikipedia, Amazon, CNN và hỏi sinh viên mục đích của từng website.',
        studentActivity: 'Xem flashcards và phân loại website theo chức năng (commercial, educational, news).',
        digitalTools: ['Website Typology Interactive Slider', 'Màn chiếu 16:9'],
        digCompCompetence: '1.1 Lọc và phân tích thông tin web'
      },
      {
        timeMinutes: '08 - 18 (10 phút)',
        phaseId: 'teaching_vocab',
        phaseNameVi: 'II. Dạy thuật ngữ Web Analytics & Quy trình (Web Analytics Terms)',
        phaseNameEn: 'Analytics & 7 Development Steps',
        teacherActivity: 'Giới thiệu các chỉ số traffic, bounce rate, meta tag và 7 bước làm web chuẩn mực.',
        studentActivity: 'Lắng nghe phát âm và ghi nhận các bước: Client Brief -> Analysis -> Spec -> Design -> Content -> Coding -> Testing.',
        digitalTools: ['Audio Pronunciation Native AI', 'Flowchart Interactive Builder'],
        digCompCompetence: '3.1 Sáng tạo nội dung kỹ thuật số'
      },
      {
        timeMinutes: '18 - 25 (7 phút)',
        phaseId: 'checking_vocab',
        phaseNameVi: 'III. Minigame kiểm tra thuật ngữ (Analytics Matching Game)',
        phaseNameEn: 'Term Matching Game',
        teacherActivity: 'Khởi chạy trò chơi ghép thẻ thuật ngữ phân tích website với định nghĩa tiếng Việt.',
        studentActivity: 'Nhanh tay ghép cặp từ và nhận điểm số combo trực tiếp trên màn hình.',
        digitalTools: ['Matching Game Engine', 'Wordwall Web Analytics preset'],
        digCompCompetence: '2.1 Tương tác số'
      },
      {
        timeMinutes: '25 - 35 (10 phút)',
        phaseId: 'drilling',
        phaseNameVi: 'IV. Luyện tập sắp xếp quy trình (Process Ordering Challenge)',
        phaseNameEn: 'Process Sequencing Drilling',
        teacherActivity: 'Hướng dẫn bài tập điền liên từ First, Secondly, Then, After that, Finally.',
        studentActivity: 'Kéo thả các hộp thứ tự 7 bước phát triển web; hoàn thành bài tập điền từ khuyết.',
        digitalTools: ['Flowchart Drag-and-Drop Activity', 'Gap-fill Challenge'],
        digCompCompetence: '3.2 Tích hợp và tái xây dựng nội dung số'
      },
      {
        timeMinutes: '35 - 45 (10 phút)',
        phaseId: 'roleplay_writing',
        phaseNameVi: 'V. Đóng vai báo cáo khách hàng (Client Consultation Role-play)',
        phaseNameEn: 'Client Proposal Simulation',
        teacherActivity: 'Giao tình huống nhận dự án cho Learning Now Ltd; sinh viên soạn bản đề xuất (proposal).',
        studentActivity: 'Thực hành đối thoại theo vai lập trình viên web; chọn phương án tư vấn chính xác.',
        digitalTools: ['Roleplay Dialogue Simulator', 'Google Docs Proposal Template'],
        digCompCompetence: '2.4 Giao tiếp công sở số'
      }
    ]
  }
};
