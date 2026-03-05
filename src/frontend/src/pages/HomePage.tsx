import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Disc3,
  Globe,
  Mic,
  Play,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const STATS = [
  { label: "Signed Artists", value: "24+" },
  { label: "Releases", value: "200+" },
  { label: "Countries", value: "40+" },
  { label: "Streams", value: "1B+" },
];

const FEATURES = [
  {
    icon: Mic,
    title: "Artist Development",
    desc: "We cultivate talent from the ground up, providing full creative support, production resources, and career guidance to every artist on our roster.",
  },
  {
    icon: Globe,
    title: "Global Distribution",
    desc: "Your music on every platform, in every territory. GOAT Music's distribution network reaches 150+ streaming services and 40+ countries worldwide.",
  },
  {
    icon: Award,
    title: "Award-Winning Catalog",
    desc: "From Grammy nominees to platinum-certified releases, our catalog represents the pinnacle of contemporary music across all major genres.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-bg.dim_1600x900.jpg"
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-background/60" />
          {/* Radial gold glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 60%, oklch(0.78 0.16 68 / 0.08) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          {/* Label pill */}
          <motion.div variants={item} className="mb-8 flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-gold/30 rounded-full text-xs font-body uppercase tracking-[0.2em] text-gold bg-gold/5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Premium Music Label
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={item}
            className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight mb-6 text-foreground"
          >
            <span className="block">THE</span>
            <span
              className="block"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.85 0.2 75) 0%, oklch(0.78 0.16 68) 50%, oklch(0.6 0.12 68) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              G.O.A.T.
            </span>
            <span className="block text-foreground/80">STANDARD</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={item}
            className="font-body text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            GOAT Music Company — home to the world's most exceptional artists.
            We don't follow the industry; we define it.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/roster">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider gap-2 px-8 h-12 shadow-gold"
              >
                Discover Artists
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/catalog">
              <Button
                variant="outline"
                size="lg"
                className="border-border hover:border-gold/50 hover:text-gold font-bold uppercase tracking-wider gap-2 px-8 h-12 transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                Browse Catalog
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="w-px h-8 bg-gradient-to-b from-gold/60 to-transparent"
          />
        </motion.div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border bg-card/40 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={item}
                className="text-center"
              >
                <div
                  className="font-display font-black text-4xl sm:text-5xl"
                  style={{ color: "oklch(var(--gold))" }}
                >
                  {stat.value}
                </div>
                <div className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={container}
            className="mb-16 text-center"
          >
            <motion.p
              variants={item}
              className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4"
            >
              Why GOAT Music
            </motion.p>
            <motion.h2
              variants={item}
              className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-foreground"
            >
              Redefining the
              <br />
              <span className="text-muted-foreground">Music Business</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={container}
            className="grid md:grid-cols-3 gap-px bg-border"
          >
            {FEATURES.map((feat) => (
              <motion.div
                key={feat.title}
                variants={item}
                className="bg-background p-8 lg:p-12 group hover:bg-card transition-colors"
              >
                <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feat.icon
                    className="w-5 h-5"
                    style={{ color: "oklch(var(--gold))" }}
                  />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">
                  {feat.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.78 0.16 68 / 0.07) 0%, transparent 70%)",
          }}
        />
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
          >
            <motion.p
              variants={item}
              className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-6"
            >
              Full Roster & Catalog
            </motion.p>
            <motion.h2
              variants={item}
              className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-foreground mb-8"
            >
              Explore Our
              <br />
              <span className="text-gold">Universe</span>
            </motion.h2>
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/roster">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider gap-2 px-10 h-14 text-base shadow-gold"
                >
                  <Users className="w-5 h-5" />
                  Our Artists
                </Button>
              </Link>
              <Link to="/catalog">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-border hover:border-gold/50 hover:text-gold font-bold uppercase tracking-wider gap-2 px-10 h-14 text-base transition-all"
                >
                  <Disc3 className="w-5 h-5" />
                  All Releases
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
