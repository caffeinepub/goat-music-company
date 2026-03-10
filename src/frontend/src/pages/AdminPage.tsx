import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Check,
  Clapperboard,
  Disc3,
  Loader2,
  Pencil,
  Plus,
  ShieldAlert,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Artist, DomainActor, Release } from "../backend.d";
import { getCopyright } from "../data/sampleData";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddArtist,
  useAddDomainActor,
  useAddRelease,
  useDeleteArtist,
  useDeleteDomainActor,
  useDeleteRelease,
  useIsCallerAdmin,
  useListArtists,
  useListDomainActors,
  useListReleases,
  useUpdateArtist,
  useUpdateDomainActor,
  useUpdateRelease,
} from "../hooks/useQueries";

// ===== ARTIST FORM =====
interface ArtistFormData {
  name: string;
  genre: string;
  bio: string;
  imageUrl: string;
}

const EMPTY_ARTIST: ArtistFormData = {
  name: "",
  genre: "",
  bio: "",
  imageUrl: "",
};

function ArtistForm({
  initial,
  onSubmit,
  onCancel,
  isPending,
  submitLabel,
}: {
  initial?: ArtistFormData;
  onSubmit: (data: ArtistFormData) => void;
  onCancel?: () => void;
  isPending: boolean;
  submitLabel: string;
}) {
  const [form, setForm] = useState<ArtistFormData>(initial ?? EMPTY_ARTIST);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.genre.trim()) {
      toast.error("Name and genre are required");
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground font-body">
            Artist Name *
          </Label>
          <Input
            data-ocid="admin.artist.input"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="e.g. Vex Monroe"
            className="bg-muted border-border text-foreground font-body"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground font-body">
            Genre *
          </Label>
          <Input
            value={form.genre}
            onChange={(e) => setForm((p) => ({ ...p, genre: e.target.value }))}
            placeholder="e.g. Hip-Hop / Trap"
            className="bg-muted border-border text-foreground font-body"
            required
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground font-body">
          Bio
        </Label>
        <Textarea
          value={form.bio}
          onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
          placeholder="Artist biography..."
          rows={3}
          className="bg-muted border-border text-foreground font-body resize-none"
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground font-body">
          Image URL
        </Label>
        <Input
          value={form.imageUrl}
          onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))}
          placeholder="https://..."
          className="bg-muted border-border text-foreground font-body"
        />
      </div>
      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          data-ocid="admin.artist.submit_button"
          disabled={isPending}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider gap-2"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Check className="w-4 h-4" />
          )}
          {isPending ? "Saving..." : submitLabel}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

// ===== RELEASE FORM =====
interface ReleaseFormData {
  title: string;
  artistId: string;
  year: string;
  genre: string;
}

const EMPTY_RELEASE: ReleaseFormData = {
  title: "",
  artistId: "",
  year: String(new Date().getFullYear()),
  genre: "",
};

