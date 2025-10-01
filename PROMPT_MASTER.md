# 🎯 PROMPT MASTER - PRIME PRO FINDER (VETRINA PROFESSIONISTI)
**Versione: 2.0 - Data: 01/10/2025**
**Progetto: Vetrina pubblica professionisti fitness integrata con Performance Prime**

---

## ⚠️ ISTRUZIONI CRITICHE PER CURSOR
**LEGGI TUTTO PRIMA DI AGIRE. NON MODIFICARE NULLA SENZA VERIFICARE.**
Questo documento è la fonte di verità per il progetto. Segui ESATTAMENTE queste regole.

---

## 📋 WORKFLOW GIORNALIERO

### 🌅 **INIZIO SESSIONE (COPIA E INCOLLA IN CURSOR):**
```markdown
# INIZIO SESSIONE LAVORO - PRIME-PRO-FINDER

Leggi questi file nell'ordine:
1. .cursorrules - regole e stato del progetto
2. work.md - cronologia sessioni precedenti
3. produzione.md - checklist per deploy
4. NOTE.md - note importanti da ricordare

Poi dimmi:
- Qual è lo stato attuale del progetto?
- Cosa è già funzionante?
- Quali sono i problemi noti?
- Cosa dobbiamo fare oggi prioritariamente?

Rispondi in italiano con un riepilogo chiaro.
```

**Poi esegui:**
```bash
npm run work:start
git pull origin main
npm install (se necessario)
npm run dev
```

### 🌙 **FINE SESSIONE (COPIA E INCOLLA IN CURSOR):**
```markdown
# CHIUSURA SESSIONE LAVORO - PRIME-PRO-FINDER

Analizza tutto il lavoro svolto oggi e:

1. **ELENCA FILE MODIFICATI/CREATI**
   Lista tutti i file toccati con: nuovo/modificato/eliminato

2. **SISTEMI DA PROTEGGERE** 
   Quali componenti sono ora stabili e non vanno più toccati?

3. **PATTERN/REGOLE EMERSE**
   Quali convenzioni o best practice abbiamo scoperto?

4. **BUG RISOLTI**
   Quali problemi abbiamo risolti e come?

5. **GENERA AGGIORNAMENTO per .cursorrules:**

## 📅 SESSIONE [DATA] - [TITOLO BREVE]

### FILE MODIFICATI:
- [lista]

### NUOVI LOCKED:
- [componenti stabili]

### REGOLE AGGIUNTE:
- [pattern scoperti]

### BUG FIXATI:
- [problemi risolti]

### TODO NEXT:
- [prossimi task]

6. **AGGIORNA work.md** con cronologia di oggi

7. **AGGIORNA produzione.md** se necessario

Genera tutto in formato markdown pronto per copia-incolla.
```

**Poi esegui:**
```bash
npm run work:end
git add .
git commit -m "feat: [descrizione modifiche]"
git push origin main
```

---

## 🚀 CONTESTO PROGETTO

### **COSA È:**
- Vetrina pubblica SEO-first per professionisti fitness (PT, nutrizionisti, fisioterapisti, mental coach)
- Marketplace integrato con app Performance Prime (stesso database Supabase)
- Obiettivo: acquisizione organica e conversione in abbonati PP
- Stack: Next.js 14 + Supabase + Tailwind + shadcn/ui

### **STRUTTURA DIRECTORY:**
```
prime-pro-finder/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── Header.tsx       # Navigation principale
│   │   ├── FiltersPanel.tsx # Filtri ricerca
│   │   ├── SearchBar.tsx    # Barra ricerca
│   │   └── ProfessionalCard.tsx # Card professionisti
│   ├── pages/
│   │   ├── Index.tsx        # Homepage con Supabase
│   │   ├── IndexMock.tsx    # Homepage con mock data
│   │   ├── Professionals.tsx # Lista professionisti
│   │   ├── HowItWorks.tsx   # Come funziona
│   │   ├── CategoryPage.tsx # Pagina categoria
│   │   └── CityPage.tsx     # Pagina città
│   ├── lib/
│   │   └── supabase/        # Client e queries
│   ├── data/
│   │   └── mock/            # Dati mock per sviluppo
│   └── types/
│       └── professional.ts   # TypeScript types
├── .cursorrules             # Regole progetto
├── work.md                  # Cronologia lavoro
├── produzione.md            # Checklist deploy
├── NOTE.md                  # Note importanti
└── package.json
```

