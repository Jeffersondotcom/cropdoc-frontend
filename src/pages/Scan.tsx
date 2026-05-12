import React, { useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useHistory } from '../contexts/HistoryContext';
import { Camera, Upload, Loader2, AlertCircle, RefreshCw, ShieldCheck } from 'lucide-react';

const Scan = () => {
  const { t } = useLanguage();
  const { addScan } = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (event) => setImagePreview(event.target?.result as string);
    reader.readAsDataURL(file);

    // Reset input
    e.target.value = '';
  };

  const handleRetake = () => {
    setImagePreview(null);
    setSelectedFile(null);
  };

  const handleConfirmScan = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('https://cropdoc-api-production.up.railway.app/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setResult(data);

      // Save to history context
      addScan({
        disease_name: data.disease,
        confidence: data.confidence,
        severity: data.severity,
        treatment_recommendation: data.treatment,
        imageUrl: imagePreview || undefined,
      });

    } catch (err) {
      console.error("API Error:", err);
      setError(t('serviceUnavailable'));
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low': return 'text-blue-400 border-blue-400';
      case 'moderate': return 'text-orange-400 border-orange-400';
      case 'high': return 'text-red-500 border-red-500';
      case 'healthy': return 'text-greendoc-light border-greendoc-light';
      default: return 'text-gray-300 border-gray-300';
    }
  };

  return (
    <div className="flex flex-col p-6 animate-fade-in text-white min-h-full">
      <h2 className="text-2xl font-bold mb-2">{t('scanYourCrop')}</h2>
      <p className="text-gray-200 mb-6 drop-shadow-sm">Take a clear photo of the affected crop leaf.</p>

      {/* State 1: No image selected */}
      {!loading && !result && !error && !imagePreview && (
        <div className="bg-black/20 backdrop-blur-sm shadow-lg border border-greendoc p-6 flex flex-col gap-4 rounded-xl">
          <button 
            onClick={() => cameraInputRef.current?.click()}
            className="w-full bg-greendoc hover:bg-greendoc-light text-white font-bold py-4 px-6 rounded-xl shadow-md transition-colors flex items-center justify-center gap-3"
          >
            <Camera size={24} />
            <span>{t('takePhoto')}</span>
          </button>
          <button 
            onClick={() => galleryInputRef.current?.click()}
            className="w-full bg-transparent border border-greendoc hover:bg-greendoc/20 text-white font-bold py-4 px-6 rounded-xl shadow-md transition-colors flex items-center justify-center gap-3"
          >
            <Upload size={24} />
            <span>{t('uploadImage')}</span>
          </button>
        </div>
      )}

      {/* Hidden inputs */}
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

      {/* State 2: Image Preview */}
      {!loading && !result && !error && imagePreview && (
        <div className="bg-black/20 backdrop-blur-sm shadow-lg border border-greendoc p-6 flex flex-col gap-4 rounded-xl">
          <div className="w-full aspect-[4/3] bg-black flex items-center justify-center overflow-hidden border border-greendoc rounded-xl">
            <img src={imagePreview} alt="Preview" className="max-w-full max-h-full object-contain" />
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleRetake}
              className="flex-1 bg-transparent border border-greendoc hover:bg-greendoc/20 text-white font-bold py-4 px-6 rounded-xl shadow-md transition-colors"
            >
              Retake
            </button>
            <button 
              onClick={handleConfirmScan}
              className="flex-1 bg-greendoc hover:bg-greendoc-light text-white font-bold py-4 px-6 rounded-xl shadow-md transition-colors"
            >
              Diagnose
            </button>
          </div>
        </div>
      )}

      {/* State 3: Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center space-y-6 py-20 border border-greendoc bg-black/20 backdrop-blur-sm shadow-lg rounded-xl">
          <Loader2 size={48} className="text-greendoc animate-spin" />
          <p className="text-lg font-bold text-white">{t('analyzing')}</p>
        </div>
      )}

      {/* State 4: Error */}
      {error && (
        <div className="flex flex-col items-center justify-center space-y-6 py-12 border border-red-500 bg-black/20 backdrop-blur-sm shadow-lg rounded-xl">
          <AlertCircle size={48} className="text-red-500" />
          <p className="text-lg font-bold text-red-500 text-center px-4">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="bg-red-600 text-white px-6 py-4 rounded-xl shadow-md font-bold flex items-center gap-2"
          >
            <RefreshCw size={20} />
            {t('scanAgain')}
          </button>
        </div>
      )}

      {/* State 5: Result */}
      {result && (
        <div className="flex flex-col space-y-6 animate-slide-up">
          <div className="bg-black/20 backdrop-blur-sm shadow-lg border border-greendoc p-6 flex flex-col items-center text-center rounded-xl">
            <h3 className="text-2xl font-black text-white mb-2">{result.disease}</h3>
            
            <div className={`inline-block px-4 py-1 text-sm font-bold border rounded-xl mb-8 uppercase tracking-wider ${getSeverityColor(result.severity)}`}>
              {result.severity}
            </div>

            <div className="flex flex-col items-center gap-2 mb-2">
              <div 
                className="w-32 h-32 rounded-full flex items-center justify-center relative"
                style={{
                  background: `conic-gradient(#16a34a ${result.confidence}%, #193a22 ${result.confidence}%)`
                }}
              >
                <div className="absolute w-28 h-28 bg-greendoc-dark rounded-full flex items-center justify-center shadow-inner">
                  <span className="text-3xl font-black text-white">{result.confidence}%</span>
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
              {result.treatment || "Please consult a local agricultural expert for treatment."}
            </p>
          </div>

          <button 
            onClick={() => {
              setResult(null);
              setImagePreview(null);
              setSelectedFile(null);
            }}
            className="w-full bg-greendoc hover:bg-greendoc-light text-white font-bold py-4 px-6 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <Camera size={24} />
            Scan Another Crop
          </button>
        </div>
      )}
    </div>
  );
};

export default Scan;
