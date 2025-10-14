"use client";
import { useState } from "react";
import AudienceDetails from "./AudienceRequest/AudienceDetails";
import SegmentSection from "./AudienceRequest/SegmentSection";
import ValidationSidebar from "./AudienceRequest/ValidationSidebar";

export default function AudienceRequestForm() {
  const [formData, setFormData] = useState({
    audienceName: "",
    campaignStart: "",
    campaignEnd: "",
  });

  const [validation, setValidation] = useState({
    isValidating: false,
    estimatedSize: null,
    status: null,
    messages: []
  });

  const [estimatedCost, setEstimatedCost] = useState(null);
  const [batchAudiences, setBatchAudiences] = useState([]);
  const [segments, setSegments] = useState([]);

  const baseCostPerThousand = 2.5;
  const allFieldsFilled = formData.audienceName && formData.campaignStart && formData.campaignEnd;

  const calculateCost = (audienceSize) => {
    const numericSize = parseInt(audienceSize.replace(/,/g, ''));
    const cost = (numericSize / 1000) * baseCostPerThousand;
    return cost.toFixed(2);
  };

  const validateAudience = () => {
    setValidation({ isValidating: true, estimatedSize: null, status: null, messages: [] });
    
    setTimeout(() => {
      const estimate = Math.floor(Math.random() * 2000000) + 500000;
      const status = estimate > 100000 ? "success" : "warning";
      const messages = [
        estimate > 100000 ? "✓ Sufficient audience size" : "⚠️ Audience may be too small",
        "✓ All segments validated",
        "✓ Products verified in retailer catalog"
      ];
      
      const cost = calculateCost(estimate.toLocaleString());
      setEstimatedCost(cost);

      setValidation({
        isValidating: false,
        estimatedSize: estimate.toLocaleString(),
        status,
        messages
      });
    }, 1200);
  };

  const handleAddToBatch = () => {
    const newAudience = {
      id: Date.now(),
      name: formData.audienceName || `Audience ${batchAudiences.length + 1}`,
      estimatedSize: validation.estimatedSize,
      cost: estimatedCost,
      status: validation.status,
      segmentCount: segments.length
    };
    
    setBatchAudiences(prev => [...prev, newAudience]);
    
    setFormData({
      audienceName: "",
      campaignStart: "",
      campaignEnd: "",
    });
    setSegments([]);
    setValidation({ isValidating: false, estimatedSize: null, status: null, messages: [] });
    setEstimatedCost(null);
  };

  return (
    <div className="min-h-screen bg-white" style={{ backgroundColor: 'var(--background-secondary)' }}>
      <header className="sticky top-0 z-10 border-b" style={{ borderColor: 'var(--border-light)', backgroundColor: 'var(--background-primary)' }}>
        <div className="px-12 py-6 mx-auto max-w-7xl">
          <div className="flex items-baseline justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold" style={{ color: 'var(--primary-dark)', letterSpacing: '-0.5px' }}>
                Create Audience Request
              </h1>
              <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                Kenvue • Q4 2025 Campaign
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded" style={{ backgroundColor: 'var(--secondary-blue-pale)' }}>
              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: 'var(--primary-blue)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--primary-blue)' }}>Circana</span>
            </div>
          </div>
        </div>
      </header>

      <main className="px-12 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <AudienceDetails 
                formData={formData}
                setFormData={setFormData}
                validateAudience={validateAudience}
              />
              
              <SegmentSection 
                segments={segments}
                setSegments={setSegments}
                validateAudience={validateAudience}
              />

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToBatch}
                  disabled={!allFieldsFilled || segments.length === 0}
                  style={{
                    borderColor: 'var(--border-light)',
                    backgroundColor: 'var(--background-primary)',
                    color: 'var(--text-primary)'
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add to Batch
                </button>
                <button
                  disabled={!allFieldsFilled || segments.length === 0}
                  style={{ backgroundColor: 'var(--primary-blue)', color: 'var(--primary-white)' }}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium shadow-md hover:opacity-90 transition-opacity active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Single Audience
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>

            <ValidationSidebar 
              validation={validation}
              estimatedCost={estimatedCost}
              batchAudiences={batchAudiences}
              setBatchAudiences={setBatchAudiences}
            />
          </div>
        </div>
      </main>

      <style jsx global>{`
        :root {
          --primary-blue: #4A90E2;
          --primary-white: #FFFFFF;
          --primary-dark: #2C3E50;
          --secondary-blue-light: #6BB6FF;
          --secondary-blue-pale: #E3F2FD;
          --secondary-gray: #F5F7FA;
          --success-green: #4CAF50;
          --warning-orange: #FF9800;
          --error-red: #F44336;
          --text-primary: #263238;
          --text-secondary: #546E7A;
          --text-muted: #90A4AE;
          --border-light: #E0E0E0;
          --border-medium: #BDBDBD;
          --background-primary: #FFFFFF;
          --background-secondary: #FAFBFC;
          --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        body {
          font-family: var(--font-sans);
          background-color: var(--background-secondary);
        }
      `}</style>
    </div>
  );
}