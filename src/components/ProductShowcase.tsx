'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingBag, Check } from 'lucide-react';
import styles from './ProductShowcase.module.css';
import { CATALOG_PRODUCTS } from '../config/siteData';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal';

export default function ProductShowcase() {
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const hardwareProducts = CATALOG_PRODUCTS.filter(
    p => p.category === 'Vaporizadores' || p.category === 'Accesorios'
  );
  
  const backwoodsProducts = CATALOG_PRODUCTS.filter(
    p => p.category !== 'Vaporizadores' && p.category !== 'Accesorios'
  );

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation(); // Avoid opening the modal when clicking the button
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const handleOpenModal = (product: any) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <section id="coleccion" className={`section-padding ${styles.section}`}>
        <div className={`container`}>
          {/* HARDWARE SECTION */}
          <div className={styles.header}>
            <span className={styles.eyebrow}>HARDWARE & ACCESORIOS</span>
            <h2 className={styles.title}>Nuestra Selección de <span className="text-gold">Equipos</span></h2>
          </div>

          <div className={styles.productGrid}>
            {hardwareProducts.map((product, idx) => {
              const isAdded = addedItems[product.id];
              
              return (
                <motion.div 
                  key={product.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: (idx % 4) * 0.1 }}
                  className={styles.productCard}
                  onClick={() => handleOpenModal(product)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={styles.imageContainer}>
                    <Image 
                      src={encodeURI(product.image)} 
                      alt={product.title} 
                      fill 
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className={styles.productImage} 
                    />
                  </div>
                  
                  <div className={styles.contentContainer}>
                    <div className={styles.textGroup}>
                      <h3 className={styles.productTitle}>{product.title}</h3>
                      <p className={styles.productDesc}>{product.description}</p>
                    </div>
                    
                    <button 
                      onClick={(e) => handleAddToCart(e, product)} 
                      className={`${styles.actionBtn} ${isAdded ? styles.actionBtnSuccess : ''}`}
                    >
                      {isAdded ? (
                        <>
                          <span>Añadido</span>
                          <Check size={16} />
                        </>
                      ) : (
                        <>
                          <span>Añadir a Bolsa</span>
                          <ShoppingBag size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BACKWOODS SECTION */}
      <section id="backwoods" className={`section-padding ${styles.backwoodsSection}`}>
        <div className={`container`}>
          <div className={styles.backwoodsHeader}>
            <Image src="/logowoods.png" alt="Backwoods Logo" width={300} height={100} className={styles.bwLogo} />
          </div>

          <div className={styles.productGrid}>
            {backwoodsProducts.map((product, idx) => {
              const isAdded = addedItems[product.id];
              
              return (
                <motion.div 
                  key={product.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: (idx % 4) * 0.1 }}
                  className={styles.productCard}
                  onClick={() => handleOpenModal(product)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={styles.imageContainer}>
                    <Image 
                      src={encodeURI(product.image)} 
                      alt={product.title} 
                      fill 
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className={styles.productImage} 
                    />
                  </div>
                  
                  <div className={styles.contentContainer}>
                    <div className={styles.textGroup}>
                      <h3 className={styles.productTitle}>{product.title}</h3>
                      <p className={styles.productDesc}>{product.description}</p>
                    </div>
                    
                    <button 
                      onClick={(e) => handleAddToCart(e, product)} 
                      className={`${styles.actionBtn} ${isAdded ? styles.actionBtnSuccess : ''}`}
                    >
                      {isAdded ? (
                        <>
                          <span>Añadido</span>
                          <Check size={16} />
                        </>
                      ) : (
                        <>
                          <span>Añadir a Bolsa</span>
                          <ShoppingBag size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <ProductModal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        product={selectedProduct} 
      />
    </>
  );
}
