export interface ChonogramI {
  id: 1 | 2 | 3;
  date: string;
  to: string;
  to2?: string;
  isOpen: boolean;
  description: string;
}

export const chonogram: ChonogramI[] = [
  {
    id: 1,
    date: "Viernes 30 de agosto",
    to: "De 8:30 a 12:40hs",
    to2: "De 15:15 a 19hs",
    isOpen: false,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores obcaecati illo debitis totam, architecto dolore officia adipisci vel, numquam facere quam distinctio tempora, asperiores quos nostrum eaque aperiam ipsum harum? Aliquid harum vitae a velit aspernatur modi eius minima eum laboriosam consequatur quis animi impedit at ut architecto, maiores sequi ad iusto nostrum mollitia, reiciendis autem. Quibusdam modi eum nostrum.",
  },
  {
    id: 2,
    date: "Sábado 31 de agosto",
    to: "De 8:30 a 12:40hs",
    to2: "De 15:15 a 19hs",
    isOpen: false,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores obcaecati illo debitis totam, architecto dolore officia adipisci vel, numquam facere quam distinctio tempora, asperiores quos nostrum eaque aperiam ipsum harum? Aliquid harum vitae a velit aspernatur modi eius minima eum laboriosam consequatur quis animi impedit at ut architecto, maiores sequi ad iusto nostrum mollitia, reiciendis autem. Quibusdam modi eum nostrum.",
  },
  {
    id: 3,
    date: "Domingo 1 de septiembre",
    to: "De 8:30 a 12:40hs",
    isOpen: false,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores obcaecati illo debitis totam, architecto dolore officia adipisci vel, numquam facere quam distinctio tempora, asperiores quos nostrum eaque aperiam ipsum harum? Aliquid harum vitae a velit aspernatur modi eius minima eum laboriosam consequatur quis animi impedit at ut architecto, maiores sequi ad iusto nostrum mollitia, reiciendis autem. Quibusdam modi eum nostrum.",
  },
];