---

## 🔐 CONFIGURAZIONE

### **VARIABILI AMBIENTE (.env.local):**
```env
NEXT_PUBLIC_SUPABASE_URL=https://rtmkzanycxoygsbavgam.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[chiave-anon]
# NON includere service role key in frontend!
```

### **DATABASE SUPABASE (CONDIVISO CON PP):**
```sql
-- Tabella professionals
CREATE TABLE professionals (
  id UUID PRIMARY KEY,
  slug TEXT UNIQUE,
  full_name TEXT NOT NULL,
  headline TEXT,
  bio TEXT,
  category TEXT,
  is_partner BOOLEAN DEFAULT false,
  photo_url TEXT,
  city TEXT,
  starting_price DECIMAL(10,2),
  rating_avg DECIMAL(3,2),
  rating_count INTEGER,
  services JSONB,
  available_online BOOLEAN,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Altre tabelle (da PP)
users (auth.users)
subscriptions
bookings
reviews
```

---

## 🔒 SISTEMI LOCKED - NON MODIFICARE

### **1. COMPONENTI UI STABILI ✅**
```typescript
// NON MODIFICARE - Già ottimizzati e testati
- Header.tsx          // Navigation desktop/mobile
- Mobile Menu         // Slide from right, gradient bg
- Slider UI           // Visual behavior perfetto
- SearchBar           // Text visibility fixed
- PromoBanner         // Button styling corretto
- HowItWorks page     // Completa con animazioni
- Testimonial Carousel// Infinite scroll funzionante
- Filter URL System   // Query params persistence
```

### **2. PATTERN CONSOLIDATI ✅**
```typescript
// Icon-Text Alignment Pattern
<div className="flex items-start gap-3">
  <CheckCircle className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
  <span className="text-gray-200 leading-6">{text}</span>
</div>

// URL Filter Persistence Pattern
const [searchParams, setSearchParams] = useSearchParams();
const [filters, setFilters] = useState<SearchFilters>(() => {
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  return { query, category };
});

// Page Scroll Pattern
useEffect(() => {
  window.scrollTo(0, 0);
}, []);

// Infinite Carousel CSS
@keyframes scroll-right {
  0% { transform: translateX(-33.333%); }
  100% { transform: translateX(0); }
}
```

### **3. ROUTING STRUCTURE ✅**
```typescript
// React Router DOM - NON cambiare struttura
<Routes>
  <Route path="/" element={<IndexSupabase />} />
  <Route path="/mock" element={<Index />} />
  <Route path="/professionisti" element={<Professionals />} />
  <Route path="/professionista/:slug" element={<ProfessionalDetail />} />
  <Route path="/come-funziona" element={<HowItWorks />} />
  <Route path="/categoria/:category" element={<CategoryPage />} />
  <Route path="/citta/:city" element={<CityPage />} />
</Routes>
```

---

## 📐 REGOLE E CONVENZIONI

### **TYPESCRIPT STRICT:**
```typescript
// ❌ MAI
const data: any = await fetch();
function process(item) { }

// ✅ SEMPRE
const data: Professional[] = await fetch();
function process(item: Professional): void { }
```

### **TAILWIND ONLY:**
```typescript
// ❌ MAI CSS modules o styled-components
// ✅ SEMPRE Tailwind classes
className="bg-black text-gold hover:bg-gray-900"
```

### **BRAND COLORS:**
```typescript
// Colori ufficiali Performance Prime
const colors = {
  black: '#000000',
  gold: '#EEBA2B',
  white: '#FFFFFF',
  gray: {
    100: '#F7F7F7',
    200: '#E5E5E5',
    900: '#1A1A1A'
  }
}
```

### **SUPABASE QUERIES:**
```typescript
// Pattern per query sicure
const { data, error } = await supabase
  .from('professionals')
  .select('*')
  .eq('active', true)
  .order('rating_avg', { ascending: false });

if (error) {
  console.error('Error:', error);
  return [];
}
```

### **COMPONENT PATTERNS:**
```typescript
// Loading State Pattern
const [loading, setLoading] = useState(true);

// Error Handling Pattern
const [error, setError] = useState<string | null>(null);

// Form con Zod
const schema = z.object({
  email: z.string().email('Email non valida'),
  message: z.string().min(10, 'Minimo 10 caratteri')
});
```

