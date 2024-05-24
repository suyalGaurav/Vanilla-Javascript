"use strict";

const header = document.querySelector("header");
const navLinksUl = document.querySelector(".nav-links-ul");
const navItems = document.querySelectorAll(".nav-item");
const navLinks = document.querySelectorAll(".nav-link");
const openAccountButtons = document.querySelectorAll(".sign-up-btn");
const heroButton = document.querySelector(".hero-button");
const sections = document.querySelectorAll(".section");
const lazyImages = document.querySelectorAll(".lazy-img");

// tab container
const operationButtonsParent = document.querySelector(".operation-buttons");
const operationButtons = document.querySelectorAll(".operation-button");
const operationContents = document.querySelectorAll(".operation-content");

const features = document.querySelector(".features");
const testimonials = document.querySelectorAll(".testimonial");
const previousButton = document.querySelector(".previous-button");
const nextButton = document.querySelector(".next-button");
const testimonialDots = document.querySelectorAll(".testimonial-dot");

//Functions

const changeTestimonialSlide = function (buttonType) {
  for (let i = 0; i < testimonials.length; i++) {
    if (testimonials[i].classList.contains("testimonial-active")) {
      testimonials[i].classList.remove("testimonial-active");
      testimonialDots[i].classList.remove("testimonial-dot-active");
      let newSlideIndex;
      if (buttonType === "previous-button") {
        newSlideIndex = i === 0 ? testimonials.length - 1 : i - 1;
      } else if (buttonType === "next-button") {
        newSlideIndex = i === testimonials.length - 1 ? 0 : i + 1;
      }

      testimonials[newSlideIndex].classList.add("testimonial-active");
      testimonialDots[newSlideIndex].classList.add("testimonial-dot-active");
      break;
    }
  }
};

const toggleNavLinksOpacity = function (mouseEvent) {
  document.querySelector(".bankist-logo").classList.toggle("nav-link-opacity");

  navItems.forEach((navItem) => {
    if (mouseEvent === "enter" && !navItem.classList.contains("nav-hovered")) {
      navItem.classList.add("nav-link-opacity");
    } else if (mouseEvent === "leave") {
      navItem.classList.remove("nav-link-opacity");
    }
  });
};

const stickyHeader = function (entries, observer) {
  const [entry] = entries;
  // .isIntersecting will be true only if it is intersecting at the given threshold entry
  if (entry.isIntersecting) header.classList.remove("sticky-header");
  else header.classList.add("sticky-header");
};

const observerOptions = {
  root: null, //null = browser viewport
  threshold: 0, //stickyHeader will be called on 0% visibility of element being observed i.e hero-banner in this case
  rootMargin: "-90px", //stickyHeader will be called when <= 90px + threshold percentage of hero-banner becomes visible
};

const observer = new IntersectionObserver(stickyHeader, observerOptions);
observer.observe(document.querySelector(".hero-banner"));


const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
   entry.target.classList.remove("section-hidden");
   observer.unobserve(entry.target);
  }
};

const observer2 = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

sections.forEach(function (section) {
  section.classList.add("section-hidden");
  observer2.observe(section);
});


const loadImage = function (entries, observer) {
  const [entry] = entries;
  if(entry.isIntersecting) {
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", function() {
      this.classList.remove("lazy-img")
    })
    observer.unobserve(entry.target)
  }
}

const observer3 = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: "200px" //Loading images before they show up
})


lazyImages.forEach((lazyImage) => {
  observer3.observe(lazyImage);
})









// Event Listeners

// Note- mouseenter and mouseleave doesn't bubble up the DOM tree
navLinksUl.addEventListener("mouseover", function (event) {
  const navItem = event.target;
  if (navItem?.classList.contains("nav-item")) {
    navItem.classList.add("nav-hovered");
    toggleNavLinksOpacity("enter");
  }
});

navLinksUl.addEventListener("mouseout", function (event) {
  const navItem = event.target;
  if (navItem?.classList.contains("nav-item")) {
    navItem?.classList.remove("nav-hovered");
    toggleNavLinksOpacity("leave");
  }
});

// Using event delegation
navLinksUl.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target?.classList.contains("nav-link")) {
    // event.target.href will give the absolute url
    const sectionId = event.target.getAttribute("href");
    document.querySelector(sectionId).scrollIntoView({ behavior: "smooth" });
  } else {
    console.log("Empty space or button got clicked!");
  }
});

openAccountButtons.forEach((openAccountButton) => {
  openAccountButton.addEventListener("click", () => {
    document.querySelector(".modal").classList.add("modal-visible");
  });
});

document.querySelector(".modal-close").addEventListener("click", () => {
  document.querySelector(".modal").classList.remove("modal-visible");
});

heroButton.addEventListener("click", function () {
  document.querySelector(".features").scrollIntoView({ behavior: "smooth" });
});

// with event delegation
// attaching event handler to the parent of all buttons
operationButtonsParent.addEventListener("click", function (event) {
  // In case user clicks on the span present inside the button, using closest ancestor with .operation-button class to get the data-tab value
  // and incase user doesn't, then closest will return the button element itself.
  const dataTab = event.target.closest(".operation-button")?.dataset.tab;

  if (dataTab) {
    const prevActiveDataTab = document
      .querySelector(".button-active")
      .getAttribute("data-tab");

    if (dataTab !== prevActiveDataTab) {
      operationButtons[prevActiveDataTab - 1].classList.remove("button-active");
      operationContents[prevActiveDataTab - 1].classList.remove(
        "operation-active"
      );

      operationButtons[dataTab - 1].classList.add("button-active");
      operationContents[dataTab - 1].classList.add("operation-active");
    }
  }
});

previousButton.addEventListener("click", () =>
  changeTestimonialSlide("previous-button")
);

nextButton.addEventListener("click", () =>
  changeTestimonialSlide("next-button")
);

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
