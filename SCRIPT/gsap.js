
// ============================================
// GSAP + ScrollTrigger — Hero Section
// ============================================

{
  gsap.registerPlugin(ScrollTrigger);

  // ---------- Helper: wrap <br>-separated lines ----------
  function wrapHeroLines(el) {
    const html = el.innerHTML;
    const lines = html.split(/<br\s*\/?>/i);
    el.innerHTML = lines
      .map(
        (l) =>
          `<span class="hero-line"><span class="hero-line-inner">${l}</span></span>`
      )
      .join("");
    return el.querySelectorAll(".hero-line-inner");
  }

  // ---------- Create decorative line ----------
  const heroSection = document.querySelector(".hero-section");
  const decorLine = document.createElement("div");
  decorLine.classList.add("hero-decor-line");
  heroSection.querySelector(".hock-container").prepend(decorLine);
  gsap.set(decorLine, { scaleX: 0 });

  // ---------- Initial states ----------
  const titleEl = document.querySelector(".hock-title");
  const titleInners = titleEl ? wrapHeroLines(titleEl) : [];

  gsap.set(titleInners, { yPercent: -110 });
  gsap.set(".hock-text", { clipPath: "inset(0 50% 0 50%)", opacity: 0 });
  gsap.set(".email-link", { x: -80, opacity: 0 });
  gsap.set(".chat-link", { x: 80, opacity: 0 });
  gsap.set(".wellcome-text", { clipPath: "inset(0 50% 0 50%)", opacity: 0 });
  gsap.set(".scroll-box", { opacity: 0 });

  // ---------- Timeline ----------
  const tl = gsap.timeline({ delay: 0.3 });

  // 1. Decorative line draws from center
  tl.to(decorLine, { scaleX: 1, duration: 0.8, ease: "power3.inOut" });

  // 2. Title words drop in from above
  if (titleInners.length) {
    tl.to(titleInners, {
      yPercent: 0,
      duration: 1,
      stagger: 0.1,
      ease: "bounce.out",
    }, "-=0.3");
  }

  // 3. Subtitle expands from center
  tl.to(".hock-text", {
    clipPath: "inset(0 0% 0 0%)",
    opacity: 1,
    duration: 0.8,
    ease: "power3.inOut",
  }, "-=0.5");

  // 4. Buttons slide in from opposite sides
  tl.to(".email-link", { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.4");
  tl.to(".chat-link", { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.6");

  // 5. Welcome text expands from center
  tl.to(".wellcome-text", {
    clipPath: "inset(0 0% 0 0%)",
    opacity: 1,
    duration: 0.8,
    ease: "power3.inOut",
  }, "-=0.3");

  // 6. Scroll indicator fade in
  tl.to(".scroll-box", { opacity: 1, duration: 0.5 }, "-=0.2");
}

// ============================================
// GSAP + ScrollTrigger — About Section Animations
// ============================================

{
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

  // ---------- 4. Words Rows — Slide In From Sides ----------
  const wordsRow1 = document.querySelector(".words-row-1");
  const wordsRow2 = document.querySelector(".words-row-2");

  if (wordsRow1 && wordsRow2) {
    gsap.fromTo(wordsRow1,
      { x: "-20%", opacity: 0 },
      {
        x: "0%",
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: ".general-words-container",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(wordsRow2,
      { x: "20%", opacity: 0 },
      {
        x: "0%",
        opacity: 1,
        duration: 1,
        delay: 0.15,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: ".general-words-container",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }

  // ---------- 5. Advantages Boxes — 3D Perspective Stagger ----------
  const advantageBoxes = gsap.utils.toArray(".advantages-content");

  if (advantageBoxes.length) {
    gsap.from(advantageBoxes, {
      opacity: 0,
      y: 100,
      transformPerspective: 800,
      transformOrigin: "left center",
      duration: 0.8,
      ease: "back.out(1.4)",
      stagger: {
        each: 0.1,
        from: "start",
      },
      scrollTrigger: {
        trigger: ".advantages-main-container",
        start: "top 50%",
        toggleActions: "play none none none",
        once: true,
      },
    });
  }

  // ---------- 6. Tools Section — Staggered Entrance ----------
  const toolItems = gsap.utils.toArray(".general-tool-title");

  if (toolItems.length) {
    gsap.from(toolItems, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".general-tools-container",
        start: "top 85%",
        toggleActions: "play none none none",
        once: true,
      },
    });
  }
}

// ============================================
// GSAP + ScrollTrigger — Highlight Text Pin & Scrub
// ============================================
{
  const highlightText = document.querySelector(".highlight-text");

  if (highlightText) {
    function splitTextNodes(parent) {
      const walker = document.createTreeWalker(parent, NodeFilter.SHOW_TEXT, null, false);
      const textNodes = [];
      while (walker.nextNode()) textNodes.push(walker.currentNode);

      textNodes.forEach(node => {
        const words = node.textContent.split(/(\s+)/);
        if (words.length <= 1) return;

        const frag = document.createDocumentFragment();
        words.forEach(part => {
          if (part.match(/^\s+$/)) {
            frag.appendChild(document.createTextNode(part));
          } else if (part.length > 0) {
            const span = document.createElement("span");
            span.className = "hl-word";
            span.textContent = part;
            frag.appendChild(span);
          }
        });
        node.parentNode.replaceChild(frag, node);
      });
    }

    splitTextNodes(highlightText);

    const hlWords = gsap.utils.toArray(".highlight-text .hl-word");

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
      gsap.set(hlWords, { color: "var(--long--text)", backgroundColor: "transparent" });
    } else if (hlWords.length) {
      gsap.set(hlWords, { color: "transparent", backgroundColor: "rgba(0,0,0,0.12)" });

      const hlTl = gsap.timeline();

      hlTl.to(hlWords, {
        color: "var(--long--text)",
        backgroundColor: "rgba(0,0,0,0)",
        duration: 1,
        stagger: 0.05,
        ease: "power1.out",
      });

      ScrollTrigger.create({
        trigger: ".highlight-section",
        start: "center center",
        end: "+=150%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        animation: hlTl,
      });
    }
  }
}
