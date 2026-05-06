import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Check } from 'lucide-react';

const Pricing = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col p-6 animate-fade-in pb-20">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('pricing')}</h2>
      <p className="text-gray-600 mb-6">Choose a plan that fits your farm's needs.</p>

      <div className="space-y-6">
        {/* Free Tier */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm relative overflow-hidden">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{t('freeTier')}</h3>
          <p className="text-3xl font-black text-gray-900 mb-4">₦0<span className="text-sm text-gray-500 font-normal">/mo</span></p>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-3 text-gray-700">
              <Check size={20} className="text-cropdoc flex-shrink-0" />
              <span>5 scans per month</span>
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <Check size={20} className="text-cropdoc flex-shrink-0" />
              <span>Basic diagnosis</span>
            </li>
          </ul>
          
          <button className="w-full py-3 rounded-xl font-bold bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors">
            Current Plan
          </button>
        </div>

        {/* Plus Tier */}
        <div className="bg-cropdoc-dark text-white p-6 rounded-3xl border border-cropdoc shadow-lg shadow-cropdoc/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
          <h3 className="text-xl font-bold mb-1">{t('plusTier')}</h3>
          <p className="text-3xl font-black mb-4">₦800<span className="text-sm text-cropdoc-light font-normal opacity-80">/mo</span></p>
          
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
              <span>Save history forever</span>
            </li>
          </ul>
          
          <button className="w-full py-3 rounded-xl font-bold bg-yellow-400 text-yellow-900 hover:bg-yellow-500 transition-colors active:scale-95 shadow-md">
            Upgrade Now
          </button>
        </div>

        {/* Enterprise Tier */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm relative overflow-hidden">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{t('enterpriseTier')}</h3>
          <p className="text-xl font-black text-gray-900 mb-4">Custom</p>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-3 text-gray-700">
              <Check size={20} className="text-cropdoc flex-shrink-0" />
              <span>API licensing for agro-companies</span>
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <Check size={20} className="text-cropdoc flex-shrink-0" />
              <span>Dedicated support</span>
            </li>
          </ul>
          
          <button className="w-full py-3 rounded-xl font-bold border-2 border-gray-900 text-gray-900 hover:bg-gray-50 transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