---

## 📊 STATO ATTUALE PROGETTO

### **✅ COMPLETATO:**
- Setup iniziale e configurazione
- Connessione Supabase funzionante
- Homepage con dati reali da DB
- Pagina "Come Funziona" completa
- Sistema filtri con URL persistence
- Mobile menu e navigation
- Testimonial carousel infinito
- UI/UX base rifinita

### **🚧 IN PROGRESS:**
- Sostituzione completa mock data
- Pagina dettaglio professionista
- Sistema prenotazioni

### **📝 TODO PRIORITARI:**
1. [ ] Completare migrazione da mock a Supabase
2. [ ] Implementare auth flow (login/signup)
3. [ ] Aggiungere loading states ovunque
4. [ ] Creare pagina professionista/:slug
5. [ ] Implementare form contatto
6. [ ] Sistema preferiti utente
7. [ ] SEO metadata dinamici
8. [ ] Analytics (GA4 + Hotjar)

### **🐛 BUG NOTI:**
- Nessun bug critico al momento

---

## 🚨 CHIEDERE SEMPRE CONFERMA PER:

1. **Modifiche schema database** - Impatta PP
2. **Cambio routing structure** - Breaking change
3. **Modifiche componenti LOCKED** - Già ottimizzati
4. **Update dipendenze major** - Possibili breaking
5. **Cambio colori brand** - Deve essere consistente con PP
6. **Modifiche auth flow** - Sicurezza critica
7. **Deploy in produzione** - Richiede review

---

## 💡 BEST PRACTICES

### **COMMIT MESSAGES:**
```bash
feat: aggiunta nuova funzionalità
fix: risoluzione bug
docs: aggiornamento documentazione
style: modifiche styling (no logic)
refactor: refactoring codice
test: aggiunta test
chore: task di manutenzione
```

### **BRANCH STRATEGY:**
```bash
main        # Produzione
develop     # Sviluppo
feature/*   # Nuove features
fix/*       # Bug fixes
```

### **TESTING CHECKLIST:**
- [ ] Desktop Chrome/Firefox/Safari
- [ ] Mobile iOS/Android
- [ ] Tablet portrait/landscape
- [ ] Dark mode (se implementato)
- [ ] Filtri e ricerca
- [ ] Navigation flow
- [ ] Form validation

---

## 📈 METRICHE SUCCESSO

- **SEO:** Posizione top 3 per "personal trainer [città]"
- **Conversione:** 5% visitatori → abbonati PP
- **Performance:** Lighthouse score > 90
- **Mobile:** 70% traffico mobile ottimizzato
- **Engagement:** Tempo medio > 3 minuti

---

## 🆘 SUPPORTO E RISORSE

- **Documentazione Next.js:** https://nextjs.org/docs
- **Supabase Docs:** https://supabase.com/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com
- **Performance Prime:** Link interno all'app principale

---

## 📅 CRONOLOGIA AGGIORNAMENTI

### **SESSIONE 01/10/2025 - UI/UX REFINEMENT & COME FUNZIONA PAGE**
- ✅ Creata pagina "Come Funziona" completa
- ✅ Fix slider visual behavior
- ✅ Implementato filter persistence con URL
- ✅ Fix mobile menu slide direction
- ✅ Risolti 10 bug critici UI
- ✅ Aggiunto infinite carousel testimonial
- ✅ Ottimizzato scroll-to-top su tutte le pagine

---

## 🎯 COME CURSOR INTERPRETERÀ QUESTO PROMPT

Con questo prompt master, Cursor:

1. **SAPRÀ SEMPRE** il contesto completo del progetto
2. **RISPETTERÀ** i sistemi locked senza romperli
3. **APPLICHERÀ** automaticamente i pattern consolidati
4. **MANTERRÀ** consistenza con brand e convenzioni
5. **EVITERÀ** errori già risolti in passato
6. **GENERERÀ** codice production-ready
7. **DOCUMENTARÀ** automaticamente i progressi

---

**NOTA FINALE:** Questo documento è la SINGLE SOURCE OF TRUTH per il progetto. Aggiornalo SEMPRE a fine sessione con i progressi del giorno. Non modificare MAI i sistemi LOCKED senza discussione approfondita.

---

*PROMPT MASTER V2.0 - PRIME PRO FINDER - NON MODIFICARE SENZA INCREMENTARE VERSIONE*

