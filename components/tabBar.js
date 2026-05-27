export function tabBarHTML(active) {
  const tabs = [
    { id: 'home', go: 'dashboard', label: 'Home', svg: '<path d="M3 12l9-9 9 9"/><path d="M5 10v10h14V10"/>' },
    { id: 'accounts', go: 'accounts', label: 'Accounts', svg: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18"/>' },
    { id: 'add', go: 'add', label: '', svg: '' },
    { id: 'insights', go: 'insights', label: 'Insights', svg: '<path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/>' },
    { id: 'more', go: 'more', label: 'More', svg: '<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>' },
  ];

  return tabs.map((tab) => {
    if (tab.id === 'add') {
      return `<div class="tab add" data-go="add"><div class="tab-add-btn"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></div></div>`;
    }

    return `<div class="tab ${active === tab.id ? 'active' : ''}" data-go="${tab.go}"><svg viewBox="0 0 24 24">${tab.svg}</svg><span>${tab.label}</span></div>`;
  }).join('');
}

export function initTabBars() {
  const mappings = [
    { screen: 'dashboard', active: 'home' },
    { screen: 'accounts', active: 'accounts' },
    { screen: 'emergency', active: 'home' },
    { screen: 'insights', active: 'insights' },
    { screen: 'utang', active: 'insights' },
    { screen: 'notifications', active: 'home' },
    { screen: 'more', active: 'more' },
    { screen: 'subscriptions', active: 'insights' },
  ];

  mappings.forEach(({ screen, active }) => {
    const el = document.querySelector(`#screen-${screen} .tab-bar`);
    if (el) {
      el.innerHTML = tabBarHTML(active);
    }
  });
}
