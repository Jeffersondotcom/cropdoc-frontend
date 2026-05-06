import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ha' | 'yo' | 'ig';

interface Translations {
  [key: string]: string;
}

interface Dictionary {
  [key: string]: Translations;
}

const translations: Dictionary = {
  en: {
    appTitle: "CropDoc",
    tagline: "A plant pathologist in every farmer's pocket.",
    description: "Instantly detect crop diseases with artificial intelligence and get actionable treatment plans.",
    scanYourCrop: "Scan Your Crop",
    instantDiagnosis: "Instant Diagnosis",
    treatmentRecs: "Treatment Recommendations",
    worksOffline: "Works Offline",
    speaksLanguage: "Speaks Your Language",
    analyzing: "Analyzing your crop...",
    serviceUnavailable: "Service temporarily unavailable. Please try again.",
    scanAgain: "Scan Again",
    home: "Home",
    scan: "Scan",
    history: "History",
    pricing: "Pricing",
    freeTier: "Free",
    plusTier: "CropDoc Plus",
    enterpriseTier: "Enterprise",
    takePhoto: "Take Photo or Upload",
    diseaseName: "Disease",
    confidence: "Confidence",
    severity: "Severity",
    treatment: "Treatment",
    noScans: "No past scans found.",
  },
  ha: {
    appTitle: "CropDoc",
    tagline: "Masanin tsirrai a aljihun kowane manomi.",
    description: "Gano cututtukan amfanin gona nan take da basirar wucin gadi.",
    scanYourCrop: "Duba Amfanin Gona",
    instantDiagnosis: "Binciken Gaggawa",
    treatmentRecs: "Shawarwarin Magani",
    worksOffline: "Yana Aiki Babu Intanet",
    speaksLanguage: "Yana Magana da Yarenku",
    analyzing: "Ana duba amfanin gona...",
    serviceUnavailable: "Ba a samun sabis a yanzu. Don Allah a sake gwadawa.",
    scanAgain: "Sake Dubawa",
    home: "Gida",
    scan: "Duba",
    history: "Tarihi",
    pricing: "Farashi",
    freeTier: "Kyauta",
    plusTier: "CropDoc Plus",
    enterpriseTier: "Kamfanoni",
    takePhoto: "Dauki Hoto",
    diseaseName: "Cuta",
    confidence: "Tabbaci",
    severity: "Tsananin",
    treatment: "Magani",
    noScans: "Babu tarihin bincike.",
  },
  yo: {
    appTitle: "CropDoc",
    tagline: "Oníṣègùn ọ̀gbìn nínú àpò àwọn àgbẹ̀.",
    description: "Ṣàwárí àwọn àrùn irè oko lẹ́sẹ̀kẹsẹ̀ pẹ̀lú ìmọ̀ ẹ̀rọ.",
    scanYourCrop: "Ṣàyẹ̀wò Irè Oko Rẹ",
    instantDiagnosis: "Àyẹ̀wò Lẹ́sẹ̀kẹsẹ̀",
    treatmentRecs: "Àwọn Ìmọ̀ràn Ìtọ́jú",
    worksOffline: "Ń ṣiṣẹ́ láìsí Íntánẹ́ẹ̀tì",
    speaksLanguage: "Ń sọ èdè rẹ",
    analyzing: "Àyẹ̀wò lọ́wọ́...",
    serviceUnavailable: "Kò sí ìṣiṣẹ́ báyìí. Jọ̀wọ́ tún dán wò.",
    scanAgain: "Tún Ṣàyẹ̀wò",
    home: "Ilé",
    scan: "Ṣàyẹ̀wò",
    history: "Ìtàn",
    pricing: "Iye",
    freeTier: "Ọ̀fẹ́",
    plusTier: "CropDoc Plus",
    enterpriseTier: "Ilé-iṣẹ́ Nlá",
    takePhoto: "Ya Fọ́tò",
    diseaseName: "Àrùn",
    confidence: "Ìdánilójú",
    severity: "Bí o ṣe le",
    treatment: "Ìtọ́jú",
    noScans: "Kò sí ìtàn àyẹ̀wò kankan.",
  },
  ig: {
    appTitle: "CropDoc",
    tagline: "Dọkịta osisi n'akpa ndị ọrụ ugbo niile.",
    description: "Chọpụta ọrịa ihe ọkụkụ ozugbo site na iji amamihe kọmputa.",
    scanYourCrop: "Nyochaa Ihe Ọkụkụ Gị",
    instantDiagnosis: "Nyocha Ozugbo",
    treatmentRecs: "Ndụmọdụ Ọgwụgwọ",
    worksOffline: "Na-arụ Ọrụ n'Eweghị Ịntanetị",
    speaksLanguage: "Na-asụ Asụsụ Gị",
    analyzing: "A na-enyocha ihe ọkụkụ gị...",
    serviceUnavailable: "Ọrụ adịghị ugbu a. Biko nwaa ọzọ.",
    scanAgain: "Nyochaa Ọzọ",
    home: "Ụlọ",
    scan: "Nyochaa",
    history: "Akụkọ Ihe Mere Eme",
    pricing: "Ọnụ Ahịa",
    freeTier: "N'efu",
    plusTier: "CropDoc Plus",
    enterpriseTier: "Ụlọ Ọrụ Ndị Ibu",
    takePhoto: "Were Foto",
    diseaseName: "Ọrịa",
    confidence: "Nkwenye",
    severity: "Ogo",
    treatment: "Ọgwụgwọ",
    noScans: "Onweghi akụkọ nyocha ahụrụ.",
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
