import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ScanResult {
  id: string;
  date: string;
  disease_name: string;
  confidence: string;
  severity: 'Low' | 'Moderate' | 'High';
  treatment_recommendation: string;
  imageUrl?: string;
}

interface HistoryContextType {
  scans: ScanResult[];
  addScan: (scan: Omit<ScanResult, 'id' | 'date'>) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const [scans, setScans] = useState<ScanResult[]>([]);

  const addScan = (scanData: Omit<ScanResult, 'id' | 'date'>) => {
    const newScan: ScanResult = {
      ...scanData,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString(),
    };
    setScans(prev => [newScan, ...prev]);
  };

  const clearHistory = () => {
    setScans([]);
  };

  return (
    <HistoryContext.Provider value={{ scans, addScan, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};
