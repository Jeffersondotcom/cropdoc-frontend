import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Camera, Sprout } from 'lucide-react';

const Home = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col animate-fade-in pb-8 min-h-full relative">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574943320219-553eb213f72d')] bg-cover bg-center z-0"
      ></div>
      <div className="absolute inset-0 bg-[#1a3a22]/75 z-0"></div>

      {/* Hero Section */}
      <div className="px-6 py-12 text-center flex flex-col items-center mt-8 relative z-10">
        <h1 className="text-5xl font-black text-white mb-6 leading-tight drop-shadow-md">
          Diagnose.<br />Treat.<br />Grow.
        </h1>
        <p className="text-lg text-white mb-10 font-medium max-w-xs mx-auto leading-relaxed drop-shadow-md">
          AI-powered crop disease detection for African farmers.
        </p>

        <div className="bg-greendoc-dark/80 backdrop-blur-sm w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-12 border border-greendoc">
          <Sprout size={64} className="text-greendoc" />
        </div>

        <button
          onClick={() => navigate('/scan')}
          className="w-full max-w-xs mx-auto bg-greendoc hover:bg-greendoc-light text-white font-black py-4 px-6 rounded-xl shadow-lg transition-colors text-lg flex items-center justify-center gap-3"
        >
          <Camera size={24} />
          {t('scanYourCrop')}
        </button>
      </div>
    </div>
  );
};

export default Home;
