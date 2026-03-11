/* ===== STAR RATING ===== */
let selectedRating = 0;
const stars = document.querySelectorAll(".rating-star");

stars.forEach((star) => {
  star.addEventListener("mouseenter", () => {
    const val = +star.dataset.val;
    stars.forEach((s) => s.classList.toggle("active", +s.dataset.val <= val));
  });
  star.addEventListener("mouseleave", () => {
    stars.forEach((s) =>
      s.classList.toggle("active", +s.dataset.val <= selectedRating),
    );
  });
  star.addEventListener("click", () => {
    selectedRating = +star.dataset.val;
    stars.forEach((s) =>
      s.classList.toggle("active", +s.dataset.val <= selectedRating),
    );
  });
});

/* ===== CHAR COUNTER ===== */
const msgEl = document.getElementById("message");
const countEl = document.getElementById("charCount");
msgEl.addEventListener("input", () => {
  const len = msgEl.value.length;
  countEl.textContent = `${len} / 1000`;
  countEl.classList.toggle("warn", len > 900);
});

/* ===== VALIDATION HELPERS ===== */
function setError(fieldId, show) {
  const el = document.getElementById("field-" + fieldId);
  if (el) el.classList.toggle("error", show);
}

function validate() {
  let ok = true;

  const fname = document.getElementById("fname").value.trim();
  setError("fname", !fname);
  if (!fname) ok = false;

  const lname = document.getElementById("lname").value.trim();
  setError("lname", !lname);
  if (!lname) ok = false;

  const email = document.getElementById("email").value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  setError("email", !emailOk);
  if (!emailOk) ok = false;

  const topic = document.getElementById("topic").value;
  setError("topic", !topic);
  if (!topic) ok = false;

  const msg = document.getElementById("message").value.trim();
  setError("message", msg.length < 10);
  if (msg.length < 10) ok = false;

  const terms = document.getElementById("terms").checked;
  const termsErr = document.getElementById("terms-error");
  termsErr.style.display = terms ? "none" : "flex";
  if (!terms) ok = false;

  return ok;
}

/* Clear error on input */
["fname", "lname", "email", "order", "topic", "message"].forEach((id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("input", () => {
    const fieldEl = document.getElementById("field-" + id);
    if (fieldEl) fieldEl.classList.remove("error");
  });
});

/* ===== SUBMIT ===== */
function handleSubmit() {
  if (!validate()) return;

  const btn = document.getElementById("submitBtn");
  btn.classList.add("loading");

  // Simulate network request
  setTimeout(() => {
    btn.classList.remove("loading");
    document.getElementById("formContent").style.display = "none";
    document.getElementById("successOverlay").classList.add("show");
  }, 1800);
}

/* ===== RESET ===== */
function resetForm() {
  document.getElementById("successOverlay").classList.remove("show");
  document.getElementById("formContent").style.display = "block";

  // Clear all fields
  ["fname", "lname", "email", "order", "message"].forEach((id) => {
    document.getElementById(id).value = "";
  });
  document.getElementById("topic").selectedIndex = 0;
  document.getElementById("newsletter").checked = false;
  document.getElementById("terms").checked = false;
  countEl.textContent = "0 / 1000";
  countEl.classList.remove("warn");
  selectedRating = 0;
  stars.forEach((s) => s.classList.remove("active"));
  document
    .querySelectorAll(".field.error")
    .forEach((f) => f.classList.remove("error"));
}
