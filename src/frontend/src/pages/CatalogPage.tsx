import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Disc3, Filter } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Artist, Release } from "../backend.d";
import {
  ALBUM_COVERS,
  SAMPLE_ARTISTS,
  SAMPLE_RELEASES,
  getCopyright,
} from "../data/sampleData";
import { useListArtists, useListReleases } from "../hooks/useQueries";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function getCoverImage(release: Release): string {
  const id = String(release.id);
  return ALBUM_COVERS[id] ?? "/assets/generated/album-1.dim_300x300.jpg";
}

function ReleaseCard({
  release,
  artistName,
  index,
}: {
  release: Release;
  artistName: string;
  index: number;
}) {
  const copyright = getCopyright(release, artistName);
  const cover = getCoverImage(release);

  return (
    <motion.article
      variants={item}
      data-ocid={`catalog.item.${index + 1}`}
      className="group flex gap-4 p-4 bg-card border border-border hover:border-gold/20 transition-all duration-200 hover:bg-card/80"
    >
      {/* Album art */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden bg-muted rounded-sm">
        <img
          src={cover}
          alt={release.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Disc3
            className="w-6 h-6 animate-spin"
            style={{ color: "oklch(var(--gold))", animationDuration: "3s" }}
          />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-start gap-x-3 gap-y-1 mb-1">
          <h3 className="font-display font-black text-base sm:text-lg text-foreground leading-tight truncate">
            {release.title}
          </h3>
          <Badge
            variant="outline"
            className="shrink-0 border-border text-muted-foreground text-[10px] uppercase tracking-wider font-body"
          >
            {release.genre}
          </Badge>
        </div>
        <p className="font-body text-sm text-muted-foreground mb-2">
          {artistName} &mdash; {Number(release.year)}
        </p>
        <p className="copyright-badge truncate" title={copyright}>
          {copyright}
        </p>
      </div>
    </motion.article>
  );
}

function CatalogSkeleton() {
  return (
    <div data-ocid="catalog.loading_state" className="space-y-3">
      {["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8"].map((sk) => (
        <div key={sk} className="flex gap-4 p-4 bg-card border border-border">
          <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-sm" />
          <div className="flex-1 space-y-2">
            <div className="flex gap-3">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-3 w-64" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CatalogPage() {
  const [genreFilter, setGenreFilter] = useState<string>("All");

  const { data: backendReleases, isLoading: releasesLoading } =
    useListReleases();
  const { data: backendArtists } = useListArtists();

  // Use sample data if backend is empty
  const releases =
    backendReleases && backendReleases.length > 0
      ? backendReleases
      : !releasesLoading
        ? SAMPLE_RELEASES
        : [];

  const artists =
    backendArtists && backendArtists.length > 0
      ? backendArtists
      : SAMPLE_ARTISTS;

  const artistMap = new Map<string, Artist>(
    artists.map((a) => [String(a.id), a]),
  );

  // Get unique genres
  const genres = ["All", ...Array.from(new Set(releases.map((r) => r.genre)))];

  const filtered =
    genreFilter === "All"
      ? releases
      : releases.filter((r) => r.genre === genreFilter);

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <section className="relative py-20 px-4 border-b border-border overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% -20%, oklch(0.6 0.12 68 / 0.1) 0%, transparent 60%)",
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
              Music Catalog
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl">
              Every release in the GOAT Music catalog, complete with full
              copyright information. From debut EPs to platinum-certified
              albums.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter bar */}
      {genres.length > 1 && (
        <section className="sticky top-16 z-40 border-b border-border bg-background/90 backdrop-blur-md py-3 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center gap-3 overflow-x-auto pb-0.5">
              <Filter className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              {genres.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  data-ocid="catalog.tab"
                  onClick={() => setGenreFilter(genre)}
                  className={`
                    shrink-0 px-4 py-1.5 text-xs font-body font-medium uppercase tracking-wider rounded-full transition-all
                    ${
                      genreFilter === genre
                        ? "bg-primary text-primary-foreground"
                        : "border border-border text-muted-foreground hover:border-gold/30 hover:text-foreground"
                    }
                  `}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Releases */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {releasesLoading ? (
            <CatalogSkeleton />
          ) : filtered.length === 0 ? (
            <div
              data-ocid="catalog.empty_state"
              className="text-center py-20 border border-dashed border-border rounded-sm"
            >
              <Disc3
                className="w-12 h-12 mx-auto mb-4 opacity-30"
                style={{ color: "oklch(var(--gold))" }}
              />
              <h3 className="font-display font-bold text-xl text-muted-foreground mb-2">
                No Releases Found
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                {genreFilter !== "All"
                  ? `No releases in the ${genreFilter} genre.`
                  : "The catalog is being built. Check back soon."}
              </p>
              {genreFilter !== "All" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setGenreFilter("All")}
                  className="mt-4 text-gold hover:text-gold/80"
                >
                  Clear filter
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="font-body text-sm text-muted-foreground">
                  <span className="text-foreground font-medium">
                    {filtered.length}
                  </span>{" "}
                  {filtered.length === 1 ? "release" : "releases"}
                  {genreFilter !== "All" && ` in ${genreFilter}`}
                </p>
              </div>

              <motion.div
                key={genreFilter}
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-2"
              >
                {filtered.map((release, index) => {
                  const artist = artistMap.get(String(release.artistId));
                  const artistName = artist?.name ?? "Unknown Artist";
                  return (
                    <ReleaseCard
                      key={String(release.id)}
                      release={release}
                      artistName={artistName}
                      index={index}
                    />
                  );
                })}
              </motion.div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
