function togglePw(inputId, btn) {
  const input = document.getElementById(inputId);
  const icon = btn.querySelector("i");
  const show = input.type === "password";
  input.type = show ? "text" : "password";
  icon.className = show ? "fas fa-eye-slash" : "fas fa-eye";
}

function setError(id, show) {
  const el = document.getElementById("field-" + id);
  if (el) el.classList.toggle("error", show);
}

["email", "password"].forEach((id) => {
  document
    .getElementById(id)
    .addEventListener("input", () => setError(id, false));
});

function validate() {
  let ok = true;
  const email = document.getElementById("email").value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  setError("email", !emailOk);
  if (!emailOk) ok = false;

  const pw = document.getElementById("password").value;
  setError("password", !pw);
  if (!pw) ok = false;
  return ok;
}

function handleLogin() {
  if (!validate()) return;
  const btn = document.getElementById("submitBtn");
  btn.classList.add("loading");
  setTimeout(() => {
    btn.classList.remove("loading");
    document.getElementById("formContent").style.display = "none";
    document.getElementById("successOverlay").classList.add("show");
  }, 1600);
}
