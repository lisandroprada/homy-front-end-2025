'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { unsubscribeNewsletter } from '@/services/api/newsletter';

type Status = 'loading' | 'success' | 'already' | 'error';

const UnsubscribePage = () => {
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');
  const [status, setStatus] = useState<Status>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('El enlace de desuscripción no es válido o está incompleto.');
      return;
    }

    unsubscribeNewsletter(token)
      .then((res) => {
        if (res.message.includes('anteriormente')) {
          setStatus('already');
        } else {
          setStatus('success');
        }
        setMessage(res.message);
      })
      .catch((err) => {
        const msg =
          err?.response?.data?.message ??
          'No pudimos procesar tu solicitud. El enlace puede haber expirado.';
        setStatus('error');
        setMessage(msg);
      });
  }, [token]);

  const config: Record<Status, { icon: string; color: string; title: string }> = {
    loading: { icon: '⏳', color: '#888', title: 'Procesando...' },
    success: { icon: '✓', color: '#00b579', title: 'Suscripción cancelada' },
    already: { icon: 'ℹ', color: '#29aae2', title: 'Ya estabas desuscripto/a' },
    error: { icon: '✕', color: '#e25429', title: 'Enlace no válido' },
  };

  const { icon, color, title } = config[status];

  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        background: '#f9f9f9',
      }}
    >
      <div
        style={{
          maxWidth: '520px',
          width: '100%',
          background: '#fff',
          borderRadius: '12px',
          padding: '56px 48px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          textAlign: 'center',
        }}
      >
        {/* Icono */}
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: `${color}18`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: '28px',
            color,
          }}
        >
          {icon}
        </div>

        {/* Título */}
        <h2
          style={{
            color: '#2e3192',
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '16px',
          }}
        >
          {title}
        </h2>

        {/* Mensaje */}
        <p
          style={{
            color: '#666',
            fontSize: '15px',
            lineHeight: 1.7,
            marginBottom: '32px',
          }}
        >
          {status === 'loading'
            ? 'Estamos procesando tu solicitud, aguardá un momento.'
            : message}
        </p>

        {status !== 'loading' && (
          <>
            {status === 'success' && (
              <p
                style={{
                  color: '#999',
                  fontSize: '13px',
                  marginBottom: '32px',
                  lineHeight: 1.6,
                }}
              >
                Lamentamos verte partir. Si cambiás de opinión, podés volver a
                suscribirte desde el pie de nuestro sitio.
              </p>
            )}

            <Link
              href='/'
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #2e3192, #29aae2)',
                color: '#fff',
                padding: '13px 32px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: 600,
              }}
            >
              Volver al inicio
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default UnsubscribePage;
