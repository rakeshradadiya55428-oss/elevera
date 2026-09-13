import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const FadeIn = ({ children, delay = 0, y = 20, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
)

const About = () => {
  return (
    <div className="pt-0 pb-0">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80"
          alt="Atelier"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-elvara-black via-elvara-black/40 to-transparent" />
        <div className="relative z-10 elvara-container pb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="elvara-subheading mb-4"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-7xl text-elvara-ivory max-w-2xl leading-tight"
          >
            The Pursuit of<br />
            <em className="italic font-light">Perfection</em>
          </motion.h1>
        </div>
      </section>

      {/* Story */}
      <section className="elvara-section elvara-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn y={30}>
            <div className="space-y-6">
              <p className="elvara-subheading">Founded 2018</p>
              <h2 className="font-serif text-3xl md:text-4xl text-elvara-ivory leading-tight">
                From a Milan Atelier<br />to a Global Maison
              </h2>
              <div className="w-10 h-px bg-elvara-gold/50" />
              <p className="font-sans text-elvara-ivory/65 text-sm leading-loose">
                ÉLVARA was born from a singular obsession: to create objects so beautiful they transcend their function. Founded by designer Elena Varese in a small atelier in Milan's Via Montenapoleone, the maison has grown into a global symbol of refined taste without ever compromising its founding principles.
              </p>
              <p className="font-sans text-elvara-ivory/65 text-sm leading-loose">
                Elena's childhood spent watching her father — a master leather craftsman — instilled in her a reverence for the handmade. Every decision at ÉLVARA flows from that reverence: materials are sourced in person, artisans are chosen for skill not speed, and no piece leaves the atelier until it meets the standard we call "ÉLVARA perfect."
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2} y={30}>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80"
                  alt="Founder"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 w-24 h-24 border border-elvara-gold/25" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Philosophy pillars */}
      <section className="elvara-section bg-elvara-charcoal">
        <div className="elvara-container">
          <FadeIn className="text-center mb-16">
            <p className="elvara-subheading mb-4">What We Believe</p>
            <h2 className="font-serif text-4xl text-elvara-ivory">Our Philosophy</h2>
            <div className="gold-line mt-5" />
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {[
              {
                num: '01',
                title: 'Craft Over Speed',
                text: 'Every piece requires the time it deserves. We will never sacrifice quality for volume. Some pieces take 400+ hours to complete — and that is exactly as it should be.',
              },
              {
                num: '02',
                title: 'Materials Matter',
                text: 'We source leathers from tanneries in Córdoba, metals from artisans in Florence, and textiles from mills in Biella. The best materials, wherever they are found.',
              },
              {
                num: '03',
                title: 'Timeless Over Trendy',
                text: 'We do not design for seasons. An ÉLVARA piece should look as relevant in 2040 as it does today. We create objects to be passed down, not replaced.',
              },
            ].map((item) => (
              <FadeIn key={item.num} className="border border-elvara-gold/10 p-10">
                <p className="font-serif text-elvara-gold/40 text-5xl mb-6">{item.num}</p>
                <h3 className="font-serif text-elvara-ivory text-2xl mb-4">{item.title}</h3>
                <p className="font-sans text-elvara-ivory/55 text-sm leading-loose">{item.text}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 elvara-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '2018', label: 'Year Founded' },
            { value: '40+',  label: 'Master Artisans' },
            { value: '14',   label: 'Countries' },
            { value: '100%', label: 'Handcrafted' },
          ].map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <p className="font-serif text-elvara-gold text-4xl md:text-5xl mb-2">{stat.value}</p>
              <p className="font-sans text-elvara-ivory/40 text-xs tracking-[0.2em] uppercase">{stat.label}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Sustainability */}
      <section className="elvara-section bg-elvara-charcoal">
        <div className="elvara-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn delay={0.15} y={30}>
              <div className="aspect-video overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80"
                  alt="Sustainability"
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeIn>
            <FadeIn y={30}>
              <div>
                <p className="elvara-subheading mb-5">Responsibility</p>
                <h2 className="font-serif text-3xl md:text-4xl text-elvara-ivory mb-6">
                  Beautiful Things,<br />Responsibly Made
                </h2>
                <p className="font-sans text-elvara-ivory/65 text-sm leading-loose mb-5">
                  True luxury cannot come at the expense of our planet or its people. We are committed to ethical sourcing, fair wages, and responsible production at every step of our supply chain.
                </p>
                <p className="font-sans text-elvara-ivory/65 text-sm leading-loose mb-8">
                  By 2026, we will be carbon neutral across all operations. Our packaging is 100% recyclable. Our goal is not just to make beautiful things — but to make them beautifully.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { v: '100%', l: 'Ethical Sourcing' },
                    { v: '45%',  l: 'Recycled Materials' },
                    { v: '2026', l: 'Carbon Neutral Goal' },
                    { v: '100%', l: 'Sustainable Packaging' },
                  ].map((s) => (
                    <div key={s.l} className="border border-elvara-gold/15 p-4">
                      <p className="font-serif text-elvara-gold text-2xl mb-1">{s.v}</p>
                      <p className="font-sans text-elvara-ivory/40 text-xs tracking-wider">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 elvara-container text-center">
        <FadeIn>
          <p className="elvara-subheading mb-5">Experience It</p>
          <h2 className="font-serif text-4xl md:text-5xl text-elvara-ivory mb-8">
            Discover the Collection
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop" className="elvara-btn-primary">
              Shop Now
            </Link>
            <Link to="/atelier" className="elvara-btn-secondary">
              Visit Atelier
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}

export default About
