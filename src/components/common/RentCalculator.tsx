'use client';
import {useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import {
  RENT_ADJUSTMENT_MONTHS,
  RENT_CONTRACT_MONTHS,
  RENT_DEPOSIT_MONTHS,
  RENT_INDEX_LABEL,
  RENT_TENANT_FEE_PCT,
  calcTenantCosts,
  formatMoney,
} from '@/utils/rent-calculator';
import styles from './RentCalculator.module.css';

const WHATSAPP_NUMBER = '5492804503151';

interface RentCalculatorProps {
  rentAmount: number;
  currency: string;
  title: string;
}

const RentCalculator = ({rentAmount, currency, title}: RentCalculatorProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const costs = calcTenantCosts(rentAmount);
  const waText = `Hola! Quiero alquilar "${title}" (alquiler ${formatMoney(rentAmount, currency)}). Vi la calculadora de condiciones y quiero consultar los requisitos.`;

  return (
    <>
      <button type='button' className={styles.trigger} onClick={() => setOpen(true)}>
        <i className='bi bi-calculator' aria-hidden='true'></i> Calculadora de condiciones
      </button>
      {open &&
        createPortal(
          <div className={styles.overlay} onClick={() => setOpen(false)}>
            <div className={styles.dialog} role='dialog' aria-modal='true' aria-label='Calculadora de condiciones de alquiler' onClick={(e) => e.stopPropagation()}>
              <div className={styles.header}>
                <h2 className={styles.title}>Condiciones de alquiler</h2>
                <button type='button' className={styles.close} onClick={() => setOpen(false)} aria-label='Cerrar'>
                  ×
                </button>
              </div>
              <p className={styles.address}>{title}</p>

              <h3 className={styles.sectionTitle}>Requisitos</h3>
              <ul className={styles.requirements}>
                <li>Contrato de {RENT_CONTRACT_MONTHS / 12} años.</li>
                <li>El alquiler se actualiza por {RENT_INDEX_LABEL} cada {RENT_ADJUSTMENT_MONTHS} meses (según el contrato también puede ser cada 3 o 6).</li>
              </ul>

              <h3 className={styles.sectionTitle}>Al firmar</h3>
              <div className={styles.row}>
                <span>Primer mes de alquiler</span>
                <span>{formatMoney(rentAmount, currency)}</span>
              </div>
              <div className={styles.row}>
                <span>Depósito en garantía ({RENT_DEPOSIT_MONTHS} mes)</span>
                <span>{formatMoney(costs.deposit, currency)}</span>
              </div>
              <div className={styles.row}>
                <span>Honorarios inmobiliaria ({RENT_TENANT_FEE_PCT}%)</span>
                <span>{formatMoney(costs.fee, currency)}</span>
              </div>
              <div className={`${styles.row} ${styles.total}`}>
                <span>Total al firmar</span>
                <span>{formatMoney(costs.upfront, currency)}</span>
              </div>

              <p className={styles.note}>
                El depósito se devuelve al finalizar el contrato. Con ajuste por {RENT_INDEX_LABEL} cada {RENT_ADJUSTMENT_MONTHS} meses, el alquiler se actualiza según el índice publicado, por lo que el
                monto mensual va a ser mayor al inicial. Honorarios calculados sobre {RENT_CONTRACT_MONTHS} meses a alquiler inicial. Valores orientativos, sujetos a cambio sin previo aviso.
              </p>

              <a className={styles.cta} href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`} target='_blank' rel='noopener noreferrer'>
                Consultar por WhatsApp
              </a>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default RentCalculator;
