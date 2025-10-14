export default function VerifiedSegment({ config, onChange }) {
  const verifiedTypes = [
    { value: 'buyersOf', label: 'Buyers of' },
    { value: 'usersOf', label: 'Users of' },
    { value: 'visitorsOf', label: 'Visitors of' },
    { value: 'subscribersTo', label: 'Subscribers to' }
  ];

  const measureTypes = [
    { value: 'dollarSales', label: 'Dollar Sales' },
    { value: 'unitSales', label: 'Unit Sales' },
    { value: 'purchaseFrequency', label: 'Purchase Frequency' },
    { value: 'averageSpend', label: 'Average Spend' }
  ];

  const timeRanges = [
    { value: 'latest2Years', label: 'Latest 2 Years' },
    { value: 'latestYear', label: 'Latest Year' },
    { value: 'latest6Months', label: 'Latest 6 Months' },
    { value: 'latestQuarter', label: 'Latest Quarter' },
    { value: 'latestMonth', label: 'Latest Month' },
    { value: 'latestWeek', label: 'Latest Week' },
    { value: 'custom', label: 'Custom' }
  ];

  const operators = [
    { value: 'greaterThan', label: 'Greater than' },
    { value: 'lessThan', label: 'Less than' },
    { value: 'equals', label: 'Equals' },
    { value: 'between', label: 'Between' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          Verified Type
        </label>
        <select
          value={config.verifiedType}
          onChange={(e) => onChange('verifiedType', e.target.value)}
          className="w-full px-4 py-3 border rounded-lg"
        >
          <option value="">Select verified type</option>
          {verifiedTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          Product/Brand Search
        </label>
        <div className="relative">
          <input
            type="text"
            value={config.productSearch}
            onChange={(e) => onChange('productSearch', e.target.value)}
            placeholder="Search products or enter UPC..."
            className="w-full px-4 py-3 pl-10 border rounded-lg"
          />
          <svg 
            className="absolute left-3 top-3.5 h-5 w-5" 
            style={{ color: 'var(--text-muted)' }}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
          Search by product name, category, or UPC code
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          Measure Type
        </label>
        <select
          value={config.measureType}
          onChange={(e) => onChange('measureType', e.target.value)}
          className="w-full px-4 py-3 border rounded-lg"
        >
          <option value="">Select measure type</option>
          {measureTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            Operator
          </label>
          <select
            value={config.operator}
            onChange={(e) => onChange('operator', e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
          >
            <option value="">Select operator</option>
            {operators.map(op => (
              <option key={op.value} value={op.value}>
                {op.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            Value
          </label>
          <input
            type="number"
            value={config.value}
            onChange={(e) => onChange('value', e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
            min="0"
          />
        </div>
      </div>

      {config.operator === 'between' && (
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            Upper Value
          </label>
          <input
            type="number"
            value={config.upperValue}
            onChange={(e) => onChange('upperValue', e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
            min="0"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          Time Range
        </label>
        <select
          value={config.timeRange}
          onChange={(e) => onChange('timeRange', e.target.value)}
          className="w-full px-4 py-3 border rounded-lg"
        >
          {timeRanges.map(range => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {config.timeRange === 'custom' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              Start Date
            </label>
            <input
              type="date"
              value={config.customStartDate}
              onChange={(e) => onChange('customStartDate', e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              End Date
            </label>
            <input
              type="date"
              value={config.customEndDate}
              onChange={(e) => onChange('customEndDate', e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>
        </div>
      )}

      <div className="pt-4 border-t" style={{ borderColor: 'var(--border-light)' }}>
        <div className="flex items-center gap-2">
          <svg 
            className="h-5 w-5" 
            style={{ color: 'var(--text-muted)' }}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Verified segments are based on actual purchase data
          </span>
        </div>
      </div>
    </div>
  );
}