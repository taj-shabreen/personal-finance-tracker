import React, { useState, useEffect } from 'react';
import API_BASE from '../config';

export default function BudgetList({ refreshSignal }) {
  const [budgets, setBudgets] = useState([]);

  async function fetchBudgets() {
    try {
      const res = await fetch(`${API_BASE}/api/budgets/`);
      const data = await res.json();
      setBudgets(data || []);
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteBudget(id) {
    await fetch(`${API_BASE}/api/budgets/${id}`, { method: "DELETE" });
    fetchBudgets();
  }

  useEffect(() => {
    fetchBudgets();
  }, [refreshSignal]);

  return (
    <div className="budget-list">
      {budgets.length === 0 ? (
        <p>No budgets set yet.</p>
      ) : (
        <ul>
          {budgets.map(b => (
            <li key={b._id}>
              <strong>{b.category}</strong>: {b.amount}
              <button onClick={() => deleteBudget(b._id)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
