<div align="center">

# 🏋️ Prime Pro Finder

### **Trova i Migliori Professionisti del Fitness in Italia**

*Vetrina pubblica SEO-first integrata con Performance Prime*

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Powered-green?logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[🌐 Live Demo](#) | [📖 Documentation](./PROMPT_MASTER.md) | [🐛 Report Bug](#) | [✨ Request Feature](#)

---

</div>

## 🎯 Panoramica

**Prime Pro Finder** è la vetrina pubblica di [Performance Prime](https://performanceprime.it), progettata per connettere atleti e appassionati di fitness con i migliori professionisti certificati in Italia.

### 🌟 Caratteristiche Distintive

- 🔍 **Ricerca Intelligente** - Trova professionisti per categoria, città e specializzazione
- ⭐ **Partner Certificati** - Badge esclusivo per i partner Performance Prime
- 💰 **Sconti Esclusivi** - 10% di sconto per abbonati Performance Prime
- 📱 **Mobile-First** - Design responsive ottimizzato per tutti i dispositivi
- 🚀 **SEO Ottimizzato** - Posizionamento organico per acquisizione clienti
- 🎨 **UI/UX Premium** - Design elegante con palette nero e oro

---

## ✨ Features

### 🏠 **Homepage Dinamica**
- Hero section con ricerca rapida
- Carousel professionisti partner
- Sezioni per categoria (PT, Nutrizionisti, Fisioterapisti, Mental Coach)
- Promo banner per abbonamento Performance Prime

### 🔎 **Sistema di Ricerca Avanzato**
- ✅ Filtri per categoria professionale
- ✅ Ricerca geografica per città
- ✅ Range di prezzo personalizzabile
- ✅ Filtro partner Performance Prime
- ✅ Persistenza filtri in URL (bookmark-friendly)

### 👨‍⚕️ **Profili Professionisti**
- Card premium per partner (nero/oro)
- Rating e recensioni
- Servizi offerti e prezzi
- Badge certificazioni
- CTA contatto diretto

### 📄 **Pagine Informative**
- 🏆 Come Funziona - Processo completo con testimonial
- 📍 Pagine città - SEO-optimized per ricerche locali
- 🏷️ Pagine categoria - Listing per specializzazione
- ❓ FAQ e supporto

### 🎪 **Animazioni & Interazioni**
- Infinite carousel testimonial
- Smooth transitions
- Hover effects premium
- Loading states eleganti

---

## 🛠️ Tech Stack

### **Frontend**
- **[Next.js 14](https://nextjs.org/)** - React framework con App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety (strict mode)
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Accessible component library
- **[React Router DOM](https://reactrouter.com/)** - Client-side routing
- **[Lucide React](https://lucide.dev/)** - Beautiful icon set

### **Backend & Database**
- **[Supabase](https://supabase.com/)** - PostgreSQL database + Auth
- **[@supabase/ssr](https://supabase.com/docs/guides/auth/server-side-rendering)** - Server-side rendering support
- **Row Level Security** - Database security policies

### **Form & Validation**
- **[React Hook Form](https://react-hook-form.com/)** - Form state management
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### **Development Tools**
- **[Vite](https://vitejs.dev/)** - Fast build tool
- **[ESLint](https://eslint.org/)** - Code linting
- **[TypeScript ESLint](https://typescript-eslint.io/)** - TypeScript linting rules

---

## 🏗️ Architettura

```
prime-pro-finder/
├── 📁 public/              # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   └── logo-pp.png
│
├── 📁 src/
│   ├── 📁 components/      # React components
│   │   ├── 📁 ui/          # shadcn/ui primitives
│   │   ├── Header.tsx      # Main navigation
│   │   ├── Footer.tsx      # Site footer
│   │   ├── SearchBar.tsx   # Search component
│   │   ├── FiltersPanel.tsx # Advanced filters
│   │   └── ProfessionalCard.tsx # Professional card
│   │
│   ├── 📁 pages/           # Route pages
│   │   ├── Index.tsx       # Homepage (Supabase)
│   │   ├── Professionals.tsx # Professionals listing
│   │   ├── HowItWorks.tsx  # How it works page
│   │   ├── CategoryPage.tsx # Category pages
│   │   └── CityPage.tsx    # City pages
│   │
│   ├── 📁 integrations/    # Third-party integrations
│   │   └── 📁 supabase/
│   │       ├── client.ts   # Supabase client
│   │       └── types.ts    # Database types
│   │
│   ├── 📁 types/           # TypeScript types
│   │   └── professional.ts
│   │
│   ├── 📁 lib/             # Utility functions
│   │   └── utils.ts        # Helper functions
│   │
│   ├── 📁 data/            # Mock data (dev only)
│   │   └── professionals.ts
│   │
│   ├── App.tsx             # App entry point
│   ├── main.tsx            # React DOM render
│   └── index.css           # Global styles
│
├── 📄 PROMPT_MASTER.md     # 🎯 Development guide
├── 📄 .cursorrules         # AI coding rules
├── 📄 work.md              # Session log
├── 📄 produzione.md        # Deployment checklist
├── 📄 NOTE.md              # Important notes
├── 📄 package.json         # Dependencies
├── 📄 tsconfig.json        # TypeScript config
├── 📄 tailwind.config.ts   # Tailwind config
└── 📄 vite.config.ts       # Vite config
```

---

## 🚀 Getting Started

### **Prerequisites**

Assicurati di avere installato:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (o **yarn** / **pnpm** / **bun**)
- **Git** per version control
- Un account **Supabase** (per database)

### **Installation**

1. **Clone il repository:**
```bash
git clone https://github.com/your-username/prime-pro-finder.git
cd prime-pro-finder
```

2. **Installa le dipendenze:**
```bash
npm install
# oppure
yarn install
# oppure
pnpm install
```

3. **Configura le variabili d'ambiente:**

Crea un file `.env.local` nella root del progetto:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# DO NOT expose service_role_key in frontend!
# SUPABASE_SERVICE_ROLE_KEY=your_service_role_key (only for backend)
```

> ⚠️ **Nota:** Non committare mai il file `.env.local` su Git!

4. **Avvia il development server:**
```bash
npm run dev
```

Apri [http://localhost:5173](http://localhost:5173) nel browser.

---

## 💻 Development Workflow

### **📋 Inizio Sessione**

Prima di iniziare a lavorare:

```bash
npm run work:start  # Mostra git status e info progetto
npm run dev         # Avvia dev server
```

Poi in **Cursor AI**, copia e incolla il prompt di inizio sessione da [`PROMPT_MASTER.md`](./PROMPT_MASTER.md).

### **📜 Scripts Disponibili**

| Script | Descrizione |
|--------|-------------|
| `npm run dev` | Avvia development server (Vite) |
| `npm run build` | Build per produzione |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview build locale |
| `npm run lint` | Run ESLint |
| `npm run work:start` | Inizia sessione di lavoro |
| `npm run work:end` | Chiudi sessione di lavoro |

### **🔄 Git Workflow**

Usiamo una strategia di branching semplificata:

```bash
main        # 🚀 Production (always deployable)
develop     # 🔧 Development (staging)
feature/*   # ✨ New features
fix/*       # 🐛 Bug fixes
```

**Esempio workflow:**

```bash
# Crea feature branch
git checkout -b feature/nuova-funzionalita

# Lavora, committa
git add .
git commit -m "feat: aggiunta nuova funzionalità X"

# Push e crea PR
git push origin feature/nuova-funzionalita
```

### **📝 Commit Conventions**

Seguiamo [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nuova funzionalità
- `fix:` Bug fix
- `docs:` Documentazione
- `style:` Formattazione (no logic)
- `refactor:` Refactoring codice
- `test:` Aggiunta test
- `chore:` Task di manutenzione

**Esempi:**
```bash
feat: aggiungi filtro per categoria
fix: risolvi scroll infinito testimonial
docs: aggiorna README con deploy guide
style: formatta Header component
refactor: ottimizza query Supabase
```

### **🌙 Fine Sessione**

Prima di chiudere:

```bash
npm run work:end  # Mostra git status finale
git add .
git commit -m "feat: descrizione modifiche"
git push origin main
```

Poi in **Cursor AI**, usa il prompt di chiusura sessione da [`PROMPT_MASTER.md`](./PROMPT_MASTER.md) per generare la documentazione della giornata.

---

## 🌐 Deployment

### **Vercel (Raccomandato)**

1. **Push su GitHub:**
```bash
git push origin main
```

2. **Connetti a Vercel:**
   - Vai su [vercel.com](https://vercel.com/)
   - Importa il repository GitHub
   - Vercel rileva automaticamente Next.js

3. **Configura Environment Variables:**

In Vercel dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

4. **Deploy:**
```bash
# Vercel deploy automaticamente ad ogni push su main
git push origin main
```

5. **Configura Dominio Custom (Opzionale):**
   - Settings → Domains
   - Aggiungi `primeprofinder.it` (esempio)

### **Build Locale**

Per testare la build di produzione localmente:

```bash
npm run build
npm run preview
```

---

## 🤝 Contributing

Siamo aperti a contributi! Ecco come puoi aiutare:

### **📋 Process**

1. **Fork** il repository
2. **Crea** un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. **Committa** le modifiche (`git commit -m 'feat: Add AmazingFeature'`)
4. **Push** al branch (`git push origin feature/AmazingFeature`)
5. **Apri** una Pull Request

### **✅ Code Style Guidelines**

- ✅ **TypeScript strict mode** - No `any` types
- ✅ **Tailwind CSS only** - No CSS modules
- ✅ **Componenti riutilizzabili** - DRY principle
- ✅ **Accessibilità** - ARIA labels, keyboard navigation
- ✅ **Mobile-first** - Design responsive
- ✅ **SEO-friendly** - Metadata dinamici
- ✅ **Italiano** - Testi in lingua italiana

### **📖 Documentation**

Prima di contribuire, leggi:
- [`PROMPT_MASTER.md`](./PROMPT_MASTER.md) - Development guide completa
- [`.cursorrules`](./.cursorrules) - Regole tecniche del progetto

### **🧪 Testing Checklist**

Prima di aprire una PR, verifica:

- [ ] TypeScript compila senza errori (`npm run build`)
- [ ] ESLint passa (`npm run lint`)
- [ ] Testato su desktop (Chrome, Firefox, Safari)
- [ ] Testato su mobile (iOS Safari, Android Chrome)
- [ ] Filtri e ricerca funzionano correttamente
- [ ] Navigation flow completo
- [ ] Loading states presenti
- [ ] Error handling implementato

---

## 🐛 Bug Reports & Feature Requests

### **🐛 Trovato un bug?**

Apri una **issue** su GitHub con:
- Descrizione del problema
- Steps per riprodurlo
- Screenshot/video se possibile
- Browser e dispositivo usato

### **✨ Vuoi una nuova feature?**

Apri una **issue** con:
- Descrizione della funzionalità
- Use case e benefici
- Mockup/wireframe se possibile

---

## 📊 Roadmap

### **✅ Fase 1 - MVP (Completato)**
- [x] Setup progetto e configurazione
- [x] Connessione Supabase
- [x] Homepage con professionisti
- [x] Sistema ricerca e filtri
- [x] Pagina "Come Funziona"
- [x] Mobile menu e navigation
- [x] UI/UX base rifinita

### **🚧 Fase 2 - Features Core (In Progress)**
- [ ] Auth flow (login/signup)
- [ ] Pagina dettaglio professionista
- [ ] Form contatto professionista
- [ ] Sistema prenotazioni
- [ ] Sistema preferiti utente
- [ ] Dashboard utente

### **📝 Fase 3 - SEO & Marketing**
- [ ] SEO metadata dinamici
- [ ] Sitemap.xml automatica
- [ ] Structured data (JSON-LD)
- [ ] Blog integrato
- [ ] Landing pages città
- [ ] Analytics (GA4 + Hotjar)

### **🚀 Fase 4 - Advanced Features**
- [ ] Chat in-app
- [ ] Sistema recensioni
- [ ] Pagamenti integrati
- [ ] Video consultazioni
- [ ] Notifiche push
- [ ] App mobile (React Native)

---

## 📈 Performance

Target Lighthouse Scores:

- 🟢 **Performance:** 90+
- 🟢 **Accessibility:** 95+
- 🟢 **Best Practices:** 95+
- 🟢 **SEO:** 100

Ottimizzazioni implementate:
- ✅ Image optimization (lazy loading)
- ✅ Code splitting
- ✅ CSS purging (Tailwind)
- ✅ Prefetching con `<Link>`
- ✅ Supabase connection pooling

---

## 🔒 Sicurezza

- ✅ **Row Level Security (RLS)** su Supabase
- ✅ **Input validation** con Zod
- ✅ **Environment variables** protette
- ✅ **No service_role_key** in frontend
- ✅ **HTTPS only** in produzione
- ✅ **CORS policies** configurate

---

## 📝 License

Questo progetto è rilasciato sotto licenza **MIT License**.

Vedi il file [LICENSE](./LICENSE) per i dettagli completi.

```
MIT License

Copyright (c) 2025 Performance Prime

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👥 Team & Contatti

**Prime Pro Finder** è sviluppato e mantenuto dal team di [Performance Prime](https://performanceprime.it).

### **📧 Contatti:**
- **Website:** [performanceprime.it](https://performanceprime.it)
- **Email:** info@performanceprime.it
- **LinkedIn:** [Performance Prime](https://linkedin.com/company/performance-prime)
- **Instagram:** [@performance_prime](https://instagram.com/performance_prime)

### **💼 Per Professionisti:**
Vuoi diventare un partner Performance Prime?
- 📧 **Email:** partner@performanceprime.it
- 📄 **Info:** [performanceprime.it/diventa-partner](https://performanceprime.it/diventa-partner)

---

## 🙏 Ringraziamenti

Grazie a tutti i progetti open-source che hanno reso possibile Prime Pro Finder:

- [Next.js](https://nextjs.org/) - The React Framework
- [Supabase](https://supabase.com/) - Open Source Firebase Alternative
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful Components
- [Lucide](https://lucide.dev/) - Beautiful Icons
- [Vercel](https://vercel.com/) - Deployment Platform

E grazie a tutti i **professionisti del fitness** che rendono possibile la missione di Performance Prime! 💪

---

<div align="center">

**Fatto con ❤️ in Italia**

[⬆ Torna su](#-prime-pro-finder)

</div>
