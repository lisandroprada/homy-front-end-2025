import HomeFour from '@/components/homes/home-four';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Inicio - iPropietas',
  description: 'iPropietas - Comprá, vendé y alquilá propiedades en Argentina. Descubrí casas, departamentos y terrenos.',
  openGraph: {
    title: 'Inicio - iPropietas',
    description: 'iPropietas - Comprá, vendé y alquilá propiedades en Argentina. Descubrí casas, departamentos y terrenos.',
    url: 'https://www.ipropietas.com.ar/home-four',
    siteName: 'iPropietas',
    images: [
      {
        url: 'https://www.ipropietas.com.ar/assets/images/media/img_32.jpg',
        width: 1200,
        height: 628,
        alt: 'iPropietas - Banner principal',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inicio - iPropietas',
    description: 'iPropietas - Comprá, vendé y alquilá propiedades en Argentina.',
    images: ['https://www.ipropietas.com.ar/assets/images/media/img_32.jpg'],
  },
};
const index = () => {
  return (
    <Wrapper>
      <HomeFour />
    </Wrapper>
  );
};

export default index;
