import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Music } from "lucide-react";
import { motion } from "motion/react";
import type { Artist } from "../backend.d";
import { SAMPLE_ARTISTS } from "../data/sampleData";
import { useListArtists } from "../hooks/useQueries";

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

function ArtistCard({ artist, index }: { artist: Artist; index: number }) {
  const ocid = `roster.item.${index + 1}`;
  return (
    <motion.article
      variants={card}
      data-ocid={ocid}
      className="group relative bg-card border border-border overflow-hidden hover:border-gold/30 transition-all duration-300 hover:shadow-card"
    >
      {/* Artist image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {artist.imageUrl ? (
          <img
            src={artist.imageUrl}
            alt={artist.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary">
            <Music
              className="w-12 h-12"
              style={{ color: "oklch(var(--gold-dim))" }}
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
            {artist.name}
          </h3>
          <Badge
            variant="outline"
            className="shrink-0 border-gold/30 text-gold text-[10px] uppercase tracking-wider font-body"
          >
            {artist.genre}
          </Badge>
        </div>
        <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {artist.bio}
        </p>
      </div>

      {/* Bottom gold accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "oklch(var(--gold))" }}
      />
    </motion.article>
  );
}

function RosterSkeleton() {
  return (
    <div
      data-ocid="roster.loading_state"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map((sk) => (
        <div key={sk} className="bg-card border border-border overflow-hidden">
          <Skeleton className="aspect-square w-full" />
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

export default function RosterPage() {
  const { data: backendArtists, isLoading, isError } = useListArtists();

  // Show sample data if backend returns empty or while loading
  const artists =
    backendArtists && backendArtists.length > 0
      ? backendArtists
      : !isLoading
        ? SAMPLE_ARTISTS
        : [];

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <section className="relative py-20 px-4 border-b border-border overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% -20%, oklch(0.78 0.16 68 / 0.12) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4">
              GOAT Music Company
            </p>
            <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-foreground mb-4">
              Artist Roster
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl">
              Meet the exceptional talent signed to GOAT Music Company — each
              artist handpicked for their unique vision and uncompromising
              artistry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Artist grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {isLoading ? (
            <RosterSkeleton />
          ) : isError ? (
            <div data-ocid="roster.error_state" className="text-center py-20">
              <p className="font-body text-muted-foreground">
                Failed to load artists. Please try again.
              </p>
            </div>
          ) : artists.length === 0 ? (
            <div
              data-ocid="roster.empty_state"
              className="text-center py-20 border border-dashed border-border rounded-sm"
            >
              <Music
                className="w-12 h-12 mx-auto mb-4 opacity-30"
                style={{ color: "oklch(var(--gold))" }}
              />
              <h3 className="font-display font-bold text-xl text-muted-foreground mb-2">
                No Artists Yet
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                The roster is being assembled. Check back soon.
              </p>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {artists.map((artist, index) => (
                <ArtistCard
                  key={String(artist.id)}
                  artist={artist}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
