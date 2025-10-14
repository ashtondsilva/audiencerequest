"use client";

import { useState } from "react";

export default function AudienceTrackingDashboard() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAudience, setSelectedAudience] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, type: "success", message: "Audience 'Pain2026Walmart' activated successfully", time: "2 minutes ago" },
    { id: 2, type: "info", message: "Audience 'Q42025Campaign' processing started", time: "15 minutes ago" }
  ]);

  const [audiences] = useState([
    {
      id: 1,
      name: "Pain2026Walmart",
      createdDate: "2025-10-13",
      submittedDate: "2025-10-13",
      destinations: ["Walmart", "Target"],
      status: "activated",
      progress: 100,
      activatedRecords: 1250000,
      estimatedCompletion: "Completed",
      stages: [
        { name: "Validation", status: "completed", timestamp: "10:15 AM" },
        { name: "Processing", status: "completed", timestamp: "10:45 AM" },
        { name: "Distribution", status: "completed", timestamp: "11:20 AM" }
      ]
    },
    {
      id: 2,
      name: "Q42025Campaign",
      createdDate: "2025-10-13",
      submittedDate: "2025-10-13",
      destinations: ["CVS", "Walgreens", "Kroger"],
      status: "processing",
      progress: 65,
      activatedRecords: null,
      estimatedCompletion: "~2 hours",
      stages: [
        { name: "Validation", status: "completed", timestamp: "10:30 AM" },
        { name: "Processing", status: "in-progress", timestamp: "Currently running" },
        { name: "Distribution", status: "pending", timestamp: "Pending" }
      ]
    },
    {
      id: 3,
      name: "HealthSupps2025",
      createdDate: "2025-10-12",
      submittedDate: "2025-10-12",
      destinations: ["Walmart"],
      status: "pending",
      progress: 0,
      activatedRecords: null,
      estimatedCompletion: "~4 hours",
      stages: [
        { name: "Validation", status: "pending", timestamp: "Queued" },
        { name: "Processing", status: "pending", timestamp: "Pending" },
        { name: "Distribution", status: "pending", timestamp: "Pending" }
      ]
    },
    {
      id: 4,
      name: "AllergySeason2025",
      createdDate: "2025-10-11",
      submittedDate: "2025-10-11",
      destinations: ["Target", "CVS"],
      status: "failed",
      progress: 0,
      activatedRecords: null,
      estimatedCompletion: "Failed",
      error: "Invalid product category in rule set",
      stages: [
        { name: "Validation", status: "failed", timestamp: "11:00 AM" },
        { name: "Processing", status: "failed", timestamp: "N/A" },
        { name: "Distribution", status: "failed", timestamp: "N/A" }
      ]
    }
  ]);

  const filteredAudiences = audiences.filter(aud => {
    const matchesStatus = filterStatus === "all" || aud.status === filterStatus;
    const matchesSearch = aud.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case "activated":
        return { bg: "#E8F5E9", border: "#4CAF50", text: "#2E7D32", badge: "#4CAF50" };
      case "processing":
        return { bg: "#FFF3E0", border: "#FF9800", text: "#E65100", badge: "#FF9800" };
      case "pending":
        return { bg: "#F3E5F5", border: "#9C27B0", text: "#6A1B9A", badge: "#9C27B0" };
      case "failed":
        return { bg: "#FFEBEE", border: "#F44336", text: "#C62828", badge: "#F44336" };
      default:
        return { bg: "#F5F7FA", border: "#BDBDBD", text: "#546E7A", badge: "#90A4AE" };
    }
  };

  const getStageStatus = (stageStatus) => {
    switch(stageStatus) {
      case "completed":
        return { icon: "✓", color: "#4CAF50" };
      case "in-progress":
        return { icon: "●", color: "#FF9800" };
      case "pending":
        return { icon: "○", color: "#90A4AE" };
      case "failed":
        return { icon: "✕", color: "#F44336" };
      default:
        return { icon: "○", color: "#90A4AE" };
    }
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
                  Audience Tracking
                </h1>
                <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                  Monitor activation status and progress
                </p>
              </div>
              <button
                style={{ backgroundColor: 'var(--primary-blue)', color: 'var(--primary-white)' }}
                className="px-6 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Create New Audience
              </button>
            </div>
          </div>
        </header>

        <main className="px-12 py-8">
          <div className="mx-auto max-w-7xl space-y-8">
            {/* Notifications */}
            {notifications.length > 0 && (
              <div className="space-y-2">
                {notifications.map(notif => (
                  <div
                    key={notif.id}
                    style={{
                      backgroundColor: notif.type === 'success' ? '#E8F5E9' : '#E3F2FD',
                      borderLeft: `4px solid ${notif.type === 'success' ? 'var(--success-green)' : 'var(--primary-blue)'}`,
                      color: notif.type === 'success' ? '#2E7D32' : '#1565C0'
                    }}
                    className="p-4 rounded-lg flex items-start justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium">{notif.message}</p>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{notif.time}</p>
                    </div>
                    <button
                      onClick={() => setNotifications(notifications.filter(n => n.id !== notif.id))}
                      className="text-lg leading-none opacity-60 hover:opacity-100"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  Search Audiences
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by audience name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      backgroundColor: 'var(--background-primary)',
                      borderColor: 'var(--border-light)',
                      color: 'var(--text-primary)'
                    }}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <svg className="absolute right-3 top-3.5 h-5 w-5" style={{ color: 'var(--text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Filter */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  Filter by Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{
                    backgroundColor: 'var(--background-primary)',
                    borderColor: 'var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="activated">Activated</option>
                  <option value="processing">Processing</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>

            {/* Audiences Grid */}
            <div className="space-y-4">
              {filteredAudiences.length === 0 ? (
                <div style={{ backgroundColor: 'var(--background-primary)', border: '1px solid var(--border-light)' }} className="rounded-lg p-12 text-center">
                  <svg className="mx-auto h-12 w-12 mb-4" style={{ color: 'var(--text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No audiences found</p>
                </div>
              ) : (
                filteredAudiences.map(audience => {
                  const colors = getStatusColor(audience.status);
                  return (
                    <div
                      key={audience.id}
                      style={{ backgroundColor: 'var(--background-primary)', border: '1px solid var(--border-light)' }}
                      className="rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedAudience(selectedAudience?.id === audience.id ? null : audience)}
                    >
                      {/* Header Row */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold" style={{ color: 'var(--primary-dark)' }}>
                              {audience.name}
                            </h3>
                            <span
                              style={{ backgroundColor: colors.bg, color: colors.text, borderColor: colors.border }}
                              className="px-3 py-1 rounded-full text-xs font-medium border"
                            >
                              {audience.status.charAt(0).toUpperCase() + audience.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                            Submitted {audience.submittedDate}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                            Est. Completion
                          </div>
                          <div className="text-sm font-semibold" style={{ color: 'var(--primary-dark)' }}>
                            {audience.estimatedCompletion}
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div style={{ backgroundColor: 'var(--background-secondary)', border: '1px solid var(--border-light)' }} className="w-full h-2 rounded-full overflow-hidden">
                          <div
                            style={{ backgroundColor: colors.badge, width: `${audience.progress}%` }}
                            className="h-full transition-all duration-300"
                          />
                        </div>
                        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                          {audience.progress}% Complete
                        </p>
                      </div>

                      {/* Info Row */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Destinations</p>
                          <p className="text-sm font-medium mt-1" style={{ color: 'var(--text-primary)' }}>
                            {audience.destinations.join(", ")}
                          </p>
                        </div>
                        {audience.activatedRecords && (
                          <div>
                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Activated Records</p>
                            <p className="text-sm font-medium mt-1" style={{ color: 'var(--text-primary)' }}>
                              {audience.activatedRecords.toLocaleString()}
                            </p>
                          </div>
                        )}
                        <div>
                          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Actions</p>
                          <div className="flex gap-2 mt-1">
                            <button
                              style={{ color: 'var(--primary-blue)' }}
                              className="text-xs font-medium hover:opacity-70 transition-opacity"
                            >
                              Details
                            </button>
                            <button
                              style={{ color: 'var(--primary-blue)' }}
                              className="text-xs font-medium hover:opacity-70 transition-opacity"
                            >
                              Export
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Expandable Details */}
                      {selectedAudience?.id === audience.id && (
                        <div style={{ backgroundColor: 'var(--background-secondary)', border: '1px solid var(--border-light)' }} className="rounded-lg p-4 mt-4 space-y-4">
                          <div>
                            <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--primary-dark)' }}>
                              Activation Pipeline
                            </h4>
                            <div className="space-y-2">
                              {audience.stages.map((stage, idx) => {
                                const stageData = getStageStatus(stage.status);
                                return (
                                  <div key={idx} className="flex items-center gap-3">
                                    <span style={{ color: stageData.color }} className="text-lg font-bold">
                                      {stageData.icon}
                                    </span>
                                    <div className="flex-1">
                                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                                        {stage.name}
                                      </p>
                                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                        {stage.timestamp}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {audience.error && (
                            <div style={{ backgroundColor: '#FFEBEE', border: '1px solid var(--error-red)', color: '#C62828' }} className="rounded-lg p-3">
                              <p className="text-xs font-medium">Error Details</p>
                              <p className="text-sm mt-1">{audience.error}</p>
                              <button
                                style={{ color: 'var(--primary-blue)' }}
                                className="text-xs font-medium mt-2 hover:opacity-70 transition-opacity"
                              >
                                View Remediation Steps
                              </button>
                            </div>
                          )}

                          <div style={{ borderTopColor: 'var(--border-light)' }} className="border-t pt-4">
                            <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Audit Trail</p>
                            <button
                              style={{ color: 'var(--primary-blue)' }}
                              className="text-sm font-medium hover:opacity-70 transition-opacity"
                            >
                              View Complete History
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}