function ReleaseForm({
  initial,
  artists,
  onSubmit,
  onCancel,
  isPending,
  submitLabel,
}: {
  initial?: ReleaseFormData;
  artists: Artist[];
  onSubmit: (data: ReleaseFormData) => void;
  onCancel?: () => void;
  isPending: boolean;
  submitLabel: string;
}) {
  const [form, setForm] = useState<ReleaseFormData>(initial ?? EMPTY_RELEASE);

  // Auto-generate copyright preview
  const selectedArtist = artists.find((a) => String(a.id) === form.artistId);
  const copyrightPreview =
    form.title && selectedArtist && form.year
      ? getCopyright(
          {
            id: BigInt(0),
            title: form.title,
            artistId: BigInt(0),
            year: BigInt(form.year || "0"),
            genre: form.genre,
          },
          selectedArtist.name,
        )
      : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.title.trim() ||
      !form.artistId ||
      !form.year ||
      !form.genre.trim()
    ) {
      toast.error("All fields are required");
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground font-body">
            Release Title *
          </Label>
          <Input
            data-ocid="admin.release.input"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            placeholder="e.g. Crown of Thorns"
            className="bg-muted border-border text-foreground font-body"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground font-body">
            Artist *
          </Label>
          <Select
            value={form.artistId}
            onValueChange={(v) => setForm((p) => ({ ...p, artistId: v }))}
          >
            <SelectTrigger
              data-ocid="admin.release.select"
              className="bg-muted border-border text-foreground font-body"
            >
              <SelectValue placeholder="Select artist..." />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {artists.map((artist) => (
                <SelectItem
                  key={String(artist.id)}
                  value={String(artist.id)}
                  className="font-body"
                >
                  {artist.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground font-body">
            Year *
          </Label>
          <Input
            type="number"
            value={form.year}
            onChange={(e) => setForm((p) => ({ ...p, year: e.target.value }))}
            placeholder="2024"
            min="1900"
            max="2099"
            className="bg-muted border-border text-foreground font-body"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground font-body">
            Genre *
          </Label>
          <Input
            value={form.genre}
            onChange={(e) => setForm((p) => ({ ...p, genre: e.target.value }))}
            placeholder="e.g. Hip-Hop"
            className="bg-muted border-border text-foreground font-body"
            required
          />
        </div>
      </div>

      {/* Copyright preview */}
      {copyrightPreview && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3 bg-muted/50 border border-ice/20 rounded-sm"
          >
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-body mb-1">
              Copyright Preview
            </p>
            <p className="copyright-badge">{copyrightPreview}</p>
          </motion.div>
        </AnimatePresence>
      )}

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          data-ocid="admin.release.submit_button"
          disabled={isPending}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider gap-2"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Check className="w-4 h-4" />
          )}
          {isPending ? "Saving..." : submitLabel}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

// ===== ACTOR FORM =====
interface ActorFormData {
  name: string;
  specialty: string;
  bio: string;
  imageUrl: string;
}

const EMPTY_ACTOR: ActorFormData = {
  name: "",
  specialty: "",
  bio: "",
  imageUrl: "",
};

function ActorForm({
  initial,
  onSubmit,
  onCancel,
  isPending,
  submitLabel,
}: {
  initial?: ActorFormData;
  onSubmit: (data: ActorFormData) => void;
  onCancel?: () => void;
  isPending: boolean;
  submitLabel: string;
}) {
  const [form, setForm] = useState<ActorFormData>(initial ?? EMPTY_ACTOR);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground font-body">
            Actor Name *
          </Label>
          <Input
            data-ocid="admin.actor.input"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="e.g. Jordan Reeves"
            className="bg-muted border-border text-foreground font-body"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground font-body">
            Specialty
          </Label>
          <Input
            value={form.specialty}
            onChange={(e) =>
              setForm((p) => ({ ...p, specialty: e.target.value }))
            }
            placeholder="e.g. Film / Commercial"
            className="bg-muted border-border text-foreground font-body"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground font-body">
          Bio
        </Label>
        <Textarea
          value={form.bio}
          onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
          placeholder="Actor biography..."
          rows={3}
          className="bg-muted border-border text-foreground font-body resize-none"
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground font-body">
          Image URL
        </Label>
        <Input
          value={form.imageUrl}
          onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))}
          placeholder="https://..."
          className="bg-muted border-border text-foreground font-body"
        />
      </div>
      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          data-ocid="admin.actor.submit_button"
          disabled={isPending}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider gap-2"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Check className="w-4 h-4" />
          )}
          {isPending ? "Saving..." : submitLabel}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

