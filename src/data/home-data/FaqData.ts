interface DataType {
  id: number;
  page: string;
  question: string;
  answer: string;
  showAnswer: boolean;
}

const faq_data: DataType[] = [
  {
    id: 1,
    page: 'home_2_faq_1',
    question: 'Advance Search',
    answer: 'It only takes 5 minutes. Set-up is smooth & simple, with fully customisable filter to the right one.',
    showAnswer: false,
  },
  {
    id: 2,
    page: 'home_2_faq_1',
    question: 'Exert Agents for any help',
    answer: 'It only takes 5 minutes. Set-up is smooth & simple, with fully customisable filter to the right one.',
    showAnswer: false,
  },
  {
    id: 3,
    page: 'home_2_faq_1',
    question: 'Protected pagos, every time',
    answer: 'It only takes 5 minutes. Set-up is smooth & simple, with fully customisable filter to the right one.',
    showAnswer: false,
  },

  // home_2_faq_2

  {
    id: 1,
    page: 'home_2_faq_2',
    question: 'How does the free trial work?',
    answer: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commo consequat. Duis aute in voluptate nulla pariatur.',
    showAnswer: false,
  },
  {
    id: 2,
    page: 'home_2_faq_2',
    question: 'How find different criteria in your process?',
    answer: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commo consequat. Duis aute in voluptate nulla pariatur.',
    showAnswer: false,
  },
  {
    id: 3,
    page: 'home_2_faq_2',
    question: 'What do you look for in a founding team?',
    answer: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commo consequat. Duis aute in voluptate nulla pariatur.',
    showAnswer: false,
  },
  {
    id: 4,
    page: 'home_2_faq_2',
    question: 'Do you recommend Pay as you go or Pre pay?',
    answer: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commo consequat. Duis aute in voluptate nulla pariatur.',
    showAnswer: false,
  },

  // home_six

  {
    id: 1,
    page: 'home_six',
    question: 'Quienes somos?',
    answer: 'Especialistas en Rawson y el Valle. Simplificamos tu inversión inmobiliaria con profundo conocimiento local, tecnología de vanguardia y compromiso total con tus resultados .',
    showAnswer: false,
  },
  {
    id: 2,
    page: 'home_six',
    question: 'Nuestros objetivos',
    answer: 'Simplificar procesos, construir relaciones de confianza y maximizar el valor de tu propiedad .',
    showAnswer: false,
  },
  {
    id: 3,
    page: 'home_six',
    question: 'Nuestra visión',
    answer: 'Ser la inmobiliaria líder del valle, redefiniendo la experiencia con tecnología y calidez .',
    showAnswer: false,
  },
];

export default faq_data;
