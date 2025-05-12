export interface Exercise {
    id: string;
    title: string;
    description: string;         
    fullDescription: string;
    category: 'ira' | 'estrés' | 'tristeza' | 'ansiedad' | 'felicidad';
    image?: any;
    gif?: any;
  }
  