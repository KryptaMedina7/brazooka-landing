'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  // Parallax: pixel values stay on GPU compositor (no layout recalc)
  const y = useTransform(scrollYProgress, [0, 1], ["0px", "150px"]);

  return (
    <section ref={ref} className={styles.hero} style={{ overflow: "hidden" }}>
      {/* Background Image Wrapper */}
      <motion.div className={styles.imageWrapper} style={{ y, willChange: "transform" }}>
        <Image
          src="/site/hero-bg.png"
          alt="Brazooka SPA Premium Collection"
          fill
          priority
          sizes="100vw"
          className={styles.bgImage}
        />
        <div className={styles.overlay}></div>
      </motion.div>

      {/* Hero Content */}
      <div className={`container ${styles.content}`}>
        <motion.div 
          className={styles.textContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className={styles.badge}
          >
            SANTIAGO, CHILE • ENVÍOS NACIONALES
          </motion.div>

          <h1 className={styles.title}>
            Curaduría en vaporizadores y <span className="text-gold">cultura premium.</span>
          </h1>
          
          <p className={styles.subtitle}>
            Una selección exclusiva de accesorios, equipos y extractos. Descubre nuestra colección con stock garantizado y atención personalizada.
          </p>

          <div className={styles.buttonGroup}>
            <Link href="/catalogo" className={styles.primaryBtn}>
              Explorar Colección
            </Link>
            
            <a 
              href="https://instagram.com/importadorabrazooka_" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.secondaryBtn}
            >
              Consultar Disponibilidad
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
