# GOAT Music Company — Enterprise Expansion

## Current State
- Single-purpose music label site with: Homepage (hero, stats, features), Artist Roster page, Music Catalog page, Admin panel.
- Backend: Artist and Release types with full CRUD, authorization via Internet Identity.
- Theme: icy blue + navy.
- Nav: Home, Roster, Catalog, Admin (admin-only).

## Requested Changes (Diff)

### Add
- **Homepage redesign**: New enterprise landing page with three distinct division cards — Recordings, Comics (StripClub Comics, 12+ rated), and Actors. Each card links to its dedicated division page. Keep hero and brand identity.
- **Recordings page** (`/recordings`): Showcases GOAT Music's recording label division — artists and releases managed via existing backend data. Essentially the current Roster + Catalog content merged into one division page.
- **Comics page** (`/comics`): StripClub Comics division. 12+ age rating badge prominently displayed. Static description page explaining the comics brand under GOAT enterprise. Link/reference to the StripClub Comics property.
- **Actors page** (`/actors`): Talent/acting division. Admin can add/manage actors. Each actor has: name, role/specialty, bio, imageUrl. Public listing page.
- **Actor types in backend**: `Actor` type with id, name, specialty, bio, imageUrl. CRUD endpoints: `addActor`, `updateActor`, `deleteActor`, `getActor`, `listActors`.
- **Enterprise license section** on homepage: Brief statement that Recordings, Comics, and Actors operate under the GOAT Enterprise License.
- **Nav update**: Replace Roster/Catalog with Recordings, Comics, Actors (+ Admin for admins). Keep Home link.
- **Admin panel expansion**: Add actor management tab alongside artist management.

### Modify
- **HomePage**: Completely replace content — new hero still uses GOAT brand, but body becomes three enterprise division cards + an enterprise license statement section.
- **Layout/nav**: Update nav links to reflect new division structure.
- **AdminPage**: Add actor management tab (add/edit/delete actors).

### Remove
- Standalone `/roster` and `/catalog` routes (content moves to `/recordings` page).
- Old feature cards (Artist Development, Global Distribution, Award-Winning Catalog) — replaced by division cards.

## Implementation Plan
1. Update `main.mo` backend: add `Actor` type, stable storage, CRUD functions.
2. Run `generate_motoko_code` to regenerate backend and `backend.d.ts`.
3. Frontend:
   - Update `App.tsx`: add routes `/recordings`, `/comics`, `/actors`; remove `/roster`, `/catalog`.
   - Update `Layout.tsx`: new nav links (Home, Recordings, Comics, Actors, Admin).
   - Rewrite `HomePage.tsx`: enterprise hero + three division feature cards with links, enterprise license section.
   - Create `RecordingsPage.tsx`: merged artist roster + music releases view (reads from existing backend).
   - Create `ComicsPage.tsx`: StripClub Comics static division page, 12+ badge, brand info.
   - Create `ActorsPage.tsx`: public actor listing, fetches from backend.
   - Update `AdminPage.tsx`: add actors tab for managing actor records.
