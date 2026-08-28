import PrivacyPolicy from '@/components/inner-pages/privacy-policy';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Política de Privacidad - iPropietas',
  description: 'Política de privacidad de iPropietas: qué datos recopilamos, cómo los usamos y tus derechos sobre ellos.',
  alternates: {
    canonical: 'https://www.ipropietas.com.ar/politica-de-privacidad',
  },
  openGraph: {
    title: 'Política de Privacidad - iPropietas',
    description: 'Qué datos recopilamos y cómo los protegemos en iPropietas.',
    images: ['/og/preview.webp'],
  },
};

const index = () => {
  return (
    <Wrapper>
      <PrivacyPolicy />
    </Wrapper>
  );
};

export default index;
