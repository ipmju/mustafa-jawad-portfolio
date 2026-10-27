/* ============================================================================
   CONTENT MODEL — single source of truth
   ----------------------------------------------------------------------------
   Everything editable lives here: navigation, translations, skills, projects,
   external links and metadata. No copy is hard-coded in the markup or logic.

   >>> WHERE MUSTAFA SHOULD EDIT <<<
   - LINKS: add real email / GitHub / LinkedIn below (left empty on purpose).
   - PROJECTS: add real contribution details, repo URLs, screenshots.
   - SKILLS: list only verified technologies; adjust the `level` labels.
   ============================================================================ */

const LINKS = {
  org:       "https://cdiraq.com",
  orgName:   "Cloud Group",
  // Heritage Atlas live project
  heritage:  "https://mesopotamai.cdiraq.com",

  // --- UNCONFIGURED: fill with real values, then the UI activates them -------
  email:     "",   // e.g. "mustafa@example.com"
  github:    "",   // e.g. "https://github.com/username"
  linkedin:  "",   // e.g. "https://www.linkedin.com/in/username"
  // --------------------------------------------------------------------------
};

/* Navigation — section ids map to anchors in index.html */
const NAV = [
  { id: "home",      en: "Home",      ar: "الرئيسية" },
  { id: "about",     en: "About",     ar: "نبذة" },
  { id: "expertise", en: "Expertise", ar: "الخبرات" },
  { id: "projects",  en: "Projects",  ar: "المشاريع" },
  { id: "approach",  en: "Approach",  ar: "المنهجية" },
  { id: "contact",   en: "Contact",   ar: "تواصل" },
];

/* Expertise — grouped, honest. `tag` qualifies the relationship to each group.
   Edit freely; nothing here implies a proficiency score. */
const EXPERTISE = [
  {
    key: "frontend",
    en: { title: "Frontend Engineering", tag: "Core focus",
          note: "Building responsive, accessible interfaces with a strong eye for detail." },
    ar: { title: "هندسة الواجهات", tag: "مجال أساسي",
          note: "بناء واجهات متجاوبة وسهلة الوصول مع اهتمام دقيق بالتفاصيل." },
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Tailwind CSS"],
  },
  {
    key: "backend",
    en: { title: "Backend Development", tag: "Project experience",
          note: "APIs, data models and server logic that keep products reliable." },
    ar: { title: "تطوير الخوادم", tag: "خبرة مشاريع",
          note: "واجهات برمجية ونماذج بيانات ومنطق خادم يحافظ على موثوقية المنتجات." },
    items: ["Node.js", "REST APIs", "PostgreSQL", "Authentication"],
  },
  {
    key: "uiux",
    en: { title: "UI / UX Implementation", tag: "Core focus",
          note: "Translating design intent into usable, polished experiences." },
    ar: { title: "تنفيذ تجربة الاستخدام", tag: "مجال أساسي",
          note: "تحويل نية التصميم إلى تجارب عملية ومصقولة." },
    items: ["Design systems", "Responsive layout", "Accessibility", "Motion"],
  },
  {
    key: "tools",
    en: { title: "Developer Tools", tag: "Everyday",
          note: "A modern workflow focused on clarity and maintainability." },
    ar: { title: "أدوات التطوير", tag: "يومية",
          note: "سير عمل حديث يركّز على الوضوح وقابلية الصيانة." },
    items: ["Git", "Vite", "npm", "VS Code"],
  },
  {
    key: "threed",
    en: { title: "Interactive 3D Web", tag: "Actively learning",
          note: "Exploring WebGL and real-time graphics for expressive interfaces." },
    ar: { title: "الويب ثلاثي الأبعاد", tag: "قيد التعلّم",
          note: "استكشاف WebGL والرسوميات الآنية لواجهات أكثر تعبيراً." },
    items: ["WebGL", "Three.js", "Shaders"],
  },
];

/* Projects — only verified work. The Heritage Atlas is real and public; the
   personal contribution line is a clearly-labeled editable placeholder. */
const PROJECTS = [
  {
    key: "heritage",
    featured: true,
    status: { en: "Live", ar: "منشور" },
    url: LINKS.heritage,
    repo: "", // add public repo only when verified
    year: "2025",
    en: {
      name: "Iraq Heritage Atlas",
      kicker: "Digital heritage · Cloud Group",
      summary:
        "An interactive platform for Iraq's heritage, archaeology and tourism — bringing historic sites together in one explorable experience.",
      problem:
        "Iraq's cultural and archaeological heritage is scattered across sources that are hard to browse in one connected, modern interface.",
      // EDITABLE: replace with Mustafa's verified, specific contribution.
      contribution:
        "Contribution details are editable — add the exact scope of work Mustafa delivered on this project.",
      decisions: [
        "A content-driven structure so sites and regions stay easy to extend.",
        "Bilingual-ready presentation for Arabic and international audiences.",
        "Performance-minded delivery for media-rich pages.",
      ],
      tech: ["Web platform", "Interactive maps", "Responsive UI", "Arabic content"],
    },
    ar: {
      name: "أطلس تراث العراق",
      kicker: "تراث رقمي · Cloud Group",
      summary:
        "منصة تفاعلية للتراث والآثار والسياحة في العراق — تجمع المواقع التاريخية في تجربة واحدة قابلة للاستكشاف.",
      problem:
        "تراث العراق الثقافي والأثري موزّع على مصادر يصعب تصفّحها في واجهة حديثة مترابطة.",
      contribution:
        "تفاصيل المساهمة قابلة للتعديل — أضِف نطاق العمل الدقيق الذي أنجزه مصطفى في هذا المشروع.",
      decisions: [
        "بنية معتمدة على المحتوى لتبقى المواقع والمناطق سهلة التوسعة.",
        "عرض جاهز لثنائية اللغة للجمهور العربي والعالمي.",
        "تسليم يراعي الأداء للصفحات الغنية بالوسائط.",
      ],
      tech: ["منصة ويب", "خرائط تفاعلية", "واجهة متجاوبة", "محتوى عربي"],
    },
  },
  // Add further verified projects here using the same structure.
];

