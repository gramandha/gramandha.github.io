const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const languageToggle = document.querySelector(".language-toggle");
const sectionSidebar = document.querySelector(".section-sidebar");
const sectionLinks = [...sectionSidebar.querySelectorAll("a")];
const sidebarPercent = sectionSidebar.querySelector("[data-scroll-percent]");
const sidebarProgress = sectionSidebar.querySelector(".sidebar-progress");
const sidebarCurrentSection = sectionSidebar.querySelector("[data-current-section]");
const savedTheme = localStorage.getItem("portfolio-theme");
const savedLanguage = localStorage.getItem("portfolio-language");
const originalText = new WeakMap();
const originalAttributes = new WeakMap();

const englishTranslations = new Map(Object.entries({
  "Lewati ke konten": "Skip to content",
  "Gramandha Wega Intyanto, beranda": "Gramandha Wega Intyanto, home",
  "Buka menu navigasi": "Open navigation menu",
  "Tutup menu navigasi": "Close navigation menu",
  "Navigasi utama": "Main navigation",
  "Navigasi bagian": "Section navigation",
  "Progres halaman": "Page progress",
  "BAGIAN AKTIF": "ACTIVE SECTION",
  "Beranda": "Home",
  "Tentang": "About",
  "Riset": "Research",
  "Keterampilan": "Skills",
  "Proyek": "Projects",
  "Karya": "Works",
  "Fokus riset": "Research",
  "Karya & buku": "Works & books",
  "Publikasi": "Publications",
  "Jejak akademik": "Academic journey",
  "Kontak": "Contact",
  "Aktifkan mode terang": "Switch to light mode",
  "Aktifkan mode gelap": "Switch to dark mode",
  "Dosen · Robotika & AI · Universitas Jember": "Lecturer · Robotics & AI · University of Jember",
  "Dosen dan peneliti Teknik Elektro yang mengeksplorasi robotika bawah air, computer vision, dan kecerdasan buatan.": "An Electrical Engineering lecturer and researcher exploring underwater robotics, computer vision, and artificial intelligence.",
  "Jelajahi publikasi": "Explore publications",
  "Simpan profil sebagai PDF": "Save profile as PDF",
  "GULIR UNTUK MENJELAJAH": "SCROLL TO EXPLORE",
  "Berpikir sistemik. Membangun solusi nyata.": "Thinking systemically. Building real-world solutions.",
  "Teknik Elektro · Fakultas Teknik": "Electrical Engineering · Faculty of Engineering",
  "Ringkasan profil akademik": "Academic profile summary",
  "Dampak akademik": "Academic impact",
  "dalam angka": "in numbers",
  "Sitasi": "Citations",
  "Data profil diperiksa 12 Oktober 2026 · lihat sumber resmi untuk pembaruan.": "Profile data checked on October 12, 2026 · see official sources for updates.",
  "TENTANG SAYA": "ABOUT ME",
  "/ TENTANG SAYA": "/ ABOUT ME",
  "Foto Gramandha Wega Intyanto mengenakan batik": "Photo of Gramandha Wega Intyanto wearing batik",
  "Riset yang berangkat": "Research rooted",
  "dari": "in",
  "rasa ingin tahu.": "curiosity.",
  "Bagaimana mesin dapat melihat, memahami lingkungan, lalu bertindak dengan tepat? Pertanyaan itu menjadi benang merah ketertarikan saya pada robotika dan kecerdasan buatan.": "How can machines see, understand their environment, and then act appropriately? This question underpins my interest in robotics and artificial intelligence.",
  "Sebagai dosen dan peneliti di Universitas Jember, saya tertarik mengembangkan teknologi yang tidak berhenti di teori. Proyek dan eksperimen saya mengeksplorasi machine learning, computer vision, robotika, dan pengembangan aplikasi.": "As a lecturer and researcher at the University of Jember, I am interested in developing technology that goes beyond theory. My projects and experiments explore machine learning, computer vision, robotics, and application development.",
  "AFILIASI": "AFFILIATION",
  "PROGRAM STUDI": "STUDY PROGRAM",
  "PERAN": "ROLE",
  "S1 Teknik Elektro": "B.Eng. in Electrical Engineering",
  "Dosen & Peneliti": "Lecturer & Researcher",
  "Riwayat pendidikan": "Education",
  "2018 · S2": "2018 · M.Eng.",
  "Magister Teknik (M.T.) Elektro": "Master of Engineering (M.Eng.) in Electrical Engineering",
  "Konsentrasi: Jaringan Cerdas Multimedia": "Focus: Multimedia Intelligent Networks",
  "2015 · D4": "2015 · Applied B.Sc.",
  "Sarjana Sains Terapan (S.ST.) Teknik Mekatronika": "Bachelor of Applied Science (S.ST.) in Mechatronics Engineering",
  "FOKUS RISET": "RESEARCH FOCUS",
  "/ FOKUS RISET": "/ RESEARCH FOCUS",
  "Meneroka batas": "Exploring the boundaries",
  "antara": "between",
  "ide & implementasi.": "ideas & implementation.",
  "Empat benang minat yang saling terhubung dalam eksplorasi teknologi saya.": "Four interconnected interests that shape my exploration of technology.",
  "Robotika & ROV": "Robotics & ROVs",
  "Robot bergerak dan kendaraan bawah air untuk observasi serta inspeksi di lingkungan menantang.": "Mobile robots and underwater vehicles for observation and inspection in challenging environments.",
  "Menerjemahkan data visual menjadi pemahaman yang berguna untuk inspeksi dan pengambilan keputusan.": "Turning visual data into useful insights for inspection and decision-making.",
  "Kecerdasan buatan": "Artificial intelligence",
  "Eksplorasi machine learning dan AI untuk membangun sistem yang adaptif dan aplikatif.": "Exploring machine learning and AI to build adaptive, practical systems.",
  "Usability perangkat lunak": "Software usability",
  "Memahami pengalaman pengguna agar teknologi terasa jelas, berguna, dan mudah diakses.": "Understanding user experience so technology feels clear, useful, and accessible.",
  "KETERAMPILAN": "SKILLS",
  "/ KETERAMPILAN": "/ SKILLS",
  "Bahasa untuk": "Languages for",
  "membangun ide.": "building ideas.",
  "Bahasa pemrograman dan teknologi yang saya pahami dan gunakan dalam eksplorasi serta pengembangan solusi.": "Programming languages and technologies I understand and use to explore and develop solutions.",
  "Bahasa pemrograman dan teknologi": "Programming languages and technologies",
  "PEMROGRAMAN": "PROGRAMMING",
  "PILIHAN KARYA": "SELECTED WORK",
  "/ PILIHAN KARYA": "/ SELECTED WORK",
  "RISET TERKINI": "RECENT RESEARCH",
  "ROV vision untuk inspeksi jaring budidaya": "ROV Vision for Aquaculture Net Inspection",
  "Riset tentang performa YOLOv11 pada sistem visi berbasis ROV untuk inspeksi jaring keramba budidaya perikanan—memadukan robotika bawah air dan deteksi objek.": "Research on YOLOv11 performance in an ROV-based vision system for inspecting aquaculture net pens—combining underwater robotics and object detection.",
  "Lihat publikasi": "View publication",
  "OPEN-SOURCE & EKSPERIMEN": "OPEN SOURCE & EXPERIMENTS",
  "Proyek pilihan dari GitHub": "Selected GitHub projects",
  "Jelajahi semua repositori": "Explore all repositories",
  "Aplikasi desktop Windows untuk membaca PDF dan menambahkan anotasi, highlight, gambar, serta perubahan halaman.": "A Windows desktop app for reading PDFs and adding annotations, highlights, images, and page edits.",
  "Prediksi risiko diabetes": "Diabetes risk prediction",
  "Alur kerja klasifikasi Logistic Regression dari eksplorasi dan evaluasi model hingga aplikasi web interaktif.": "A Logistic Regression classification workflow, from model exploration and evaluation to an interactive web app.",
  "Klasifikasi citra bunga": "Flower image classification",
  "Eksperimen klasifikasi lima jenis bunga dengan CNN dan transfer learning, disertai aplikasi prediksi berbasis web.": "An experiment classifying five flower types with CNNs and transfer learning, accompanied by a web-based prediction app.",
  "Prediksi kelulusan siswa": "Student graduation prediction",
  "Aplikasi pembelajaran alur klasifikasi Random Forest dengan data sintetis dan antarmuka prediksi berbasis web.": "A learning app demonstrating a Random Forest classification workflow with synthetic data and a web-based prediction interface.",
  "Lihat repository": "View repository",
  "Ringkasan proyek berdasarkan profil dan README repositori GitHub publik. Detail teknis lengkap ada di masing-masing repository.": "Project summaries are based on the public GitHub profile and repository READMEs. Full technical details are available in each repository.",
  "KEKAYAAN INTELEKTUAL & BUKU": "INTELLECTUAL PROPERTY & BOOKS",
  "/ KEKAYAAN INTELEKTUAL & BUKU": "/ INTELLECTUAL PROPERTY & BOOKS",
  "01 — RISET TERKINI": "01 — RECENT RESEARCH",
  "01 — KEKAYAAN INTELEKTUAL": "01 — INTELLECTUAL PROPERTY",
  "02 — PUBLIKASI BUKU": "02 — BOOK PUBLICATIONS",
  "Karya yang": "Works",
  "tercatat & dibagikan.": "on record & shared.",
  "Karya cipta, paten, dan buku yang tercantum pada profil SINTA.": "Copyrights, patents, and books listed on the SINTA profile.",
  "KEKAYAAN INTELEKTUAL": "INTELLECTUAL PROPERTY",
  "Karya cipta & paten": "Copyrights & patents",
  "Lihat di SINTA": "View on SINTA",
  "HAK CIPTA": "COPYRIGHT",
  "PATEN": "PATENT",
  "Inventor: Berlian Juliartha Martin Putra, Gramandha Wega Intyanto": "Inventors: Berlian Juliartha Martin Putra, Gramandha Wega Intyanto",
  "Inventor: Gramandha Wega Intyanto, Ahmad Arbi Trihatmojo, Dwi Ariani Finda Yuniarti": "Inventors: Gramandha Wega Intyanto, Ahmad Arbi Trihatmojo, Dwi Ariani Finda Yuniarti",
  "Inventor: Gramandha Wega Intyanto": "Inventor: Gramandha Wega Intyanto",
  "Inventor: Dwi Ariani Finda Yuniarti, Gramandha Wega Intyanto, Ari Setiyani Pawening": "Inventors: Dwi Ariani Finda Yuniarti, Gramandha Wega Intyanto, Ari Setiyani Pawening",
  "Status: Diterima": "Status: Granted",
  "Status SINTA: (PA) Masa": "SINTA status: (PA) Term",
  "Status SINTA: Hak Cipta": "SINTA status: Copyright",
  "Informasi afiliasi tidak dicantumkan pada entri SINTA yang ditampilkan.": "Affiliation information is not listed in the SINTA entry shown.",
  "Status dan nomor permohonan ditampilkan sesuai entri SINTA; periksa profil sumber untuk informasi terkini.": "Statuses and application numbers are shown as listed in SINTA; check the source profile for the latest information.",
  "PUBLIKASI BUKU": "BOOK PUBLICATIONS",
  "Buku & buku ajar": "Books & textbooks",
  "BUKU AJAR": "TEXTBOOK",
  "MODUL ALGORITMA PEMROGRAMAN DENGAN FLOWGORITHM": "Programming Algorithms Module with Flowgorithm",
  "Modul Algoritma Pemrograman dengan Flowgorithm": "Programming Algorithms Module with Flowgorithm",
  "Alat penggerak kamera kesegala arah menggunakan roda omni yang dioperasikan secara jarak jauh": "Omnidirectional camera drive using omni wheels, operated remotely",
  "Sistem Kontrol Sequencing Chiller 4-Line": "4-Line Chiller Sequencing Control System",
  "Penginderaan visual elektronika (machine vision)": "Electronic visual sensing (machine vision)",
  "Sistem kontrol": "Control systems",
  "Buku ajar sistem kendali cerdas": "Intelligent control systems textbook",
  "Konsep pemrograman dengan menggunakan bahasa C [sumber elektronis]": "Programming concepts using the C language [electronic resource]",
  "Konsep pemrograman dengan menggunakan bahasa C": "Programming concepts using the C language",
  "Gagasan yang": "Ideas that",
  "/ PUBLIKASI": "/ PUBLICATIONS",
  "menjadi kontribusi.": "become contributions.",
  "Semua publikasi": "All publications",
  "Filter topik publikasi": "Filter publications by topic",
  "Semua": "All",
  "AI & visi": "AI & vision",
  "JURNAL": "JOURNAL",
  "KONFERENSI": "CONFERENCE",
  "Klasifikasi citra bunga dengan menggunakan deep learning: CNN (Convolution Neural Network)": "Flower image classification using deep learning: CNN (Convolutional Neural Network)",
  "Pengukuran Usability pada Website Kampus Akademi Komunitas Negeri Pacitan Menggunakan System Usability Scale (SUS)": "Usability Measurement of the Pacitan State Community Academy Campus Website Using the System Usability Scale (SUS)",
  "Buka publikasi YOLOv11 Performance di Google Scholar": "Open the YOLOv11 Performance publication on Google Scholar",
  "Buka publikasi ELDOC di Google Scholar": "Open the ELDOC publication on Google Scholar",
  "Buka publikasi klasifikasi citra bunga di Google Scholar": "Open the flower image classification publication on Google Scholar",
  "Buka publikasi usability website kampus di Google Scholar": "Open the campus website usability publication on Google Scholar",
  "Metadata dan daftar publikasi dapat berubah. Periksa Google Scholar untuk daftar lengkap dan informasi terbaru.": "Publication metadata and listings may change. Check Google Scholar for the complete list and latest information.",
  "JEJAK AKADEMIK": "ACADEMIC JOURNEY",
  "/ JEJAK AKADEMIK": "/ ACADEMIC JOURNEY",
  "Bertumbuh melalui": "Growing through",
  "kolaborasi.": "collaboration.",
  "Publikasi, indeks, dan jejaring riset merupakan bagian dari perjalanan akademik yang terus berkembang.": "Publications, indexes, and research networks are part of an ongoing academic journey.",
  "Kode, proyek & eksperimen": "Code, projects & experiments",
  "Profil profesional": "Professional profile",
  "Ikuti di Instagram": "Follow on Instagram",
  "Publikasi & sitasi": "Publications & citations",
  "Data dosen nasional": "National lecturer data",
  "Metrik bersumber dari profil masing-masing dan dapat berbeda antarplatform.": "Metrics come from each profile and may differ across platforms.",
  "HUBUNGI SAYA": "GET IN TOUCH",
  "/ HUBUNGI SAYA": "/ GET IN TOUCH",
  "Mari": "Let's",
  "berkolaborasi.": "collaborate.",
  "Mahasiswa, peneliti, dan mitra industri dipersilakan menghubungi saya untuk diskusi riset, kolaborasi akademik, atau bimbingan mahasiswa.": "Students, researchers, and industry partners are welcome to contact me for research discussions, academic collaboration, or student mentorship.",
  "Alamat Kantor": "Office Address",
  "Teknik Elektro - Universitas Jember": "Electrical Engineering - University of Jember",
  "Publikasi dan sitasi": "Publications and citations",
  "Proyek dan eksperimen": "Projects and experiments",
  "TERBUKA UNTUK KOLABORASI": "OPEN TO COLLABORATION",
  "Kirim Pesan": "Send a Message",
  "Nama Lengkap": "Full Name",
  "Nama Anda": "Your name",
  "nama@contoh.com": "your@email.com",
  "Tujuan": "Purpose",
  "Mahasiswa – Riset S1": "Student – S1 Research",
  "Kolaborasi penelitian": "Research collaboration",
  "Undangan akademik": "Academic invitation",
  "Lainnya": "Other",
  "Pesan": "Message",
  "Ceritakan pesan Anda...": "Tell me about your interest...",
  "Tombol ini akan membuka aplikasi email untuk mengirim pesan ke gramandha@unej.ac.id.": "This button opens your email app to send a message to gramandha@unej.ac.id.",
  "/ TERBUKA UNTUK KOLABORASI": "/ OPEN TO COLLABORATION",
  "Mari wujudkan": "Let's bring",
  "ide": "ideas",
  "berikutnya.": "to life.",
  "Terbuka untuk diskusi riset, kolaborasi akademik, dan pertukaran gagasan seputar robotika dan AI.": "Open to research discussions, academic collaborations, and exchanging ideas in robotics and AI.",
  "Terhubung melalui profil akademik": "Connect via academic profile",
  "Dibuat dengan rasa ingin tahu dan secangkir kopi.": "Made with curiosity and a cup of coffee.",
  "Kembali ke atas": "Back to top",
  "Kembali ke bagian atas halaman": "Return to the top of the page",
  "Gelar": "Degree",
  "Terhubung": "Connect"
}));

