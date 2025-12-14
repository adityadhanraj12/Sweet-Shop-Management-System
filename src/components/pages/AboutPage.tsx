import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';
import { Heart, Users, Sparkles, Clock } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full bg-secondary py-24">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-secondary-foreground mb-6">
              Our Story
            </h1>
            <p className="text-xl font-paragraph text-secondary-foreground/80 leading-relaxed">
              A journey of passion, dedication, and the pursuit of sweet perfection
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="w-full bg-background py-24">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary mb-6">
                Where Tradition Meets Innovation
              </h2>
              <p className="text-lg font-paragraph text-secondary/80 mb-6 leading-relaxed">
                Founded in 2003, SweetShop began as a small family-owned confectionery with a simple mission: to create exceptional sweets that bring joy to every moment.
              </p>
              <p className="text-lg font-paragraph text-secondary/80 mb-6 leading-relaxed">
                Our master confectioners combine time-honored techniques with modern innovation, ensuring each creation is both nostalgic and exciting. We source only the finest ingredients from around the world, never compromising on quality.
              </p>
              <p className="text-lg font-paragraph text-secondary/80 leading-relaxed">
                Today, we're proud to serve thousands of satisfied customers, but our commitment remains unchanged: crafting sweets that create memories and spread happiness.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="https://static.wixstatic.com/media/103e37_87acd404c3934a31b82d555839aa64cb~mv2.png?originWidth=640&originHeight=448"
                alt="Our confectionery workshop"
                className="w-full h-auto"
                width={700}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full bg-background py-24">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary mb-4">
              Our Values
            </h2>
            <p className="text-lg font-paragraph text-secondary/70 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-background p-8 border border-secondary/10"
            >
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-secondary mb-3">
                Passion
              </h3>
              <p className="text-base font-paragraph text-secondary/70 leading-relaxed">
                Every sweet is crafted with love and dedication to our art
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-background p-8 border border-secondary/10"
            >
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-secondary mb-3">
                Quality
              </h3>
              <p className="text-base font-paragraph text-secondary/70 leading-relaxed">
                We never compromise on ingredients or craftsmanship
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-background p-8 border border-secondary/10"
            >
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-secondary mb-3">
                Tradition
              </h3>
              <p className="text-base font-paragraph text-secondary/70 leading-relaxed">
                Honoring time-tested recipes and techniques
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-background p-8 border border-secondary/10"
            >
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-secondary mb-3">
                Community
              </h3>
              <p className="text-base font-paragraph text-secondary/70 leading-relaxed">
                Building relationships with customers and suppliers
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full bg-secondary py-24">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary-foreground mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg font-paragraph text-secondary-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Our talented confectioners bring decades of combined experience and a shared passion for creating exceptional sweets. Each team member is dedicated to maintaining our high standards while pushing the boundaries of confectionery art.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
