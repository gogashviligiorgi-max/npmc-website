/**
 * NPMC — Screening Tests (bilingual: ka / en)
 * PHQ-9 (Depression) · GAD-7 (Anxiety) · ASRS-v1.1 (ADHD) · CBI (Burnout)
 */
(function () {
  'use strict';

  const FORMSPREE_ID = 'xjgpadwp';

  /* ── Georgian Test Definitions ─────────────────────────────── */
  const TESTS_KA = {
    phq9: {
      name: 'PHQ-9',
      title: 'PHQ-9 — დეპრესიის სკრინინგი',
      source: 'Patient Health Questionnaire-9 (Kroenke et al., 2001)',
      preamble: 'ბოლო 2 კვირის განმავლობაში, რამდენად ხშირად შეგაწუხათ შემდეგი პრობლემები?',
      options: ['საერთოდ არა', 'რამდენიმე დღე', 'ნახევარ\nდღეებზე მეტი', 'თითქმის\nყოველდღე'],
      values: [0, 1, 2, 3],
      questions: [
        'ანჰედონია: ინტერესის დაკარგვა ან სიამოვნების შეგრძნების მკვეთრი შემცირება იმ აქტივობების მიმართ, რომლებიც ადრე სიხარულს განიჭებდათ.',
        'დათრგუნული განწყობა: მოწყენილობის, სასოწარკვეთილების ან უიმედობის მუდმივი განცდა.',
        'ძილის დარღვევა: ჩაძინების სირთულე, ღამით ხშირი გამოღვიძება ან, პირიქით — ჭარბძილიანობა.',
        'ენერგიის ნაკლებობა: მუდმივი დაღლილობის შეგრძნება და გამოფიტვა, მაშინაც კი, როცა ფიზიკურად არ იტვირთებით.',
        'მადის ცვლილება: მადის მკვეთრი დაქვეითება ან კვებისადმი გადაჭარბებული, უკონტროლო ლტოლვა.',
        'თვითშეფასების დაქვეითება: საკუთარი თავის მიმართ ნეგატიური დამოკიდებულება, დანაშაულის გრძნობა ან განცდა, რომ იმედი გაუცრუეთ საკუთარ თავსა თუ ოჯახს.',
        'კოგნიტური სირთულეები: ყურადღების კონცენტრაციის გაძნელება კითხვის, ტელევიზორის ყურების ან მარტივი გადაწყვეტილებების მიღების დროს.',
        'ფსიქომოტორული ცვლილებები: მოძრაობისა და მეტყველების შესამჩნევი შენელება, ან პირიქით — მოუსვენრობა, ნერვიული მოძრაობები და აჟიტირება.',
        'სუიციდური ფიქრები: ფიქრი იმაზე, რომ სიკვდილი სჯობს, ან საკუთარი თავისთვის ზიანის მიყენების სურვილი.',
      ],
      score(total) {
        if (total <= 4)  return { level: 'მინიმალური ან არ ფიქსირდება',      band: 'green',  desc: 'დეპრესიის სიმპტომები პრაქტიკულად არ ფიქსირდება. კარგი ნიშანია — გააგრძელეთ ჯანსაღი ცხოვრების წესი.', cta: 'გირჩევთ პრევენციულ QEEG Brain Check-ს თქვენი ტვინის ფუნქციური პოტენციალის შესაფასებლად.' };
        if (total <= 9)  return { level: 'მსუბუქი დეპრესია',                 band: 'yellow', desc: 'მსუბუქი სიმპტომები გამოვლინდა. მდგომარეობა სამართავია, თუმცა გარკვეული ყურადღება სასარგებლო იქნება.', cta: 'გირჩევთ სპეციალისტთან კონსულტაციას. NPMC-ში QEEG დიაგნოსტიკა მოგაწვდის მკაფიო სურათს.' };
        if (total <= 14) return { level: 'ზომიერი დეპრესია',                 band: 'orange', desc: 'სიმპტომები შესამჩნევია და შეიძლება გავლენა ჰქონდეს ყოველდღიურ ფუნქციონირებაზე.', cta: 'სპეციალისტის კონსულტაცია მნიშვნელოვანია. NPMC გთავაზობთ QEEG + ნეიროფსიქომოდულაციის პროტოკოლს.' };
        if (total <= 19) return { level: 'საშუალო-მძიმე დეპრესია',           band: 'red',    desc: 'სიმპტომები მნიშვნელოვანია. ეს შეფასება კლინიკური გამოკვლევის საჭიროებაზე მიუთითებს.', cta: 'გთხოვთ, რაც შეიძლება სწრაფად მიმართოთ სპეციალისტს. NPMC მზადაა დაგეხმაროთ.' };
        return             { level: 'მძიმე დეპრესია',                        band: 'red',    desc: 'სიმპტომები სერიოზულია. გთხოვთ, სასწრაფოდ მიმართოთ სპეციალისტს.', cta: 'გთხოვთ, დაგვიკავშირდეთ დღესვე. NPMC ხელმისაწვდომია სასწრაფო კონსულტაციისთვის.' };
      },
    },

    gad7: {
      name: 'GAD-7',
      title: 'GAD-7 — შფოთვის სკრინინგი',
      source: 'Generalized Anxiety Disorder-7 (Spitzer et al., 2006)',
      preamble: 'ბოლო 2 კვირის განმავლობაში, რამდენად ხშირად შეგაწუხათ შემდეგი პრობლემები?',
      options: ['საერთოდ არა', 'რამდენიმე დღე', 'ნახევარ\nდღეებზე მეტი', 'თითქმის\nყოველდღე'],
      values: [0, 1, 2, 3],
      questions: [
        'მუდმივი დაძაბულობა: ნერვიულობის, შფოთვის ან მუდმივი "ზღვარზე ყოფნის" შეგრძნება.',
        'კონტროლის სირთულე: ფიქრებისა და ნერვიულობის შეჩერების ან მათი გაკონტროლების შეუძლებლობა.',
        'ჭარბი შფოთვა: გადაჭარბებული ნერვიულობა სხვადასხვა საკითხზე (მაშინაც კი, როცა ამის რეალური მიზეზი არ არსებობს).',
        'რელაქსაციის სირთულე: დასვენებისა და მოდუნების (რელაქსაციის) გამოხატული სიძნელე.',
        'ფსიქომოტორული მოუსვენრობა: ისეთი შინაგანი მოუსვენრობა, რომ გიჭირთ ერთ ადგილზე გაჩერება ან მშვიდად ჯდომა.',
        'მომატებული გაღიზიანებადობა: ადვილად გაბრაზება, გაღიზიანება ან მოთმინების დაკარგვა.',
        'მოსალოდნელი საფრთხის განცდა: შიშის გრძნობა, თითქოს რაღაც საშინელება უნდა მოხდეს.',
      ],
      score(total) {
        if (total <= 4)  return { level: 'მინიმალური შფოთვა',  band: 'green',  desc: 'შფოთვის სიმპტომები მინიმალურია. კარგი შეფასებაა.', cta: 'გირჩევთ Brain Check-ს პრევენციული მიზნებისთვის.' };
        if (total <= 9)  return { level: 'მსუბუქი შფოთვა',     band: 'yellow', desc: 'მსუბუქი შფოთვის სიმპტომები გამოვლინდა. შეიძლება გარკვეული გავლენა ჰქონდეს ყოველდღიურ ცხოვრებაზე.', cta: 'გირჩევთ კონსულტაციას. NPMC-ში ნეიროფიდბექი შფოთვის წინააღმდეგ ეფექტური ინსტრუმენტია.' };
        if (total <= 14) return { level: 'ზომიერი შფოთვა',     band: 'orange', desc: 'შფოთვის სიმპტომები შესამჩნევია. კლინიკური შეფასება რეკომენდებულია.', cta: 'სპეციალისტის ვიზიტი მნიშვნელოვანია. NPMC გთავაზობთ QEEG + TMS + ნეიროფიდბექის პროტოკოლს.' };
        return             { level: 'მძიმე შფოთვა',            band: 'red',    desc: 'შფოთვის სიმპტომები სერიოზულია. გთხოვთ, მიმართოთ სპეციალისტს.', cta: 'გთხოვთ, დაგვიკავშირდეთ — NPMC მზადაა დაგეხმაროთ.' };
      },
    },

    asrs: {
      name: 'ASRS-v1.1',
      title: 'ASRS-v1.1 — ADHD სკრინინგი',
      source: 'Adult ADHD Self-Report Scale v1.1, Part A (WHO/Kessler et al., 2005)',
      preamble: 'ბოლო 6 თვის განმავლობაში, რამდენად ხშირად...',
      options: ['არასოდეს', 'იშვიათად', 'ზოგჯერ', 'ხშირად', 'ძალიან ხშირად'],
      values: [0, 1, 2, 3, 4],
      thresholds: [2, 2, 2, 3, 3, 3],
      questions: [
        'პროექტების დასრულების სირთულე: გიჭირთ თუ არა დავალების საბოლოო დეტალებზე კონცენტრირება მას შემდეგ, რაც პროექტის ძირითადი და რთული ნაწილი უკვე შესრულებულია?',
        'ორგანიზების სირთულე: რამდენად ხშირად გიჭირთ საქმეების მოწესრიგება და პრიორიტეტების დალაგება ისეთ სიტუაციებში, რომლებიც ორგანიზებულობას მოითხოვს?',
        'გულმავიწყობა: რამდენად ხშირად გავიწყდებათ დაგეგმილი შეხვედრები, ვალდებულებები ან ყოველდღიური საქმეები?',
        'რთული ამოცანების არიდება: როდესაც დავალება დიდ გონებრივ ძალისხმევას მოითხოვს, რამდენად ხშირად არიდებთ მას თავს ან დებთ "სამერმისოდ" (პროკრასტინაცია)?',
        'მოუსვენრობა: რამდენად ხშირად ამოძრავებთ (წრიალებთ) ხელებს ან ფეხებს, როდესაც დიდი ხნის განმავლობაში ერთ ადგილზე ჯდომა გიწევთ?',
        'ჰიპერაქტივობა ("შინაგანი ძრავა"): რამდენად ხშირად გრძნობთ ჭარბ აქტივობას და შინაგან იმპულსს მოძრაობისკენ, თითქოს შიგნიდან რაღაც "მექანიზმი" (ძრავა) გამოძრავებთ და ვერ ჩერდებით?',
      ],
      score(_total, raw) {
        const thresholds = [2, 2, 2, 3, 3, 3];
        const positives = raw.filter((v, i) => v >= thresholds[i]).length;
        if (positives >= 4) {
          return { level: 'ADHD სიმპტომებთან თავსებადია', band: 'orange', desc: `${positives} კითხვიდან 6-ზე დადებითი პასუხი. ეს შედეგი მაღალ თავსებადობაზე მიუთითებს ზრდასრულთა ADHD-თან.`, cta: 'QEEG დიაგნოსტიკა + ნეიროფიდბექი ADHD-ის ერთ-ერთი ყველაზე კვლევით დასაბუთებული მეთოდია. NPMC მოამზადებს ინდივიდუალურ გეგმას.' };
        }
        return { level: 'ADHD სიმპტომები ნაკლებად გამოხატულია', band: 'green', desc: `${positives} კითხვიდან 6-ზე დადებითი პასუხი. სიმპტომები ADHD-სთვის დამახასიათებელ ზღვარს არ აღწევს.`, cta: 'თუ მაინც გაქვთ კითხვები ყურადღებასა და კონცენტრაციაზე, NPMC-ის Brain Check-ი გიპოვებს პასუხებს.' };
      },
    },

    cbi: {
      name: 'CBI',
      title: 'CBI — გადაწვის სკრინინგი',
      source: 'Copenhagen Burnout Inventory — Personal & Work Burnout (Kristensen et al., 2005)',
      preamble: 'ბოლო 4 კვირის განმავლობაში, რამდენად ხშირად გამოცდილებიხართ შემდეგი?',
      options: ['ყოველთვის', 'ხშირად', 'ზოგჯერ', 'იშვიათად', 'არასოდეს'],
      values: [4, 3, 2, 1, 0],
      questions: [
        'ქრონიკული ფიზიკური დაღლილობა: მუდმივი დაქანცულობის განცდა, რომელიც ხშირად ძილის შემდეგაც არ გადის.',
        'ემოციური ექსჰაუსცია (გამოფიტვა): გრძნობა, რომ აღარ გაქვთ ემოციური რესურსი სხვებთან კომუნიკაციისთვის ან საქმისთვის.',
        'სომატური დისკომფორტი: სისუსტის, სიმძიმის ან "დამძიმებული სხეულის" შეგრძნება ფიზიკური დატვირთვის გარეშეც.',
        'ფუნქციური დაქვეითება: რუტინული, მარტივი ყოველდღიური საქმეების შესრულებაც კი დიდ ძალისხმევას მოითხოვს.',
        'ფსიქოლოგიური რეზისტენტობის კლება: ფიქრები: „ვეღარ გავუძლებ", „ვეღარ ვუმკლავდები" ან „ამას ვეღარ შევძლებ".',
        'პროფესიული გადაწვა: სამსახურებრივი ვალდებულებები ხდება მხოლოდ სტრესის და დაქანცულობის წყარო.',
        'რელაქსაციის დეფიციტი: სამუშაო დღის შემდეგ "გადართვის" სირთულე; როდესაც დასვენების დროსაც გონებრივად სამსახურში რჩებით.',
        'პროფესიული დისტანცირება: როდესაც სფერო ან საქმე, რომელიც ადრე გაინტერესებდათ, მოსაბეზრებელი და გამომფიტველი ხდება.',
        'მოტივაციის კლება: ადრე არსებული ენთუზიაზმისა და პროფესიული ინტერესის მნიშვნელოვანი შემცირება.',
        'ენერგიის ტოტალური დეფიციტი: განცდა, რომ თქვენი "შინაგანი ბატარეა" სრულად დაიცალა და აღდგენას ვერ ახერხებთ.',
      ],
      score(total) {
        if (total <= 10) return { level: 'გადაწვა არ ფიქსირდება',  band: 'green',  desc: 'გადაწვის სიმპტომები მინიმალურია. ენერგეტიკული ბალანსი კარგ მდგომარეობაშია.', cta: 'გირჩევთ Brain Check-ს თქვენი ტვინის ფუნქციური პოტენციალის შესაფასებლად.' };
        if (total <= 20) return { level: 'მსუბუქი გადაწვა',        band: 'yellow', desc: 'ფიზიკური ან ემოციური დაღლილობის სიმპტომები გამოვლინდა. გარკვეული ყურადღება სასარგებლო იქნება.', cta: 'ნეიროფიდბექი სტრეს-რეგულაციის ეფექტური ინსტრუმენტია. NPMC მოამზადებს ინდივიდუალურ გეგმას.' };
        if (total <= 30) return { level: 'ზომიერი გადაწვა',        band: 'orange', desc: 'გადაწვის სიმპტომები მნიშვნელოვანია. ყოველდღიური ფუნქციონირება შეიძლება დაზარალდეს.', cta: 'კლინიკური შეფასება რეკომენდებულია. NPMC გთავაზობთ QEEG + TMS + ნეიროფიდბექის პროტოკოლს.' };
        return             { level: 'მძიმე გადაწვა',              band: 'red',    desc: 'გადაწვის სიმპტომები სერიოზულია. გთხოვთ, არ გადადოთ სპეციალისტის მონახულება.', cta: 'გთხოვთ, დაგვიკავშირდეთ. NPMC მზადაა დაგეხმაროთ.' };
      },
    },
  };

  /* ── English Test Definitions ──────────────────────────────── */
  const TESTS_EN = {
    phq9: {
      name: 'PHQ-9',
      title: 'PHQ-9 — Depression Screening',
      source: 'Patient Health Questionnaire-9 (Kroenke et al., 2001)',
      preamble: 'Over the last 2 weeks, how often have you been bothered by the following problems?',
      options: ['Not at all', 'Several days', 'More than\nhalf the days', 'Nearly\nevery day'],
      values: [0, 1, 2, 3],
      questions: [
        'Little interest or pleasure in doing things.',
        'Feeling down, depressed, or hopeless.',
        'Trouble falling or staying asleep, or sleeping too much.',
        'Feeling tired or having little energy.',
        'Poor appetite or overeating.',
        'Feeling bad about yourself — or feeling like a failure, or feeling that you have let yourself or your family down.',
        'Trouble concentrating on things, such as reading, watching television, or making decisions.',
        'Moving or speaking so slowly that other people could have noticed — or the opposite: being so fidgety or restless that you have been moving around a lot more than usual.',
        'Thoughts that you would be better off dead, or thoughts of hurting yourself in some way.',
      ],
      score(total) {
        if (total <= 4)  return { level: 'Minimal or none',              band: 'green',  desc: 'Depression symptoms are practically absent. This is a good sign — continue with a healthy lifestyle.', cta: 'We recommend a preventive QEEG Brain Check to assess your brain\'s functional potential.' };
        if (total <= 9)  return { level: 'Mild depression',              band: 'yellow', desc: 'Mild symptoms were detected. The condition is manageable, but some attention would be beneficial.', cta: 'A consultation with a specialist is recommended. At NPMC, QEEG diagnostics will help you get a clear picture.' };
        if (total <= 14) return { level: 'Moderate depression',          band: 'orange', desc: 'Symptoms are noticeable and may be affecting daily functioning.', cta: 'A specialist consultation is important. NPMC offers a QEEG + Neuropsychomodulation protocol.' };
        if (total <= 19) return { level: 'Moderately severe depression', band: 'red',    desc: 'Symptoms are significant. This score indicates the need for clinical evaluation.', cta: 'Please consult a specialist as soon as possible. At NPMC, we are ready to help you.' };
        return             { level: 'Severe depression',                 band: 'red',    desc: 'Symptoms are serious. Please seek specialist help immediately.', cta: 'Please contact us today. NPMC is available for an urgent consultation.' };
      },
    },

    gad7: {
      name: 'GAD-7',
      title: 'GAD-7 — Anxiety Screening',
      source: 'Generalized Anxiety Disorder-7 (Spitzer et al., 2006)',
      preamble: 'Over the last 2 weeks, how often have you been bothered by the following problems?',
      options: ['Not at all', 'Several days', 'More than\nhalf the days', 'Nearly\nevery day'],
      values: [0, 1, 2, 3],
      questions: [
        'Feeling nervous, anxious, or on edge.',
        'Not being able to stop or control worrying.',
        'Worrying too much about different things.',
        'Trouble relaxing.',
        'Being so restless that it is hard to sit still.',
        'Becoming easily annoyed or irritable.',
        'Feeling afraid, as if something awful might happen.',
      ],
      score(total) {
        if (total <= 4)  return { level: 'Minimal anxiety',  band: 'green',  desc: 'Anxiety symptoms are minimal. This is a good score.', cta: 'We recommend a Brain Check for preventive purposes.' };
        if (total <= 9)  return { level: 'Mild anxiety',     band: 'yellow', desc: 'Mild anxiety symptoms were detected. They may have some impact on daily life.', cta: 'We recommend a consultation. At NPMC, neurofeedback is an effective tool against anxiety.' };
        if (total <= 14) return { level: 'Moderate anxiety', band: 'orange', desc: 'Anxiety symptoms are noticeable. Clinical evaluation is recommended.', cta: 'A specialist visit is important. NPMC offers a QEEG + TMS + Neurofeedback protocol.' };
        return             { level: 'Severe anxiety',        band: 'red',    desc: 'Anxiety symptoms are serious. Please consult a specialist.', cta: 'Please contact us — NPMC is ready to help you.' };
      },
    },

    asrs: {
      name: 'ASRS-v1.1',
      title: 'ASRS-v1.1 — ADHD Screening',
      source: 'Adult ADHD Self-Report Scale v1.1, Part A (WHO/Kessler et al., 2005)',
      preamble: 'Over the past 6 months, how often have you...',
      options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'],
      values: [0, 1, 2, 3, 4],
      thresholds: [2, 2, 2, 3, 3, 3],
      questions: [
        'Had trouble wrapping up the final details of a project, once the challenging parts have been done?',
        'Had difficulty getting things in order when you have to do a task that requires organization?',
        'Had problems remembering appointments or obligations?',
        'When a task requires a lot of mental effort, how often do you avoid or delay getting started?',
        'Fidgeted or squirmed with your hands or feet when you had to sit down for a long time?',
        'Felt overly active and compelled to do things, as if you were driven by a motor and couldn\'t stop?',
      ],
      score(_total, raw) {
        const thresholds = [2, 2, 2, 3, 3, 3];
        const positives = raw.filter((v, i) => v >= thresholds[i]).length;
        if (positives >= 4) {
          return { level: 'Consistent with ADHD symptoms', band: 'orange', desc: `${positives} out of 6 questions answered positively. This result indicates high consistency with adult ADHD.`, cta: 'QEEG diagnostics + neurofeedback is one of the most research-supported methods for ADHD. NPMC will prepare an individualized plan for you.' };
        }
        return { level: 'ADHD symptoms less pronounced', band: 'green', desc: `${positives} out of 6 questions answered positively. Symptoms are below the threshold characteristic of ADHD.`, cta: 'If you still have questions about attention and focus, a Brain Check at NPMC will help you find answers.' };
      },
    },

    cbi: {
      name: 'CBI',
      title: 'CBI — Burnout Screening',
      source: 'Copenhagen Burnout Inventory — Personal & Work Burnout (Kristensen et al., 2005)',
      preamble: 'Over the past 4 weeks, how often have you experienced the following?',
      options: ['Always', 'Often', 'Sometimes', 'Rarely', 'Never'],
      values: [4, 3, 2, 1, 0],
      questions: [
        'Do you feel physically fatigued?',
        'Do you feel emotionally exhausted?',
        'Do you feel weak and heavy throughout your body?',
        'Do you find it hard to carry out your daily tasks?',
        'Do you find yourself thinking "I can\'t take it anymore" or "I can\'t cope"?',
        'Does your work or daily obligations leave you feeling drained?',
        'After a working day, do you find it difficult to rest and switch to other activities?',
        'Does your field of work seem increasingly monotonous and exhausting?',
        'Has the enthusiasm you once had diminished?',
        'Do you feel that your energy has been completely depleted?',
      ],
      score(total) {
        if (total <= 10) return { level: 'No burnout detected', band: 'green',  desc: 'Burnout symptoms are minimal. Your energy balance is in good shape.', cta: 'We recommend a Brain Check to assess your brain\'s functional potential.' };
        if (total <= 20) return { level: 'Mild burnout',        band: 'yellow', desc: 'Symptoms of physical or emotional fatigue were detected. Some attention would be beneficial.', cta: 'Neurofeedback is an effective tool for stress regulation. NPMC will prepare an individualized plan for you.' };
        if (total <= 30) return { level: 'Moderate burnout',    band: 'orange', desc: 'Burnout symptoms are significant. Daily functioning may be affected.', cta: 'Clinical evaluation is recommended. NPMC offers a QEEG + TMS + Neurofeedback protocol.' };
        return             { level: 'Severe burnout',           band: 'red',    desc: 'Burnout symptoms are serious. Please do not delay visiting a specialist.', cta: 'Please contact us. NPMC is ready to help you.' };
      },
    },
  };

  /* ── Error messages by language ────────────────────────────── */
  const MSG = {
    ka: {
      fillInfo:  'გთხოვთ, შეავსოთ სახელი, გვარი, ელ-ფოსტა და ტელეფონი.',
      answerAll: 'გთხოვთ, უპასუხოთ ყველა კითხვას.',
      sent:      '✓ შედეგები წარმატებით გაიგზავნა. მოგვმართეთ.',
      sendFail:  'გაგზავნა ვერ მოხერხდა. გთხოვთ, პირდაპირ დაგვიკავშირდეთ.',
    },
    en: {
      fillInfo:  'Please fill in your first name, last name, email, and phone number.',
      answerAll: 'Please answer all questions.',
      sent:      '✓ Results sent successfully. We will contact you.',
      sendFail:  'Sending failed. Please contact us directly.',
    },
  };

  /* ── Helpers ────────────────────────────────────────────────── */
  function getLang() {
    try { return localStorage.getItem('npmc-lang') || 'ka'; } catch (e) { return 'ka'; }
  }

  function getTests() {
    return getLang() === 'en' ? TESTS_EN : TESTS_KA;
  }

  function getMsg() {
    return MSG[getLang()] || MSG.ka;
  }

  /* ── DOM Refs ────────────────────────────────────────────── */
  const section     = document.getElementById('screening');
  if (!section) return;

  const tabsEl      = section.querySelector('.scr-tabs');
  const questionsEl = section.querySelector('#scrQuestions');
  const resultEl    = section.querySelector('#scrResult');
  const submitBtn   = section.querySelector('#scrSubmit');
  const errorMsg    = section.querySelector('#scrErrorMsg');

  let activeTest = 'phq9';

  /* ── Render Questions ───────────────────────────────────── */
  function renderQuestions(testKey) {
    const t = getTests()[testKey];
    const cols = t.options.length;

    const legend = document.createElement('div');
    legend.className = 'scr-options-legend';
    legend.style.setProperty('--cols', cols);
    legend.innerHTML = `<div class="scr-opt-label"></div>` +
      t.options.map(o => `<div class="scr-opt-label">${o.replace('\n', '<br>')}</div>`).join('');

    const rows = t.questions.map((q, qi) => {
      const cells = t.values.map((v, vi) =>
        `<div class="scr-radio-cell" data-label="${t.options[vi].replace('\n', ' ')}">
          <input type="radio" class="scr-radio" name="q${qi}" value="${v}" required aria-label="${t.options[vi].replace('\n', ' ')}">
        </div>`
      ).join('');
      return `<div class="scr-question" style="--cols:${cols}">
        <div class="scr-q-text"><span class="scr-q-num">${qi + 1}.</span>${q}</div>
        ${cells}
      </div>`;
    }).join('');

    const descHtml = `
      <p class="scr-test-desc">${t.source}</p>
      <p class="scr-preamble">${t.preamble}</p>
    `;

    questionsEl.innerHTML = descHtml + legend.outerHTML + rows;
  }

  /* ── Tab Switching ──────────────────────────────────────── */
  tabsEl.addEventListener('click', e => {
    const btn = e.target.closest('.scr-tab');
    if (!btn) return;
    tabsEl.querySelectorAll('.scr-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeTest = btn.dataset.test;
    renderQuestions(activeTest);
    resultEl.hidden = true;
    resultEl.innerHTML = '';
    errorMsg.classList.remove('visible');
  });

  /* ── Re-render on language switch ──────────────────────── */
  document.addEventListener('click', e => {
    const btn = e.target.closest('.lang-btn');
    if (!btn) return;
    // Wait a tick so localStorage is updated by i18n.js first
    setTimeout(() => {
      renderQuestions(activeTest);
      resultEl.hidden = true;
      resultEl.innerHTML = '';
      errorMsg.classList.remove('visible');
    }, 50);
  });

  /* ── Validate Info ──────────────────────────────────────── */
  function getInfo() {
    const fields = {
      name:    section.querySelector('#scrName'),
      surname: section.querySelector('#scrSurname'),
      email:   section.querySelector('#scrEmail'),
      phone:   section.querySelector('#scrPhone'),
    };
    let valid = true;
    Object.values(fields).forEach(f => {
      f.classList.remove('error');
      if (!f.value.trim()) { f.classList.add('error'); valid = false; }
    });
    if (!valid) return null;
    return {
      name:    fields.name.value.trim(),
      surname: fields.surname.value.trim(),
      email:   fields.email.value.trim(),
      phone:   fields.phone.value.trim(),
    };
  }

  /* ── Get Answers ────────────────────────────────────────── */
  function getAnswers(testKey) {
    const t = getTests()[testKey];
    const raw = [];
    let complete = true;
    for (let i = 0; i < t.questions.length; i++) {
      const checked = questionsEl.querySelector(`input[name="q${i}"]:checked`);
      if (!checked) { complete = false; break; }
      raw.push(parseInt(checked.value, 10));
    }
    if (!complete) return null;
    return raw;
  }

  /* ── Show Result ────────────────────────────────────────── */
  function showResult(testKey, raw) {
    const t = getTests()[testKey];
    const total = raw.reduce((s, v) => s + v, 0);
    const res = t.score(total, raw);
    const maxScore = t.values[t.values.length - 1] * t.questions.length;

    resultEl.className = `scr-result scr-result--${res.band}`;
    resultEl.innerHTML = `
      <div class="scr-result__badge">${t.name}</div>
      <div class="scr-result__score">${total} <span>/ ${maxScore}</span></div>
      <div class="scr-result__level">${res.level}</div>
      <div class="scr-result__desc">${res.desc}</div>
      <div class="scr-result__cta">${res.cta}</div>
    `;
    resultEl.hidden = false;
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* ── Submit ─────────────────────────────────────────────── */
  submitBtn.addEventListener('click', async () => {
    errorMsg.classList.remove('visible');
    const msg = getMsg();

    const info = getInfo();
    if (!info) {
      errorMsg.textContent = msg.fillInfo;
      errorMsg.classList.add('visible');
      return;
    }

    const raw = getAnswers(activeTest);
    if (!raw) {
      errorMsg.textContent = msg.answerAll;
      errorMsg.classList.add('visible');
      return;
    }

    showResult(activeTest, raw);

    const t = getTests()[activeTest];
    const total = raw.reduce((s, v) => s + v, 0);
    const res = t.score(total, raw);
    const payload = {
      test:    t.name,
      name:    `${info.name} ${info.surname}`,
      email:   info.email,
      phone:   info.phone,
      score:   total,
      level:   res.level,
      answers: raw.map((v, i) => `${i + 1}. ${t.questions[i]}: ${t.options[v] || v}`).join('\n'),
    };

    if (FORMSPREE_ID === 'YOUR_FORM_ID') return;

    submitBtn.disabled = true;
    try {
      const r = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });
      const notice = document.createElement('p');
      notice.className = 'scr-sent-notice ' + (r.ok ? 'ok' : 'err');
      notice.textContent = r.ok ? msg.sent : msg.sendFail;
      resultEl.appendChild(notice);
    } catch {
      /* silent — result is already shown */
    } finally {
      submitBtn.disabled = false;
    }
  });

  /* ── Init ────────────────────────────────────────────────── */
  renderQuestions(activeTest);

})();
