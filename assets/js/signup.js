/* ===== AVATAR PICKER ===== */
let selectedAvatar = "🎮";
function pickAvatar(el) {
  document
    .querySelectorAll(".avatar-opt")
    .forEach((a) => a.classList.remove("selected"));
  el.classList.add("selected");
  selectedAvatar = el.dataset.val;
}

/* ===== PASSWORD TOGGLE ===== */
function togglePw(inputId, btn) {
  const input = document.getElementById(inputId);
  const icon = btn.querySelector("i");
  const show = input.type === "password";
  input.type = show ? "text" : "password";
  icon.className = show ? "fas fa-eye-slash" : "fas fa-eye";
}

/* ===== PASSWORD STRENGTH ===== */
function updateStrength(val) {
  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  const segs = [1, 2, 3, 4];
  const labels = ["", "Weak", "Medium", "Strong", "Very Strong"];
  const cls = ["", "weak", "medium", "strong", "strong"];

  segs.forEach((i) => {
    const seg = document.getElementById("seg" + i);
    seg.className = "pw-seg";
    if (i <= score) seg.classList.add(cls[score]);
  });

  const lbl = document.getElementById("pwLabel");
  lbl.textContent = val.length
    ? labels[score] || "Enter a password"
    : "Enter a password";
  lbl.style.color =
    score <= 1
      ? "var(--neon-pink)"
      : score === 2
        ? "#f59e0b"
        : "var(--neon-green)";
}

/* ===== USERNAME CHECK ===== */
function checkUsername(input) {
  const val = input.value;
  const ok = /^[a-zA-Z0-9_]{3,}$/.test(val);
  const f = document.getElementById("field-username");
  if (val.length > 0) f.classList.toggle("error", !ok);
  else f.classList.remove("error");
}

/* ===== STEP PROGRESS ===== */
let currentStep = 1;
function setStep(n) {
  [1, 2, 3].forEach((i) => {
    const el = document.getElementById("step" + i);
    el.classList.remove("active", "done");
    if (i < n) el.classList.add("done");
    if (i === n) el.classList.add("active");
  });
}

/* Watch fields to animate steps */
["fname", "lname", "username", "email"].forEach((id) => {
  const el = document.getElementById(id);
  el.addEventListener("blur", () => {
    const filled = ["fname", "lname", "username", "email"].filter((f) =>
      document.getElementById(f).value.trim(),
    ).length;
    if (filled >= 1) setStep(2);
  });
});
["password", "confirm", "dob"].forEach((id) => {
  const el = document.getElementById(id);
  el.addEventListener("blur", () => {
    if (document.getElementById("password").value.length >= 8) setStep(3);
  });
});

/* ===== ERROR HELPERS ===== */
function setError(id, show) {
  const el = document.getElementById("field-" + id);
  if (el) el.classList.toggle("error", show);
}

const allFields = [
  "fname",
  "lname",
  "username",
  "email",
  "dob",
  "password",
  "confirm",
];
allFields.forEach((id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("input", () => setError(id, false));
});

/* ===== VALIDATE ===== */
function validate() {
  let ok = true;

  const fname = document.getElementById("fname").value.trim();
  setError("fname", !fname);
  if (!fname) ok = false;

  const lname = document.getElementById("lname").value.trim();
  setError("lname", !lname);
  if (!lname) ok = false;

  const username = document.getElementById("username").value.trim();
  const unOk = /^[a-zA-Z0-9_]{3,}$/.test(username);
  setError("username", !unOk);
  if (!unOk) ok = false;

  const email = document.getElementById("email").value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  setError("email", !emailOk);
  if (!emailOk) ok = false;

  const dob = document.getElementById("dob").value;
  let dobOk = false;
  if (dob) {
    const age = (Date.now() - new Date(dob)) / (365.25 * 24 * 3600 * 1000);
    dobOk = age >= 13;
  }
  setError("dob", !dobOk);
  if (!dobOk) ok = false;

  const pw = document.getElementById("password").value;
  setError("password", pw.length < 8);
  if (pw.length < 8) ok = false;

  const confirm = document.getElementById("confirm").value;
  setError("confirm", confirm !== pw);
  if (confirm !== pw) ok = false;

  const terms = document.getElementById("terms").checked;
  const termsErr = document.getElementById("terms-error");
  termsErr.style.display = terms ? "none" : "flex";
  if (!terms) ok = false;

  return ok;
}

/* ===== SUBMIT ===== */
function handleSignup() {
  if (!validate()) return;
  const btn = document.getElementById("submitBtn");
  btn.classList.add("loading");
  // Animate step to done
  setStep(3);
  setTimeout(() => {
    btn.classList.remove("loading");
    document.getElementById("successAvatar").textContent = selectedAvatar;
    document.getElementById("formContent").style.display = "none";
    document.getElementById("successOverlay").classList.add("show");
  }, 1800);
}
