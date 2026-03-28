'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ShoppingBag, Check, MessageCircle } from 'lucide-react';
import styles from './ProductModal.module.css';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
  } | null;
}

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Bloquear scroll cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  // Si no hay producto, no renderiza
  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose(); // Auto cerrar después de agregar (opcional, pero útil para UX ágil)
    }, 1500);
  };

  const handleConsultDirect = () => {
    const text = `Hola Brazooka. Quisiera consultar stock y valor exacto de: ${product.title}.`;
    const url = `https://ig.me/m/importadorabrazooka_`;
    navigator.clipboard.writeText(text).then(() => {
      alert("¡Texto de consulta copiado! Pégalo en el chat de Instagram que se abrirá.");
      window.open(url, '_blank');
    }).catch(() => {
      window.open(url, '_blank');
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'absolute', inset: 0, zIndex: -1 }}
            onClick={onClose}
          />

          <motion.div
            className={styles.modalContainer}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <button className={styles.closeBtn} onClick={onClose}>
              <X size={20} />
            </button>

            <div className={styles.modalBody}>
              <div className={styles.imageSection}>
                <Image 
                  src={encodeURI(product.image)} 
                  alt={product.title} 
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className={styles.infoSection}>
                <span className={styles.badge}>{product.category}</span>
                <h2 className={styles.title}>{product.title}</h2>
                <p className={styles.price}>Valor a cotizar por DM</p>
                <p className={styles.description}>{product.description}</p>
                
                <div className={styles.actionGroup}>
                  <button 
                    onClick={handleAddToCart}
                    className={`${styles.primaryBtn} ${isAdded ? styles.primaryBtnSuccess : ''}`}
                  >
                    {isAdded ? (
                      <>
                        <span>¡Añadido a Bolsa!</span>
                        <Check size={18} />
                      </>
                    ) : (
                      <>
                        <span>Añadir a Bolsa Múltiple</span>
                        <ShoppingBag size={18} />
                      </>
                    )}
                  </button>

                  <button 
                    onClick={handleConsultDirect}
                    className={styles.secondaryBtn}
                  >
                    <span>Consultar Rápido por DM</span>
                    <MessageCircle size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
