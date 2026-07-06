"use strict";
const sections = document.querySelectorAll("section");
const advantagesContent = document.querySelectorAll(".advantages-content");
const innerContent = document.querySelectorAll(".inner-advantges-content");
const contentArrowBox = document.querySelectorAll(".arrow-container");
const arrowIcon = document.querySelectorAll(".arrow-icon");
const contentTitle = document.querySelectorAll(".title-text");
const hoverWord = document.querySelectorAll(".hover-word-container");
const muueBurgerContainer = document.getElementById(
  "burger-menue-icon-container",
);
const menueItemsBox = document.querySelector(".menue-items");
const themeIcon = document.querySelector(".theme-icon");
const themeSvg = document.querySelector(".theme-svg");
const generalToolTitle = document.querySelectorAll('.general-tool-title')
const plusIconContainer = document.querySelectorAll('.general-tool-title .plus-icon-container')
const toolTitle = document.querySelectorAll('.general-tool-title .tool-title')
const toolContent = document.querySelectorAll('.general-tool-title .tool-content')

// advantages content events handling
// handling menue item box classList (DRY handling)

const menueItemsClassesHandling = function (classMethod, className) {
  return menueItemsBox.classList[classMethod](className);
};

for (let i = 0; i < advantagesContent.length; i++) {
  advantagesContent[i].addEventListener("click", function () {
    innerContent[i].classList.toggle("inner-open");
    contentArrowBox[i].classList.toggle("rotate-180-deg");
    contentTitle[i].classList.toggle("hidden");
    hoverWord[i].classList.toggle("hidden");
    innerContent[i].style.backgroundColor = "#252323";
    arrowIcon[i].classList.toggle("arrow-lighting");
  });
}

// menu burger icon handling

muueBurgerContainer.addEventListener("click", function () {
  menueItemsClassesHandling("toggle", "items-open");
});

// handling key press events
document.addEventListener("keydown", function (e) {
  if (menueItemsBox.classList.contains("items-open") && e.key === "Escape") {
    menueItemsClassesHandling("remove", "items-open");
  }
});

// handling body click event for closing menu items

for (let i = 0; i < sections.length; i++) {
  sections[i].addEventListener("click", function () {
    if (menueItemsBox.classList.contains("items-open")) {
      menueItemsClassesHandling("remove", "items-open");
    }
  });
}

// theme transform test

themeIcon.addEventListener("click", function () {
  themeIcon.classList.toggle("theme-icon-dark");
  themeSvg.classList.toggle("theme-light");
});

for (let i = 0; i < generalToolTitle.length; i++) {
  generalToolTitle[i].addEventListener('click', function () {
    toolContent[i].classList.toggle('hidden')
    plusIconContainer[i].classList.toggle('rotate-45-deg')
  })
}
