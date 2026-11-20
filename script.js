// Parking Management System
// A simple organization inspired by MVC: data, display, and user actions.

// Data
function getReservations() {
  const saved = localStorage.getItem("parkingReservations");
  if (saved !== null) {
    try { return JSON.parse(saved) || []; } catch (_) { return []; }
  }
  // Keep reservations saved by the original academic version.
  try {
    const oldReservations = JSON.parse(localStorage.getItem("reservas")) || [];
    return oldReservations.map(item => ({
      space: Number(item.vaga),
      licensePlate: item.placa,
      owner: item.proprietario,
      apartment: item.apartamento,
      building: item.bloco,
      model: item.modelo,
      color: item.cor
    }));
  } catch (_) { return []; }
}

function saveReservations(reservations) {
  localStorage.setItem("parkingReservations", JSON.stringify(reservations));
}

function removeReservation(space) {
  const updated = getReservations().filter(reservation => reservation.space !== space);
  saveReservations(updated);
}

// Display
function showScreen(screen) {
  document.getElementById("screen-spaces").classList.add("hidden");
  document.getElementById("screen-registration").classList.add("hidden");
  document.getElementById("screen-" + screen).classList.remove("hidden");
  if (screen === "spaces") showSpaces();
}

function showSpaces() {
  const reservations = getReservations();
  const table = document.getElementById("reservation-list");
  table.innerHTML = "";

  const available = [];
  for (let space = 1; space <= 10; space++) {
    const occupied = reservations.some(reservation => reservation.space === space);
    if (!occupied) available.push(space);
  }

  document.getElementById("available-spaces").textContent =
    available.length ? available.join(", ") : "No parking spaces available.";
  document.getElementById("list-message").textContent =
    reservations.length ? "" : "No reservations registered.";

  reservations.forEach(reservation => {
    const row = document.createElement("tr");
    const values = [reservation.space, reservation.licensePlate, reservation.owner,
      reservation.apartment, reservation.building, reservation.model, reservation.color];

    values.forEach(value => {
      const cell = document.createElement("td");
      cell.textContent = value ?? "";
      row.appendChild(cell);
    });

    const actionCell = document.createElement("td");
    const button = document.createElement("button");
    button.textContent = "Remove";
    button.className = "remove-button";
    button.addEventListener("click", () => {
      if (confirm("Remove reservation for space " + reservation.space + "?")) {
        removeReservation(reservation.space);
        showSpaces();
      }
    });
    actionCell.appendChild(button);
    row.appendChild(actionCell);
    table.appendChild(row);
  });
}

// User actions
document.getElementById("reservation-form").addEventListener("submit", event => {
  event.preventDefault();

  const reservation = {
    licensePlate: document.getElementById("license-plate").value.trim().toUpperCase(),
    owner: document.getElementById("owner").value.trim(),
    apartment: document.getElementById("apartment").value.trim(),
    building: document.getElementById("building").value.trim(),
    model: document.getElementById("model").value.trim(),
    color: document.getElementById("color").value.trim(),
    space: Number(document.getElementById("space").value)
  };

  if (!Number.isInteger(reservation.space) || reservation.space < 1 || reservation.space > 10) {
    alert("Choose a parking space between 1 and 10.");
    return;
  }

  const reservations = getReservations();
  if (reservations.some(item => item.space === reservation.space)) {
    alert("This parking space is already reserved. Choose another one.");
    return;
  }

  reservations.push(reservation);
  saveReservations(reservations);
  alert("Reservation saved successfully!");
  document.getElementById("reservation-form").reset();
  showScreen("spaces");
});

showSpaces();
