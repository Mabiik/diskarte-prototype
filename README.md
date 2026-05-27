# Diskarte Prototype

This repository contains a small interactive HTML prototype for a personal finance app called Diskarte.

## Purpose

- `diskarte-prototype.html`: main app shell, UI structure, and mobile-style screens.
- `styling/style.css`: app styling extracted from the prototype.
- `main.js`: application entry point that bootstraps the module-based app.
- `components/tabBar.js`: reusable tab bar logic and markup.
- `composables/state.js`: shared application state and constants.
- `composables/ui.js`: shared UI utilities such as currency formatting and toast notifications.
- `composables/app.js`: core application logic, event handling, navigation, and global function binding.

## Notes

- The HTML file now loads external assets instead of inline script/style blocks.
- The app is organized into a standard folder structure for styling, components, and composables.
- No UI design or user-facing behavior was intentionally changed during the refactor.

## Run

Open `diskarte-prototype.html` in a browser that supports ES modules.
