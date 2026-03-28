'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import styles from './FAQ.module.css';

const faqs = [
  {
    q: "¿Tienen tienda física?",
    a: "Operamos 100% online con bodega prioritaria en Santiago. Esto nos permite mantener agilidad en nuestros envíos y atención directa. Para total transparencia, podemos agendar una videollamada y mostrarte nuestro catálogo en tiempo real."
  },
  {
    q: "¿Realizan despachos fuera de Santiago?",
    a: "Sí, enviamos a todo el país mediante Starken, Chilexpress y BlueExpress. Los despachos se procesan y envían con máxima celeridad para que recibas tu pedido a la brevedad."
  },
  {
    q: "¿Están garantizados los productos?",
    a: "Absolutamente. Trabajamos bajo estrictos estándares. Todos nuestros vaporizadores y accesorios provienen de fábrica original y cuentan con sistemas de verificación, asegurando el rendimiento prometido."
  },
  {
    q: "¿Manejan opciones para mayoristas?",
    a: "Por supuesto. Contamos con estructura comercial para venta al detalle y al por mayor. Entregamos condiciones competitivas y prioridad de stock a nuestros clientes B2B. Consúltanos directamente."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(prev => prev === idx ? null : idx);
  };

  return (
    <section id="faq" className={`section-padding ${styles.section}`}>
      <div className={`container`}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className={styles.eyebrow}>PREGUNTAS FRECUENTES</div>
          <h2 className={styles.title}>Claridad en cada <span className="text-gold">detalle.</span></h2>
        </motion.div>

        <div className={styles.grid}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div 
                key={idx} 
                className={`${styles.faqCard} ${isOpen ? styles.faqCardOpen : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <button className={styles.questionBtn} onClick={() => toggle(idx)}>
                  <h3 className={styles.question}>{faq.q}</h3>
                  <ChevronDown 
                    size={20} 
                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} 
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className={styles.answerWrapper}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <p className={styles.answer}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
