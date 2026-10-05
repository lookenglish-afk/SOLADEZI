import { UnitData } from '../../types/index.ts';

export const unit6Data: UnitData = {
  id: 'unit-6',
  unitNumber: 6,
  unitNameEn: 'Network systems',
  unitNameVi: 'Hệ thống Mạng & Thiết bị Mạng',
  pageRange: 'Trang 44 - 51',
  level: 'CEF A1 - A2 (College IT)',
  grammarFocusEn: 'Giving reasons (because), Making suggestions (Why don\'t you..., How about + -ing, What about + -ing)',
  grammarFocusVi: 'Đưa ra lý do với "because" & Đưa ra đề xuất giải pháp với "Why don\'t you...", "How about + V-ing"',
  overviewVi: 'Mạng LAN, WAN, VPN; thiết bị phần cứng mạng (router, switch, hub, repeater, modem, gateway); đơn vị đo tốc độ mạng và cự ly phủ sóng.',
  vocabList: [
    {
      id: 'u6-1',
      word: 'router',
      phonetics: '/ˈruː.tər/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'bộ định tuyến',
      definitionEn: 'connects networks and sends packages of data between them',
      exampleSentence: 'A router connects networks and directs data packets efficiently between nodes.',
      exampleVietnamese: 'Bộ định tuyến kết nối các mạng và chuyển các gói dữ liệu hiệu quả giữa các nút mạng.',
      category: 'Hardware'
    },
    {
      id: 'u6-2',
      word: 'repeater',
      phonetics: '/rɪˈpiː.tər/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'bộ lặp / khuếch đại tín hiệu',
      definitionEn: 'sends the digital signal further on in the network to extend coverage',
      exampleSentence: 'Repeaters forward the wireless signal to access points and increase network range.',
      exampleVietnamese: 'Bộ lặp chuyển tiếp tín hiệu không dây đến các điểm truy cập và tăng tầm phủ sóng mạng.',
      category: 'Hardware'
    },
    {
      id: 'u6-3',
      word: 'gateway',
      phonetics: '/ˈɡeɪt.weɪ/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'cổng kết nối mạng (gateway)',
      definitionEn: 'an entrance to another network that uses different protocols',
      exampleSentence: 'A gateway acts as an entrance connecting our local network to an external system.',
      exampleVietnamese: 'Gateway hoạt động như một cổng vào kết nối mạng nội bộ của chúng ta với hệ thống bên ngoài.',
      category: 'Hardware'
    },
    {
      id: 'u6-4',
      word: 'switch',
      phonetics: '/swɪtʃ/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'bộ chuyển mạch (switch)',
      definitionEn: 'channels incoming data but maintains the dedicated bandwidth speed to each port',
      exampleSentence: 'A switch channels incoming data while maintaining dedicated bandwidth for each device.',
      exampleVietnamese: 'Bộ chuyển mạch điều phối dữ liệu vào nhưng vẫn duy trì tốc độ băng thông riêng cho từng thiết bị.',
      category: 'Hardware'
    },
    {
      id: 'u6-5',
      word: 'hub',
      phonetics: '/hʌb/',
      partOfSpeech: 'noun',
      vietnameseMeaning: 'bộ chia cổng mạng (hub)',
      definitionEn: 'channels incoming data but shares the bandwidth among all devices present',
      exampleSentence: 'A hub distributes signals to all ports, sharing total bandwidth among connected computers.',
      exampleVietnamese: 'Hub phân phối tín hiệu tới mọi cổng, chia sẻ tổng băng thông cho các máy tính kết nối.',
      category: 'Hardware'
    },
    {
      id: 'u6-6',
      word: 'VPN',
      phonetics: '/ˌviː.piːˈen/',
      partOfSpeech: 'acronym',
      vietnameseMeaning: 'mạng riêng ảo (Virtual Private Network)',
      definitionEn: 'a private network that uses a public network like the Internet to connect remote users securely',
      exampleSentence: 'Set up a VPN so you have secure remote access to your company\'s LAN when you travel.',
      exampleVietnamese: 'Hãy thiết lập VPN để bạn có thể truy cập an toàn vào mạng LAN công ty khi đi công tác.',
      category: 'Network Types'
    }
  ],
  matchingPairs: [
    { id: 'm6-1', english: 'modem', vietnamese: 'Điều chế và giải điều chế dữ liệu thành tín hiệu số hoặc tương tự', category: 'Hardware' },
    { id: 'm6-2', english: 'repeater', vietnamese: 'Truyền tiếp tín hiệu số đi xa hơn trong mạng', category: 'Hardware' },
    { id: 'm6-3', english: 'router', vietnamese: 'Kết nối các mạng khác nhau và chuyển tiếp các gói dữ liệu', category: 'Hardware' },
    { id: 'm6-4', english: 'gateway', vietnamese: 'Cổng giao tiếp làm lối vào cho một mạng khác', category: 'Hardware' },
    { id: 'm6-5', english: 'switch', vietnamese: 'Điều phối dữ liệu vào và duy trì nguyên vẹn tốc độ băng thông', category: 'Hardware' },
    { id: 'm6-6', english: 'hub', vietnamese: 'Điều phối dữ liệu nhưng chia sẻ chung băng thông giữa các thiết bị', category: 'Hardware' }
  ],
  gapFillExercises: [
    {
      id: 'gf6-1',
      sentenceWithBlank: 'You should connect office equipment to the LAN _____ you can then share devices.',
      missingWord: 'because',
      options: ['because', 'although', 'but', 'so that to'],
      hintVi: 'Liên từ chỉ lý do / nguyên nhân',
      explanation: 'Trang 45: "We use because to say something was the reason for an action or situation."'
    },
    {
      id: 'gf6-2',
      sentenceWithBlank: 'Why don\'t you _____ the hub to see if that helps? (change)',
      missingWord: 'change',
      options: ['change', 'changing', 'to change', 'changed'],
      hintVi: 'Sau "Why don\'t you" dùng động từ nguyên mẫu không to (bare infinitive)',
      explanation: 'Trang 47: "Why don\'t we/you + infinitive without to: Why don\'t you call the IT help desk?"'
    },
    {
      id: 'gf6-3',
      sentenceWithBlank: 'How about _____ a repeater to improve wireless coverage?',
      missingWord: 'adding',
      options: ['adding', 'add', 'added', 'to add'],
      hintVi: 'Sau "How about" dùng động từ đuôi -ing (V-ing)',
      explanation: 'Trang 47: "How about + -ing: How about reading the instructions first?"'
    }
  ],
  unscrambleChallenges: [
    {
      id: 'us6-1',
      correctSentence: 'Why don\'t you check user recommendations on the Internet?',
      jumbledWords: ['Internet?', 'the', 'check', 'you', 'recommendations', 'Why', "don't", 'user', 'on'],
      translationVi: 'Tại sao bạn không xem các khuyến nghị của người dùng trên Internet?',
      grammarTipVi: 'Cấu trúc gợi ý: Why don\'t you + V-bare...?'
    },
    {
      id: 'us6-2',
      correctSentence: 'Repeaters forward the wireless signal to access points',
      jumbledWords: ['points', 'the', 'Repeaters', 'wireless', 'to', 'forward', 'access', 'signal'],
      translationVi: 'Bộ lặp chuyển tiếp tín hiệu không dây đến các điểm truy cập.',
      grammarTipVi: 'Câu khẳng định miêu tả chức năng thiết bị mạng.'
    }
  ],
  roleplayScenario: {
    id: 'rp-u6',
    title: 'Tư vấn giải pháp mạng cho tiệm hoa của Agatha (Network Architecture)',
    scenarioDescriptionVi: 'Bạn là chuyên viên thiết kế mạng Katharina. Agatha muốn mở rộng kinh doanh trực tuyến và cần kết nối căn hộ với cửa hàng. Hãy tư vấn mạng LAN, WAN và VPN chuẩn xác!',
    studentRole: 'Network Architect (Katharina)',
    colleagueRole: 'Small Business Owner (Agatha)',
    context: 'Pearson Longman Unit 6 p.44 - Network consultation dialogue',
    steps: [
      {
        stepId: 1,
        speakerName: 'Agatha',
        speakerRole: 'Shop Owner',
        speakerAvatar: '💐',
        npcDialogueEn: 'Katharina, we want to offer our products online to increase our market share. What network solution should I set up?',
        npcDialogueVi: 'Katharina, chúng tôi muốn bán sản phẩm online để mở rộng thị trường. Tôi nên lắp đặt giải pháp mạng nào?',
        studentTaskVi: 'Đưa ra đề xuất mạng LAN, WAN và VPN theo trang 44.',
        options: [
          {
            id: 'opt1-a',
            dialogEn: 'I recommend you set up a LAN for your shop and apartment, link to a WAN for online sales, and use a VPN for secure remote access when traveling.',
            dialogVi: 'Tôi khuyên chị nên thiết lập mạng LAN cho cửa hàng và căn hộ, kết nối WAN để bán hàng online, và cài đặt VPN để truy cập an toàn từ xa khi đi công tác.',
            isBest: true,
            score: 10,
            feedbackVi: 'Xuất sắc! Bám sát 100% nội dung email chuyên môn của Katharina ở trang 44.'
          },
          {
            id: 'opt1-b',
            dialogEn: 'Just pull a long wire across the road without any firewall or router.',
            dialogVi: 'Cứ kéo một sợi dây dài qua đường không cần tường lửa hay bộ định tuyến.',
            isBest: false,
            score: 1,
            feedbackVi: 'Thiếu an toàn và không đáp ứng tiêu chuẩn kỹ thuật mạng.'
          }
        ]
      }
    ]
  },
  reviewQuiz10: [
    {
      id: 'q6-1',
      game_type: 'quiz',
      question: 'Which networking device modulates and demodulates data between digital and analog signals?',
      options: ['Modem', 'Repeater', 'Hub', 'Bridge'],
      correct_answer: 'Modem',
      explanation: 'Trang 46: "A modem modulates and demodulates the data into a digital or an analog signal."',
      sourceContext: 'Unit 6 p.46'
    },
    {
      id: 'q6-2',
      game_type: 'quiz',
      question: 'What is the main difference between a switch and a hub?',
      options: ['A switch maintains bandwidth speed per device; a hub shares the bandwidth among all devices', 'A hub is faster than a switch', 'A switch has no ports', 'A hub only connects wireless devices'],
      correct_answer: 'A switch maintains bandwidth speed per device; a hub shares the bandwidth among all devices',
      explanation: 'Trang 46: "switch: channels incoming data but maintains the bandwidth speed; hub: channels incoming data but shares the bandwidth among the devices."',
      sourceContext: 'Unit 6 p.46'
    },
    {
      id: 'q6-3',
      game_type: 'quiz',
      question: 'What does a repeater do in a network system (p.46 & 50)?',
      options: ['Sends the digital signal further on in the network to increase range', 'Deletes incoming emails', 'Formats the hard disk', 'Shuts down the router'],
      correct_answer: 'Sends the digital signal further on in the network to increase range',
      explanation: 'Trang 46 & 50: "A repeater sends the digital signal further on in the network... Repeaters forward the wireless signal to access points or routers and increase the range of a network."',
      sourceContext: 'Unit 6 p.46 & p.50'
    },
    {
      id: 'q6-4',
      game_type: 'quiz',
      question: 'What does VPN stand for?',
      options: ['Virtual Private Network', 'Very Powerful Node', 'Visual Protocol Number', 'Variable Packet Network'],
      correct_answer: 'Virtual Private Network',
      explanation: 'Trang 44: "VPN, or Virtual Private Network: a private network that uses a public network to connect remote sites or users together."',
      sourceContext: 'Unit 6 p.44'
    },
    {
      id: 'q6-5',
      game_type: 'quiz',
      question: 'Complete the suggestion: "_____ buying a new router?"',
      options: ['What about', 'Why don\'t you', 'You should to', 'Let\'s'],
      correct_answer: 'What about',
      explanation: 'Trang 47: "What about + -ing: What about buying a new router?"',
      sourceContext: 'Unit 6 p.47'
    },
    {
      id: 'q6-6',
      game_type: 'quiz',
      question: 'By how much can solid structures like walls and metal frames reduce the range of a WLAN (p.50)?',
      options: ['By 25%', 'By 50%', 'By 90%', 'By 5%'],
      correct_answer: 'By 25%',
      explanation: 'Trang 50: "Some structures, such as walls and metal frames, reduce the range of a WLAN by 25%."',
      sourceContext: 'Unit 6 p.50'
    },
    {
      id: 'q6-7',
      game_type: 'quiz',
      question: 'What are the two key measures of computer network speed described in Unit 6 p.50?',
      options: ['Bandwidth and latency', 'Inches and feet', 'Kilograms and litres', 'RAM and ROM'],
      correct_answer: 'Bandwidth and latency',
      explanation: 'Trang 50: "Bandwidth and latency are the measures of computer network speed, or data transfer rate."',
      sourceContext: 'Unit 6 p.50'
    },
    {
      id: 'q6-8',
      game_type: 'quiz',
      question: 'Complete the sentence: "I\'d recommend a Dell computer _____ it is cheaper."',
      options: ['because', 'although', 'so that', 'unless'],
      correct_answer: 'because',
      explanation: 'Trang 45: "We use because to say something was the reason for an action or situation: I\'d recommend a Dell computer because it is cheaper."',
      sourceContext: 'Unit 6 p.45'
    },
    {
      id: 'q6-9',
      game_type: 'quiz',
      question: 'What is "latency" in network communication?',
      options: ['The delay that the network creates during the transfer of data', 'The price of the modem', 'The color of the Cat 5e cable', 'The height of the router antenna'],
      correct_answer: 'The delay that the network creates during the transfer of data',
      explanation: 'Trang 50: "Latency is the delay that network creates during the transfer data."',
      sourceContext: 'Unit 6 p.50'
    },
    {
      id: 'q6-10',
      game_type: 'quiz',
      question: 'What is the past simple form of "install" and "see"?',
      options: ['installed / saw', 'installed / seen', 'installing / seeing', 'installs / saw'],
      correct_answer: 'installed / saw',
      explanation: 'Trang 49: "install -> installed (regular), see -> saw (irregular)".',
      sourceContext: 'Unit 6 p.49'
    }
  ],
  lessonPlan: {
    unitNumber: 6,
    lessonTitle: 'Unit 6: Network Systems - Architecture, Devices & Technical Suggestions',
    targetAudience: 'Sinh viên CNTT chuyên ngành Mạng máy tính & Viễn thông',
    duration: '45 phút (1 tiết)',
    learningObjectives: {
      language: [
        'Phân biệt và gọi tên chính xác các thiết bị phần cứng mạng (router, switch, hub, repeater, modem, gateway).',
        'Sử dụng các cấu trúc đưa ra gợi ý giải pháp (Why don\'t you..., How about + -ing).',
        'Giải thích nguyên nhân sự cố mạng với liên từ "because".'
      ],
      digitalCompetence: [
        'DigComp 2.2 - Lĩnh vực 4: An toàn mạng và thiết lập kết nối từ xa (VPN).',
        'DigComp 2.2 - Lĩnh vực 5: Giải quyết sự cố kỹ thuật mạng (Network troubleshooting).'
      ]
    },
    phases: [
      {
        timeMinutes: '00 - 08 (8 phút)',
        phaseId: 'warmup',
        phaseNameVi: 'I. Khởi động (Network Topology Warm-up)',
        phaseNameEn: 'Topology Identification',
        teacherActivity: 'Chiếu sơ đồ mạng văn phòng và tiệm hoa của Agatha; đặt câu hỏi kết nối giữa LAN và WAN.',
        studentActivity: 'Xem flashcards và trả lời câu đố trắc nghiệm về vai trò của router và switch.',
        digitalTools: ['Network Topology Diagram', 'Màn hình 16:9'],
        digCompCompetence: '1.1 Khai thác sơ đồ mạng'
      },
      {
        timeMinutes: '08 - 18 (10 phút)',
        phaseId: 'teaching_vocab',
        phaseNameVi: 'II. Dạy thuật ngữ thiết bị mạng (Network Hardware Terms)',
        phaseNameEn: 'Hardware Functionality',
        teacherActivity: 'Giảng giải sự khác biệt kỹ thuật then chốt giữa Switch (giữ băng thông) và Hub (chia sẻ băng thông).',
        studentActivity: 'Lắng nghe phát âm chuẩn bằng Web Audio và ghi nhớ thuật ngữ tiếng Anh - Việt.',
        digitalTools: ['Native Speech AI', 'Interactive Device Comparison Table'],
        digCompCompetence: '5.2 Nhận diện nhu cầu phần cứng mạng'
      },
      {
        timeMinutes: '18 - 25 (7 phút)',
        phaseId: 'checking_vocab',
        phaseNameVi: 'III. Minigame nối thiết bị mạng (Hardware Matching)',
        phaseNameEn: 'Matching Game Challenge',
        teacherActivity: 'Khởi chạy game ghép đôi thiết bị mạng với định nghĩa chức năng.',
        studentActivity: 'Học sinh ghép nhanh router, modem, gateway, repeater với mô tả tương ứng.',
        digitalTools: ['Matching Game Module', 'Classroom Leaderboard'],
        digCompCompetence: '2.1 Tương tác qua công nghệ số'
      },
      {
        timeMinutes: '25 - 35 (10 phút)',
        phaseId: 'drilling',
        phaseNameVi: 'IV. Luyện tập đưa ra đề xuất kỹ thuật (Making Suggestions Drilling)',
        phaseNameEn: 'Suggestion Structures Drilling',
        teacherActivity: 'Điều phối bài tập điền cấu trúc "Why don\'t you change..." và "How about adding...".',
        studentActivity: 'Hoàn thành bài tập điền từ và sắp xếp lại các câu xử lý sự cố mạng.',
        digitalTools: ['Gap-fill Component', 'Sentence Unscrambler'],
        digCompCompetence: '5.1 Giải quyết vấn đề kỹ thuật'
      },
      {
        timeMinutes: '35 - 45 (10 phút)',
        phaseId: 'roleplay_writing',
        phaseNameVi: 'V. Đóng vai tư vấn thiết kế mạng (Agatha\'s Shop Case Study)',
        phaseNameEn: 'Network Architecture Roleplay',
        teacherActivity: 'Chia cặp đóng vai: Kỹ sư Katharina tư vấn giải pháp mạng cho tiệm hoa của Agatha.',
        studentActivity: 'Thực hành đối thoại theo kịch bản tương tác; viết email tóm tắt đề xuất gửi khách hàng.',
        digitalTools: ['Roleplay Simulator', 'Email Draft Tool'],
        digCompCompetence: '2.4 Giao tiếp công sở qua mạng'
      }
    ]
  }
};
