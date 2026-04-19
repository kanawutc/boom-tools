# Boom Tools — Task Breakdown

## Phase 1: Migration + Foundation ✅ DONE
- [x] Clone property-marketplace → homes-kanawut
- [x] Deploy homes.kanawut.com on Vercel
- [x] Password protection (Next.js middleware)
- [x] Rebrand → homes.kanawut.com
- [x] Fix Vercel routing (framework detection)
- [x] Deploy kanawut.com (main menu + gas station tool)

## Phase 2: Data Power 🔄 IN PROGRESS
- [x] Provision Neon PostgreSQL via Vercel Integration
- [ ] Connect Neon DB to homes-kanawut project (needs dashboard)
- [ ] Update DATABASE_URL env var with real Neon connection string
- [ ] Run `prisma db push` to create tables
- [ ] Enable PostGIS + pg_trgm extensions
- [ ] Write NPA import script (SQLite → PostgreSQL)
- [ ] Import 70,856+ NPA properties from 12 sources
- [ ] Fix 12,601 properties with zero images (placeholder)
- [ ] Verify listing pages display data

## Phase 3: Map Search
- [ ] Build full-screen 3-panel map layout (/map)
- [ ] Source filter component (color-coded checkboxes)
- [ ] Color-coded pins by source on map
- [ ] Bounds-based search tRPC API
- [ ] Right sidebar property cards
- [ ] Pin ↔ Card hover interaction
- [ ] Cluster + price labels
- [ ] "ค้นหาในพื้นที่นี้" button

## Phase 4: NPA Landing + SEO
- [ ] Build /npa page (bank filter + stats)
- [ ] Discount % badge, appraisal vs sale price
- [ ] Update homepage (NPA category + stats)
- [ ] SEO: OG tags, canonical URLs, JSON-LD
- [ ] Sitemap for 100k+ URLs

## Phase 5: Advanced Features
- [ ] Area comparison tool
- [ ] ROI calculator for NPA
- [ ] AI property recommendation
- [ ] Push notifications for new listings
