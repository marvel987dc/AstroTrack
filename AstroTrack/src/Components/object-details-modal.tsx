'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import supabase from '../lib/supabase';
import { CelestialObject, Event, ResearchPaper } from '../lib/database.types';
import { X, Calendar, FileText, AlertTriangle } from 'lucide-react';

interface ObjectDetailsModalProps {
  objectId: number;
  onClose: () => void;
}

export default function ObjectDetailsModal({ objectId, onClose }: ObjectDetailsModalProps) {
  const [object, setObject] = useState<CelestialObject | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchObjectDetails() {
      try {
        setLoading(true);
        
        // Fetch celestial object
        const { data: objectData, error: objectError } = await supabase
          .from('celestial_objects')
          .select('*')
          .eq('object_id', objectId)
          .single();
          
        if (objectError) throw objectError;
        setObject(objectData);
        
        // Fetch related events through habitable_planets
        const { data: eventsData, error: eventsError } = await supabase
          .from('habitable_planets')
          .select(`
            events:event_id(*)
          `)
          .eq('object_id', objectId);
          
        if (eventsError) throw eventsError;
        
        // Extract events from the nested structure
        const extractedEvents = eventsData
          .map(item => item.events)
          .filter(Boolean);
          
        setEvents(extractedEvents);
        
        // Fetch related research papers through habitable_planets
        const { data: papersData, error: papersError } = await supabase
          .from('habitable_planets')
          .select(`
            research_papers:research_id(*)
          `)
          .eq('object_id', objectId);
          
        if (papersError) throw papersError;
        
        // Extract papers from the nested structure
        const extractedPapers = papersData
          .map(item => item.research_papers)
          .filter(Boolean);
          
        setPapers(extractedPapers);
        
      } catch (error) {
        console.error('Error fetching object details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchObjectDetails();
  }, [objectId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!object) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">{object.object_name}</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-800 transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img 
                src={object.image_url || '/placeholder.svg?height=400&width=400'} 
                alt={object.object_name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-300">Overview</h3>
                <p className="text-gray-400">
                  {object.object_name} is a {object.category.toLowerCase()} located 
                  {object.distance_light_years > 0 ? ` ${object.distance_light_years.toLocaleString()} light years from Earth` : ' in our Solar System'}.
                  {object.in_solar_system === 'Y' ? ' It is part of our Solar System.' : ''}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-300">Habitability</h3>
                <div className="flex items-center mt-2">
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" 
                      style={{ width: `${object.habitability_score * 10}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-white font-medium">{object.habitability_score.toFixed(1)}/10</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Surface Temperature</h4>
                  <p className="text-white">{object.surface_temperature !== null ? `${object.surface_temperature}°C` : 'Unknown'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Gravity</h4>
                  <p className="text-white">{object.gravity !== null ? `${object.gravity} m/s²` : 'Unknown'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Discovery Date</h4>
                  <p className="text-white">{object.discovery_date ? new Date(object.discovery_date).toLocaleDateString() : 'Unknown'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Location</h4>
                  <p className="text-white">{object.in_solar_system === 'Y' ? 'Solar System' : 'Extrasolar'}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Atmospheric Composition</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                { name: 'Nitrogen', value: object.nitrogen },
                { name: 'Oxygen', value: object.oxygen },
                { name: 'Carbon Dioxide', value: object.co2 },
                { name: 'Hydrogen', value: object.hydrogen },
                { name: 'Helium', value: object.helium },
                { name: 'Methane', value: object.methane },
                { name: 'Water Vapor', value: object.water_vapor },
                { name: 'Sulfuric Acid', value: object.sulfuric_acid }
              ].map((element) => (
                <div 
                  key={element.name}
                  className={`p-3 rounded-lg border ${
                    element.value === 'Y' 
                      ? 'border-green-500 bg-green-500 bg-opacity-10' 
                      : 'border-gray-700 bg-gray-800 bg-opacity-30'
                  }`}
                >
                  <div className="flex items-center">
                    <div 
                      className={`w-3 h-3 rounded-full mr-2 ${
                        element.value === 'Y' ? 'bg-green-500' : 'bg-gray-600'
                      }`}
                    ></div>
                    <span className={element.value === 'Y' ? 'text-green-400' : 'text-gray-400'}>
                      {element.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {events.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-4">Related Events</h3>
              <div className="space-y-3">
                {events.map((event) => (
                  <div key={event.event_id} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 text-purple-400 mt-1 mr-3" />
                      <div>
                        <h4 className="text-white font-medium">{event.event_name}</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="px-2 py-1 bg-purple-900 bg-opacity-50 text-purple-300 text-xs rounded-full">
                            {event.event_type}
                          </span>
                          <span className="px-2 py-1 bg-blue-900 bg-opacity-50 text-blue-300 text-xs rounded-full">
                            {new Date(event.event_date).toLocaleDateString()}
                          </span>
                          <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                            Impact: {event.impact_on_habitability}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {papers.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-4">Research Papers</h3>
              <div className="space-y-3">
                {papers.map((paper) => (
                  <div key={paper.paper_id} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-start">
                      <FileText className="w-5 h-5 text-blue-400 mt-1 mr-3" />
                      <div>
                        <h4 className="text-white font-medium">{paper.title}</h4>
                        <p className="text-gray-400 text-sm mt-1">
                          Published in {paper.journal} 
                          {paper.publication_date && ` on ${new Date(paper.publication_date).toLocaleDateString()}`}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="px-2 py-1 bg-blue-900 bg-opacity-50 text-blue-300 text-xs rounded-full">
                            {paper.focus_area}
                          </span>
                          <span className="px-2 py-1 bg-green-900 bg-opacity-50 text-green-300 text-xs rounded-full">
                            Score: {paper.paper_score.toFixed(1)}/10
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
