import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Home, Camera, CreditCard, Globe, Clock } from 'lucide-react';

const Layout = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navItems = [
    { path: '/', label: t('home'), icon: <Home size={24} /> },
    { path: '/scan', label: t('scan'), icon: <Camera size={24} /> },
    { path: '/history', label: t('history'), icon: <Clock size={24} /> },
    { path: '/pricing', label: t('pricing'), icon: <CreditCard size={24} /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-greendoc-dark pb-16 font-sans">
      {/* Top Bar */}
      <header className="bg-greendoc-dark border-b border-greendoc sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-greendoc-light">GreenDoc</Link>
          <div className="flex items-center space-x-2">
            <Globe size={18} className="text-gray-300" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-greendoc text-white border-none rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-greendoc-light outline-none cursor-pointer"
            >
              <option value="en">EN</option>
              <option value="ha">HA</option>
              <option value="yo">YO</option>
              <option value="ig">IG</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-md mx-auto w-full bg-greendoc-dark min-h-[calc(100vh-4rem)] text-white">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-greendoc-dark border-t border-greendoc z-10 pb-safe">
        <div className="max-w-md mx-auto flex justify-between px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center w-full py-3 transition-colors ${
                  isActive ? 'text-greendoc-light' : 'text-gray-400 hover:text-greendoc-light/80'
                }`}
              >
                <div className={`${isActive ? 'scale-110' : ''} transition-transform duration-200`}>
                  {item.icon}
                </div>
                <span className={`text-[10px] mt-1 font-medium ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
