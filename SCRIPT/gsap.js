
// ============================================
// GSAP + ScrollTrigger — Hero Section Animations
// ============================================

{
  gsap.registerPlugin(ScrollTrigger);

  // ---------- Helper: Wrap each <br>-separated line ----------
  function wrapHeroLines(element) {
    const html = element.innerHTML;
    const lines = html.split(/<br\s*\/?>/i);
    element.innerHTML = lines
      .map(
        (line) =>
          `<span class="hero-line"><span class="hero-line-inner">${line}</span></span>`
      )
      .join("");
    return element.querySelectorAll(".hero-line-inner");
  }

  // ---------- Hero Entrance Timeline ----------
  const heroTl = gsap.timeline({
    defaults: { ease: "power3.out" },
  });

  // 1. Title — line-by-line slide up with 3D rotation
  const hockTitle = document.querySelector(".hock-title");
  if (hockTitle) {
    const titleInners = wrapHeroLines(hockTitle);
    heroTl.from(titleInners, {
      yPercent: 120,
      opacity: 0,
      rotationX: -45,
      transformOrigin: "center bottom",
      duration: 1.4,
      stagger: 0.15,
      ease: "power4.out",
    });
  }

  // 2. Subtitle — clip-path reveal + fade up
  const hockText = document.querySelector(".hock-text");
  if (hockText) {
    heroTl.from(
      hockText,
      {
        opacity: 0,
        y: 40,
        clipPath: "inset(0 0 100% 0)",
        duration: 1,
        ease: "power3.out",
      },
      "-=0.7"
    );
  }

  // 3. Email button — scale pop-in with bounce
  const emailLink = document.querySelector(".email-link");
  if (emailLink) {
    heroTl.from(
      emailLink,
      {
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        ease: "back.out(2)",
      },
      "-=0.5"
    );
  }

  // 4. Chat button — scale pop-in with bounce
  const chatLink = document.querySelector(".chat-link");
  if (chatLink) {
    heroTl.from(
      chatLink,
      {
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        ease: "back.out(2)",
      },
      "-=0.65"
    );
  }

  // 5. Welcome text — fade up
  const wellcomeText = document.querySelector(".wellcome-text");
  if (wellcomeText) {
    heroTl.from(
      wellcomeText,
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.3"
    );
  }

  // 6. Scroll indicator — bounce-in from above
  const scrollBox = document.querySelector(".scroll-box");
  if (scrollBox) {
    heroTl.from(
      scrollBox,
      {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: "bounce.out",
      },
      "-=0.1"
    );
  }

  // ---------- ScrollTrigger: Hero Parallax Fade-out ----------
  gsap.to(".hock-container", {
    y: -120,
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: 1.5,
    },
  });

  gsap.to(".main-scroll-box", {
    y: 60,
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "60% top",
      scrub: 1,
    },
  });
}

// ============================================
// GSAP + ScrollTrigger — About Section Animations
// ============================================

{
  gsap.registerPlugin(ScrollTrigger);

  // ---------- 1. About Title — Word-by-Word 3D Stagger ----------
  const titleWords = gsap.utils.toArray(".gsap-word");

  if (titleWords.length) {
    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-title",
        start: "top 85%",
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
        each: 0.07,
        from: "start",
      },
    });
  }

  // ---------- 2. About Text — Line-by-Line Clip Reveal ----------
  const textLines = gsap.utils.toArray(".gsap-line");

  if (textLines.length) {
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-text",
        start: "top 85%",
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
  }

  // ---------- 3. H2 Container — Scale + Border Expand ----------
  const h2Container = document.querySelector(".h2-conatainer");

  if (h2Container) {
    const h2Tl = gsap.timeline({
      scrollTrigger: {
        trigger: h2Container,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    h2Tl
      .from(h2Container, {
        scaleX: 0,
        transformOrigin: "center center",
        duration: 0.6,
        ease: "power4.out",
      })
      .from(
        h2Container.querySelector("h2"),
        {
          opacity: 0,
          y: 30,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.15"
      );
  }

  // ---------- 4. Words Container — Staggered Paragraph Rise ----------
  const wordsContainers = gsap.utils.toArray(".words-container");

  wordsContainers.forEach((container, index) => {
    const paragraphs = container.querySelectorAll("p");

    if (paragraphs.length) {
      gsap.from(paragraphs, {
        opacity: 0,
        y: 50,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: container,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }
  });

  // ---------- 5. Advantages Boxes — 3D Perspective Stagger ----------
  const advantageBoxes = gsap.utils.toArray(".advantages-content");

  if (advantageBoxes.length) {
    gsap.from(advantageBoxes, {
      opacity: 0,
      y: 100,
      transformPerspective: 800,
      transformOrigin: "left center",
      duration: 1,
      ease: "back.out(1.4)",
      stagger: {
        each: 0.2,
        from: "start",
      },
      scrollTrigger: {
        trigger: ".advantages-main-container",
        start: "top 50%",
        toggleActions: "play none none none",
      },
    });
  }

  // ---------- 6. Explain Title — Overlay Slide Reveal + ? Slide-in ----------
  const explainSpans = document.querySelectorAll(".explain-title > span");

  explainSpans.forEach((span, i) => {
    // Skip the "?" span — it gets its own slide-in animation
    const isQuestionMark =
      span.textContent.trim() === "?" &&
      span === explainSpans[explainSpans.length - 1];
    if (isQuestionMark) return;

    // Create a real overlay div inside the span
    const overlay = document.createElement("div");
    overlay.classList.add("span-overlay");
    span.appendChild(overlay);

    // Animate the overlay sliding from left to right (off-screen)
    gsap.to(overlay, {
      xPercent: 100,
      duration: 0.4,
      delay: i * 0.2,
      ease: "power2.in",
      scrollTrigger: {
        trigger: ".explain-container",
        start: "top 65%",
        toggleActions: "play none none none",
      },
    });
  });

  // "?" — slides in from left after the last overlay disappears
  const questionMark = document.querySelector(
    ".explain-title > span:last-child"
  );

  if (questionMark && questionMark.textContent.trim() === "?") {
    gsap.from(questionMark, {
      opacity: 0,
      x: -150,
      duration: 0.35,
      delay: 1.4,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".explain-container",
        start: "top 65%",
        toggleActions: "play none none none",
      },
    });
  }
}

// ============================================
// GSAP + ScrollTrigger — Terminal Box Pin & Scrub
// ============================================

// {
//   const terminalContainer = document.querySelector(".explain-container");
//   const phrases = gsap.utils.toArray(".phrase");

//   if (terminalContainer && phrases.length) {
//     // Initial state: hide phrases
//     gsap.set(phrases, { opacity: 0, y: 20 });

//     const terminalTl = gsap.timeline({
//       scrollTrigger: {
//         trigger: ".explain-wrapper",
//         start: "center center",
//         end: "+=150%", // Scroll distance for pinning
//         pin: terminalContainer,
//         anticipatePin: 1, // Fixes sudden jumping upon pin
//         scrub: 0.5, // Add a little smoothness to the scrub
//       },
//     });

//     // Stagger phrases reveal tied to scroll
//     terminalTl.to(phrases, {
//       opacity: 1,
//       y: 0,
//       stagger: 1,
//       duration: 1,
//       ease: "power2.out"
//     });
//   }
// }

// // Ensure triggers are calculated in DOM order because the DOM order was changed
// ScrollTrigger.sort();
