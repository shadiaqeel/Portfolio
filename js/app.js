/**
 * Portfolio Vue.js Application
 * Author: Shadi Akil
 * Description: Main Vue.js application for the portfolio website
 *
 * Data Files Location:
 * The following data is also available as separate JSON files in the /data folder
 * for easier maintenance and potential future API integration:
 * - /data/experience.json   - Work experience data
 * - /data/education.json    - Education data
 * - /data/certifications.json - Certifications data
 * - /data/skills.json       - Skills data
 * - /data/projects.json     - Projects data
 * - /data/profile.json      - Profile, contact, and personal data
 */

const { createApp, ref, computed, watch } = Vue;

// ============================================
// Custom Icon Component
// ============================================
const IconComponent = {
  props: ["name", "size"],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="size || 24"
      :height="size || 24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      v-html="path"
    ></svg>
  `,
  setup(props) {
    const icons = {
      code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
      sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
      moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
      download:
        '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
      mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
      phone:
        '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
      "map-pin": '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
      github:
        '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
      linkedin:
        '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
      server:
        '<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>',
      layout:
        '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="9" y2="21"/>',
      database:
        '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
      cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
      terminal: '<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>',
      briefcase:
        '<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
      "graduation-cap":
        '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
      award: '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
      "external-link":
        '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/>',
      flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/>',
      globe:
        '<circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
      star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
      users:
        '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
      languages:
        '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>',
      zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
      heart:
        '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
      rocket:
        '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
      check: '<polyline points="20 6 9 17 4 12"/>',
      "check-circle": '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
      "trending-up": '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
      building:
        '<rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
      "message-circle": '<path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>',
      calendar:
        '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
      layers:
        '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
      coffee:
        '<path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/>',
      menu: '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
      x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
      "chevron-right": '<path d="m9 18 6-6-6-6"/>',
      "chevron-down": '<path d="m6 9 6 6 6-6"/>',
      "arrow-up": '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
      user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
      cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
      wifi: '<path d="M5 13a10 10 0 0 1 14 0"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 9.5a15.5 15.5 0 0 1 20 0"/><circle cx="12" cy="20" r="1"/>',
      "clipboard-list":
        '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
      "bar-chart":
        '<line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/>',
      filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
    };

    const path = computed(() => icons[props.name] || "");
    return { path };
  },
};

// ============================================
// Main App Configuration
// ============================================
const app = createApp({
  components: {
    icon: IconComponent,
  },
  setup() {
    // ============================================
    // Reactive State
    // ============================================
    const getInitialDarkMode = () => {
      const stored = localStorage.getItem("darkMode");
      if (stored !== null) return stored === "true";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    };

    const getInitialLang = () => {
      return localStorage.getItem("lang") || "en";
    };

    const darkMode = ref(getInitialDarkMode());
    const lang = ref(getInitialLang());
    const activeCategory = ref("All");
    const mobileMenuOpen = ref(false);
    const scrollProgress = ref(0);
    const scrolled = ref(false);
    const showBackToTop = ref(false);
    const activeSection = ref("hero");
    const altKeyPressed = ref(false);

    // ============================================
    // Navigation Items
    // ============================================
    const navItems = [
      { id: "hero", label: { en: "Home", ar: "الرئيسية" }, icon: "code", shortcut: "H" },
      { id: "experience", label: { en: "Experience", ar: "الخبرة" }, icon: "briefcase", shortcut: "E" },
      { id: "projects", label: { en: "Projects", ar: "المشاريع" }, icon: "rocket", shortcut: "P" },
      { id: "skills", label: { en: "Skills", ar: "المهارات" }, icon: "terminal", shortcut: "S" },
      { id: "education", label: { en: "Education", ar: "التعليم" }, icon: "graduation-cap", shortcut: "D" },
      { id: "about", label: { en: "About", ar: "حول" }, icon: "user", shortcut: "A" },
      { id: "contact", label: { en: "Contact", ar: "تواصل" }, icon: "mail", shortcut: "C" },
    ];

    // Mobile Bottom Tabs (condensed for small screens)
    const mobileNavTabs = [
      { id: "hero", label: { en: "Home", ar: "الرئيسية" }, icon: "code" },
      { id: "experience", label: { en: "Work", ar: "العمل" }, icon: "briefcase" },
      { id: "projects", label: { en: "Projects", ar: "مشاريع" }, icon: "rocket" },
      { id: "skills", label: { en: "Skills", ar: "مهارات" }, icon: "terminal" },
      { id: "contact", label: { en: "Contact", ar: "تواصل" }, icon: "mail" },
    ];

    // ============================================
    // Navigation Functions
    // ============================================
    const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        if (window.trackNavigation) window.trackNavigation(sectionId);
      }
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrolled.value = scrollTop > 50;
      showBackToTop.value = scrollTop > 500;

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150) {
            activeSection.value = sections[i];
            break;
          }
        }
      }
    };

    // Add scroll listener on mounted
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    // ============================================
    // Keyboard Navigation Support
    // ============================================
    const handleKeydown = (event) => {
      // Close mobile menu on Escape key
      if (event.key === "Escape" && mobileMenuOpen.value) {
        mobileMenuOpen.value = false;
        // Return focus to menu toggle button
        const menuToggle = document.querySelector('[aria-controls="mobile-menu"]');
        if (menuToggle) menuToggle.focus();
        return;
      }

      // Show shortcut tooltips when Alt is pressed
      if (event.key === "Alt") {
        altKeyPressed.value = true;
      }

      // Alt+Key navigation shortcuts
      if (event.altKey && !event.ctrlKey && !event.metaKey) {
        const key = event.key.toUpperCase();

        // Navigation shortcuts
        const navItem = navItems.find((item) => item.shortcut === key);
        if (navItem) {
          event.preventDefault();
          scrollToSection(navItem.id);
          altKeyPressed.value = false;
          return;
        }

        // Theme toggle: Alt+T
        if (key === "T") {
          event.preventDefault();
          toggleDarkMode();
          altKeyPressed.value = false;
          return;
        }

        // Language toggle: Alt+L
        if (key === "L") {
          event.preventDefault();
          toggleLang();
          altKeyPressed.value = false;
          return;
        }
      }
    };

    const handleKeyup = (event) => {
      // Hide shortcut tooltips when Alt is released
      if (event.key === "Alt") {
        altKeyPressed.value = false;
      }
    };

    // Handle window blur to reset Alt state when window loses focus
    const handleWindowBlur = () => {
      altKeyPressed.value = false;
    };

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeydown);
      window.addEventListener("keyup", handleKeyup);
      window.addEventListener("blur", handleWindowBlur);
    }

    // ============================================
    // Toggle Functions
    // ============================================
    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value;
      if (window.trackDarkModeToggle) window.trackDarkModeToggle(darkMode.value);
    };

    const toggleLang = () => {
      lang.value = lang.value === "en" ? "ar" : "en";
      activeCategory.value = lang.value === "ar" ? "الكل" : "All";
      if (window.trackLanguageToggle) window.trackLanguageToggle(lang.value);
    };

    const downloadCV = () => {
      if (window.trackCVDownload) window.trackCVDownload();
      window.open("cv-download.html", "_blank");
    };

    const isRTL = computed(() => lang.value === "ar");

    // ============================================
    // Watchers
    // ============================================
    watch(
      darkMode,
      (newVal) => {
        localStorage.setItem("darkMode", newVal);
        if (newVal) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },
      { immediate: true }
    );

    watch(
      lang,
      (newVal) => {
        localStorage.setItem("lang", newVal);
        document.documentElement.setAttribute("lang", newVal);
        document.documentElement.setAttribute("dir", newVal === "ar" ? "rtl" : "ltr");
      },
      { immediate: true }
    );

    // ============================================
    // Translations
    // ============================================
    const t = computed(() => {
      const translations = {
        en: {
          openToOpportunities: "Open to Opportunities",
          seniorFullStack: "Senior Full Stack",
          dotNetDeveloper: ".NET Developer",
          downloadCV: "Download CV",
          techStack: "Tech Stack",
          workExperience: "Work Experience",
          skills: "Technical Skills",
          education: "Education",
          certifications: "Certifications",
          present: "Present",
          craftedWith: "Crafted with",
          strengths: "Strengths",
          languages: "Languages",
          personalSkills: "Personal Skills",
          projects: "Projects",
        },
        ar: {
          openToOpportunities: "متاح للفرص الوظيفية",
          seniorFullStack: "مطور متكامل أول",
          dotNetDeveloper: ".NET",
          downloadCV: "تحميل السيرة الذاتية",
          techStack: "التقنيات",
          workExperience: "الخبرة العملية",
          skills: "المهارات التقنية",
          education: "التعليم",
          certifications: "الشهادات",
          present: "حتى الآن",
          craftedWith: "صنع بـ",
          strengths: "نقاط القوة",
          languages: "اللغات",
          personalSkills: "المهارات الشخصية",
          projects: "المشاريع",
        },
      };
      return translations[lang.value];
    });

    // ============================================
    // Categories
    // ============================================
    const categories = computed(() => {
      return lang.value === "ar"
        ? [
            "الكل",
            "الخلفية",
            "الواجهة",
            "قواعد البيانات",
            "وسطاء الرسائل",
            "البحث والتحليلات",
            "DevOps",
            "الاختبارات",
            "الهندسة والممارسات",
          ]
        : [
            "All",
            "Backend",
            "Frontend",
            "Database",
            "Message Brokers",
            "Search & Analytics",
            "DevOps",
            "Testing",
            "Architecture",
          ];
    });

    const categoryMap = {
      الكل: "All",
      الخلفية: "Backend",
      الواجهة: "Frontend",
      "قواعد البيانات": "Database",
      "وسطاء الرسائل": "Message Brokers",
      "البحث والتحليلات": "Search & Analytics",
      الاختبارات: "Testing",
      "الهندسة والممارسات": "Architecture",
    };

    const categoryColors = {
      All: {
        gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
        bg: "bg-violet-500",
        text: "text-violet-500",
        border: "border-violet-500/50",
        lightBg: "bg-violet-50",
        lightText: "text-violet-700",
        darkBg: "bg-violet-500/15",
        darkText: "text-violet-400",
        darkBorder: "border-violet-500/30",
        shadow: "shadow-violet-500/25",
        glow: "rgba(139, 92, 246, 0.4)",
      },
      Backend: {
        gradient: "from-blue-600 via-blue-500 to-cyan-400",
        bg: "bg-blue-500",
        text: "text-blue-500",
        border: "border-blue-500/50",
        lightBg: "bg-blue-50",
        lightText: "text-blue-700",
        darkBg: "bg-blue-500/15",
        darkText: "text-blue-400",
        darkBorder: "border-blue-500/30",
        shadow: "shadow-blue-500/25",
        glow: "rgba(59, 130, 246, 0.4)",
      },
      Frontend: {
        gradient: "from-emerald-500 via-green-500 to-teal-400",
        bg: "bg-emerald-500",
        text: "text-emerald-500",
        border: "border-emerald-500/50",
        lightBg: "bg-emerald-50",
        lightText: "text-emerald-700",
        darkBg: "bg-emerald-500/15",
        darkText: "text-emerald-400",
        darkBorder: "border-emerald-500/30",
        shadow: "shadow-emerald-500/25",
        glow: "rgba(16, 185, 129, 0.4)",
      },
      Database: {
        gradient: "from-purple-600 via-violet-500 to-fuchsia-400",
        bg: "bg-purple-500",
        text: "text-purple-500",
        border: "border-purple-500/50",
        lightBg: "bg-purple-50",
        lightText: "text-purple-700",
        darkBg: "bg-purple-500/15",
        darkText: "text-purple-400",
        darkBorder: "border-purple-500/30",
        shadow: "shadow-purple-500/25",
        glow: "rgba(168, 85, 247, 0.4)",
      },
      "Message Brokers": {
        gradient: "from-amber-500 via-orange-500 to-yellow-400",
        bg: "bg-amber-500",
        text: "text-amber-500",
        border: "border-amber-500/50",
        lightBg: "bg-amber-50",
        lightText: "text-amber-700",
        darkBg: "bg-amber-500/15",
        darkText: "text-amber-400",
        darkBorder: "border-amber-500/30",
        shadow: "shadow-amber-500/25",
        glow: "rgba(245, 158, 11, 0.4)",
      },
      "Search & Analytics": {
        gradient: "from-cyan-500 via-sky-500 to-blue-400",
        bg: "bg-cyan-500",
        text: "text-cyan-500",
        border: "border-cyan-500/50",
        lightBg: "bg-cyan-50",
        lightText: "text-cyan-700",
        darkBg: "bg-cyan-500/15",
        darkText: "text-cyan-400",
        darkBorder: "border-cyan-500/30",
        shadow: "shadow-cyan-500/25",
        glow: "rgba(6, 182, 212, 0.4)",
      },
      DevOps: {
        gradient: "from-orange-600 via-red-500 to-rose-400",
        bg: "bg-orange-500",
        text: "text-orange-500",
        border: "border-orange-500/50",
        lightBg: "bg-orange-50",
        lightText: "text-orange-700",
        darkBg: "bg-orange-500/15",
        darkText: "text-orange-400",
        darkBorder: "border-orange-500/30",
        shadow: "shadow-orange-500/25",
        glow: "rgba(249, 115, 22, 0.4)",
      },
      Testing: {
        gradient: "from-pink-600 via-rose-500 to-red-400",
        bg: "bg-pink-500",
        text: "text-pink-500",
        border: "border-pink-500/50",
        lightBg: "bg-pink-50",
        lightText: "text-pink-700",
        darkBg: "bg-pink-500/15",
        darkText: "text-pink-400",
        darkBorder: "border-pink-500/30",
        shadow: "shadow-pink-500/25",
        glow: "rgba(236, 72, 153, 0.4)",
      },
      Architecture: {
        gradient: "from-indigo-600 via-violet-500 to-purple-400",
        bg: "bg-indigo-500",
        text: "text-indigo-500",
        border: "border-indigo-500/50",
        lightBg: "bg-indigo-50",
        lightText: "text-indigo-700",
        darkBg: "bg-indigo-500/15",
        darkText: "text-indigo-400",
        darkBorder: "border-indigo-500/30",
        shadow: "shadow-indigo-500/25",
        glow: "rgba(99, 102, 241, 0.4)",
      },
    };

    const getSkillColor = (category) => {
      return categoryColors[category] || categoryColors.All;
    };

    const getActiveCategoryColor = () => {
      const cat = activeCategory.value;
      const mappedCat = categoryMap[cat] || cat;
      return categoryColors[mappedCat] || categoryColors.All;
    };

    // ============================================
    // Profile Data
    // ============================================
    const profileData = {
      en: {
        name: "Shadi Akil",
        summary:
          "Accomplished and solutions-driven Senior Full Stack Developer with expertise in designing, developing, and maintaining robust and scalable web applications. Proficient in the .NET ecosystem, including ASP.NET Core and Entity Framework, with extensive front-end experience using Vue.js to create intuitive and user-centric interfaces. Adept at managing and optimizing SQL databases to ensure high performance and data integrity. Skilled in leading projects through the full development lifecycle, collaborating cross-functionally, and implementing best practices in coding standards and software architecture. Committed to continuous learning and leveraging new technologies to deliver innovative solutions and drive project success.",
      },
      ar: {
        name: "شادي عقيل",
        summary:
          "مطور Full Stack أول متميز وموجه نحو الحلول، ذو خبرة واسعة في تصميم وتطوير وصيانة تطبيقات الويب القوية والقابلة للتوسع. متمكن من منظومة .NET بما في ذلك ASP.NET Core و Entity Framework، مع خبرة واسعة في تطوير الواجهات الأمامية باستخدام Vue.js لإنشاء واجهات سهلة الاستخدام. بارع في إدارة وتحسين قواعد بيانات SQL لضمان الأداء العالي وسلامة البيانات. ماهر في قيادة المشاريع خلال دورة التطوير الكاملة، والتعاون مع الفرق المختلفة، وتطبيق أفضل الممارسات في معايير البرمجة وهندسة البرمجيات. ملتزم بالتعلم المستمر واستخدام التقنيات الجديدة لتقديم حلول مبتكرة وتحقيق نجاح المشاريع.",
      },
    };

    const profile = computed(() => profileData[lang.value]);

    // ============================================
    // Contact & Social Data
    // ============================================
    const contactList = [
      { icon: "mail", text: "shadeeaqeel00@gmail.com" },
      { icon: "phone", text: "+966 53 628 4611" },
      { icon: "map-pin", text: "Riyadh, KSA" },
      { icon: "flag", text: "Syrian" },
      { icon: "check-circle", text: "Transferable Iqama" },
    ];

    const socialLinks = [
      { icon: "github", href: "https://github.com/shadiaqeel" },
      { icon: "linkedin", href: "https://www.linkedin.com/in/shadi-akil-503456107" },
    ];

    const techStack = [
      { name: "Backend", tech: ".NET Core", icon: "server", color: "text-blue-500" },
      { name: "Frontend", tech: "Vue.js", icon: "layout", color: "text-emerald-500" },
      { name: "Database", tech: "SQL / Redis", icon: "database", color: "text-purple-500" },
      { name: "DevOps", tech: "Azure / Docker", icon: "cpu", color: "text-orange-500" },
    ];

    const careerStats = [
      { value: "6+", label: { en: "Years Experience", ar: "سنوات الخبرة" }, icon: "calendar" },
      { value: "30+", label: { en: "Technologies", ar: "تقنية" }, icon: "terminal" },
      { value: "9", label: { en: "Certificates", ar: "شهادات" }, icon: "award" },
      { value: "∞", label: { en: "Cups of Coffee", ar: "أكواب قهوة" }, icon: "coffee" },
    ];

    const summaryHighlights = [
      { en: "Full Stack Development", ar: "تطوير متكامل" },
      { en: ".NET Expert", ar: "خبير .NET" },
      { en: "Vue.js Specialist", ar: "متخصص Vue.js" },
      { en: "Team Leadership", ar: "قيادة الفريق" },
      { en: "Clean Architecture", ar: "هندسة نظيفة" },
    ];

    // ============================================
    // Experience Data
    // ============================================
    const experience = [
      {
        id: 1,
        role: "Senior Full Stack .NET Developer | Acting Team Lead",
        company: "T2 - Business Research & Development",
        logo: "imgs/t2logo.png",
        period: "Jan 2025 - Present",
        description:
          "Promoted to senior role, leading technical initiatives and mentoring team members as Acting Team Lead.",
        achievements: [
          "Acting as Team Lead, managing and coordinating team activities.",
          "Follow-up on teams' tasks and ensure timely delivery.",
          "Led the architecture and design of complex software systems.",
          "Mentored junior developers and conducted code reviews.",
          "Drove technical decisions and best practices across the team.",
          "Optimized application performance and scalability.",
        ],
      },
      {
        id: 2,
        role: "Full Stack .NET Developer",
        company: "T2 - Business Research & Development",
        logo: "imgs/t2logo.png",
        period: "Feb 2020 - Dec 2024",
        description: "A company focused on providing digital solutions and engaging services.",
        achievements: [
          "Designed and developed software systems for digital solutions.",
          "Facilitated team communication and followed up on task execution.",
          "Provided accurate time estimations for project roadmaps.",
          "Supported the Operations/Support team with critical resolutions.",
          "Researched and implemented new backend solutions.",
        ],
      },
      {
        id: 3,
        role: "Trainee Network Engineer",
        company: "Solutions by STC",
        logo: "imgs/stclogo.svg",
        period: "Jun 2018 - Dec 2018",
        description:
          "Saudi Telecom Company is a Saudi Arabia-based telecommunications company that offers landline, mobile, Internet services and computer networks.",
        achievements: [
          "Gained hands-on experience in network infrastructure and telecommunications.",
          "Assisted in network configuration and troubleshooting.",
          "Collaborated with senior engineers on network maintenance tasks.",
        ],
      },
    ];

    // ============================================
    // Education Data
    // ============================================
    const education = [
      {
        id: 1,
        degree: "Bachelor's Degree in Computer Science",
        institution: "Yarmouk University, Jordan",
        period: "2014 - 2019",
        details: "GPA: 4.0 (89.4%). Placed on the honour list for five years.",
        logo: "imgs/yu-textenORG.png",
      },
    ];

    // ============================================
    // Certifications Data
    // ============================================
    const certifications = [
      {
        name: "The Complete Microservices & Event-Driven Architecture",
        provider: "Udemy",
        category: "Architecture",
        date: "Feb 2026",
        url: "https://www.udemy.com/certificate/UC-60eec7ba-6395-4b29-aaa8-564124364e39/",
        logo: "imgs/udemy_logo.jpg",
      },
      {
        name: ".NET Aspire and GenAI Develop Distributed Architectures",
        provider: "Udemy",
        category: "Development",
        date: "Oct 2025",
        url: "https://www.udemy.com/certificate/UC-690c5332-d61d-41b7-a569-e88737616319/",
        logo: "imgs/udemy_logo.jpg",
      },
      {
        name: "Project Management with ChatGPT: AI for Project Managers",
        provider: "Udemy",
        category: "Project Management",
        date: "Jun 2025",
        url: "https://www.udemy.com/certificate/UC-45a5a5ba-0d5c-42f1-934b-bbb391cd6cea/",
        logo: "imgs/udemy_logo.jpg",
      },
      {
        name: "The Complete Agile & Scrum Project Management Course",
        provider: "Udemy",
        category: "Project Management",
        date: "Mar 2025",
        url: "https://www.udemy.com/certificate/UC-e1bd5642-77ed-43e7-a895-a80372291ef3/",
        logo: "imgs/udemy_logo.jpg",
      },
      {
        name: "Understanding Cloud Computing",
        provider: "DataCamp",
        category: "Cloud & Infrastructure",
        date: "Dec 2024",
        url: "https://www.datacamp.com/completed/statement-of-accomplishment/course/3f0a42653ebb39064eb5af4930b8f0b94f730861",
        logo: "imgs/datacampinc_logo.jpg",
      },
      {
        name: "Data Transformation in Power BI",
        provider: "DataCamp",
        category: "Data & Analytics",
        date: "Nov 2024",
        url: "https://www.datacamp.com/completed/statement-of-accomplishment/course/908f5a3bcdff40614b1e2d82cb200d6fde138d23",
        logo: "imgs/datacampinc_logo.jpg",
      },
      {
        name: "Exploratory Data Analysis in Python",
        provider: "DataCamp",
        category: "Data & Analytics",
        date: "Nov 2024",
        url: "https://www.datacamp.com/completed/statement-of-accomplishment/course/06f9781b332b73fda6b4bfdb72a41b7fbc31b75f",
        logo: "imgs/datacampinc_logo.jpg",
      },
      {
        name: "Problem Solving and Critical Thinking Skills",
        provider: "FullbridgeX (edX)",
        category: "Soft Skills",
        date: "Sep 2020",
        url: "https://courses.edx.org/certificates/fd9742952d9145be875483b0486efd3d",
        logo: "imgs/edx_logo.jpg",
      },
      {
        name: "Cisco Certified Network Professional (CCNP-RS)",
        provider: "Cisco",
        category: "Cloud & Infrastructure",
        date: "Nov 2019",
        url: "",
        logo: "imgs/cisco_logo.jpg",
      },
    ];

    // Certification grouping configuration
    const certGroupBy = Vue.ref("provider"); // "provider" or "category"

    const certProviderOrder = ["Udemy", "DataCamp", "edX", "Cisco"];
    const certProviderConfig = {
      Udemy: {
        icon: "award",
        gradient: "from-purple-500 to-purple-600",
        bgClass: "bg-purple-500/10",
        textClass: "text-purple-500",
      },
      DataCamp: {
        icon: "bar-chart",
        gradient: "from-green-500 to-green-600",
        bgClass: "bg-green-500/10",
        textClass: "text-green-500",
      },
      edX: {
        icon: "book-open",
        gradient: "from-red-500 to-red-600",
        bgClass: "bg-red-500/10",
        textClass: "text-red-500",
      },
      Cisco: {
        icon: "wifi",
        gradient: "from-blue-500 to-blue-600",
        bgClass: "bg-blue-500/10",
        textClass: "text-blue-500",
      },
    };

    const certCategoryOrder = [
      "Architecture",
      "Development",
      "Project Management",
      "Data & Analytics",
      "Cloud & Infrastructure",
      "Soft Skills",
    ];
    const certCategoryConfig = {
      Development: {
        icon: "code",
        gradient: "from-cyan-500 to-blue-600",
        bgClass: "bg-cyan-500/10",
        textClass: "text-cyan-500",
      },
      "Project Management": {
        icon: "clipboard-list",
        gradient: "from-amber-500 to-orange-600",
        bgClass: "bg-amber-500/10",
        textClass: "text-amber-500",
      },
      "Data & Analytics": {
        icon: "bar-chart",
        gradient: "from-emerald-500 to-teal-600",
        bgClass: "bg-emerald-500/10",
        textClass: "text-emerald-500",
      },
      "Cloud & Infrastructure": {
        icon: "cloud",
        gradient: "from-indigo-500 to-violet-600",
        bgClass: "bg-indigo-500/10",
        textClass: "text-indigo-500",
      },
      "Soft Skills": {
        icon: "users",
        gradient: "from-pink-500 to-rose-600",
        bgClass: "bg-pink-500/10",
        textClass: "text-pink-500",
      },
    };

    const groupedCertifications = Vue.computed(() => {
      const groups = {};
      const isProvider = certGroupBy.value === "provider";
      const order = isProvider ? certProviderOrder : certCategoryOrder;
      const config = isProvider ? certProviderConfig : certCategoryConfig;

      certifications.forEach((cert) => {
        let groupKey;
        if (isProvider) {
          groupKey = cert.provider.includes("edX") ? "edX" : cert.provider;
        } else {
          groupKey = cert.category;
        }
        if (!groups[groupKey]) {
          groups[groupKey] = [];
        }
        groups[groupKey].push(cert);
      });

      return order
        .filter((key) => groups[key])
        .map((key) => ({
          name: key,
          config: config[key],
          certs: groups[key],
        }));
    });

    const expandedCertGroups = Vue.ref(
      [...certProviderOrder, ...certCategoryOrder].reduce((acc, p) => ({ ...acc, [p]: true }), {})
    );
    const toggleCertGroup = (groupName) => {
      expandedCertGroups.value[groupName] = !expandedCertGroups.value[groupName];
    };

    // ============================================
    // Personal Data
    // ============================================
    const strengths = {
      en: [
        "Problem-solving and analytical thinking",
        "Strong attention to detail",
        "Excellent communication skills",
        "Team leadership and collaboration",
        "Adaptability and quick learning",
        "Time management and organization",
      ],
      ar: [
        "حل المشكلات والتفكير التحليلي",
        "الاهتمام الدقيق بالتفاصيل",
        "مهارات تواصل ممتازة",
        "قيادة الفريق والتعاون",
        "التكيف والتعلم السريع",
        "إدارة الوقت والتنظيم",
      ],
    };

    const languagesData = [
      { name: { en: "Arabic", ar: "العربية" }, level: { en: "Native", ar: "اللغة الأم" }, percent: 100 },
      {
        name: { en: "English", ar: "الإنجليزية" },
        level: { en: "Professional Working", ar: "مهني عملي" },
        percent: 50,
      },
    ];

    const personalSkills = {
      en: [
        "Critical Thinking",
        "Problem Solving",
        "Leadership",
        "Teamwork",
        "Communication",
        "Time Management",
        "Creativity",
        "Adaptability",
      ],
      ar: ["التفكير النقدي", "حل المشكلات", "القيادة", "العمل الجماعي", "التواصل", "إدارة الوقت", "الإبداع", "التكيف"],
    };

    // ============================================
    // Projects Data
    // ============================================
    const projects = [
      {
        id: 1,
        name: "RiCH",
        tagline: {
          en: "The Most Powerful Communication Platform in Saudi Arabia",
          ar: "أقوى منصة اتصالات في المملكة العربية السعودية",
        },
        description: {
          en: "A robust platform that helps enterprises manage and centralize all their communication in one place. By using this intuitive platform, businesses can communicate with their targeted audiences using SMS, Voice, Fax, Email, and WhatsApp in an easier and more effective way. The service is highly secure with a sophisticated encryption system to ensure confidentiality and security.",
          ar: "منصة قوية تساعد المؤسسات على إدارة ومركزة جميع اتصالاتها في مكان واحد. من خلال استخدام هذه المنصة السهلة، يمكن للشركات التواصل مع جمهورها المستهدف عبر الرسائل القصيرة والمكالمات الصوتية والفاكس والبريد الإلكتروني والواتساب بطريقة أسهل وأكثر فعالية. الخدمة آمنة للغاية مع نظام تشفير متطور لضمان السرية والأمان.",
        },
        url: "https://t2.sa/rich-en",
        status: "live",
        stats: [
          { value: "70%+", label: { en: "SMS Traffic in KSA", ar: "حركة الرسائل في السعودية" }, icon: "trending-up" },
          { value: "95%", label: { en: "Banks Coverage", ar: "تغطية البنوك" }, icon: "building" },
          { value: "5+", label: { en: "Channels", ar: "قنوات الاتصال" }, icon: "message-circle" },
        ],
        technologies: ["ASP.NET Core", "Vue.js", "SQL Server", "RabbitMQ", "Redis", "Cassandra", "Elasticsearch"],
        features: {
          en: [
            "Multi-channel communication (SMS, Voice, Fax, Email, WhatsApp)",
            "Serves almost all government sectors",
            "Enterprise-grade security & sophisticated encryption",
            "Unified platform for all communication needs",
          ],
          ar: [
            "اتصال متعدد القنوات (رسائل، صوت، فاكس، بريد، واتساب)",
            "يخدم جميع القطاعات الحكومية تقريباً",
            "أمان بمستوى المؤسسات وتشفير متطور",
            "منصة موحدة لجميع احتياجات الاتصال",
          ],
        },
      },
    ];

    // ============================================
    // Skills Data
    // ============================================
    const skillsData = [
      // Backend
      { name: "C#", category: "Backend", level: 95 },
      { name: "ASP.NET Core", category: "Backend", level: 95 },
      { name: ".NET 6", category: "Backend", level: 95 },
      { name: "Entity Framework", category: "Backend", level: 90 },
      { name: "LINQ", category: "Backend", level: 90 },
      { name: "SignalR", category: "Backend", level: 50 },
      // Frontend
      { name: "Vue.js", category: "Frontend", level: 90 },
      { name: "JavaScript", category: "Frontend", level: 85 },
      { name: "TypeScript", category: "Frontend", level: 80 },
      { name: "HTML/CSS", category: "Frontend", level: 70 },
      { name: "jQuery", category: "Frontend", level: 70 },
      // Databases
      { name: "SQL Server", category: "Database", level: 90 },
      { name: "MySQL", category: "Database", level: 60 },
      { name: "Oracle", category: "Database", level: 50 },
      { name: "Cassandra", category: "Database", level: 85 },
      // Message Brokers
      { name: "RabbitMQ", category: "Message Brokers", level: 85 },
      { name: "IBM MQ", category: "Message Brokers", level: 50 },
      { name: "Apache Kafka", category: "Message Brokers", level: 40 },
      // Search & Analytics
      { name: "Elasticsearch", category: "Search & Analytics", level: 80 },
      { name: "Apache Solr", category: "Search & Analytics", level: 70 },
      { name: "Power BI", category: "Search & Analytics", level: 75 },
      // DevOps & Tools
      { name: "Git/GitHub", category: "DevOps", level: 90 },
      { name: "Azure DevOps", category: "DevOps", level: 85 },
      { name: "Docker", category: "DevOps", level: 80 },
      { name: "Redis", category: "DevOps", level: 80 },
      { name: "JetBrains dotMemory", category: "DevOps", level: 75 },
      { name: "JetBrains dotTrace", category: "DevOps", level: 75 },
      // Testing
      { name: "NUnit", category: "Testing", level: 80 },
      { name: "Cypress", category: "Testing", level: 75 },
      { name: "Selenium", category: "Testing", level: 75 },
      // Architecture & Practices
      { name: "Clean Code", category: "Architecture", level: 90 },
      { name: "SOLID Principles", category: "Architecture", level: 90 },
      { name: "Clean Architecture", category: "Architecture", level: 80 },
      { name: "Microservices", category: "Architecture", level: 75 },
      { name: "Distributed Architecture", category: "Architecture", level: 70 },
      { name: ".NET Aspire", category: "Architecture", level: 80 },
      { name: "Generative AI", category: "Architecture", level: 60 },
    ];

    const filteredSkills = computed(() => {
      const cat = activeCategory.value;
      const mappedCat = categoryMap[cat] || cat;
      return mappedCat === "All" || cat === "الكل"
        ? skillsData
        : skillsData.filter((skill) => skill.category === mappedCat);
    });

    // ============================================
    // Return All State & Methods
    // ============================================
    return {
      darkMode,
      toggleDarkMode,
      lang,
      toggleLang,
      isRTL,
      downloadCV,
      t,
      activeCategory,
      categories,
      categoryMap,
      categoryColors,
      getSkillColor,
      getActiveCategoryColor,
      filteredSkills,
      profile,
      contactList,
      socialLinks,
      techStack,
      careerStats,
      summaryHighlights,
      experience,
      education,
      certifications,
      certGroupBy,
      groupedCertifications,
      certProviderConfig,
      certCategoryConfig,
      expandedCertGroups,
      toggleCertGroup,
      strengths,
      languagesData,
      personalSkills,
      projects,
      // Navigation
      mobileMenuOpen,
      scrollProgress,
      scrolled,
      showBackToTop,
      activeSection,
      altKeyPressed,
      navItems,
      mobileNavTabs,
      scrollToSection,
      scrollToTop,
    };
  },
});

// Mount the app
app.mount("#app");
