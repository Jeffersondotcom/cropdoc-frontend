import React, { useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useHistory } from '../contexts/HistoryContext';
import { Camera, Upload, Loader2, AlertCircle, RefreshCw } from 'lucide-react';

const Scan = () => {
  const { t } = useLanguage();
  const { addScan } = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://cropdoc-api.onrender.com/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setResult(data);
      
      addScan({
        disease_name: data.disease,
        confidence: data.confidence,
        severity: data.severity,
        treatment_recommendation: data.treatment,
        imageUrl: reader?.result as string,
      });
    } catch (err) {
      console.error("API Error:", err);
      setError(t('serviceUnavailable'));
    } finally {
      setLoading(false);
      if (cameraInputRef.current) cameraInputRef.current.value = '';
      if (galleryInputRef.current) galleryInputRef.current.value = '';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col p-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('scanYourCrop')}</h2>

      {!loading && !result && !error && (
        <div className="flex flex-col w-full space-y-6 mt-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button 
              onClick={() => cameraInputRef.current?.click()}
              className="flex-1 bg-cropdoc hover:bg-cropdoc-dark text-white font-bold py-4 px-6 rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <Camera size={24} />
              <span>{t('takePhoto')}</span>
            </button>
            <button 
              onClick={() => galleryInputRef.current?.click()}
              className="flex-1 bg-cropdoc hover:bg-cropdoc-dark text-white font-bold py-4 px-6 rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <Upload size={24} />
              <span>{t('uploadImage')}</span>
            </button>
          </div>
          
          <input 
            type="file" 
            accept="image/*" 
            capture="environment"
            className="hidden" 
            ref={cameraInputRef}
            onChange={handleFileChange}
          />
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={galleryInputRef}
            onChange={handleFileChange}
          />
          
          <p className="text-gray-500 text-center text-sm px-4">
            Take a photo of the affected crop leaf or upload one from your gallery for analysis.
          </p>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center space-y-6 mt-20">
          <Loader2 size={64} className="text-cropdoc animate-spin" />
          <p className="text-lg font-bold text-gray-700 animate-pulse">{t('analyzing')}</p>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center space-y-6 mt-20 bg-red-50 p-6 rounded-2xl border border-red-100">
          <AlertCircle size={48} className="text-red-500" />
          <p className="text-lg font-bold text-red-700 text-center">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 active:scale-95 transition-transform"
          >
            <RefreshCw size={20} />
            {t('scanAgain')}
          </button>
        </div>
      )}

      {result && (
        <div className="flex flex-col space-y-6 animate-slide-up">
          {imagePreview && (
            <div className="w-full h-48 bg-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <img src={imagePreview} alt="Crop scan" className="w-full h-full object-cover" />
            </div>
          )}
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">{t('diseaseName')}</h3>
            <p className="text-2xl font-black text-gray-900 mb-4">{result.disease}</p>
            
            <div className="flex gap-4 mb-6">
              <div className="flex-1 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-500 font-bold mb-1">{t('confidence')}</p>
                <p className="text-lg font-bold text-gray-900">{result.confidence}</p>
              </div>
              <div className="flex-1 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-500 font-bold mb-1">{t('severity')}</p>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold border ${getSeverityColor(result.severity)}`}>
                  {result.severity}
                </div>
              </div>
            </div>

            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">{t('treatment')}</h3>
            <p className="text-gray-800 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
              {result.treatment}
            </p>
          </div>

          <button 
            onClick={() => {
              setResult(null);
              setImagePreview(null);
            }}
            className="w-full bg-cropdoc hover:bg-cropdoc-dark text-white font-bold py-4 px-6 rounded-xl shadow-md transition-transform active:scale-95 text-lg flex items-center justify-center gap-2"
          >
            <Camera size={24} />
            {t('scanAgain')}
          </button>
        </div>
      )}
    </div>
  );
};

export default Scan;
