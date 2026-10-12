interface MenuItem {
  id: number;
  title: string;
  class_name?: string;
  link: string;
  has_dropdown: boolean;
  sub_menus?: {
    link: string;
    title: string;
  }[];
  menu_column?: {
    id: number;
    mega_title: string;
    mega_menus: {
      link: string;
      title: string;
    }[];
  }[];
}
[];

const menu_data: MenuItem[] = [
  {
    id: 1,
    has_dropdown: false,
    title: 'Inicio',
    link: '/',
  },
  {
    id: 2,
    has_dropdown: true,
    title: 'Propiedades',
    link: '#',
    sub_menus: [
      {link: '/listing_05', title: 'Listado'},
      {link: '/listing_14', title: 'Mapa'},
    ],
  },
  // {
  //   id: 3,
  //   has_dropdown: true,
  //   title: 'Páginas',
  //   class_name: 'mega-dropdown-sm',
  //   link: '#',
  //   menu_column: [
  //     {
  //       id: 1,
  //       mega_title: 'Esenciales',
  //       mega_menus: [
  //         {link: '/about_us_03', title: 'Sobre nosotros'},
  //         {link: '/agency', title: 'Agencia'},
  //         {link: '/agency_details', title: 'Detalles de la Agencia'},
  //         {link: '/agent', title: 'Agente'},
  //         {link: '/agent_details', title: 'Detalles del Agente'},
  //       ],
  //     },
  //     {
  //       id: 2,
  //       mega_title: 'Características',
  //       mega_menus: [
  //         {link: '/project_04', title: 'Proyecto -4'},
  //         {link: '/project_details_01', title: 'Detalles del Proyecto'},
  //         {link: '/service_01', title: 'Servicio -1'},
  //         {link: '/service_02', title: 'Servicio -2'},
  //         {link: '/service_details', title: 'Detalles del Servicio'},
  //       ],
  //     },
  //     {
  //       id: 3,
  //       mega_title: 'Otros',
  //       mega_menus: [
  //         {link: '/compare', title: 'Comparar Propiedades'},
  //         {link: '/pricing_01', title: 'Precios -1'},
  //         {link: '/pricing_02', title: 'Precios -2'},
  //         {link: '/contact', title: 'Contáctenos'},
  //         {link: '/faq', title: 'Preguntas Frecuentes'},
  //         {link: '/not-found', title: '404-Error'},
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 4,
  //   has_dropdown: true,
  //   title: 'Obras y Proyectos',
  //   link: '#',
  //   sub_menus: [
  //     {link: '/project_04', title: 'Proyectos'},
  //     {link: '/project_04', title: 'Obras'},
  //   ],
  // },
  {
    id: 5,
    // Was a dropdown whose two entries pointed at the same page (/blog_details has no content of its own),
    // and a relative href ('blog_01') that broke from any nested URL.
    has_dropdown: false,
    title: 'Noticias',
    link: '/blog_01',
  },
  {
    id: 6,
    has_dropdown: false,
    title: 'Nosotros',
    link: '/about_us_03',
  },
  {
    id: 7,
    has_dropdown: false,
    title: 'Contacto',
    link: '/contact',
  },
];
export default menu_data;
