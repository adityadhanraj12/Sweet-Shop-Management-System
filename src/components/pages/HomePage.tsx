// HPI 1.6-V
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { ArrowRight, Star, Package, Clock, ShieldCheck, ChefHat, Heart } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Utility Components ---

type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            element.classList.add('is-visible');
          }, delay);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out opacity-0 translate-y-12 motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 ${className || ''}`}
    >
      {children}
    </div>
  );
};

const Marquee: React.FC<{ text: string; repeat?: number }> = ({ text, repeat = 4 }) => {
  return (
    <div className="relative flex overflow-hidden bg-primary py-6 text-primary-foreground">
      <div className="animate-marquee whitespace-nowrap flex gap-8 items-center">
        {Array.from({ length: repeat }).map((_, i) => (
          <span key={i} className="text-2xl md:text-4xl font-heading font-bold uppercase tracking-wider flex items-center gap-8">
            {text} <Star className="w-6 h-6 fill-current" />
          </span>
        ))}
        {Array.from({ length: repeat }).map((_, i) => (
          <span key={`dup-${i}`} className="text-2xl md:text-4xl font-heading font-bold uppercase tracking-wider flex items-center gap-8">
            {text} <Star className="w-6 h-6 fill-current" />
          </span>
        ))}
      </div>
      <style>{`
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