/* Problem-solving methodology */
const APPROACH = [
  { n: "01", en: { t: "Understand", d: "Understand the real problem and the needs behind it." },
             ar: { t: "الفهم", d: "فهم المشكلة الحقيقية والاحتياجات المرتبطة بها." } },
  { n: "02", en: { t: "Explore", d: "Research possible approaches and evaluate trade-offs." },
             ar: { t: "الاستكشاف", d: "دراسة الحلول الممكنة ومقارنة مزاياها." } },
  { n: "03", en: { t: "Design", d: "Choose a practical solution with a clear structure." },
             ar: { t: "التخطيط", d: "اختيار حل عملي ببنية واضحة." } },
  { n: "04", en: { t: "Build", d: "Implement with attention to maintainability and usability." },
             ar: { t: "التنفيذ", d: "بناء الحل مع الاهتمام بقابلية الصيانة وسهولة الاستخدام." } },
  { n: "05", en: { t: "Refine", d: "Test, evaluate and improve the result." },
             ar: { t: "التحسين", d: "اختبار النتيجة وتقييمها وتطويرها." } },
];

/* All UI strings */
const I18N = {
  en: {
    "meta.title": "Mustafa Jawad — Programmer",
    "meta.desc": "Mustafa Jawad is a programmer at Cloud Group building thoughtful digital solutions and meaningful experiences through technology.",
    "brand.role": "Programmer · Cloud Group",
    "nav.cta": "Get in Touch",
    "lang.switch": "عربي",
    "lang.label": "Switch to Arabic",

    "hero.identity": "Programmer · Cloud Group",
    "hero.title": "Turning Ideas Into Digital Solutions.",
    "hero.copy": "I'm Mustafa Jawad, a programmer at Cloud Group focused on building thoughtful digital solutions and creating meaningful experiences through technology.",
    "hero.cta1": "Explore My Work",
    "hero.cta2": "Get in Touch",
    "hero.scroll": "Scroll",

    "about.eyebrow": "About",
    "about.title": "Technical thinking, applied with care.",
    "about.p1": "I'm a programmer interested in building useful digital products and solving real-world problems through technology. My approach combines technical thinking, curiosity, continuous learning and attention to the details that make digital experiences work well.",
    "about.p2": "Through my work and projects, I aim to turn ideas into practical solutions with thoughtful implementation and a strong focus on usability.",
    "about.k1": "Problem-first", "about.k1d": "Start from the need, not the tool.",
    "about.k2": "Detail-driven", "about.k2d": "The small things make the difference.",
    "about.k3": "Always learning", "about.k3d": "Curiosity as a daily practice.",

    "exp.eyebrow": "Expertise",
    "exp.title": "What I work with.",
    "exp.note": "Grouped by how I use each area — core focus, project experience, or active learning. No inflated scores, just honest scope.",

    "proj.eyebrow": "Projects",
    "proj.title": "Selected work.",
    "proj.problem": "The problem",
    "proj.contribution": "My contribution",
    "proj.decisions": "Key decisions",
    "proj.tech": "Built with",
    "proj.visit": "Visit live",
    "proj.repo": "Repository",

    "appr.eyebrow": "Approach",
    "appr.title": "Good Code Solves the Right Problem.",
    "appr.note": "A professional philosophy for how I like to work — adapted to each project rather than applied by rote.",

    "cloud.eyebrow": "Organization",
    "cloud.title": "Part of Cloud Group.",
    "cloud.copy": "I work as a programmer within Cloud Group, the structure behind a range of web, software and digital product ventures. This is my personal portfolio — not an official Cloud Group website.",
    "cloud.visit": "Visit Cloud Group",

    "contact.eyebrow": "Contact",
    "contact.title": "Let's Build Something Meaningful.",
    "contact.copy": "Have a project, a role, or an idea worth exploring? I'd be glad to hear about it.",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send message",
    "contact.or": "Or reach me directly",
    "contact.emailCta": "Email me",
    "contact.soon": "Not configured yet",
    "contact.formNote": "This form isn't connected to a backend yet. Until it is, please use the email link.",
    "contact.err.name": "Please enter your name.",
    "contact.err.email": "Please enter a valid email address.",
    "contact.err.message": "Please enter a message.",

    "footer.rights": "Personal portfolio.",
    "footer.built": "Built with care.",
    "link.github": "GitHub",
    "link.linkedin": "LinkedIn",
    "link.soon": "Soon",
  },
  ar: {
    "meta.title": "مصطفى جواد — مبرمج",
    "meta.desc": "مصطفى جواد مبرمج ضمن Cloud Group، يعمل على بناء حلول رقمية مدروسة وتجارب مفيدة من خلال التكنولوجيا.",
    "brand.role": "مبرمج · Cloud Group",
    "nav.cta": "تواصل معي",
    "lang.switch": "EN",
    "lang.label": "التبديل إلى الإنجليزية",

    "hero.identity": "مبرمج · Cloud Group",
    "hero.title": "أحوّل الأفكار إلى حلول رقمية.",
    "hero.copy": "أنا مصطفى جواد، مبرمج ضمن Cloud Group، أعمل على تطوير حلول رقمية مدروسة وصناعة تجارب مفيدة من خلال التكنولوجيا.",
    "hero.cta1": "استكشف أعمالي",
    "hero.cta2": "تواصل معي",
    "hero.scroll": "مرّر",

    "about.eyebrow": "نبذة",
    "about.title": "تفكيرٌ تقني يُطبَّق بعناية.",
    "about.p1": "أنا مبرمج مهتم ببناء منتجات رقمية مفيدة وحل المشكلات الواقعية باستخدام التكنولوجيا. أجمع في أسلوبي بين التفكير التقني والفضول والتعلّم المستمر والاهتمام بالتفاصيل التي تجعل التجارب الرقمية أكثر كفاءة.",
    "about.p2": "من خلال عملي ومشاريعي، أسعى إلى تحويل الأفكار إلى حلول عملية بتنفيذ برمجي مدروس واهتمام حقيقي بسهولة الاستخدام.",
    "about.k1": "المشكلة أولاً", "about.k1d": "نبدأ من الحاجة لا من الأداة.",
    "about.k2": "دقة التفاصيل", "about.k2d": "التفاصيل الصغيرة تصنع الفرق.",
    "about.k3": "تعلّم دائم", "about.k3d": "الفضول ممارسة يومية.",

    "exp.eyebrow": "الخبرات",
    "exp.title": "ما أعمل به.",
    "exp.note": "مُصنّفة حسب طريقة استخدامي لكل مجال — تركيز أساسي، أو خبرة مشاريع، أو تعلّم نشط. دون نسب مبالغ فيها، فقط نطاق صادق.",

    "proj.eyebrow": "المشاريع",
    "proj.title": "أعمال مختارة.",
    "proj.problem": "المشكلة",
    "proj.contribution": "مساهمتي",
    "proj.decisions": "قرارات أساسية",
    "proj.tech": "بُني باستخدام",
    "proj.visit": "زيارة المشروع",
    "proj.repo": "المستودع",

    "appr.eyebrow": "المنهجية",
    "appr.title": "الكود الجيد يبدأ بحل المشكلة الصحيحة.",
    "appr.note": "فلسفة عمل مهنية أفضّلها — تتكيّف مع كل مشروع بدل تطبيقها آلياً.",

    "cloud.eyebrow": "المؤسسة",
    "cloud.title": "ضمن Cloud Group.",
    "cloud.copy": "أعمل كمبرمج ضمن Cloud Group، البنية التي تقف خلف مجموعة من مشاريع الويب والبرمجيات والمنتجات الرقمية. هذا موقعي الشخصي — وليس موقعاً رسمياً لـ Cloud Group.",
    "cloud.visit": "زيارة Cloud Group",

    "contact.eyebrow": "تواصل",
    "contact.title": "لنبنِ شيئاً له قيمة.",
    "contact.copy": "لديك مشروع أو فرصة أو فكرة تستحق الاستكشاف؟ يسعدني أن أسمع عنها.",
    "contact.name": "الاسم",
    "contact.email": "البريد الإلكتروني",
    "contact.message": "الرسالة",
    "contact.send": "إرسال الرسالة",
    "contact.or": "أو تواصل معي مباشرة",
    "contact.emailCta": "راسلني",
    "contact.soon": "غير مُفعّل بعد",
    "contact.formNote": "هذا النموذج غير متصل بخادم بعد. إلى حين تفعيله، يُرجى استخدام رابط البريد.",
    "contact.err.name": "يُرجى إدخال اسمك.",
    "contact.err.email": "يُرجى إدخال بريد إلكتروني صحيح.",
    "contact.err.message": "يُرجى كتابة رسالة.",

    "footer.rights": "موقع شخصي.",
    "footer.built": "صُنع بعناية.",
    "link.github": "GitHub",
    "link.linkedin": "LinkedIn",
    "link.soon": "قريباً",
  },
};

window.SITE = { LINKS, NAV, EXPERTISE, PROJECTS, APPROACH, I18N };
