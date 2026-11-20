# Parking Management System 🚗

A simple web application created as an academic project during my **Systems Analysis and Development** studies.

## About

This project manages reservations for a condominium parking lot with 10 numbered parking spaces.

## Features

- View available parking spaces.
- Register vehicle reservations and owner information.
- Prevent two vehicles from reserving the same space.
- View and remove existing reservations.
- Store reservations locally in the browser using `localStorage`.
- Display a simple English interface.

## Technologies

- HTML5
- CSS3
- JavaScript

## Getting started

1. Select **Code > Download ZIP** and extract the repository.
2. Open `index.html` in a web browser.
3. Select **View parking spaces** to see availability or **Register a reservation** to add a vehicle.

No additional libraries or server setup are required.

## Project structure

```text
parking-management/
├── index.html
├── style.css
├── script.js
└── README.md
```

## What I learned

- Building forms and tables with HTML.
- Styling pages with CSS.
- DOM manipulation and event handling with JavaScript.
- Using browser storage to keep data between visits.
- Checking inputs and preventing duplicate reservations.

## Notes

This is a learning project rather than a production parking service. Reservations are kept only in the local browser, not in a shared database. The updated script can read reservations stored by the earlier Portuguese version.
