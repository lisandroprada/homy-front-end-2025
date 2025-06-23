import HomeFour from '@/components/homes/home-four';
import ListingTwo from '@/components/inner-listing/listing-02';
import ListingFive from '@/components/inner-listing/listing-05';
import AboutUsThree from '@/components/inner-pages/about-us/about-us-three';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Listing Two Homy - Real Estate React Next js Template',
};
const index = () => {
  return (
    <Wrapper>
      <AboutUsThree />
    </Wrapper>
  );
};

export default index;
