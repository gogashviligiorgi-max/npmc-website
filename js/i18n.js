/* ============================================================
   NPMC — Language Switcher (Georgian / English)
   ============================================================ */

(function () {
  'use strict';

  /* ── Translations ─────────────────────────────────────────── */
  const T = {

    ka: {
      htmlLang: 'ka',
      title: 'NPMC — ნეიროფსიქომოდულაციის ცენტრი',
      metaDesc: 'NPMC — ნეიროფსიქომოდულაციის ცენტრი თბილისში. QEEG, TMS, ნეიროფიდბექი. ინდივიდუალური, მეცნიერულად დასაბუთებული მკურნალობა.',

      nav: {
        logoSub:    'ნეიროფსიქომოდულაციის ცენტრი',
        services:   'სერვისები',
        methods:    'მეთოდები',
        conditions: 'დიაგნოზები',
        specialists:'სპეციალისტებს',
        screening:  'სკრინინგი',
        pricing:    'ფასები',
        team:       'გუნდი',
        faq:        'FAQ',
        cta:        'დაჯავშნე',
      },

      hero: {
        badge:   'საქართველოში პირველი · QEEG+TMS+ნეიროფიდბექი',
        title:   'თქვენი ტვინი უნიკალურია,<br><span class="hero__title-accent">მკურნალობაც უნდა იყოს ასეთი.</span>',
        subtitle:'თანამედროვე QEEG დიაგნოსტიკა. TMS ნეირომოდულაცია, ინდივიდუალური ნეიროფიდბექი.<br>ტვინის სკანირებაზე დაყრდნობით ფსიქოთერაპია — ნეიროფსიქომოდულაცია',
        btn1:    'დაჯავშნე კონსულტაცია',
        btn2:    'გაიგე მეთოდების შესახებ',
      },

      stats: {
        s1: 'წლიანი გამოცდილება',
        s2: 'ქართულ-ამერიკული პროექტი',
        s3: 'დამტკიცებული TMS',
        s4: 'საქართველოში',
      },

      services: {
        tag:      'სერვისები',
        title:    'კომპლექსური ნეიროდიაგნოსტიკა<br>და მკურნალობა',
        subtitle: 'ყველა სერვისი ინდივიდუალურად — QEEG მონაცემებზე დაყრდნობით',
        qeeg: {
          tag:      'სავალდებულო პირველი ნაბიჯი',
          title:    'QEEG — ტვინის რუკა',
          text:     'რაოდენობრივი ელექტროენცეფალოგრაფია — ტვინის ელექტრული აქტივობის ზუსტი ციფრული ანალიზი. 19 ელექტროდი. ვხედავთ რაც სხვა ვერ ხედავს: ჰიპო- ან ჰიპერაქტივაცია, კოჰერენციის დარღვევები, ასიმეტრია — ტვინის ნებისმიერ წერტილში.',
          f1:       'ობიექტური, ციფრული შეფასება',
          f2:       '19-არხიანი ჩაწერა, სტანდარტული 10-20 სისტემა',
          f3:       'ტვინის ვიზუალური ანგარიში ნორმებთან შედარებით',
          btn:      '900 ₾ — დაჯავშნე',
        },
        tms: {
          title: 'TMS — ტრანსკრანიული მაგნიტური სტიმულაცია',
          text:  'QEEG-ზე დაფუძნებული ზუსტი ნეირომოდულაცია. მაგნიტური იმპულსები ნეირონული ქსელების სტრუქტურულ და ფუნქციურ გაუმჯობესებას ახდენს — ტკივილის, ინვაზიის და ნარკოზის გარეშე.',
          f1:    'FDA-დამტკიცებული (დეპრესია, OCD, ADHD)',
          f2:    'არაინვაზიური, უმტკივნეულო',
          f3:    'QEEG-ზე მორგებული ინდივიდუალური პროტოკოლი',
          more:  'დეტალური ახსნა →',
        },
        nfb: {
          title: 'ნეიროფიდბექი',
          text:  'ტვინი სწავლობს — რეალურ დროში. ოპერანტული კონდიციონირება ნეიროლოგიურ დონეზე. ტვინს ვასწავლით როგორ დაუბრუნდეს მენტალურ და კოგნიტიურ სტაბილურობას.',
          f1:    '50+ წლის კვლევა, მტკიცებულება ADHD-სა და სტრესში',
          f2:    'ყოველ სესიაზე პროგრესის ზომვა',
          f3:    'გრძელვადიანი შედეგი',
          more:  'დეტალური ახსნა →',
        },
        psycho: {
          title: 'QEEG-ზე დაფუძნებული ფსიქოთერაპია',
          text:  'ფსიქოთერაპია, სადაც ტვინის ობიექტური ნეიროპროფილი განსაზღვრავს მიდგომას. CBT, ACT, EMDR — ინდივიდუალური ნეიროლოგიური სურათის მიხედვით.',
          f1:    'ტვინის მონაცემებზე მორგებული',
          f2:    'ტრავმაზე ორიენტირებული',
          f3:    'მოკლე ვადაში ეფექტური',
          more:  'დეტალური ახსნა →',
        },
        pemf: {
          title: 'PEMF თერაპია',
          text:  'პულსირებადი ელექტრომაგნიტური ველი — უჯრედულ დონეზე აღდგენა. ანთების შემცირება, ენერგეტიკული ბალანსი, ძილის ხარისხი.',
          f1:    'არაინვაზიური',
          f2:    'ქრონიკული სტრესი, გამოფიტვა',
          f3:    'ძილის ხარისხის გაუმჯობესება',
        },
        psych: {
          title: 'ფსიქიატრის კონსულტაცია',
          text:  'სრული კლინიკური შეფასება — ბიოლოგიური, ფსიქოლოგიური, სოციალური ფაქტორების გათვალისწინებით. QEEG მონაცემებთან ინტეგრაციით.',
          f1:    'ყოვლისმომცველი შეფასება',
          f2:    'QEEG-ს დამატება',
          f3:    'მედიკამენტური მენეჯმენტი',
        },
      },

      methods: {
        tag:      'მეთოდები',
        title:    'მეცნიერება, რომელსაც<br>ვიყენებთ',
        subtitle: 'დეტალური ახსნა — პაციენტებისთვის და სპეციალისტებისთვის',
        tabQeeg:  'QEEG',
        tabTms:   'TMS',
        tabNfb:   'ნეიროფიდბექი',
        tabPsycho:'QEEG ფსიქოთერაპია',
      },

      process: {
        tag:      'პროცესი',
        title:    '3 ნაბიჯი სიცხადემდე',
        subtitle: 'პირველი ვიზიტიდან — გარკვეული გეგმა. მონაცემებზე დაფუძნებული, არა ვარაუდებზე.',
        s1title:  'QEEG — ტვინის სრული კარტოგრაფია',
        s1text:   '60 წუთის განმავლობაში ვიღებთ თქვენი ტვინის ელექტრულ სურათს 19 ელექტროდიდან. კომფორტულია, ტკივილი არ არის. ნახავთ ვიზუალურ ანგარიშს.',
        s1d1:     '⏱ 60 წუთი',
        s1d2:     '💡 ტკივილი არ არის',
        s1d3:     '📊 ვიზუალური ანგარიში',
        s2title:  'ანალიზი და ინდივიდუალური გეგმა',
        s2text:   'QEEG მონაცემებს ვადარებთ ნორმატიულ მონაცემთა ბაზასთან. ვხედავთ კონკრეტულ ნეიროლოგიურ ნიმუშებს და ვქმნით მხოლოდ თქვენთვის სამკურნალო პროტოკოლს.',
        s2d1:     '🧠 ნორმატიული შედარება',
        s2d2:     '📋 ინდივიდუალური გეგმა',
        s2d3:     '🎯 ზუსტი სამიზნეები',
        s3title:  '10-სესიანი კომბინირებული კურსი',
        s3text:   'ინტენსიური სამკურნალო კურსი — 10 სესია. TMS (30 წთ), ნეიროფიდბექი (40 წთ), ფსიქოთერაპია (30 წთ). პროგრესი ყოველდღიურად.',
        s3d1:     '10 სესია / 5 კვირა',
        s3d2:     'კომბინირებული მეთოდი',
        s3d3:     'პროგრესის ზომვა',
      },

      conditions: {
        tag:      'ვის ვეხმარებით',
        title:    'დიაგნოზები, რომლებში<br>გვაქვს გამოცდილება',
        subtitle: 'დააჭირე ნებისმიერ დაავადებაზე — გაიგე მეტი და ნახე QEEG სურათი',
        adhd:     { h: 'ADHD', p: 'ყურადღების დეფიციტი, ჰიპერაქტივობა, იმპულსურობა — ბავშვებსა და მოზრდილებში', lnk: 'დეტალები →' },
        depr:     { h: 'დეპრესია', p: 'კლინიკური დეპრესია, მათ შორის მკურნალობაზე რეზისტენტული ფორმები', lnk: 'დეტალები →' },
        anx:      { h: 'შფოთვა', p: 'გენერალიზებული შფოთვის აშლილობა, სოციალური შფოთვა, GAD', lnk: 'დეტალები →' },
        panic:    { h: 'პანიკური შეტევები', p: 'გახშირებული პანიკა, ავტონომიური სისტემის დისრეგულაცია', lnk: 'დეტალები →' },
        ocd:      { h: 'OCD', p: 'ობსესიურ-კომპულსიური აშლილობა, განმეორებადი ფიქრები და ქცევები', lnk: 'დეტალები →' },
        sleep:    { h: 'ძილის პრობლემები', p: 'ინსომნია, ძილის ხარისხის დარღვევა, ქრონიკული დაღლილობა', lnk: 'დეტალები →' },
        ptsd:     { h: 'PTSD / ტრავმა', p: 'პოსტტრავმული სტრესის აშლილობა, ტრავმული მოვლენების შედეგები', lnk: 'დეტალები →' },
        phobia:   { h: 'ფობიები', p: 'სპეციფიური და სოციალური ფობიები, შიშის სისტემის ნეიროლოგიური საფუძველი', lnk: 'დეტალები →' },
      },

      specialists: {
        tag:      'სპეციალისტებისთვის',
        title:    'კოლეგებს — მიმართვის<br>სახელმძღვანელო',
        subtitle: 'ფსიქიატრებისთვის, ნევროლოგებისთვის, ფსიქოლოგებისთვის',
        ctaBtn:   'დაგვიკავშირდით',
      },

      why: {
        tag:   'განსხვავება',
        title: 'რატომ NPMC?',
        i1h:   '🔬 მეცნიერული სიზუსტე ვარაუდების ნაცვლად',
        i1p:   'ჩვენთან ყოველი სამკურნალო გადაწყვეტილება ეფუძნება QEEG-ის ობიექტურ მონაცემებს. ჩვენ არ ვიყენებთ შაბლონურ სქემებს და გამოვრიცხავთ „ცდისა და შეცდომის" მეთოდს.',
        i2h:   '🎯 ინდივიდუალური პროტოკოლი — პერსონალიზებული მედიცინა',
        i2p:   'ერთი და იმავე დიაგნოზის მქონე ორ ადამიანს შესაძლოა ტვინის სრულიად განსხვავებული ნეირონული პატერნები ჰქონდეს. ჩვენ ვმკურნალობთ თქვენს კონკრეტულ ტვინს.',
        i3h:   '🏆 უნიკალური ტექნოლოგიური კომბინაცია საქართველოში',
        i3p:   'QEEG + TMS + ნეიროფიდბექის ინტეგრირებული მეთოდოლოგია ქვეყნის მასშტაბით ექსკლუზიურია. ევროპაში მსგავსი კურსი 5,000–15,000 ევრო ღირს.',
        i4h:   '💊 ორიენტირი მიზეზზე და არა სიმპტომზე',
        i4p:   'ტრადიციული ფარმაკოლოგია ხშირად სიმპტომების „დახშობას" ისახავს მიზნად. ჩვენი მიზანია შევცვალოთ ნეიროლოგიური ნიმუშები, რომლებიც სიმპტომების პირველწყაროა.',
      },

      testimonials: {
        tag:      'გამოხმაურებები',
        title:    'პაციენტები NPMC-ის შესახებ',
        subtitle: 'ანონიმური გამოხმაურებები, გაზიარებული ნებართვით',
        tag2:     'პაციენტების შეფასებები',
        title2:   'ისინი, ვინც უკვე<br>გაიარა გზა',
        subtitle2:'15 პაციენტის გამოცდილება — საკუთარი სიტყვებით',
        prev:     '←',
        next:     '→',
      },

      pricing: {
        tag:      'სერვისები და ფასები',
        title:    'ინვესტიცია შენს ტვინში',
        subtitle: 'პირველი ცენტრი საქართველოში, სადაც ნეიროფსიქოლოგია და ტვინის სტიმულაცია ერთ სივრცეშია.',
        diagLabel:'დიაგნოსტიკა — ნაბიჯი 01',
        treatLabel:'ნეიროფსიქომოდულაცია — TMS · ნეიროფიდბექი · ფსიქოთერაპია',
        specLabel: 'სპეციალური პაკეტები · ნეიროფიდბექი + ნეიროფსიქოთერაპია',
        indvTitle: 'ცალკეული პროცედურები',
        compTitle: 'შედარება ალტერნატივებთან',
        compH1:    'მეთოდი',
        compH2:    'ღირებულება',
        compH3:    'ხანგრძლივობა',
        compH4:    'ეფექტი',
        comp1:     '🏆 NPMC Core 20',
        comp1dur:  '4 კვირა',
        comp1eff:  'მიზეზის მკურნალობა',
        comp2:     'ტრადიციული ფსიქოთერაპია (1 წელი)',
        comp2dur:  '1+ წელი',
        comp2eff:  'სიმპტომური',
        comp3:     'TMS კლინიკა ევროპაში',
        comp3dur:  '4–6 კვირა',
        comp3eff:  'ნაწილობრივი',
        bookBtn:   'დაჯავშნე',
      },

      team: {
        tag:   'გუნდი',
        title: 'სპეციალისტები, ვისაც<br>შეგიძლიათ ენდოთ',
        gg: {
          badge:  'დირექტორი',
          role:   'ნეიროფსიქომოდულაციის დირექტორი',
          text:   'ნეიროფსიქომოდულაციის ცენტრის დირექტორი. სპეციალიზება: QEEG ანალიზი, TMS პროტოკოლი, ნეიროფიდბექი. საქართველოში ამ მეთოდის პიონერი. 10+ წლიანი გამოცდილება.',
          c1:     'QEEG სპეციალისტი',
          c2:     'TMS სერტიფიცირებული',
          c3:     'ნეიროფიდბექი',
          btn:    'დეტალები →',
        },
        am: {
          badge:  'MD · M.S.',
          role:   'ნეიროფსიქოთერაპევტი · Mental Azademy-ს დამფუძნებელი',
          text:   'MD, M.S. — ნეირომეცნიერებაზე დაფუძნებული ინტეგრაციული მენტალური ჯანმრთელობის წამყვანი სპეციალისტი. კლინიკური გამოცდილება ნიუ-იორკსა და თბილისში.',
          c1:     'MD — TSMU',
          c2:     'M.S. — Capella University',
          c3:     'ნეიროფიდბექის დირექტორი (NYC)',
          btn:    'დეტალები →',
        },
      },

      faq: {
        tag:   'კითხვები',
        title: 'ხშირად დასმული კითხვები',
        q1q: 'QEEG ტკივილიანია?',
        q1a: 'არა, სრულიად ტკივილის გარეშე. QEEG ჩაწერისთვის ვიყენებთ სენსორების ქუდს, რომელიც გეხებათ სკალპზე — ისევე, როგორც ყურსასმენი. ელექტრული სიგნალები ტვინიდან ვიღებთ — ვერავითარ სიგნალს ვერ ვუგზავნით.',
        q2q: 'რამდენ ხანს გრძელდება მთელი კურსი?',
        q2a: 'სრული კურსი 5 კვირაა — კვირაში 2 სესია. QEEG დიაგნოსტიკა — ცალკე ვიზიტი, 1–2 კვირის შემდეგ კი სამკურნალო კურსი იწყება. ყოველი სამკურნალო სესია 90–120 წუთს გრძელდება.',
        q3q: 'TMS-ს გვერდითი ეფექტები აქვს?',
        q3a: 'TMS FDA-ს მიერ დამტკიცებული, მეტად უსაფრთხო პროცედურაა. ზოგიერთ პაციენტს სკალპზე ადგილობრივი შეგრძნება ან მსუბუქი ტკივილი შეიძლება ჰქონდეს — ეს ნორმალურია და გადის. სერიოზული გვერდითი ეფექტები ძალზე იშვიათია.',
        q4q: 'შედეგი გარანტირებულია?',
        q4a: 'ყოველი ორგანიზმი განსხვავებულია — ამიტომ შედეგი ინდივიდუალურია. ჩვენი პაციენტების დიდი უმრავლესობა ასახელებს მნიშვნელოვან გაუმჯობესებას. ამ მეთოდების ეფექტურობა მეცნიერულად დასაბუთებულია. პროგრესს ყოველ სესიაზე ვზომავთ.',
        q5q: 'ვისთვის არ არის ეს მეთოდი?',
        q5a: 'TMS უკუნაჩვენებია: ეპილეფსიის ისტორიის, ტვინში ფერომაგნიტური ობიექტის, კარდიოსტიმულატორის შემთხვევაში. QEEG პირველი ვიზიტის დროს გავარკვევთ ყველა ინდივიდუალურ ფაქტორს.',
        q6q: 'სხვა მკურნალობასთან ერთად შეიძლება?',
        q6a: 'კი, ჩვეულებრივ. ჩვენი მეთოდები ავსებს სხვა მიდგომებს, მათ შორის მედიკამენტურ მკურნალობას. პირველ კონსულტაციაზე გაგვიზიარეთ ინფო ამჟამინდელ მკურნალობაზე.',
        q7q: 'ADHD-ის მქონე ბავშვებს ეხმარებით?',
        q7a: 'კი. ნეიროფიდბექი და QEEG დიაგნოსტიკა ბავშვებისთვის განსაკუთრებით ეფექტურია — 6 წლიდან. TMS — მხოლოდ 18+ წლიდან.',
        q8q: 'რამდენი სესიის შემდეგ ვიგრძნობ შედეგს?',
        q8a: 'ბევრი პაციენტი 3–5 სესიის შემდეგ ასახელებს პირველ ცვლილებებს. სრული შედეგი — კურსის დასრულებიდან 2–4 კვირაში იკვეთება.',
      },

      screening: {
        tag:      'სკრინინგი',
        title:    'ფსიქიკური ჯანმრთელობის<br>სკრინინგი',
        subtitle: 'საერთაშორისო აპრობირებული კითხვარები. შეავსეთ ტესტი — მიიღეთ დასკვნა.',
        tabPhq:   'PHQ-9 — დეპრესია',
        tabGad:   'GAD-7 — შფოთვა',
        tabAsrs:  'ASRS — ADHD',
        tabCbi:   'CBI — გადაწვა',
        infoLabel:'თქვენი მონაცემები',
        nameP:    'სახელი',
        surnameP: 'გვარი',
        emailP:   'ელ-ფოსტა',
        phoneP:   'ტელეფონი',
        submitBtn:'შედეგის ნახვა →',
      },

      cta: {
        title:    'მზად ხართ პირველი ნაბიჯისთვის?',
        text:     'დაჯავშნეთ QEEG კონსულტაცია — 60 წუთში გექნებათ თქვენი ტვინის სრული სურათი',
        btn1:     '📞 +995 511 44 00 99',
        btn2:     'WhatsApp-ზე დაწერე',
      },

      contact: {
        tag:       'კონტაქტი',
        title:     'დაგვიკავშირდით',
        subtitle:  'ვართ თბილისში. ვპასუხობთ სწრაფად.',
        addr:      'მისამართი',
        addrVal:   'ნიკოლოზ ყიფშიძის 7ბ, თბილისი',
        phone:     'ტელეფონი',
        email:     'ელ-ფოსტა',
        hours:     'სამუშაო საათები',
        hoursVal:  'ორშ–შაბ: 10:00–19:00',
        formTitle: 'მოგვწერეთ ან დაჯავშნეთ',
        nameL:     'სახელი',
        nameP:     'თქვენი სახელი',
        phoneL:    'ტელეფონი',
        phoneP:    '+995 5XX XX XX XX',
        serviceL:  'სერვისი',
        serviceO0: 'აირჩიეთ სერვისი',
        serviceO1: 'QEEG დიაგნოსტიკა — 900 ₾',
        serviceO2: 'სრული კურსი (10 სესია) — 3,500 ₾',
        serviceO3: 'TMS 1 პროცედურა — 250 ₾',
        serviceO4: 'TMS + ფსიქოთერაპია — 400 ₾',
        serviceO5: 'ნეიროფიდბექი — 150 ₾',
        serviceO6: 'კონსულტაცია (კითხვები)',
        serviceO7: 'სპეციალისტი ვარ — მიმართვა',
        msgL:      'შეტყობინება (სურვილისამებრ)',
        msgP:      'გაგვიზიარეთ, რაში გჭირდებათ დახმარება...',
        submitBtn: 'გაგზავნა',
        formNote:  'ვუპასუხებთ 24 საათის განმავლობაში',
        successH:  'გამოგზავნილია ✓',
        successP:  'გამოგვიგზავნეთ შეტყობინება. ვუპასუხებთ 24 საათის განმავლობაში.',
      },

      footer: {
        logoSub: 'ნეიროფსიქომოდულაციის ცენტრი',
        addrLine:'ნ. ყიფშიძის 7ბ, თბილისი',
        servH:   'სერვისები',
        srv3:    'ნეიროფიდბექი',
        infoH:   'ინფო',
        inf1:    'მეთოდები',
        inf2:    'დიაგნოზები',
        inf3:    'სპეციალისტებს',
        contactH:'კონტაქტი',
        copy:    '© 2025 NPMC — ნეიროფსიქომოდულაციის ცენტრი. ყველა უფლება დაცულია.',
        copy2:   'ყველა სამედიცინო პროცედურა ლიცენზირებული სპეციალისტების მიერ',
      },
    },

    /* ═══════════════════════════════════════════════════════════
       ENGLISH TRANSLATIONS
    ═══════════════════════════════════════════════════════════ */
    en: {
      htmlLang: 'en',
      title: 'NPMC — Neuropsychomodulation Centre',
      metaDesc: 'NPMC — Neuropsychomodulation Centre in Tbilisi, Georgia. QEEG, TMS, Neurofeedback. Individual, evidence-based treatment.',

      nav: {
        logoSub:    'Neuropsychomodulation Centre',
        services:   'Services',
        methods:    'Methods',
        conditions: 'Conditions',
        specialists:'For Specialists',
        screening:  'Screening',
        pricing:    'Pricing',
        team:       'Team',
        faq:        'FAQ',
        cta:        'Book Now',
      },

      hero: {
        badge:   'First in Georgia · QEEG+TMS+Neurofeedback',
        title:   'Your brain is unique,<br><span class="hero__title-accent">your treatment should be too.</span>',
        subtitle:'Advanced QEEG diagnostics. TMS neuromodulation, personalised neurofeedback.<br>Brain-mapping-based psychotherapy — Neuropsychomodulation',
        btn1:    'Book a Consultation',
        btn2:    'Learn About Methods',
      },

      stats: {
        s1: 'Years of Experience',
        s2: 'Georgian-American Project',
        s3: 'FDA-Approved TMS',
        s4: 'In Georgia',
      },

      services: {
        tag:      'Services',
        title:    'Comprehensive Neurodiagnostics<br>& Treatment',
        subtitle: 'Every service is personalised — based on individual QEEG data',
        qeeg: {
          tag:   'Mandatory First Step',
          title: 'QEEG — Brain Map',
          text:  'Quantitative electroencephalography — precise digital analysis of the brain\'s electrical activity. 19 electrodes. We see what others cannot: hypo- or hyperactivation, coherence disruptions, asymmetry — at any point in the brain.',
          f1:    'Objective, digital assessment',
          f2:    '19-channel recording, standard 10-20 system',
          f3:    'Visual brain report with normative comparison',
          btn:   '900 ₾ — Book',
        },
        tms: {
          title: 'TMS — Transcranial Magnetic Stimulation',
          text:  'Precision neuromodulation based on QEEG data. Magnetic pulses structurally and functionally improve neural networks — without pain, invasion or anaesthesia.',
          f1:    'FDA-approved (Depression, OCD, ADHD)',
          f2:    'Non-invasive, painless',
          f3:    'Individualised protocol based on QEEG',
          more:  'Detailed explanation →',
        },
        nfb: {
          title: 'Neurofeedback',
          text:  'The brain learns — in real time. Operant conditioning at the neurological level. We train the brain to return to mental and cognitive stability.',
          f1:    '50+ years of research, evidence in ADHD and stress',
          f2:    'Progress measured at every session',
          f3:    'Long-lasting results',
          more:  'Detailed explanation →',
        },
        psycho: {
          title: 'QEEG-Based Psychotherapy',
          text:  'Psychotherapy where the objective neuro-profile of the brain determines the approach. CBT, ACT, EMDR — tailored to individual neurological data.',
          f1:    'Tailored to brain data',
          f2:    'Trauma-focused',
          f3:    'Effective in a short timeframe',
          more:  'Detailed explanation →',
        },
        pemf: {
          title: 'PEMF Therapy',
          text:  'Pulsed electromagnetic field — cellular-level restoration. Reducing inflammation, restoring energy balance, improving sleep quality.',
          f1:    'Non-invasive',
          f2:    'Chronic stress, burnout',
          f3:    'Improved sleep quality',
        },
        psych: {
          title: 'Psychiatry Consultation',
          text:  'Comprehensive clinical assessment — considering biological, psychological and social factors. Integrated with QEEG data.',
          f1:    'All-encompassing assessment',
          f2:    'QEEG integration',
          f3:    'Medication management',
        },
      },

      methods: {
        tag:      'Methods',
        title:    'The science<br>we use',
        subtitle: 'Detailed explanation — for patients and specialists',
        tabQeeg:  'QEEG',
        tabTms:   'TMS',
        tabNfb:   'Neurofeedback',
        tabPsycho:'QEEG Psychotherapy',
      },

      process: {
        tag:      'Process',
        title:    '3 Steps to Clarity',
        subtitle: 'From the first visit — a clear plan. Data-driven, not guesswork.',
        s1title:  'QEEG — Complete Brain Mapping',
        s1text:   'In 60 minutes we capture the electrical picture of your brain from 19 electrodes. Comfortable, no pain. You receive a visual report.',
        s1d1:     '⏱ 60 minutes',
        s1d2:     '💡 Painless',
        s1d3:     '📊 Visual report',
        s2title:  'Analysis & Individual Plan',
        s2text:   'QEEG data is compared to a normative database. We identify specific neurological patterns and create a treatment protocol designed for you alone.',
        s2d1:     '🧠 Normative comparison',
        s2d2:     '📋 Individual plan',
        s2d3:     '🎯 Precise targets',
        s3title:  '10-Session Combined Course',
        s3text:   'Intensive treatment course — 10 sessions. TMS (30 min), Neurofeedback (40 min), Psychotherapy (30 min). Progress tracked daily.',
        s3d1:     '10 sessions / 5 weeks',
        s3d2:     'Combined method',
        s3d3:     'Progress tracking',
      },

      conditions: {
        tag:      'Who We Help',
        title:    'Conditions where<br>we have experience',
        subtitle: 'Click any condition to learn more and see a QEEG example',
        adhd:     { h: 'ADHD', p: 'Attention deficit, hyperactivity, impulsivity — in children and adults', lnk: 'Details →' },
        depr:     { h: 'Depression', p: 'Clinical depression, including treatment-resistant forms', lnk: 'Details →' },
        anx:      { h: 'Anxiety', p: 'Generalised anxiety disorder, social anxiety, GAD', lnk: 'Details →' },
        panic:    { h: 'Panic Attacks', p: 'Frequent panic, autonomic nervous system dysregulation', lnk: 'Details →' },
        ocd:      { h: 'OCD', p: 'Obsessive-compulsive disorder, recurring thoughts and behaviours', lnk: 'Details →' },
        sleep:    { h: 'Sleep Problems', p: 'Insomnia, disrupted sleep quality, chronic fatigue', lnk: 'Details →' },
        ptsd:     { h: 'PTSD / Trauma', p: 'Post-traumatic stress disorder, consequences of traumatic events', lnk: 'Details →' },
        phobia:   { h: 'Phobias', p: 'Specific and social phobias, neurological basis of the fear system', lnk: 'Details →' },
      },

      specialists: {
        tag:      'For Specialists',
        title:    'Colleagues — referral<br>guide',
        subtitle: 'For psychiatrists, neurologists, psychologists',
        ctaBtn:   'Contact Us',
      },

      why: {
        tag:   'The Difference',
        title: 'Why NPMC?',
        i1h:   '🔬 Scientific precision over guesswork',
        i1p:   'Every treatment decision at NPMC is based on objective QEEG data. We do not use template protocols and eliminate the trial-and-error method.',
        i2h:   '🎯 Individual protocol — personalised medicine',
        i2p:   'Two people with the same diagnosis may have entirely different neuronal patterns. We treat your specific brain, not an abstract diagnosis.',
        i3h:   '🏆 Unique technology combination in Georgia',
        i3p:   'The integrated QEEG + TMS + Neurofeedback methodology is exclusive in Georgia. An equivalent course in Europe costs 5,000–15,000 euros.',
        i4h:   '💊 Addressing the cause, not the symptom',
        i4p:   'Traditional pharmacology often aims to suppress symptoms temporarily. Our goal is to change the neurological patterns that are the root cause of symptoms.',
      },

      testimonials: {
        tag:      'Testimonials',
        title:    'Patients about NPMC',
        subtitle: 'Anonymous testimonials, shared with permission',
        tag2:     'Patient Reviews',
        title2:   'Those who have<br>already made the journey',
        subtitle2:'15 patient experiences — in their own words',
        prev:     '←',
        next:     '→',
      },

      pricing: {
        tag:      'Services & Pricing',
        title:    'Invest in Your Brain',
        subtitle: 'The first centre in Georgia where neuropsychology and brain stimulation are under one roof.',
        diagLabel:'Diagnostics — Step 01',
        treatLabel:'Neuropsychomodulation — TMS · Neurofeedback · Psychotherapy',
        specLabel: 'Special Packages · Neurofeedback + Neuropsychotherapy',
        indvTitle: 'Individual Procedures',
        compTitle: 'Comparison with Alternatives',
        compH1:    'Method',
        compH2:    'Cost',
        compH3:    'Duration',
        compH4:    'Effect',
        comp1:     '🏆 NPMC Core 20',
        comp1dur:  '4 weeks',
        comp1eff:  'Root cause treatment',
        comp2:     'Traditional Psychotherapy (1 year)',
        comp2dur:  '1+ year',
        comp2eff:  'Symptomatic',
        comp3:     'TMS Clinic in Europe',
        comp3dur:  '4–6 weeks',
        comp3eff:  'Partial',
        bookBtn:   'Book',
      },

      team: {
        tag:   'Team',
        title: 'Specialists you<br>can trust',
        gg: {
          badge:  'Director',
          role:   'Director of Neuropsychomodulation',
          text:   'Founder & Director of the Neuropsychomodulation Centre. Specialisation: QEEG analysis, TMS protocol, Neurofeedback. Pioneer of these methods in Georgia. 10+ years of experience.',
          c1:     'QEEG Specialist',
          c2:     'TMS Certified',
          c3:     'Neurofeedback',
          btn:    'Details →',
        },
        am: {
          badge:  'MD · M.S.',
          role:   'Neuropsychotherapist · Founder of Mental Azademy',
          text:   'MD, M.S. — leading specialist in neuroscience-based integrative mental health. Clinical experience in New York and Tbilisi.',
          c1:     'MD — TSMU',
          c2:     'M.S. — Capella University',
          c3:     'Neurofeedback Director (NYC)',
          btn:    'Details →',
        },
      },

      faq: {
        tag:   'Questions',
        title: 'Frequently Asked Questions',
        q1q: 'Is QEEG painful?',
        q1a: 'No, completely painless. For the QEEG recording we use a sensor cap that sits on your scalp — much like headphones. We only read electrical signals from the brain; nothing is sent in.',
        q2q: 'How long does the full course last?',
        q2a: 'The full course is 5 weeks — 2 sessions per week. The QEEG diagnostic is a separate visit; the treatment course begins 1–2 weeks later. Each treatment session lasts 90–120 minutes.',
        q3q: 'Does TMS have side effects?',
        q3a: 'TMS is an FDA-approved, highly safe procedure. Some patients may feel a local scalp sensation or mild discomfort during the session — this is normal and passes. Serious side effects are very rare.',
        q4q: 'Are results guaranteed?',
        q4a: 'Every individual is different, so results vary. The vast majority of our patients report significant improvement. The effectiveness of these methods is scientifically established. We measure progress at every session.',
        q5q: 'Who is this method not suitable for?',
        q5a: 'TMS is contraindicated in cases of: history of epilepsy, ferromagnetic implants in the brain, or a cardiac pacemaker. We clarify all individual factors during the first QEEG visit.',
        q6q: 'Can it be combined with other treatments?',
        q6a: 'Yes, routinely. Our methods complement other approaches, including medication. Please share information about current treatment at the first consultation.',
        q7q: 'Do you help children with ADHD?',
        q7a: 'Yes. Neurofeedback and QEEG diagnostics are particularly effective for children — from age 6. TMS is available only from age 18.',
        q8q: 'After how many sessions will I feel results?',
        q8a: 'Many patients report initial changes after 3–5 sessions. Full results typically emerge 2–4 weeks after completing the course, as neuroplastic changes consolidate.',
      },

      screening: {
        tag:      'Screening',
        title:    'Mental Health<br>Screening',
        subtitle: 'Internationally validated questionnaires. Complete the test — receive your assessment.',
        tabPhq:   'PHQ-9 — Depression',
        tabGad:   'GAD-7 — Anxiety',
        tabAsrs:  'ASRS — ADHD',
        tabCbi:   'CBI — Burnout',
        infoLabel:'Your Details',
        nameP:    'First name',
        surnameP: 'Last name',
        emailP:   'Email',
        phoneP:   'Phone',
        submitBtn:'View Results →',
      },

      cta: {
        title: 'Ready for your first step?',
        text:  'Book a QEEG consultation — in 60 minutes you will have a complete picture of your brain',
        btn1:  '📞 +995 511 44 00 99',
        btn2:  'Write on WhatsApp',
      },

      contact: {
        tag:       'Contact',
        title:     'Get in Touch',
        subtitle:  'We are in Tbilisi. We respond quickly.',
        addr:      'Address',
        addrVal:   'Nikoloz Kipshidze St. 7b, Tbilisi',
        phone:     'Phone',
        email:     'Email',
        hours:     'Working Hours',
        hoursVal:  'Mon–Sat: 10:00–19:00',
        formTitle: 'Write or Book',
        nameL:     'Name',
        nameP:     'Your name',
        phoneL:    'Phone',
        phoneP:    '+995 5XX XX XX XX',
        serviceL:  'Service',
        serviceO0: 'Select a service',
        serviceO1: 'QEEG Diagnostics — 900 ₾',
        serviceO2: 'Full Course (10 sessions) — 3,500 ₾',
        serviceO3: 'TMS Single Procedure — 250 ₾',
        serviceO4: 'TMS + Psychotherapy — 400 ₾',
        serviceO5: 'Neurofeedback — 150 ₾',
        serviceO6: 'Consultation (questions)',
        serviceO7: 'I am a specialist — referral',
        msgL:      'Message (optional)',
        msgP:      'Tell us how we can help...',
        submitBtn: 'Send',
        formNote:  'We respond within 24 hours',
        successH:  'Sent ✓',
        successP:  'Your message has been sent. We will respond within 24 hours.',
      },

      footer: {
        logoSub: 'Neuropsychomodulation Centre',
        addrLine:'N. Kipshidze St. 7b, Tbilisi',
        servH:   'Services',
        srv3:    'Neurofeedback',
        infoH:   'Info',
        inf1:    'Methods',
        inf2:    'Conditions',
        inf3:    'For Specialists',
        contactH:'Contact',
        copy:    '© 2025 NPMC — Neuropsychomodulation Centre. All rights reserved.',
        copy2:   'All medical procedures performed by licensed specialists',
      },
    },
  };

  /* ── DOM helpers ──────────────────────────────────────────── */
  const $  = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  function txt(el, text) { if (el) el.textContent = text; }
  function htm(el, html) { if (el) el.innerHTML   = html; }

  /* ── Main apply function ──────────────────────────────────── */
  function applyLanguage(lang) {
    const t = T[lang];
    if (!t) return;

    /* document */
    document.documentElement.lang = t.htmlLang;
    document.title = t.title;
    const metaEl = $('meta[name="description"]');
    if (metaEl) metaEl.setAttribute('content', t.metaDesc);

    /* ── NAV ── */
    txt($('.nav__logo-sub'), t.nav.logoSub);
    const navLinks = $$('.nav__link');
    const navLabelMap = [
      t.nav.services, t.nav.methods, t.nav.conditions,
      t.nav.specialists, t.nav.screening, t.nav.pricing,
      t.nav.team, t.nav.faq
    ];
    navLinks.forEach((el, i) => { if (navLabelMap[i]) txt(el, navLabelMap[i]); });
    txt($('.nav__cta'), t.nav.cta);

    /* ── HERO ── */
    txt($('.hero__badge'), t.hero.badge);
    htm($('.hero__title'), t.hero.title);
    htm($('.hero__subtitle'), t.hero.subtitle);
    const heroActions = $$('.hero__actions .btn');
    if (heroActions[0]) txt(heroActions[0], t.hero.btn1);
    if (heroActions[1]) txt(heroActions[1], t.hero.btn2);

    /* ── STATS ── */
    const statLabels = $$('.stats__label');
    [t.stats.s1, t.stats.s2, t.stats.s3, t.stats.s4].forEach((v, i) => {
      if (statLabels[i]) txt(statLabels[i], v);
    });

    /* ── SERVICES ── */
    const srvSection = $('.services');
    if (srvSection) {
      txt(srvSection.querySelector('.section-tag'),      t.services.tag);
      htm(srvSection.querySelector('.section-title'),    t.services.title);
      txt(srvSection.querySelector('.section-subtitle'), t.services.subtitle);

      const cards = srvSection.querySelectorAll('.service-card');

      // Card 0 — QEEG (featured)
      if (cards[0]) {
        txt(cards[0].querySelector('.service-card__tag'),   t.services.qeeg.tag);
        txt(cards[0].querySelector('.service-card__title'), t.services.qeeg.title);
        txt(cards[0].querySelector('.service-card__text'),  t.services.qeeg.text);
        const li = cards[0].querySelectorAll('.service-card__features li');
        txt(li[0], t.services.qeeg.f1);
        txt(li[1], t.services.qeeg.f2);
        txt(li[2], t.services.qeeg.f3);
        const btn = cards[0].querySelector('.btn');
        if (btn) txt(btn, t.services.qeeg.btn);
      }

      // Card 1 — TMS
      if (cards[1]) {
        txt(cards[1].querySelector('.service-card__title'), t.services.tms.title);
        txt(cards[1].querySelector('.service-card__text'),  t.services.tms.text);
        const li = cards[1].querySelectorAll('.service-card__features li');
        txt(li[0], t.services.tms.f1);
        txt(li[1], t.services.tms.f2);
        txt(li[2], t.services.tms.f3);
        const more = cards[1].querySelector('.service-card__more');
        if (more) txt(more, t.services.tms.more);
      }

      // Card 2 — Neurofeedback
      if (cards[2]) {
        txt(cards[2].querySelector('.service-card__title'), t.services.nfb.title);
        txt(cards[2].querySelector('.service-card__text'),  t.services.nfb.text);
        const li = cards[2].querySelectorAll('.service-card__features li');
        txt(li[0], t.services.nfb.f1);
        txt(li[1], t.services.nfb.f2);
        txt(li[2], t.services.nfb.f3);
        const more = cards[2].querySelector('.service-card__more');
        if (more) txt(more, t.services.nfb.more);
      }

      // Card 3 — Psychotherapy
      if (cards[3]) {
        txt(cards[3].querySelector('.service-card__title'), t.services.psycho.title);
        txt(cards[3].querySelector('.service-card__text'),  t.services.psycho.text);
        const li = cards[3].querySelectorAll('.service-card__features li');
        txt(li[0], t.services.psycho.f1);
        txt(li[1], t.services.psycho.f2);
        txt(li[2], t.services.psycho.f3);
        const more = cards[3].querySelector('.service-card__more');
        if (more) txt(more, t.services.psycho.more);
      }

      // Card 4 — PEMF
      if (cards[4]) {
        txt(cards[4].querySelector('.service-card__title'), t.services.pemf.title);
        txt(cards[4].querySelector('.service-card__text'),  t.services.pemf.text);
        const li = cards[4].querySelectorAll('.service-card__features li');
        txt(li[0], t.services.pemf.f1);
        txt(li[1], t.services.pemf.f2);
        txt(li[2], t.services.pemf.f3);
      }

      // Card 5 — Psychiatry
      if (cards[5]) {
        txt(cards[5].querySelector('.service-card__title'), t.services.psych.title);
        txt(cards[5].querySelector('.service-card__text'),  t.services.psych.text);
        const li = cards[5].querySelectorAll('.service-card__features li');
        txt(li[0], t.services.psych.f1);
        txt(li[1], t.services.psych.f2);
        txt(li[2], t.services.psych.f3);
      }
    }

    /* ── METHODS ── */
    const mSection = $('.methods');
    if (mSection) {
      txt(mSection.querySelector('.section-tag'),      t.methods.tag);
      htm(mSection.querySelector('.section-title'),    t.methods.title);
      txt(mSection.querySelector('.section-subtitle'), t.methods.subtitle);
      const tabs = mSection.querySelectorAll('.methods__tab');
      const tabLabels = [t.methods.tabQeeg, t.methods.tabTms, t.methods.tabNfb, t.methods.tabPsycho];
      tabs.forEach((tab, i) => { if (tabLabels[i]) txt(tab, tabLabels[i]); });
    }

    /* ── PROCESS ── */
    const procSection = $('.process');
    if (procSection) {
      txt(procSection.querySelector('.section-tag'),      t.process.tag);
      txt(procSection.querySelector('.section-title'),    t.process.title);
      txt(procSection.querySelector('.section-subtitle'), t.process.subtitle);
      const steps = procSection.querySelectorAll('.process__step');
      const stepData = [
        { h: t.process.s1title, p: t.process.s1text, d: [t.process.s1d1, t.process.s1d2, t.process.s1d3] },
        { h: t.process.s2title, p: t.process.s2text, d: [t.process.s2d1, t.process.s2d2, t.process.s2d3] },
        { h: t.process.s3title, p: t.process.s3text, d: [t.process.s3d1, t.process.s3d2, t.process.s3d3] },
      ];
      steps.forEach((step, i) => {
        if (!stepData[i]) return;
        txt(step.querySelector('h3'), stepData[i].h);
        txt(step.querySelector('p'),  stepData[i].p);
        const details = step.querySelectorAll('.process__step-detail span');
        stepData[i].d.forEach((d, di) => { if (details[di]) txt(details[di], d); });
      });
    }

    /* ── CONDITIONS ── */
    const condSection = $('.conditions');
    if (condSection) {
      txt(condSection.querySelector('.section-tag'),      t.conditions.tag);
      htm(condSection.querySelector('.section-title'),    t.conditions.title);
      txt(condSection.querySelector('.section-subtitle'), t.conditions.subtitle);
      const condKeys = ['adhd', 'depr', 'anx', 'panic', 'ocd', 'sleep', 'ptsd', 'phobia'];
      const condCards = condSection.querySelectorAll('.condition-card');
      condCards.forEach((card, i) => {
        const key = condKeys[i];
        if (!key || !t.conditions[key]) return;
        txt(card.querySelector('h3'), t.conditions[key].h);
        txt(card.querySelector('p'),  t.conditions[key].p);
        const lnk = card.querySelector('.condition-card__link');
        if (lnk) txt(lnk, t.conditions[key].lnk);
      });
    }

    /* ── SPECIALISTS ── */
    const specSection = $('.specialists');
    if (specSection) {
      txt(specSection.querySelector('.section-tag'),      t.specialists.tag);
      htm(specSection.querySelector('.section-title'),    t.specialists.title);
      txt(specSection.querySelector('.section-subtitle'), t.specialists.subtitle);
      const ctaBtn = specSection.querySelector('.specialists__cta .btn');
      if (ctaBtn) txt(ctaBtn, t.specialists.ctaBtn);
    }

    /* ── WHY NPMC ── */
    const whySection = $('.why');
    if (whySection) {
      txt(whySection.querySelector('.section-tag'),   t.why.tag);
      txt(whySection.querySelector('.section-title'), t.why.title);
      const items = whySection.querySelectorAll('.why__item');
      const whyData = [
        { h: t.why.i1h, p: t.why.i1p },
        { h: t.why.i2h, p: t.why.i2p },
        { h: t.why.i3h, p: t.why.i3p },
        { h: t.why.i4h, p: t.why.i4p },
      ];
      items.forEach((item, i) => {
        if (!whyData[i]) return;
        txt(item.querySelector('h4'), whyData[i].h);
        txt(item.querySelector('p'),  whyData[i].p);
      });
    }

    /* ── TESTIMONIALS (first static block) ── */
    const testiSections = $$('.testimonials');
    if (testiSections[0]) {
      txt(testiSections[0].querySelector('.section-tag'),      t.testimonials.tag);
      txt(testiSections[0].querySelector('.section-title'),    t.testimonials.title);
      txt(testiSections[0].querySelector('.section-subtitle'), t.testimonials.subtitle);
    }
    if (testiSections[1]) {
      txt(testiSections[1].querySelector('.section-tag'),      t.testimonials.tag2);
      htm(testiSections[1].querySelector('.section-title'),    t.testimonials.title2);
      txt(testiSections[1].querySelector('.section-subtitle'), t.testimonials.subtitle2);
      const prevBtn = testiSections[1].querySelector('.testi-arrow--prev');
      const nextBtn = testiSections[1].querySelector('.testi-arrow--next');
      if (prevBtn) txt(prevBtn, t.testimonials.prev);
      if (nextBtn) txt(nextBtn, t.testimonials.next);
    }

    /* ── PRICING ── */
    const pricSection = $('.pricing');
    if (pricSection) {
      txt(pricSection.querySelector('.section-tag'),      t.pricing.tag);
      txt(pricSection.querySelector('.section-title'),    t.pricing.title);
      txt(pricSection.querySelector('.section-subtitle'), t.pricing.subtitle);

      const labels = pricSection.querySelectorAll('.pricing__section-label');
      txt(labels[0], t.pricing.diagLabel);
      txt(labels[1], t.pricing.treatLabel);
      txt(labels[2], t.pricing.specLabel);

      txt(pricSection.querySelector('.pricing__individual-title'), t.pricing.indvTitle);

      const compH = pricSection.querySelectorAll('.comparison-row--header span');
      [t.pricing.compH1, t.pricing.compH2, t.pricing.compH3, t.pricing.compH4]
        .forEach((v, i) => { if (compH[i]) txt(compH[i], v); });

      const compRows = pricSection.querySelectorAll('.comparison-row:not(.comparison-row--header)');
      if (compRows[0]) {
        const spans = compRows[0].querySelectorAll('span');
        txt(spans[0], t.pricing.comp1);
        txt(spans[2], t.pricing.comp1dur);
        txt(spans[3], t.pricing.comp1eff);
      }
      if (compRows[1]) {
        const spans = compRows[1].querySelectorAll('span');
        txt(spans[0], t.pricing.comp2);
        txt(spans[2], t.pricing.comp2dur);
        txt(spans[3], t.pricing.comp2eff);
      }
      if (compRows[2]) {
        const spans = compRows[2].querySelectorAll('span');
        txt(spans[0], t.pricing.comp3);
        txt(spans[2], t.pricing.comp3dur);
        txt(spans[3], t.pricing.comp3eff);
      }

      pricSection.querySelectorAll('.btn--outline.btn--full').forEach(btn => {
        txt(btn, t.pricing.bookBtn);
      });
    }

    /* ── TEAM ── */
    const teamSection = $('.team');
    if (teamSection) {
      txt(teamSection.querySelector('.section-tag'),   t.team.tag);
      htm(teamSection.querySelector('.section-title'), t.team.title);
      const cards = teamSection.querySelectorAll('.team-card');

      // GG
      if (cards[0]) {
        txt(cards[0].querySelector('.team-card__photo-badge'), t.team.gg.badge);
        txt(cards[0].querySelector('.team-card__role'), t.team.gg.role);
        txt(cards[0].querySelector('p'), t.team.gg.text);
        const certs = cards[0].querySelectorAll('.team-card__certs span');
        txt(certs[0], t.team.gg.c1);
        txt(certs[1], t.team.gg.c2);
        txt(certs[2], t.team.gg.c3);
        const btn = cards[0].querySelector('.team-card__detail-btn');
        if (btn) txt(btn, t.team.gg.btn);
      }

      // AM
      if (cards[1]) {
        txt(cards[1].querySelector('.team-card__photo-badge'), t.team.am.badge);
        txt(cards[1].querySelector('.team-card__role'), t.team.am.role);
        txt(cards[1].querySelector('p'), t.team.am.text);
        const certs = cards[1].querySelectorAll('.team-card__certs span');
        txt(certs[0], t.team.am.c1);
        txt(certs[1], t.team.am.c2);
        txt(certs[2], t.team.am.c3);
        const btn = cards[1].querySelector('.team-card__detail-btn');
        if (btn) txt(btn, t.team.am.btn);
      }
    }

    /* ── FAQ ── */
    const faqSection = $('.faq');
    if (faqSection) {
      txt(faqSection.querySelector('.section-tag'),   t.faq.tag);
      txt(faqSection.querySelector('.section-title'), t.faq.title);
      const items = faqSection.querySelectorAll('.faq__item');
      const faqData = [
        { q: t.faq.q1q, a: t.faq.q1a },
        { q: t.faq.q2q, a: t.faq.q2a },
        { q: t.faq.q3q, a: t.faq.q3a },
        { q: t.faq.q4q, a: t.faq.q4a },
        { q: t.faq.q5q, a: t.faq.q5a },
        { q: t.faq.q6q, a: t.faq.q6a },
        { q: t.faq.q7q, a: t.faq.q7a },
        { q: t.faq.q8q, a: t.faq.q8a },
      ];
      items.forEach((item, i) => {
        if (!faqData[i]) return;
        const btn  = item.querySelector('.faq__question');
        const icon = btn && btn.querySelector('.faq__icon');
        const iconHTML = icon ? icon.outerHTML : '<span class="faq__icon">+</span>';
        if (btn) btn.innerHTML = faqData[i].q + iconHTML;
        const ans = item.querySelector('.faq__answer p');
        if (ans) txt(ans, faqData[i].a);
      });
    }

    /* ── SCREENING ── */
    const scrSection = $('.screening');
    if (scrSection) {
      txt(scrSection.querySelector('.section-tag'),      t.screening.tag);
      htm(scrSection.querySelector('.section-title'),    t.screening.title);
      txt(scrSection.querySelector('.section-subtitle'), t.screening.subtitle);
      const scrTabs = scrSection.querySelectorAll('.scr-tab');
      const scrTabLabels = [t.screening.tabPhq, t.screening.tabGad, t.screening.tabAsrs, t.screening.tabCbi];
      scrTabs.forEach((tab, i) => { if (scrTabLabels[i]) txt(tab, scrTabLabels[i]); });
      txt(scrSection.querySelector('.scr-info-label'), t.screening.infoLabel);
      const scrInputs = scrSection.querySelectorAll('.scr-input');
      if (scrInputs[0]) scrInputs[0].placeholder = t.screening.nameP;
      if (scrInputs[1]) scrInputs[1].placeholder = t.screening.surnameP;
      if (scrInputs[2]) scrInputs[2].placeholder = t.screening.emailP;
      if (scrInputs[3]) scrInputs[3].placeholder = t.screening.phoneP;
      txt($('#scrSubmit'), t.screening.submitBtn);
    }

    /* ── CTA BANNER ── */
    const ctaBanner = $('.cta-banner');
    if (ctaBanner) {
      txt(ctaBanner.querySelector('h2'), t.cta.title);
      txt(ctaBanner.querySelector('p'),  t.cta.text);
      const btns = ctaBanner.querySelectorAll('.btn');
      if (btns[0]) txt(btns[0], t.cta.btn1);
      if (btns[1]) txt(btns[1], t.cta.btn2);
    }

    /* ── CONTACT ── */
    const contactSection = $('.contact');
    if (contactSection) {
      txt(contactSection.querySelector('.section-tag'),      t.contact.tag);
      txt(contactSection.querySelector('.section-title'),    t.contact.title);
      txt(contactSection.querySelector('.section-subtitle'), t.contact.subtitle);

      const items = contactSection.querySelectorAll('.contact__item');
      if (items[0]) { txt(items[0].querySelector('strong'), t.contact.addr);  txt(items[0].querySelector('p'), t.contact.addrVal); }
      if (items[1]) { txt(items[1].querySelector('strong'), t.contact.phone); }
      if (items[2]) { txt(items[2].querySelector('strong'), t.contact.email); }
      if (items[3]) { txt(items[3].querySelector('strong'), t.contact.hours); txt(items[3].querySelector('p'),  t.contact.hoursVal); }

      txt($('#contactForm h3'), t.contact.formTitle);
      const labels = contactSection.querySelectorAll('.form__group label');
      txt(labels[0], t.contact.nameL);
      txt(labels[1], t.contact.phoneL);
      txt(labels[2], t.contact.serviceL);
      txt(labels[3], t.contact.msgL);

      const nameInput = $('#name');
      if (nameInput) nameInput.placeholder = t.contact.nameP;
      const phoneInput = $('#phone');
      if (phoneInput) phoneInput.placeholder = t.contact.phoneP;
      const msgInput = $('#message');
      if (msgInput) msgInput.placeholder = t.contact.msgP;

      const opts = contactSection.querySelectorAll('#service option');
      const optLabels = [
        t.contact.serviceO0, t.contact.serviceO1, t.contact.serviceO2,
        t.contact.serviceO3, t.contact.serviceO4, t.contact.serviceO5,
        t.contact.serviceO6, t.contact.serviceO7,
      ];
      opts.forEach((o, i) => { if (optLabels[i]) txt(o, optLabels[i]); });

      const submitBtn = contactSection.querySelector('.btn--primary.btn--full');
      if (submitBtn) txt(submitBtn, t.contact.submitBtn);
      txt(contactSection.querySelector('.form__note'), t.contact.formNote);

      txt($('#formSuccess h4'), t.contact.successH);
      txt($('#formSuccess p'),  t.contact.successP);
    }

    /* ── FOOTER ── */
    const footer = $('footer');
    if (footer) {
      const footerBrandP = footer.querySelector('.footer__brand p');
      if (footerBrandP) footerBrandP.innerHTML = t.footer.logoSub + '<br>' + t.footer.addrLine + '<br>+995 511 44 00 99';
      const footerCols = footer.querySelectorAll('.footer__links');
      if (footerCols[0]) txt(footerCols[0].querySelector('h4'), t.footer.servH);
      if (footerCols[0]) txt(footerCols[0].querySelectorAll('a')[2], t.footer.srv3);
      if (footerCols[1]) {
        txt(footerCols[1].querySelector('h4'), t.footer.infoH);
        const a = footerCols[1].querySelectorAll('a');
        txt(a[0], t.footer.inf1);
        txt(a[1], t.footer.inf2);
        txt(a[2], t.footer.inf3);
      }
      txt(footer.querySelector('.footer__contact h4'), t.footer.contactH);
      const botP = footer.querySelectorAll('.footer__bottom p');
      txt(botP[0], t.footer.copy);
      txt(botP[1], t.footer.copy2);
    }

    /* ── Update lang switcher button states ── */
    $$('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
    });

    /* ── Store preference ── */
    try { localStorage.setItem('npmc-lang', lang); } catch (e) { /* silent */ }
  }

  /* ── Initialise ─────────────────────────────────────────── */
  function init() {
    /* Inject lang switcher into nav */
    const navContainer = $('.nav__container');
    if (navContainer && !$('.lang-switcher')) {
      const switcher = document.createElement('div');
      switcher.className = 'lang-switcher';
      switcher.setAttribute('aria-label', 'Language / ენა');
      switcher.innerHTML =
        '<button class="lang-btn active" data-lang="ka" aria-pressed="true">ქარ</button>' +
        '<button class="lang-btn" data-lang="en" aria-pressed="false">ENG</button>';
      navContainer.appendChild(switcher);

      switcher.addEventListener('click', (e) => {
        const btn = e.target.closest('.lang-btn');
        if (!btn) return;
        const lang = btn.dataset.lang;
        applyLanguage(lang);
      });
    }

    /* Restore saved preference */
    let saved = 'ka';
    try { saved = localStorage.getItem('npmc-lang') || 'ka'; } catch (e) { /* silent */ }
    if (saved !== 'ka') applyLanguage(saved);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
