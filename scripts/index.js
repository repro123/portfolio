"use strict";
/////////////////////////////////////////////////////////////
// selecting all the elements that will be used in the script

// mobile nav tggle elemnts
const navToggleBtn = document.getElementById("navToggle");
const navDialog = document.getElementById("dialog");
const closeDialogBtn = document.getElementById("closeDialog");
const navlinks = document.querySelectorAll(".navlink");

// selecting all the buttons in the FAQ section
const accordionBtn = document.querySelectorAll(".accordion__button");

// selecting the back to top button
const backToTopBtn = document.getElementById("backToTop");
const scrollThreshold = 500; // 500px

// selecting the form elements
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const nameError = document.getElementById("nameError");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");
const messageInput = document.getElementById("message");
const messageError = document.getElementById("messageError");
const submitBtn = document.getElementById("submitBtn");
const successAlert = document.getElementById("successAlert");
const failAlert = document.getElementById("failAlert");

///////////////////////////////////////////////////////////////////
// mobile nav toggle button - add event listener to the button to toggle the aria-expanded attribute
navToggleBtn.addEventListener("click", function () {
  this.setAttribute("aria-expanded", "true");
  navDialog.showModal(); // show the dialog when the button is clicked
});

// close nav
closeDialogBtn.addEventListener("click", closeDialog); // close the dialog when the close button is clicked

navlinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // prevent the default action of the link
    const targetId = this.getAttribute("href").substring(1); // get the href attribute of the link
    const targetElement = document.getElementById(targetId); // select the target element with the id
    targetElement.scrollIntoView({ behavior: "smooth" }); // scroll to the target element smoothly
    closeDialog(); // close the dialog when a nav link is clicked
  });
  link.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      closeDialog(); // close the dialog when the enter or space key is pressed
    }
  });
});

window.addEventListener("resize", function () {
  if (window.innerWidth >= 768) closeDialog(); // close the dialog when the window is resized to desktop size
});

navDialog.addEventListener("click", function (event) {
  if (event.target === navDialog) {
    closeDialog(); // close the dialog when the overlay is clicked
  }
});

function closeDialog() {
  navDialog.close(); // Close the dialog when the overlay is clicked
  navToggleBtn.setAttribute("aria-expanded", "false"); // Set aria-expanded to false when the dialog is closed
}

///////////////////////////////////////////////////////////////////
// FAQ section - loop through the buttons to be able to add event listener to each button
for (let i = 0; i < accordionBtn.length; i++) {
  const button = accordionBtn[i];

  button.addEventListener("click", function () {
    const isAriaExpanded = button.getAttribute("aria-expanded") === "true"; // isAriaExpanded is false
    button.setAttribute("aria-expanded", !isAriaExpanded);

    // to get the id of each content. i gave  them different id's, so the only way to select them all is by selecting the aria-controls attribute of the buttons
    const accordionContentId = button.getAttribute("aria-controls"); //should give the id of each accordion content div

    // can now select the accordion content with the id, to change the aria-hidden attribute; if the button hhas aria-expanded of true, the content should have aria hidden of false and vice versa. The div's contents have been styled such that, if aria hidden is true, the content should not be visible -- see styles in the html file(tailwind css)
    const accordionContent = document.getElementById(accordionContentId); // select the content div with the id gotten from the button
    // set the aria-hidden attribute of the content div to be the opposite of the button's aria-expanded attribute
    accordionContent.setAttribute("aria-hidden", isAriaExpanded);
  });
}

//////////////////////////////////////////////////////////////////
// back to top section

window.addEventListener("scroll", function () {
  if (window.scrollY > scrollThreshold) {
    backToTopBtn.classList.remove("opacity-0", "pointer-events-none");
    backToTopBtn.classList.add("opacity-100", "pointer-events-auto");
  } else {
    backToTopBtn.classList.add("opacity-0", "pointer-events-none");
    backToTopBtn.classList.remove("opacity-100", "pointer-events-auto");
  }
});

// smooth scroll to top when the button is clicked
backToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//////////////////////////////////////////////////////////////////
// footer copyright year - get the copyright year element in the footer and set its text content to the current year

const copyrightYear = document.getElementById("copyrightYear");
const currentYear = new Date().getFullYear();
copyrightYear.textContent = currentYear;

//////////////////////////////////////////////////////////////////
// time stamp for the form submission

function setCurrentDateTime() {
  const now = new Date();
  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Use 24-hour format
  };

  const formattedDate = now
    .toLocaleDateString("en-US", options)
    .replace(/,/g, "") // Remove commas
    .replace(/ ([AP]M)/, ""); // Remove AM/PM if needed

  document.getElementById("timestamp").value = formattedDate;
}

