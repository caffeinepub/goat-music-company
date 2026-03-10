import { Button } from "@/components/ui/button";
import { ExternalLink, Zap } from "lucide-react";
import { motion } from "motion/react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

const COMICS_URL = "https://stripclub-comics26-7om.caffeine.xyz/";

const PILLARS = [
  {
    title: "No Filters",
    desc: "StripClub Comics is where the rules end. We publish stories that challenge, provoke, and resonate.",
  },
  {
    title: "Bold Visuals",
    desc: "Every panel is crafted with intention — raw linework, high-contrast color, and layouts that command attention.",
  },
  {
    title: "12+ Audience",
    desc: "Mature themes handled with craft and responsibility. Content rated 12+ for audiences who are ready for something real.",
  },
];

export default function ComicsPage() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero — darker, more intense */}
      <section
        className="relative py-28 px-4 overflow-hidden"
        style={{ background: "oklch(0.08 0.04 240)" }}
      >
        {/* Angled accent lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                -45deg,
                oklch(0.72 0.22 25 / 0.03) 0px,
                oklch(0.72 0.22 25 / 0.03) 1px,
                transparent 1px,
                transparent 40px
              )
            `,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 30% 40%, oklch(0.72 0.22 25 / 0.12) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 80% 60%, oklch(0.75 0.18 210 / 0.06) 0%, transparent 60%)",
          }}
        />

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-4xl"
          >
            {/* Age rating badge */}
            <motion.div variants={item} className="mb-8">
              <div
                className="inline-flex items-center gap-3 px-5 py-2.5 border-2 rounded-sm"
                style={{
                  borderColor: "oklch(0.72 0.22 25)",
                  background: "oklch(0.72 0.22 25 / 0.12)",
                }}
              >
                <span
                  className="font-display font-black text-2xl leading-none"
                  style={{ color: "oklch(0.72 0.22 25)" }}
                >
                  12+
                </span>
                <div
                  className="w-px h-6"
                  style={{ background: "oklch(0.72 0.22 25 / 0.4)" }}
                />
                <span
                  className="font-body text-xs uppercase tracking-[0.2em]"
                  style={{ color: "oklch(0.72 0.22 25)" }}
                >
                  Content Rating
                </span>
              </div>
            </motion.div>

            {/* Division label */}
            <motion.p
              variants={item}
              className="font-body text-xs uppercase tracking-[0.3em] text-ice mb-4"
            >
              GOAT Enterprise · Comic Imprint
            </motion.p>

            {/* Main headline */}
            <motion.h1
              variants={item}
              className="font-display font-black leading-[0.9] tracking-tight mb-6"
              style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
            >
              <span
                className="block"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.9 0.15 25) 0%, oklch(0.72 0.22 25) 60%, oklch(0.55 0.18 30) 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                STRIP
              </span>
              <span
                className="block"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.9 0.15 25) 0%, oklch(0.72 0.22 25) 60%, oklch(0.55 0.18 30) 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                CLUB
              </span>
              <span className="block text-foreground/60">COMICS</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="font-body text-lg text-muted-foreground max-w-2xl leading-relaxed mb-10"
            >
              GOAT Enterprise's comic book imprint — strips that push it to the
              edge. We publish bold, boundary-pushing sequential art for readers
              who demand more.
            </motion.p>

            <motion.div variants={item}>
              <a
                href={COMICS_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="comics.visit.primary_button"
              >
                <Button
                  size="lg"
                  className="font-bold uppercase tracking-wider gap-2 px-8 h-12"
                  style={{
                    background: "oklch(0.72 0.22 25)",
                    color: "oklch(0.98 0.005 0)",
                  }}
                >
                  Visit StripClub Comics
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Brand pillars */}
      <section className="py-20 px-4 border-t border-border">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={container}
          >
            <motion.div variants={item} className="mb-12 text-center">
              <p
                className="font-body text-xs uppercase tracking-[0.3em] mb-4"
                style={{ color: "oklch(0.72 0.22 25)" }}
              >
                Our Approach
              </p>
              <h2 className="font-display font-black text-4xl sm:text-5xl text-foreground">
                What We Stand For
              </h2>
            </motion.div>

            <motion.div
              variants={container}
              className="grid md:grid-cols-3 gap-px bg-border"
            >
              {PILLARS.map((pillar) => (
                <motion.div
                  key={pillar.title}
                  variants={item}
                  className="bg-background p-8 lg:p-12 group hover:bg-card transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-sm flex items-center justify-center mb-5 group-hover:scale-105 transition-transform"
                    style={{ background: "oklch(0.72 0.22 25 / 0.12)" }}
                  >
                    <Zap
                      className="w-5 h-5"
                      style={{ color: "oklch(0.72 0.22 25)" }}
                    />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-3">
                    {pillar.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA / Identity section */}
      <section
        className="py-20 px-4 relative overflow-hidden"
        style={{ background: "oklch(0.09 0.04 240)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 70% 50%, oklch(0.72 0.22 25 / 0.08) 0%, transparent 60%)",
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
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 border rounded-sm"
              style={{
                borderColor: "oklch(0.72 0.22 25 / 0.3)",
                background: "oklch(0.72 0.22 25 / 0.05)",
              }}
            >
              <span
                className="font-display font-black text-lg"
                style={{ color: "oklch(0.72 0.22 25)" }}
              >
                12+
              </span>
              <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                Age-rated content
              </span>
            </motion.div>

            <motion.h2
              variants={item}
              className="font-display font-black text-4xl sm:text-5xl text-foreground mb-6"
            >
              Ready to Explore
              <br />
              <span style={{ color: "oklch(0.72 0.22 25)" }}>the Comics?</span>
            </motion.h2>

            <motion.p
              variants={item}
              className="font-body text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8"
            >
              The full StripClub Comics catalog lives on its own platform.
              Browse titles, read previews, and discover what happens when
              comics stop holding back.
            </motion.p>

            <motion.div variants={item}>
              <a
                href={COMICS_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="comics.cta.primary_button"
              >
                <Button
                  size="lg"
                  className="font-bold uppercase tracking-wider gap-2 px-10 h-14 text-base"
                  style={{
                    background: "oklch(0.72 0.22 25)",
                    color: "oklch(0.98 0.005 0)",
                  }}
                >
                  Visit StripClub Comics
                  <ExternalLink className="w-5 h-5" />
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enterprise attribution */}
      <section className="py-8 px-4 border-t border-border/50">
        <div className="container mx-auto max-w-7xl">
          <p className="font-body text-xs text-center text-muted-foreground/60 uppercase tracking-wider">
            StripClub Comics is a division of GOAT Enterprise, operating under
            enterprise license.
          </p>
        </div>
      </section>
    </div>
  );
}
