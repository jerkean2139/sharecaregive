
import React, { useState, useEffect } from 'react';
import { Plus, MapPin, Users, DollarSign, Calendar, Edit, Trash2, LogOut } from 'lucide-react';
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
  const [locations, setLocations] = useState<Location[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch('/api/admin/locations', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLocations(data);
      } else {
        setError('Failed to fetch locations');
      }
    } catch (error) {
      setError('Network error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddLocation = async (locationData: any) => {
    try {
      const response = await fetch('/api/admin/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(locationData),
      });

      if (response.ok) {
        await fetchLocations();
        setShowAddForm(false);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to add location');
      }
    } catch (error) {
      setError('Network error');
    }
  };

  const handleUpdateLocation = async (locationData: any) => {
    if (!editingLocation) return;

    try {
      const response = await fetch(`/api/admin/locations/${editingLocation.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(locationData),
      });

      if (response.ok) {
        await fetchLocations();
        setEditingLocation(null);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update location');
      }
    } catch (error) {
      setError('Network error');
    }
  };

  const handleDeleteLocation = async (id: string) => {
    if (!confirm('Are you sure you want to deactivate this location?')) return;

    try {
      const response = await fetch(`/api/admin/locations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchLocations();
      } else {
        setError('Failed to delete location');
      }
    } catch (error) {
      setError('Network error');
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-[#00304f]" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Locations</p>
                <p className="text-2xl font-bold text-gray-900">{locations.filter(l => l.isActive).length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-[#69932f]" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Businesses</p>
                <p className="text-2xl font-bold text-gray-900">
                  {locations.reduce((sum, loc) => sum + (loc.isActive ? loc.businessCount : 0), 0)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Funding</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(locations.reduce((sum, loc) => sum + (loc.isActive ? loc.totalFunding : 0), 0))}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Last Updated</p>
                <p className="text-sm font-bold text-gray-900">
                  {locations.length > 0 ? formatDate(Math.max(...locations.map(l => new Date(l.lastUpdated).getTime())).toString()) : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Share Care Give Locations</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00304f] hover:bg-[#004066]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Location
          </button>
        </div>

        {/* Locations Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {locations.map((location) => (
              <li key={location.id} className={`${!location.isActive ? 'opacity-50' : ''}`}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <MapPin className="h-6 w-6 text-[#00304f]" />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <p className="text-lg font-medium text-gray-900">
                            {location.city}, {location.state}
                          </p>
                          {!location.isActive && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Inactive
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {location.businessCount} businesses • {formatCurrency(location.totalFunding)} raised
                        </p>
                        <p className="text-xs text-gray-400">
                          Last updated: {formatDate(location.lastUpdated)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingLocation(location)}
                        className="text-indigo-600 hover:text-indigo-900 p-2"
                        title="Edit location"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      {location.isActive && (
                        <button
                          onClick={() => handleDeleteLocation(location.id)}
                          className="text-red-600 hover:text-red-900 p-2"
                          title="Deactivate location"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Latitude: {location.latitude}, Longitude: {location.longitude}</span>
                      <span>Goal: {formatCurrency(location.goalFunding)}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Add Location Form Modal */}
        {showAddForm && (
          <LocationForm
            onSubmit={handleAddLocation}
            onCancel={() => setShowAddForm(false)}
            title="Add New Location"
          />
        )}

        {/* Edit Location Form Modal */}
        {editingLocation && (
          <LocationForm
            location={editingLocation}
            onSubmit={handleUpdateLocation}
            onCancel={() => setEditingLocation(null)}
            title="Edit Location"
          />
        )}
      </div>
    </div>
  );
}
