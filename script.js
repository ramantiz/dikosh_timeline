document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Floating hearts & stars
  const floatingContainer = document.getElementById("floating-container");
  if (floatingContainer) {
    setInterval(() => {
      createFloatingShape(floatingContainer);
    }, 900);
  }

  // Intro page logic
  const btnNo = document.getElementById("btn-no");
  const notForYou = document.getElementById("not-for-you");

  if (btnNo && notForYou) {
    btnNo.addEventListener("click", () => {
      notForYou.classList.remove("hidden");
      requestAnimationFrame(() => {
        notForYou.style.opacity = "1";
        notForYou.style.transform = "translateY(0)";
      });
    });
  }

  // Scroll reveal
  const revealItems = document.querySelectorAll(".reveal");
  if (revealItems.length > 0) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealItems.forEach(el => observer.observe(el));
  }

  // Password modal
  const passwordModal = document.getElementById("password-modal");
  const btnYes = document.getElementById("btn-yes");
  const dayInput = document.getElementById("day-input");
  const monthInput = document.getElementById("month-input");
  const passwordSubmit = document.getElementById("password-submit");
  const passwordError = document.getElementById("password-error");

  if (btnYes && passwordModal) {
    btnYes.addEventListener("click", () => {
      passwordModal.classList.remove("hidden");
    });
  }

  const CORRECT_DAY = 25;
  const CORRECT_MONTH = 10;

  if (passwordSubmit) {
    passwordSubmit.addEventListener("click", () => {
      const day = Number(dayInput.value);
      const month = Number(monthInput.value);

      if (day === CORRECT_DAY && month === CORRECT_MONTH) {
        passwordError.classList.add("hidden");
        passwordModal.style.opacity = "0";
        setTimeout(() => {
          window.location.href = "timeline.html";
        }, 400);
      } else {
        passwordError.classList.remove("hidden");
        passwordModal.querySelector(".modal-content").style.animation = "shake 0.3s";
        setTimeout(() => {
          passwordModal.querySelector(".modal-content").style.animation = "";
        }, 300);
      }
    });
  }
});

// Floating shapes
function createFloatingShape(container) {
  const span = document.createElement("span");
  span.classList.add("floating-shape");

  const isHeart = Math.random() > 0.3;
  span.textContent = isHeart ? "💜" : "✨";

  const startX = Math.random() * 100;
  const duration = 7000 + Math.random() * 5000;

  span.style.left = startX + "vw";
  span.style.bottom = "-40px";
  span.style.animationDuration = duration + "ms";
  span.style.fontSize = (0.8 + Math.random() * 0.6) + "rem";

  container.appendChild(span);

  span.addEventListener("animationend", () => {
    span.remove();
  });
}

// Letter opening
document.addEventListener("DOMContentLoaded", () => {
  const envelope = document.getElementById("envelope");
  const letterPaper = document.getElementById("letter-paper");

  if (envelope && letterPaper) {
    envelope.addEventListener("click", () => {
      letterPaper.classList.add("open");
      envelope.style.opacity = "0";
      envelope.style.transform = "scale(0.8)";
      envelope.style.pointerEvents = "none";
    });
  }
});

// TIMELINE PROGRESS
const timelineProgress = document.getElementById("timeline-progress");
const items = document.querySelectorAll(".timeline-item");

function updateTimelineProgress() {
  let maxVisibleBottom = 0;

  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    const dot = item.querySelector(".timeline-dot");

    if (rect.top < window.innerHeight * 0.8) {
      dot.classList.add("active");

      const absBottom = item.offsetTop + rect.height / 2;
      if (absBottom > maxVisibleBottom) {
        maxVisibleBottom = absBottom;
      }
    }
  });

  if (timelineProgress) {
    timelineProgress.style.height = maxVisibleBottom + "px";
  }
}

window.addEventListener("scroll", updateTimelineProgress);
window.addEventListener("load", updateTimelineProgress);
