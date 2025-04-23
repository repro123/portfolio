"use strict";

const html = document.documentElement;
const themeInputs = document.getElementsByName("theme-dropdown");

// Convert to array for safer iteration (NodeList.forEach isn't supported in older browsers)
Array.from(themeInputs).forEach((input) => {
  input.addEventListener("change", function () {
    const selectedTheme = this.value;
    html.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  });
});

function setTheme() {
  const savedTheme = localStorage.getItem("theme");
  const defaultTheme = "night";

  // Set theme from storage or default
  const themeToApply = savedTheme || defaultTheme;
  html.setAttribute("data-theme", themeToApply);

  // Update radio buttons
  Array.from(themeInputs).forEach((input) => {
    input.checked = input.value === themeToApply;
  });

  if (!savedTheme) {
    localStorage.setItem("theme", defaultTheme);
  }
}

setTheme();
