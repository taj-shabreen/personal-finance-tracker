import React, { useState } from 'react';
import API_BASE from '../config';

export default function UploadForm(props) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [status, setStatus] = useState(null);

  async function onUpload(e) {
    e.preventDefault();
    if (!file) return alert('Choose a file first');
    const fd = new FormData();
    fd.append('file', file);
    try {
      setStatus('parsing');
      const res = await fetch(`${API_BASE}/api/transactions/upload`, { method: 'POST', body: fd });
      const json = await res.json();
      setPreview(json.parsed || []);
      setStatus('parsed');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  async function saveAll() {
    if (!preview.length) return alert('No preview data to save');
    setStatus('saving');
    let count = 0;
    for (const t of preview) {
      try {
        const res = await fetch(`${API_BASE}/api/transactions/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(t)
        });
        if (res.ok) count++;
      } catch (err) {
        console.error(err);
      }
    }
    setStatus('saved ' + count + ' items');
    if (props.onSaved) props.onSaved();
  }

  return React.createElement('div', { className: 'card upload-card' },
    React.createElement('h3', { className: 'card-title' }, 'Upload Bank Statement (CSV / Excel)'),
    React.createElement('form', { onSubmit: onUpload },
      React.createElement('input', { type: 'file', accept: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel', onChange: e => setFile(e.target.files[0]) }),
      React.createElement('div', { className: 'form-actions' },
        React.createElement('button', { type: 'submit', className: 'btn' }, 'Parse File'),
        React.createElement('button', { type: 'button', className: 'btn primary', onClick: saveAll }, 'Save All')
      )
    ),
    status && React.createElement('div', { className: 'upload-status' }, status),
    preview.length > 0 && React.createElement('div', { className: 'preview-list' },
      React.createElement('h4', null, 'Preview'),
      React.createElement('table', { className: 'transactions-table' },
        React.createElement('thead', null, React.createElement('tr', null,
          React.createElement('th', null, 'Date'),
          React.createElement('th', null, 'Desc'),
          React.createElement('th', null, 'Category'),
          React.createElement('th', null, 'Type'),
          React.createElement('th', null, 'Amount')
        )),
        React.createElement('tbody', null,
          preview.map((t, i) => React.createElement('tr', { key: i },
            React.createElement('td', null, t.date || '-'),
            React.createElement('td', null, t.description || '-'),
            React.createElement('td', null, t.category || '-'),
            React.createElement('td', null, t.type || '-'),
            React.createElement('td', null, (t.type === 'expense' ? '-' : '') + (Number(t.amount || 0)).toFixed(2))
          ))
        )
      )
    )
  );
}
