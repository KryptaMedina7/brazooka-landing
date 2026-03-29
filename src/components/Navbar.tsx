'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, X, Menu } from 'lucide-react';
import Image from 'next/image';
import styles from './Navbar.module.css';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount, toggleCart, isCartOpen } = useCart();
  const [showReminder, setShowReminder] = useState(false);
  const [hasDismissedReminder, setHasDismissedReminder] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isCartOpen || hasDismissedReminder) {
      setShowReminder(false);
      return;
    }

    if (cartCount > 0 && !isCartOpen && !hasDismissedReminder) {
      const timer = setTimeout(() => {
        setShowReminder(true);
      }, 60000); // 1 minuto de inactividad
      
      return () => clearTimeout(timer);
    }
  }, [cartCount, isCartOpen, hasDismissedReminder]);

  // Bloquear el scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

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

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
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
                width={140} 
                height={40} 
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
              
              <button 
                className={styles.menuToggle} 
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Abrir menú"
              >
                <Menu size={24} className="text-gold" />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* FULL SCREEN MOBILE OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className={styles.mobileOverlay}
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.mobileMenuHeader}>
              <Image src="/logo_brazooka.png" alt="Brazooka Logo" width={140} height={40} />
              <button className={styles.closeMenuBtn} onClick={closeMenu}>
                <X size={28} />
              </button>
            </div>
            
            <div className={styles.mobileMenuLinks}>
              <Link href="/" onClick={closeMenu} className={styles.mobileLink}>Inicio</Link>
              <Link href="/#nosotros" onClick={closeMenu} className={styles.mobileLink}>Nosotros</Link>
              <Link href="/catalogo" onClick={closeMenu} className={styles.mobileLink}>Catálogo</Link>
              <Link href="/faq" onClick={closeMenu} className={styles.mobileLink}>Compras (FAQ)</Link>
              <Link href="/comunidad" onClick={closeMenu} className={styles.mobileLink}>Comunidad</Link>
            </div>
            
            <div className={styles.mobileMenuFooter}>
              <a href="https://instagram.com/importadorabrazooka_" target="_blank" rel="noopener noreferrer" className={styles.mobileCtaBtn}>
                Hablar con un Asesor
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
