'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* FINAL CTA SECTION */}
      <div className={styles.ctaSection}>
        <div className="container">
          <motion.div 
            className={styles.ctaCard}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Background elements */}
            <div className={styles.ctaBgImage}></div>
            <div className={styles.ctaOverlay}></div>
            <div className={styles.ctaGlow}></div>
            <div className={styles.ctaNoise}></div>

            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Eleva tu <span className="text-gold">Experiencia.</span></h2>
              <p className={styles.ctaDesc}>Calidad premium, stock garantizado y servicio de excelencia. Agenda tu pedido minorista o mayorista hoy mismo.</p>
              
              <div className={styles.btnWrapper}>
                <a href="https://instagram.com/importadorabrazooka_" target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
                  <span>Contactar Asesor</span>
                  <ArrowUpRight size={18} />
                </a>
                <div className={styles.btnGlow}></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FOOTER LINKS */}
      <div className={styles.mainFooter}>
        <div className={`container ${styles.container}`}>
          
          <div className={styles.brandCol}>
            <Image 
              src="/logo_brazooka.png" 
              alt="Brazooka SPA Logo" 
              width={160} 
              height={42} 
              className={styles.logo}
            />
            <p className={styles.description}>
              Importadora de vaporizadores, backwoods y parafernalia premium. Elevamos el estándar con productos originales y logística de excelencia en todo Chile.
            </p>
            <div className={styles.social}>
              <a href="https://instagram.com/importadorabrazooka_" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.46 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
                <span>@importadorabrazooka_</span>
              </a>
            </div>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.linksTitle}>Navegación</h4>
            <Link href="/" className={styles.link}>Inicio</Link>
            <Link href="/catalogo" className={styles.link}>Catálogo</Link>
            <Link href="/faq" className={styles.link}>Preguntas Frecuentes</Link>
            <Link href="/comunidad" className={styles.link}>Comunidad</Link>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.linksTitle}>Atención Comercial</h4>
            <span className={styles.staticLink}>Lunes a Sábado</span>
            <span className={styles.staticLink}>10:00 - 19:00 hrs</span>
            <div className={styles.break}></div>
            <span className={styles.staticLink}>Despachos diarios</span>
            <span className={styles.staticLink}>Venta B2C / B2B</span>
          </div>

        </div>
        
        <div className={styles.bottomBar}>
          <div className="container">
            <p>&copy; {new Date().getFullYear()} Importadora Brazooka SPA. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
