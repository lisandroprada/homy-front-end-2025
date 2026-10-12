import FooterFour from '@/layouts/footers/FooterFour';
import ContactArea from './ContactArea';
import HeaderTwo from '@/layouts/headers/HeaderTwo';

const Contact = () => {
  return (
    <>
      <HeaderTwo style_1={false} style_2={true} />
      <h1 className='visually-hidden'>Contacto de la inmobiliaria en Rawson</h1>
      <ContactArea />
      <FooterFour />
    </>
  );
};

export default Contact;
