'use client';

import { motion } from 'framer-motion';
import styles from './AboutBrand.module.css';

export default function AboutBrand() {
  return (
    <section id="nosotros" className={`section-padding ${styles.section}`}>
      <div className={`container ${styles.container}`}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.eyebrow}>NUESTRO MANIFIESTO</div>
          <h2 className={styles.title}>
            No somos solo una vitrina. Somos <span className="text-gold">curadores</span> de experiencias.
          </h2>
          
          <div className={styles.paragraphs}>
            <p>
              Brazooka nace para elevar el estándar de consumo en Chile. No nos interesa tener un catálogo infinito de productos genéricos; seleccionamos meticulosamente cada equipo, accesorio y extracto que entra a nuestro inventario.
            </p>
            <p>
              Sabemos que nuestros clientes valoran la estética, el performance y la confiabilidad. Es por eso que detrás de cada venta, hay una prueba exhaustiva y un compromiso de autenticidad formal.
            </p>
          </div>
          
          <div className={styles.stats}>
            <div className={styles.statBox}>
              <span className={styles.statNum}>100%</span>
              <span className={styles.statLabel}>Autenticidad Asegurada</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNum}>24h</span>
              <span className={styles.statLabel}>Respuesta en Línea</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
