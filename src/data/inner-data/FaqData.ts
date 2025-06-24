interface DataType {
  id: number;
  id_name: string;
  title: string;
  md_pt?: boolean;
  faq: {
    id: number;
    question: string;
    answer: string;
  }[];
}

const inner_faq_data: DataType[] = [
  {
    id: 1,
    id_name: 'Venta',
    title: 'VENTA',
    md_pt: true,
    faq: [
      {
        id: 1,
        question: '¿Cómo funciona la prueba gratuita?',
        answer: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      },
      {
        id: 2,
        question: '¿Cómo ponderan diferentes criterios en su proceso?',
        answer: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      },
      {
        id: 3,
        question: '¿Cuál es el proceso de venta de una propiedad?',
        answer: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      },
      {
        id: 4,
        question: 'Reembolsos y fraudes',
        answer: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      },
    ],
  },
  {
    id: 2,
    id_name: 'Alquiler',
    title: 'ALQUILER',
    faq: [
      {
        id: 5,
        question: '¿Puede una vivienda depreciarse en valor?',
        answer: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      },
      {
        id: 6,
        question: '¿Una vivienda antigua tiene el mismo valor que una nueva?',
        answer: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      },
      {
        id: 7,
        question: '¿Qué es un corredor?',
        answer: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      },
      {
        id: 8,
        question: '¿Puedo pagar mis propios impuestos y seguro?',
        answer: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      },
    ],
  },
  {
    id: 3,
    id_name: 'Compra',
    title: 'COMPRA',
    faq: [
      {
        id: 9,
        question: '¿Cómo funciona la prueba gratuita?',
        answer: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      },
      {
        id: 10,
        question: '¿Cómo ponderan diferentes criterios en su proceso?',
        answer: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      },
      {
        id: 11,
        question: 'Reembolsos y fraudes',
        answer: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      },
    ],
  },
  {
    id: 4,
    id_name: 'Pagos',
    title: 'PAGOS',
    faq: [
      {
        id: 12,
        question: '¿Qué método de pago está soportado?',
        answer: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      },
      {
        id: 13,
        question: '¿Mi tarjeta es segura aquí?',
        answer: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      },
      {
        id: 14,
        question: '¿Puedo entregar un cheque a mi cliente para el pago?',
        answer: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      },
    ],
  },
  {
    id: 5,
    id_name: 'Terms',
    title: 'TÉRMINOS Y CONDICIONES',
    faq: [
      {
        id: 15,
        question: '¿Cómo funciona la prueba gratuita?',
        answer: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      },
      {
        id: 16,
        question: '¿Cómo ponderan diferentes criterios en su proceso?',
        answer: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      },
    ],
  },
  {
    id: 6,
    id_name: 'Account',
    title: 'CUENTA',
    faq: [
      {
        id: 17,
        question: '¿Puede una vivienda depreciarse en valor?',
        answer: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      },
      {
        id: 18,
        question: '¿Una vivienda antigua tiene el mismo valor que una nueva?',
        answer: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      },
    ],
  },
];

export default inner_faq_data;