if (savedTheme === "dark" || savedTheme === "light") {
  root.dataset.theme = savedTheme;
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  root.dataset.theme = "dark";
}

function updateThemeButton() {
  const isDark = root.dataset.theme === "dark";
  const labels = root.lang === "en"
    ? { light: "Switch to light mode", dark: "Switch to dark mode" }
    : { light: "Aktifkan mode terang", dark: "Aktifkan mode gelap" };
  themeToggle.setAttribute("aria-label", isDark ? labels.light : labels.dark);
  document.querySelector('meta[name="theme-color"]').content = isDark ? "#141a17" : "#f7f8f5";
}

function normalizeText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function updateSectionSidebar() {
  const scrollableHeight = root.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0
    ? Math.min(100, Math.max(0, Math.round((window.scrollY / scrollableHeight) * 100)))
    : 0;
  sidebarPercent.textContent = String(progress).padStart(2, "0");
  sidebarProgress.setAttribute("aria-valuenow", String(progress));
  sectionSidebar.style.setProperty("--scroll-progress", `${progress}%`);

  const activationPoint = window.scrollY + window.innerHeight * 0.35;
  let activeLink = sectionLinks[0];
  sectionLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section && section.getBoundingClientRect().top + window.scrollY <= activationPoint) {
      activeLink = link;
    }
  });

  sectionLinks.forEach((link) => {
    if (link === activeLink) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
  sidebarCurrentSection.textContent = activeLink.querySelector(".sidebar-label").textContent;
}

let sidebarFrame = 0;
function scheduleSectionSidebarUpdate() {
  if (sidebarFrame) return;
  sidebarFrame = window.requestAnimationFrame(() => {
    updateSectionSidebar();
    sidebarFrame = 0;
  });
}

function setLanguage(language) {
  const isEnglish = language === "en";
  root.lang = isEnglish ? "en" : "id";

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const original = originalText.get(node);
    const translation = englishTranslations.get(normalizeText(original));
    if (isEnglish && translation) {
      const leadingSpace = original.match(/^\s*/)[0];
      const trailingSpace = original.match(/\s*$/)[0];
      node.nodeValue = `${leadingSpace}${translation}${trailingSpace}`;
    } else {
      node.nodeValue = original;
    }
    node = walker.nextNode();
  }

  document.querySelectorAll("[aria-label], [alt], [title], [placeholder]").forEach((element) => {
    if (!originalAttributes.has(element)) originalAttributes.set(element, {});
    const originals = originalAttributes.get(element);
    ["aria-label", "alt", "title", "placeholder"].forEach((attribute) => {
      const value = element.getAttribute(attribute);
      if (!value) return;
      const translation = englishTranslations.get(value);
      if (isEnglish && translation) {
        if (!originals[attribute]) originals[attribute] = value;
        element.setAttribute(attribute, translation);
      } else if (originals[attribute]) {
        element.setAttribute(attribute, originals[attribute]);
      }
    });
  });

  languageToggle.textContent = isEnglish ? "ID" : "EN";
  languageToggle.setAttribute("aria-label", isEnglish ? "Switch language to Indonesian" : "Switch language to English");
  languageToggle.title = languageToggle.getAttribute("aria-label");

  document.title = isEnglish
    ? "Gramandha Wega Intyanto — Academic & Researcher"
    : "Gramandha Wega Intyanto — Akademisi & Peneliti";
  document.querySelector('meta[name="description"]').content = isEnglish
    ? "Academic portfolio of Gramandha Wega Intyanto, lecturer and researcher at the University of Jember, interested in robotics, machine vision, and artificial intelligence."
    : "Portofolio akademik Gramandha Wega Intyanto, dosen dan peneliti Universitas Jember dengan minat pada robotika, machine vision, dan kecerdasan buatan.";
  document.querySelector('meta[property="og:title"]').content = document.title;
  document.querySelector('meta[property="og:description"]').content = isEnglish
    ? "Connecting robotics, computer vision, and artificial intelligence with real-world applications."
    : "Menjembatani robotika, visi komputer, dan kecerdasan buatan dengan aplikasi nyata.";

  menuToggle.setAttribute("aria-label", menuToggle.getAttribute("aria-expanded") === "true"
    ? (isEnglish ? "Close navigation menu" : "Tutup menu navigasi")
    : (isEnglish ? "Open navigation menu" : "Buka menu navigasi"));
  updateThemeButton();
  localStorage.setItem("portfolio-language", language);
}

