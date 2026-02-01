/**
 * Google Analytics Tracking Module
 * Author: Shadi Akil
 * Description: Shared analytics functionality for portfolio and CV pages
 */

// Initialize dataLayer
window.dataLayer = window.dataLayer || [];

/**
 * Google Analytics gtag function
 */
function gtag() {
  dataLayer.push(arguments);
}

/**
 * Detect device type based on viewport width
 * @returns {string} 'mobile' | 'tablet' | 'desktop'
 */
function getDeviceType() {
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

/**
 * Get viewport size string
 * @returns {string} Format: 'WIDTHxHEIGHT'
 */
function getViewportSize() {
  return `${window.innerWidth}x${window.innerHeight}`;
}

/**
 * Initialize Google Analytics with page configuration
 * @param {string} pageTitle - Title of the page
 */
function initAnalytics(pageTitle) {
  gtag("js", new Date());
  gtag("config", "G-JLKJH9GSHB", {
    page_title: pageTitle,
    page_location: window.location.href,
    custom_map: {
      dimension1: "referrer_source",
      dimension2: "device_type",
      dimension3: "viewport_size",
    },
  });
}

/**
 * Track a custom event
 * @param {string} eventName - Name of the event
 * @param {Object} params - Event parameters
 */
function trackEvent(eventName, params = {}) {
  gtag("event", eventName, {
    event_category: params.category || "interaction",
    event_label: params.label || eventName,
    ...params,
  });
}

/**
 * Track page view with context
 * @param {string} pageName - Name of the page being viewed
 */
function trackPageView(pageName) {
  trackEvent(`view_${pageName}`, {
    event_category: "engagement",
    event_label: `${pageName} Page Viewed`,
    referrer_source: document.referrer || "direct",
    device_type: getDeviceType(),
    viewport_size: getViewportSize(),
  });
}

/**
 * Setup time spent tracking
 * @param {string} pageName - Name of the page
 * @returns {number} Start timestamp for reference
 */
function setupTimeTracking(pageName) {
  const startTime = Date.now();

  window.addEventListener("beforeunload", () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    trackEvent(`${pageName}_time_spent`, {
      event_category: "engagement",
      event_label: `Time on ${pageName} Page`,
      value: timeSpent,
    });
  });

  return startTime;
}

/**
 * Setup scroll depth tracking with milestones
 */
function setupScrollTracking() {
  const scrollMilestones = { 25: false, 50: false, 75: false, 100: false };

  window.addEventListener("scroll", () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    [25, 50, 75, 100].forEach((milestone) => {
      if (scrollPercent >= milestone && !scrollMilestones[milestone]) {
        scrollMilestones[milestone] = true;
        trackEvent("scroll_depth", {
          event_category: "engagement",
          event_label: `Scrolled ${milestone}%`,
          value: milestone,
        });
      }
    });
  });
}

/**
 * Setup section visibility tracking with IntersectionObserver
 * @param {string[]} sectionIds - Array of section IDs to track
 */
function setupSectionTracking(sectionIds) {
  const viewedSections = new Set();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !viewedSections.has(entry.target.id)) {
          viewedSections.add(entry.target.id);
          trackEvent("section_view", {
            event_category: "engagement",
            event_label: entry.target.id,
            section_name: entry.target.id,
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sectionIds.forEach((id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
}

/**
 * Setup outbound link tracking
 */
function setupOutboundLinkTracking() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[href]");
    if (link) {
      const href = link.getAttribute("href");
      if (href && (href.startsWith("http") || href.startsWith("mailto:"))) {
        let linkType = "external";
        if (href.includes("linkedin.com")) linkType = "linkedin";
        else if (href.includes("github.com")) linkType = "github";
        else if (href.startsWith("mailto:")) linkType = "email";

        trackEvent("outbound_click", {
          event_category: "engagement",
          event_label: href,
          link_type: linkType,
          link_url: href,
        });
      }
    }
  });
}

// Export helper functions for Vue app
window.trackEvent = trackEvent;

window.trackDarkModeToggle = (isDark) => {
  trackEvent("dark_mode_toggle", {
    event_category: "preference",
    event_label: isDark ? "Dark Mode Enabled" : "Dark Mode Disabled",
    dark_mode: isDark,
  });
};

window.trackLanguageToggle = (lang) => {
  trackEvent("language_toggle", {
    event_category: "preference",
    event_label: `Language: ${lang}`,
    language: lang,
  });
};

window.trackCVDownload = () => {
  trackEvent("cv_download", {
    event_category: "conversion",
    event_label: "CV Downloaded from Portfolio",
  });
};

window.trackNavigation = (section) => {
  trackEvent("navigation_click", {
    event_category: "navigation",
    event_label: section,
    destination_section: section,
  });
};

window.trackSkillCategory = (category) => {
  trackEvent("skill_category_view", {
    event_category: "engagement",
    event_label: category,
    skill_category: category,
  });
};

window.trackProjectClick = (projectName, projectUrl) => {
  trackEvent("project_click", {
    event_category: "conversion",
    event_label: projectName,
    project_name: projectName,
    project_url: projectUrl,
  });
};

window.trackCertificationClick = (certName) => {
  trackEvent("certification_click", {
    event_category: "engagement",
    event_label: certName,
    certification_name: certName,
  });
};
