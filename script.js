document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     SMOOTH SCROLLING
     ========================================= */
  document.querySelectorAll("nav ul li a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* =========================================
     DARK MODE TOGGLE
     ========================================= */
  const darkModeToggle = document.querySelector(".dark-mode-toggle");
  const body = document.body;

  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    darkModeToggle.querySelector("i").classList.replace("fa-moon", "fa-sun");
  }

  darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const icon = darkModeToggle.querySelector("i");
    if (body.classList.contains("dark-mode")) {
      icon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("darkMode", "enabled");
    } else {
      icon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("darkMode", "disabled");
    }
  });

  /* =========================================
     CONTACT FORM SUBMISSION
     ========================================= */
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("form-message");

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const actionUrl = this.action;

    try {
      const response = await fetch(actionUrl, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        formMessage.textContent = "Thank you for your message! I will get back to you soon.";
        formMessage.classList.remove("error");
        formMessage.classList.add("success");
        formMessage.style.display = "block";
        contactForm.reset();
        setTimeout(() => { formMessage.style.display = "none"; }, 5000);
      } else {
        const data = await response.json();
        formMessage.textContent = data.errors
          ? data.errors.map((err) => err.message).join(", ")
          : "Oops! There was an error sending your message.";
        formMessage.classList.remove("success");
        formMessage.classList.add("error");
        formMessage.style.display = "block";
      }
    } catch (error) {
      console.error("Submission error:", error);
      formMessage.textContent = "Network error. Please try again later.";
      formMessage.classList.remove("success");
      formMessage.classList.add("error");
      formMessage.style.display = "block";
    }
  });

  /* =========================================
     SCROLL REVEAL
     ========================================= */
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => section.classList.add("reveal"));

  const revealSection = () => {
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < window.innerHeight - 100) {
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }
    });
  };

  window.addEventListener("scroll", revealSection);
  revealSection();

  /* =========================================
     SEE MORE / SEE LESS — BILLING APP
     ========================================= */
  const billingBtn = document.getElementById("billing-see-more-btn");
  const billingDesc = document.getElementById("billing-desc");
  if (billingBtn && billingDesc) {
    billingBtn.addEventListener("click", () => {
      billingDesc.classList.toggle("expanded");
      billingBtn.textContent = billingDesc.classList.contains("expanded") ? "See Less" : "See More";
    });
  }

  /* =========================================
     SEE MORE / SEE LESS — CRUISE MANAGEMENT
     ========================================= */
  const cruiseBtn = document.getElementById("cruise-see-more-btn");
  const cruiseDesc = document.getElementById("cruise-desc");
  if (cruiseBtn && cruiseDesc) {
    cruiseBtn.addEventListener("click", () => {
      cruiseDesc.classList.toggle("expanded");
      cruiseBtn.textContent = cruiseDesc.classList.contains("expanded") ? "See Less" : "See More";
    });
  }

}); // end DOMContentLoaded