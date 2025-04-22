"use strict";

const navToggleBtn = document.getElementById("navToggle");
const accordionBtn = document.querySelectorAll(".accordion__button");

navToggleBtn.addEventListener("click", function () {
  const isAriaExpanded = navToggleBtn.getAttribute("aria-expanded") === "true"; // isAriaExpanded is false
  navToggleBtn.setAttribute("aria-expanded", !isAriaExpanded);
});

// loop through the buttons to be able to add event listener to each button
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
