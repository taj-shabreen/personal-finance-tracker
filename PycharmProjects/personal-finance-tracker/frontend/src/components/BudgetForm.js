import React, { useState } from 'react';
import API_BASE from '../config';

export default function BudgetForm({ onAdded }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!category || !amount) return;

    await fetch(`${API_BASE}/api/budgets/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category, amount: Number(amount) })
    });

    setCategory("");
    setAmount("");
    if (onAdded) onAdded();
  }

  return (
    <form onSubmit={handleSubmit} className="budget-form">
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Budget Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <button type="submit">Add Budget</button>
    </form>
  );
}
