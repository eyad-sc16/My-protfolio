"use strict";

const advantagesContent = document.querySelectorAll(".advantages-content");
const innerContent = document.querySelectorAll(".inner-advantges-content");
const contentArrowBox = document.querySelectorAll(".arrow-container");
const contentTitle = document.querySelectorAll(".title-text");
const hoverWord = document.querySelectorAll(".hover-word-container ");

for (let i = 0; i < advantagesContent.length; i++) {
  advantagesContent[i].addEventListener("click", function () {
    innerContent[i].classList.toggle("inner-open");
    contentArrowBox[i].classList.toggle("rotate");
    contentTitle[i].classList.toggle("hidden");
    hoverWord[i].classList.toggle("hidden");
  });
}

// ============================================
// GSAP + ScrollTrigger — About Section Animations
// ============================================

gsap.registerPlugin(ScrollTrigger);

// ---------- Global Defaults ----------
gsap.defaults({
  ease: "power3.out",
  duration: 0.8,
});

// ---------- Hero Section — Entry Animation ----------
const heroTl = gsap.timeline({ delay: 0.3 });

heroTl
  .from("h1", {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
  })
  .from(
    ".scroll-box",
    {
      y: 30,
      opacity: 0,
      duration: 0.6,
    },
    "-=0.3",
  );

// ---------- About Title — Word-by-Word Stagger ----------
const titleWords = gsap.utils.toArray(".gsap-word");

const titleTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".about-title",
    start: "top 85%",
    end: "top 20%",
    toggleActions: "play none none none",
  },
});

titleTl.from(titleWords, {
  opacity: 0,
  y: 80,
  rotationX: -90,
  transformOrigin: "center bottom",
  duration: 1,
  ease: "power4.out",
  stagger: {
    each: 0.08,
    from: "start",
  },
});

// ---------- About Text — Line-by-Line Reveal ----------
const textLines = gsap.utils.toArray(".gsap-line");

const textTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".about-text",
    start: "top 85%",
    end: "top 30%",
    toggleActions: "play none none none",
  },
});

textTl.from(textLines, {
  opacity: 0,
  y: 40,
  clipPath: "inset(0 0 100% 0)",
  duration: 0.9,
  ease: "power3.out",
  stagger: 0.15,
});

// ---------- Pixel Image Container — Slide + Scale ----------
const imageTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".main-about-content",
    start: "top 80%",
    end: "top 20%",
    toggleActions: "play none none none",
  },
});

imageTl.from(".pixle-image-container", {
  opacity: 0,
  x: -80,
  scale: 0.85,
  duration: 1.2,
  ease: "power4.out",
});

// ---------- Cards Section Title ----------
const cardsTitleTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".h2-conatainer",
    start: "top 85%",
    end: "top 20%",
    toggleActions: "play none none none",
  },
});

cardsTitleTl.from(".h2-conatainer", {
  opacity: 0,
  y: 50,
  duration: 0.8,
  ease: "power3.out",
});

// ---------- Cards — Staggered 3D Entrance ----------
const cards = gsap.utils.toArray(".card");

const cardsTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".h2-conatainer",
    start: "top 75%",
    end: "top 15%",
    toggleActions: "play none none none",
  },
});

cardsTl.from(cards, {
  opacity: 0,
  y: 100,
  rotationY: 15,
  scale: 0.9,
  transformPerspective: 800,
  transformOrigin: "center center",
  duration: 1,
  ease: "back.out(1.4)",
  stagger: {
    each: 0.2,
    from: "start",
  },
});

// ---------- Cards — Hover Magnetic Effect ----------
cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      scale: 1.06,
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.25)",
      duration: 0.4,
      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      scale: 1,
      boxShadow: "0 0px 0px rgba(0, 0, 0, 0)",
      rotationY: 0,
      rotationX: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  });

  // Magnetic tilt on mouse move
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(card, {
      rotationY: (x / rect.width) * 12,
      rotationX: -(y / rect.height) * 12,
      transformPerspective: 600,
      duration: 0.3,
      ease: "power1.out",
    });
  });
});

// ---------- Smooth Parallax on Scroll (About Section) ----------
gsap.to(".pixle-image-container", {
  y: -40,
  ease: "none",
  scrollTrigger: {
    trigger: ".about-section",
    start: "top bottom",
    end: "bottom top",
    scrub: 1.5,
  },
});

gsap.to(".center-content", {
  y: -25,
  ease: "none",
  scrollTrigger: {
    trigger: ".about-section",
    start: "top bottom",
    end: "bottom top",
    scrub: 2,
  },
});

// ---------- Words Container — "And" Reveal on Scroll ----------
const paragraphs = document.querySelectorAll(".words-container p");
paragraphs.forEach((p) => {
  const words = p.textContent.split(" ");
  const wrappedWords = words.map((word) => {
    if (word.toLowerCase() === "and") {
      return `<span class="and-word">${word}</span>`;
    }
    return word;
  });
  p.innerHTML = wrappedWords.join(" ");
});

// Animate 'And' words (Fade & Slide in)
gsap.from(".and-word", {
  opacity: 0,
  y: -20,
  ease: "none",
  stagger: 0.1,
  scrollTrigger: {
    trigger: ".words-container",
    start: "top 80%",
    end: "bottom 50%",
    scrub: true,
  },
});

// ---------- Advantages Boxes — Staggered Entrance ----------
gsap.from(".advantages-content", {
  opacity: 0,
  y: 40,
  duration: 0.8,
  ease: "power3.out",
  stagger: 0.15,
  scrollTrigger: {
    trigger: ".general-advantage-container",
    start: "top 80%",
    toggleActions: "play reverse play reverse",
  },
});

// ---------- Header Reveal on Scroll ----------
gsap.set("header", { y: -50 });
gsap.to("header", {
  opacity: 1,
  y: 0,
  scrollTrigger: {
    trigger: ".about-section",
    start: "top 50%", // starts revealing when top of about-section reaches 50% of viewport
    end: "top 20%", // fully revealed when it reaches 20% of viewport
    scrub: true,
    toggleClass: { targets: "header", className: "nav-active" },
  },
});
