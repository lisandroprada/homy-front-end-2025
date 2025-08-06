import DashboardMessage from '@/components/dashboard/message';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Dashboard Message Homy - Propietas Inmobiliaria',
};
const index = () => {
  return (
    <Wrapper>
      <DashboardMessage />
    </Wrapper>
  );
};

export default index;