///////////////////////////////////////////////////////////
// form and input validation

function validateName() {
  let isValid = true;
  const nameValue = nameInput.value.trim();
  nameInput.removeAttribute("aria-invalid");
  nameInput.removeAttribute("aria-describedby");
  nameInput.removeAttribute("data-invalid");
  nameError.textContent = "";

  if (nameValue === "") {
    nameError.textContent = "Can not be empty.";
    nameInput.setAttribute("aria-invalid", "true");
    nameInput.setAttribute("aria-describedby", "nameError");
    nameInput.setAttribute("data-invalid", "true");
    isValid = false;
  }

  return isValid;
}

function validateEmail() {
  let isValid = true;
  const emailValue = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const isValidEmail = emailRegex.test(emailValue);

  emailInput.removeAttribute("aria-invalid");
  emailInput.removeAttribute("aria-describedby");
  emailInput.removeAttribute("data-invalid");
  emailError.textContent = "";

  if (emailValue === "") {
    emailError.textContent = "Can not be empty.";
    emailInput.setAttribute("aria-invalid", "true");
    emailInput.setAttribute("aria-describedby", "emailError");
    emailInput.setAttribute("data-invalid", "true");
    isValid = false;
  } else if (!isValidEmail) {
    emailError.textContent = "Enter a valid email address.";
    emailInput.setAttribute("aria-invalid", "true");
    emailInput.setAttribute("aria-describedby", "emailError");
    emailInput.setAttribute("data-invalid", "true");
    isValid = false;
  }
  return isValid;
}

function validateMessage() {
  let isValid = true;
  const messageValue = messageInput.value.trim();
  messageInput.removeAttribute("aria-invalid");
  messageInput.removeAttribute("aria-describedby");
  messageInput.removeAttribute("data-invalid");
  messageError.textContent = "";

  if (messageValue === "") {
    messageError.textContent = "Cannot be empty.";
    messageInput.setAttribute("aria-invalid", "true");
    messageInput.setAttribute("aria-describedby", "messageError");
    messageInput.setAttribute("data-invalid", "true");
    isValid = false;
  }

  return isValid;
}

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
messageInput.addEventListener("input", validateMessage);

function validateForm() {
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();

  return isNameValid && isEmailValid && isMessageValid;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the default form submission
  const isFormValid = validateForm(); // Validate the form

  if (!isFormValid) return; // If the form is not valid, do not proceed

  try {
    setCurrentDateTime(); // Set the current date and time in the hidden input field
    console.log("Form submitted successfully!");
    await emailjs.sendForm("service_lpg9cnk", "template_0vlauoc", event.target); // Send the form data using EmailJS

    await emailjs.send("service_lpg9cnk", "template_wfp4c2g", {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value,
      time: document.getElementById("timestamp").value,
    });

    console.log("Both emails sent successfully!");
    form.reset(); // Reset the form after successful submission
    successAlert.classList.remove("hidden"); // Show the success alert
    submitBtn.setAttribute("aria-disabled", "true"); // Disable the submit button
    submitBtn.classList.add("opacity-50", "pointer-events-none"); // Disable pointer events and reduce opacity
    setTimeout(() => {
      successAlert.classList.add("hidden"); // Hide the success alert after 3 seconds
      submitBtn.removeAttribute("aria-disabled"); // Enable the submit button
      submitBtn.classList.remove("opacity-50", "pointer-events-none"); // Enable pointer events and reset opacity
    }, 3000); // 3 seconds delay
  } catch (error) {
    console.log("FAILED...", error);
    failAlert.classList.remove("hidden"); // Show the failure alert
    setTimeout(() => {
      failAlert.classList.add("hidden"); // Hide the failure alert after 3 seconds
    }, 3000); // 3 seconds delay
  }
});

///////////////////////////////////////////////////////////////////
// fade in animation for the elements on the page
const fadeInElements = document.querySelectorAll(".fade-in-section"); // Select all elements with the class "fade-in"
const observerOptions = {
  root: null, // Use the viewport as the root
  rootMargin: "0px",
  threshold: 0.2, // Set the threshold for when the element should be considered in view
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible"); // Add the fade-in class when the element is in view
      observer.unobserve(entry.target); // Stop observing the element after it has faded in
    }
  });
}, observerOptions);

fadeInElements.forEach((element) => {
  observer.observe(element); // Observe each fade-in element
});
