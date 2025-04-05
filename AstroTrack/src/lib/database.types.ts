export interface CelestialObject {
    object_id: number;
    object_name: string;
    category: string;
    distance_light_years: number;
    discovery_date: string | null;
    in_solar_system: string;
    habitability_score: number;
    surface_temperature: number | null;
    gravity: number | null;
    nitrogen: string;
    oxygen: string;
    co2: string;
    sulfuric_acid: string;
    hydrogen: string;
    helium: string;
    methane: string;
    water_vapor: string;
    silicates: string;
    iron: string;
    nickel: string;
    image_url: string | null;
  }
  
  export interface Event {
    event_id: number;
    event_name: string;
    event_type: string;
    event_date: string;
    visibility_score: number;
    impact_on_habitability: string;
    estimated_duration_days: number;
  }
  
  export interface Telescope {
    telescope_id: number;
    telescope_name: string;
    location: string;
    type: string;
    aperture_size: number;
    observation_range_ly: number | null;
    optical: string;
    infrared: string;
    ultraviolet: string;
  }
  
  export interface Researcher {
    researcher_id: number;
    researcher_name: string;
    contact_email: string | null;
    phone_number: string | null;
    affiliation_id: number;
  }
  
  export interface ResearchPaper {
    paper_id: number;
    title: string;
    publication_date: string | null;
    focus_area: string;
    journal: string;
    doi: string | null;
    paper_score: number;
    researcher_id: number | null;
  }
  
  export interface HabitablePlanet {
    object_id: number;
    event_id: number;
    research_id: number;
    is_habitable: string;
    habitability_reason: string;
    recommended_population: number | null;
    last_evaluated: string;
  }
  