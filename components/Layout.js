import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.app}>
      <header className={styles.header}>Header</header>
      <div className={styles.bodyAndFooter}>
        <main className={styles.body}>{children}</main>
        <footer className={styles.footer}>Footer</footer>
      </div>
    </div>
  );
}
