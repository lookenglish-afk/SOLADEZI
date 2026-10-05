import { UnitData } from '../../types/index.ts';

export const unit5Data: UnitData = {
  id: 'unit-5',
  unitNumber: 5,
  unitNameEn: 'E-commerce & Online Transactions',
  unitNameVi: 'Thương mại Điện tử & Giao dịch Trực tuyến',
  pageRange: 'Trang 36 - 43',
  level: 'CEF A1 - A2 (College IT)',
  grammarFocusEn: 'Talking about quantity (many, a few, much, a little, a lot of, some) & Future with will (will + infinitive)',
  grammarFocusVi: 'Từ chỉ số lượng (many, a few, much, a little, a lot of) và Thì tương lai đơn với will diễn tả kế hoạch kỹ thuật',
  overviewVi: 'Mô hình B2B, B2C, C2C, M-commerce; các bước trong quy trình thanh toán trực tuyến và giải pháp bảo mật cổng thanh toán (SSL, WAF, 2FA).',
  vocabList: [
    {
      id: 'u5-1',
      word: 'payment gateway',
      phonetics: '/ˈpeɪ.mənt ˈɡeɪt.weɪ/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'cổng thanh toán trực tuyến',
      definitionEn: 'a merchant service that authorizes and checks credit card payments with the issuing bank',
      exampleSentence: 'The payment gateway will check the buyer\'s ability to pay with their bank.',
      exampleVietnamese: 'Cổng thanh toán sẽ kiểm tra khả năng thanh toán của người mua với ngân hàng của họ.',
      category: 'Transactions'
    },
    {
      id: 'u5-2',
      word: 'two-factor authentication (2FA)',
      phonetics: '/ˌtuː ˈfæk.tər ɔːˌθen.tɪˈkeɪ.ʃən/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'xác thực 2 yếu tố (2FA)',
      definitionEn: 'a security process where a user provides two different authentication factors to verify themselves',
      exampleSentence: 'We will have two-factor authentication so administrators go through two security layers.',
      exampleVietnamese: 'Chúng tôi sẽ áp dụng xác thực 2 yếu tố để quản trị viên qua 2 lớp bảo mật.',
      category: 'Security'
    },
    {
      id: 'u5-3',
      word: 'B2B (business-to-business)',
      phonetics: '/ˌbiː.təˈbiː/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'thương mại doanh nghiệp với doanh nghiệp (B2B)',
      definitionEn: 'commercial transactions where companies exchange information and make wholesale deals',
      exampleSentence: 'Coffee suppliers selling beans to Nestle is an example of B2B transactions.',
      exampleVietnamese: 'Nhà cung cấp cà phê bán hạt cho Nestle là một ví dụ về giao dịch B2B.',
      category: 'Business Models'
    },
    {
      id: 'u5-4',
      word: 'B2C (business-to-consumer)',
      phonetics: '/ˌbiː.təˈsiː/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'thương mại doanh nghiệp tới người tiêu dùng (B2C)',
      definitionEn: 'companies sell retail products or services directly to customers over the Internet',
      exampleSentence: 'Amazon sells books and gadgets directly to shoppers as a premier B2C platform.',
      exampleVietnamese: 'Amazon bán sách và thiết bị trực tiếp cho người mua sắm như một nền tảng B2C hàng đầu.',
      category: 'Business Models'
    },
    {
      id: 'u5-5',
      word: 'C2C (consumer-to-consumer)',
      phonetics: '/ˌsiː.təˈsiː/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'thương mại người tiêu dùng với nhau (C2C)',
      definitionEn: 'an online platform where people sell or exchange second-hand items and collectibles to each other',
      exampleSentence: 'On eBay, ordinary consumers sell used electronics directly to other consumers.',
      exampleVietnamese: 'Trên eBay, người tiêu dùng bán các đồ điện tử đã qua sử dụng trực tiếp cho người khác.',
      category: 'Business Models'
    },
    {
      id: 'u5-6',
      word: 'M-commerce',
      phonetics: '/ˈem kɒm.ɜːs/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'thương mại di động (M-commerce)',
      definitionEn: 'buying and selling goods or services through handheld mobile devices like smartphones',
      exampleSentence: 'M-commerce allows customers to purchase sports results and items via smartphone apps.',
      exampleVietnamese: 'Thương mại di động cho phép khách hàng mua thông tin thể thao và hàng hóa qua điện thoại.',
      category: 'Business Models'
    }
  ],
  matchingPairs: [
    { id: 'm5-1', english: 'B2B', vietnamese: 'Doanh nghiệp trao đổi thông tin và thực hiện giao dịch bán buôn', category: 'Models' },
    { id: 'm5-2', english: 'B2C', vietnamese: 'Doanh nghiệp bán sản phẩm hoặc dịch vụ trực tiếp cho người tiêu dùng', category: 'Models' },
    { id: 'm5-3', english: 'C2C', vietnamese: 'Cá nhân bán hoặc trao đổi các vật phẩm đã qua sử dụng với nhau', category: 'Models' },
    { id: 'm5-4', english: 'M-commerce', vietnamese: 'Khách hàng mua sắm sản phẩm và dịch vụ qua thiết bị di động', category: 'Models' },
    { id: 'm5-5', english: 'payment gateway', vietnamese: 'Cổng thanh toán kiểm tra khả năng chi trả với ngân hàng', category: 'Transactions' }
  ],
  gapFillExercises: [
    {
      id: 'gf5-1',
      sentenceWithBlank: 'We need a _____ users to test the checkout process. (vài người)',
      missingWord: 'few',
      options: ['few', 'little', 'much', 'lot'],
      hintVi: 'Dùng với danh từ đếm được số nhiều: "a few + plural noun"',
      explanation: 'Trang 36: "We use many and a few with countable plural nouns: We need a few users to test this."'
    },
    {
      id: 'gf5-2',
      sentenceWithBlank: 'The new security system _____ protect our customer data better.',
      missingWord: 'will',
      options: ['will', 'has', 'did', 'is to'],
      hintVi: 'Thì tương lai đơn diễn tả kế hoạch/kết quả tương lai (will + infinitive)',
      explanation: 'Trang 40: "We use will + infinitive without to to talk about plans for the future."'
    }
  ],
  unscrambleChallenges: [
    {
      id: 'us5-1',
      correctSentence: 'The payment gateway will check the buyers ability to pay',
      jumbledWords: ['pay', 'ability', 'The', 'gateway', 'to', 'will', 'payment', 'check', 'buyers', 'the'],
      translationVi: 'Cổng thanh toán sẽ kiểm tra khả năng thanh toán của người mua.',
      grammarTipVi: 'Thì tương lai đơn: S + will + V-bare + O.'
    }
  ],
  roleplayScenario: {
    id: 'rp-u5',
    title: 'Giải thích quy trình thanh toán trực tuyến cho khách hàng (Online Transaction Process)',
    scenarioDescriptionVi: 'Bạn là chuyên viên kỹ thuật Shayan. Đồng nghiệp Monika chưa nắm rõ luồng dữ liệu khi khách hàng thanh toán trực tuyến. Hãy giải thích từng bước theo trang 42!',
    studentRole: 'E-commerce Technical Lead (Shayan)',
    colleagueRole: 'New Associate (Monika)',
    context: 'Pearson Longman Unit 5 p.42 - Transaction workflow dialogue',
    steps: [
      {
        stepId: 1,
        speakerName: 'Monika',
        speakerRole: 'Colleague',
        speakerAvatar: '👩‍💼',
        npcDialogueEn: 'Shayan, can you explain how a customer completes an online transaction on our new website?',
        npcDialogueVi: 'Shayan, bạn có thể giải thích cách khách hàng hoàn tất một giao dịch trực tuyến trên web mới không?',
        studentTaskVi: 'Nêu bước khởi đầu: đặt đơn hàng và máy chủ kiểm tra hàng tồn.',
        options: [
          {
            id: 'opt1-a',
            dialogEn: "First, the customer places an order. The seller's web server confirms availability of the product and then connects to the payment gateway.",
            dialogVi: 'Đầu tiên, khách đặt hàng. Máy chủ bên bán xác nhận tình trạng còn hàng rồi kết nối đến cổng thanh toán.',
            isBest: true,
            score: 10,
            feedbackVi: 'Chính xác! Lời thoại chuẩn từ trang 42 của Shayan.'
          },
          {
            id: 'opt1-b',
            dialogEn: 'They send cash by postal mail across the ocean.',
            dialogVi: 'Họ gửi tiền mặt bằng đường bưu điện qua đại dương.',
            isBest: false,
            score: 0,
            feedbackVi: 'Đây không phải phương thức thương mại điện tử.'
          }
        ]
      }
    ]
  },
  reviewQuiz10: [
    {
      id: 'q5-1',
      game_type: 'quiz',
      question: 'Which E-commerce model involves individuals selling second-hand items to other individuals (e.g. eBay)?',
      options: ['C2C (consumer-to-consumer)', 'B2B (business-to-business)', 'B2C (business-to-consumer)', 'Government-to-business'],
      correct_answer: 'C2C (consumer-to-consumer)',
      explanation: 'Trang 37: "C2C: People sell or exchange second-hand, used items and collectibles (example: eBay)."',
      sourceContext: 'Unit 5 p.37'
    },
    {
      id: 'q5-2',
      game_type: 'quiz',
      question: 'What is the role of a payment gateway in an online transaction (p.42)?',
      options: ['Checks the buyer\'s ability to pay with the bank', 'Draws graphic designs for the website', 'Prints the paper invoice', 'Delivers the package by truck'],
      correct_answer: 'Checks the buyer\'s ability to pay with the bank',
      explanation: 'Trang 42: "The payment gateway will check the buyer\'s ability to pay with the bank."',
      sourceContext: 'Unit 5 p.42'
    },
    {
      id: 'q5-3',
      game_type: 'quiz',
      question: 'Choose the correct quantifier with uncountable noun: "We have a _____ money for online shopping each week."',
      options: ['little', 'few', 'many', 'several'],
      correct_answer: 'little',
      explanation: 'Trang 36: "We use much and a little with uncountable nouns: We have a little money for online shopping."',
      sourceContext: 'Unit 5 p.36'
    },
    {
      id: 'q5-4',
      game_type: 'quiz',
      question: 'What does 2FA stand for in website transaction security (p.40)?',
      options: ['Two-factor authentication', 'Two-file application', 'Twice faster access', 'Two firewall architecture'],
      correct_answer: 'Two-factor authentication',
      explanation: 'Trang 40: "We will have two-factor authentication (2FA). Website administrators will go through two layers of security."',
      sourceContext: 'Unit 5 p.40'
    },
    {
      id: 'q5-5',
      game_type: 'quiz',
      question: 'What is the correct negative form of "will" in future tense?',
      options: ['won\'t (will not)', 'don\'t will', 'aren\'t will', 'haven\'t will'],
      correct_answer: 'won\'t (will not)',
      explanation: 'Trang 40: "Hackers won\'t (will not) get into the network."',
      sourceContext: 'Unit 5 p.40'
    },
    {
      id: 'q5-6',
      game_type: 'quiz',
      question: 'Which type of E-commerce refers to purchasing goods and services via mobile phones (p.37)?',
      options: ['M-commerce', 'C2C', 'B2B', 'Static commerce'],
      correct_answer: 'M-commerce',
      explanation: 'Trang 37: "M-commerce: Customers purchase products and services via mobile devices."',
      sourceContext: 'Unit 5 p.37'
    },
    {
      id: 'q5-7',
      game_type: 'quiz',
      question: 'What does SSL provide for online users (p.40)?',
      options: ['A secure encrypted connection', 'Free shipping for all orders', 'A bigger computer screen', 'A discount voucher'],
      correct_answer: 'A secure encrypted connection',
      explanation: 'Trang 40: "Secure Socket Layer (SSL) will create a secure connection for the users."',
      sourceContext: 'Unit 5 p.40'
    },
    {
      id: 'q5-8',
      game_type: 'quiz',
      question: 'Complete the sentence with a linking word: "She\'s got a Kindle, _____ she doesn\'t buy many paper books now."',
      options: ['so', 'but', 'or', 'although'],
      correct_answer: 'so',
      explanation: 'Trang 39: "We use so to say that something has happened as a result of something: She\'s got a Kindle, so she doesn\'t buy many books now."',
      sourceContext: 'Unit 5 p.39'
    },
    {
      id: 'q5-9',
      game_type: 'quiz',
      question: 'In online shopping steps (p.38), what does a customer do before going to the checkout?',
      options: ['Puts the item(s) in a basket or shopping cart', 'Unplugs the computer', 'Changes the router settings', 'Defragment the hard drive'],
      correct_answer: 'Puts the item(s) in a basket or shopping cart',
      explanation: 'Trang 38: "Steps in buying products: ... (c) The customer puts the item(s) in a basket or shopping cart; (b) The customer goes to the check-out."',
      sourceContext: 'Unit 5 p.38'
    },
    {
      id: 'q5-10',
      game_type: 'quiz',
      question: 'Why do companies develop an online presence (Unit 5 p.39)?',
      options: ['To reach more customers and expand sales', 'To delete their products', 'Because they don\'t want customers', 'To pay higher warehouse rent'],
      correct_answer: 'To reach more customers and expand sales',
      explanation: 'Trang 39: "Companies want to reach more customers, so they go online."',
      sourceContext: 'Unit 5 p.39'
    }
  ],
  lessonPlan: {
    unitNumber: 5,
    lessonTitle: 'Unit 5: E-commerce - Models, Secure Payment Gateways & Future Tense',
    targetAudience: 'Sinh viên CNTT & Thương mại Điện tử',
    duration: '45 phút (1 tiết)',
    learningObjectives: {
      language: [
        'Phân biệt và sử dụng chính xác các mô hình B2B, B2C, C2C, M-commerce.',
        'Sử dụng các từ chỉ lượng (much, many, a little, a few) và thì tương lai với will.',
        'Mô tả quy trình thanh toán trực tuyến qua cổng thanh toán ngân hàng.'
      ],
      digitalCompetence: [
        'DigComp 2.2 - Lĩnh vực 4: An toàn thanh toán trực tuyến và giao dịch số.',
        'DigComp 2.2 - Lĩnh vực 2: Tương tác qua các nền tảng thương mại điện tử.'
      ]
    },
    phases: [
      {
        timeMinutes: '00 - 08 (8 phút)',
        phaseId: 'warmup',
        phaseNameVi: 'I. Khởi động (E-commerce Platforms Warm-up)',
        phaseNameEn: 'Shopping Habits Warm-up',
        teacherActivity: 'Chiếu logo các sàn Amazon, eBay, Tiki và hỏi thói quen mua sắm trực tuyến của người học.',
        studentActivity: 'Xem flashcards và trả lời câu hỏi phân loại mô hình B2B/B2C.',
        digitalTools: ['Interactive Model Flashcards', 'Màn hình 16:9'],
        digCompCompetence: '1.1 Khai thác nền tảng số'
      },
      {
        timeMinutes: '08 - 18 (10 phút)',
        phaseId: 'teaching_vocab',
        phaseNameVi: 'II. Dạy thuật ngữ thanh toán & Ngữ pháp chỉ lượng (Payment Vocab)',
        phaseNameEn: 'Transaction Steps & Quantifiers',
        teacherActivity: 'Giới thiệu luồng dữ liệu giao dịch: Cart -> Checkout -> Gateway -> Bank verification -> Confirmation.',
        studentActivity: 'Luyện đọc phát âm chuẩn và thực hành phân biệt a few (đếm được) và a little (không đếm được).',
        digitalTools: ['Native Speech AI', 'Transaction Diagram'],
        digCompCompetence: '4.1 Bảo mật giao dịch trực tuyến'
      },
      {
        timeMinutes: '18 - 25 (7 phút)',
        phaseId: 'checking_vocab',
        phaseNameVi: 'III. Minigame nối thuật ngữ E-commerce (Matching Game)',
        phaseNameEn: 'Matching Game Challenge',
        teacherActivity: 'Bật minigame ghép nối mô hình và thuật ngữ bảo mật thanh toán.',
        studentActivity: 'Ghép cặp nhanh trên màn hình cảm ứng hoặc thiết bị cá nhân.',
        digitalTools: ['Matching Game Engine', 'Live Score Tracker'],
        digCompCompetence: '2.1 Tương tác số'
      },
      {
        timeMinutes: '25 - 35 (10 phút)',
        phaseId: 'drilling',
        phaseNameVi: 'IV. Luyện tập ngữ pháp & Quy trình mua sắm (Transaction Drilling)',
        phaseNameEn: 'Quantifier & Will Drilling',
        teacherActivity: 'Hướng dẫn hoàn thành bài tập điền từ khuyết và sắp xếp câu quy trình giao dịch.',
        studentActivity: 'Thực hành điền từ và sắp xếp lại các bước trong chuỗi thanh toán số.',
        digitalTools: ['Gap-fill Interactive Engine', 'Ordering Tool'],
        digCompCompetence: '3.1 Sáng tạo nội dung số'
      },
      {
        timeMinutes: '35 - 45 (10 phút)',
        phaseId: 'roleplay_writing',
        phaseNameVi: 'V. Đóng vai giải thích giao dịch (Transaction Roleplay)',
        phaseNameEn: 'Client Transaction Walkthrough',
        teacherActivity: 'Tổ chức đối thoại giữa chuyên viên kỹ thuật Shayan và Monika.',
        studentActivity: 'Lựa chọn phương án đối thoại giải thích bước thanh toán; soạn mẫu đề xuất E-commerce.',
        digitalTools: ['Roleplay Simulator', 'Proposal Template'],
        digCompCompetence: '2.4 Giao tiếp nghiệp vụ số'
      }
    ]
  }
};
