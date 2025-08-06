import ProjectOne from '@/components/inner-pages/projects/project-one';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Project One Homy - Propietas Inmobiliaria',
};
const index = () => {
  return (
    <Wrapper>
      <ProjectOne />
    </Wrapper>
  );
};

export default index;
