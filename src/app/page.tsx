import dynamic from 'next/dynamic';
const HomeFour = dynamic(() => import('@/components/homes/home-four'), {ssr: false, loading: () => <div>Cargando...</div>});
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Propietas Inmobiliaria',
};
const index = () => {
  return (
    <Wrapper>
      <HomeFour />
    </Wrapper>
  );
};

export default index;
