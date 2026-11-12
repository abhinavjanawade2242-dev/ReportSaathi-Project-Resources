import React, { useState } from 'react';
import { SupportedLanguage, ReadingLevel, ReportResult, BiomarkerValue } from '../../shared/types';
import sampleReportData from '../../shared/sample-report.json';
import { LanguageSelector } from './components/LanguageSelector';
import { UploadView } from './components/UploadView';
import { CheckValuesView } from './components/CheckValuesView';
import { ResultsView } from './components/ResultsView';
import { DoctorQuestionsView } from './components/DoctorQuestionsView';
import { ShareView } from './components/ShareView';
import { uploadReportFile, fetchReportResults } from './api';

type Step = 'language' | 'upload' | 'check_values' | 'results' | 'questions' | 'share';

export const App: React.FC = () => {
  const [step, setStep] = useState<Step>('language');
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [level, setLevel] = useState<ReadingLevel>('simple');
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<ReportResult>(sampleReportData as unknown as ReportResult);
  const [extractedValues, setExtractedValues] = useState<BiomarkerValue[]>(
    (sampleReportData as unknown as ReportResult).values
  );

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    const { document_id } = await uploadReportFile(file, language, level);
    const res = await fetchReportResults(document_id);
    setReport(res);
    setExtractedValues(res.values);
    setIsLoading(false);
    setStep('check_values');
  };

  const handleUseSample = () => {
    setReport(sampleReportData as unknown as ReportResult);
    setExtractedValues((sampleReportData as unknown as ReportResult).values);
    setStep('check_values');
  };

  const handleConfirmValues = (confirmed: BiomarkerValue[]) => {
    const updated = { ...report, values: confirmed };
    setReport(updated);
    setStep('results');
  };

  const handleRestart = () => {
    setStep('language');
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>
          <span>🩺</span> ReportSaathi
        </h1>
        <p>Plain-language medical report & prescription explainer</p>
      </header>

      {/* Main Content / Active Step */}
      <main style={{ flex: 1 }}>
        {isLoading ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem', animation: 'spin 1s linear infinite' }}>
              ⏳
            </div>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
              Reading your report...
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Extracting clinical biomarkers and checking printed reference ranges.
            </p>
          </div>
        ) : (
          <>
            {step === 'language' && (
              <LanguageSelector
                selectedLanguage={language}
                selectedLevel={level}
                onLanguageChange={setLanguage}
                onLevelChange={setLevel}
                onNext={() => setStep('upload')}
              />
            )}

            {step === 'upload' && (
              <UploadView
                onFileUpload={handleFileUpload}
                onUseSample={handleUseSample}
                onBack={() => setStep('language')}
              />
            )}

            {step === 'check_values' && (
              <CheckValuesView
                initialValues={extractedValues}
                onConfirm={handleConfirmValues}
                onBack={() => setStep('upload')}
              />
            )}

            {step === 'results' && (
              <ResultsView
                report={report}
                onNext={() => setStep('questions')}
                onRestart={handleRestart}
              />
            )}

            {step === 'questions' && (
              <DoctorQuestionsView
                questions={report.doctor_questions || []}
                onNext={() => setStep('share')}
                onBack={() => setStep('results')}
              />
            )}

            {step === 'share' && (
              <ShareView
                report={report}
                onRestart={handleRestart}
              />
            )}
          </>
        )}
      </main>

      {/* Fixed Medical Disclaimer Footer (Mandatory on every screen) */}
      <footer className="footer-disclaimer">
        <p>
          <strong>Medical Notice:</strong> This explains your report. It does not replace your doctor.
        </p>
        <p style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: '#94a3b8' }}>
          ReportSaathi does not diagnose conditions or modify medication dosages. Always consult a physician.
        </p>
      </footer>
    </div>
  );
};
