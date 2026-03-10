import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Artist, DomainActor, Release } from "../backend.d";
import { useActor } from "./useActor";

// ===== QUERY HOOKS =====

export function useListArtists() {
  const { actor, isFetching } = useActor();
  return useQuery<Artist[]>({
    queryKey: ["artists"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listArtists();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useListReleases() {
  const { actor, isFetching } = useActor();
  return useQuery<Release[]>({
    queryKey: ["releases"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listReleases();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useListDomainActors() {
  const { actor, isFetching } = useActor();
  return useQuery<DomainActor[]>({
    queryKey: ["domainActors"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listDomainActors();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

// ===== MUTATION HOOKS =====

export function useAddArtist() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      genre: string;
      bio: string;
      imageUrl: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addArtist(data.name, data.genre, data.bio, data.imageUrl);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["artists"] }),
  });
}

export function useUpdateArtist() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      name: string;
      genre: string;
      bio: string;
      imageUrl: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateArtist(
        data.id,
        data.name,
        data.genre,
        data.bio,
        data.imageUrl,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["artists"] }),
  });
}

export function useDeleteArtist() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteArtist(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["artists"] });
      qc.invalidateQueries({ queryKey: ["releases"] });
    },
  });
}

export function useAddRelease() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      artistId: bigint;
      year: bigint;
      genre: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addRelease(data.title, data.artistId, data.year, data.genre);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["releases"] }),
  });
}

export function useUpdateRelease() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      title: string;
      artistId: bigint;
      year: bigint;
      genre: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateRelease(
        data.id,
        data.title,
        data.artistId,
        data.year,
        data.genre,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["releases"] }),
  });
}

export function useDeleteRelease() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteRelease(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["releases"] }),
  });
}

export function useAddDomainActor() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      specialty: string;
      bio: string;
      imageUrl: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addDomainActor(
        data.name,
        data.specialty,
        data.bio,
        data.imageUrl,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["domainActors"] }),
  });
}

export function useUpdateDomainActor() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      name: string;
      specialty: string;
      bio: string;
      imageUrl: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateDomainActor(
        data.id,
        data.name,
        data.specialty,
        data.bio,
        data.imageUrl,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["domainActors"] }),
  });
}

export function useDeleteDomainActor() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteDomainActor(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["domainActors"] }),
  });
}
