export default function ProscoresSegment({ config, onChange }) {
  const proscoreTypes = [
    { value: 'category', label: 'Category ProScores' },
    { value: 'subcategory', label: 'Sub-Category ProScores' },
    { value: 'brand', label: 'Brand ProScores' },
    { value: 'retailer', label: 'Retailer ProScores' },
    { value: 'ecommerce', label: 'eCommerce ProScores' },
    { value: 'custom', label: 'Custom' }
  ];

  const sizeOptions = [
    { value: 'representative', label: 'Representative' },
    { value: 'topPercent', label: 'Top %' },
    { value: 'topCount', label: 'Top Count' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          ProScore Type
        </label>
        <select
          value={config.proscoreType}
          onChange={(e) => onChange('proscoreType', e.target.value)}
          className="w-full px-4 py-3 border rounded-lg"
        >
          <option value="">Select ProScore type</option>
          {proscoreTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          Category/Product
        </label>
        <input
          type="text"
          value={config.category}
          onChange={(e) => onChange('category', e.target.value)}
          placeholder="Search categories or products..."
          className="w-full px-4 py-3 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          ProScore Size
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