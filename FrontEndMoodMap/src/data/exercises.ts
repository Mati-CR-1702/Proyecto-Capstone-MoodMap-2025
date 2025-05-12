import { Exercise } from '../types/exercise';

export const exercises: Exercise[] = [
  {
    id: '1',
    title: 'Respiración profunda',
    description: 'Respira profundamente durante 2 minutos.',
    fullDescription: 'Este ejercicio te ayuda a calmarte enfocando tu atención en la respiración lenta y controlada.',
    category: 'estrés', // 🔽 minúscula
    image: null,
    gif: null,
  },
  {
    id: '2',
    title: 'Escritura emocional',
    description: 'Escribe lo que sientes durante 5 minutos.',
    fullDescription: 'Este ejercicio permite liberar emociones acumuladas mediante la escritura.',
    category: 'ira', // 🔽 minúscula
    image: null,
    gif: null,
  }
];