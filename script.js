
document.getElementById("year").textContent = new Date().getFullYear();

const DISABLE_ANIMATIONS = window.DISABLE_ANIMATIONS === true;
if (!DISABLE_ANIMATIONS) {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

// ========== NAVBAR SCROLL SHADOW ==========
const navbar = document.querySelector(".navbar-custom");
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
  
  // ========== SCROLL PROGRESS BAR ==========
gsap.to("#scroll-progress", {
  width: "100%",
  ease: "none",
  scrollTrigger: {
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
});

// ========== GRID ANIMATION ==========
gsap.to(".grid-overlay", {
  backgroundPosition: "80px 0px, 0px 80px",
  ease: "none",
  duration: 12,
  repeat: -1,
  yoyo: true
});

// ========== CURSOR GLOW ==========
const glow = document.querySelector(".cursor-glow");
if (glow) {
  const xTo = gsap.quickTo(glow, "x", { duration: 0.18, ease: "power3.out" });
  const yTo = gsap.quickTo(glow, "y", { duration: 0.18, ease: "power3.out" });
  
  window.addEventListener("mousemove", (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
    gsap.to(glow, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto"
    });
  });
}

// ========== HERO TEXT SPLIT ANIMATION ==========
const heroSplit = new SplitType(".split-heading", {
  types: "words,chars"
});

gsap.set(heroSplit.chars, { opacity: 0, y: 40, rotateX: 40 });

function playHeroAnimations() {
  gsap.to(heroSplit.chars, {
    opacity: 1,
    y: 0,
    rotateX: 0,
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.03
  });

  gsap.from(".hero-tag", {
    opacity: 0,
    y: 20,
    duration: 0.7,
    ease: "power3.out",
    delay: 0.15
  });

  gsap.from(".hero-subtitle", {
    opacity: 0,
    y: 20,
    duration: 0.9,
    ease: "power3.out",
    delay: 0.4
  });

  gsap.from(".hero-badges", {
    opacity: 0,
    y: 20,
    duration: 0.9,
    ease: "power3.out",
    delay: 0.55
  });

  gsap.from(".hero-anim .btn", {
    opacity: 0,
    y: 12,
    duration: 0.7,
    ease: "power3.out",
    delay: 0.7,
    stagger: 0.06
  });

  gsap.from(".hero-socials .social-icon", {
    opacity: 0,
    y: 10,
    duration: 0.6,
    ease: "power3.out",
    delay: 0.85,
    stagger: 0.08
  });

  gsap.from(".hero-card", {
    opacity: 0,
    x: 40,
    duration: 1,
    ease: "power3.out",
    delay: 0.6
  });
}

// Floating blobs animation
gsap.to(".blob-1", {
  x: 28,
  y: 18,
  scale: 1.06,
  duration: 6,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

gsap.to(".blob-2", {
  x: -24,
  y: -16,
  scale: 1.07,
  duration: 7,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

// ========== SCROLL REVEAL (generic) ==========
document.querySelectorAll(".reveal-up").forEach((el) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none reverse"
    },
    y: 60,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out"
  });
});

// ========== SECTION TITLE SPLIT REVEALS ==========
document.querySelectorAll(".section-title").forEach((title) => {
  const splitTitle = new SplitType(title, { types: "chars" });
  gsap.from(splitTitle.chars, {
    scrollTrigger: {
      trigger: title,
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    y: 30,
    opacity: 0,
    rotateX: 40,
    stagger: 0.02,
    duration: 0.6,
    ease: "power3.out"
  });
});

// ========== SECTION CLIPPATH REVEALS ==========
document.querySelectorAll("section").forEach((sec) => {
  gsap.from(sec, {
    scrollTrigger: {
      trigger: sec,
      start: "top 90%",
      toggleActions: "play none none reverse"
    },
    clipPath: "inset(18% 20% 18% 20%)",
    scale: 0.98,
    duration: 0.8,
    ease: "power2.out"
  });
});

// ========== SKILL BARS ==========
document.querySelectorAll(".skill-progress-fill").forEach((bar) => {
  const value = bar.getAttribute("data-skill");
  gsap.fromTo(
    bar,
    { width: "0%" },
    {
      width: value + "%",
      duration: 1.2,
      ease: "back.out(1.6)",
      scrollTrigger: {
        trigger: bar,
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    }
  );
});

// ========== PARALLAX BLOCKS ==========
document.querySelectorAll(".parallax-block").forEach((block) => {
  const amount = block.dataset.parallax || 20;
  gsap.to(block, {
    y: amount,
    ease: "none",
    scrollTrigger: {
      trigger: block,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});

// ========== 3D TILT ==========
document.querySelectorAll(".tilt").forEach((card) => {
  const handleMove = (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = gsap.utils.mapRange(0, rect.width, -12, 12, x);
    const rotateX = gsap.utils.mapRange(0, rect.height, 10, -10, y);
    gsap.to(card, {
      duration: 0.5,
      rotateX,
      rotateY,
      transformPerspective: 900,
      transformOrigin: "center center",
      ease: "power2.out"
    });
  };
  const handleLeave = () => {
    gsap.to(card, {
      duration: 0.6,
      rotateX: 0,
      rotateY: 0,
      ease: "power3.out"
    });
  };
  card.addEventListener("mousemove", handleMove);
  card.addEventListener("mouseleave", handleLeave);
});

// ========== TIMELINE ADVANCED ANIMATION ==========
const timelineProgress = document.querySelector("#experience .timeline-progress");
if (timelineProgress) {
  gsap.fromTo(
    timelineProgress,
    { height: 0 },
    {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: "#experience .timeline",
        start: "top 70%",
        end: "bottom 20%",
        scrub: true
      }
    }
  );
}

gsap.from("#experience .timeline-item", {
  scrollTrigger: {
    trigger: "#experience .timeline",
    start: "top 75%",
    end: "bottom 30%",
    scrub: true
  },
  x: -40,
  opacity: 0,
  rotateY: -10,
  ease: "power2.out"
});

gsap.to("#experience .timeline-dot", {
  scale: 1.15,
  duration: 1,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1,
  scrollTrigger: {
    trigger: "#experience .timeline",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play pause resume reset"
  }
});

// ========== PROJECT CARDS BATCH ANIMATION (rotateZ + scale) ==========
// ScrollTrigger.batch(".project-card", {
  //   start: "top 80%",
  //   onEnter: (batch) => {
    //     gsap.from(batch, {
      //       y: 60,
      //       opacity: 0,
      //       rotateZ: 6,
      //       scale: 0.9,
      //       duration: 0.8,
      //       ease: "power3.out",
//       stagger: 0.08
//     });
//   },
//   onLeaveBack: (batch) => {
//     gsap.to(batch, {
  //       y: 40,
  //       opacity: 0,
  //       rotateZ: -6,
  //       scale: 0.9,
//       duration: 0.5,
//       ease: "power2.in"
//     });
//   }
// });

// ========== CONTACT SECTION CUSTOM ANIMATIONS ==========
gsap.from("#contact .contact-left", {
  scrollTrigger: {
    trigger: "#contact .contact-left",
    start: "top 85%",
    toggleActions: "play none none reverse"
  },
  x: -40,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out"
});

gsap.from("#contact .contact-form-card", {
  scrollTrigger: {
    trigger: "#contact .contact-form-card",
    start: "top 85%",
    toggleActions: "play none none reverse"
  },
  y: 60,
  opacity: 0,
  filter: "blur(20px)",
  duration: 0.9,
  ease: "power3.out"
});

gsap.to("#contact .contact-icon", {
  y: 6,
  duration: 1.8,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  stagger: 0.2
});

// ========== ABOUT SECTION CUSTOM ANIMATIONS ==========
gsap.from("#about .about-left", {
  scrollTrigger: {
    trigger: "#about .about-left",
    start: "top 85%",
    toggleActions: "play none none reverse"
  },
  x: -40,
  opacity: 0,
  rotateX: 10,
  duration: 0.8,
  ease: "power3.out"
});

gsap.from("#about .about-right .glass-card", {
  scrollTrigger: {
    trigger: "#about .about-right .glass-card",
    start: "top 85%",
    toggleActions: "play none none reverse"
  },
  x: 40,
  opacity: 0,
  rotateY: -10,
  duration: 0.9,
  ease: "power3.out"
});

// ========== SKILLS SECTION CUSTOM ANIMATIONS ==========
gsap.from("#skills .skills-left .glass-card", {
  scrollTrigger: {
    trigger: "#skills .skills-left .glass-card",
    start: "top 85%",
    toggleActions: "play none none reverse"
  },
  scale: 0.96,
  y: 40,
  opacity: 0,
  duration: 0.8,
  ease: "back.out(1.6)"
});

gsap.from("#skills .skills-right .glass-card", {
  scrollTrigger: {
    trigger: "#skills .skills-right .glass-card",
    start: "top 85%",
    toggleActions: "play none none reverse"
  },
  scale: 0.96,
  y: 40,
  opacity: 0,
  duration: 0.85,
  delay: 0.1,
  ease: "back.out(1.6)"
});

// ========== EXPERIENCE RIGHT CARD ==========
gsap.from("#experience .experience-right .glass-card", {
  scrollTrigger: {
    trigger: "#experience .experience-right .glass-card",
    start: "top 85%",
    toggleActions: "play none none reverse"
  },
  x: 40,
  opacity: 0,
  rotateY: 10,
  duration: 0.8,
  ease: "power3.out"
});

// ========== THEME TOGGLE ==========
const themeButtons = document.querySelectorAll(".btn-theme-toggle");
const bodyEl = document.body;

function applyTheme(mode) {
  bodyEl.classList.remove("light-theme", "dark-theme");
  bodyEl.classList.add(mode + "-theme");
  localStorage.setItem("portfolio-theme", mode);
  themeButtons.forEach((btn) => {
    btn.innerHTML =
      mode === "dark"
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
      });
}

const storedTheme = localStorage.getItem("portfolio-theme") || "dark";
applyTheme(storedTheme);

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const next = bodyEl.classList.contains("dark-theme") ? "light" : "dark";
    applyTheme(next);
  });
});

// ========== NAV + SIDE DOT ACTIVE STATE ==========
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");
const dots = document.querySelectorAll(".section-dot");
const navLinkArr = Array.from(navLinks);

function setActiveById(currentId) {
  navLinkArr.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentId) {
      link.classList.add("active");
    }
  });

  dots.forEach((dot) => {
    dot.classList.remove("active");
    if (dot.dataset.target === "#" + currentId) {
      dot.classList.add("active");
    }
  });
}

