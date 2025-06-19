
import React, { useState, useEffect } from 'react';
import { X, MapPin } from 'lucide-react';

interface LocationFormProps {
  location?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  title: string;
}

export function LocationForm({ location, onSubmit, onCancel, title }: LocationFormProps) {
  const [formData, setFormData] = useState({
    city: '',
    state: '',
    latitude: '',
    longitude: '',
    businessCount: '0',
    totalFunding: '0',
    goalFunding: '1000000',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (location) {
      setFormData({
        city: location.city || '',
        state: location.state || '',
        latitude: location.latitude?.toString() || '',
        longitude: location.longitude?.toString() || '',
        businessCount: location.businessCount?.toString() || '0',
        totalFunding: location.totalFunding?.toString() || '0',
        goalFunding: location.goalFunding?.toString() || '1000000',
      });
    }
  }, [location]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    const lat = parseFloat(formData.latitude);
    if (!formData.latitude || isNaN(lat) || lat < -90 || lat > 90) {
      newErrors.latitude = 'Valid latitude is required (-90 to 90)';
    }

    const lng = parseFloat(formData.longitude);
    if (!formData.longitude || isNaN(lng) || lng < -180 || lng > 180) {
      newErrors.longitude = 'Valid longitude is required (-180 to 180)';
    }

    const businessCount = parseInt(formData.businessCount);
    if (isNaN(businessCount) || businessCount < 0) {
      newErrors.businessCount = 'Business count must be a non-negative number';
    }

    const totalFunding = parseFloat(formData.totalFunding);
    if (isNaN(totalFunding) || totalFunding < 0) {
      newErrors.totalFunding = 'Total funding must be a non-negative number';
    }

    const goalFunding = parseFloat(formData.goalFunding);
    if (isNaN(goalFunding) || goalFunding <= 0) {
      newErrors.goalFunding = 'Goal funding must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const submitData = {
      city: formData.city.trim(),
      state: formData.state.trim(),
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      businessCount: parseInt(formData.businessCount),
      totalFunding: parseFloat(formData.totalFunding),
      goalFunding: parseFloat(formData.goalFunding),
    };

    onSubmit(submitData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // US States for dropdown
  const usStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center">
            <MapPin className="h-6 w-6 text-[#00304f] mr-2" />
            <h2 className="text-xl font-bold text-[#00304f]">{title}</h2>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00304f] ${
                  errors.city ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter city name"
              />
              {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <select
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00304f] ${
                  errors.state ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select a state</option>
                {usStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
            </div>

            {/* Latitude */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Latitude *
              </label>
              <input
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) => handleInputChange('latitude', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00304f] ${
                  errors.latitude ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g., 35.0887"
              />
              {errors.latitude && <p className="mt-1 text-sm text-red-600">{errors.latitude}</p>}
            </div>

            {/* Longitude */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Longitude *
              </label>
              <input
                type="number"
                step="any"
                value={formData.longitude}
                onChange={(e) => handleInputChange('longitude', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00304f] ${
                  errors.longitude ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g., -92.4421"
              />
              {errors.longitude && <p className="mt-1 text-sm text-red-600">{errors.longitude}</p>}
            </div>

            {/* Business Count */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Count
              </label>
              <input
                type="number"
                min="0"
                value={formData.businessCount}
                onChange={(e) => handleInputChange('businessCount', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00304f] ${
                  errors.businessCount ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="0"
              />
              {errors.businessCount && <p className="mt-1 text-sm text-red-600">{errors.businessCount}</p>}
            </div>

            {/* Total Funding */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Funding ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.totalFunding}
                onChange={(e) => handleInputChange('totalFunding', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00304f] ${
                  errors.totalFunding ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
              {errors.totalFunding && <p className="mt-1 text-sm text-red-600">{errors.totalFunding}</p>}
            </div>
          </div>

          {/* Goal Funding */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Goal Funding ($)
            </label>
            <input
              type="number"
              min="1"
              step="0.01"
              value={formData.goalFunding}
              onChange={(e) => handleInputChange('goalFunding', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00304f] ${
                errors.goalFunding ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="1000000.00"
            />
            {errors.goalFunding && <p className="mt-1 text-sm text-red-600">{errors.goalFunding}</p>}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00304f]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00304f] hover:bg-[#004066] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00304f]"
            >
              {location ? 'Update Location' : 'Add Location'}
            </button>
          </div>
        </form>

        <div className="px-6 py-4 bg-gray-50 text-sm text-gray-600">
          <p><strong>Tip:</strong> You can find latitude and longitude coordinates using Google Maps. Right-click on a location and copy the coordinates.</p>
        </div>
      </div>
    </div>
  );
}
