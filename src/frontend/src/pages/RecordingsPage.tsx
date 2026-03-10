import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Disc3, Music } from "lucide-react";
import { motion } from "motion/react";
import type { Artist, Release } from "../backend.d";
import { getCopyright } from "../data/sampleData";
import { useListArtists, useListReleases } from "../hooks/useQueries";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function ReleaseRow({
  release,
  artistName,
  index,
}: {
  release: Release;
  artistName: string;
  index: number;
}) {
  return (
    <div
      data-ocid={`recordings.release.item.${index + 1}`}
      className="flex items-start gap-4 py-4 border-b border-border/50 last:border-0 group"
    >
      <div className="w-9 h-9 rounded-sm bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
        <Disc3 className="w-4 h-4" style={{ color: "oklch(var(--ice))" }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <p className="font-display font-bold text-sm text-foreground">
            {release.title}
          </p>
          <Badge
            variant="outline"
            className="border-border text-muted-foreground text-[10px] uppercase tracking-wider font-body"
          >
            {release.genre}
          </Badge>
          <span className="font-body text-xs text-muted-foreground">
            {Number(release.year)}
          </span>
        </div>
        <p className="copyright-badge">{getCopyright(release, artistName)}</p>
      </div>
    </div>
  );
}

function ArtistSection({
  artist,
  releases,
  index,
}: {
  artist: Artist;
  releases: Release[];
  index: number;
}) {
  return (
    <motion.article
      variants={fadeUp}
      data-ocid={`recordings.artist.item.${index + 1}`}
      className="bg-card border border-border overflow-hidden hover:border-ice/20 transition-all duration-300"
    >
      {/* Artist header */}
      <div className="flex items-start gap-5 p-6 border-b border-border/50">
        {artist.imageUrl ? (
          <img
            src={artist.imageUrl}
            alt={artist.name}
            className="w-20 h-20 rounded-sm object-cover shrink-0 bg-muted"
            loading="lazy"
          />
        ) : (
          <div className="w-20 h-20 rounded-sm bg-secondary flex items-center justify-center shrink-0">
            <Music
              className="w-8 h-8"
              style={{ color: "oklch(var(--ice-dim))" }}
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3 flex-wrap mb-2">
            <h3 className="font-display font-black text-2xl text-foreground leading-tight">
              {artist.name}
            </h3>
            <Badge
              variant="outline"
              className="shrink-0 border-ice/30 text-ice text-[10px] uppercase tracking-wider font-body mt-1"
            >
              {artist.genre}
            </Badge>
          </div>
          {artist.bio && (
            <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {artist.bio}
            </p>
          )}
        </div>
      </div>

      {/* Releases */}
      <div className="px-6 py-2">
        {releases.length === 0 ? (
          <p className="font-body text-xs text-muted-foreground py-4 text-center">
            No releases yet
          </p>
        ) : (
          releases.map((release, ri) => (
            <ReleaseRow
              key={String(release.id)}
              release={release}
              artistName={artist.name}
              index={ri}
            />
          ))
        )}
      </div>
    </motion.article>
  );
}

function RecordingsSkeleton() {
  return (
    <div data-ocid="recordings.loading_state" className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-card border border-border overflow-hidden">
          <div className="flex items-start gap-5 p-6 border-b border-border/50">
            <Skeleton className="w-20 h-20 rounded-sm shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
          <div className="p-6 space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function RecordingsPage() {
  const {
    data: artists,
    isLoading: artistsLoading,
    isError: artistsError,
  } = useListArtists();
  const { data: releases = [], isLoading: releasesLoading } = useListReleases();

  const isLoading = artistsLoading || releasesLoading;

  const releasesByArtist = new Map<string, Release[]>();
  for (const r of releases) {
    const key = String(r.artistId);
    if (!releasesByArtist.has(key)) releasesByArtist.set(key, []);
    releasesByArtist.get(key)!.push(r);
  }

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <section className="relative py-20 px-4 border-b border-border overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% -20%, oklch(0.75 0.18 210 / 0.12) 0%, transparent 60%)",
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
              Recordings
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl">
              GOAT Recordings — our flagship music label. Artists, releases, and
              every track released under exclusive license to GOAT Music
              Company.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          {isLoading ? (
            <RecordingsSkeleton />
          ) : artistsError ? (
            <div
              data-ocid="recordings.error_state"
              className="text-center py-20"
            >
              <p className="font-body text-muted-foreground">
                Failed to load recordings. Please try again.
              </p>
            </div>
          ) : !artists || artists.length === 0 ? (
            <div
              data-ocid="recordings.empty_state"
              className="text-center py-20 border border-dashed border-border rounded-sm"
            >
              <Music
                className="w-12 h-12 mx-auto mb-4 opacity-30"
                style={{ color: "oklch(var(--ice))" }}
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
              className="space-y-6"
            >
              {artists.map((artist, index) => (
                <ArtistSection
                  key={String(artist.id)}
                  artist={artist}
                  releases={releasesByArtist.get(String(artist.id)) ?? []}
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
