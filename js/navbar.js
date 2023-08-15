
window.addEventListener("click", (event) => {
  if (!event.target.matches(".dropdown-btn")) {
    Array.from(document.querySelectorAll(".dropdown")).forEach((elt) => {
      elt.classList.remove("show");
    });
  }
});

Array.from(document.querySelectorAll(".dropdown-btn")).forEach((btn) => {
  const dropdown = btn.closest(".dropdown");
  if (dropdown) {
    btn.addEventListener("click", (evt) => {
      evt.preventDefault();
      dropdown.classList.toggle("show");
    });
  }
});
