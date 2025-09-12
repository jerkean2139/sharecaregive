import React, { useState, useEffect } from 'react';
import { Plus, MapPin, Users, DollarSign, Calendar, Edit, Trash2, LogOut, Building, Heart, TrendingUp, Activity } from 'lucide-react';
import { LocationForm } from './LocationForm';

interface Location {
  id: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  nonprofits: any[];
  businessCount: number;
  totalFunding: number;
  goalFunding: number;
  lastUpdated: string;
  isActive: boolean;
}

interface AdminDashboardProps {
  token: string;
  user: any;
  onLogout: () => void;
}

export function AdminDashboard({ token, user, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [locations, setLocations] = useState<Location[]>([]);
  const [communities, setCommunities] = useState<any[]>([]);
  const [nonprofits, setNonprofits] = useState<any[]>([]);
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      // Fetch communities
      const communitiesRes = await fetch('/api/communities');
      if (communitiesRes.ok) {
        const communitiesData = await communitiesRes.json();
        setCommunities(communitiesData);
      }

      // Fetch non-profits
      const nonprofitsRes = await fetch('/api/nonprofits');
      if (nonprofitsRes.ok) {
        const nonprofitsData = await nonprofitsRes.json();
        setNonprofits(nonprofitsData);
      }

      // Fetch businesses
      const businessesRes = await fetch('/api/businesses');
      if (businessesRes.ok) {
        const businessesData = await businessesRes.json();
        setBusinesses(businessesData);
      }

      // Fetch admin stats
      const statsRes = await fetch('/api/admin/stats');
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00304f]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-[#00304f]">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {user.username}</p>
            </div>
            <button
              onClick={onLogout}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-[#00304f] text-[#00304f]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('communities')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'communities'
                  ? 'border-[#00304f] text-[#00304f]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Communities
            </button>
            <button
              onClick={() => setActiveTab('nonprofits')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'nonprofits'
                  ? 'border-[#00304f] text-[#00304f]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Non-Profits
            </button>
            <button
              onClick={() => setActiveTab('businesses')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'businesses'
                  ? 'border-[#00304f] text-[#00304f]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Businesses
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
            <button
              onClick={() => setError('')}
              className="ml-2 text-red-800 hover:text-red-900"
            >
              ×
            </button>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <MapPin className="h-8 w-8 text-[#00304f]" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Communities</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalCommunities}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Heart className="h-8 w-8 text-red-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Non-Profits</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalNonprofits}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Building className="h-8 w-8 text-[#69932f]" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Businesses</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalBusinesses}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Raised</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRaised)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Top Community:</span>
                    <span className="font-medium text-gray-900">{stats.topCommunity}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Top Non-Profit:</span>
                    <span className="font-medium text-gray-900">{stats.topNonprofit}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Monthly Average:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(stats.monthlyAverage)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {stats.recentActivity?.map((activity: any, index: number) => (
                    <div key={index} className="flex items-start">
                      <Activity className="h-4 w-4 text-gray-400 mt-1 mr-2" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          {activity.type === 'donation' && `${activity.business} contributed ${formatCurrency(activity.amount)} to ${activity.nonprofit}`}
                          {activity.type === 'new_business' && `${activity.name} joined in ${activity.community}`}
                          {activity.type === 'milestone' && `${activity.nonprofit}: ${activity.achievement}`}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Communities Tab */}
        {activeTab === 'communities' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Communities</h2>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {communities.map((community) => (
                  <li key={community.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <MapPin className="h-6 w-6 text-[#00304f] mr-3" />
                          <div>
                            <p className="text-lg font-medium text-gray-900">{community.name}</p>
                            <p className="text-sm text-gray-500">
                              {community.nonprofits.length} non-profits • {community.businesses.length} businesses
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">{formatCurrency(community.totalRaised)}</p>
                          <p className="text-sm text-gray-500">Total raised</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Non-Profits Tab */}
        {activeTab === 'nonprofits' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Non-Profit Organizations</h2>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Organization
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Community
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Monthly Funding
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Raised
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {nonprofits.map((nonprofit) => (
                    <tr key={nonprofit.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{nonprofit.name}</div>
                        <div className="text-sm text-gray-500">{nonprofit.description.substring(0, 50)}...</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {nonprofit.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {nonprofit.community}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(nonprofit.monthlyFunding)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatCurrency(nonprofit.totalRaised)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Businesses Tab */}
        {activeTab === 'businesses' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Partner Businesses</h2>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Community
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Supporting
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Monthly Contribution
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {businesses.map((business) => (
                    <tr key={business.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{business.name}</div>
                        <div className="text-sm text-gray-500">{business.address}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {business.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {business.community}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {business.supportedNonprofit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatCurrency(business.monthlyContribution)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {business.yearJoined}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}