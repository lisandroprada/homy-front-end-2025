import DashboardSavedSearch from '@/components/dashboard/saved-search';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Dashboard Saved Search Homy - Propietas Inmobiliaria',
};
const index = () => {
  return (
    <Wrapper>
      <DashboardSavedSearch />
    </Wrapper>
  );
};

export default index;
