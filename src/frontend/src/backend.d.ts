import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Artist {
    id: bigint;
    bio: string;
    name: string;
    imageUrl: string;
    genre: string;
}
export interface Release {
    id: bigint;
    title: string;
    year: bigint;
    artistId: bigint;
    genre: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addArtist(name: string, genre: string, bio: string, imageUrl: string): Promise<bigint>;
    addRelease(title: string, artistId: bigint, year: bigint, genre: string): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteArtist(id: bigint): Promise<void>;
    deleteRelease(id: bigint): Promise<void>;
    getArtist(_id: bigint): Promise<Artist | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getRelease(_id: bigint): Promise<Release | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listArtists(): Promise<Array<Artist>>;
    listReleases(): Promise<Array<Release>>;
    listReleasesByArtist(artistId: bigint): Promise<Array<Release>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateArtist(id: bigint, name: string, genre: string, bio: string, imageUrl: string): Promise<void>;
    updateRelease(id: bigint, title: string, artistId: bigint, year: bigint, genre: string): Promise<void>;
}
