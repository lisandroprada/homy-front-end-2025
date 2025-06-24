import {StaticImageData} from 'next/image';

import featureIcon_1 from '@/assets/images/icon/icon_01.svg';
import featureIcon_2 from '@/assets/images/icon/icon_02.svg';
import featureIcon_3 from '@/assets/images/icon/icon_03.svg';

import feature3Icon_1 from '@/assets/images/icon/icon_07.svg';
import feature3Icon_2 from '@/assets/images/icon/icon_08.svg';
import feature3Icon_3 from '@/assets/images/icon/icon_09.svg';
import feature3Icon_4 from '@/assets/images/icon/icon_26.svg';
import feature3Icon_5 from '@/assets/images/icon/icon_27.svg';
import feature3Icon_6 from '@/assets/images/icon/icon_28.svg';

import feature4Icon_1 from '@/assets/images/icon/icon_11.svg';
import feature4Icon_2 from '@/assets/images/icon/icon_12.svg';
import feature4Icon_3 from '@/assets/images/icon/icon_13.svg';

import feature5Icon_1 from '@/assets/images/icon/icon_23.svg';
import feature5Icon_2 from '@/assets/images/icon/icon_24.svg';
import feature5Icon_3 from '@/assets/images/icon/icon_25.svg';

import feature6Icon_1 from '@/assets/images/icon/icon_35.svg';
import feature6Icon_2 from '@/assets/images/icon/icon_36.svg';
import feature6Icon_3 from '@/assets/images/icon/icon_37.svg';

import feature7Icon_1 from '@/assets/images/icon/icon_40.svg';
import feature7Icon_2 from '@/assets/images/icon/icon_41.svg';
import feature7Icon_3 from '@/assets/images/icon/icon_42.svg';

import featureImg_1 from '@/assets/images/media/img_19.jpg';
import featureImg_2 from '@/assets/images/media/img_20.jpg';
import featureImg_3 from '@/assets/images/media/img_21.jpg';

interface DataType {
  id: number;
  page: string;
  item_bg?: string;
  img?: StaticImageData;
  icon?: StaticImageData;
  title: string;
  desc?: string;
  tag?: string;
  data_delay_time?: string;
  btn?: string;
  class_name?: string;
}

