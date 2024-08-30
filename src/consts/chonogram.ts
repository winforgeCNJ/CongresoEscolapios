export type ModalTalleres = {
  title: string;
  content: { title: string; description: string[] }[];
} | null;

export interface ChonogramI {
  id: 1 | 2 | 3;
  hostImg: string;
  date: string;
  to: string;
  to2?: string;
  isOpen: boolean;
  morningDescription: {
    title: string;
    coursesHours: string[];
  };
  afternoonDescription?: {
    title: string;
    coursesHours: (string | ModalTalleres)[];
  };
}

export const chonogram: ChonogramI[] = [
  {
    id: 1,
    hostImg: "/assets/chonogram/catherine.webp",
    date: "Viernes 30 de agosto",
    to: "De 7:00 a 13:30hs",
    to2: "De 15:15 a 20hs",
    isOpen: false,
    morningDescription: {
      title: "Mañana",
      coursesHours: [
        "7:00 Recepción y acreditaciones",
        "8:30 Apertura y presentación",
        "9:00 Dr. Carlos Torrendell - La dinámica de la política educativa en Argentina",
        "9:30 Dr. Horacio Ferreyra - La escuela posible: políticas, cultura y prácticas",
        "10:00 Dra. Catherine L'Ecuyer - De dónde vienen y a dónde van los métodos educativos que están en nuestras aulas",
        "10:45 Preguntas",
        "11:00 Pausa",
        "11:30 Dra. Paola Scarinci de Delbosco - Lo útil de lo “inútil”: cómo los estudios humanísticos abren la mente. ",
        "12:15 Entrega de placa",
        "12:30 Santa Misa",
        "13:30 Almuerzo/Pausa",
      ],
    },
    afternoonDescription: {
      title: "Tarde",
      coursesHours: [
        {
          title: "15:15 Talleres",
          content: [
            {
              title: "PASTORAL Y TEOLOGÍA",
              description: [
                "Hno. Diego Correa y Juan Carlos Scoppa - Aprendizaje en servicio como herramienta educativa y de evangelización (Experiencia)",
                "Madre Melisa, SP - La Oración continua en la tradición escolapia",
              ],
            },
            {
              title: "PEDAGOGÍA Y DIDÁCTICA",
              description: [
                "Alejandro Juy G. Armando - Seminario Socrático: innovar en una propuesta humanista (experiencia)",
                "P.G. Serpez Sch.P. y P.Matías Pavón Sch.P. - La educación humanista y occidente: Proyecto de Humanidades",
              ],
            },
            {
              title: "HUMANISMO Y ARTE",
              description: [
                "P. Marcelo Benítez - Literatura y Fe en Charles Peguy (Ponencia)",
                "Dr. Félix Lamas(h) - El camino del héroe en la literatura (Taller/Ponencia)",
              ],
            },
            {
              title: "GESTIÓN EDUCATIVA Y ORGANIZACIÓN",
              description: [
                "Lic. Inés Frank - El cuidado de las personas en la escuela católica (ponencia)",
                "Leandro Maximino - La libertad de enseñanza, condición y requisito para la educación católica",
              ],
            },
          ],
        },
        "16:15 Pausa",
        "16:30 Jorge O'Reilly - Bolsillos de cristiandad: asistencia a las familias para una educación integral",
        "17:15 Dra. Catherine L'Ecuyer - ¿Cómo educar la atención en un mundo con más pantallas que ventanas?",
        "18:15 Pausa",
        {
          title: "18:30 Talleres",
          content: [
            {
              title: "PASTORAL Y TEOLOGÍA",
              description: [
                "Florencia Schneider, Marina Fasano y Sebastián Plá - Forja del carácter moral(Experiencia)",
                "Patricio Videla, Denise Tagliaferro y Hno. Martín Vélez - La educación sexual integral en las Escuelas Católicas: peeavas",
              ],
            },
            {
              title: "PEDAGOGÍA Y DIDÁCTICA",
              description: [
                "Candelaria Luque y Hernán Ojeda - El Inglés como estrategia de formación humanista y cristiana (experiencia)",
                "Agustín Suárez y Benjamín D'Amario - Evangelización del currículum e integración de ámbitos de estudio (Experiencia)",
              ],
            },
            {
              title: "HUMANISMO Y ARTE",
              description: [
                "Leonardo Caviglia - El misterio del hombre en la obra de C.S. Lewis (Ponencia)",
                "Jeremías Carrió, Betsabé Gómez y Néstor Luján - Castellani | Marechal | Hugo Wast: conversatorio",
              ],
            },
            {
              title: "GESTIÓN EDUCATIVA Y ORGANIZACIÓN",
              description: [
                "P. Guillermo Serpez y P. Matías Pavón - Estrategias e instrumentos para la gestión humanista de la escuela (Experiencia)",
                "Natalí Suárez y Marisol Gutierrez - Los hogares de día ¿educación no formal humanista?",
              ],
            },
          ],
        },
        "20:00 Cierre",
      ],
    },
  },
  {
    id: 2,
    hostImg: "/assets/chonogram/carlos-torrendell.webp",
    date: "Sábado 31 de agosto",
    to: "De 8:00 a 13:30hs",
    to2: "De 15:30 a 20hs",
    isOpen: false,
    morningDescription: {
      title: "Mañana",
      coursesHours: [
        "8:00 Oración abierta con la comunidad religiosa en la iglesia del colegio",
        "8:30 Recepción y oración",
        "8:45 Dr. Daniel Lasa - Vigencia de la educación humanista",
        "9:30 Dra. Catherine L'Ecuyer - La libertad educativa",
        "10:15 Pausa",
        "10:30 Carlos Hoevel - ¿Es posible recrear hoy la idea clásica de la Universidad? Diálogo con J.H. Newman",
        "11:00 Dr. Ramón Cornavaca,  Dr. Pedro Villagra y Dr. Cavallero: Conversatorio sobre Paideia Griega y Educación en los Padres de la Iglesia",
        "11:45 Pausa",
        "12:00 Dra. Graciela Hernández - Las artes liberales y las humanidades",
        "12:30 Santa Misa",
        "13:30 Almuerzo/Pausa",
      ],
    },
    afternoonDescription: {
      title: "Tarde",
      coursesHours: [
        {
          title: "15:30 Talleres",
          content: [
            {
              title: "PASTORAL Y TEOLOGÍA",
              description: [
                "Denise Tagliaferro y Susana Pérez - La atención pastoral y formación de las familias que se acercan a la propuesta escolar",
                "María Isabel y Gutierrez Teran - Faustino Miguez, una propuesta de felicidad",
              ],
            },
            {
              title: "PEDAGOGÍA Y DIDÁCTICA",
              description: [
                "Gisela Petrocelli, Belén Bruhn y Marina Fassano - El trivium como diseño innovador para la educación básica",
                "Ignacio López - La educación diferenciada en la propuesta humanista",
              ],
            },
            {
              title: "HUMANISMO Y ARTE",
              description: [
                "Benjamín D´Amario y Ricardo Raspanti - El humanismo, El principito y Pinocho",
                "Alejandro Frigolé - La formación humana a través de la literatura en la obra J.R.R. Tolkien. ",
              ],
            },
            {
              title: "GESTIÓN EDUCATIVA Y ORGANIZACIÓN",
              description: [
                "P. Mariano Bozini Sch.P y P. Andrés Krivanosof Sch.P. - Propuesta de formación continua docente en la identidad católica fecunda",
                "P. Sergio Conci Sch.P. - ¿Qué hace a una escuela católica?",
              ],
            },
          ],
        },
        "17:00 Pausa",
        {
          title: "17:30 Talleres",
          content: [
            {
              title: "PASTORAL Y TEOLOGÍA ",
              description: [
                "P. Andrés Rodríguez Sch.P. y Patricia Pérez - La formación catequística y el proceso pastoral",
                "P. Federico Bizzari Sch.P. - El proceso de la pastoral infantil y juvenil integrado en el planteo curricular de la escuela católica",
                "Carlos Galmarini, Cecilia Scarafia y Patricio Videla - Conversatorio sobre la relación entre familia y escuela",
              ],
            },
            {
              title: "PEDAGOGÍA Y DIDÁCTICA",
              description: [
                "P. Sergio Conci Sch.P. y Graciela Hernández de Lamas - El cuadrivium como una propuesta arriesgada y posible",
                "María  de Olmos, Laura Montini y Claudia Juy - Una propuesta integral y de tradición humanista para el nivel inicial ",
              ],
            },
            {
              title: "HUMANISMO Y ARTE",
              description: [
                "P. Gonzalo Sch.P., P. Mariano Sch.P. y Hno. Santiago Catalán - Taller de Caligrafía",
              ],
            },
            {
              title: "GESTIÓN EDUCATIVA Y ORGANIZACIÓN",
              description: [
                "P. Joaquín Spina Sch.P. - Formación de líderes en la tradición humanista ",
              ],
            },
          ],
        },
        "18:45 Pausa",
        "19:00 P. Marcelo Benítez Sch.P. -  John Senior y la restauración de las Humanidades",
        "20:00 Cierre",
      ],
    },
  },
  {
    id: 3,
    hostImg: "/assets/chonogram/paola-delbosco.webp",
    date: "Domingo 1 de septiembre",
    to: "De 8:00 a 12:40hs",
    isOpen: false,
    morningDescription: {
      title: "Mañana",
      coursesHours: [
        "8:00 Oración abierta con la comunidad religiosa en la iglesia del colegio",
        "8:30 Recepción y oración",
        "8:45 Dr. Rubén Peretó Rivas-Dr. Hugo Costarelli Brandi- Ceferino Muñoz Medina - Amistad y educación",
        "9:30 Preguntas",
        "9:45 P. Andrés de Cristo Sch.P. - Cristo maestro ",
        "10:15 Lic. Virginia Montini. - The Paideia Proposal",
        "10:45 Pausa",
        "11:00 Seminario Socrático en exposición",
        "11:45 Palabras de cierre",
        "12:15 Ensamble Coral",
        "12:40 Santa Misa",
      ],
    },
    afternoonDescription: undefined,
  },
];
