import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Camera, Zap, FileText, WifiOff, Globe2 } from 'lucide-react';

const Home = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col animate-fade-in pb-8">
      {/* Hero Section */}
      <div className="bg-cropdoc-light px-6 py-12 text-center rounded-b-3xl shadow-sm border-b border-cropdoc/10">
        <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border-4 border-cropdoc/20">
          <Camera size={48} className="text-cropdoc" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">{t('appTitle')}</h2>
        <p className="text-lg text-gray-700 mb-8 font-medium max-w-xs mx-auto leading-relaxed">
          {t('tagline')}
        </p>
        <button
          onClick={() => navigate('/scan')}
          className="w-full max-w-xs mx-auto bg-cropdoc hover:bg-cropdoc-dark text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-cropdoc/30 transition-all active:scale-95 text-lg flex items-center justify-center gap-3"
        >
          <Camera size={24} />
          {t('scanYourCrop')}
        </button>
      </div>

      {/* Features Section */}
      <div className="px-6 py-10">
        <h3 className="text-xl font-bold text-gray-900 mb-6 px-1">Why use CropDoc?</h3>
        
        <div className="space-y-4">
          <FeatureItem icon={<Zap size={24} className="text-amber-500" />} title={t('instantDiagnosis')} />
          <FeatureItem icon={<FileText size={24} className="text-blue-500" />} title={t('treatmentRecs')} />
          <FeatureItem icon={<WifiOff size={24} className="text-gray-500" />} title={t('worksOffline')} />
          <FeatureItem icon={<Globe2 size={24} className="text-purple-500" />} title={t('speaksLanguage')} />
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
  <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm active:bg-gray-50 transition-colors">
    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
      {icon}
    </div>
    <span className="font-bold text-gray-800 text-lg">{title}</span>
  </div>
);

export default Home;
