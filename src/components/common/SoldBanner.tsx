import styles from './SoldBanner.module.css';

export default function SoldBanner({status}: {status?: string}) {
  if (status?.toUpperCase() !== 'VENDIDO') return null;
  return <span className={styles.banner}>VENDIDO</span>;
}
