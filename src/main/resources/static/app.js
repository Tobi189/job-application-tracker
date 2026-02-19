// app.js

(function () {
  const overlay = document.getElementById("modalOverlay");
  const openBtn = document.getElementById("openModalBtn");
  const closeBtn = document.getElementById("closeModalBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const form = document.getElementById("jobForm") || (overlay ? overlay.querySelector("form") : null);

  if (!overlay || !openBtn) return;

  function setCreateMode() {
    const title = document.getElementById("modalTitle");
    if (title) title.textContent = "Add Job";

    if (form) {
      form.setAttribute("action", "/jobs");
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.textContent = "Save";
    }
  }

  function openModal() {
    if (window.closeNotesPopover) window.closeNotesPopover();

    setCreateMode();

    if (form) {
      form.reset();
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

})();

/* ----------------------------
   Edit button => reuse modal
----------------------------- */

function editJob(btn) {
  const overlay = document.getElementById("modalOverlay");
  const form = document.getElementById("jobForm") || (overlay ? overlay.querySelector("form") : null);
  if (!overlay || !form) return;

  if (window.closeNotesPopover) window.closeNotesPopover();

  const id = btn.getAttribute("data-id");
  if (!id) return;

  const title = document.getElementById("modalTitle");
  if (title) title.textContent = "Edit Job";

  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) submitBtn.textContent = "Update";

  form.setAttribute("action", `/jobs/${id}/update`);

  const setVal = (name, value) => {
    const el = form.querySelector(`[name="${name}"]`);
    if (!el) return;
    el.value = value ?? "";
  };

  setVal("company", btn.getAttribute("data-company"));
  setVal("position", btn.getAttribute("data-position"));
  setVal("status", btn.getAttribute("data-status"));
  setVal("appliedDate", btn.getAttribute("data-appliedDate"));
  setVal("notes", btn.getAttribute("data-notes"));

  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden", "false");

  const firstInput = overlay.querySelector("input, select, textarea");
  if (firstInput) firstInput.focus();
}

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
  // toggle
  if (activeNotesPopover && activeNotesSourceBtn === btn) {
    closeNotesPopover();
    return;
  }

  if (activeNotesPopover) closeNotesPopover();

  const fullText = (btn.getAttribute("data-notes") || "").trim();
  if (!fullText) return;

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

  const r = btn.getBoundingClientRect();
  const margin = 8;

  let top = r.bottom + margin;
  let left = r.left;

  const popRect = pop.getBoundingClientRect();

  if (left + popRect.width > window.innerWidth - margin) {
    left = window.innerWidth - popRect.width - margin;
  }
  left = Math.max(margin, left);

  if (top + popRect.height > window.innerHeight - margin) {
    top = r.top - popRect.height - margin;
  }
  top = Math.max(margin, top);

  pop.style.top = `${top}px`;
  pop.style.left = `${left}px`;

  pop.focus();

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
