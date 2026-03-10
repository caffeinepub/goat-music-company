import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clapperboard, Mic2, Shield } from "lucide-react";
import { motion } from "motion/react";

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

const DIVISIONS = [
  {
    id: "recordings",
    to: "/recordings",
    label: "GOAT Recordings",
    subtitle: "Music Label",
    description:
      "Our flagship music label — home to chart-topping artists across hip-hop, R&B, electronic, and beyond. Every release carries the GOAT standard of excellence.",
    icon: Mic2,
    badge: null,
    accent: "oklch(0.75 0.18 210)",
    ocid: "home.recordings.card",
  },
  {
    id: "comics",
    to: "/comics",
    label: "StripClub Comics",
    subtitle: "Comic Imprint",
    description:
      "GOAT Enterprise's bold comic book imprint. Boundary-pushing stories told without compromise — strips that take it to the edge.",
    icon: BookOpen,
    badge: "12+",
    accent: "oklch(0.72 0.22 25)",
    ocid: "home.comics.card",
  },
  {
    id: "actors",
    to: "/actors",
    label: "GOAT Actors",
    subtitle: "Talent Division",
    description:
      "A curated roster of exceptional performing talent operating under the GOAT enterprise umbrella. Versatile. Disciplined. Unforgettable.",
    icon: Clapperboard,
    badge: null,
    accent: "oklch(0.75 0.15 270)",
    ocid: "home.actors.card",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-bg.dim_1600x900.jpg"
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-background/65" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 60%, oklch(0.75 0.18 210 / 0.1) 0%, transparent 70%)",
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
            <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-ice/30 rounded-full text-xs font-body uppercase tracking-[0.2em] text-ice bg-ice/5">
              <span className="w-1.5 h-1.5 rounded-full bg-ice animate-pulse" />
              Enterprise License
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
                  "linear-gradient(135deg, oklch(0.88 0.22 200) 0%, oklch(0.75 0.18 210) 50%, oklch(0.55 0.12 220) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              G.O.A.T.
            </span>
            <span className="block text-foreground/80">ENTERPRISE</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={item}
            className="font-body text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed"
          >
            Recordings. Comics. Talent.
          </motion.p>
          <motion.p
            variants={item}
            className="font-body text-base text-muted-foreground/70 max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Three divisions. One enterprise license. An uncompromising standard
            of creative excellence across music, print, and performance.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/recordings" data-ocid="home.recordings.primary_button">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider gap-2 px-8 h-12 shadow-ice"
              >
                Explore Divisions
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/comics" data-ocid="home.comics.secondary_button">
              <Button
                variant="outline"
                size="lg"
                className="border-border hover:border-ice/50 hover:text-ice font-bold uppercase tracking-wider gap-2 px-8 h-12 transition-all"
              >
                <BookOpen className="w-4 h-4" />
                StripClub Comics
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
            className="w-px h-8 bg-gradient-to-b from-ice/60 to-transparent"
          />
        </motion.div>
      </section>

      {/* Divisions section */}
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
              className="font-body text-xs uppercase tracking-[0.3em] text-ice mb-4"
            >
              Our Divisions
            </motion.p>
            <motion.h2
              variants={item}
              className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-foreground"
            >
              Three Arms,
              <br />
              <span className="text-muted-foreground">One Vision</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={container}
            className="grid md:grid-cols-3 gap-6"
          >
            {DIVISIONS.map((div) => (
              <motion.div key={div.id} variants={item}>
                <Link
                  to={div.to}
                  data-ocid={div.ocid}
                  className="group block h-full"
                >
                  <div
                    className="relative h-full bg-card border border-border p-8 lg:p-10 hover:border-opacity-60 transition-all duration-300 hover:shadow-card overflow-hidden"
                    style={{
                      ["--div-accent" as string]: div.accent,
                    }}
                  >
                    {/* Background glow on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse 70% 50% at 30% 30%, ${div.accent}10 0%, transparent 70%)`,
                      }}
                    />

                    {/* Icon + badge row */}
                    <div className="flex items-start justify-between mb-6 relative z-10">
                      <div
                        className="w-14 h-14 rounded-sm flex items-center justify-center"
                        style={{ background: `${div.accent}18` }}
                      >
                        <div.icon
                          className="w-6 h-6"
                          style={{ color: div.accent }}
                        />
                      </div>
                      {div.badge && (
                        <Badge
                          className="font-display font-black text-sm px-3 py-1 border-0 rounded-sm"
                          style={{
                            background: `${div.accent}25`,
                            color: div.accent,
                          }}
                        >
                          {div.badge}
                        </Badge>
                      )}
                    </div>

                    {/* Text */}
                    <div className="relative z-10">
                      <p
                        className="font-body text-xs uppercase tracking-[0.2em] mb-2"
                        style={{ color: div.accent }}
                      >
                        {div.subtitle}
                      </p>
                      <h3 className="font-display font-black text-2xl lg:text-3xl text-foreground mb-4 leading-tight">
                        {div.label}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
                        {div.description}
                      </p>
                      <div
                        className="flex items-center gap-2 font-body text-xs font-bold uppercase tracking-wider transition-all duration-200 group-hover:gap-3"
                        style={{ color: div.accent }}
                      >
                        Explore
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: div.accent }}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enterprise License section */}
      <section className="py-20 px-4 border-t border-border relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.75 0.18 210 / 0.06) 0%, transparent 70%)",
          }}
        />
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
            className="text-center"
          >
            <motion.div
              variants={item}
              className="w-16 h-16 rounded-sm bg-primary/10 flex items-center justify-center mx-auto mb-8"
            >
              <Shield
                className="w-7 h-7"
                style={{ color: "oklch(var(--ice))" }}
              />
            </motion.div>
            <motion.p
              variants={item}
              className="font-body text-xs uppercase tracking-[0.3em] text-ice mb-4"
            >
              GOAT Enterprise License
            </motion.p>
            <motion.h2
              variants={item}
              className="font-display font-black text-4xl sm:text-5xl text-foreground mb-6"
            >
              One License.
              <br />
              Three Divisions.
            </motion.h2>
            <motion.p
              variants={item}
              className="font-body text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10 text-base"
            >
              GOAT Recordings, StripClub Comics, and GOAT Actors all operate
              under the unified GOAT Enterprise License — a single legal and
              creative framework that ensures quality, ownership, and
              accountability across every creative vertical.
            </motion.p>

            <motion.div
              variants={item}
              className="grid sm:grid-cols-3 gap-px bg-border max-w-2xl mx-auto"
            >
              {[
                { label: "GOAT Recordings", desc: "Music Label" },
                { label: "StripClub Comics", desc: "Comic Imprint" },
                { label: "GOAT Actors", desc: "Talent Division" },
              ].map((div) => (
                <div
                  key={div.label}
                  className="bg-background px-6 py-5 text-center"
                >
                  <p className="font-display font-bold text-sm text-foreground mb-1">
                    {div.label}
                  </p>
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                    {div.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
