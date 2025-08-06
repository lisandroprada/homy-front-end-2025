import DashboardFavourite from '@/components/dashboard/favourites';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Dashboard Favourite Homy - Propietas Inmobiliaria',
};
const index = () => {
  return (
    <Wrapper>
      <DashboardFavourite />
    </Wrapper>
  );
};

export default index;
