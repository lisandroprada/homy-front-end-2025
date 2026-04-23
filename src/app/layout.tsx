import type {Metadata} from 'next';
import ClientProviders from '@/components/ClientProviders';
import '../styles/index.scss';
import {Analytics} from '@vercel/analytics/react';
import {SpeedInsights} from '@vercel/speed-insights/next';

const metadataBase = new URL('https://www.ipropietas.com.ar');
const fbAppId = process.env.FB_APP_ID ?? '1084817577197334';

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: 'iPropietas — Inmobiliaria en Argentina',
    template: '%s | iPropietas',
  },
  description: 'iPropietas - Encontrá las mejores propiedades en Argentina: casas, departamentos y terrenos en venta y alquiler.',
  keywords: ['inmobiliaria', 'propiedades', 'venta', 'alquiler', 'casas', 'departamentos', 'Argentina'],
  openGraph: {
    siteName: 'iPropietas',
    type: 'website',
    locale: 'es_AR',
    url: metadataBase.href,
    title: 'iPropietas — Inmobiliaria en Argentina',
    description: 'Encontrá las mejores propiedades en Argentina: casas, departamentos y terrenos en venta y alquiler.',
    images: [
      {
        url: '/og/preview.webp',
        width: 1200,
        height: 633,
        alt: 'iPropietas — Vista previa del sitio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'iPropietas — Inmobiliaria en Argentina',
    description: 'Encontrá las mejores propiedades en Argentina.',
    images: ['/og/preview.webp'],
  },
  other: {
    'fb:app_id': fbAppId,
    'theme-color': '#0D1A1C',
    'msapplication-navbutton-color': '#0D1A1C',
    'apple-mobile-web-app-status-bar-style': '#0D1A1C',
  },
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <html lang='es-AR' suppressHydrationWarning={isDev}>
      <body suppressHydrationWarning={true}>
        <div className='main-page-wrapper'>
          <ClientProviders>{children}</ClientProviders>
        </div>
        {process.env.VERCEL && <Analytics />}
        {process.env.VERCEL && <SpeedInsights />}
      </body>
    </html>
  );
}
