"use client";

import { useState } from "react";

export default function ClientAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [approvalWorkflow, setApprovalWorkflow] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ email: "", role: "client-user" });

  const [users] = useState([
    { id: 1, name: "Sarah Johnson", email: "sarah@company.com", role: "client-admin", joinDate: "2025-08-15", status: "active" },
    { id: 2, name: "Mike Chen", email: "mike@company.com", role: "client-user", joinDate: "2025-09-01", status: "active" },
    { id: 3, name: "Emma Davis", email: "emma@company.com", role: "client-user", joinDate: "2025-09-10", status: "active" },
    { id: 4, name: "James Wilson", email: "james@company.com", role: "client-user", joinDate: "2025-09-20", status: "inactive" }
  ]);

  const [pendingApprovals] = useState([
    { id: 1, audienceName: "Q42025Holiday", createdBy: "Mike Chen", createdDate: "2025-10-13", size: 850000 },
    { id: 2, audienceName: "NewYearPromo", createdBy: "Emma Davis", createdDate: "2025-10-12", size: 1200000 }
  ]);

  const [destinations] = useState([
    { id: 1, name: "Walmart", enabled: true },
    { id: 2, name: "Target", enabled: true },
    { id: 3, name: "CVS", enabled: true },
    { id: 4, name: "Walgreens", enabled: false },
    { id: 5, name: "Kroger", enabled: true }
  ]);

  const [budget] = useState({
    monthlyLimit: 50000,
    spent: 18750,
    remaining: 31250,
    percentage: 37.5
  });

  const [recentAudiences] = useState([
    { id: 1, name: "Pain2026Walmart", createdBy: "Sarah Johnson", date: "2025-10-13", status: "activated" },
    { id: 2, name: "Q42025Campaign", createdBy: "Mike Chen", date: "2025-10-13", status: "processing" },
    { id: 3, name: "HealthSupps2025", createdBy: "Emma Davis", date: "2025-10-12", status: "activated" }
  ]);

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
                  Admin Dashboard
                </h1>
                <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                  Organization Settings & Management
                </p>
              </div>
              <div style={{ backgroundColor: 'var(--background-secondary)', border: '1px solid var(--border-light)' }} className="px-4 py-2 rounded-lg">
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Organization</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Acme Healthcare Co.</p>
              </div>
            </div>
          </div>
        </header>

        <main className="px-12 py-8">
          <div className="mx-auto max-w-7xl">
            {/* Tabs */}
            <div style={{ borderBottomColor: 'var(--border-light)' }} className="border-b mb-8 flex gap-8">
              {[
                { id: "overview", label: "Overview" },
                { id: "approvals", label: "Approvals", badge: 2 },
                { id: "users", label: "Users" },
                { id: "destinations", label: "Destinations" },
                { id: "budget", label: "Budget & Billing" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    borderBottomColor: activeTab === tab.id ? 'var(--primary-blue)' : 'transparent',
                    color: activeTab === tab.id ? 'var(--primary-blue)' : 'var(--text-secondary)'
                  }}
                  className="pb-3 text-sm font-medium border-b-2 transition-colors relative"
                >
                  {tab.label}
                  {tab.badge && (
                    <span style={{ backgroundColor: 'var(--error-red)' }} className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full text-xs font-bold text-white">
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Settings */}
                <section style={{ backgroundColor: 'var(--background-primary)', border: '1px solid var(--border-light)' }} className="rounded-lg p-6">
                  <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--primary-dark)' }}>
                    Organization Settings
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--background-secondary)', borderColor: 'var(--border-light)', border: '1px solid var(--border-light)' }}>
                      <div>
                        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                          Require Approval for Audience Activation
                        </h3>
                        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                          All audience activations must be approved by an admin
                        </p>
                      </div>
                      <button
                        onClick={() => setApprovalWorkflow(!approvalWorkflow)}
                        style={{
                          backgroundColor: approvalWorkflow ? 'var(--success-green)' : 'var(--text-muted)'
                        }}
                        className="px-4 py-2 rounded-lg text-white text-xs font-medium transition-colors hover:opacity-90"
                      >
                        {approvalWorkflow ? "Enabled" : "Disabled"}
                      </button>
                    </div>
                  </div>
                </section>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { label: "Total Users", value: "4", color: "#4A90E2" },
                    { label: "Active Audiences", value: "12", color: "#4CAF50" },
                    { label: "This Month", value: "$18,750", color: "#FF9800" },
                    { label: "Budget Remaining", value: "$31,250", color: "#9C27B0" }
                  ].map((stat, idx) => (
                    <div key={idx} style={{ backgroundColor: 'var(--background-primary)', border: '1px solid var(--border-light)' }} className="rounded-lg p-4">
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
                      <p className="text-2xl font-bold mt-2" style={{ color: stat.color }}>{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Recent Audiences */}
                <section style={{ backgroundColor: 'var(--background-primary)', border: '1px solid var(--border-light)' }} className="rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary-dark)' }}>
                    Recent Organization Audiences
                  </h2>
                  
                  <div className="space-y-2">
                    {recentAudiences.map(aud => (
                      <div key={aud.id} style={{ backgroundColor: 'var(--background-secondary)', border: '1px solid var(--border-light)' }} className="rounded-lg p-3 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{aud.name}</p>
                          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Created by {aud.createdBy} • {aud.date}</p>
                        </div>
                        <span style={{
                          backgroundColor: aud.status === 'activated' ? '#E8F5E9' : '#FFF3E0',
                          color: aud.status === 'activated' ? '#2E7D32' : '#E65100'
                        }} className="px-3 py-1 rounded-full text-xs font-medium">
                          {aud.status.charAt(0).toUpperCase() + aud.status.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* Approvals Tab */}
            {activeTab === "approvals" && (
              <div className="space-y-4">
                {pendingApprovals.length === 0 ? (
                  <div style={{ backgroundColor: 'var(--background-primary)', border: '1px solid var(--border-light)' }} className="rounded-lg p-12 text-center">
                    <svg className="mx-auto h-12 w-12 mb-4" style={{ color: 'var(--text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No pending approvals</p>
                  </div>
                ) : (
                  pendingApprovals.map(approval => (
                    <div key={approval.id} style={{ backgroundColor: 'var(--background-primary)', border: '1px solid var(--border-light)' }} className="rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold" style={{ color: 'var(--primary-dark)' }}>
                            {approval.audienceName}
                          </h3>
                          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                            Requested by {approval.createdBy} • {approval.createdDate}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Audience Size</p>
                          <p className="text-lg font-semibold" style={{ color: 'var(--primary-dark)' }}>
                            {(approval.size / 1000000).toFixed(1)}M
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          style={{ backgroundColor: 'var(--success-green)', color: 'var(--primary-white)' }}
                          className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                          Approve
                        </button>
                        <button
                          style={{ backgroundColor: 'var(--error-red)', color: 'var(--primary-white)' }}
                          className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                          Reject
                        </button>
                        <input
                          type="text"
                          placeholder="Add comment..."
                          style={{
                            backgroundColor: 'var(--background-secondary)',
                            borderColor: 'var(--border-light)',
                            color: 'var(--text-primary)'
                          }}
                          className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Users Tab */}
            {activeTab === "users" && (
              <div className="space-y-4">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setShowAddUser(!showAddUser)}
                    style={{ backgroundColor: 'var(--primary-blue)', color: 'var(--primary-white)' }}
                    className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    + Add User
                  </button>
                </div>

                {showAddUser && (
                  <div style={{ backgroundColor: 'var(--background-primary)', border: '1px solid var(--border-light)' }} className="rounded-lg p-6 mb-4">
                    <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary-dark)' }}>Add New User</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Email</label>
                        <input
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                          style={{
                            backgroundColor: 'var(--background-secondary)',
                            borderColor: 'var(--border-light)',
                            color: 'var(--text-primary)'
                          }}
                          className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Role</label>
                        <select
                          value={newUser.role}
                          onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                          style={{
                            backgroundColor: 'var(--background-secondary)',
                            borderColor: 'var(--border-light)',
                            color: 'var(--text-primary)'
                          }}
                          className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        >
                          <option value="client-user">Client User</option>
                          <option value="client-admin">Client Admin</option>
                        </select>
                      </div>
                      <div className="flex gap-3">
                        <button
                          style={{ backgroundColor: 'var(--primary-blue)', color: 'var(--primary-white)' }}
                          className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                          Send Invite
                        </button>
                        <button
                          onClick={() => setShowAddUser(false)}
                          style={{ backgroundColor: 'var(--background-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-light)' }}
                          className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {users.map(user => (
                  <div key={user.id} style={{ backgroundColor: 'var(--background-primary)', border: '1px solid var(--border-light)' }} className="rounded-lg p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold" style={{ color: 'var(--primary-dark)' }}>{user.name}</h3>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{user.email}</p>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Joined {user.joinDate}</p>
                    </div>
                    <div className="flex gap-3 items-center">
                      <span style={{
                        backgroundColor: user.role === 'client-admin' ? '#E3F2FD' : '#F5F7FA',
                        color: user.role === 'client-admin' ? 'var(--primary-blue)' : 'var(--text-secondary)',
                        border: `1px solid ${user.role === 'client-admin' ? 'var(--primary-blue)' : 'var(--border-light)'}`
                      }} className="px-3 py-1 rounded-full text-xs font-medium">
                        {user.role === 'client-admin' ? 'Admin' : 'User'}
                      </span>
                      <span style={{
                        backgroundColor: user.status === 'active' ? '#E8F5E9' : '#F5F7FA',
                        color: user.status === 'active' ? '#2E7D32' : 'var(--text-muted)'
                      }} className="px-3 py-1 rounded-full text-xs font-medium">
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Destinations Tab */}
            {activeTab === "destinations" && (
              <div className="space-y-4">
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }} className="mb-4">
                  Select which destinations are available for your organization
                </p>
                {destinations.map(dest => (
                  <div key={dest.id} style={{ backgroundColor: 'var(--background-primary)', border: '1px solid var(--border-light)' }} className="rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={dest.enabled}
                        readOnly
                        className="w-4 h-4"
                      />
                      <h3 className="text-sm font-semibold" style={{ color: 'var(--primary-dark)' }}>{dest.name}</h3>
                    </div>
                    <button
                      style={{ color: 'var(--primary-blue)' }}
                      className="text-xs font-medium hover:opacity-70 transition-opacity"
                    >
                      Configure
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Budget Tab */}
            {activeTab === "budget" && (
              <div className="space-y-6">
                {/* Budget Overview */}
                <section style={{ backgroundColor: 'var(--background-primary)', border: '1px solid var(--border-light)' }} className="rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--primary-dark)' }}>
                    Monthly Budget
                  </h2>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Monthly Limit</p>
                      <p className="text-2xl font-bold mt-2" style={{ color: 'var(--primary-dark)' }}>
                        ${budget.monthlyLimit.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Spent This Month</p>
                      <p className="text-2xl font-bold mt-2" style={{ color: 'var(--warning-orange)' }}>
                        ${budget.spent.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Remaining</p>
                      <p className="text-2xl font-bold mt-2" style={{ color: 'var(--success-green)' }}>
                        ${budget.remaining.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div style={{ backgroundColor: 'var(--background-secondary)', border: '1px solid var(--border-light)' }} className="w-full h-3 rounded-full overflow-hidden">
                    <div
                      style={{ backgroundColor: 'var(--warning-orange)', width: `${budget.percentage}%` }}
                      className="h-full transition-all duration-300"
                    />
                  </div>
                  <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
                    {budget.percentage}% of monthly budget used
                  </p>
                </section>

                {/* Billing History */}
                <section style={{ backgroundColor: 'var(--background-primary)', border: '1px solid var(--border-light)' }} className="rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary-dark)' }}>
                    Billing History
                  </h2>
                  <button
                    style={{ color: 'var(--primary-blue)' }}
                    className="text-sm font-medium hover:opacity-70 transition-opacity"
                  >
                    Download Invoice (October 2025)
                  </button>
                </section>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}