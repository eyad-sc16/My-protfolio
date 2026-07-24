
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

    const isMobile = window.matchMedia("(max-width: 480px)").matches;

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
        start: "top 90%",
        toggleActions: "play none none none",
        once: false,
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

  // ---------- 7. Animated Title — Slide Up From Below ----------
  const atWords = gsap.utils.toArray(".at-word, .at-icon");

  if (atWords.length) {
    gsap.set(atWords, { yPercent: 100 });

    const atTl = gsap.timeline();

    atTl.to(atWords, {
      yPercent: 0,
      duration: 1,
      ease: "power4.out",
      stagger: {
        each: 0.12,
        from: "start",
      },
    });

    ScrollTrigger.create({
      trigger: ".animated-title",
      start: "top 80%",
      end: "+=80%",
      scrub: 1,
      animation: atTl,
    });
  }

  // ---------- Return Button — show on advantages, hide on about ----------
  {
    const returnBtn = document.querySelector(".return-main-container");
    if (returnBtn) {
      // Flag: true = button is in the "visible zone" (below advantages start)
      var btnEnabled = false;

      ScrollTrigger.create({
        trigger: ".advantages-main-container",
        start: "top 80%",
        onEnter: function () {
          btnEnabled = true;
          gsap.to(returnBtn, { scale: 1, duration: 0.4, ease: "back.out(2)", pointerEvents: "all" });
        },
        onLeaveBack: function () {
          btnEnabled = false;
          gsap.to(returnBtn, { scale: 0, duration: 0.3, ease: "power2.in", pointerEvents: "none" });
        },
      });

      returnBtn.addEventListener("mouseenter", function () {
        if (returnBtn.style.pointerEvents !== "none") {
          gsap.to(returnBtn, { scale: 1.05, duration: 0.15, ease: "power2.out" });
        }
      });
      returnBtn.addEventListener("mouseleave", function () {
        if (returnBtn.style.pointerEvents !== "none") {
          gsap.to(returnBtn, { scale: 1, duration: 0.15, ease: "power2.out" });
        }
      });

      // Hide button when footer enters, show when leaving (only if in the visible zone)
      ScrollTrigger.create({
        trigger: "#footer",
        start: "top bottom",
        end: "top 85%",
        onEnter: function () {
          gsap.to(returnBtn, { scale: 0, opacity: 0, pointerEvents: "none", duration: 0.3, ease: "power2.in" });
        },
        onLeaveBack: function () {
          if (btnEnabled) {
            gsap.to(returnBtn, { scale: 1, opacity: 1, pointerEvents: "all", duration: 0.3, ease: "power2.out" });
          }
        },
      });
    }
  }

  // ---------- 8. Process Timeline ----------
  const processSection = document.querySelector(".process-section");
  const processSteps = document.querySelectorAll(".process-step");
  const timelineFill = document.querySelector(".timeline-fill");

  if (processSection && processSteps.length && timelineFill) {
    gsap.set(timelineFill, { scaleY: 0 });

    const pkText = document.querySelector(".process-kicker");
    if (pkText) {
      const pkOriginal = pkText.textContent;
      pkText.textContent = "";
      pkOriginal.split("").forEach((ch) => {
        const span = document.createElement("span");
        span.className = "pk-char";
        const inner = document.createElement("span");
        inner.className = "pk-char-inner";
        inner.textContent = ch === " " ? "\u00a0" : ch;
        span.appendChild(inner);
        pkText.appendChild(span);
      });
      const pkChars = pkText.querySelectorAll(".pk-char-inner");
      gsap.set(pkChars, { x: () => -(window.innerWidth + 200) });
      gsap.to(pkChars, {
        x: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".process-header",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }

    const ptWords = gsap.utils.toArray(".process-title .pt-word");
    if (ptWords.length) {
      gsap.set(ptWords, { yPercent: 100 });
      gsap.to(ptWords, {
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-header",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Shadow reveals with clip-path from left
      gsap.fromTo(
        ".from-word, .to-word",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".process-header",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    gsap.to(timelineFill, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".process-timeline",
        start: "top 70%",
        end: "bottom 70%",
        scrub: true,
      },
    });

    processSteps.forEach((step, i) => {
      const card = step.querySelector(".step-card");
      const marker = step.querySelector(".step-marker");
      const number = step.querySelector(".step-number");
      const cardNumber = step.querySelector(".step-card-number");
      const title = step.querySelector(".step-title");
      const desc = step.querySelector(".step-desc");

      gsap.fromTo(
        card,
        {
          opacity: 0.3,
          y: 48,
          backgroundColor: "#ffffff",
          color: "#0d0d0d",
        },
        {
          opacity: 1,
          y: 0,
          backgroundColor: "#1f1f1f",
          color: "#ffffff",
          ease: "none",
          scrollTrigger: {
            trigger: marker,
            start: "center 70%",
            end: "center 52%",
            scrub: true,
          },
        }
      );

      gsap.to(cardNumber, {
        color: "#ffffff",
        ease: "none",
        scrollTrigger: {
          trigger: marker,
          start: "center 70%",
          end: "center 52%",
          scrub: true,
        },
      });

      gsap.to(desc, {
        color: "#d7d7d7",
        ease: "none",
        scrollTrigger: {
          trigger: marker,
          start: "center 70%",
          end: "center 52%",
          scrub: true,
        },
      });

      gsap.to(marker, {
        backgroundColor: "#0d0d0d",
        ease: "none",
        scrollTrigger: {
          trigger: marker,
          start: "center 70%",
          end: "center 52%",
          scrub: true,
        },
      });

      gsap.to(number, {
        color: "#ffffff",
        ease: "none",
        scrollTrigger: {
          trigger: marker,
          start: "center 70%",
          end: "center 52%",
          scrub: true,
        },
      });

      // ---- Each step-title gets a different animation ----
      var tlOpts = {
        scrollTrigger: {
          trigger: marker,
          start: "center 70%",
          toggleActions: "play none none reverse",
        },
      };

      switch (i) {
        case 0:
          // Discovery — slides from left with clip
          gsap.set(title, { clipPath: "inset(0 100% 0 0)", x: -30 });
          gsap.to(title, {
            clipPath: "inset(0 0% 0 0)",
            x: 0,
            color: "#ffffff",
            duration: 0.7,
            ease: "power3.out",
            ...tlOpts,
          });
          break;

        case 1:
          // Design — letters spin in from random angles
          var designText = title.textContent;
          title.textContent = "";
          var designLetters = [];
          designText.split("").forEach(function (ch) {
            var span = document.createElement("span");
            span.style.display = "inline-block";
            span.textContent = ch === " " ? "\u00a0" : ch;
            title.appendChild(span);
            designLetters.push(span);
          });
          gsap.set(designLetters, {
            scale: 0,
            rotation: gsap.utils.random(-180, 180, true),
            opacity: 0,
          });
          gsap.to(designLetters, {
            scale: 1,
            rotation: 0,
            opacity: 1,
            color: "#ffffff",
            duration: 0.6,
            stagger: 0.05,
            ease: "back.out(1.7)",
            ...tlOpts,
          });
          break;

        case 2:
          // Animation — letters stagger from below
          var animText = title.textContent;
          title.textContent = "";
          var animLetters = [];
          animText.split("").forEach(function (ch) {
            var span = document.createElement("span");
            span.style.display = "inline-block";
            span.textContent = ch === " " ? "\u00a0" : ch;
            title.appendChild(span);
            animLetters.push(span);
          });
          gsap.set(animLetters, { y: 30, opacity: 0 });
          gsap.to(animLetters, {
            y: 0,
            opacity: 1,
            color: "#ffffff",
            duration: 0.4,
            stagger: 0.04,
            ease: "power3.out",
            ...tlOpts,
          });
          break;

        case 3:
          // Launch — letters stagger up from below
          var launchText = title.textContent;
          title.textContent = "";
          var launchLetters = [];
          launchText.split("").forEach(function (ch) {
            var span = document.createElement("span");
            span.style.display = "inline-block";
            span.textContent = ch === " " ? "\u00a0" : ch;
            title.appendChild(span);
            launchLetters.push(span);
          });
          gsap.set(launchLetters, { yPercent: 100, opacity: 0 });
          gsap.to(launchLetters, {
            yPercent: 0,
            opacity: 1,
            color: "#ffffff",
            duration: 0.5,
            stagger: 0.04,
            ease: "power3.out",
            ...tlOpts,
          });
          break;
      }
    });
  }
}

// Footer — rises from below like a drawer
{
  const footer = document.querySelector("#footer");
  if (footer) {
    gsap.set(footer, { clipPath: "inset(100% 0 0 0)", opacity: 0 });
    gsap.to(footer, {
      clipPath: "inset(0% 0 0 0)",
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "#footer",
        start: "top bottom",
        end: "top 60%",
        scrub: 1,
      },
    });
  }
}

// SVG — random path-by-path reveal like highlight
{
  var smoothPaths = gsap.utils.toArray(".smooth-svg-container svg path");

  if (smoothPaths.length) {
    var smoothTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".smooth-section",
        start: "center center",
        end: "+=150%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
      defaults: { ease: "none" },
    });

    smoothPaths.forEach(function (path) {
      gsap.set(path, { opacity: 0 });
      smoothTl.to(path, { opacity: 1 }, Math.random() * 0.8);
    });

  }
}

