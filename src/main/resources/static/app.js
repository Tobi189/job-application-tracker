// app.js

(function () {
  const overlay = document.getElementById("modalOverlay");
  const openBtn = document.getElementById("openModalBtn");
  const closeBtn = document.getElementById("closeModalBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const form = overlay ? overlay.querySelector("form") : null;

  if (!overlay || !openBtn) return;

  function openModal() {
    // Close notes popover if it's open (polish)
    if (window.closeNotesPopover) window.closeNotesPopover();

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

  // Close when clicking outside the modal box
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.classList.contains("hidden")) closeModal();
  });

  // Optional: hide immediately on submit (page will redirect anyway)
  if (form) form.addEventListener("submit", closeModal);
})();

/* ----------------------------
   Notes popover (table notes)
----------------------------- */

let activeNotesPopover = null;
let activeNotesSourceBtn = null;

function closeNotesPopover() {
  if (!activeNotesPopover) return;
  activeNotesPopover.remove();
  activeNotesPopover = null;
  activeNotesSourceBtn = null;
}

function openNotesPopover(btn) {
  // Toggle: clicking same button closes
  if (activeNotesPopover && activeNotesSourceBtn === btn) {
    closeNotesPopover();
    return;
  }

  // Close any existing popover first
  if (activeNotesPopover) closeNotesPopover();

  const fullText = (btn.getAttribute("data-notes") || "").trim();
  if (!fullText) return; // don't open empty notes

  const pop = document.createElement("div");
  pop.className = "notes-popover";
  pop.tabIndex = -1;

  pop.innerHTML = `
    <div class="notes-popover-title">Notes</div>
    <p class="notes-popover-text"></p>
  `;
  pop.querySelector(".notes-popover-text").textContent = fullText;

  document.body.appendChild(pop);
  activeNotesPopover = pop;
  activeNotesSourceBtn = btn;

  // Position near the clicked button
  const r = btn.getBoundingClientRect();
  const margin = 8;

  // default: below-left
  let top = r.bottom + margin;
  let left = r.left;

  // Measure after adding to DOM
  const popRect = pop.getBoundingClientRect();

  // Keep inside viewport horizontally
  if (left + popRect.width > window.innerWidth - margin) {
    left = window.innerWidth - popRect.width - margin;
  }
  left = Math.max(margin, left);

  // Keep inside viewport vertically (try above if needed)
  if (top + popRect.height > window.innerHeight - margin) {
    top = r.top - popRect.height - margin;
  }
  top = Math.max(margin, top);

  pop.style.top = `${top}px`;
  pop.style.left = `${left}px`;

  // Focus so "focus switches" closes it
  pop.focus();

  // Close rules
  const onDocMouseDown = (e) => {
    if (!activeNotesPopover) return;
    if (activeNotesPopover.contains(e.target) || btn.contains(e.target)) return;
    closeNotesPopover();
    cleanup();
  };

  const onDocFocusIn = (e) => {
    if (!activeNotesPopover) return;
    if (activeNotesPopover.contains(e.target) || btn.contains(e.target)) return;
    closeNotesPopover();
    cleanup();
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      closeNotesPopover();
      cleanup();
    }
  };

  // If the page scrolls/resizes, close (prevents weird floating)
  const onScrollOrResize = () => {
    closeNotesPopover();
    cleanup();
  };

  function cleanup() {
    document.removeEventListener("mousedown", onDocMouseDown, true);
    document.removeEventListener("focusin", onDocFocusIn, true);
    document.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("scroll", onScrollOrResize, true);
    window.removeEventListener("resize", onScrollOrResize);
  }

  document.addEventListener("mousedown", onDocMouseDown, true);
  document.addEventListener("focusin", onDocFocusIn, true);
  document.addEventListener("keydown", onKeyDown);
  window.addEventListener("scroll", onScrollOrResize, true);
  window.addEventListener("resize", onScrollOrResize);
}
