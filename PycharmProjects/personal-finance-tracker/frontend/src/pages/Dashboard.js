import React, { useState, useEffect } from 'react';
import ChartView from '../components/ChartView';
import TransactionList from '../components/TransactionList';
import API_BASE from '../config';

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [loading, setLoading] = useState(true);

  async function fetchAll() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/transactions/`);
      const data = await res.json();
      setTransactions(data || []);

      // ✅ Income = all non-expense transactions
      const income = (data || [])
        .filter(t => (t.type || "").toLowerCase() !== "expense")
        .reduce((sum, t) => sum + Number(t.amount || 0), 0);

      // ✅ Expense = only expense transactions
      const expense = (data || [])
        .filter(t => (t.type || "").toLowerCase() === "expense")
        .reduce((sum, t) => sum + Number(t.amount || 0), 0);

      setSummary({ income, expense, balance: income - expense });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  // ✅ Build category totals for expenses
  const categoryMap = {};
  transactions
    .filter(t => (t.type || "").toLowerCase() === "expense")
    .forEach(t => {
      const c = t.category || 'Other';
      const val = Number(t.amount || 0);
      categoryMap[c] = (categoryMap[c] || 0) + val;
    });

  const labels = Object.keys(categoryMap);
  const chartData = labels.map(l => categoryMap[l]);

  return (
    <div className="dashboard">
      <div className="dashboard-top">
        <div className="summary-cards">
          <div className="card summary-card" style={{ borderLeft: '6px solid green' }}>
            <h4>Income</h4>
            <p className="big" style={{ color: 'green' }}>{summary.income.toFixed(2)}</p>
          </div>
          <div className="card summary-card" style={{ borderLeft: '6px solid red' }}>
            <h4>Expense</h4>
            <p className="big" style={{ color: 'red' }}>{summary.expense.toFixed(2)}</p>
          </div>
          <div className="card summary-card" style={{ borderLeft: '6px solid blue' }}>
            <h4>Balance</h4>
            <p className="big" style={{ color: 'blue' }}>{summary.balance.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-charts" style={{ marginTop: 16 }}>
        <div className="card chart-card">
          <h3>Spending by Category</h3>
          <ChartView type="pie" labels={labels} data={chartData} title="By Category" />
        </div>
        <div className="card chart-card">
          <h3>Recent Transactions</h3>
          <TransactionList refreshSignal={0} />
        </div>
      </div>
    </div>
  );
}
