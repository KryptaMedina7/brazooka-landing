'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const { cartItems, isCartOpen, toggleCart, updateQuantity, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isCartOpen]);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    // Generar texto para DM de Instagram
    let message = "Hola Brazooka. Me interesa cotizar el siguiente pedido:\n\n";
    cartItems.forEach(item => {
      message += `- ${item.quantity}x ${item.title}\n`;
    });
    message += "\n¿Tienen stock disponible y cuál sería el valor total?";

    try {
      await navigator.clipboard.writeText(message);
      alert('¡Pedido copiado al portapapeles! Pégalo en el chat de Instagram que se abrirá a continuación.');
      // Abrir Instagram DM nativo/web
      window.open('https://ig.me/m/importadorabrazooka_', '_blank');
      toggleCart(false);
      clearCart();
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Hubo un error copiando el mensaje. Intenta redirigirte a Instagram directamente.');
      window.open('https://ig.me/m/importadorabrazooka_', '_blank');
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className={styles.overlay}>
          {/* Fondo oscuro clickeable para cerrar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'absolute', inset: 0, zIndex: -1 }}
            onClick={() => toggleCart(false)}
          />

          <motion.div
            className={styles.drawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>
                <ShoppingBag size={20} className="text-gold" />
                Tu Bolsa de Compra
              </h2>
              <button className={styles.closeBtn} onClick={() => toggleCart(false)}>
                <X size={24} />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className={styles.emptyState}>
                <ShoppingBag size={48} opacity={0.2} />
                <p>Tu bolsa está vacía.</p>
                <button
                  onClick={() => toggleCart(false)}
                  style={{ background: 'transparent', color: 'var(--primary-brand)', border: 'none', cursor: 'pointer', marginTop: '1rem', textDecoration: 'underline' }}
                >
                  Seguir viendo productos
                </button>
              </div>
            ) : (
              <>
                <div className={styles.body}>
                  {cartItems.map((item) => (
                    <div key={item.id} className={styles.cartItem}>
                      <div className={styles.itemImageWrapper}>
                        <Image src={encodeURI(item.image)} alt={item.title} fill className={styles.itemImage} />
                      </div>
                      <div className={styles.itemDetails}>
                        <h4 className={styles.itemTitle}>{item.title}</h4>
                        <div className={styles.itemActions}>
                          <div className={styles.quantityControls}>
                            <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                              <Minus size={14} />
                            </button>
                            <span style={{ fontSize: '0.9rem', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                            <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                              <Plus size={14} />
                            </button>
                          </div>
                          <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.footer}>
                  <p className={styles.disclaimer}>
                    Cotización mediante Instagram DM.<br />
                    El equipo te confirmará cobertura y precios al instante.
                  </p>
                  <button className={styles.checkoutBtn} onClick={handleCheckout}>
                    Cotizar ahora
                    <ArrowRight size={18} />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
