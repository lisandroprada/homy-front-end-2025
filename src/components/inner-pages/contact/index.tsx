import FooterFour from '@/layouts/footers/FooterFour';
import ContactArea from './ContactArea';
import HeaderTwo from '@/layouts/headers/HeaderTwo';

const Contact = () => {
  return (
    <>
      <HeaderTwo style_1={false} style_2={true} />
      <ContactArea />
      <FooterFour />
    </>
  );
};

export default Contact;
