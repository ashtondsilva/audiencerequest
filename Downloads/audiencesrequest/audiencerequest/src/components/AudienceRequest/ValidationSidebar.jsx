export default function ValidationSidebar({ 
  validation, 
  estimatedCost, 
  batchAudiences, 
  setBatchAudiences 
}) {
  const handleRemoveFromBatch = (id) => {
    setBatchAudiences(prev => prev.filter(aud => aud.id !== id));
  };

  return (
    <div className="lg:col-span-1 space-y-6">
      <div className="sticky top-24">
        {/* Real-time Validation */}
        <section style={{ backgroundColor: 'var(--background-primary)', border: '1px solid var(--border-light)' }} className="rounded-lg p-6 shadow-sm">
          <h3 className="text-base font-semibold mb-4" style={{ color: 'var(--primary-dark)' }}>
            Real-time Validation
          </h3>

          {validation.isValidating ? (
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-full border-2 border-gray-300 border-t-blue-500 animate-spin" />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Calculating audience size...
              </span>
            </div>
          ) : validation.estimatedSize ? (
            <div className="space-y-4">
              <div style={{ backgroundColor: 'var(--secondary-blue-pale)', border: '1px solid var(--primary-blue)' }} className="rounded-lg p-4">
                <div className="text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                  Estimated Audience Size
                </div>
                <div className="text-2xl font-bold" style={{ color: 'var(--primary-blue)' }}>
                  {validation.estimatedSize}
                </div>
                <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  shoppers
                </div>
              </div>

              {estimatedCost && (
                <div style={{ backgroundColor: 'var(--secondary-blue-pale)', border: '1px solid var(--primary-blue)' }} className="rounded-lg p-4">
                  <div className="text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                    Estimated Campaign Cost
                  </div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--primary-blue)' }}>
                    ${estimatedCost}
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                    at $2.50 per 1,000 shoppers
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {validation.messages.map((msg, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <span>{msg}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTopColor: 'var(--border-light)' }} className="pt-3 border-t">
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Exact size calculated after submission<br />
                  Estimated processing time: 2-3 hours
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <svg className="mx-auto h-10 w-10 mb-2" style={{ color: 'var(--text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Add segments and dates to see<br />audience estimate
              </p>
            </div>
          )}
        </section>

        {/* Batch Queue */}
        {batchAudiences.length > 0 && (
          <section style={{ backgroundColor: 'var(--background-primary)', border: '1px solid var(--border-light)' }} className="rounded-lg p-6 shadow-sm mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold" style={{ color: 'var(--primary-dark)' }}>
                Batch Queue ({batchAudiences.length})
              </h3>
              <button 
                onClick={() => setBatchAudiences([])}
                style={{ color: 'var(--primary-blue)' }}
                className="text-xs font-medium hover:opacity-80 transition-opacity"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-2 mb-4">
              {batchAudiences.map((aud) => (
                <div key={aud.id} style={{ backgroundColor: 'var(--background-secondary)', border: '1px solid var(--border-light)' }} className="rounded-lg p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {aud.name}
                      </div>
                      <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                        ~{aud.estimatedSize} shoppers
                      </div>
                      <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                        {aud.segmentCount} segment{aud.segmentCount !== 1 ? 's' : ''}
                      </div>
                      {aud.cost && (
                        <div className="text-xs font-medium mt-1" style={{ color: 'var(--primary-blue)' }}>
                          Cost: ${aud.cost}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveFromBatch(aud.id)}
                      style={{ color: 'var(--text-muted)' }}
                      className="p-1 hover:text-red-500 transition-colors"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button 
              style={{ backgroundColor: 'var(--primary-blue)', color: 'var(--primary-white)' }}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-xs font-medium shadow-md hover:opacity-90 transition-opacity active:scale-95"
            >
              Submit Batch ({batchAudiences.length} audiences)
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </section>
        )}
      </div>
    </div>
  );
}