interface DataType {
  id: number;
  page: string;
  widget_title: string;
  widget_class?: string;
  widget_class2?: string;
  footer_link: {
    link: string;
    link_title: string;
  }[];
}

const footer_data: DataType[] = [
  {
    id: 1,
    page: 'home_1',
    widget_class: 'xs-mt-50',
    widget_title: 'Enlaces',
    footer_link: [
      {link: '/', link_title: 'Inicio'},
      {link: '/dashboard/membership', link_title: 'Membresía'},
      {link: '/about_us_01', link_title: 'Sobre la empresa'},
      {link: '/blog_01', link_title: 'Noticias'},
      {link: '/blog_02', link_title: 'Explorar carreras'},
      {link: '/pricing_02', link_title: 'Precios'},
      {link: '/dashboard/dashboard-index', link_title: 'Panel'},
    ],
  },
  {
    id: 2,
    widget_class: 'xs-mt-30',
    page: 'home_1',
    widget_title: 'Legal',
    footer_link: [
      {link: '/faq', link_title: 'Términos y condiciones'},
      {link: '/faq', link_title: 'Cookies'},
      {link: '/faq', link_title: 'Política de privacidad'},
      {link: '/faq', link_title: 'Preguntas frecuentes'},
    ],
  },
  {
    id: 3,
    widget_class: 'xs-mt-30',
    page: 'home_1',
    widget_title: 'Nuevos anuncios',
    footer_link: [
      {link: '/listing_01', link_title: 'Comprar departamentos'},
      {link: '/listing_02', link_title: 'Comprar condominios'},
      {link: 'listing_03', link_title: 'Alquilar casas'},
      {link: 'listing_04', link_title: 'Alquilar industrial'},
      {link: '/listing_05', link_title: 'Comprar villas'},
      {link: '/listing_06', link_title: 'Alquilar oficina'},
    ],
  },

  // home two

  {
    id: 1,
    page: 'home_3',
    widget_title: 'Enlaces',
    footer_link: [
      {link: '/', link_title: 'Inicio'},
      {link: '/dashboard/membership', link_title: 'Membresía'},
      {link: '/about_us_01', link_title: 'Sobre la empresa'},
      {link: '/blog_01', link_title: 'Noticias'},
      {link: '/blog_02', link_title: 'Explorar carreras'},
      {link: '/pricing_02', link_title: 'Precios'},
      {link: '/dashboard/dashboard-index', link_title: 'Panel'},
    ],
  },
  {
    id: 2,
    widget_class: 'col-xxl-3 col-xl-4',
    page: 'home_3',
    widget_title: 'Legal',
    footer_link: [
      {link: '/faq', link_title: 'Términos y condiciones'},
      {link: '/faq', link_title: 'Cookies'},
      {link: '/faq', link_title: 'Política de privacidad'},
      {link: '/faq', link_title: 'Preguntas frecuentes'},
    ],
  },
  {
    id: 3,
    page: 'home_3',
    widget_title: 'Nuevos anuncios',
    footer_link: [
      {link: '/listing_01', link_title: 'Comprar departamentos'},
      {link: '/listing_02', link_title: 'Comprar condominios'},
      {link: 'listing_03', link_title: 'Alquilar casas'},
      {link: 'listing_04', link_title: 'Alquilar industrial'},
      {link: '/listing_05', link_title: 'Comprar villas'},
      {link: '/listing_06', link_title: 'Alquilar oficina'},
    ],
  },

  // home four

  {
    id: 1,
    page: 'home_4',
    widget_class: 'col-lg-2',
    widget_title: 'Enlaces',
    footer_link: [
      {link: '/', link_title: 'Inicio'},
      {link: '/dashboard/membership', link_title: 'Membresía'},
      {link: '/about_us_01', link_title: 'Sobre la empresa'},
      {link: '/blog_01', link_title: 'Noticias'},
    ],
  },
  {
    id: 2,
    widget_class: 'col-xl-2 col-lg-3',
    page: 'home_4',
    widget_title: 'Nuevos anuncios',
    footer_link: [
      {link: '/listing_01', link_title: 'Comprar departamentos'},
      {link: '/listing_02', link_title: 'Comprar condominios'},
      {link: 'listing_03', link_title: 'Alquilar casas'},
      {link: 'listing_04', link_title: 'Alquilar industrial'},
      {link: '/listing_05', link_title: 'Comprar villas'},
      {link: '/listing_06', link_title: 'Alquilar oficina'},
    ],
  },
  {
    id: 3,
    widget_class: 'col-xl-2 col-lg-3',
    page: 'home_4',
    widget_title: 'Legal',
    footer_link: [
      {link: '/faq', link_title: 'Términos y condiciones'},
      {link: '/faq', link_title: 'Cookies'},
      {link: '/faq', link_title: 'Política de privacidad'},
      {link: '/faq', link_title: 'Preguntas frecuentes'},
    ],
  },

  // home five

  {
    id: 1,
    page: 'home_5',
    widget_class: 'col-lg-3 ms-auto',
    widget_class2: 'ps-xl-5',
    widget_title: 'Enlaces',
    footer_link: [
      {link: '/', link_title: 'Inicio'},
      {link: '/dashboard/membership', link_title: 'Membresía'},
      {link: '/about_us_01', link_title: 'Sobre la empresa'},
      {link: '/blog_01', link_title: 'Noticias'},
      {link: '/blog_02', link_title: 'Explorar carreras'},
      {link: '/pricing_02', link_title: 'Precios'},
      {link: '/dashboard/dashboard-index', link_title: 'Panel'},
    ],
  },
  {
    id: 2,
    widget_class: 'col-lg-3',
    page: 'home_5',
    widget_title: 'Legal',
    footer_link: [
      {link: '/faq', link_title: 'Términos y condiciones'},
      {link: '/faq', link_title: 'Cookies'},
      {link: '/faq', link_title: 'Política de privacidad'},
      {link: '/faq', link_title: 'Preguntas frecuentes'},
    ],
  },
  {
    id: 3,
    widget_class: 'col-lg-2',
    page: 'home_5',
    widget_title: 'Nuevos anuncios',
    footer_link: [
      {link: '/listing_01', link_title: 'Comprar departamentos'},
      {link: '/listing_02', link_title: 'Comprar condominios'},
      {link: 'listing_03', link_title: 'Alquilar casas'},
      {link: 'listing_04', link_title: 'Alquilar industrial'},
      {link: '/listing_05', link_title: 'Comprar villas'},
      {link: '/listing_06', link_title: 'Alquilar oficina'},
    ],
  },
];

export default footer_data;
