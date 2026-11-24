const buttons = document.querySelectorAll("[data-cycle]");
const prices = document.querySelectorAll(".price");
const billingStatus = document.querySelector("#billing-status");
const dialog = document.querySelector("dialog");
const usd = new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD", maximumFractionDigits: 0,
});

function changeBilling(cycle) {
  const unit = cycle === "yearly" ? "per year" : "per month";
  for (const price of prices) {
    price.textContent = usd.format(Number(price.dataset[cycle]));
    price.nextElementSibling.textContent = unit;
  }
  for (const button of buttons) {
    const active = button.dataset.cycle === cycle;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  }
  billingStatus.textContent = cycle === "yearly" ? "Yearly pricing shown." : "Monthly pricing shown.";
}

for (const button of buttons) {
  button.addEventListener("click", () => changeBilling(button.dataset.cycle));
}

for (const button of document.querySelectorAll("[data-plan]")) {
  button.addEventListener("click", () => {
    dialog.querySelector("h2").textContent = button.dataset.plan + " selected";
    dialog.querySelector("#selection-price").textContent =
      button.closest("article").querySelector(".cost").innerText.replace(/\s+/g, " ");
    dialog.showModal();
  });
}
