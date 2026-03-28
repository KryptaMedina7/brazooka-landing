'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';
import styles from './Navbar.module.css';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount, toggleCart, isCartOpen } = useCart();
  const [showReminder, setShowReminder] = useState(false);
  const [hasDismissedReminder, setHasDismissedReminder] = useState(false);

  useEffect(() => {
    // Si la bolsa se abre o ya se cerró el aviso, no mostramos nada.
    if (isCartOpen || hasDismissedReminder) {
      setShowReminder(false);
      return;
    }

    // Si hay items y la bolsa está cerrada, iniciamos timer de 60s
    if (cartCount > 0 && !isCartOpen && !hasDismissedReminder) {
      const timer = setTimeout(() => {
        setShowReminder(true);
      }, 60000); // 1 minuto de inactividad
      
      return () => clearTimeout(timer);
    }
  }, [cartCount, isCartOpen, hasDismissedReminder]);

  const handleOpenCart = () => {
    setShowReminder(false);
    setHasDismissedReminder(true);
    toggleCart(true);
  };

  const handleDismissReminder = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowReminder(false);
    setHasDismissedReminder(true);
  };

  return (
    <motion.header 
      className={styles.header}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className={`container ${styles.navContainer}`}>
        <div className={styles.nav}>
          <Link href="/" className={styles.logoWrapper}>
            <Image 
              src="/logo_brazooka.png" 
              alt="Brazooka SPA Logo" 
              width={160} 
              height={45} 
              className={styles.logo}
              priority
            />
          </Link>
          
          <div className={styles.navLinks}>
            <Link href="/#nosotros" className={styles.link}>Nosotros</Link>
            <Link href="/catalogo" className={styles.link}>Catálogo</Link>
            <Link href="/faq" className={styles.link}>Compras</Link>
            <Link href="/comunidad" className={styles.link}>Comunidad</Link>
          </div>

          <div className={styles.actions}>

            <div className={styles.cartContainer}>
              <button onClick={handleOpenCart} className={styles.cartBtn} aria-label="Abrir Bolsa">
                <ShoppingBag size={22} className="text-gold" />
                {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
              </button>

              <AnimatePresence>
                {showReminder && (
                  <motion.div 
                    className={styles.cartReminderBubble}
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                  >
                    <button className={styles.reminderClose} onClick={handleDismissReminder}>
                      <X size={12} />
                    </button>
                    <p>¿Algún motivo por el que no quieras cotizar? Estamos en línea por DM. 👀</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="https://instagram.com/importadorabrazooka_" target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
              Asesoría
            </a>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
