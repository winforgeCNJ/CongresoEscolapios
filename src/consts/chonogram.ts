export interface ChonogramI {
  id: 1 | 2 | 3;
  date: string;
  to: string;
  to2?: string;
}

export const chonogram: ChonogramI[] = [
  {
    id: 1,
    date: "Viernes 30 de agosto",
    to: "De 8:30 a 12:40hs",
    to2: "De 15:15 a 19hs",
  },
  {
    id: 2,
    date: "Sábado 31 de agosto",
    to: "De 8:30 a 12:40hs",
    to2: "De 15:15 a 19hs",
  },
  {
    id: 3,
    date: "Domingo 1 de septiembre",
    to: "De 8:30 a 12:40hs",
  },
];
