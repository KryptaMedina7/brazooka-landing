'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './HowToBuy.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const stepVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as any } }
};

export default function HowToBuy() {
  const steps = [
    {
      number: "01",
      title: "Exploración & Curaduría",
      description: "Revisa nuestro catálogo en línea o vitrina de Instagram para identificar las piezas de tu interés."
    },
    {
      number: "02",
      title: "Contacto Directo",
      description: "Escríbenos vía DM. Un asesor dedicado confirmará disponibilidad inmediata y precios actualizados."
    },
    {
      number: "03",
      title: "Confirmación & Pagos",
      description: "Validamos tu pedido (opción de videollamada para mayor seguridad comercial) y coordinamos el pago seguro."
    },
    {
      number: "04",
      title: "Logística Segura",
      description: "Despachamos de forma inmediata a todo Chile. Te enviamos el comprobante para seguimiento en tiempo real."
    }
  ];

  return (
    <section id="proceso" className={`section-padding ${styles.section}`}>
      <div className={`container`}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.eyebrow}>METODOLOGÍA B2C/B2B</div>
          <h2 className={styles.title}>Proceso de <span className="text-gold">Adquisición</span></h2>
          <p className={styles.subtitle}>Un flujo de compra optimizado para ser rápido, seguro y transparente.</p>
        </motion.div>

        <motion.div 
          className={styles.stepsLayout}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, idx) => (
            <motion.div key={idx} variants={stepVariants} className={styles.stepCard}>
              <div className={styles.stepNumber}>{step.number}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className={`glass-panel ${styles.ctaBanner}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.bannerContent}>
            <h3>¿Listo para elevar tu experiencia?</h3>
            <p>Cotiza tu pedido minorista o solicita catalogo mayorista con atención prioritaria.</p>
          </div>
          <div className={styles.bannerActions}>
            <a href="https://instagram.com/importadorabrazooka_" target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
              Contactar a un Asesor
              <ArrowRight size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
