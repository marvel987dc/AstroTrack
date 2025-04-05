import React from 'react';
'use client';

import { Search, Filter, Home, Globe } from 'lucide-react';

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  habitabilityFilter: number | null;
  setHabitabilityFilter: (score: number | null) => void;
  inSolarSystem: string | null;
  setInSolarSystem: (value: string | null) => void;
}

export default function SearchFilters({
  searchTerm,
  setSearchTerm,
  categories,
  selectedCategory,
  setSelectedCategory,
  habitabilityFilter,
  setHabitabilityFilter,
  inSolarSystem,
  setInSolarSystem
}: SearchFiltersProps) {
  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search celestial objects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <div className="flex items-center text-gray-300">
            <Filter className="w-4 h-4 mr-2 text-purple-400" />
            <span>Category</span>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-gray-300">
            <Home className="w-4 h-4 mr-2 text-green-400" />
            <span>Habitability Score</span>
          </div>
          <select
            value={habitabilityFilter === null ? '' : habitabilityFilter.toString()}
            onChange={(e) => setHabitabilityFilter(e.target.value ? Number(e.target.value) : null)}
            className="block w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Any Score</option>
            <option value="7.5">Excellent (7.5+)</option>
            <option value="5">Good (5+)</option>
            <option value="2.5">Fair (2.5+)</option>
            <option value="0">Poor (0+)</option>
          </select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-gray-300">
            <Globe className="w-4 h-4 mr-2 text-blue-400" />
            <span>Location</span>
          </div>
          <select
            value={inSolarSystem === null ? '' : inSolarSystem}
            onChange={(e) => setInSolarSystem(e.target.value || null)}
            className="block w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All Locations</option>
            <option value="Y">In Solar System</option>
            <option value="N">Outside Solar System</option>
          </select>
        </div>
      </div>
    </div>
  );
}
