import { Suspense } from 'react';
import UnsubscribePage from '@/components/newsletter/UnsubscribePage';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Cancelar suscripción - Propietas Inmobiliaria',
  description: 'Cancelá tu suscripción al boletín de Propietas Inmobiliaria.',
  robots: { index: false, follow: false },
};

const Page = () => {
  return (
    <Wrapper>
      <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
        <UnsubscribePage />
      </Suspense>
    </Wrapper>
  );
};

export default Page;
