import React, { useState } from 'react';
import { useHistory, ScanResult } from '../contexts/HistoryContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Clock, ArrowLeft, ShieldCheck } from 'lucide-react';

const History = () => {
  const { scans } = useHistory();
  const { t } = useLanguage();
  const [selectedScan, setSelectedScan] = useState<ScanResult | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low': return 'text-blue-400 border-blue-400';
      case 'moderate': return 'text-orange-400 border-orange-400';
      case 'high': return 'text-red-500 border-red-500';
      case 'healthy': return 'text-greendoc-light border-greendoc-light';
      default: return 'text-gray-300 border-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (selectedScan) {
    return (
      <div className="flex flex-col p-6 animate-fade-in text-white min-h-full pb-20">
        <button 
          onClick={() => setSelectedScan(null)}
          className="flex items-center gap-2 text-greendoc hover:text-greendoc-light font-bold mb-6 transition-colors w-fit"
        >
          <ArrowLeft size={20} />
          Back to History
        </button>

        <div className="flex flex-col space-y-6">
          {selectedScan.imageUrl && (
            <div className="w-full aspect-[4/3] bg-black flex items-center justify-center overflow-hidden border border-greendoc rounded-xl">
              <img src={selectedScan.imageUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
            </div>
          )}

          <div className="bg-black/20 backdrop-blur-sm shadow-lg border border-greendoc p-6 flex flex-col items-center text-center rounded-xl">
            <h3 className="text-2xl font-black text-white mb-2">{selectedScan.disease_name}</h3>
            
            <div className={`inline-block px-4 py-1 text-sm font-bold border rounded-xl mb-8 uppercase tracking-wider ${getSeverityColor(selectedScan.severity)}`}>
              {selectedScan.severity}
            </div>

            <div className="flex flex-col items-center gap-2 mb-2">
              <div 
                className="w-32 h-32 rounded-full flex items-center justify-center relative"
                style={{
                  background: `conic-gradient(#16a34a ${selectedScan.confidence}%, #193a22 ${selectedScan.confidence}%)`
                }}
              >
                <div className="absolute w-28 h-28 bg-greendoc-dark rounded-full flex items-center justify-center shadow-inner">
                  <span className="text-3xl font-black text-white">{selectedScan.confidence}%</span>
                </div>
              </div>
              <span className="text-sm font-bold text-gray-200 uppercase tracking-widest mt-2 drop-shadow-sm">Confidence</span>
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-sm shadow-lg border border-greendoc p-6 rounded-xl">
            <h4 className="flex items-center gap-2 text-greendoc text-lg font-bold uppercase tracking-wider mb-4">
              <ShieldCheck size={24} />
              Treatment Plan
            </h4>
            <p className="text-gray-100 leading-relaxed text-base font-medium">
              {selectedScan.treatment_recommendation || "Please consult a local agricultural expert for treatment."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 animate-fade-in text-white min-h-full pb-20">
      <h2 className="text-2xl font-bold mb-6">{t('history')}</h2>

      {scans.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4 mt-20 text-gray-300 border border-greendoc p-10 rounded-xl bg-black/20 backdrop-blur-sm shadow-lg">
          <Clock size={64} className="text-greendoc opacity-50" />
          <p className="text-lg font-bold">{t('noScans')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {scans.map((scan) => (
            <div 
              key={scan.id} 
              onClick={() => setSelectedScan(scan)}
              className="bg-black/20 backdrop-blur-sm shadow-md p-4 rounded-xl border border-greendoc hover:border-greendoc-light hover:bg-black/40 cursor-pointer transition-colors flex flex-col gap-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-white text-lg">{scan.disease_name}</p>
                  <p className="text-sm text-gray-200 mt-1">{formatDate(scan.date)}</p>
                </div>
                <div className={`px-3 py-1 rounded-xl text-xs font-bold border ${getSeverityColor(scan.severity)}`}>
                  {scan.severity}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
