export interface Location {
  id: string;
  state: string;
  city: string;
  latitude: number;
  longitude: number;
  nonprofits: NonProfit[];
}

export interface NonProfit {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  partneredBusinesses: Business[];
}

export interface Business {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  partnerNonProfit: NonProfit;
}