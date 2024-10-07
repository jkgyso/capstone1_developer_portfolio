// Function to trigger the fade-in animation
function showTitleAndStartTyping() {
  const title = document.getElementById("fadeInTitle");

  // Dynamically apply the animation with a delay using JavaScript
  title.style.animation = "fadeIn 1s forwards";
  title.style.animationDelay = "2s"; // Set a 2-second delay

  // Start typing effect after the fade-in animation completes
  setTimeout(startTypingEffect, 1500); // Starts after 2s delay + 1s fade-in duration
}

// Trigger the function after the DOM is fully loaded
window.onload = function () {
  showTitleAndStartTyping();
};

function startTypingEffect() {
  const text = "FULL STACK WEB DEVELOPER";
  let index = 0;
  const typingElement = document.getElementById("typingEffect");
  typingElement.textContent = ""; // Clear existing text

  // Typing effect
  function typeChar() {
    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(typeChar, 100); // Typing speed
    } else {
      // Show navbar after typing effect completes
      const navbar = document.getElementById("navbar");
      navbar.style.display = "block"; // Show navbar
      setTimeout(showNavbarItems, 0); // Show navbar items with a slight delay
    }
  }

  typeChar(); // Start typing characters
}

// Function to show navbar items one by one with fade effect
function showNavbarItems() {
  const navItems = document.querySelectorAll(".nav-item");
  let delay = 0;

  // Order of items to show
  const order = [0, 1, 2, 3]; // Indexes of nav items: About, Tools, Projects, Contact

  order.forEach((index) => {
    setTimeout(() => {
      const item = navItems[index];
      item.style.opacity = 1; // Fade in
    }, delay);
    delay += 300; // Delay for the next item (300ms for example)
  });

  // Show the arrow last
  setTimeout(() => {
    const arrowContainer = document.getElementById("arrow-container");
    arrowContainer.style.display = "block"; // Show arrow container
    arrowContainer.style.opacity = 1; // Fade in arrow
  }, delay); // Show arrow after the last nav item
}

// Start title display and typing effect after the page loads
window.onload = showTitleAndStartTyping;

document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add 'in-view' class when section is in view
        entry.target.classList.add("in-view");

        // Check if it's the "about" section, then observe the "tools" section
        if (entry.target.classList.contains("about-section")) {
          observer.unobserve(entry.target); // Stop observing the about section
          const toolsSection = document.querySelector(".tools-section");
          observer.observe(toolsSection); // Start observing the tools section
        }

        // Check if it's the "tools" section, then observe the "projects" section
        if (entry.target.classList.contains("tools-section")) {
          observer.unobserve(entry.target); // Stop observing the tools section
          const projectsSection = document.querySelector(".projects-section");
          observer.observe(projectsSection); // Start observing the projects section
        }

        // Once the "projects" section is visible, stop observing everything
        if (entry.target.classList.contains("projects-section")) {
          observer.unobserve(entry.target); // Stop observing the projects section
        }
      }
    });
  });

  // Initially observe only the "about" section
  const aboutSection = document.querySelector(".about-section");
  observer.observe(aboutSection);
});

const sections = document.querySelectorAll(".fade-in-section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      } else {
        entry.target.classList.remove("in-view");
      }
    });
  },
  { threshold: 0.1 }
);

sections.forEach((section) => {
  observer.observe(section);
});

window.addEventListener("scroll", function () {
  const navbar = document.querySelector("#navbar .navbar");
  const aboutSection = document.querySelector("#about");
  const aboutSectionTop = aboutSection.offsetTop;

  if (window.scrollY >= aboutSectionTop) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