function handleScrollActive() {
  let currentId = "hero";
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom > 120) {
      currentId = section.id;
    }
  });
  setActiveById(currentId);
}

window.addEventListener("scroll", handleScrollActive);
handleScrollActive();

// Click scroll on nav/dots
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth"
        });
      }
    }
    const bsCollapse = document.querySelector(".navbar-collapse.show");
    if (bsCollapse) {
      new bootstrap.Collapse(bsCollapse, { toggle: true });
    }
  });
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const selector = dot.dataset.target;
    const target = document.querySelector(selector);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: "smooth"
      });
    }
  });
});

// ========== SCROLL HUD (BAR + % + BADGE) ==========
const hudFill = document.querySelector(".scroll-hud-bar-fill");
const hudPercent = document.querySelector(".scroll-hud-percent");
const hudBadge = document.querySelector(".scroll-hud-badge");

ScrollTrigger.create({
  trigger: document.body,
  start: "top top",
  end: "bottom bottom",
  scrub: true,
  onUpdate: (self) => {
    const p = Math.round(self.progress * 100);

    if (hudFill) {
      gsap.to(hudFill, {
        height: p + "%",
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto"
      });
    }
    if (hudPercent) {
      hudPercent.textContent = p + "%";
    }
    if (hudBadge) {
      hudBadge.textContent = p + "%";
      gsap.to(hudBadge, {
        scale: 1 + Math.min(Math.abs(self.getVelocity()) / 2000, 0.35),
        duration: 0.25,
        ease: "power2.out"
      });
    }
  }
});

