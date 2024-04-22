"use strict";

const header = document.querySelector("header");
const bankistLogo = document.querySelector(".bankist-logo");
const navLinksLi = document.querySelectorAll(".nav-link-li");
const openAccountButtons = document.querySelectorAll(".sign-up-btn");
const operationButtons = document.querySelectorAll(".operation-button");
const heroButton = document.querySelector(".hero-button");
const testimonials = document.querySelectorAll(".testimonial");
const previousButton = document.querySelector(".previous-button");
const nextButton = document.querySelector(".next-button");
const testimonialDots = document.querySelectorAll(".testimonial-dot");


//Functions
const toggleNavLinksBlur = function (mouseEvent) {
  bankistLogo.classList.toggle("nav-link-blur");
  navLinksLi.forEach((navLink) => {
    if (mouseEvent === "enter") {
      if (!navLink.classList.contains("nav-hover")) {
        navLink.classList.add("nav-link-blur");
      }
    } else if (mouseEvent === "leave") {
      navLink.classList.remove("nav-link-blur");
    }
  });
};

const changeTestimonialSlide = function (buttonType) {
  for (let i = 0; i < testimonials.length; i++) {
    if (testimonials[i].classList.contains("testimonial-active")) {
      testimonials[i].classList.remove("testimonial-active");
      testimonialDots[i].classList.remove("testimonial-dot-active");
      let newSlideIndex;
      if (buttonType === "previous") {
        newSlideIndex = i === 0 ? testimonials.length - 1 : i - 1;
      } else if (buttonType === "next") {
        newSlideIndex = i === testimonials.length - 1 ? 0 : i + 1;
      }

      testimonials[newSlideIndex].classList.add("testimonial-active");
      testimonialDots[newSlideIndex].classList.add("testimonial-dot-active");
      break;
    }
  }
};

// Event Listeners
// window.addEventListener("scroll", () => {
// //   console.log(scrollX);
// //   console.log(scrollY);
//   if (scrollY >= 615) {
//     header.classList.add("fixed");
//   } else {
//     header.classList.remove("fixed");
//   }
// });

navLinksLi.forEach((navLinkLi) => {
  navLinkLi.addEventListener("mouseenter", () => {
    navLinkLi.classList.add("nav-hover");
    toggleNavLinksBlur("enter");
  });

  navLinkLi.addEventListener("mouseleave", () => {
    navLinkLi.classList.remove("nav-hover");
    toggleNavLinksBlur("leave");
  });
});

// Using event
document.querySelectorAll(".nav-link").forEach((navLink) => {
  navLink.addEventListener("click", function(event) {
    event.preventDefault();
    const sectionId = this.getAttribute("href")
    document.querySelector(sectionId).scrollIntoView({ behavior: "smooth" });
  });
});

openAccountButtons.forEach((openAccountButton) => {
  openAccountButton.addEventListener("click", () => {
    document.querySelector(".modal").classList.add("modal-visible");
  });
});

document.querySelector(".modal-close").addEventListener("click", () => {
  document.querySelector(".modal").classList.remove("modal-visible");
});

heroButton.addEventListener("click", function() {
  document.querySelector(".features").scrollIntoView({ behavior: "smooth" });
});


operationButtons.forEach((operationButton, i) => {
  operationButton.addEventListener("click", () => {
    if (!operationButton.classList.contains("button-active")) {
      // removing classes from current active button and content
      document
        .querySelector(".button-active")
        .classList.remove("button-active");
      document
        .querySelector(".operation-active")
        .classList.remove("operation-active");

      // adding classes to the clicked button
      operationButton.classList.add("button-active");
      document
        .querySelector(`.operation-content-${i + 1}`)
        .classList.add("operation-active");
    }
  });
});

previousButton.addEventListener("click", changeTestimonialSlide("previous"));

nextButton.addEventListener("click", changeTestimonialSlide("next"));

//Change testimonial when user clicks on testimonial dot
testimonialDots.forEach((testimonialDot, i) => {
  testimonialDot.addEventListener("click", () => {
    if (!testimonialDots[i].classList.contains("testimonial-dot-active")) {
      for (let i = 0; i < testimonials.length; i++) {
        if (testimonials[i].classList.contains("testimonial-active")) {
          testimonials[i].classList.remove("testimonial-active");
          testimonialDots[i].classList.remove("testimonial-dot-active");
          break;
        }
      }

      testimonialDot.classList.add("testimonial-dot-active");
      testimonials[i].classList.add("testimonial-active");
    }
  });
});
