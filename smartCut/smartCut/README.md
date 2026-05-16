# ✂️ SmartCut — Client Management App

A clean, single-page React CRUD application for managing barbershop/salon clients.

## Features

- ✅ **Create** — Add new clients with name, phone, service, price, status & date
- ✏️ **Edit** — Update any client record via modal form
- 🗑️ **Delete** — Remove clients with confirmation dialog
- 🔍 **Search** — Live search by name, phone, or service
- 🔽 **Filter** — Filter by status (Pending, In Progress, Completed, Cancelled)
- 📊 **Sort** — Click column headers to sort ascending/descending
- 📈 **Stats Bar** — Live totals for clients, revenue, pending & completed

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- **React 18** with hooks (useState, useMemo, useEffect)
- **Vite** for fast dev/build
- **Vanilla CSS** with CSS variables — no UI library
- **Google Fonts** — Playfair Display + DM Sans

## Project Structure

```
smartCut/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.jsx       # Entry point
│   ├── App.jsx        # Full app (single page)
│   └── index.css      # Global styles & CSS variables
└── README.md
```

## Services Available
Fade Cut, Beard Trim, Full Haircut, Colour & Cut, Scalp Treatment, Kids Cut, Hot Towel Shave, Perm

## Status Types
- 🟡 Pending
- 🔵 In Progress
- 🟢 Completed
- 🔴 Cancelled
