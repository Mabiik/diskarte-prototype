export const state = {
  privacyMode: false,
  theme: 'dark',
  selectedType: 'expense',
  selectedCategory: 'Food',
  amountInput: '',
  netWorth: 218420,
  monthSpent: 24580,
  transactions: [
    { id: 1, name: 'Jollibee', emoji: '🍔', category: 'Food', account: 'BPI Credit · Today', amount: -285 },
    { id: 2, name: 'Grab Ride', emoji: '🛺', category: 'Transport', account: 'GCash · Today', amount: -142 },
    { id: 3, name: 'Upwork Payment', emoji: '💼', category: 'Income', account: 'BPI Savings · Yesterday', amount: 18500 },
    { id: 4, name: 'Globe Load', emoji: '📱', category: 'Bills', account: 'GCash · Yesterday', amount: -300 },
  ],
  currentTxn: null,
};

export const categoryEmojis = {
  Food: '🍔',
  Transport: '🛺',
  Bills: '🏠',
  Shopping: '🛍️',
  Health: '💊',
  Leisure: '🎬',
  Learn: '📚',
  Other: '⋯',
};