// ========== BACK TO TOP BUTTON ==========
const backToTop = document.getElementById("backToTop");
if (backToTop) {
  const showTl = gsap.timeline({ paused: true });
  showTl.fromTo(
    backToTop,
    {
      opacity: 0,
      y: 40,
      scale: 0.5,
      rotate: -20,
      pointerEvents: "none"
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      pointerEvents: "auto",
      duration: 0.45,
      ease: "back.out(1.7)"
    }
  );

  ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      if (self.progress > 0.3) {
        showTl.play();
      } else {
        showTl.reverse();
      }
    }
  });

  backToTop.addEventListener("click", () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: 0 },
      ease: "power3.inOut"
    });
  });
}

// ========== PRELOADER ==========

(function () {
  // --- CONFIG ---
  const cycleImages = ["assets/PAVAN.png", "assets/logo.png"];
  const cycleIntervalMs = 1000;
  
  // --- STATE ---
  let imgIndex = 0;
  let cycleInterval = null;
  
  // --- FUNCTIONS (defined before use) ---
  function startLogoCycle() {
    const img = document.getElementById("preLogo");
    if (!img) return;
    
    // clear any previous interval (safety)
    if (cycleInterval) clearInterval(cycleInterval);
    
    cycleInterval = setInterval(() => {
      // use GSAP if available for smooth fades, fallback to simple opacity
      if (typeof gsap !== "undefined") {
        gsap.to(img, {
          opacity: 0,
          duration: 0.22,
          onComplete: () => {
            imgIndex = (imgIndex + 1) % cycleImages.length;
            img.src = cycleImages[imgIndex];
            gsap.to(img, { opacity: 1, duration: 0.22 });
          }
        });
      } else {
        // fallback: simple DOM fade
        img.style.transition = "opacity 0.22s ease";
        img.style.opacity = 0;
        setTimeout(() => {
          imgIndex = (imgIndex + 1) % cycleImages.length;
          img.src = cycleImages[imgIndex];
          img.style.opacity = 1;
        }, 230);
      }
    }, cycleIntervalMs);
  }

  function stopLogoCycle() {
    if (cycleInterval) {
      clearInterval(cycleInterval);
      cycleInterval = null;
    }
  }

  // expose to window in case something calls globally (optional)
  window.startLogoCycle = startLogoCycle;
  window.stopLogoCycle = stopLogoCycle;

  // --- PRELOADER + GSAP TIMELINE ---
  window.addEventListener("load", function () {
    // Start cycling immediately
    startLogoCycle();
    
    // safety: get preloader elements
    const preLogoImg = document.getElementById("preLogo");
    const preloaderBar = document.querySelector(".preloader-bar");
    const preloaderText = document.querySelector(".preloader-text");
    const preloader = document.getElementById("preloader");

    // If GSAP exists, run timeline; otherwise run a fallback hide
    if (typeof gsap !== "undefined" && preloader) {
      const tlPre = gsap.timeline({
        onComplete: () => {
          stopLogoCycle();
          // call your hero animations if defined
          if (typeof playHeroAnimations === "function") playHeroAnimations();
        }
      });
      
      tlPre
      .from(preLogoImg, {
        opacity: 0,
        scale: 0.4,
        duration: 0.5,
        ease: "back.out(1.7)"
      })
        .from(
          preloaderText,
          {
            opacity: 0,
            y: 20,
            duration: 0.4,
            ease: "power2.out"
          },
          "-=0.2"
        )
        .fromTo(
          preloaderBar,
          { width: "0%" },
          {
            width: "100%",
            duration: 1.1,
            ease: "power2.out"
          }
        )
        .to(preloader, {
          y: "-100%",
          duration: 0.8,
          ease: "power3.inOut",
          delay: 0.1
        })
        .set(preloader, { display: "none" });
      } else {
        // fallback: stop cycle and hide preloader after short delay
        setTimeout(() => {
          stopLogoCycle();
          if (preloader) preloader.style.display = "none";
          if (typeof playHeroAnimations === "function") playHeroAnimations();
        }, 1400);
      }
  });
})();

