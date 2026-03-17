// Inputs
const amountInput = document.getElementById("amount");
const rateInput = document.getElementById("rate");

// Result elements
const originalEl = document.getElementById("original");
const gstEl = document.getElementById("gst");
const finalEl = document.getElementById("final");

// Preset buttons
const presetButtons = document.querySelectorAll(".presets button");

// GST toggle
let gstType = "add";
const addBtn = document.getElementById("addBtn");
const removeBtn = document.getElementById("removeBtn");

// Preset rate handling
presetButtons.forEach(button => {
  button.addEventListener("click", () => {
    rateInput.value = button.dataset.rate;
    calculate();
  });
});

// Currency helper
function getCurrency() {
  return getComputedStyle(document.documentElement)
    .getPropertyValue("--currency")
    .replace(/"/g, "");
}

// Format helper
function format(value) {
  if (isNaN(value)) return "—";
  return getCurrency() + value.toFixed(2);
}

// Core calculation
function calculate() {
  const amount = parseFloat(amountInput.value);
  const rate = parseFloat(rateInput.value);

  if (!amount || amount <= 0 || isNaN(rate) || rate < 0) {
    originalEl.textContent = "—";
    gstEl.textContent = "—";
    finalEl.textContent = "—";
    return;
  }

  let original, gst, final;

  if (gstType === "add") {
    original = amount;
    gst = (amount * rate) / 100;
    final = original + gst;
  } else {
    final = amount;
    original = (amount * 100) / (100 + rate);
    gst = final - original;
  }

  originalEl.textContent = format(original);
  gstEl.textContent = format(gst);
  finalEl.textContent = format(final);
}

// Input listeners
["input", "change"].forEach(event => {
  amountInput.addEventListener(event, calculate);
  rateInput.addEventListener(event, calculate);
});

// Toggle logic
addBtn.addEventListener("click", () => {
  gstType = "add";
  addBtn.classList.add("active");
  removeBtn.classList.remove("active");
  calculate();
});

removeBtn.addEventListener("click", () => {
  gstType = "remove";
  removeBtn.classList.add("active");
  addBtn.classList.remove("active");
  calculate();
});