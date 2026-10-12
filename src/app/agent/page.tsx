import Agent from '@/components/inner-pages/agent/agent';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Nuestros agentes inmobiliarios',
  description: 'Conocé al equipo de agentes inmobiliarios de iPropietas. Profesionales con conocimiento del mercado de Rawson, Playa Unión y el Valle del Río Chubut.',
  alternates: {
    canonical: 'https://www.ipropietas.com.ar/agent',
  },
  openGraph: {
    title: 'Nuestros agentes inmobiliarios - iPropietas',
    description: 'Conocé al equipo de agentes inmobiliarios de iPropietas en Rawson y Playa Unión.',
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
