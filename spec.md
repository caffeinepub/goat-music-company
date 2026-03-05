# GOAT Music Company

## Current State
New project. No existing code or data models.

## Requested Changes (Diff)

### Add
- Homepage with company brand, hero section, and label identity
- Artist roster section displaying all signed artists with name, genre, and bio
- Music catalog section displaying all releases with title, artist, year, genre, and auto-generated copyright notice formatted as: Ⓟ [year] [artist name] under exclusive license to GOAT Music Company
- Admin management panel (protected by authorization) with:
  - Add/edit/remove artists (name, genre, bio, image URL)
  - Add/edit/remove music releases (title, artist, year, genre)
  - Copyright notice auto-generated from release data — not stored separately
- Navigation between Homepage, Roster, Catalog, and Admin pages

### Modify
- None

### Remove
- None

## Implementation Plan
1. Backend: Define Artist and Release data types. Implement CRUD operations for artists and releases. Authorization for admin-only write operations. Query endpoints for public read access.
2. Frontend: Multi-page layout with navigation. Homepage with hero and label branding. Artist roster page listing all artists. Music catalog page listing all releases with auto-generated copyright notice. Admin panel page with forms to create/edit/delete artists and releases.
3. Copyright logic: Computed client-side as `Ⓟ ${release.year} ${artistName} under exclusive license to GOAT Music Company`.
4. Authorization: Admin role gates write operations. Public users can view roster and catalog.
