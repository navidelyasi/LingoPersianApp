export const practicesData = {
  lesson_1: [
    {
      id: "l1_1",
      type: "flashcards",
      retry: true,
      title: "کشورها و ملیت‌ها - Countries and Nationalities",
      data: [
        {
          cardid: 101,
          tag: "Iran",
          back: "ایران",
          sound: "/sounds/lesson1/iran.mp3",
        },
        {
          cardid: 102,
          tag: "United States",
          back: "ایالات متحده",
          sound: "/sounds/lesson1/usa.mp3",
        },
        {
          cardid: 103,
          tag: "England",
          back: "انگلستان",
          sound: "/sounds/lesson1/england.mp3",
        },
        {
          cardid: 104,
          tag: "France",
          back: "فرانسه",
          sound: "/sounds/lesson1/france.mp3",
        },
        {
          cardid: 105,
          tag: "Germany",
          back: "آلمان",
          sound: "/sounds/lesson1/germany.mp3",
        },
        {
          cardid: 106,
          tag: "Turkey",
          back: "ترکیه",
          sound: "/sounds/lesson1/turkey.mp3",
        },
        {
          cardid: 107,
          tag: "Spain",
          back: "اسپانیا",
          sound: "/sounds/lesson1/spain.mp3",
        },
        {
          cardid: 108,
          tag: "Japan",
          back: "ژاپن",
          sound: "/sounds/lesson1/japan.mp3",
        },
        {
          cardid: 109,
          tag: "India",
          back: "هند",
          sound: "/sounds/lesson1/india.mp3",
        },
        {
          cardid: 110,
          tag: "Egypt",
          back: "مصر",
          sound: "/sounds/lesson1/egypt.mp3",
        },
      ],
    },
    {
      id: "l1_2",
      type: "sentence-making",
      retry: true,
      title1: "معرفی خود و دیگران - Introducing yourself and others",
      title2: "Make sentences to introduce yourself and others",
      data: [
        {
          id: "l1_2_1",
          text: ["من", "سعید", ".", "هستم", "از ایران"],
          correct: ["من", "سعید", "هستم", ".", "از ایران"],
        },
        {
          id: "l1_2_2",
          text: ["شما", "اهل", "هستید", "?", "کجا"],
          correct: ["شما", "اهل", "کجا", "هستید", "?"],
        },
        {
          id: "l1_2_3",
          text: ["او", "ژاپنی", ".", "دارد", "موهای مشکی", "است"],
          correct: ["او", "ژاپنی", "است", ".", "موهای مشکی", "دارد"],
        },
        {
          id: "l1_2_4",
          text: ["من", "آمریکایی", "نیستم", ".", "انگلیسی", "هستم"],
          correct: ["من", "آمریکایی", "نیستم", ".", "انگلیسی", "هستم"],
        },
      ],
    },
    {
      id: "l1_3",
      type: "fill_input",
      retry: true,
      title: "گفتگوی معرفی و احوال‌پرسی - Introduction dialogue",
      data: [
        {
          text: "سلام. اسم من علی است. @@ شما چیست؟",
          correct: "اسم",
        },
        {
          text: "سلام علی. من مریم @@. از آشنایی با شما خوشوقتم.",
          correct: "هستم",
        },
        {
          text: "شما اهل @@ هستید؟",
          correct: "کجا",
        },
        {
          text: "من ایرانی هستم. شما @@؟",
          correct: "چطور",
        },
        {
          text: "من هم ایرانی هستم، اما در @@ زندگی می‌کنم.",
          correct: "آمریکا",
        },
        {
          text: "حال شما @@ است؟",
          correct: "چطور",
        },
        {
          text: "خیلی @@. ممنون از شما.",
          correct: "خوب",
        },
      ],
    },
    {
      id: "l1_4",
      type: "topic-drag",
      retry: true,
      shortAnswers: true,
      title1: "ملیت‌ها و کشورها را به هم وصل کنید.",
      title2: "Match nationalities with their countries.",
      data: [
        { text: "ایرانی", correct: "ایران" },
        { text: "آمریکایی", correct: "ایالات متحده" },
        { text: "انگلیسی", correct: "انگلستان" },
        { text: "فرانسوی", correct: "فرانسه" },
        { text: "آلمانی", correct: "آلمان" },
        { text: "ژاپنی", correct: "ژاپن" },
        { text: "ترک", correct: "ترکیه" },
        { text: "هندی", correct: "هند" },
        { text: "مصری", correct: "مصر" },
        { text: "اسپانیایی", correct: "اسپانیا" },
      ],
    },
    {
      id: "l1_5",
      type: "multi_choice",
      retry: true,
      title: "انتخاب ضمیر مناسب - Choose the correct pronoun",
      data: [
        {
          chid: 201,
          question: "__ ایرانی هستم.",
          answers: ["من", "تو", "او"],
          correct: 0,
        },
        {
          chid: 202,
          question: "__ فرانسوی هستی؟",
          answers: ["من", "تو", "او"],
          correct: 1,
        },
        {
          chid: 203,
          question: "__ انگلیسی است.",
          answers: ["من", "تو", "او"],
          correct: 2,
        },
        {
          chid: 204,
          question: "__ اهل آلمان هستیم.",
          answers: ["ما", "شما", "آنها"],
          correct: 0,
        },
        {
          chid: 205,
          question: "__ اهل کجا هستید؟",
          answers: ["من", "شما", "او"],
          correct: 1,
        },
        {
          chid: 206,
          question: "__ اهل ترکیه هستند.",
          answers: ["ما", "شما", "آنها"],
          correct: 2,
        },
      ],
    },
    {
      id: "l1_6",
      type: "topic-drag",
      retry: true,
      picture: "/pictures/lesson1/people.png",
      shortAnswers: false,
      title1: "توصیف افراد در تصویر - Describe the people in the picture",
      title2: "Match the descriptions with people in the image",
      data: [
        {
          text: "مرد با موهای سیاه",
          correct: ".او علی است. او ایرانی است و موهای سیاه دارد",
        },
        {
          text: "زن با روسری قرمز",
          correct: ".او مینا است. او از ایران است و روسری قرمز دارد",
        },
        {
          text: "مرد با عینک",
          correct: ".او جان است. او انگلیسی است و عینک دارد",
        },
        {
          text: "زن با موهای بلوند",
          correct: ".او ماری است. او فرانسوی است و موهای بلوند دارد",
        },
      ],
    },
  ],

  lesson_2: [
    {
      id: "l2_1",
      type: "flashcards",
      retry: true,
      title: "شغل‌ها - Jobs and Occupations",
      data: [
        {
          cardid: 201,
          tag: "doctor",
          back: "دکتر",
          sound: "/sounds/lesson2/doctor.mp3",
        },
        {
          cardid: 202,
          tag: "teacher",
          back: "معلم",
          sound: "/sounds/lesson2/teacher.mp3",
        },
        {
          cardid: 203,
          tag: "engineer",
          back: "مهندس",
          sound: "/sounds/lesson2/engineer.mp3",
        },
        {
          cardid: 204,
          tag: "student",
          back: "دانش‌آموز",
          sound: "/sounds/lesson2/student.mp3",
        },
        {
          cardid: 205,
          tag: "nurse",
          back: "پرستار",
          sound: "/sounds/lesson2/nurse.mp3",
        },
        {
          cardid: 206,
          tag: "driver",
          back: "راننده",
          sound: "/sounds/lesson2/driver.mp3",
        },
        {
          cardid: 207,
          tag: "chef",
          back: "آشپز",
          sound: "/sounds/lesson2/chef.mp3",
        },
        {
          cardid: 208,
          tag: "police officer",
          back: "پلیس",
          sound: "/sounds/lesson2/police.mp3",
        },
        {
          cardid: 209,
          tag: "shopkeeper",
          back: "فروشنده",
          sound: "/sounds/lesson2/shopkeeper.mp3",
        },
        {
          cardid: 210,
          tag: "accountant",
          back: "حسابدار",
          sound: "/sounds/lesson2/accountant.mp3",
        },
      ],
    },
    {
      id: "l2_2",
      type: "sentence-making",
      retry: true,
      title1: "معرفی شغل - Introducing your job",
      title2: "Make sentences about jobs",
      data: [
        {
          id: "l2_2_1",
          text: ["من", "دکتر", ".", "هستم", "در بیمارستان", "کار می‌کنم"],
          correct: ["من", "دکتر", "هستم", ".", "در بیمارستان", "کار می‌کنم"],
        },
        {
          id: "l2_2_2",
          text: ["شما", "چه کاره", "هستید", "?"],
          correct: ["شما", "چه کاره", "هستید", "?"],
        },
        {
          id: "l2_2_3",
          text: ["او", "معلم", ".", "است", "در مدرسه", "کار می‌کند"],
          correct: ["او", "معلم", "است", ".", "در مدرسه", "کار می‌کند"],
        },
        {
          id: "l2_2_4",
          text: ["من", "مهندس", ".", "هستم", "در شرکت", "کار می‌کنم"],
          correct: ["من", "مهندس", "هستم", ".", "در شرکت", "کار می‌کنم"],
        },
      ],
    },
    {
      id: "l2_3",
      type: "fill_input",
      retry: true,
      title: "گفتگو درباره شغل - Dialogue about jobs",
      data: [
        {
          text: "سلام. شما چه @@ هستید؟",
          correct: "کاره",
        },
        {
          text: "من @@ هستم. شما چطور؟",
          correct: "مهندس",
        },
        {
          text: "من @@ هستم. در بیمارستان کار می‌کنم.",
          correct: "پرستار",
        },
        {
          text: "چند سال است که @@ می‌کنید؟",
          correct: "کار",
        },
        {
          text: "@@ پنج سال است.",
          correct: "حدود",
        },
        {
          text: "کار شما @@ است؟",
          correct: "چطور",
        },
        {
          text: "@@ خوب است. اما گاهی سخت می‌شود.",
          correct: "خیلی",
        },
      ],
    },
    {
      id: "l2_4",
      type: "multi_choice",
      retry: true,
      title: "اعداد و شمارش - Numbers",
      data: [
        {
          chid: 301,
          question: "۱ به فارسی می‌شود:",
          answers: ["یک", "دو", "سه"],
          correct: 0,
        },
        {
          chid: 302,
          question: "۵ به فارسی می‌شود:",
          answers: ["سه", "چهار", "پنج"],
          correct: 2,
        },
        {
          chid: 303,
          question: "۱۰ به فارسی می‌شود:",
          answers: ["هشت", "نه", "ده"],
          correct: 2,
        },
        {
          chid: 304,
          question: "۱۵ به فارسی می‌شود:",
          answers: ["پانزده", "شانزده", "هفده"],
          correct: 0,
        },
        {
          chid: 305,
          question: "۲۰ به فارسی می‌شود:",
          answers: ["هجده", "نوزده", "بیست"],
          correct: 2,
        },
        {
          chid: 306,
          question: "۱۰۰ به فارسی می‌شود:",
          answers: ["پنجاه", "صد", "هزار"],
          correct: 1,
        },
      ],
    },
    {
      id: "l2_5",
      type: "topic-drag",
      retry: true,
      shortAnswers: true,
      title1: "شغل‌ها و محل کار آنها را به هم وصل کنید.",
      title2: "Match jobs with their workplaces.",
      data: [
        { text: "دکتر", correct: "بیمارستان" },
        { text: "معلم", correct: "مدرسه" },
        { text: "آشپز", correct: "رستوران" },
        { text: "پلیس", correct: "کلانتری" },
        { text: "مهندس", correct: "شرکت" },
        { text: "راننده", correct: "تاکسی" },
        { text: "فروشنده", correct: "مغازه" },
        { text: "پرستار", correct: "بیمارستان" },
        { text: "خلبان", correct: "هواپیما" },
        { text: "کتابدار", correct: "کتابخانه" },
      ],
    },
    {
      id: "l2_6",
      type: "fill_input",
      retry: true,
      title: "شمارش - Counting",
      data: [
        {
          text: "من @@ کتاب دارم.",
          correct: "پنج",
        },
        {
          text: "او @@ سال دارد.",
          correct: "سی",
        },
        {
          text: "ما @@ دانش‌آموز در کلاس داریم.",
          correct: "بیست",
        },
        {
          text: "ساعت @@ است.",
          correct: "هشت",
        },
        {
          text: "من @@ سال است که اینجا کار می‌کنم.",
          correct: "ده",
        },
        {
          text: "او @@ فرزند دارد.",
          correct: "دو",
        },
      ],
    },
  ],

  lesson_3: [
    {
      id: "l3_1",
      type: "flashcards",
      retry: true,
      title: "وسایل خانه و کلاس - Household and classroom items",
      data: [
        {
          cardid: 301,
          tag: "table",
          back: "میز",
          sound: "/sounds/lesson3/table.mp3",
        },
        {
          cardid: 302,
          tag: "chair",
          back: "صندلی",
          sound: "/sounds/lesson3/chair.mp3",
        },
        {
          cardid: 303,
          tag: "book",
          back: "کتاب",
          sound: "/sounds/lesson3/book.mp3",
        },
        {
          cardid: 304,
          tag: "pen",
          back: "خودکار",
          sound: "/sounds/lesson3/pen.mp3",
        },
        {
          cardid: 305,
          tag: "notebook",
          back: "دفتر",
          sound: "/sounds/lesson3/notebook.mp3",
        },
        {
          cardid: 306,
          tag: "door",
          back: "در",
          sound: "/sounds/lesson3/door.mp3",
        },
        {
          cardid: 307,
          tag: "window",
          back: "پنجره",
          sound: "/sounds/lesson3/window.mp3",
        },
        {
          cardid: 308,
          tag: "bed",
          back: "تخت",
          sound: "/sounds/lesson3/bed.mp3",
        },
        {
          cardid: 309,
          tag: "lamp",
          back: "چراغ",
          sound: "/sounds/lesson3/lamp.mp3",
        },
        {
          cardid: 310,
          tag: "telephone",
          back: "تلفن",
          sound: "/sounds/lesson3/telephone.mp3",
        },
      ],
    },
    {
      id: "l3_2",
      type: "sentence-making",
      retry: true,
      title1: "توصیف اشیا - Describing objects",
      title2: "Make sentences describing objects",
      data: [
        {
          id: "l3_2_1",
          text: ["این", "کتاب", ".", "است", "روی میز", "است"],
          correct: ["این", "کتاب", "است", ".", "روی میز", "است"],
        },
        {
          id: "l3_2_2",
          text: ["آن", "صندلی", ".", "است", "کنار پنجره", "است"],
          correct: ["آن", "صندلی", "است", ".", "کنار پنجره", "است"],
        },
        {
          id: "l3_2_3",
          text: ["اینجا", "کلاس", ".", "است", "بزرگ", "است"],
          correct: ["اینجا", "کلاس", "است", ".", "بزرگ", "است"],
        },
        {
          id: "l3_2_4",
          text: ["خودکار", "روی", ".", "است", "میز", "است"],
          correct: ["خودکار", "روی", "میز", "است", "."],
        },
      ],
    },
    {
      id: "l3_3",
      type: "fill_input",
      retry: true,
      title: "گفتگو درباره اشیا در کلاس - Dialogue about classroom objects",
      data: [
        {
          text: "این @@ چیست؟",
          correct: "شیء",
        },
        {
          text: "این یک @@ است.",
          correct: "خودکار",
        },
        {
          text: "آن @@ کجاست؟",
          correct: "کتاب",
        },
        {
          text: "کتاب روی @@ است.",
          correct: "میز",
        },
        {
          text: "آیا این @@ شماست؟",
          correct: "دفتر",
        },
        {
          text: "بله، این دفتر @@ است.",
          correct: "من",
        },
        {
          text: "چراغ کنار @@ است.",
          correct: "پنجره",
        },
      ],
    },
    {
      id: "l3_4",
      type: "multi_choice",
      retry: true,
      title: "کجاست؟ - Where is it?",
      data: [
        {
          chid: 401,
          question: "کتاب __ میز است.",
          answers: ["روی", "زیر", "کنار"],
          correct: 0,
        },
        {
          chid: 402,
          question: "صندلی __ میز است.",
          answers: ["روی", "زیر", "کنار"],
          correct: 2,
        },
        {
          chid: 403,
          question: "گربه __ میز است.",
          answers: ["روی", "زیر", "پشت"],
          correct: 1,
        },
        {
          chid: 404,
          question: "تابلو __ دیوار است.",
          answers: ["روی", "جلوی", "پشت"],
          correct: 0,
        },
        {
          chid: 405,
          question: "چراغ __ سقف است.",
          answers: ["روی", "از", "زیر"],
          correct: 0,
        },
        {
          chid: 406,
          question: "پرده __ پنجره است.",
          answers: ["کنار", "جلوی", "روی"],
          correct: 1,
        },
      ],
    },
    {
      id: "l3_5",
      type: "topic-drag",
      retry: true,
      shortAnswers: true,
      title1: "اشیا را با مکان مناسب آنها در خانه مطابقت دهید.",
      title2: "Match objects with their appropriate location in a house.",
      data: [
        { text: "تخت", correct: "اتاق خواب" },
        { text: "یخچال", correct: "آشپزخانه" },
        { text: "مبل", correct: "اتاق نشیمن" },
        { text: "دوش", correct: "حمام" },
        { text: "تلویزیون", correct: "اتاق نشیمن" },
        { text: "گاز", correct: "آشپزخانه" },
        { text: "میز تحریر", correct: "اتاق مطالعه" },
        { text: "آینه", correct: "حمام" },
        { text: "قفسه کتاب", correct: "اتاق مطالعه" },
        { text: "کمد لباس", correct: "اتاق خواب" },
      ],
    },
    {
      id: "l3_6",
      type: "fill_input",
      retry: true,
      title: "گفتگوی بیشتر - More conversation",
      data: [
        {
          text: "اتاق شما @@ است؟",
          correct: "چطور",
        },
        {
          text: "اتاق من @@ است. یک تخت و یک میز دارد.",
          correct: "کوچک",
        },
        {
          text: "آیا اتاق شما @@ دارد؟",
          correct: "پنجره",
        },
        {
          text: "بله، یک پنجره @@ دارد.",
          correct: "بزرگ",
        },
        {
          text: "کتاب‌های شما @@ هستند؟",
          correct: "کجا",
        },
        {
          text: "کتاب‌های من در @@ هستند.",
          correct: "قفسه",
        },
        {
          text: "این @@ چه رنگی است؟",
          correct: "صندلی",
        },
        {
          text: "این صندلی @@ است.",
          correct: "قهوه‌ای",
        },
      ],
    },
  ],
};
