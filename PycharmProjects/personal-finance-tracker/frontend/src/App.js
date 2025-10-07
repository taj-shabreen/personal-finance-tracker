import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Upload from './pages/Upload';
import Budgets from './pages/Budgets';

function App() {
  const [route, setRoute] = useState(() => (window.location.hash || '#/dashboard').replace('#', ''));

  useEffect(() => {
    function onHashChange() {
      setRoute((window.location.hash || '#/dashboard').replace('#', ''));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  let PageComponent = Dashboard;
  if (route === '/transactions') PageComponent = Transactions;
  else if (route === '/upload') PageComponent = Upload;
  else if (route === '/budgets') PageComponent = Budgets;
  else PageComponent = Dashboard;

  return React.createElement('div', { className: 'app-root' },
    React.createElement(Navbar, null),
    React.createElement('main', { className: 'main-container' }, React.createElement(PageComponent, null)),

    // Footer added here
   React.createElement('footer', {
    style: {
        textAlign: "center",
        marginTop: "2rem",
        padding: "1rem 0",
        backgroundColor: "#f1f1f1",
        borderTop: "1px solid #ddd",
        fontSize: "0.9rem",
        color: "#333",
        fontFamily: "Arial, sans-serif"
    } },
"Developed by ",
React.createElement(
  'span',
  null,
  React.createElement('a', {
      href: "https://github.com/taj-shabreen",
      target: "_blank",
      rel: "noopener noreferrer",
      style: { color: "#1DA1F2", fontWeight: "bold", textDecoration: "none", marginRight: "6px" }
  }, "Shabreen Taj ,"),
  React.createElement('span', { style: { color: "#1DA1F2", fontWeight: "bold", marginRight: "6px" } }, "Deepthi ,"),
  React.createElement('span', { style: { color: "#1DA1F2", fontWeight: "bold" } }, "Sadvika")

)
)

  );
}

export default App;
