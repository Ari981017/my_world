export interface TravelInfo {
  visitDate?: string;        // Es: "Estate 2025", "Gennaio 2024"
  visitDuration?: string;    // Es: "1 settimana", "3 giorni"
  description: string;       // Descrizione del viaggio in italiano
  highlights?: string[];     // Momenti/esperienze memorabili
  tripType?: string;         // Es: "Vacanza", "Viaggio on the road"
}

export interface WorkInfo {
  company: string;
  jobTitle: string;
  period: {
    start: string;
    end: string | "present";
  };
  technologies: string[];
  description: string;
  responsibilities: string[];
}

export interface Experience {
  id: string;
  location: {
    name: string;
    coordinates: {
      lat: number;
      lon: number;
    };
  };
  countryCode: string; // ISO 3166-1 alpha-2 country code (e.g., "IT", "GB", "US")
  viaggio: TravelInfo;
  lavoro: WorkInfo;
}