// ===== ARTIST MANAGEMENT =====
function ArtistManagement() {
  const { data: artists = [] } = useListArtists();
  const addMutation = useAddArtist();
  const updateMutation = useUpdateArtist();
  const deleteMutation = useDeleteArtist();
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAdd = (data: ArtistFormData) => {
    addMutation.mutate(data, {
      onSuccess: () => toast.success("Artist added successfully"),
      onError: () => toast.error("Failed to add artist"),
    });
  };

  const handleUpdate = (id: bigint, data: ArtistFormData) => {
    updateMutation.mutate(
      { id, ...data },
      {
        onSuccess: () => {
          toast.success("Artist updated");
          setEditingId(null);
        },
        onError: () => toast.error("Failed to update artist"),
      },
    );
  };

  const handleDelete = (id: bigint) => {
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success("Artist removed"),
      onError: () => toast.error("Failed to delete artist"),
    });
  };

  return (
    <div className="space-y-8">
      {/* Add form */}
      <div className="bg-card border border-border p-6">
        <h3 className="font-display font-bold text-lg text-foreground mb-6 flex items-center gap-2">
          <Plus className="w-4 h-4 text-ice" />
          Add New Artist
        </h3>
        <ArtistForm
          onSubmit={handleAdd}
          isPending={addMutation.isPending}
          submitLabel="Add Artist"
        />
      </div>

      {/* Artist list */}
      <div className="bg-card border border-border">
        <div className="p-4 border-b border-border">
          <h3 className="font-display font-bold text-base text-foreground">
            Current Roster ({artists.length})
          </h3>
        </div>
        {artists.length === 0 ? (
          <div
            data-ocid="admin.artist.empty_state"
            className="p-8 text-center text-muted-foreground font-body text-sm"
          >
            No artists yet. Add your first artist above.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {artists.map((artist, index) => (
              <div key={String(artist.id)}>
                {editingId === String(artist.id) ? (
                  <div className="p-4 bg-muted/20">
                    <ArtistForm
                      initial={{
                        name: artist.name,
                        genre: artist.genre,
                        bio: artist.bio,
                        imageUrl: artist.imageUrl,
                      }}
                      onSubmit={(data) => handleUpdate(artist.id, data)}
                      onCancel={() => setEditingId(null)}
                      isPending={updateMutation.isPending}
                      submitLabel="Save Changes"
                    />
                  </div>
                ) : (
                  <div className="p-4 flex items-center gap-4">
                    {artist.imageUrl && (
                      <img
                        src={artist.imageUrl}
                        alt={artist.name}
                        className="w-10 h-10 rounded-sm object-cover shrink-0 bg-muted"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-sm text-foreground">
                        {artist.name}
                      </p>
                      <p className="font-body text-xs text-muted-foreground">
                        {artist.genre}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        data-ocid={`admin.artist.edit_button.${index + 1}`}
                        onClick={() => setEditingId(String(artist.id))}
                        className="w-8 h-8 text-muted-foreground hover:text-foreground"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            data-ocid={`admin.artist.delete_button.${index + 1}`}
                            className="w-8 h-8 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-popover border-border">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="font-display text-foreground">
                              Delete {artist.name}?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="font-body text-muted-foreground">
                              This will permanently remove the artist and may
                              affect associated releases. This action cannot be
                              undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              data-ocid="admin.artist.cancel_button"
                              className="font-body"
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              data-ocid="admin.artist.confirm_button"
                              onClick={() => handleDelete(artist.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-body"
                            >
                              Delete Artist
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ===== RELEASE MANAGEMENT =====
function ReleaseManagement() {
  const { data: releases = [] } = useListReleases();
  const { data: artists = [] } = useListArtists();
  const addMutation = useAddRelease();
  const updateMutation = useUpdateRelease();
  const deleteMutation = useDeleteRelease();
  const [editingId, setEditingId] = useState<string | null>(null);

  const artistMap = new Map<string, Artist>(
    artists.map((a) => [String(a.id), a]),
  );

  const handleAdd = (data: ReleaseFormData) => {
    addMutation.mutate(
      {
        title: data.title,
        artistId: BigInt(data.artistId),
        year: BigInt(data.year),
        genre: data.genre,
      },
      {
        onSuccess: () => toast.success("Release added successfully"),
        onError: () => toast.error("Failed to add release"),
      },
    );
  };

  const handleUpdate = (id: bigint, data: ReleaseFormData) => {
    updateMutation.mutate(
      {
        id,
        title: data.title,
        artistId: BigInt(data.artistId),
        year: BigInt(data.year),
        genre: data.genre,
      },
      {
        onSuccess: () => {
          toast.success("Release updated");
          setEditingId(null);
        },
        onError: () => toast.error("Failed to update release"),
      },
    );
  };

  const handleDelete = (id: bigint) => {
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success("Release removed"),
      onError: () => toast.error("Failed to delete release"),
    });
  };

  return (
    <div className="space-y-8">
      {/* Add form */}
      <div className="bg-card border border-border p-6">
        <h3 className="font-display font-bold text-lg text-foreground mb-6 flex items-center gap-2">
          <Plus className="w-4 h-4 text-ice" />
          Add New Release
        </h3>
        {artists.length === 0 ? (
          <p className="font-body text-sm text-muted-foreground">
            Add at least one artist before creating releases.
          </p>
        ) : (
          <ReleaseForm
            artists={artists}
            onSubmit={handleAdd}
            isPending={addMutation.isPending}
            submitLabel="Add Release"
          />
        )}
      </div>

      {/* Release list */}
      <div className="bg-card border border-border">
        <div className="p-4 border-b border-border">
          <h3 className="font-display font-bold text-base text-foreground">
            All Releases ({releases.length})
          </h3>
        </div>
        {releases.length === 0 ? (
          <div
            data-ocid="admin.release.empty_state"
            className="p-8 text-center text-muted-foreground font-body text-sm"
          >
            No releases yet. Add your first release above.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {releases.map((release: Release, index: number) => {
              const artist = artistMap.get(String(release.artistId));
              const copyright = getCopyright(
                release,
                artist?.name ?? "Unknown Artist",
              );
              return (
                <div key={String(release.id)}>
                  {editingId === String(release.id) ? (
                    <div className="p-4 bg-muted/20">
                      <ReleaseForm
                        artists={artists}
                        initial={{
                          title: release.title,
                          artistId: String(release.artistId),
                          year: String(release.year),
                          genre: release.genre,
                        }}
                        onSubmit={(data) => handleUpdate(release.id, data)}
                        onCancel={() => setEditingId(null)}
                        isPending={updateMutation.isPending}
                        submitLabel="Save Changes"
                      />
                    </div>
                  ) : (
                    <div className="p-4 flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-bold text-sm text-foreground">
                          {release.title}
                        </p>
                        <p className="font-body text-xs text-muted-foreground mb-1">
                          {artist?.name ?? "Unknown"} — {release.genre} —{" "}
                          {Number(release.year)}
                        </p>
                        <p className="copyright-badge">{copyright}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          data-ocid={`admin.release.edit_button.${index + 1}`}
                          onClick={() => setEditingId(String(release.id))}
                          className="w-8 h-8 text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              data-ocid={`admin.release.delete_button.${index + 1}`}
                              className="w-8 h-8 text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-popover border-border">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="font-display text-foreground">
                                Delete "{release.title}"?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="font-body text-muted-foreground">
                                This release will be permanently removed from
                                the catalog.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel
                                data-ocid="admin.release.cancel_button"
                                className="font-body"
                              >
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                data-ocid="admin.release.confirm_button"
                                onClick={() => handleDelete(release.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-body"
                              >
                                Delete Release
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ===== ACTOR MANAGEMENT =====
function ActorManagement() {
  const { data: actors = [] } = useListDomainActors();
  const addMutation = useAddDomainActor();
  const updateMutation = useUpdateDomainActor();
  const deleteMutation = useDeleteDomainActor();
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAdd = (data: ActorFormData) => {
    addMutation.mutate(data, {
      onSuccess: () => toast.success("Actor added successfully"),
      onError: () => toast.error("Failed to add actor"),
    });
  };

  const handleUpdate = (id: bigint, data: ActorFormData) => {
    updateMutation.mutate(
      { id, ...data },
      {
        onSuccess: () => {
          toast.success("Actor updated");
          setEditingId(null);
        },
        onError: () => toast.error("Failed to update actor"),
      },
    );
  };

  const handleDelete = (id: bigint) => {
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success("Actor removed"),
      onError: () => toast.error("Failed to delete actor"),
    });
  };

  return (
    <div className="space-y-8">
      {/* Add form */}
      <div className="bg-card border border-border p-6">
        <h3 className="font-display font-bold text-lg text-foreground mb-6 flex items-center gap-2">
          <Plus className="w-4 h-4 text-ice" />
          Add New Actor
        </h3>
        <ActorForm
          onSubmit={handleAdd}
          isPending={addMutation.isPending}
          submitLabel="Add Actor"
        />
      </div>

      {/* Actor list */}
      <div className="bg-card border border-border">
        <div className="p-4 border-b border-border">
          <h3 className="font-display font-bold text-base text-foreground">
            Talent Roster ({actors.length})
          </h3>
        </div>
        {actors.length === 0 ? (
          <div
            data-ocid="admin.actor.empty_state"
            className="p-8 text-center text-muted-foreground font-body text-sm"
          >
            No actors yet. Add your first actor above.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {actors.map((actor: DomainActor, index: number) => (
              <div key={String(actor.id)}>
                {editingId === String(actor.id) ? (
                  <div className="p-4 bg-muted/20">
                    <ActorForm
                      initial={{
                        name: actor.name,
                        specialty: actor.specialty,
                        bio: actor.bio,
                        imageUrl: actor.imageUrl,
                      }}
                      onSubmit={(data) => handleUpdate(actor.id, data)}
                      onCancel={() => setEditingId(null)}
                      isPending={updateMutation.isPending}
                      submitLabel="Save Changes"
                    />
                  </div>
                ) : (
                  <div className="p-4 flex items-center gap-4">
                    {actor.imageUrl && (
                      <img
                        src={actor.imageUrl}
                        alt={actor.name}
                        className="w-10 h-10 rounded-sm object-cover shrink-0 bg-muted"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-sm text-foreground">
                        {actor.name}
                      </p>
                      <p className="font-body text-xs text-muted-foreground">
                        {actor.specialty || "No specialty listed"}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        data-ocid={`admin.actor.edit_button.${index + 1}`}
                        onClick={() => setEditingId(String(actor.id))}
                        className="w-8 h-8 text-muted-foreground hover:text-foreground"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            data-ocid={`admin.actor.delete_button.${index + 1}`}
                            className="w-8 h-8 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-popover border-border">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="font-display text-foreground">
                              Delete {actor.name}?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="font-body text-muted-foreground">
                              This will permanently remove the actor from the
                              roster. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              data-ocid="admin.actor.cancel_button"
                              className="font-body"
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              data-ocid="admin.actor.confirm_button"
                              onClick={() => handleDelete(actor.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-body"
                            >
                              Delete Actor
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ===== MAIN ADMIN PAGE =====
export default function AdminPage() {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();

  // Not logged in
  if (!identity) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-sm bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <ShieldAlert
              className="w-8 h-8"
              style={{ color: "oklch(var(--ice))" }}
            />
          </div>
          <h2 className="font-display font-black text-3xl text-foreground mb-3">
            Admin Access
          </h2>
          <p className="font-body text-muted-foreground mb-8">
            You must be logged in to access the management panel.
          </p>
          <Button
            onClick={login}
            disabled={isLoggingIn}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider gap-2 px-8"
          >
            {isLoggingIn ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ShieldAlert className="w-4 h-4" />
            )}
            {isLoggingIn ? "Connecting..." : "Login to Continue"}
          </Button>
        </motion.div>
      </div>
    );
  }

  // Logged in but checking admin status
  if (adminLoading) {
    return (
      <div
        data-ocid="admin.loading_state"
        className="min-h-screen flex items-center justify-center"
      >
        <Loader2
          className="w-8 h-8 animate-spin"
          style={{ color: "oklch(var(--ice))" }}
        />
      </div>
    );
  }

  // Not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-sm bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="font-display font-black text-3xl text-foreground mb-3">
            Access Denied
          </h2>
          <p className="font-body text-muted-foreground">
            Your account does not have administrator privileges.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <section className="relative py-16 px-4 border-b border-border overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% -30%, oklch(0.75 0.18 210 / 0.15) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-xs uppercase tracking-[0.3em] text-ice mb-4">
              Management Panel
            </p>
            <h1 className="font-display font-black text-4xl sm:text-5xl text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="font-body text-muted-foreground">
              Manage artists, releases, and actors across GOAT Enterprise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <Tabs defaultValue="artists" className="space-y-8">
            <TabsList
              data-ocid="admin.tab"
              className="bg-card border border-border p-1 w-full sm:w-auto grid grid-cols-3 sm:flex gap-0"
            >
              <TabsTrigger
                value="artists"
                className="font-body uppercase tracking-wider text-xs gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Users className="w-3.5 h-3.5" />
                Artists
              </TabsTrigger>
              <TabsTrigger
                value="releases"
                className="font-body uppercase tracking-wider text-xs gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Disc3 className="w-3.5 h-3.5" />
                Releases
              </TabsTrigger>
              <TabsTrigger
                value="actors"
                className="font-body uppercase tracking-wider text-xs gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Clapperboard className="w-3.5 h-3.5" />
                Actors
              </TabsTrigger>
            </TabsList>

            <TabsContent value="artists">
              <ArtistManagement />
            </TabsContent>

            <TabsContent value="releases">
              <ReleaseManagement />
            </TabsContent>

            <TabsContent value="actors">
              <ActorManagement />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
