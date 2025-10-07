import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function ChartView({ type = 'pie', labels = [], data = [], title = '' }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }
    chartRef.current = new Chart(ctx, {
      type: type,
      data: {
        labels: labels,
        datasets: [{
          label: title,
          data: data,
          backgroundColor: [
            'rgba(54, 162, 235, 0.85)',
            'rgba(75, 192, 192, 0.85)',
            'rgba(255, 206, 86, 0.85)',
            'rgba(255, 99, 132, 0.85)',
            'rgba(153, 102, 255, 0.85)',
            'rgba(255, 159, 64, 0.85)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
          title: { display: !!title, text: title }
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [type, labels.join('|'), data.join('|'), title]);

  return React.createElement('div', { className: 'chart-wrapper' },
    React.createElement('canvas', { ref: canvasRef })
  );
}
