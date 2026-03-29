'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, MessageCircle, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import styles from './InstagramSection.module.css';
import { INSTAGRAM_POSTS } from '../config/siteData';

export default function InstagramSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  // Auto-scroll logic (animaciones sutiles)
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;

        // If reached the end, scroll back to 0
        if (scrollLeft >= maxScroll - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll horizontally by one card width + gap approx
          const cardWidth = scrollRef.current.children[0]?.clientWidth || 350;
          scrollRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
        }
      }
    }, 4500); // Cambia cada 4.5 segundos

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

  return (
    <section id="reels" className={`section-padding ${styles.section}`}>
      <div className={`container`}>
        {/* Header Content */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <a href="https://instagram.com/importadorabrazooka_" target="_blank" rel="noopener noreferrer" className={styles.profileBadge}>
            <Image
              src="/logo_brazooka.png"
              alt="Brazooka Avatar"
              width={40}
              height={40}
              className={styles.avatar}
            />
            <div className={styles.badgeText}>
              <p className={styles.username}>@importadorabrazooka_</p>
              <p className={styles.followText}>Únete al club en Instagram</p>
            </div>
          </a>

          <h2 className={styles.title}>Comunidad <span className="text-gold">Activa</span></h2>
          <p className={styles.subtitle}>Stock real, entregas diarias y atención personalizada. Revisa nuestro feed y contacta a un asesor por DM.</p>
        </motion.div>

        {/* Posts Slider Layout */}
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
            {INSTAGRAM_POSTS.map((post) => (
              <a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.postCard}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={encodeURI(post.image)}
                    alt={post.tag}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.postImage}
                  />
                </div>

                <div className={styles.gradientOverlay}></div>

                {/* Top Elements */}
                <div className={styles.cardTop}>
                  <span className={styles.postTag}>{post.tag}</span>
                  <div className={styles.igIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.46 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Elements */}
                <div className={styles.cardBottom}>
                  <p className={styles.postText}>{post.text}</p>
                  <div className={styles.postStats}>
                    <div className={styles.statItem}>
                      <Heart size={18} fill="currentColor" />
                      <span>{post.likes}</span>
                    </div>
                    <div className={styles.statItem}>
                      <MessageCircle size={18} />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <button onClick={scrollRight} className={`${styles.navBtn} ${styles.nextBtn}`} aria-label="Ver siguiente">
            <ChevronRight size={24} />
          </button>
        </motion.div>

        <div className="text-center mt-12">
          <a href="https://instagram.com/importadorabrazooka_" target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
            <span>Ver feed completo</span>
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
