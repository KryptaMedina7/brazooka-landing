'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Check, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import styles from './ProductSliderSection.module.css';
import { CATALOG_PRODUCTS } from '../config/siteData';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal';

export default function ProductSliderSection() {
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Seleccionamos un mix de productos (vapos y backwoods) limitados a 7 items
  const carouselProducts = CATALOG_PRODUCTS.slice(0, 7);

  // Optional: Auto-scroll logic if desired, similar to Instagram:
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        
        if (scrollLeft >= maxScroll - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          const cardWidth = scrollRef.current.children[0]?.clientWidth || 350;
          scrollRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
        }
      }
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      if (scrollRef.current.scrollLeft <= 10) {
        scrollRef.current.scrollTo({ left: scrollRef.current.scrollWidth, behavior: 'smooth' });
      } else {
        const cardWidth = scrollRef.current.children[0]?.clientWidth || 350;
        scrollRef.current.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' });
      }
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;

      if (scrollLeft >= maxScroll - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const cardWidth = scrollRef.current.children[0]?.clientWidth || 350;
        scrollRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
      }
    }
  };

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
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
      <section className={styles.section}>
        <div className="container">
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.eyebrow}>NUESTRO CATÁLOGO</span>
            <h2 className={styles.title}>Selección <span className="text-gold">Premium</span></h2>
            <p className={styles.subtitle}>Explora nuestros equipos favoritos y experimenta el siguiente nivel. Calidad certificada en cada hit.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className={styles.sliderWrapper}
          >
            <button onClick={scrollLeft} className={`${styles.navBtn} ${styles.prevBtn}`} aria-label="Ver anterior">
              <ChevronLeft size={24} />
            </button>

            <div className={styles.sliderTrack} ref={scrollRef}>
              {carouselProducts.map((product) => {
                const isAdded = addedItems[product.id];
                
                return (
                  <div 
                    key={product.id} 
                    className={styles.productCard}
                    onClick={() => handleOpenModal(product)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className={styles.imageContainer}>
                      <Image 
                        src={encodeURI(product.image)} 
                        alt={product.title} 
                        fill 
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                  </div>
                );
              })}
            </div>

            <button onClick={scrollRight} className={`${styles.navBtn} ${styles.nextBtn}`} aria-label="Ver siguiente">
              <ChevronRight size={24} />
            </button>
          </motion.div>

          <div className="text-center mt-12">
            <Link href="/catalogo" className={styles.primaryBtn}>
              <span>Ver Catálogo Completo</span>
              <ArrowRight size={18} />
            </Link>
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
