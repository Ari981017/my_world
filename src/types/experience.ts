export interface Experience {
  id: string;
  location: {
    name: string;
    coordinates: {
      lat: number;
      lon: number;
    };
  };
  company: string;
  jobTitle: string;
  period: {
    start: string;
    end: string | "present";
  };
  technologies: string[];
  description: string;
  responsibilities: string[];
  countryCode: string; // ISO 3166-1 alpha-2 country code (e.g., "IT", "GB", "US")
}
