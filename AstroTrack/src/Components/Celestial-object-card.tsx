import React from 'react';
// import { CelestialObject } from '@/lib/database.types';


'use client';

import { useState } from 'react';
import { CelestialObject } from '../lib/database.types';
import { Thermometer, Droplets, Wind, Calendar, Ruler, Star, ChevronDown, ChevronUp } from 'lucide-react';

interface CelestialObjectCardProps {
  object: CelestialObject;
}

export default function CelestialObjectCard({ object }: CelestialObjectCardProps) {
  const [expanded, setExpanded] = useState(false);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString();
  };

  const getHabitabilityColor = (score: number) => {
    if (score >= 7.5) return 'bg-green-500';
    if (score >= 5) return 'bg-yellow-500';
    if (score >= 2.5) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getAtmosphereComposition = () => {
    const elements = [];
    if (object.nitrogen === 'Y') elements.push('Nitrogen');
    if (object.oxygen === 'Y') elements.push('Oxygen');
    if (object.co2 === 'Y') elements.push('CO₂');
    if (object.hydrogen === 'Y') elements.push('Hydrogen');
    if (object.helium === 'Y') elements.push('Helium');
    if (object.methane === 'Y') elements.push('Methane');
    if (object.water_vapor === 'Y') elements.push('Water Vapor');
    if (object.sulfuric_acid === 'Y') elements.push('Sulfuric Acid');
    
    return elements.length > 0 ? elements.join(', ') : 'None detected';
  };

  const getComposition = () => {
    const elements = [];
    if (object.silicates === 'Y') elements.push('Silicates');
    if (object.iron === 'Y') elements.push('Iron');
    if (object.nickel === 'Y') elements.push('Nickel');
    
    return elements.length > 0 ? elements.join(', ') : 'Unknown';
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-800">
      <div className="relative">
        <div className="h-48 bg-gray-800 overflow-hidden">
          <img 
            src={object.image_url || '/placeholder.svg?height=300&width=300'} 
            alt={object.object_name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full px-3 py-1 text-xs">
          {object.category}
        </div>
        <div className="absolute bottom-2 left-2 flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${getHabitabilityColor(object.habitability_score)}`}></div>
          <span className="text-xs bg-black bg-opacity-70 rounded px-2 py-1">
            Habitability: {object.habitability_score.toFixed(1)}/10
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-white">{object.object_name}</h3>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center text-gray-300">
            <Ruler className="w-4 h-4 mr-2 text-blue-400" />
            <span className="text-sm">{object.distance_light_years.toLocaleString()} ly</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Calendar className="w-4 h-4 mr-2 text-purple-400" />
            <span className="text-sm">{formatDate(object.discovery_date)}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Star className="w-4 h-4 mr-2 text-yellow-400" />
            <span className="text-sm">{object.in_solar_system === 'Y' ? 'Solar System' : 'Extrasolar'}</span>
          </div>
          {object.surface_temperature !== null && (
            <div className="flex items-center text-gray-300">
              <Thermometer className="w-4 h-4 mr-2 text-red-400" />
              <span className="text-sm">{object.surface_temperature}°C</span>
            </div>
          )}
        </div>
        
        <button 
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-center w-full py-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          {expanded ? (
            <>
              <span>Show less</span>
              <ChevronUp className="w-4 h-4 ml-1" />
            </>
          ) : (
            <>
              <span>Show more</span>
              <ChevronDown className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
        
        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-800 space-y-4">
            {object.gravity !== null && (
              <div className="flex items-start">
                <Wind className="w-5 h-5 mr-3 text-teal-400 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-gray-300">Gravity</h4>
                  <p className="text-sm text-gray-400">{object.gravity} m/s²</p>
                </div>
              </div>
            )}
            
            <div className="flex items-start">
              <Droplets className="w-5 h-5 mr-3 text-blue-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-gray-300">Atmosphere</h4>
                <p className="text-sm text-gray-400">{getAtmosphereComposition()}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-5 h-5 mr-3 flex items-center justify-center text-orange-400 mt-0.5">
                <span className="text-lg">⦿</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-300">Composition</h4>
                <p className="text-sm text-gray-400">{getComposition()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
