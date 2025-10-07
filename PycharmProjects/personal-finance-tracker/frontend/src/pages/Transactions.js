import React, { useState } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';

export default function Transactions() {
  const [refreshSignal, setRefreshSignal] = useState(0);
  function onAdded() { setRefreshSignal(s => s + 1); }

  return React.createElement('div', { className: 'transactions-page' },
    React.createElement('div', { className: 'grid two-col' },
      React.createElement('div', null, React.createElement(TransactionForm, { onAdded })),
      React.createElement('div', null, React.createElement(TransactionList, { refreshSignal }))
    )
  );
}
