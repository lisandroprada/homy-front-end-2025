import ServiceTwo from '@/components/inner-pages/services/service-two';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Service Two Homy - Propietas Inmobiliaria',
};
const index = () => {
  return (
    <Wrapper>
      <ServiceTwo />
    </Wrapper>
  );
};

export default index;
