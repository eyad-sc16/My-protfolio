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
