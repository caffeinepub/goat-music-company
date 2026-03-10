import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Clapperboard } from "lucide-react";
import { motion } from "motion/react";
import type { DomainActor } from "../backend.d";
import { useListDomainActors } from "../hooks/useQueries";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function ActorCard({
  actor,
  index,
}: {
  actor: DomainActor;
  index: number;
}) {
  const ocid = `actors.item.${index + 1}`;
  return (
    <motion.article
      variants={card}
      data-ocid={ocid}
      className="group relative bg-card border border-border overflow-hidden hover:border-ice/30 transition-all duration-300 hover:shadow-card"
    >
      {/* Actor image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {actor.imageUrl ? (
          <img
            src={actor.imageUrl}
            alt={actor.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary">
            <Clapperboard
              className="w-12 h-12"
              style={{ color: "oklch(var(--ice-dim))" }}
            />
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-display font-black text-xl text-foreground leading-tight">
            {actor.name}
          </h3>
          {actor.specialty && (
            <Badge
              variant="outline"
              className="shrink-0 border-ice/30 text-ice text-[10px] uppercase tracking-wider font-body"
            >
              {actor.specialty}
            </Badge>
          )}
        </div>
        {actor.bio && (
          <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {actor.bio}
          </p>
        )}
      </div>

      {/* Bottom icy blue accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "oklch(var(--ice))" }}
      />
    </motion.article>
  );
}

function ActorsSkeleton() {
  return (
    <div
      data-ocid="actors.loading_state"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-card border border-border overflow-hidden">
          <Skeleton className="aspect-[4/5] w-full" />
          <div className="p-6 space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ActorsPage() {
  const { data: actors, isLoading, isError } = useListDomainActors();

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <section className="relative py-20 px-4 border-b border-border overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% -20%, oklch(0.75 0.15 270 / 0.12) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-xs uppercase tracking-[0.3em] text-ice mb-4">
              GOAT Enterprise
            </p>
            <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-foreground mb-4">
              Actors
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl">
              GOAT Actors — a curated roster of performing talent operating
              under the GOAT enterprise umbrella. Versatile, disciplined, and
              unforgettable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Actor grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {isLoading ? (
            <ActorsSkeleton />
          ) : isError ? (
            <div data-ocid="actors.error_state" className="text-center py-20">
              <p className="font-body text-muted-foreground">
                Failed to load actors. Please try again.
              </p>
            </div>
          ) : !actors || actors.length === 0 ? (
            <div
              data-ocid="actors.empty_state"
              className="text-center py-20 border border-dashed border-border rounded-sm"
            >
              <Clapperboard
                className="w-12 h-12 mx-auto mb-4 opacity-30"
                style={{ color: "oklch(var(--ice))" }}
              />
              <h3 className="font-display font-bold text-xl text-muted-foreground mb-2">
                No Actors Yet
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                The talent roster is being assembled. Check back soon.
              </p>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {actors.map((actor, index) => (
                <ActorCard key={String(actor.id)} actor={actor} index={index} />
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
