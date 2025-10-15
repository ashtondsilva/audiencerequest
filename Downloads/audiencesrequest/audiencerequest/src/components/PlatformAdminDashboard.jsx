import React, { useState } from 'react';
import { Settings, Users, Database, Activity, Shield, FileText, Bell, Globe } from 'lucide-react';

const PlatformAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('system');
  const [selectedClient, setSelectedClient] = useState(null);
  const [configModal, setConfigModal] = useState(null);

  // Mock data
  const systemMetrics = [
    { label: 'Total Clients', value: '47', trend: '+3 this month', status: 'success' },
    { label: 'Active Users', value: '892', trend: '+12% vs last week', status: 'success' },
    { label: 'API Requests (24h)', value: '2.4M', trend: 'Normal range', status: 'neutral' },
    { label: 'System Health', value: '99.8%', trend: 'Uptime', status: 'success' }
  ];

  const clients = [
    { id: 1, name: 'Acme Corporation', users: 45, status: 'Active', lastActivity: '2 hours ago', tier: 'Enterprise' },
    { id: 2, name: 'Global Retail Inc', users: 32, status: 'Active', lastActivity: '5 hours ago', tier: 'Professional' },
    { id: 3, name: 'Market Analytics Co', users: 28, status: 'Active', lastActivity: '1 day ago', tier: 'Enterprise' },
    { id: 4, name: 'Consumer Insights Ltd', users: 19, status: 'Trial', lastActivity: '3 hours ago', tier: 'Trial' },
    { id: 5, name: 'Retail Dynamics', users: 41, status: 'Active', lastActivity: '30 mins ago', tier: 'Enterprise' }
  ];

  const destinations = [
    { name: 'Google Ads', status: 'Active', clients: 23, lastSync: '15 mins ago' },
    { name: 'Facebook Ads', status: 'Active', clients: 31, lastSync: '8 mins ago' },
    { name: 'Amazon DSP', status: 'Active', clients: 18, lastSync: '22 mins ago' },
    { name: 'The Trade Desk', status: 'Maintenance', clients: 15, lastSync: '2 hours ago' },
    { name: 'DV360', status: 'Active', clients: 27, lastSync: '5 mins ago' }
  ];

  const recentActivity = [
    { type: 'client', action: 'New client onboarded', detail: 'Consumer Insights Ltd', time: '2 hours ago' },
    { type: 'system', action: 'System configuration updated', detail: 'API rate limits increased', time: '5 hours ago' },
    { type: 'destination', action: 'Destination maintenance', detail: 'The Trade Desk - scheduled update', time: '6 hours ago' },
    { type: 'user', action: 'Admin access granted', detail: 'john.doe@circana.com', time: '1 day ago' },
    { type: 'audit', action: 'Compliance audit completed', detail: 'Q4 2025 data review', time: '2 days ago' }
  ];

  const renderSystemConfig = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        {systemMetrics.map((metric, idx) => (
          <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              {metric.label}
            </div>
            <div className="text-2xl font-semibold text-gray-900 mb-1">
              {metric.value}
            </div>
            <div className={`text-sm ${
              metric.status === 'success' ? 'text-green-600' : 
              metric.status === 'warning' ? 'text-orange-600' : 
              'text-blue-600'
            }`}>
              {metric.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">System Configuration</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <div className="font-medium text-gray-900">API Rate Limiting</div>
              <div className="text-sm text-gray-500">Configure request limits per client</div>
            </div>
            <button 
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              onClick={() => setConfigModal('apiRateLimit')}
            >
              Configure
            </button>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <div className="font-medium text-gray-900">Data Retention Policies</div>
              <div className="text-sm text-gray-500">Set default retention periods</div>
            </div>
            <button 
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              onClick={() => setConfigModal('dataRetention')}
            >
              Configure
            </button>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <div className="font-medium text-gray-900">Security Settings</div>
              <div className="text-sm text-gray-500">Manage authentication and access control</div>
            </div>
            <button 
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              onClick={() => setConfigModal('security')}
            >
              Configure
            </button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <div className="font-medium text-gray-900">Notification Settings</div>
              <div className="text-sm text-gray-500">Configure system alerts and notifications</div>
            </div>
            <button 
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              onClick={() => setConfigModal('notifications')}
            >
              Configure
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClientManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search clients..."
            className="w-full h-11 pl-4 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="ml-4 px-6 py-2.5 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors">
          Onboard New Client
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">
                  Client Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">
                  Users
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">
                  Tier
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">
                  Last Activity
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{client.name}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{client.users}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                      client.tier === 'Enterprise' ? 'bg-blue-100 text-blue-700' :
                      client.tier === 'Professional' ? 'bg-green-100 text-green-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {client.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                      client.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{client.lastActivity}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => setSelectedClient(client)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderDestinations = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Manage destination integrations and monitor sync status
        </div>
        <button className="px-6 py-2.5 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors">
          Add Destination
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {destinations.map((dest, idx) => (
          <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{dest.name}</div>
                  <div className="text-sm text-gray-500">
                    {dest.clients} clients connected · Last sync: {dest.lastSync}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                  dest.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {dest.status}
                </span>
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                  Configure
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAuditLog = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search audit logs..."
            className="w-full h-11 pl-4 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="ml-4 px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors">
          Export Logs
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'client' ? 'bg-blue-100' :
                    activity.type === 'system' ? 'bg-purple-100' :
                    activity.type === 'destination' ? 'bg-green-100' :
                    activity.type === 'user' ? 'bg-orange-100' :
                    'bg-gray-100'
                  }`}>
                    {activity.type === 'client' && <Users className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'system' && <Settings className="w-4 h-4 text-purple-600" />}
                    {activity.type === 'destination' && <Database className="w-4 h-4 text-green-600" />}
                    {activity.type === 'user' && <Shield className="w-4 h-4 text-orange-600" />}
                    {activity.type === 'audit' && <FileText className="w-4 h-4 text-gray-600" />}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{activity.action}</div>
                    <div className="text-sm text-gray-500 mt-0.5">{activity.detail}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-400">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'system', label: 'System Configuration', icon: Settings },
    { id: 'clients', label: 'Client Management', icon: Users },
    { id: 'destinations', label: 'Destinations', icon: Database },
    { id: 'audit', label: 'Audit Log', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Platform Administration</h1>
              <p className="text-gray-600 mt-1">System-level settings and client management</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                <Activity className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-1 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'system' && renderSystemConfig()}
        {activeTab === 'clients' && renderClientManagement()}
        {activeTab === 'destinations' && renderDestinations()}
        {activeTab === 'audit' && renderAuditLog()}
      </div>

      {/* Client Detail Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">{selectedClient.name}</h3>
              <button
                onClick={() => setSelectedClient(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Status</div>
                  <div className="mt-1 text-gray-900">{selectedClient.status}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Tier</div>
                  <div className="mt-1 text-gray-900">{selectedClient.tier}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Total Users</div>
                  <div className="mt-1 text-gray-900">{selectedClient.users}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Last Activity</div>
                  <div className="mt-1 text-gray-900">{selectedClient.lastActivity}</div>
                </div>
              </div>
              <div className="pt-4 flex space-x-3">
                <button className="flex-1 px-4 py-2.5 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors">
                  View Full Details
                </button>
                <button className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors">
                  Access Client Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Configuration Modals */}
      {configModal === 'apiRateLimit' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">API Rate Limiting</h3>
              <button
                onClick={() => setConfigModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Rate Limit (requests per minute)
                </label>
                <input
                  type="number"
                  defaultValue="1000"
                  className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Burst Limit (max concurrent requests)
                </label>
                <input
                  type="number"
                  defaultValue="100"
                  className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enterprise Tier Multiplier
                </label>
                <input
                  type="number"
                  defaultValue="5"
                  step="0.1"
                  className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">Enterprise clients get 5x the base rate limit</p>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoScale"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="autoScale" className="ml-2 text-sm text-gray-700">
                  Enable automatic scaling during high traffic
                </label>
              </div>
              <div className="pt-4 flex space-x-3">
                <button 
                  onClick={() => setConfigModal(null)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2.5 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {configModal === 'dataRetention' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Data Retention Policies</h3>
              <button
                onClick={() => setConfigModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Audience Data Retention (days)
                </label>
                <select className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                  <option value="365">365 days (1 year)</option>
                  <option value="730">730 days (2 years)</option>
                  <option value="1825">1825 days (5 years)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Audit Log Retention (days)
                </label>
                <select className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="365">365 days (1 year)</option>
                  <option value="730">730 days (2 years)</option>
                  <option value="1825">1825 days (5 years)</option>
                  <option value="3650">3650 days (10 years)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Archived Data Retention (days)
                </label>
                <select className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="730">730 days (2 years)</option>
                  <option value="1825">1825 days (5 years)</option>
                  <option value="3650">3650 days (10 years)</option>
                  <option value="-1">Indefinite</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoArchive"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="autoArchive" className="ml-2 text-sm text-gray-700">
                  Automatically archive data before deletion
                </label>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
                <p className="text-sm text-orange-800">
                  <strong>Warning:</strong> Reducing retention periods will permanently delete data that exceeds the new limits. This action cannot be undone.
                </p>
              </div>
              <div className="pt-4 flex space-x-3">
                <button 
                  onClick={() => setConfigModal(null)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2.5 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {configModal === 'security' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Security Settings</h3>
              <button
                onClick={() => setConfigModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password Policy
                </label>
                <select className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="basic">Basic (8+ characters)</option>
                  <option value="standard">Standard (10+ characters, mixed case, numbers)</option>
                  <option value="strict">Strict (12+ characters, mixed case, numbers, symbols)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Timeout (minutes)
                </label>
                <input
                  type="number"
                  defaultValue="60"
                  className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Multi-Factor Authentication
                </label>
                <select className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="optional">Optional</option>
                  <option value="required">Required for all users</option>
                  <option value="admin">Required for admin users only</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="ipWhitelist"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="ipWhitelist" className="ml-2 text-sm text-gray-700">
                  Enable IP whitelisting
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="auditLogin"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="auditLogin" className="ml-2 text-sm text-gray-700">
                  Log all authentication attempts
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="apiKeyRotation"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="apiKeyRotation" className="ml-2 text-sm text-gray-700">
                  Enforce API key rotation (90 days)
                </label>
              </div>
              <div className="pt-4 flex space-x-3">
                <button 
                  onClick={() => setConfigModal(null)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2.5 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {configModal === 'notifications' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Notification Settings</h3>
              <button
                onClick={() => setConfigModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  System Alert Recipients
                </label>
                <input
                  type="text"
                  placeholder="admin@circana.com, ops@circana.com"
                  defaultValue="admin@circana.com, ops@circana.com"
                  className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">Comma-separated email addresses</p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Alert Triggers</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">System downtime detected</label>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">API error rate exceeds threshold</label>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">New client onboarding</label>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">Destination sync failures</label>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">Security events (failed logins, etc.)</label>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">Storage capacity warnings</label>
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notification Frequency
                </label>
                <select className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="immediate">Immediate</option>
                  <option value="hourly">Hourly digest</option>
                  <option value="daily">Daily digest</option>
                </select>
              </div>
              <div className="pt-4 flex space-x-3">
                <button 
                  onClick={() => setConfigModal(null)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2.5 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformAdminDashboard;