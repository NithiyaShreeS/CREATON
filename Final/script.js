const welcomeModal = document.getElementById("welcomeModal");
const startBtn = document.getElementById("startBtn");

const eventType = document.getElementById("eventType");
const ticketCount = document.getElementById("ticketCount");
const promo = document.getElementById("promo");
const totalDisplay = document.getElementById("totalDisplay");
const bookingForm = document.getElementById("bookingForm");

const promos = {
  "SAVE10": 0.10,
  "HALF50": 0.50
};

startBtn.onclick = () => {
  welcomeModal.style.display = "none";
};

function getPrice() {
  return Number(eventType.options[eventType.selectedIndex].dataset.price || 0);
}

function updateTotal() {
  const price = getPrice();
  const tickets = Number(ticketCount.value);
  const code = promo.value.trim().toUpperCase();

  let total = price * tickets;

  if (promos[code]) {
    total -= total * promos[code];
  }

  totalDisplay.textContent = "₹" + total;
  bookingForm.dataset.total = total;
}
updateTotal();

eventType.onchange = updateTotal;
ticketCount.oninput = updateTotal;
promo.oninput = updateTotal;

bookingForm.onsubmit = (e) => {
  e.preventDefault();

  const name = document.getElementById("username").value;
  const event = eventType.value;
  const tickets = ticketCount.value;
  const total = bookingForm.dataset.total;

  if (!event) return alert("Select an event!");

  const params = new URLSearchParams({
    username: name,
    event: event,
    tickets: tickets,
    total: total
  });

  window.location = "confirm.html?" + params.toString();
};