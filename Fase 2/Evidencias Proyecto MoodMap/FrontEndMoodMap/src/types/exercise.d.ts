export interface Exercise {
    id: string;
    title: string;
    description: string;         // ✅ Esta es la correcta
    fullDescription: string;
    category: 'ira' | 'estrés' | 'tristeza' | 'ansiedad' ;
    image?: any;
    gif?: any;
  }
  