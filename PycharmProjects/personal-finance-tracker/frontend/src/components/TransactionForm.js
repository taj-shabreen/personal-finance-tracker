import React, { useState } from 'react';
import API_BASE from '../config';

export default function TransactionForm(props) {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Other');
  const [status, setStatus] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    const payload = { date, description, amount: parseFloat(amount || 0), type, category };
    try {
      setStatus('saving');
      const res = await fetch(`${API_BASE}/api/transactions/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to save');
      setStatus('saved');
      setDate(''); setDescription(''); setAmount(''); setType('expense'); setCategory('Other');
      if (props.onAdded) props.onAdded();
      setTimeout(()=> setStatus(null), 1300);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  return React.createElement('form', { className: 'card form-card', onSubmit },
    React.createElement('h3', { className: 'form-title' }, 'Add Transaction'),
    React.createElement('div', { className: 'form-row' },
      React.createElement('label', null, 'Date'),
      React.createElement('input', { type: 'date', value: date, onChange: e=>setDate(e.target.value), required: true })
    ),
    React.createElement('div', { className: 'form-row' },
      React.createElement('label', null, 'Description'),
      React.createElement('input', { type: 'text', value: description, onChange: e=>setDescription(e.target.value), placeholder: 'e.g., Grocery, Salary' })
    ),
    React.createElement('div', { className: 'form-row' },
      React.createElement('label', null, 'Amount'),
      React.createElement('input', { type: 'number', step: '0.01', value: amount, onChange: e=>setAmount(e.target.value), required: true })
    ),
    React.createElement('div', { className: 'form-row' },
      React.createElement('label', null, 'Type'),
      React.createElement('select', { value: type, onChange: e=>setType(e.target.value) },
        React.createElement('option', { value: 'expense' }, 'Expense'),
        React.createElement('option', { value: 'income' }, 'Income')
      )
    ),
    React.createElement('div', { className: 'form-row' },
      React.createElement('label', null, 'Category'),
      React.createElement('input', { type: 'text', value: category, onChange: e=>setCategory(e.target.value) })
    ),
    React.createElement('div', { className: 'form-actions' },
      React.createElement('button', { type: 'submit', className: 'btn primary' }, 'Add'),
      status && React.createElement('span', { className: 'status ' + status }, status)
    )
  );
}
