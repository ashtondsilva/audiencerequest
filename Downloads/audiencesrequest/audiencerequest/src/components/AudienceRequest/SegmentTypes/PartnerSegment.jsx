export default function PartnerSegment({ config, onChange }) {
  const partnerTypes = [
    { value: 'analyticsIQ', label: 'Analytics IQ' },
    { value: 'placeIQ', label: 'Place IQ' }
  ];

  const sizeOptions = [
    { value: 'representative', label: 'Representative' },
    { value: 'topPercent', label: 'Top %' },
    { value: 'topCount', label: 'Top Count' }
  ];

  const getMetricsForPartner = (partnerType) => {
    switch (partnerType) {
      case 'analyticsIQ':
        return [
          'Purchase Propensity',
          'Brand Affinity',
          'Category Interest',
          'Digital Behavior',
          'Financial Capacity'
        ];
      case 'placeIQ':
        return [
          'Store Visits',
          'Cross-Shopping',
          'Trade Area',
          'Dwell Time',
          'Visit Frequency'
        ];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          Partner Type
        </label>
        <select
          value={config.partnerType}
          onChange={(e) => onChange('partnerType', e.target.value)}
          className="w-full px-4 py-3 border rounded-lg"
        >
          <option value="">Select partner type</option>
          {partnerTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {config.partnerType && (
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            Metric
          </label>
          <select
            value={config.partnerMetric}
            onChange={(e) => onChange('partnerMetric', e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
          >
            <option value="">Select metric</option>
            {getMetricsForPartner(config.partnerType).map(metric => (
              <option key={metric} value={metric}>{metric}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          Partner Size
        </label>
        <select
          value={config.sizeType}
          onChange={(e) => onChange('sizeType', e.target.value)}
          className="w-full px-4 py-3 border rounded-lg"
        >
          <option value="">Select size type</option>
          {sizeOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {config.sizeType === 'topPercent' && (
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            Top Percentage
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={config.percentage}
              onChange={(e) => onChange('percentage', e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
              min="0"
              max="100"
            />
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>%</span>
          </div>
        </div>
      )}

      {config.sizeType === 'topCount' && (
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            Top Count
          </label>
          <input
            type="number"
            value={config.count}
            onChange={(e) => onChange('count', e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
            min="0"
          />
        </div>
      )}
    </div>
  );
}