export default function DemographicSegment({ config, onChange }) {
  const demographicTypes = [
    { value: 'age', label: 'Age' },
    { value: 'maritalStatus', label: 'Marital Status' },
    { value: 'ethnicity', label: 'Ethnicity' },
    { value: 'income', label: 'Household Income' },
    { value: 'education', label: 'Education' },
    { value: 'occupation', label: 'Occupation' },
    { value: 'householdSize', label: 'Household Size' },
    { value: 'presenceOfChildren', label: 'Presence of Children' },
    { value: 'gender', label: 'Gender' },
    { value: 'homeOwnership', label: 'Home Ownership' }
  ];

  const getOptionsForType = (type) => {
    switch (type) {
      case 'maritalStatus':
        return [
          'Single',
          'Married',
          'Divorced',
          'Widowed',
          'Separated'
        ];
      case 'ethnicity':
        return [
          'Asian',
          'Black/African American',
          'Hispanic/Latino',
          'White/Caucasian',
          'Native American',
          'Pacific Islander',
          'Multiple Ethnicities'
        ];
      case 'education':
        return [
          'High School or Less',
          'Some College',
          'Bachelor\'s Degree',
          'Master\'s Degree',
          'Doctorate or Professional Degree'
        ];
      case 'homeOwnership':
        return [
          'Own',
          'Rent',
          'Other'
        ];
      case 'gender':
        return [
          'Male',
          'Female',
          'Other'
        ];
      default:
        return [];
    }
  };

  const renderInputForType = () => {
    switch (config.demographicType) {
      case 'age':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Min Age
              </label>
              <input
                type="number"
                value={config.minAge}
                onChange={(e) => onChange('minAge', e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
                min="0"
                max="120"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Max Age
              </label>
              <input
                type="number"
                value={config.maxAge}
                onChange={(e) => onChange('maxAge', e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
                min="0"
                max="120"
              />
            </div>
          </div>
        );

      case 'income':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Income Range
              </label>
              <select
                value={config.incomeRange}
                onChange={(e) => onChange('incomeRange', e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
              >
                <option value="">Select income range</option>
                <option value="0-25000">Under $25,000</option>
                <option value="25000-50000">$25,000 - $50,000</option>
                <option value="50000-75000">$50,000 - $75,000</option>
                <option value="75000-100000">$75,000 - $100,000</option>
                <option value="100000-150000">$100,000 - $150,000</option>
                <option value="150000+">$150,000+</option>
              </select>
            </div>
          </div>
        );

      case 'householdSize':
        return (
          <div>
            <label className="block text-sm font-medium mb-2">
              Household Size
            </label>
            <input
              type="number"
              value={config.householdSize}
              onChange={(e) => onChange('householdSize', e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
              min="1"
              max="20"
            />
          </div>
        );

      default:
        const options = getOptionsForType(config.demographicType);
        if (options.length > 0) {
          return (
            <div>
              <label className="block text-sm font-medium mb-2">
                Select {config.demographicType}
              </label>
              <select
                value={config.selectedValue}
                onChange={(e) => onChange('selectedValue', e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
              >
                <option value="">Select an option</option>
                {options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          );
        }
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          Demographic Type
        </label>
        <select
          value={config.demographicType}
          onChange={(e) => onChange('demographicType', e.target.value)}
          className="w-full px-4 py-3 border rounded-lg"
        >
          <option value="">Select demographic type</option>
          {demographicTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {config.demographicType && (
        <div className="mt-4">
          {renderInputForType()}
        </div>
      )}
    </div>
  );
}