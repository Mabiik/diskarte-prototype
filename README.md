# Diskarte Prototype

## Overview

**Diskarte** is an interactive HTML5 prototype for a personal finance management application designed specifically for Filipino freelancers, online workers, and anyone with irregular income patterns. The name "Diskarte" is Filipino slang meaning resourcefulness or making do with what you have—embodying the app's philosophy of practical financial management.

This prototype demonstrates core features including transaction tracking, emergency fund planning, account management, spending insights, subscription monitoring, and utang (debt) tracking with a focus on user-friendly design and accessibility.

**Live Demo:** [https://diskarte-prototype.vercel.app/](https://diskarte-prototype.vercel.app/)

---

## Features

- **Dashboard**: Quick overview of net worth, emergency fund progress, and recent transactions
- **Transaction Management**: Add, view, and delete transactions with category selection and amount input via keypad
- **Emergency Fund Tracker**: Visual progress ring and adjustable monthly savings targets
- **Account Management**: Track multiple cash wallets, bank accounts, and credit cards
- **Spending Insights**: Weekly spending charts and category-based spending breakdown
- **Utang Tracker**: Monitor money lent to and borrowed from friends and family
- **Subscription Manager**: Track recurring subscriptions and identify financial leaks
- **Privacy Mode**: Blur sensitive financial data on demand
- **Theme Toggle**: Switch between dark and light theme modes
- **Notifications**: Alert system for spending patterns, bills, and reminders

---

## Architecture

The prototype follows a modular architecture with clean separation of concerns:

```
composables/
├── app.js          # Core logic, navigation, event handlers
├── state.js        # Centralized state management and constants
└── ui.js           # Shared utilities (currency formatting, toasts)

components/
└── tabBar.js       # Reusable tab bar component logic

styling/
└── style.css       # All app styling and theme variables

main.js            # Application entry point
diskarte-prototype.html  # HTML shell and screen markup
```

### Key Design Patterns

- **Module-based structure**: Each feature area has its own composable
- **Centralized state**: Single source of truth for app data
- **Event delegation**: Efficient event handling via data attributes
- **CSS Variables**: Theme and color management via CSS custom properties

---

## File Structure & Purposes

| File | Purpose |
|------|---------|
| `diskarte-prototype.html` | Main app shell containing all screen markup and DOM structure |
| `styling/style.css` | Complete app styling, CSS variables, theme definitions, and responsive design |
| `main.js` | Entry point that imports and initializes the app |
| `components/tabBar.js` | Reusable tab bar HTML generation and initialization logic |
| `composables/state.js` | Centralized state object, initial data, and emoji mappings |
| `composables/ui.js` | Utility functions for currency formatting and toast notifications |
| `composables/app.js` | Core app logic: screen navigation, event listeners, transaction handling, theme/privacy toggles |

---

## Getting Started

### Prerequisites

- Modern web browser with ES6 module support (Chrome, Firefox, Safari, Edge)
- No build tools or server required—runs directly as static files

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/diskarte-prototype.git
   cd diskarte-prototype
   ```

2. Open in browser:
   ```bash
   # Option 1: Direct file access
   open diskarte-prototype.html
   
   # Option 2: Using Python HTTP server
   python3 -m http.server 8000
   # Then visit http://localhost:8000/diskarte-prototype.html
   
   # Option 3: Using Node.js http-server
   npx http-server
   # Then visit http://localhost:8080/diskarte-prototype.html
   ```

---

## Tutorial / How to Use

### Welcome Screen
- Tap **"Get Started"** to proceed to login
- Tap **"I already have an account"** to sign in directly

### Dashboard (Home)
- View your **Net Worth** and **Emergency Fund** progress
- See **Daily Average** spending and **This Month** total
- Browse **Recent Transactions** (most recent 5)
- Navigate to other screens via bottom tab bar

### Adding a Transaction
1. Tap the **"+"** button or navigate to **"Add Transaction"** screen
2. Select transaction type: **Expense**, **Income**, or **Transfer**
3. Use the numeric keypad to enter amount
4. Select a **Category** (Food, Transport, Bills, etc.)
5. Choose **Account** and **Date**
6. Tap **"Save"** to record

### Emergency Fund
- View progress toward your monthly savings goal
- Drag the **slider** to adjust target (1–12 months)
- See real-time calculations of required monthly savings

### Viewing Transactions
- Tap any transaction in the list to view full details
- Edit or delete transactions from the detail screen

### Managing Accounts
- View all accounts and their balances
- Tap any account to see transaction history
- Accounts include cash wallets, bank accounts, and credit cards

### Insights
- Weekly spending chart showing daily trends
- Category breakdown with visual meters
- Spending alerts and pattern observations

### Subscriptions
- Track all active subscriptions and renewal dates
- See monthly "bleed" (total recurring charges)
- Identify unused or high-cost subscriptions

### More / Profile
- **Privacy Mode**: Blur all financial amounts
- **Light Theme**: Toggle between dark and light UI
- View profile and upgrade to **Diskarte Pro**
- Access subscriptions, utang tracker, and notifications

---

## Technical Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Module System**: ES6 modules (no bundler required)
- **State Management**: Plain JavaScript object
- **Styling**: CSS custom properties (variables) and flexbox layout
- **Data**: Client-side only (no backend/database)

---

## Key Behaviors & Logic

### Navigation
- All screen navigation handled via `show(screenName)` function
- Active screens are highlighted in the sidebar thumbnail view
- Back buttons use `data-go` attributes to specify target screens

### Transaction Management
- Transactions stored in `state.transactions` array
- Amounts stored as signed integers (negative for expenses)
- Category emojis mapped via `categoryEmojis` object
- Net worth and monthly spent totals update dynamically

### Theme & Privacy
- Theme state toggles between 'dark' and 'light'
- Privacy mode applies visual blur to financial values
- Toggling persists visual state but resets on page reload (prototype behavior)

### Emergency Fund Calculations
- Target = months × 30 × daily_avg_spending
- Progress = (current_savings / target) × 100%
- Months covered = current_savings / (daily_avg × 30)

---

## Deployment

### Vercel (Recommended)

The prototype is deployed and live at: [https://diskarte-prototype.vercel.app/](https://diskarte-prototype.vercel.app/)

#### Deploy Your Own:

1. Push code to GitHub
2. Connect GitHub repo to [Vercel](https://vercel.com)
3. Vercel auto-deploys on every push to production branch
4. No environment variables or build configuration needed

### GitHub Pages

1. Push to GitHub
2. Enable GitHub Pages in repository settings
3. Select `main` or `production` branch as source
4. Access at `https://yourusername.github.io/diskarte-prototype/`

### Local Deployment

For testing before cloud deployment:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js
npx http-server
```

Then open `http://localhost:8000/diskarte-prototype.html`

---

## Project Status

**Version:** Prototype v3 (Interactive)

This is a **non-functional prototype** designed for:
- User experience (UX) and user interface (UI) validation
- Design iteration and feedback
- Capstone/thesis demonstration of concepts

### Scope (Prototype)
- ✅ Mobile-first responsive design
- ✅ Complete screen layouts and interactions
- ✅ Interactive keypad for transaction entry
- ✅ Navigation and screen transitions
- ✅ Theme and privacy toggles
- ✅ Dynamic calculations (spending insights, emergency fund)
- ❌ No backend or data persistence
- ❌ No real authentication
- ❌ No account linking or bank integrations

### Future Enhancements (Production)
- Backend API for data persistence
- Real user authentication and authorization
- Bank and fintech integrations (Open Banking APIs)
- Machine learning for spending predictions
- Scheduled notifications and alerts
- Multi-user household support
- Bill splitting and group expenses
- CSV/PDF export functionality
- Advanced analytics and reporting
- Mobile native apps (React Native / Flutter)

---

## Development Notes

### Refactoring & Organization
- Extracted from single inline HTML file to modular structure
- CSS moved to separate stylesheet with CSS variable theming
- JavaScript split into composables for state, UI, and app logic
- Maintains 100% original design and user-facing behavior

### Browser Compatibility
- Requires ES6 module support (all modern browsers)
- Tested on Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Mobile browsers fully supported (iOS Safari, Chrome Mobile)

### Performance
- No external dependencies beyond Google Fonts
- Lightweight module system (no bundler overhead)
- CSS variables enable fast theme switching
- Client-side rendering with minimal reflows

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Blank page on load | Ensure browser supports ES6 modules; check console for errors |
| Screens don't load | Verify all files are in correct relative paths |
| Styling looks broken | Clear browser cache; reload with `Ctrl+Shift+R` (hard refresh) |
| Can't add transactions | Ensure JavaScript is enabled in browser |
| Theme toggle doesn't persist | Expected in prototype; would need localStorage in production |

---

## License

This project is created as a capstone/thesis prototype. Feel free to use, modify, and share for educational purposes.

**Author:** Kenny Austria  
**Institution:** [Your School/University]  
**Date:** May 2026

---

## References & Inspiration

- **Filipino FinTech Market**: Growing demand for accessible, culturally-aware financial tools
- **Design Philosophy**: Human-centered design for irregular income earners
- **Target Users**: Freelancers, remote workers, gig economy participants in the Philippines

---

**Questions or feedback?** Open an issue on GitHub or reach out directly.

