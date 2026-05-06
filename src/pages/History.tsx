import React from 'react';
import { useHistory } from '../contexts/HistoryContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Clock } from 'lucide-react';

const History = () => {
  const { scans } = useHistory();
  const { t } = useLanguage();

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col p-6 animate-fade-in pb-20">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('history')}</h2>

      {scans.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4 mt-20 text-gray-400">
          <Clock size={64} className="text-gray-300" />
          <p className="text-lg font-medium">{t('noScans')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {scans.map((scan) => (
            <div key={scan.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-gray-900 text-lg">{scan.disease_name}</p>
                  <p className="text-xs text-gray-500">{formatDate(scan.date)}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-bold border ${getSeverityColor(scan.severity)}`}>
                  {scan.severity}
                </div>
              </div>
              
              {scan.imageUrl && (
                <div className="w-full h-32 bg-gray-100 rounded-xl overflow-hidden mt-2">
                  <img src={scan.imageUrl} alt={scan.disease_name} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
