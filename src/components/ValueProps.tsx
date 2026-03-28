'use client';

import { motion } from 'framer-motion';
import { Truck, MessageSquare, Video, Store } from 'lucide-react';
import styles from './ValueProps.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as any } }
};

export default function ValueProps() {
  const props = [
    {
      icon: <Truck className={styles.icon} strokeWidth={1.5} />,
      title: "Despachos Nacionales",
      description: "Logística asegurada a todo Chile con seguimiento en línea para tu tranquilidad."
    },
    {
      icon: <MessageSquare className={styles.icon} strokeWidth={1.5} />,
      title: "Asesoría Directa",
      description: "Atención personalizada vía DM. Resolvemos tus inquietudes comerciales al instante."
    },
    {
      icon: <Video className={styles.icon} strokeWidth={1.5} />,
      title: "Transparencia de Stock",
      description: "Disponibilidad visual garantizada. Agenda una videollamada para verificar tu selección."
    },
    {
      icon: <Store className={styles.icon} strokeWidth={1.5} />,
      title: "Venta Mayorista",
      description: "Condiciones exclusivas y abastecimiento continuo para tu negocio o emprendimiento."
    }
  ];

  return (
    <section className={`section-padding ${styles.section}`}>
      <div className={`container`}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.eyebrow}>CONFIANZA Y FORMALIDAD</div>
          <h2 className={styles.title}>Estándar <span className="text-gold">Brazooka</span></h2>
          <p className={styles.subtitle}>
            Una experiencia de compra segura, transparente y diseñada para clientes exigentes.
          </p>
        </motion.div>
        
        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {props.map((prop, idx) => (
            <motion.div key={idx} variants={itemVariants} className={`glass-panel ${styles.card}`}>
              <div className={styles.iconWrapper}>
                {prop.icon}
              </div>
              <h3 className={styles.cardTitle}>{prop.title}</h3>
              <p className={styles.cardDesc}>{prop.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