const feature_data: DataType[] = [
  {
    id: 1,
    page: 'home_1_feature_1',
    icon: featureIcon_1,
    title: 'Comprar una propiedad',
    btn: 'Buscar propiedad',
    desc: 'Explora más de 2 millones de propiedades en homy y encuentra el espacio ideal para ti.',
  },
  {
    id: 2,
    page: 'home_1_feature_1',
    icon: featureIcon_2,
    title: 'Alquilar una propiedad',
    btn: 'Alquilar propiedad',
    desc: 'Descubre un alquiler que te encantará en homy, gracias a más de 35 filtros y palabras clave personalizadas.',
  },
  {
    id: 3,
    page: 'home_1_feature_1',
    icon: featureIcon_3,
    title: 'Vender propiedad',
    btn: 'Vender propiedad',
    desc: 'Publica, vende y crece con nuestra agencia inmobiliaria de primer nivel. Es muy fácil y divertido.',
  },

  // home_1_feature_2

  {
    id: 1,
    page: 'home_1_feature_2',
    item_bg: 'card-1',
    title: 'Kelowna',
    desc: '1.230 Propiedades',
  },
  {
    id: 2,
    page: 'home_1_feature_2',
    item_bg: 'card-2',
    title: 'California',
    desc: '1.190 Propiedades',
  },
  {
    id: 3,
    page: 'home_1_feature_2',
    item_bg: 'card-3',
    title: 'Nueva York',
    desc: '1.710 Propiedades',
  },
  {
    id: 4,
    page: 'home_1_feature_2',
    item_bg: 'card-5',
    title: 'Miami',
    desc: '670 Propiedades',
  },
  {
    id: 5,
    page: 'home_1_feature_2',
    item_bg: 'card-5',
    title: 'Dhaka',
    desc: '1.670 Propiedades',
  },

  // home_1_feature_3

  {
    id: 1,
    page: 'home_1_feature_3',
    icon: feature3Icon_1,
    title: 'Crear cuenta',
    desc: 'Es muy fácil abrir una cuenta y comenzar tu viaje.',
  },
  {
    id: 2,
    page: 'home_1_feature_3',
    class_name: 'arrow position-relative',
    icon: feature3Icon_2,
    title: 'Buscar propiedad',
    desc: 'Completa tu perfil con toda la información para captar la atención de los clientes.',
  },
  {
    id: 3,
    page: 'home_1_feature_3',
    icon: feature3Icon_3,
    title: 'Proceso rápido',
    desc: 'Solicita y consigue tus trabajos preferidos with todos los requisitos y consíguelo.',
  },

  // home_two_feature_1

  {
    id: 1,
    page: 'home_2_feature_1',
    item_bg: 'location-card-1',
    title: 'Kelowna',
  },
  {
    id: 2,
    page: 'home_2_feature_1',
    item_bg: 'location-card-2',
    title: 'West Kelowna',
    data_delay_time: '0.1s',
  },
  {
    id: 3,
    page: 'home_2_feature_1',
    item_bg: 'location-card-3',
    title: 'Lake Country',
    data_delay_time: '0.2s',
  },
  {
    id: 4,
    page: 'home_2_feature_1',
    item_bg: 'location-card-4',
    title: 'Vernon',
  },
  {
    id: 5,
    page: 'home_2_feature_1',
    item_bg: 'location-card-5',
    title: 'Peachland',
    data_delay_time: '0.1s',
  },
  {
    id: 6,
    page: 'home_2_feature_1',
    item_bg: 'location-card-6',
    title: 'Penticton',
    data_delay_time: '0.2s',
  },

  // home_two_feature_2

  {
    id: 1,
    page: 'home_two_feature_2',
    img: featureImg_1,
    title: 'Explora y compra propiedad',
    tag: 'COMPRAR PROPIEDAD',
    data_delay_time: '0.2s',
  },
  {
    id: 2,
    page: 'home_two_feature_2',
    img: featureImg_2,
    title: 'Publica y vende rápido',
    tag: 'Vender ahora',
    data_delay_time: '0.1s',
  },
  {
    id: 3,
    page: 'home_two_feature_2',
    img: featureImg_3,
    title: 'Descubre y alquila',
    tag: 'ALQUILAR AHORA',
    data_delay_time: '0.2s',
  },

  // home_two_feature_3

  {
    id: 1,
    page: 'home_two_feature_3',
    icon: feature4Icon_1,
    title: 'Seguro de propiedad',
    desc: 'Elit esse cillum dolo fugiat nulla tur nos ullamo.',
  },
  {
    id: 2,
    page: 'home_two_feature_3',
    icon: feature4Icon_2,
    title: 'Pagos fáciles',
    desc: 'quis nostrud exerct ullamo sucirity finibus ne derived.',
  },
  {
    id: 3,
    page: 'home_two_feature_3',
    icon: feature4Icon_3,
    title: 'Proceso rápido',
    desc: "Duis aute irure dolor reprehe de Cicero's voluptat velit.",
  },

  // home_3_feature_1

  {
    id: 1,
    page: 'home_3_feature_1',
    icon: feature5Icon_1,
    title: 'Comprar una propiedad',
    btn: 'Buscar propiedad',
    desc: 'Explora más de 2 millones de propiedades en homy y encuentra el espacio ideal para ti.',
  },
  {
    id: 2,
    page: 'home_3_feature_1',
    icon: feature5Icon_2,
    title: 'Comprar una propiedad',
    btn: 'Alquilar propiedad',
    desc: 'Descubre un alquiler que te encantará en homy, gracias a más de 35 filtros y palabras clave personalizadas.',
    data_delay_time: '0.1s',
  },
  {
    id: 3,
    page: 'home_3_feature_1',
    icon: feature5Icon_3,
    title: 'Comprar una propiedad',
    btn: 'Vender propiedad',
    desc: 'Publica, vende y crece con nuestra agencia inmobiliaria de primer nivel. Es muy fácil y divertido.',
    data_delay_time: '0.2s',
  },

  // home_three_feature_2

  {
    id: 1,
    page: 'home_three_feature_2',
    icon: feature3Icon_4,
    title: 'Seguro de propiedad',
    desc: 'Elit esse cillum dolo fugiat nulla tur nos ullamo.',
  },
  {
    id: 2,
    page: 'home_three_feature_2',
    icon: feature3Icon_5,
    title: 'Pagos fáciles',
    desc: 'quis nostrud exerct ullamo sucirity finibus ne derived.',
  },
  {
    id: 3,
    page: 'home_three_feature_2',
    icon: feature3Icon_6,
    title: 'Proceso rápido',
    desc: "Duis aute irure dolor reprehe de Cicero's voluptat velit.",
  },

  // home_4_feature_1

  {
    id: 1,
    page: 'home_4_feature_1',
    icon: feature6Icon_1,
    title: 'Comprar una propiedad',
    btn: 'Buscar propiedad',
    desc: 'Explora más de 2 millones de propiedades en homy y encuentra el espacio ideal para ti.',
  },
  {
    id: 2,
    page: 'home_4_feature_1',
    icon: feature6Icon_2,
    title: 'Alquilar una propiedad',
    btn: 'Alquilar propiedad',
    desc: 'Descubre un alquiler que te encantará en homy, gracias a más de 35 filtros y palabras clave personalizadas.',
    data_delay_time: '0.1s',
  },
  {
    id: 3,
    page: 'home_4_feature_1',
    icon: feature6Icon_3,
    title: 'Vender una propiedad',
    btn: 'Vender propiedad',
    desc: 'Publica, vende y crece con nuestra agencia inmobiliaria de primer nivel. Es muy fácil y divertido.',
    data_delay_time: '0.2s',
  },

  // home_5_feature_1

  {
    id: 1,
    page: 'home_5_feature_1',
    item_bg: 'home-5-feature-item-1',
    title: 'California',
    desc: '1.230 Publicaciones',
  },
  {
    id: 2,
    page: 'home_5_feature_1',
    item_bg: 'home-5-feature-item-2',
    title: 'Miami',
    desc: '1.140 Publicaciones',
    data_delay_time: '0.1s',
  },
  {
    id: 3,
    page: 'home_5_feature_1',
    item_bg: 'home-5-feature-item-3',
    title: 'Nueva York',
    desc: '1.740 Publicaciones',
    data_delay_time: '0.2s',
  },
  {
    id: 4,
    page: 'home_5_feature_1',
    item_bg: 'home-5-feature-item-4',
    title: 'Washington DC',
    desc: '720 Publicaciones',
    data_delay_time: '0.3s',
  },

  // home_6_feature_1

  {
    id: 1,
    page: 'home_6_feature_1',
    icon: feature7Icon_1,
    title: 'Seguro de propiedad',
    desc: 'Elit esse cillum dol fug nulla tur nos ullamo.',
  },
  {
    id: 2,
    page: 'home_6_feature_1',
    icon: feature7Icon_2,
    title: 'Pagos fáciles',
    desc: 'quis nostrud exerct ulla security finibus ne derived.',
  },
  {
    id: 3,
    page: 'home_6_feature_1',
    icon: feature7Icon_3,
    title: 'Proceso rápido',
    desc: "Duis aute irure do reprehe de Cicero's voluptat velit.",
  },
];

export default feature_data;
