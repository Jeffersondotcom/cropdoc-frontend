import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { HistoryProvider } from './contexts/HistoryContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Scan from './pages/Scan';
import History from './pages/History';
import Pricing from './pages/Pricing';

function App() {
  return (
    <LanguageProvider>
      <HistoryProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="scan" element={<Scan />} />
              <Route path="history" element={<History />} />
              <Route path="pricing" element={<Pricing />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </HistoryProvider>
    </LanguageProvider>
  );
}

export default App;
