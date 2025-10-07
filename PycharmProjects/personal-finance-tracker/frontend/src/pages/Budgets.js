import React, { useState } from 'react';
import BudgetForm from '../components/BudgetForm';
import BudgetList from '../components/BudgetList';
import ChartView from '../components/ChartView';

export default function Budgets() {
  const [refreshSignal, setRefreshSignal] = useState(0);

  return (
    <div className="budgets-page">
      <div className="card chart-card">
        <h3>Manage Budgets</h3>
        <BudgetForm onAdded={() => setRefreshSignal(s => s + 1)} />
        <BudgetList refreshSignal={refreshSignal} />
      </div>

      {/* Optional: Chart placeholder for budgets */}
      <div className="card chart-card" style={{ marginTop: 20 }}>
        <h3>Budgets Overview</h3>
        <ChartView
          type="pie"
          labels={["Example1", "Example2"]}
          data={[500, 1200]}
          title="Budgets by Category"
        />
      </div>
    </div>
  );
}
