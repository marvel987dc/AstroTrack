import React from 'react';

'use client';

import { useState, useEffect } from 'react';
import  supabase  from '../lib/supabase';
import { CelestialObject } from '../lib/database.types';
import CelestialObjectCard from './Celestial-object-card';
import SearchFilters from './search-filters';

export default function AstronomyExplorer() {
  const [celestialObjects, setCelestialObjects] = useState<CelestialObject[]>([]);
  const [filteredObjects, setFilteredObjects] = useState<CelestialObject[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [habitabilityFilter, setHabitabilityFilter] = useState<number | null>(null);
  const [inSolarSystem, setInSolarSystem] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCelestialObjects() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('celestial_objects')
          .select('*');

        if (error) {
          throw error;
        }

        if (data) {
          // Add placeholder images if none exist
          const objectsWithImages = data.map((obj: CelestialObject) => ({
            ...obj,
            image_url: obj.image_url || getPlaceholderImage(obj.category)
          }));
          
          setCelestialObjects(objectsWithImages);
          setFilteredObjects(objectsWithImages);
          
          // Extract unique categories
          const uniqueCategories = [...new Set(data.map((obj: CelestialObject) => obj.category))];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error('Error fetching celestial objects:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCelestialObjects();
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = [...celestialObjects];
    
    if (searchTerm) {
      filtered = filtered.filter(obj => 
        obj.object_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(obj => obj.category === selectedCategory);
    }
    
    if (habitabilityFilter !== null) {
      filtered = filtered.filter(obj => obj.habitability_score >= habitabilityFilter);
    }
    
    if (inSolarSystem !== null) {
      filtered = filtered.filter(obj => obj.in_solar_system === inSolarSystem);
    }
    
    setFilteredObjects(filtered);
  }, [celestialObjects, searchTerm, selectedCategory, habitabilityFilter, inSolarSystem]);

  function getPlaceholderImage(category: string): string {
    // Return different placeholder images based on category
    const categoryMap: Record<string, string> = {
      'Planet': '/placeholder.svg?height=300&width=300&text=Planet',
      'Star': '/placeholder.svg?height=300&width=300&text=Star',
      'Galaxy': '/placeholder.svg?height=300&width=300&text=Galaxy',
      'Nebula': '/placeholder.svg?height=300&width=300&text=Nebula',
      'Black Hole': '/placeholder.svg?height=300&width=300&text=Black+Hole',
      'Asteroid': '/placeholder.svg?height=300&width=300&text=Asteroid',
      'Comet': '/placeholder.svg?height=300&width=300&text=Comet',
      'Moon': '/placeholder.svg?height=300&width=300&text=Moon',
    };
    
    return categoryMap[category] || '/placeholder.svg?height=300&width=300&text=Cosmic+Object';
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        habitabilityFilter={habitabilityFilter}
        setHabitabilityFilter={setHabitabilityFilter}
        inSolarSystem={inSolarSystem}
        setInSolarSystem={setInSolarSystem}
      />
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : filteredObjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredObjects.map((object) => (
            <CelestialObjectCard key={object.object_id} object={object} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold text-gray-300">No celestial objects found</h3>
          <p className="mt-2 text-gray-400">Try adjusting your search filters</p>
        </div>
      )}
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="w-12 h-12 rounded-full border-4 border-t-purple-500 border-r-transparent border-b-blue-500 border-l-transparent animate-spin"></div>
  );
}
