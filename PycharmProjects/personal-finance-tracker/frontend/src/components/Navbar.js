import React from 'react';

export default function Navbar() {
  return React.createElement('header', { className: 'navbar' },
    React.createElement('div', { className: 'nav-inner' },
      React.createElement('div', { className: 'brand' }, 'FinanceTracker'),
      React.createElement('nav', { className: 'nav-links' },
        React.createElement('a', { href: '#/dashboard', className: 'nav-link' }, 'Dashboard'),
        React.createElement('a', { href: '#/transactions', className: 'nav-link' }, 'Transactions'),
        React.createElement('a', { href: '#/upload', className: 'nav-link' }, 'Upload'),
        React.createElement('a', { href: '#/budgets', className: 'nav-link' }, 'Budgets')
      )
    )
  );
}
