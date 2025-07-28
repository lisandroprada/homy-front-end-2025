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
    title: 'VENTAS',
    md_pt: true,
    faq: [
      {
        id: 1,
        question: '¿Qué necesito para vender mi propiedad?',
        answer:
          'Para vender tu propiedad, generalmente necesitarás la escritura de la misma, planos (si los hubiera), DNI de los titulares y, en algunos casos, libre deudas de servicios e impuestos. Nuestro equipo te guiará a través de la documentación específica requerida para tu caso.',
      },
      {
        id: 2,
        question: '¿Cuánto tiempo tarda el proceso de venta?',
        answer:
          'El tiempo de venta puede variar considerablemente dependiendo del tipo de propiedad, su ubicación, el precio y las condiciones del mercado actual. Trabajaremos para comercializar tu propiedad de manera efectiva y cerrar la operación en el menor tiempo posible.',
      },
      {
        id: 3,
        question: '¿Qué honorarios de venta se aplican?',
        answer:
          'Los honorarios por nuestros servicios de venta se pactan previamente y se calculan sobre el valor final de la operación. Te brindaremos toda la información detallada durante nuestra primera consulta.',
      },
      {
        id: 4,
        question: 'Ventajas de trabajar con corredores inmobiliarios matriculados',
        answer:
          'Trabajar con un corredor inmobiliario matriculado te brinda seguridad, profesionalismo y eficiencia en tus operaciones. Conocen las leyes y regulaciones, poseen experiencia en el mercado, operan bajo un código de ética profesional y te asesoran integralmente en cada etapa del proceso. Además, cuentan con una red de contactos y gestionan toda la documentación necesaria, ahorrándote tiempo y estrés.',
      },
      {
        id: 5,
        question: '¿Qué hace una inmobiliaria?',
        answer:
          'Una inmobiliaria facilita y gestiona todo tipo de operaciones inmobiliarias: conecta compradores y vendedores, administra alquileres, realiza tasaciones, asesora legal y fiscalmente, promociona propiedades, gestiona documentación y negocia acuerdos. También ofrece administración integral de inmuebles y resuelve inconvenientes, actuando como un socio estratégico para sus clientes.',
      },
    ],
  },
  {
    id: 2,
    id_name: 'Alquiler',
    title: 'ALQUILERES',
    faq: [
      {
        id: 6,
        question: '¿Qué requisitos se solicitan para alquilar una propiedad?',
        answer:
          'Los requisitos más comunes incluyen la presentación de garantías (por ejemplo, garantía propietaria o seguro de caución), demostración de ingresos suficientes y una verificación de antecedentes. Te asesoraremos sobre la documentación precisa.',
      },
      {
        id: 7,
        question: '¿Quién se encarga del mantenimiento de la propiedad alquilada?',
        answer:
          'Generalmente, el inquilino es responsable del mantenimiento menor y los daños causados por el uso indebido, mientras que el propietario se encarga de las reparaciones estructurales y de las instalaciones principales. Todo esto se detalla en el contrato de alquiler.',
      },
      {
        id: 8,
        question: '¿Qué diferencia hay entre un alquiler residencial y uno comercial?',
        answer:
          'Los alquileres residenciales están destinados a viviendas, mientras que los comerciales son para locales, oficinas o depósitos. Las regulaciones y condiciones de cada tipo de contrato varían.',
      },
    ],
  },

  {
    id: 3,
    id_name: 'AdministracionAlquileres',
    title: 'ADMINISTRACIÓN DE ALQUILERES',
    faq: [
      {
        id: 9,
        question: '¿Qué servicios incluye la administración de alquileres?',
        answer:
          'Nuestros servicios de administración incluyen la búsqueda y selección de inquilinos, cobro de alquileres y expensas, gestión de contratos, seguimiento de pagos, resolución de inconvenientes y coordinación de reparaciones, entre otros.',
      },
      {
        id: 10,
        question: '¿Cómo se gestionan los pagos y los depósitos?',
        answer:
          'Nos encargamos de la cobranza mensual del alquiler y de las expensas, depositando el monto correspondiente al propietario en la fecha acordada. Los depósitos en garantía se administran según la normativa vigente.',
      },
      {
        id: 11,
        question: '¿Qué sucede si hay problemas con el inquilino?',
        answer:
          'En caso de inconvenientes con el inquilino, actuamos como intermediarios para buscar una solución. En situaciones más complejas, brindamos asesoramiento legal y acompañamiento en los procedimientos necesarios.',
      },
    ],
  },

  {
    id: 4,
    id_name: 'Compra',
    title: 'COMPRAS',
    faq: [
      {
        id: 12,
        question: '¿Qué aspectos debo considerar al comprar una propiedad?',
        answer:
          'Al comprar, es fundamental considerar la ubicación, el estado de la propiedad, el presupuesto, las posibles reformas, la orientación, los servicios y la documentación legal. Te ayudaremos a evaluar todos estos puntos.',
      },
      {
        id: 13,
        question: '¿Necesito un abogado para comprar una propiedad?',
        answer:
          'Si bien la inmobiliaria te asesora en el proceso, la intervención de un escribano es obligatoria para la firma de la escritura traslativa de dominio, que es quien da fe pública del acto. Es recomendable contar con asesoramiento legal si tienes dudas específicas.',
      },
      {
        id: 14,
        question: '¿Cómo puedo financiar la compra de mi propiedad?',
        answer:
          'Existen diversas opciones de financiación, como créditos hipotecarios bancarios. Podemos orientarte sobre las opciones disponibles en el mercado y ayudarte con la documentación necesaria.',
      },
    ],
  },

  {
    id: 5,
    id_name: 'Tasaciones',
    title: 'TASACIONES',
    faq: [
      {
        id: 15,
        question: '¿Para qué sirve una tasación de propiedad?',
        answer:
          'Una tasación profesional te brinda el valor de mercado actual de tu propiedad. Es fundamental para fijar un precio de venta o alquiler justo, solicitar un crédito hipotecario o para fines sucesorios.',
      },
      {
        id: 16,
        question: '¿Qué factores se tienen en cuenta al tasar una propiedad?',
        answer:
          'Al tasar, consideramos la ubicación, antigüedad, estado de conservación, superficie cubierta y descubierta, distribución de los ambientes, materiales de construcción, servicios disponibles y las características del mercado inmobiliario de la zona.',
      },
      {
        id: 17,
        question: '¿Cuánto tiempo es válida una tasación?',
        answer:
          'El valor de una tasación puede variar con el tiempo debido a los cambios en el mercado inmobiliario. Por lo general, se recomienda una actualización si ha pasado un período considerable (por ejemplo, 6 meses a 1 año) desde la tasación inicial.',
      },
    ],
  },
];

export default inner_faq_data;
