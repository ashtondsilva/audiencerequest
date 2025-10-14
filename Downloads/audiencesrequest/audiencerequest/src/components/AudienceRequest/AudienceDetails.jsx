export default function AudienceDetails({ formData, setFormData, validateAudience }) {
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (formData.campaignStart && formData.campaignEnd) {
      validateAudience();
    }
  };

  return (
    <>
      <section style={{ backgroundColor: 'var(--background-primary)', border: '1px solid var(--border-light)' }} className="rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--primary-dark)', letterSpacing: '-0.3px' }}>
          Audience Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              Audience Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.audienceName}
              onChange={(e) => handleInputChange('audienceName', e.target.value)}
              placeholder="e.g., Pain2026Walmart"
              style={{
                backgroundColor: 'var(--background-primary)',
                borderColor: 'var(--border-medium)',
                color: 'var(--text-primary)'
              }}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
              Use alphanumeric characters only
            </p>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--background-primary)', border: '1px solid var(--border-light)' }} className="rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--primary-dark)', letterSpacing: '-0.3px' }}>
          Campaign Timeline
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              Start Date
            </label>
            <input
              type="date"
              value={formData.campaignStart}
              onChange={(e) => handleInputChange('campaignStart', e.target.value)}
              style={{
                backgroundColor: 'var(--background-primary)',
                borderColor: 'var(--border-medium)',
                color: 'var(--text-primary)'
              }}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              End Date
            </label>
            <input
              type="date"
              value={formData.campaignEnd}
              onChange={(e) => handleInputChange('campaignEnd', e.target.value)}
              style={{
                backgroundColor: 'var(--background-primary)',
                borderColor: 'var(--border-medium)',
                color: 'var(--text-primary)'
              }}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </section>
    </>
  );
}