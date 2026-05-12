import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Check } from 'lucide-react';

const Pricing = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col p-6 animate-fade-in pb-20 text-white min-h-full">
      <h2 className="text-2xl font-bold mb-2">{t('pricing')}</h2>
      <p className="text-gray-200 mb-6 drop-shadow-sm">Choose a plan that fits your farm's needs.</p>

      <div className="space-y-6">
        {/* Free Tier */}
        <div className="bg-black/20 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-greendoc relative overflow-hidden">
          <h3 className="text-xl font-bold mb-1">{t('freeTier')}</h3>
          <p className="text-3xl font-black mb-4">₦0<span className="text-sm text-gray-500 font-normal">/mo</span></p>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-3 text-gray-100">
              <Check size={20} className="text-greendoc flex-shrink-0" />
              <span>5 scans per month</span>
            </li>
            <li className="flex items-center gap-3 text-gray-100">
              <Check size={20} className="text-greendoc flex-shrink-0" />
              <span>Basic diagnosis</span>
            </li>
          </ul>
          
          <button className="w-full py-4 rounded-xl shadow-md font-bold bg-transparent border border-gray-500 text-gray-300 cursor-not-allowed">
            Current Plan
          </button>
        </div>

        {/* Plus Tier */}
        <div className="bg-greendoc shadow-xl rounded-xl p-6 border border-greendoc-light relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1">POPULAR</div>
          <h3 className="text-xl font-bold mb-1">{t('plusTier')}</h3>
          <p className="text-3xl font-black mb-4 drop-shadow-sm">₦800<span className="text-sm text-[#0a1a0f] font-normal opacity-80">/mo</span></p>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-3">
              <Check size={20} className="text-yellow-400 flex-shrink-0" />
              <span>Unlimited scans</span>
            </li>
            <li className="flex items-center gap-3">
              <Check size={20} className="text-yellow-400 flex-shrink-0" />
              <span>Detailed treatment recommendations</span>
            </li>
            <li className="flex items-center gap-3">
              <Check size={20} className="text-yellow-400 flex-shrink-0" />
              <span>Expert agricultural support</span>
            </li>
          </ul>
          
          <button className="w-full py-4 rounded-xl shadow-md font-bold bg-yellow-400 text-yellow-900 hover:bg-yellow-500 transition-colors">
            Upgrade Now
          </button>
        </div>

        {/* Enterprise Tier */}
        <div className="bg-black/20 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-greendoc relative overflow-hidden">
          <h3 className="text-xl font-bold mb-1">{t('enterpriseTier')}</h3>
          <p className="text-xl font-black mb-4">Custom</p>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-3 text-gray-100">
              <Check size={20} className="text-greendoc flex-shrink-0" />
              <span>API licensing for agro-companies</span>
            </li>
            <li className="flex items-center gap-3 text-gray-100">
              <Check size={20} className="text-greendoc flex-shrink-0" />
              <span>Dedicated support</span>
            </li>
          </ul>
          
          <button className="w-full py-4 rounded-xl shadow-md font-bold border border-white text-white hover:bg-white hover:text-[#1a3a22] transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