// ========= GOOGLE ANALYTICS EVENT FOR RESUME DOWNLOAD ==========

// /assets/js/main.js
document.addEventListener("DOMContentLoaded", function () {

  function sendGAEvent(eventName, label) {
    try {
      if (typeof gtag === "function") {
        gtag("event", eventName, {
          event_category: "engagement",
          event_label: label
        });
      } else {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: eventName,
          event_category: "engagement",
          event_label: label
        });
      }
    } catch (e) {
      console.warn("GA event error:", e);
    }
  }

  // Resume Tracking
  document.querySelectorAll(".track-resume").forEach(btn => {
    btn.addEventListener("click", function () {
      sendGAEvent("resume_download", "Resume Download");
    });
  });

  // Project Tracking
  document.querySelectorAll(".track-project").forEach(btn => {
    btn.addEventListener("click", function () {
      sendGAEvent("project_visit", btn.href);
    });
  });

});

// Google Analytics (CSP SAFE)
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag("js", new Date());
gtag("config", "G-99DFNGDZJ0");
// ========== SPLITTYPE CHAR STYLE OBSERVER (for performance mode) ==========
document.querySelectorAll(".char").forEach(char => {
  const observer = new MutationObserver(() => {
    char.style.transform = "none";
    // deletes inline CSS fully
  });

  observer.observe(char, {
    attributes: true,
    attributeFilter: ["style"]
  });
  
});


