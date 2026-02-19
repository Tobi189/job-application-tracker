(function () {
  const overlay = document.getElementById("modalOverlay");
  const openBtn = document.getElementById("openModalBtn");
  const closeBtn = document.getElementById("closeModalBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const form = overlay ? overlay.querySelector("form") : null;

  if (!overlay || !openBtn) return;

  function openModal() {
    // reset old values BEFORE showing
    if (form) {
      form.reset();

      // optional: set default status every time
      const status = form.querySelector('select[name="status"]');
      if (status) status.value = "APPLIED";
    }

    overlay.classList.remove("hidden");
    overlay.setAttribute("aria-hidden", "false");

    const firstInput = overlay.querySelector("input, select, textarea");
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    overlay.classList.add("hidden");
    overlay.setAttribute("aria-hidden", "true");

    // also clear on close (so if user cancels, it doesn't keep stuff)
    if (form) form.reset();
  }

  openBtn.addEventListener("click", openModal);

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeModal);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.classList.contains("hidden")) closeModal();
  });

  // You can remove this; redirect will close it anyway.
  // But keeping it doesn't hurt.
  if (form) form.addEventListener("submit", closeModal);
})();
