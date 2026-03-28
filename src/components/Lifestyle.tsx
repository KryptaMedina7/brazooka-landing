'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './Lifestyle.module.css';

export default function Lifestyle() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-60px", "60px"]);

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.grid}>
        
        {/* Text Content */}
        <div className={styles.content}>
          <motion.div 
            className={styles.textContent}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className={styles.tag}>EXPERIENCIA PREMIUM</span>
            <h2 className={styles.title}>Más que un producto, <br/><span className="text-gold">un estilo de vida.</span></h2>
            <div className={styles.divider}></div>
            <p className={styles.description}>
              Ya sea en la ciudad, en la playa o en tu propio espacio, nuestra curaduría está pensada para acompañarte aportando diseño, discreción y performance.
            </p>
            <p className={styles.description}>
              Accede a ediciones limitadas y colaboraciones exclusivas. Elevamos el consumo a una experiencia estética y sensorial superior.
            </p>
            
            <a href="https://instagram.com/importadorabrazooka_" target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
              <span>Únete al club</span>
              <ArrowRight size={18} className={styles.ctaIcon} />
            </a>
          </motion.div>
        </div>

        {/* Image Content */}
        <div className={styles.imageBlock} style={{ overflow: "hidden" }}>
          <motion.div
            className={styles.imageWrapper}
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ y, willChange: "transform" }}
          >
            <div className={styles.imageOverlay} />
            <Image
              src="/site/lifestyle-bg.png"
              alt="Estilo de vida Brazooka"
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className={styles.overlay}></div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