// --- Main Page Component ---

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <div className="w-full bg-background text-secondary overflow-clip">
      
      {/* 1. HERO SECTION - Split Layout based on Inspiration */}
      <section className="relative w-full min-h-screen flex flex-col lg:flex-row">
        {/* Left: Typography & Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20 lg:py-0 bg-background z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block py-1 px-3 border border-secondary/20 rounded-full text-xs font-bold tracking-widest uppercase mb-8 text-primary">
              Est. 2024
            </span>
            <h1 className="text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem] font-heading font-black leading-[0.9] tracking-tight mb-8 text-secondary">
              Modern
              <br />
              Sweet
              <br />
              <span className="text-primary">Studio</span>
            </h1>
            <p className="text-lg md:text-xl font-paragraph text-secondary/70 max-w-md mb-10 leading-relaxed">
              Amplify your senses with our data-driven approach to artisanal confectionery. Precision-crafted flavors for the modern palate.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/store">
                <Button size="lg" className="h-16 px-10 text-lg font-bold rounded-none bg-primary hover:bg-primary/90 text-white transition-all duration-300">
                  START TASTING
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="h-16 px-10 text-lg font-bold rounded-none border-2 border-secondary hover:bg-secondary hover:text-white transition-all duration-300">
                  OUR STORY
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right: Full Bleed Image */}
        <div className="w-full lg:w-1/2 h-[60vh] lg:h-auto relative bg-secondary/5 overflow-hidden">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full h-full"
          >
            <Image
              src="https://static.wixstatic.com/media/103e37_7f9a25320eb040f98636df84f20a61aa~mv2.png?originWidth=1152&originHeight=896"
              alt="Artistic display of premium handcrafted sweets"
              className="w-full h-full object-cover"
              width={1200}
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* 2. MARQUEE SEPARATOR */}
      <Marquee text="Premium Quality • Handcrafted Daily • Global Sourcing •" />

      {/* 3. STICKY NARRATIVE SECTION - "The Process" */}
      <section className="relative w-full max-w-[120rem] mx-auto py-32 px-6 md:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          {/* Sticky Title Column */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <AnimatedElement>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-none mb-6">
                  The
                  <br />
                  <span className="text-primary">Process</span>
                </h2>
                <div className="w-24 h-2 bg-secondary mb-8" />
                <p className="text-lg font-paragraph text-secondary/70 max-w-xs">
                  We combine traditional techniques with modern precision to create unforgettable experiences.
                </p>
              </AnimatedElement>
            </div>
          </div>

          {/* Scrolling Content Column */}
          <div className="lg:w-2/3 flex flex-col gap-32 lg:pt-32">
            {/* Card 1 */}
            <AnimatedElement className="group">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="aspect-[4/5] overflow-hidden bg-secondary/5 relative">
                  <Image
                    src="https://static.wixstatic.com/media/103e37_980c246c608340eba37b3bcad5539b2d~mv2.png?originWidth=576&originHeight=704"
                    alt="Premium ingredients selection"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    width={600}
                  />
                </div>
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-full text-primary">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-heading font-bold">Sourced with Integrity</h3>
                  <p className="text-secondary/70 leading-relaxed">
                    We scour the globe for the finest cacao, freshest vanilla beans, and organic fruits. Every ingredient is vetted for quality and sustainability.
                  </p>
                </div>
              </div>
            </AnimatedElement>

            {/* Card 2 */}
            <AnimatedElement className="group">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
                <div className="order-2 md:order-1 space-y-6">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-full text-primary">
                    <ChefHat className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-heading font-bold">Master Craftsmanship</h3>
                  <p className="text-secondary/70 leading-relaxed">
                    Our confectioners are artists. With decades of experience, they hand-temper chocolate and spin sugar with surgical precision.
                  </p>
                </div>
                <div className="order-1 md:order-2 aspect-[4/5] overflow-hidden bg-secondary/5 relative">
                  <Image
                    src="https://static.wixstatic.com/media/103e37_7657385340974d8cbf052c7ff57e57f8~mv2.png?originWidth=576&originHeight=704"
                    alt="Chef crafting sweets"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    width={600}
                  />
                </div>
              </div>
            </AnimatedElement>

            {/* Card 3 */}
            <AnimatedElement className="group">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="aspect-[4/5] overflow-hidden bg-secondary/5 relative">
                  <Image
                    src="https://static.wixstatic.com/media/103e37_aa28179521104edd8b51be7891a2c877~mv2.png?originWidth=576&originHeight=704"
                    alt="Elegant packaging and delivery"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    width={600}
                  />
                </div>
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-full text-primary">
                    <Package className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-heading font-bold">White Glove Delivery</h3>
                  <p className="text-secondary/70 leading-relaxed">
                    From our kitchen to your doorstep, we ensure your sweets arrive in pristine condition, ready to create a moment of joy.
                  </p>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* 4. FULL BLEED PARALLAX BREATHER */}
      <section className="relative w-full h-[80vh] overflow-hidden flex items-center justify-center">
        <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <Image
            src="https://static.wixstatic.com/media/103e37_4782ad4bdf634930b42058d08eb1dd09~mv2.png?originWidth=1920&originHeight=1024"
            alt="Macro shot of sugar texture"
            className="w-full h-full object-cover brightness-50"
            width={1920}
          />
        </motion.div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <AnimatedElement>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-8 leading-tight">
              "Taste is the only truth."
            </h2>
            <Link to="/store">
              <Button size="lg" className="bg-white text-secondary hover:bg-white/90 h-14 px-8 text-lg font-bold rounded-none">
                EXPLORE THE MENU
              </Button>
            </Link>
          </AnimatedElement>
        </div>
      </section>

      {/* 5. FEATURED CATEGORIES GRID */}
      <section className="w-full max-w-[120rem] mx-auto py-32 px-6 md:px-12 lg:px-24 bg-background">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-secondary/10 pb-8">
          <AnimatedElement>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">Curated Collections</h2>
          </AnimatedElement>
          <AnimatedElement delay={200}>
            <Link to="/store" className="group flex items-center gap-2 text-lg font-bold hover:text-primary transition-colors mt-4 md:mt-0">
              View All Products <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Artisan Chocolates", desc: "Single-origin cacao blends", img: "https://static.wixstatic.com/media/103e37_1fefcfee963f45caa69568f72f2afea3~mv2.png?originWidth=448&originHeight=640" },
            { title: "Gourmet Gummies", desc: "Real fruit extracts", img: "https://static.wixstatic.com/media/103e37_79216206812742a6a915299d28f6bd91~mv2.png?originWidth=448&originHeight=640" },
            { title: "French Pastries", desc: "Baked fresh every morning", img: "https://static.wixstatic.com/media/103e37_024c151d9661448294984302bf40e10f~mv2.png?originWidth=448&originHeight=640" }
          ].map((item, index) => (
            <AnimatedElement key={index} delay={index * 150} className="group cursor-pointer">
              <Link to="/store" className="block">
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary/5 mb-6">
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 z-10" />
                  <Image
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    width={500}
                  />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-secondary/60">{item.desc}</p>
              </Link>
            </AnimatedElement>
          ))}
        </div>
      </section>

      {/* 6. STATS & TRUST SECTION */}
      <section className="w-full bg-secondary text-secondary-foreground py-32">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-white/10 pt-12">
            {[
              { label: "Years of Excellence", value: "20+" },
              { label: "Unique Flavors", value: "150+" },
              { label: "Happy Customers", value: "50k+" },
              { label: "Organic Ingredients", value: "100%" },
            ].map((stat, i) => (
              <AnimatedElement key={i} delay={i * 100}>
                <div className="flex flex-col">
                  <span className="text-5xl md:text-6xl font-heading font-bold text-primary mb-4">{stat.value}</span>
                  <span className="text-lg font-paragraph text-white/80 uppercase tracking-wider">{stat.label}</span>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="w-full py-32 px-6 md:px-12 lg:px-24 bg-background flex flex-col items-center text-center">
        <AnimatedElement>
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 text-primary">
            <Heart className="w-10 h-10 fill-current" />
          </div>
          <h2 className="text-5xl md:text-7xl font-heading font-black mb-8 max-w-4xl mx-auto">
            Ready to indulge in <span className="text-primary">perfection?</span>
          </h2>
          <p className="text-xl text-secondary/70 max-w-2xl mx-auto mb-12">
            Join our community of sweet lovers and experience the difference that passion makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md mx-auto">
            <Link to="/store" className="w-full">
              <Button size="lg" className="w-full h-16 text-lg font-bold bg-secondary text-white hover:bg-secondary/90 rounded-none">
                SHOP NOW
              </Button>
            </Link>
          </div>
        </AnimatedElement>
      </section>

    </div>
  );
}