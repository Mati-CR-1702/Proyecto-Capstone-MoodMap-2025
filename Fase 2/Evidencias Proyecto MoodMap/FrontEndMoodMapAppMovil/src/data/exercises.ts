//C:\Moodmap\src\data\exercises.ts
import { Exercise } from '../types/exercise';

export const exercises: Exercise[] = [
  {
    id: '1',
    title: 'Respiración 4-7-8',
    description: 'Técnica de respiración para calmar la ansiedad al instante.',
    fullDescription: 'Inhala profundamente por 4 segundos, mantén la respiración por 7 segundos y exhala completamente durante 8 segundos. Repite este ciclo 3-4 veces para activar la respuesta de relajación del cuerpo y reducir el estrés agudo.',
    category: 'ansiedad',
    image: require('../../assets/Carrusel 4-5-7/Respiracion-logo.png'),
    gif: false,
    steps: [
      {
        step: 1,
        text: 'Inhala profundamente por 4 segundos',
        image: require('../../assets/Carrusel 4-5-7/Exhlar_aire.png'),
        timer: 0
      },
      {
        step: 2,
        text: 'Mantén la respiración por 7 segundos.',
        image: require('../../assets/Carrusel 4-5-7/Aguatar_el_Aire.png'),
        timer: 60
      },
      {
        step: 3,
        text: 'Exhala completamente durante 8 segundos.',
        image: require('../../assets/Carrusel 4-5-7/Inhalar_Aire.png'),
        timer: 0
      },
    ],
  },
  {
    id: '2',
    title: 'Escritura emocional',
    description: 'Libera emociones intensas mediante la escritura libre.',
    fullDescription: 'Durante 5-10 minutos, escribe sin filtro todo lo que sientes, sin preocuparte por gramática o coherencia. Este proceso ayuda a organizar pensamientos caóticos, reducir la rumiación mental y procesar emociones difíciles como la ira o la frustración.',
    category: 'ira',
    image: require('../../assets/Escritura_emocional/Escritura_emocional_Logo.png'),
    gif: false,
    steps: [
      {
        step: 1,
        text: 'Durante 5-10 minutos, escribe sin filtro todo lo que sientes, sin preocuparte por gramática o coherencia.',
        image: require('../../assets/Escritura_emocional/Escritura_Emocional.png'),
        timer: 0
      },
    ],
  },
  {
    id: '3',
    title: 'Autoabrazo',
    description: 'Gesto físico de autocontención y seguridad emocional.',
    fullDescription: 'Cruza tus brazos sobre el pecho y aplica una presión suave pero firme durante 20-30 segundos mientras respiras profundamente. Este simple acto estimula la liberación de oxitocina, la hormona del bienestar, proporcionando consuelo en momentos de tristeza o soledad.',
    category: 'tristeza',
    image: require('../../assets/AutoAbrazo/AutoAbrazo_Logo.png'),
    gif: false,
    steps: [
      {
        step: 1,
        text: 'Cruza tus brazos sobre el pecho y aplica una presión suave pero firme durante 20-30 segundos mientras respiras profundamente.',
        image: require('../../assets/AutoAbrazo/Autoabrazo.png'),
        timer: 0
      },
    ],
  },
  {
    id: '4',
    title: 'Meditación guiada',
    description: 'Relajación guiada para reducir el estrés y mejorar el enfoque.',
    fullDescription: 'Escucha una grabación con instrucciones para enfocar la mente, generalmente combinando respiración consciente, visualizaciones positivas y relajación corporal progresiva. Ideal para principiantes que necesitan estructura en sus prácticas de mindfulness.',
    category: 'estrés',
    image: require('../../assets/Meditacion_Guiada/Meditacion_Guiada_Logo.png'),
    gif: false,
    steps: [
      {
        step: 1,
        text: 'Cruza tus brazos sobre el pecho y aplica una presión suave pero firme durante 20-30 segundos mientras respiras profundamente.',
        image: require('../../assets/Meditacion_Guiada/Meditacion_Guiada.png'),
        timer: 0
      },
    ],
  },
  {
    id: '5',
    title: 'Estiramiento suave',
    description: 'Libera tensión física acumulada por el estrés.',
    fullDescription: 'Realiza movimientos lentos y controlados para estirar cuello, hombros, espalda y extremidades. Mantén cada postura 15-20 segundos, sincronizando con tu respiración. Ayuda a mejorar la circulación y reducir la rigidez muscular asociada a la ansiedad.',
    category: 'estrés',
    image: require('../../assets/Estirameintos_Suaves/Estiramiento_Suabve_Logo.png'),
    gif: false,
    steps: [
      {
        step: 1,
        text: 'Realiza movimientos lentos y controlados para estirar cuello.',
        image: require('../../assets/Estirameintos_Suaves/Estiramiento_Suabve_2.png'),
        timer: 0
      },
      {
        step: 2,
        text: 'Realiza movimientos lentos y controlados para estirar extremidades',
        image: require('../../assets/Estirameintos_Suaves/Estiramientos_Suaves_1.png'),
        timer: 60
      },
    ],
  },
  {
    id: '6',
    title: 'Diálogo interno',
    description: 'Transforma tu narrativa mental con autocompasión.',
    fullDescription: 'Identifica pensamientos negativos ("No puedo hacer nada bien") y reemplázalos con afirmaciones realistas ("Estoy haciendo lo mejor que puedo"). Este ejercicio de reestructuración cognitiva ayuda a desarrollar una mentalidad más equilibrada y compasiva.',
    category: 'ansiedad',
    image: require('../../assets/Dialogo_interno/Dialogo_Interno_Logo.png'),
    gif: false,
        steps: [
      {
        step: 1,
        text: 'Cruza tus brazos sobre el pecho y aplica una presión suave pero firme durante 20-30 segundos mientras respiras profundamente.',
        image: require('../../assets/Dialogo_interno/Dialogo_Interno_2.png'),
        timer: 0
      },
    ],
  },
  {
    id: '7',
    title: 'Grito controlado',
    description: 'Liberación segura de emociones intensas acumuladas.',
    fullDescription: 'En un espacio privado (auto, habitación o usando una almohada), inspira profundamente y exhala con un grito fuerte. Repite 1-2 veces. Esta técnica permite descargar energía emocional reprimida de manera controlada, evitando la acumulación de ira.',
    category: 'ira',
    image: require('../../assets/Grito_Controlado/Grito_Controlado_Logo.png'),
    gif: false,
        steps: [
      {
        step: 1,
        text: 'Cruza tus brazos sobre el pecho y aplica una presión suave pero firme durante 20-30 segundos mientras respiras profundamente.',
        image: require('../../assets/Grito_Controlado/Grito_Controlado.png'),
        timer: 0
      },
    ],
  },
  {
    id: '8',
    title: 'Contar hacia atrás',
    description: 'Técnica de distracción cognitiva para crisis de ansiedad.',
    fullDescription: 'Elige un número alto (como 100) y comienza a contar hacia atrás restando 3 o 7 cada vez. Este ejercicio requiere suficiente concentración para interrumpir patrones de pensamiento catastróficos, dando tiempo al sistema nervioso para calmarse.',
    category: 'ansiedad',
    image: require('../../assets/Contar_hacia_atras/Contar_atras_Logo.png'),
    gif: false,
        steps: [
      {
        step: 1,
        text: 'Cruza tus brazos sobre el pecho y aplica una presión suave pero firme durante 20-30 segundos mientras respiras profundamente.',
        image: require('../../assets/Contar_hacia_atras/Contar_hacia_atras.png'),
        timer: 0
      },
    ],
  },
  {
    id: '9',
    title: 'Contacto con la naturaleza',
    description: 'Terapia natural para mejorar el estado de ánimo.',
    fullDescription: 'Pasa al menos 10-15 minutos en un entorno natural, observando detalles como el movimiento de las hojas, sonidos ambientales o texturas. Si no es posible salir, visualiza un paisaje tranquilo. Esta práctica reduce el cortisol (hormona del estrés) y promueve emociones positivas.',
    category: 'tristeza',
    image: require('../../assets/Contacto_Naturaleza/Contacto_Naturaleza_Logo.png'),
    gif: false,
        steps: [
      {
        step: 1,
        text: 'Cruza tus brazos sobre el pecho y aplica una presión suave pero firme durante 20-30 segundos mientras respiras profundamente.',
        image: require('../../assets/Contacto_Naturaleza/Contacto_Naturaleza.png'),
        timer: 0
      },
    ],
  },
  {
    id: '10',
    title: 'Afirmaciones positivas',
    description: 'Refuerza tu autoestima con mensajes constructivos.',
    fullDescription: 'Selecciona frases significativas ("Merezco amor y respeto", "Soy capaz de superar desafíos") y repítelas en voz alta o por escrito 3-5 veces al día. Mejor si se hace frente al espejo. Esta práctica ayuda a contrarrestar creencias negativas arraigadas.',
    category: 'tristeza',
    image: require('../../assets/Afirmaciones_Positivas/Afirmaciones_Positivas_Logo.png'),
    gif: false,
        steps: [
      {
        step: 1,
        text: 'Cruza tus brazos sobre el pecho y aplica una presión suave pero firme durante 20-30 segundos mientras respiras profundamente.',
        image: require('../../assets/Afirmaciones_Positivas/Afirmacion_Positiva.png'),
        timer: 0
      },
    ],
  },
  {
    id: '11',
    title: 'Mindfulness',
    description: 'Práctica de atención plena al momento presente.',
    fullDescription: 'Durante 5-10 minutos, enfócate en un ancla (respiración, sonidos o sensaciones corporales) sin juzgar. Cuando notes que tu mente divaga, redirige suavemente la atención. Este entrenamiento mental reduce la rumiación sobre el pasado o futuro, disminuyendo la ansiedad.',
    category: 'ansiedad',
    image: require('../../assets/MindFulness/Mindfulness_Logo.png'),
    gif: false,
        steps: [
      {
        step: 1,
        text: 'Cruza tus brazos sobre el pecho y aplica una presión suave pero firme durante 20-30 segundos mientras respiras profundamente.',
        image: require('../../assets/MindFulness/Mindfulness.png'),
        timer: 0
      },
    ],
  },
];