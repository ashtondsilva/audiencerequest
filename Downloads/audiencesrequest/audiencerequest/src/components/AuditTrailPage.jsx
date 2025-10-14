"use client";

import { useState } from "react";

export default function AuditTrailPage() {
  const [filterUser, setFilterUser] = useState("");
  const [filterAction, setFilterAction] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const [auditLogs] = useState([
    {
      id: 1,
      timestamp: "2025-10-13 11:20:45 UTC",
      user: "Sarah Johnson",
      userId: "user-001",
      email: "sarah@company.com",
      action: "ACTIVATION",
      entityType: "Audience",
      entityId: "aud-001",
      entityName: "Pain2026Walmart",
      details: "Audience activation completed successfully",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      status: "success",
      changes: null
    },
    {
      id: 2,
      timestamp: "2025-10-13 10:45:30 UTC",
      user: "Mike Chen",
      userId: "user-002",
      email: "mike@company.com",
      action: "UPDATE",
      entityType: "Audience",
      entityId: "aud-002",
      entityName: "Q42025Campaign",
      details: "Updated audience rules",
      ipAddress: "192.168.1.105",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      status: "success",
      changes: {
        before: { ageRange: "25-34", gender: "All" },
        after: { ageRange: "18-44", gender: "Female" }
      }
    },
    {
      id: 3,
      timestamp: "2025-10-13 10:30:15 UTC",
      user: "Emma Davis",
      userId: "user-003",
      email: "emma@company.com",
      action: "CREATE",
      entityType: "Audience",
      entityId: "aud-003",
      entityName: "HealthSupps2025",
      details: "New audience created",
      ipAddress: "192.168.1.110",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1)",
      status: "success",
      changes: null
    },
    {
      id: 4,
      timestamp: "2025-10-13 09:15:20 UTC",
      user: "Sarah Johnson",
      userId: "user-001",
      email: "sarah@company.com",
      action: "APPROVAL",
      entityType: "Audience",
      entityId: "aud-002",
      entityName: "Q42025Campaign",
      details: "Approved audience activation",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      status: "success",
      changes: { reason: "Meets all quality criteria", comment: "Ready for distribution" }
    },
    {
      id: 5,
      timestamp: "2025-10-12 15:45:00 UTC",
      user: "Mike Chen",
      userId: "user-002",
      email: "mike@company.com",
      action: "SUBMISSION",
      entityType: "Audience",
      entityId: "aud-002",
      entityName: "Q42025Campaign",
      details: "Audience submitted for approval",
      ipAddress: "192.168.1.105",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      status: "success",
      changes: null
    },
    {
      id: 6,
      timestamp: "2025-10-12 14:20:30 UTC",
      user: "Emma Davis",
      userId: "user-003",
      email: "emma@company.com",
      action: "VALIDATION_FAILED",
      entityType: "Audience",
      entityId: "aud-004",
      entityName: "AllergySeason2025",
      details: "Audience validation failed",
      ipAddress: "192.168.1.110",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1)",
      status: "failed",
      changes: { error: "Invalid product category in rule set", code: "VAL_ERR_001" }
    },
    {
      id: 7,
      timestamp: "2025-10-12 12:00:00 UTC",
      user: "Sarah Johnson",
      userId: "user-001",
      email: "sarah@company.com",
      action: "CONFIG_CHANGE",
      entityType: "Organization",
      entityId: "org-001",
      entityName: "Acme Healthcare Co.",
      details: "Updated organization settings",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      status: "success",
      changes: {
        before: { approvalRequired: false },
        after: { approvalRequired: true }
      }
    },
    {
      id: 8,
      timestamp: "2025-10-11 10:30:45 UTC",
      user: "Mike Chen",
      userId: "user-002",
      email: "mike@company.com",
      action: "DELETE",
      entityType: "Audience",
      entityId: "aud-005",
      entityName: "OldCampaign2025",
      details: "Deleted draft audience",
      ipAddress: "192.168.1.105",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      status: "success",
      changes: null
    }
  ]);

  const actionColors = {
    CREATE: "#4CAF50",
    UPDATE: "#FF9800",
    DELETE: "#F44336",
    APPROVAL: "#4A90E2",
    SUBMISSION: "#9C27B0",
    ACTIVATION: "#00BCD4",
    VALIDATION_FAILED: "#F44336",
    CONFIG_CHANGE: "#FF9800"
  };

  const actionLabels = {
    CREATE: "Created",
    UPDATE: "Updated",
    DELETE: "Deleted",
    APPROVAL: "Approved",
    SUBMISSION: "Submitted",
    ACTIVATION: "Activated",
    VALIDATION_FAILED: "Validation Failed",
    CONFIG_CHANGE: "Config Changed"
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesUser = !filterUser || log.user.toLowerCase().includes(filterUser.toLowerCase());
    const matchesAction = filterAction === "all" || log.action === filterAction;
    const matchesSearch = searchQuery === "" || 
      log.entityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesUser && matchesAction && matchesSearch;
  });

  const handleExportCSV = () => {
    const headers = ["Timestamp", "User", "Email", "Action", "Entity Type", "Entity Name", "Status", "IP Address"];
    const rows = filteredLogs.map(log => [
      log.timestamp,
      log.user,
      log.email,
      log.action,
      log.entityType,
      log.entityName,
      log.status,
      log.ipAddress
    ]);

    const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-trail-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <>
      <style>{`
        :root {
          --primary-blue: #4A90E2;
          --primary-white: #FFFFFF;
          --primary-dark: #2C3E50;
          --text-primary: #263238;
          --text-secondary: #546E7A;
          --text-muted: #90A4AE;
          --border-light: #E0E0E0;
          --background-primary: #FFFFFF;
          --background-secondary: #FAFBFC;
          --success-green: #4CAF50;
          --warning-orange: #FF9800;
          --error-red: #F44336;
          --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        body {
          font-family: var(--font-sans);
          background-color: var(--background-secondary);
        }
      `}</style>

      <div className="min-h-screen" style={{ backgroundColor: 'var(--background-secondary)' }}>
        {/* Header */}
        <header className="sticky top-0 z-10 border-b" style={{ borderColor: 'var(--border-light)', backgroundColor: 'var(--background-primary)' }}>
          <div className="px-12 py-6 mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold" style={{ color: 'var(--primary-dark)', letterSpacing: '-0.5px' }}>
                  Audit Trail
                </h1>
                <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                  Complete activity log & compliance records
                </p>
              </div>
              <button
                onClick={handleExportCSV}
                style={{ backgroundColor: 'var(--primary-blue)', color: 'var(--primary-white)' }}
                className="px-6 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16v-4m0 0V8m0 4h4m-4 0H8" />
                </svg>
                Export CSV
              </button>
            </div>
          </div>
        </header>

        <main className="px-12 py-8">
          <div className="mx-auto max-w-7xl">
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name, user, email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      backgroundColor: 'var(--background-primary)',
                      borderColor: 'var(--border-light)',
                      color: 'var(--text-primary)'
                    }}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                  />
                  <svg className="absolute right-3 top-3.5 h-4 w-4" style={{ color: 'var(--text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Action Filter */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  Action Type
                </label>
                <select
                  value={filterAction}
                  onChange={(e) => setFilterAction(e.target.value)}
                  style={{
                    backgroundColor: 'var(--background-primary)',
                    borderColor: 'var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                >
                  <option value="all">All Actions</option>
                  <option value="CREATE">Create</option>
                  <option value="UPDATE">Update</option>
                  <option value="DELETE">Delete</option>
                  <option value="APPROVAL">Approval</option>
                  <option value="SUBMISSION">Submission</option>
                  <option value="ACTIVATION">Activation</option>
                </select>
              </div>

              {/* User Filter */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  User
                </label>
                <input
                  type="text"
                  placeholder="Filter by user..."
                  value={filterUser}
                  onChange={(e) => setFilterUser(e.target.value)}
                  style={{
                    backgroundColor: 'var(--background-primary)',
                    borderColor: 'var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  Date Range
                </label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  style={{
                    backgroundColor: 'var(--background-primary)',
                    borderColor: 'var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Logs Table */}
            <div style={{ backgroundColor: 'var(--background-primary)', border: '1px solid var(--border-light)' }} className="rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead style={{ backgroundColor: 'var(--background-secondary)', borderBottomColor: 'var(--border-light)' }} className="border-b">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold" style={{ color: 'var(--text-secondary)' }}>Timestamp</th>
                      <th className="px-6 py-4 text-left font-semibold" style={{ color: 'var(--text-secondary)' }}>User</th>
                      <th className="px-6 py-4 text-left font-semibold" style={{ color: 'var(--text-secondary)' }}>Action</th>
                      <th className="px-6 py-4 text-left font-semibold" style={{ color: 'var(--text-secondary)' }}>Entity</th>
                      <th className="px-6 py-4 text-left font-semibold" style={{ color: 'var(--text-secondary)' }}>Status</th>
                      <th className="px-6 py-4 text-left font-semibold" style={{ color: 'var(--text-secondary)' }}>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.map((log) => (
                      <tr
                        key={log.id}
                        onClick={() => setSelectedEntry(selectedEntry?.id === log.id ? null : log)}
                        style={{ borderBottomColor: 'var(--border-light)', backgroundColor: selectedEntry?.id === log.id ? 'var(--background-secondary)' : 'transparent' }}
                        className="border-b hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <td className="px-6 py-4" style={{ color: 'var(--text-primary)' }}>
                          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{log.timestamp}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium" style={{ color: 'var(--text-primary)' }}>{log.user}</div>
                          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{log.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            style={{ backgroundColor: actionColors[log.action], color: 'white' }}
                            className="px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {actionLabels[log.action]}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium" style={{ color: 'var(--text-primary)' }}>{log.entityName}</div>
                          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{log.entityType}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            style={{
                              backgroundColor: log.status === 'success' ? '#E8F5E9' : '#FFEBEE',
                              color: log.status === 'success' ? '#2E7D32' : '#C62828'
                            }}
                            className="px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            style={{ color: 'var(--primary-blue)' }}
                            className="text-xs font-medium hover:opacity-70 transition-opacity"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Expandable Details */}
            {selectedEntry && (
              <div style={{ backgroundColor: 'var(--background-primary)', border: '1px solid var(--border-light)' }} className="rounded-lg p-6 mt-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold" style={{ color: 'var(--primary-dark)' }}>
                    Detailed Log Entry
                  </h2>
                  <button
                    onClick={() => setSelectedEntry(null)}
                    className="text-2xl leading-none opacity-60 hover:opacity-100"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>WHO</p>
                    <p className="text-sm font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>{selectedEntry.user}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{selectedEntry.email}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>ID: {selectedEntry.userId}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>WHEN</p>
                    <p className="text-sm font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>{selectedEntry.timestamp}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>WHAT</p>
                    <p className="text-sm font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>{actionLabels[selectedEntry.action]}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{selectedEntry.entityType}: {selectedEntry.entityName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>WHERE</p>
                    <p className="text-sm font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>{selectedEntry.ipAddress}</p>
                  </div>
                </div>

                <div style={{ borderTopColor: 'var(--border-light)' }} className="border-t pt-6">
                  <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>DETAILS</p>
                  <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{selectedEntry.details}</p>
                </div>

                {selectedEntry.changes && (
                  <div style={{ borderTopColor: 'var(--border-light)' }} className="border-t pt-6 mt-6">
                    <p className="text-xs font-medium mb-4" style={{ color: 'var(--text-muted)' }}>CHANGES</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div style={{ backgroundColor: 'var(--background-secondary)', border: '1px solid var(--border-light)' }} className="rounded-lg p-4">
                        <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Before</p>
                        <pre className="text-xs" style={{ color: 'var(--text-primary)' }}>
                          {JSON.stringify(selectedEntry.changes.before, null, 2)}
                        </pre>
                      </div>
                      <div style={{ backgroundColor: 'var(--background-secondary)', border: '1px solid var(--border-light)' }} className="rounded-lg p-4">
                        <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>After</p>
                        <pre className="text-xs" style={{ color: 'var(--text-primary)' }}>
                          {JSON.stringify(selectedEntry.changes.after || selectedEntry.changes, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}

                <div style={{ borderTopColor: 'var(--border-light)' }} className="border-t pt-6 mt-6">
                  <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>USER AGENT</p>
                  <p className="text-xs" style={{ color: 'var(--text-primary)' }}>{selectedEntry.userAgent}</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}