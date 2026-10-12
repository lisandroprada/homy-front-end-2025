import FooterFour from '@/layouts/footers/FooterFour';
import ContactArea from './ContactArea';
import HeaderTwo from '@/layouts/headers/HeaderTwo';

const Contact = () => {
  return (
    <>
      <HeaderTwo style_1={false} style_2={true} />
      <h1 className='visually-hidden'>Contacto</h1>
      <ContactArea />
      <FooterFour />
    </>
  );
};

export default Contact;
