"use strict";

const header = document.querySelector("header");
const bankistLogo = document.querySelector(".bankist-logo");
const navLinks = document.querySelectorAll(".nav-link");
const navLinkButtons = [
  document.querySelector(".nav-link-features"),
  document.querySelector(".nav-link-operations"),
  document.querySelector(".nav-link-testimonials"),
];
const openAccountButton = document.querySelector(".open-account-btn")
const operationButtons = document.querySelectorAll(".operation-button")
const heroButton = document.querySelector(".hero-button");
const features = document.querySelector(".features");
const testimonials = document.querySelectorAll(".testimonial");
const previousButton = document.querySelector(".previous-button")
const nextButton = document.querySelector(".next-button")
const testimonialDots = document.querySelectorAll(".testimonial-dot")


//Functions

const toggleNavLinksBlur = function (mouseEvent) {
  bankistLogo.classList.toggle("nav-link-blur");
  navLinks.forEach((navLink) => {
    if (mouseEvent === "enter") {
      if (!navLink.classList.contains("nav-hover")) {
        navLink.classList.add("nav-link-blur");
      }
    } else if (mouseEvent === "leave") {
      navLink.classList.remove("nav-link-blur");
    }
  });
};


//Same func for next and prev button 
// const nextPrevButton = function (buttonType) {
//     for(let i = 0; i < testimonials.length; i++) {
//         if(testimonials[i].classList.contains("testimonial-active")) {
//             testimonials[i].classList.remove("testimonial-active")
//             testimonialDots[i].classList.remove("testimonial-dot-active")
//             const previousTestimonialIndex = (i === 0 ? testimonials.length - 1 : i - 1)
//             testimonials[previousTestimonialIndex].classList.add("testimonial-active")  
//             testimonialDots[previousTestimonialIndex].classList.add("testimonial-dot-active")
//             break; 
//         }
//     }
// }

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

navLinks.forEach((navLink) => {
  navLink.addEventListener("mouseenter", () => {
    navLink.classList.add("nav-hover");
    toggleNavLinksBlur("enter");
    // console.log("mouse enter")
  });

  navLink.addEventListener("mouseleave", () => {
    navLink.classList.remove("nav-hover");
    toggleNavLinksBlur("leave");
  });
});

//Excludes open account btn
navLinkButtons.forEach(navLinkBtn => {
    const navLinkClass = navLinkBtn.classList[1].split("-");
    const navLink = navLinkClass[navLinkClass.length - 1];

    navLinkBtn.addEventListener('click', event => {
        event.preventDefault();
        document.querySelector(`.${navLink}`).scrollIntoView({ behavior: "smooth"});
    })
})

openAccountButton.addEventListener("click", ()=> {
  document.querySelector(".modal").classList.add("modal-visible")
  document.querySelector("header").classList.add("header-blur")
  document.querySelector("main").classList.add("main-blur")
  document.querySelector("footer").classList.add("footer-blur")
})


heroButton.addEventListener("click", () => {
  features.scrollIntoView({ behavior: "smooth" });
});

operationButtons.forEach((operationButton, i) => {
    operationButton.addEventListener('click', ()=> {
        if(!operationButton.classList.contains("button-active")) {

            // removing classes from current active button and content
            const activeBtn = document.querySelector(".button-active")
            activeBtn.classList.remove("button-active")
            const activeOperationContent = document.querySelector(".operation-active")
            activeOperationContent.classList.remove("operation-active")

            // adding classes to clicked button
            operationButton.classList.add("button-active")
            document.querySelector(`.operation-content-${i + 1}`).classList.add("operation-active")
        }
    })
})

previousButton.addEventListener("click", ()=> {
    for(let i = 0; i < testimonials.length; i++) {
        if(testimonials[i].classList.contains("testimonial-active")) {
            testimonials[i].classList.remove("testimonial-active")
            testimonialDots[i].classList.remove("testimonial-dot-active")
            const previousTestimonialIndex = (i === 0 ? testimonials.length - 1 : i - 1)
            testimonials[previousTestimonialIndex].classList.add("testimonial-active")  
            testimonialDots[previousTestimonialIndex].classList.add("testimonial-dot-active")
            break; 
        }
    }
})

nextButton.addEventListener("click", ()=> {
    for(let i = 0; i < testimonials.length; i++) {
        if(testimonials[i].classList.contains("testimonial-active")) {
            testimonials[i].classList.remove("testimonial-active")
            testimonialDots[i].classList.remove("testimonial-dot-active")

            const nextTestimonialIndex = (i === testimonials.length - 1 ? 0 : i + 1)
            testimonials[nextTestimonialIndex].classList.add("testimonial-active")  
            testimonialDots[nextTestimonialIndex].classList.add("testimonial-dot-active")
            break; 
        }
    }
})

//Change testimonial when user clicks on testimonial dot
testimonialDots.forEach((testimonialDot, i) => {
    testimonialDot.addEventListener("click", () => {
        if(!testimonialDots[i].classList.contains("testimonial-dot-active")) {
            for(let i = 0; i < testimonials.length; i++) {
                if(testimonials[i].classList.contains("testimonial-active")) {
                    testimonials[i].classList.remove("testimonial-active")
                    testimonialDots[i].classList.remove("testimonial-dot-active")
                    break; 
                }
            }

            testimonialDot.classList.add("testimonial-dot-active")
            testimonials[i].classList.add("testimonial-active")  
        }
    })
})