// "Smooth ~" — epic character animation
{
  var smoothTitle = document.querySelector(".smooth-section-title h1");
  if (smoothTitle) {
    var stText = smoothTitle.textContent;
    smoothTitle.textContent = "";
    var stChars = [];
    stText.split("").forEach(function (ch) {
      var span = document.createElement("span");
      span.style.display = "inline-block";
      span.textContent = ch === " " ? "\u00a0" : ch;
      smoothTitle.appendChild(span);
      stChars.push(span);
    });

    gsap.set(stChars, {
      opacity: 0,
      scale: 0,
      rotation: function () { return gsap.utils.random(-180, 180); },
      x: function () { return gsap.utils.random(-200, 200); },
      y: function () { return gsap.utils.random(-200, 200); },
    });

    gsap.to(stChars, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      x: 0,
      y: 0,
      duration: 1.2,
      stagger: 0.04,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".smooth-section",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }
}

// "Imagine" — epic character animation
{
  var imagineEl = document.querySelector(".bottom-title");
  if (imagineEl) {
    var imText = imagineEl.textContent;
    imagineEl.textContent = "";
    var imChars = [];
    imText.split("").forEach(function (ch) {
      var span = document.createElement("span");
      span.style.display = "inline-block";
      span.textContent = ch === " " ? "\u00a0" : ch;
      imagineEl.appendChild(span);
      imChars.push(span);
    });

    gsap.set(imChars, {
      opacity: 0,
      yPercent: 120,
      rotation: function () { return gsap.utils.random(-30, 30); },
      scale: 0.3,
    });

    gsap.to(imChars, {
      opacity: 1,
      yPercent: 0,
      rotation: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.06,
      ease: "back.out(2)",
      scrollTrigger: {
        trigger: ".smooth-section",
        start: "center top",
        toggleActions: "play none none none",
      },
    });
  }
}
