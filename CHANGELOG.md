# Changelog

All notable changes to **Prime Pro Finder** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### 🚧 In Development
- Sistema prenotazioni professionisti
- Pagina dettaglio professionista con slug
- Form contatto professionista
- Auth flow completo (login/signup/reset)
- Dashboard utente con preferiti
- Sistema recensioni

---

## [2.1.0] - 2025-10-01

### ✨ Added
- **Pagina "Come Funziona"** completa con:
  - Hero section con title gold
  - 3-step process cards
  - Partner PP section con benefits
  - Infinite carousel testimonial
  - Guarantees section (4 cards)
  - FAQ accordion (5 items)
  - Final CTA
- **Infinite Carousel Testimonial** con scroll automatico seamless
- **Filter URL Persistence** - Filtri salvati in query params per bookmark-friendly
- **Scroll-to-Top** su tutte le pagine al caricamento
- **PROMPT_MASTER.md** - Single source of truth per development
- **README.md** professionale con documentazione completa
- **LICENSE** - MIT License
- **.env.example** - Template configurazione
- **CONTRIBUTING.md** - Guida contributi
- **CHANGELOG.md** - Questo file

### 🔧 Changed
- **Header Navigation:**
  - "Per i Professionisti" → "Diventa Partner" (gold, bold)
  - "Professionisti" e "Come Funziona" → nero, bold (desktop)
- **Mobile Menu:**
  - Slide direction: da destra invece di top
  - Background: gradient-hero
  - Logo text "Performance Prime" in fondo (Cinzel font)
- **Slider UI:**
  - Thumb border: nero invece di gold
  - Range selected: nera
  - Visual behavior: grigio quando al minimo
- **SearchBar:** Text input color → nero per visibilità
- **PromoBanner:** Button "Scopri i Vantaggi" → text nero, bg bianco
- **FiltersPanel:**
  - Rimosso filtro "Valutazione Minima"
  - Rimosso filtro "Disponibile Online"
  - Price range slider: solo max controllabile, min fixed a 30€

### 🐛 Fixed
- **Slider Range Visual** - Linea grigia quando thumb al minimo (30€)
- **Search Bar Text Invisible** - Aggiunto text-black per contrasto
- **Mobile Menu Direction** - Fix slide from right
- **Filter Persistence** - Filtri ora persistono su navigation/reload
- **Contatta Button Navigation** - Rimosso preventDefault che bloccava link
- **Testimonial White Space** - Duplicati 3x per seamless loop
- **Page Scroll Position** - Tutte le pagine caricano al top
- **Icon-Text Alignment** - Fix vertical align con items-start + mt-0.5
- **Partner Badge Size** - Ridotto dimensioni (w-6 h-6, text-base)
- **Partner Card Width** - Accorciata con max-w-5xl

### 🎨 Styling
- **Partner PP Card:**
  - Badge posizionato più in alto
  - Button "Scopri di Più" spostato in basso
  - Benefits grid 2 colonne con icon-text alignment perfetto
- **Guarantees Icons:** Colori differenziati (blue, green, orange, gold)
- **Testimonial Section:** Animation CSS ottimizzata (25s, linear, infinite)

### 📚 Documentation
- Setup completo documentazione progetto
- Package.json scripts: `work:start` e `work:end`
- Contributing guidelines
- Code style conventions
- Development workflow

---

## [2.0.0] - 2025-10-01

### ✨ Added
- **Connessione Supabase** funzionante con database Performance Prime
- **Homepage Dinamica** con query reali (IndexSupabase.tsx)
- **Sistema Filtri Avanzato:**
  - Ricerca per categoria (PT, Nutrizionisti, Fisioterapisti, Mental Coach)
  - Ricerca per città
  - Range di prezzo (30€-150€)
  - Filtro partner Performance Prime
  - Filtro distanza massima
  - Near me (geolocalizzazione)
- **Professional Card** premium per partner (nero/oro)
- **Pagination** risultati ricerca
- **Route Structure:**
  - `/` - Homepage con Supabase
  - `/mock` - Homepage con mock data (dev)
  - `/professionisti` - Lista professionisti
  - `/come-funziona` - How it works
  - `/categoria/:category` - Category pages
  - `/citta/:city` - City pages

### 🔧 Changed
- Migrazione da mock data a Supabase queries
- Type system: creato `supabase-professional.ts` transformer
- Database schema: aggiornata tabella `professionals` con:
  - `slug`, `full_name`, `headline`, `bio`
  - `is_partner`, `photo_url`, `city`
  - `starting_price`, `rating_avg`, `rating_count`
  - `services` (JSON), `available_online`, `active`

### 🗄️ Database
- Setup Row Level Security (RLS) policies
- Public read access per professionisti attivi
- Restricted write access

---

## [1.0.0] - 2025-09-15

### ✨ Added
- **Setup Iniziale Progetto:**
  - Next.js 14 con App Router
  - TypeScript strict mode
  - Tailwind CSS + shadcn/ui
  - React Router DOM
  - Vite build tool
- **UI Components Base:**
  - Header con navigation desktop/mobile
  - Footer
  - SearchBar
  - ProfessionalCard
  - FiltersPanel
  - LoadingSkeleton
  - EmptyState
  - Pagination
- **Pages:**
  - Index (Homepage con mock data)
  - Professionals (Lista)
  - CategoryPage
  - CityPage
  - NotFound
- **Mock Data:** 12 professionisti di esempio
- **Brand System:**
  - Colori: Nero (#000000) e Gold (#EEBA2B)
  - Typography
  - Spacing system
  - Component variants
- **Responsive Design:** Mobile-first approach
- **Accessibility:** ARIA labels, keyboard navigation

### 🎨 Styling
- Gradient hero section
- Card hover effects
- Smooth transitions
- Premium styling per partner
- Badge system

### 📚 Documentation
- `.cursorrules` - Regole base progetto
- `work.md` - Cronologia iniziale
- `produzione.md` - Checklist deploy
- `NOTE.md` - Note importanti

---

## [0.1.0] - 2025-09-01

### 🎉 Initial Release
- Repository creato
- Struttura base progetto
- Package.json configurato
- Git inizializzato

---

## 📝 Legend

- ✨ **Added** - Nuove features
- 🔧 **Changed** - Modifiche a features esistenti
- 🗑️ **Deprecated** - Features che saranno rimosse
- ❌ **Removed** - Features rimosse
- 🐛 **Fixed** - Bug fixes
- 🔒 **Security** - Vulnerabilità fixate
- 🎨 **Styling** - Modifiche UI/design
- 📚 **Documentation** - Aggiornamenti documentazione
- 🗄️ **Database** - Modifiche schema/migrations
- ⚡ **Performance** - Ottimizzazioni performance

---

## 🔗 Links

- [Repository](https://github.com/your-username/prime-pro-finder)
- [Documentation](./PROMPT_MASTER.md)
- [Contributing](./CONTRIBUTING.md)
- [Performance Prime](https://performanceprime.it)

---

*Per suggerimenti sul changelog, apri una [Issue](https://github.com/your-repo/issues) o contatta: info@performanceprime.it*

