export const metadataBase = new URL('https://www.ipropietas.com.ar');
export const metadata = {
  metadataBase,
};
import ClientProviders from '@/components/ClientProviders';
import '../styles/index.scss';
import {Provider} from 'react-redux';
import store from '@/redux/store';

export default function RootLayout({children}: {children: React.ReactNode}) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <html lang='es-AR' suppressHydrationWarning={isDev}>
      <head>
        <title>Inicio - iPropietas</title>
        <meta name='keywords' content='inmobiliaria, propiedades, venta, alquiler, casas, departamentos' />
        <meta name='description' content='iPropietas - Encuentra las mejores propiedades en Argentina: casas, departamentos y terrenos en venta y alquiler.' />
        <link rel='canonical' href={metadataBase.href} />
        <meta property='og:site_name' content='iPropietas' />
        <meta property='og:url' content={metadataBase.href} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Inicio - iPropietas' />
        <meta property='og:description' content='iPropietas - Encuentra las mejores propiedades en Argentina.' />
        <meta property='og:image' content={`${metadataBase.href}/og/preview.webp`} />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='633' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='Inicio - iPropietas' />
        <meta name='twitter:description' content='iPropietas - Encuentra las mejores propiedades en Argentina.' />
        <meta name='twitter:image' content={`${metadataBase.href}/og/preview.webp`} />
        {/* For IE  */}
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        {/* For Resposive Device */}
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        {/* For Window Tab Color */}
        {/* Chrome, Firefox OS and Opera */}
        <meta name='theme-color' content='#0D1A1C' />
        {/* Windows Phone */}
        <meta name='msapplication-navbutton-color' content='#0D1A1C' />
        {/* iOS Safari */}
        <meta name='apple-mobile-web-app-status-bar-style' content='#0D1A1C' />
        <link rel='icon' href='/favicon.png' sizes='any' />
        {/* Custom fonts are now loaded in _document.tsx */}
      </head>
      <body suppressHydrationWarning={true}>
        <div className='main-page-wrapper'>
          <ClientProviders>{children}</ClientProviders>
        </div>
      </body>
    </html>
  );
}