setLanguage(savedLanguage === "en" ? "en" : "id");
updateSectionSidebar();
window.addEventListener("scroll", scheduleSectionSidebarUpdate, { passive: true });
window.addEventListener("resize", scheduleSectionSidebarUpdate);

sectionSidebar.querySelector('a[href="#top"]').addEventListener("click", (event) => {
  event.preventDefault();
  if (window.location.hash !== "#top") {
    window.history.pushState(null, "", "#top");
  }
  const previousScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  updateSectionSidebar();
  requestAnimationFrame(() => {
    root.style.scrollBehavior = previousScrollBehavior;
  });
});

themeToggle.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("portfolio-theme", root.dataset.theme);
  updateThemeButton();
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen
    ? (root.lang === "en" ? "Open navigation menu" : "Buka menu navigasi")
    : (root.lang === "en" ? "Close navigation menu" : "Tutup menu navigasi"));
  siteNav.classList.toggle("is-open", !isOpen);
});

languageToggle.addEventListener("click", () => {
  setLanguage(root.lang === "en" ? "id" : "en");
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", root.lang === "en" ? "Open navigation menu" : "Buka menu navigasi");
  });
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((filter) => {
      const isActive = filter === button;
      filter.classList.toggle("is-active", isActive);
      filter.setAttribute("aria-pressed", String(isActive));
    });
    document.querySelectorAll(".publication-row").forEach((row) => {
      row.hidden = selected !== "semua" && row.dataset.category !== selected;
    });
  });
});

document.querySelector("[data-print-cv]").addEventListener("click", () => window.print());
document.querySelector("[data-year]").textContent = new Date().getFullYear();

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const purpose = String(formData.get("purpose") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const isEnglish = root.lang === "en";
  const subject = `${isEnglish ? "Message from website" : "Pesan dari situs web"}: ${name}`;
  const body = [
    `${isEnglish ? "Name" : "Nama"}: ${name}`,
    `Email: ${email}`,
    `${isEnglish ? "Purpose" : "Tujuan"}: ${purpose}`,
    "",
    `${isEnglish ? "Message" : "Pesan"}:`,
    message
  ].join("\n");

  window.location.href = `mailto:gramandha@unej.ac.id?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.querySelector(".back-top").addEventListener("click", (event) => {
  event.preventDefault();
  const previousScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  requestAnimationFrame(() => {
    root.style.scrollBehavior = previousScrollBehavior;
  });
});

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}
