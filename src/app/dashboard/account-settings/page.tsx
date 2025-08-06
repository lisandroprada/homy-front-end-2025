import DashboardAccountSetting from '@/components/dashboard/account-settings';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Dashboard Account Setting Homy - Propietas Inmobiliaria',
};
const index = () => {
  return (
    <Wrapper>
      <DashboardAccountSetting />
    </Wrapper>
  );
};

export default index;
