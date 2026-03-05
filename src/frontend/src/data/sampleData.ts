import type { Artist, Release } from "../backend.d";

export const SAMPLE_ARTISTS: Artist[] = [
  {
    id: BigInt(1),
    name: "Vex Monroe",
    genre: "Hip-Hop / Trap",
    bio: "Rising from the streets of Atlanta, Vex Monroe blends raw lyricism with melodic trap production. Known for cinematic storytelling and unflinching vulnerability, he has redefined what it means to be authentic in modern hip-hop.",
    imageUrl: "/assets/generated/artist-1.dim_400x400.jpg",
  },
  {
    id: BigInt(2),
    name: "Zara Solène",
    genre: "R&B / Soul",
    bio: "Zara Solène is a multi-platinum R&B powerhouse whose voice is often described as 'liquid gold.' Born in Paris and raised in New York, she fuses classic soul influences with contemporary production to create deeply emotional anthems.",
    imageUrl: "/assets/generated/artist-2.dim_400x400.jpg",
  },
  {
    id: BigInt(3),
    name: "KXIV",
    genre: "Electronic / Afrobeats",
    bio: "Producer and performer KXIV pushes genre boundaries by merging West African rhythms with cutting-edge electronic production. His club-ready tracks have topped charts across three continents and earned two Grammy nominations.",
    imageUrl: "/assets/generated/artist-3.dim_400x400.jpg",
  },
];

export const SAMPLE_RELEASES: Release[] = [
  {
    id: BigInt(1),
    title: "Crown of Thorns",
    artistId: BigInt(1),
    year: BigInt(2024),
    genre: "Hip-Hop",
  },
  {
    id: BigInt(2),
    title: "Midnight in Monaco",
    artistId: BigInt(2),
    year: BigInt(2024),
    genre: "R&B",
  },
  {
    id: BigInt(3),
    title: "Pulse of the Motherland",
    artistId: BigInt(3),
    year: BigInt(2023),
    genre: "Electronic",
  },
  {
    id: BigInt(4),
    title: "Ghost Protocol",
    artistId: BigInt(1),
    year: BigInt(2023),
    genre: "Trap",
  },
  {
    id: BigInt(5),
    title: "Velvet Requiem",
    artistId: BigInt(2),
    year: BigInt(2022),
    genre: "Soul",
  },
  {
    id: BigInt(6),
    title: "Lagos After Dark",
    artistId: BigInt(3),
    year: BigInt(2024),
    genre: "Afrobeats",
  },
];

export const ALBUM_COVERS: Record<string, string> = {
  "1": "/assets/generated/album-1.dim_300x300.jpg",
  "2": "/assets/generated/album-2.dim_300x300.jpg",
  "3": "/assets/generated/album-3.dim_300x300.jpg",
  "4": "/assets/generated/album-1.dim_300x300.jpg",
  "5": "/assets/generated/album-3.dim_300x300.jpg",
  "6": "/assets/generated/album-2.dim_300x300.jpg",
};

export function getCopyright(release: Release, artistName: string): string {
  return `Ⓟ ${Number(release.year)} ${artistName} under exclusive license to GOAT Music Company`;
}
