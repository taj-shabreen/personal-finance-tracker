import React, { useState, useEffect } from 'react';
import API_BASE from '../config';

export default function TransactionList(props) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/transactions/`);
      const data = await res.json();
      setTransactions(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [props.refreshSignal]);

  // Delete transaction by ID
  const deleteTransaction = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/transactions/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data.message);
      fetchData(); // refresh the list
      if (props.onDeleted) props.onDeleted(); // notify parent to refresh if needed
    } catch (err) {
      console.error(err);
    }
  };

  return React.createElement('div', { className: 'card table-card' },
    React.createElement('h3', { className: 'card-title' }, 'Transactions'),
    loading
      ? React.createElement('div', { className: 'loader' }, 'Loading...')
      : React.createElement('table', { className: 'transactions-table', style: { width: "100%", borderCollapse: "collapse" } },
          React.createElement('thead', null,
            React.createElement('tr', { style: { backgroundColor: "#f2f2f2" } },
              React.createElement('th', null, 'Date'),
              React.createElement('th', null, 'Description'),
              React.createElement('th', null, 'Category'),
              React.createElement('th', null, 'Type'),
              React.createElement('th', null, 'Amount'),
              React.createElement('th', null, 'Action')
            )
          ),
          React.createElement('tbody', null,
            transactions.map((t) => React.createElement('tr', { key: t._id, style: { textAlign: "center" } },
              React.createElement('td', null, t.date || '-'),
              React.createElement('td', null, t.description || '-'),
              React.createElement('td', null, t.category || '-'),
              React.createElement('td', null, t.type || '-'),
              React.createElement('td', null, (t.type === 'expense' ? '-' : '') + (Number(t.amount || 0)).toFixed(2)),
              React.createElement('td', null,
                React.createElement('button', {
                  onClick: () => deleteTransaction(t._id),
                  style: {
                    backgroundColor: "#ff4d4f",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }
                }, "Delete")
              )
            ))
          )
        )
  );
}
