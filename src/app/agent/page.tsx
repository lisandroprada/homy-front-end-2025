import Agent from '@/components/inner-pages/agent/agent';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Nuestros agentes inmobiliarios - iPropietas',
  description: 'Conocé al equipo de agentes inmobiliarios de iPropietas. Profesionales con amplio conocimiento del mercado de la Patagonia Argentina.',
  alternates: {
    canonical: 'https://www.ipropietas.com.ar/agent',
  },
  openGraph: {
    title: 'Nuestros agentes inmobiliarios - iPropietas',
    description: 'Conocé al equipo de agentes inmobiliarios de iPropietas en la Patagonia Argentina.',
    images: ['/og/preview.webp'],
  },
};
const index = () => {
  return (
    <Wrapper>
      <Agent />
    </Wrapper>
  );
};

export default index;
