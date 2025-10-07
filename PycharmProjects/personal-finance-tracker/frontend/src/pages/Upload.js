import React from 'react';
import UploadForm from '../components/UploadForm';

export default function Upload() {
  return React.createElement('div', { className: 'upload-page' },
    React.createElement('div', { className: 'card' }, React.createElement(UploadForm, null))
  );
}
