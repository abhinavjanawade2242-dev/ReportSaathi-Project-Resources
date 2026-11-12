import React, { useState } from 'react';
import { BiomarkerValue } from '../../../shared/types';

interface Props {
  initialValues: BiomarkerValue[];
  onConfirm: (correctedValues: BiomarkerValue[]) => void;
  onBack: () => void;
}

export const CheckValuesView: React.FC<Props> = ({ initialValues, onConfirm, onBack }) => {
  const [values, setValues] = useState<BiomarkerValue[]>(initialValues);

  const handleValueChange = (index: number, newRawVal: string) => {
    const updated = [...values];
    const num = parseFloat(newRawVal);
    updated[index].value = isNaN(num) ? newRawVal : num;
    setValues(updated);
  };

  const handleRangeChange = (index: number, newRange: string) => {
    const updated = [...values];
    updated[index].range_on_report = newRange;
    setValues(updated);
  };

  const handleConfirm = () => {
    onConfirm(values);
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>
          3. Verify Extracted Values
        </h2>
        <span style={{ fontSize: '0.8rem', backgroundColor: '#e0f2fe', color: '#0369a1', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
          Editable Review
        </span>
      </div>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
        Please check the numbers read from your report. You can edit any misread number before the explanation is generated.
      </p>

      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', textAlign: 'left', borderBottom: '2px solid var(--border)' }}>
              <th style={{ padding: '0.75rem' }}>Test Name</th>
              <th style={{ padding: '0.75rem', width: '110px' }}>Value</th>
              <th style={{ padding: '0.75rem' }}>Unit</th>
              <th style={{ padding: '0.75rem' }}>Printed Range</th>
            </tr>
          </thead>
          <tbody>
            {values.map((v, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.75rem', fontWeight: 500 }}>{v.test}</td>
                <td style={{ padding: '0.5rem 0.75rem' }}>
                  <input
                    type="text"
                    value={v.value ?? ''}
                    onChange={(e) => handleValueChange(i, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.4rem',
                      border: '1px solid #cbd5e1',
                      borderRadius: '4px',
                      fontWeight: 600,
                    }}
                  />
                </td>
                <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{v.unit || '—'}</td>
                <td style={{ padding: '0.5rem 0.75rem' }}>
                  <input
                    type="text"
                    value={v.range_on_report ?? ''}
                    placeholder="No range printed"
                    onChange={(e) => handleRangeChange(i, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.4rem',
                      border: '1px solid #cbd5e1',
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button className="btn-secondary" onClick={onBack} style={{ width: '35%' }}>
          ← Back
        </button>
        <button className="btn-primary" onClick={handleConfirm} style={{ width: '65%' }}>
          Confirm & Explain Report →
        </button>
      </div>
    </div>
  );
};
