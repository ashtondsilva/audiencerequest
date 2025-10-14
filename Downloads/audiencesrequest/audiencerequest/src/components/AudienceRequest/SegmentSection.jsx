import { useState } from "react";
import PartnerSegment from './SegmentTypes/PartnerSegment';
import ProscoresSegment from './SegmentTypes/ProscoresSegment';
import DemographicSegment from './SegmentTypes/DemographicSegment';
import VerifiedSegment from './SegmentTypes/VerifiedSegment';

export default function SegmentSection({ segments, setSegments, validateAudience }) {
  const [showSegmentModal, setShowSegmentModal] = useState(false);
  const [selectedSegmentType, setSelectedSegmentType] = useState(null);
  const [segmentConfig, setSegmentConfig] = useState({
    field: "",
    operator: "",
    value: "",
    timeRange: "Latest 2 Years",
    upcSearch: "",
    measureValue: "",
    upperValue: "",
    // Partner segment fields
    partnerType: "",
    partnerMetric: "",
    sizeType: "",
    percentage: "",
    count: "",
    // ProScores fields
    proscoreType: "",
    category: "",
    // Demographic fields
    demographicType: "",
    minAge: "",
    maxAge: "",
    selectedValue: "",
    // Verified fields
    verifiedType: "",
    productSearch: "",
    measureType: "",
  });

  const segmentTypes = [
    { id: "verified", label: "Verified", icon: "👤", subtext: "Deterministic" },
    { id: "lifestyle", label: "Lifestyle", icon: "🎯", subtext: "Deterministic" },
    { id: "demographic", label: "Demographic", icon: "👥", subtext: "Deterministic" },
    { id: "proscores", label: "ProScores", icon: "📊", subtext: "Probabilistic" },
    { id: "partner", label: "Partner", icon: "🤝", subtext: "Probabilistic" },
    { id: "advanced", label: "Advanced", icon: "⚙️", subtext: "Deterministic" }
  ];

  const addSegment = () => {
    let segmentData = {
      id: Date.now(),
      type: selectedSegmentType,
    };

    switch(selectedSegmentType) {
      case 'partner':
        segmentData = {
          ...segmentData,
          partnerType: segmentConfig.partnerType,
          metric: segmentConfig.partnerMetric,
          size: segmentConfig.sizeType === 'topPercent' 
            ? `Top ${segmentConfig.percentage}%`
            : segmentConfig.sizeType === 'topCount'
            ? `Top ${segmentConfig.count}`
            : 'Representative',
          displayValue: `${segmentConfig.partnerType} - ${segmentConfig.partnerMetric} (${
            segmentConfig.sizeType === 'topPercent' 
              ? `Top ${segmentConfig.percentage}%`
              : segmentConfig.sizeType === 'topCount'
              ? `Top ${segmentConfig.count}`
              : 'Representative'
          })`
        };
        break;
      
      case 'proscores':
        segmentData = {
          ...segmentData,
          proscoreType: segmentConfig.proscoreType,
          category: segmentConfig.category,
          size: segmentConfig.sizeType === 'topPercent' 
            ? `Top ${segmentConfig.percentage}%`
            : segmentConfig.sizeType === 'topCount'
            ? `Top ${segmentConfig.count}`
            : 'Representative',
          displayValue: `${segmentConfig.proscoreType} - ${segmentConfig.category} (${
            segmentConfig.sizeType === 'topPercent' 
              ? `Top ${segmentConfig.percentage}%`
              : segmentConfig.sizeType === 'topCount'
              ? `Top ${segmentConfig.count}`
              : 'Representative'
          })`
        };
        break;

      case 'demographic':
        segmentData = {
          ...segmentData,
          demographicType: segmentConfig.demographicType,
          value: segmentConfig.demographicType === 'age'
            ? `${segmentConfig.minAge} - ${segmentConfig.maxAge} years`
            : segmentConfig.selectedValue,
          displayValue: `${segmentConfig.demographicType}: ${
            segmentConfig.demographicType === 'age'
              ? `${segmentConfig.minAge} - ${segmentConfig.maxAge} years`
              : segmentConfig.selectedValue
          }`
        };
        break;

      case 'verified':
        segmentData = {
          ...segmentData,
          field: segmentConfig.field,
          productSearch: segmentConfig.productSearch,
          operator: segmentConfig.operator,
          value: segmentConfig.measureValue,
          timeRange: segmentConfig.timeRange,
          displayValue: `${segmentConfig.field} ${segmentConfig.productSearch} (${segmentConfig.operator} ${segmentConfig.measureValue})`
        };
        break;

      default:
        segmentData = {
          ...segmentData,
          field: segmentConfig.field,
          value: segmentConfig.value,
          displayValue: `${segmentConfig.field}: ${segmentConfig.value}`
        };
    }

    setSegments(prev => [...prev, segmentData]);
    setShowSegmentModal(false);
    setSelectedSegmentType(null);
    setSegmentConfig({
      field: "",
      operator: "",
      value: "",
      timeRange: "Latest 2 Years",
      upcSearch: "",
      measureValue: "",
      upperValue: "",
      partnerType: "",
      partnerMetric: "",
      sizeType: "",
      percentage: "",
      count: "",
      proscoreType: "",
      category: "",
      demographicType: "",
      minAge: "",
      maxAge: "",
      selectedValue: "",
      verifiedType: "",
      productSearch: "",
      measureType: "",
    });
    
    if (validateAudience) {
      validateAudience();
    }
  };

  const removeSegment = (id) => {
    setSegments(segments.filter(s => s.id !== id));
  };

  return (
    <section style={{ backgroundColor: 'var(--background-primary)', border: '1px solid var(--border-light)' }} className="rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold" style={{ color: 'var(--primary-dark)', letterSpacing: '-0.3px' }}>
          Audience Segments
        </h2>
        <button
          onClick={() => setShowSegmentModal(true)}
          style={{ backgroundColor: 'var(--primary-blue)', color: 'var(--primary-white)' }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Segment
        </button>
      </div>

      {segments.length === 0 ? (
        <div className="text-center py-12" style={{ backgroundColor: 'var(--background-secondary)', borderRadius: '8px' }}>
          <p style={{ color: 'var(--text-muted)' }} className="text-sm">
            No segments added yet. Click "Add Segment" to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {segments.map((segment) => (
            <div key={segment.id} style={{ backgroundColor: 'var(--background-secondary)', border: '1px solid var(--border-light)' }} className="rounded-lg p-4 flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-1 rounded" style={{ backgroundColor: 'var(--secondary-blue-pale)', color: 'var(--primary-blue)' }}>
                    {segmentTypes.find(t => t.id === segment.type)?.label || segment.type}
                  </span>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                  {segment.displayValue}
                </p>
                {segment.timeRange && (
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                    {segment.timeRange}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeSegment(segment.id)}
                style={{ color: 'var(--text-muted)' }}
                className="p-2 hover:text-red-500 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {showSegmentModal && !selectedSegmentType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: 'var(--background-primary)' }} className="rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--primary-dark)' }}>
                Select Segment Type
              </h3>
              <button
                onClick={() => setShowSegmentModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {segmentTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelectedSegmentType(type.id)}
                  className="p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                >
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className="font-medium">{type.label}</div>
                  <div className="text-xs text-gray-500">{type.subtext}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showSegmentModal && selectedSegmentType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: 'var(--background-primary)' }} className="rounded-lg shadow-xl max-w-lg w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--primary-dark)' }}>
                Add New {segmentTypes.find(t => t.id === selectedSegmentType)?.label} Segment
              </h3>
              <button
                onClick={() => {
                  setShowSegmentModal(false);
                  setSelectedSegmentType(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {(() => {
                switch(selectedSegmentType) {
                  case 'partner':
                    return <PartnerSegment 
                      config={segmentConfig} 
                      onChange={(field, value) => setSegmentConfig(prev => ({ ...prev, [field]: value }))} 
                    />;
                  case 'proscores':
                    return <ProscoresSegment 
                      config={segmentConfig} 
                      onChange={(field, value) => setSegmentConfig(prev => ({ ...prev, [field]: value }))} 
                    />;
                  case 'demographic':
                    return <DemographicSegment 
                      config={segmentConfig} 
                      onChange={(field, value) => setSegmentConfig(prev => ({ ...prev, [field]: value }))} 
                    />;
                  case 'verified':
                  default:
                    return <VerifiedSegment 
                      config={segmentConfig} 
                      onChange={(field, value) => setSegmentConfig(prev => ({ ...prev, [field]: value }))} 
                    />;
                }
              })()}
            </div>

            <div className="flex gap-3 p-6 border-t">
              <button
                onClick={() => {
                  setShowSegmentModal(false);
                  setSelectedSegmentType(null);
                }}
                className="flex-1 px-4 py-3 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={addSegment}
                className="flex-1 px-4 py-3 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'var(--primary-blue)', color: 'var(--primary-white)' }}
              >
                Add Segment
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}