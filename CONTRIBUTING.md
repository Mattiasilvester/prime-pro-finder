# 🤝 Contributing to Prime Pro Finder

Grazie per il tuo interesse nel contribuire a **Prime Pro Finder**! 🎉

Questo documento fornisce le linee guida per contribuire al progetto. Seguendo queste regole, aiuterai a mantenere il codice pulito, consistente e di alta qualità.

---

## 📋 Indice

- [Code of Conduct](#code-of-conduct)
- [Come Posso Contribuire?](#come-posso-contribuire)
- [Setup Ambiente di Sviluppo](#setup-ambiente-di-sviluppo)
- [Workflow di Sviluppo](#workflow-di-sviluppo)
- [Code Style Guidelines](#code-style-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Checklist](#testing-checklist)
- [Domande Frequenti](#domande-frequenti)

---

## 📜 Code of Conduct

### I Nostri Standard

**Comportamenti incoraggiati:**
- ✅ Usare linguaggio accogliente e inclusivo
- ✅ Rispettare punti di vista ed esperienze diverse
- ✅ Accettare critiche costruttive con grazia
- ✅ Concentrarsi su ciò che è meglio per la community
- ✅ Mostrare empatia verso altri membri della community

**Comportamenti non accettati:**
- ❌ Linguaggio o immagini sessualizzate
- ❌ Trolling, insulti o attacchi personali
- ❌ Molestie pubbliche o private
- ❌ Pubblicare informazioni private altrui senza permesso
- ❌ Altre condotte non professionali

### Segnalazioni

Comportamenti inappropriati possono essere segnalati a: **info@performanceprime.it**

---

## 🚀 Come Posso Contribuire?

### 🐛 Segnalare Bug

Prima di segnalare un bug:
1. **Verifica** che non sia già stato segnalato nelle [Issues](https://github.com/your-repo/issues)
2. **Raccogli informazioni**: Browser, OS, steps per riprodurre, screenshot

**Template Bug Report:**
```markdown
**Descrizione del Bug**
Descrizione chiara e concisa del problema.

**Steps per Riprodurre**
1. Vai su '...'
2. Clicca su '...'
3. Scrolla fino a '...'
4. Vedi errore

**Comportamento Atteso**
Cosa ti aspettavi che succedesse.

**Screenshot**
Se applicabile, aggiungi screenshot.

**Ambiente:**
- OS: [es. iOS, Windows]
- Browser: [es. Chrome 120, Safari 17]
- Versione: [es. 2.1.0]
```

### ✨ Suggerire Nuove Features

**Template Feature Request:**
```markdown
**La Feature è Collegata a un Problema?**
Descrizione chiara del problema. Es: "Sono sempre frustrato quando [...]"

**Descrizione della Soluzione**
Descrizione chiara di cosa vorresti che accadesse.

**Alternative Considerate**
Altre soluzioni o features alternative considerate.

**Mockup/Wireframe**
Se possibile, aggiungi immagini o sketch.
```

### 💻 Contribuire con Codice

Accettiamo contributi per:
- ✅ Bug fixes
- ✅ Nuove features (discusse prima)
- ✅ Miglioramenti UI/UX
- ✅ Ottimizzazioni performance
- ✅ Documentazione
- ✅ Test

---

## 🛠️ Setup Ambiente di Sviluppo

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (o yarn/pnpm)
- **Git**
- **Account Supabase** (per database)

### Installation

```bash
# 1. Fork il repository su GitHub
# 2. Clone il tuo fork
git clone https://github.com/your-username/prime-pro-finder.git
cd prime-pro-finder

# 3. Aggiungi il repository originale come upstream
git remote add upstream https://github.com/original-repo/prime-pro-finder.git

# 4. Installa dipendenze
npm install

# 5. Copia .env.example e configura
cp .env.example .env.local
# Modifica .env.local con le tue credenziali Supabase

# 6. Avvia dev server
npm run dev
```

### Verifica Setup

- Apri [http://localhost:5173](http://localhost:5173)
- Dovresti vedere la homepage
- Verifica che filtri e ricerca funzionino

---

## 🔄 Workflow di Sviluppo

### 1. Sincronizza con Upstream

Prima di iniziare a lavorare:

```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```

### 2. Crea Feature Branch

```bash
# Nomina il branch in modo descrittivo
git checkout -b feature/nome-feature
# oppure
git checkout -b fix/nome-bug
```

**Naming Conventions:**
- `feature/*` - Nuove funzionalità
- `fix/*` - Bug fixes
- `docs/*` - Documentazione
- `refactor/*` - Refactoring codice
- `style/*` - Styling (no logic)
- `test/*` - Aggiunta test

### 3. Sviluppa e Testa

```bash
# Lavora al tuo branch
# Committa frequentemente (small commits)
git add .
git commit -m "feat: descrizione modifiche"

# Testa sempre prima di pushare
npm run build
npm run lint
```

### 4. Push e Pull Request

```bash
# Push al tuo fork
git push origin feature/nome-feature

# Vai su GitHub e apri una Pull Request
```

---

## 📐 Code Style Guidelines

### TypeScript

#### ✅ DO
```typescript
// Type safety - sempre tipizzato
interface Professional {
  id: string;
  name: string;
  category: string;
}

function getProfessional(id: string): Promise<Professional> {
  // implementation
}

// Use const per variabili non riassegnate
const MAX_RESULTS = 20;

// Destructuring
const { id, name } = professional;
```

#### ❌ DON'T
```typescript
// No any types
function getData(id: any): any { }

// No var
var count = 0;

// No type assertions senza motivo
const data = response as any;
```

### React Components

#### ✅ DO
```typescript
// Functional components con TypeScript
interface Props {
  title: string;
  onClick: () => void;
}

export function MyComponent({ title, onClick }: Props) {
  return <button onClick={onClick}>{title}</button>;
}

// Use memo per componenti pesanti
export const ExpensiveComponent = memo(({ data }: Props) => {
  // render
});
```

#### ❌ DON'T
```typescript
// No class components (prefer functional)
class MyComponent extends React.Component { }

// No inline styles (use Tailwind)
<div style={{ color: 'red' }}>Text</div>

// No props spreading senza type
<Component {...props} />
```

### Tailwind CSS

#### ✅ DO
```typescript
// Use Tailwind utilities
<div className="bg-black text-gold hover:bg-gray-900 transition-colors">
  Content
</div>

// Use cn() per conditional classes
import { cn } from '@/lib/utils';

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  isPremium && "premium-classes"
)}>
```

#### ❌ DON'T
```typescript
// No CSS modules
import styles from './Component.module.css';

// No inline styles
<div style={{ backgroundColor: '#000' }}>

// No styled-components
const StyledDiv = styled.div`...`;
```

### Naming Conventions

| Tipo | Convention | Esempio |
|------|-----------|---------|
| Componenti | PascalCase | `ProfessionalCard.tsx` |
| Functions | camelCase | `getProfessionals()` |
| Hooks | camelCase + use prefix | `useAuth()` |
| Constants | UPPER_SNAKE_CASE | `MAX_PRICE` |
| Types/Interfaces | PascalCase | `Professional`, `SearchFilters` |
| CSS Classes | kebab-case (Tailwind) | `bg-black`, `text-gold` |
| Files (utils) | kebab-case | `format-date.ts` |

### Imports Order

```typescript
// 1. React imports
import { useState, useEffect } from 'react';

// 2. Third-party libraries
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

// 3. Components
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';

// 4. Utils & Hooks
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

// 5. Types
import type { Professional } from '@/types/professional';

// 6. Styles (se necessari)
import './styles.css';
```

---

## 📝 Commit Guidelines

Seguiamo [Conventional Commits](https://www.conventionalcommits.org/).

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type | Descrizione | Esempio |
|------|-------------|---------|
| `feat` | Nuova feature | `feat: aggiungi sistema preferiti` |
| `fix` | Bug fix | `fix: correggi scroll infinito` |
| `docs` | Documentazione | `docs: aggiorna README con deploy` |
| `style` | Formattazione | `style: formatta Header component` |
| `refactor` | Refactoring | `refactor: ottimizza query Supabase` |
| `test` | Test | `test: aggiungi test per auth` |
| `chore` | Manutenzione | `chore: aggiorna dipendenze` |
| `perf` | Performance | `perf: lazy load immagini` |

### Esempi

```bash
# Feature
git commit -m "feat: aggiungi filtro per range prezzo"

# Fix
git commit -m "fix: risolvi mobile menu slide direction"

# Docs
git commit -m "docs: aggiungi guida contributing"

# Con scope
git commit -m "feat(auth): implementa login con Google"

# Con body
git commit -m "fix: correggi align icon-text

Aggiunto items-start e mt-0.5 sull'icona per
allineamento perfetto della prima lettera."

# Breaking change
git commit -m "feat!: cambia struttura database

BREAKING CHANGE: La tabella professionals ora richiede
il campo slug. Eseguire migrazione prima di deploy."
```

---

## 🔍 Pull Request Process

### Prima di Aprire la PR

1. ✅ Codice compila senza errori
2. ✅ Lint passa senza warning
3. ✅ Testato su desktop e mobile
4. ✅ Branch aggiornato con main
5. ✅ Commit seguono le convenzioni

### Template PR

```markdown
## Descrizione
Descrizione chiara delle modifiche.

## Tipo di Modifica
- [ ] Bug fix (non-breaking)
- [ ] Nuova feature (non-breaking)
- [ ] Breaking change (fix/feature che causa comportamenti non retro-compatibili)
- [ ] Documentazione

## Testing
Descrivi i test effettuati:
- [ ] Desktop (Chrome, Firefox, Safari)
- [ ] Mobile (iOS, Android)
- [ ] Tablet

## Checklist
- [ ] Codice segue style guidelines
- [ ] Self-review completata
- [ ] Commenti aggiunti in sezioni complesse
- [ ] Documentazione aggiornata
- [ ] Nessun warning generato
- [ ] Test aggiunti (se applicabile)

## Screenshot
Se applicabile, aggiungi screenshot.

## Note Aggiuntive
Info aggiuntive per i reviewer.
```

### Review Process

1. **Automatic Checks** - Vercel build, lint
2. **Code Review** - Almeno 1 approvazione richiesta
3. **Testing** - Team testa le modifiche
4. **Merge** - Squash & merge su main

### Dopo il Merge

Il tuo branch verrà automaticamente cancellato. Nel tuo fork:

```bash
git checkout main
git pull upstream main
git push origin main
```

---

## ✅ Testing Checklist

Prima di aprire una PR, verifica:

### Code Quality
- [ ] `npm run build` - Build completa senza errori
- [ ] `npm run lint` - No ESLint errors/warnings
- [ ] TypeScript strict mode - No `any` types
- [ ] No console.log dimenticati

### Functionality
- [ ] Feature funziona come previsto
- [ ] Edge cases gestiti
- [ ] Error handling presente
- [ ] Loading states implementati

### UI/UX
- [ ] Design consistente con il resto dell'app
- [ ] Colori brand (nero #000000, gold #EEBA2B)
- [ ] Responsive su tutti i breakpoints:
  - [ ] Mobile portrait (375px)
  - [ ] Mobile landscape (667px)
  - [ ] Tablet (768px)
  - [ ] Desktop (1024px+)
- [ ] Animazioni smooth (no jank)
- [ ] Hover states presenti

### Accessibility
- [ ] Tutti gli elementi interattivi sono accessibili da tastiera
- [ ] `aria-label` su icone/bottoni senza testo
- [ ] Contrasto colori sufficiente (WCAG AA)
- [ ] Form con label appropriate

### Performance
- [ ] Immagini ottimizzate
- [ ] No re-render inutili
- [ ] Lazy loading dove appropriato
- [ ] No memory leaks

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### SEO (se applicabile)
- [ ] Meta tags presenti
- [ ] Semantic HTML (header, main, nav, etc.)
- [ ] Alt text su immagini
- [ ] H1 unico per pagina

---

## ❓ Domande Frequenti

### Come sincronizzo il mio fork?

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### Posso lavorare direttamente su main?

❌ No. Crea sempre un feature branch per le tue modifiche.

### Quanto grande dovrebbe essere una PR?

Idealmente:
- **Small PR** - 1 feature, 1 bug fix (preferito)
- **Medium PR** - Feature complessa ma single-purpose
- ❌ **Large PR** - Evita PR con 20+ file modificati

### Cosa faccio se la mia PR ha conflitti?

```bash
# Nel tuo branch
git fetch upstream
git merge upstream/main
# Risolvi conflitti manualmente
git add .
git commit -m "fix: risolvi conflitti merge"
git push origin feature/nome-feature
```

### Posso usare librerie esterne?

Sì, ma:
1. Discuti prima aprendo una Issue
2. Verifica che sia mantenuta attivamente
3. Controlla la licenza (deve essere compatibile con MIT)
4. Considera l'impatto sul bundle size

### Come testo le modifiche localmente?

```bash
npm run dev          # Development mode
npm run build        # Production build
npm run preview      # Preview production build
```

---

## 📚 Risorse Utili

- [PROMPT_MASTER.md](./PROMPT_MASTER.md) - Guida development completa
- [.cursorrules](./.cursorrules) - Regole tecniche
- [work.md](./work.md) - Cronologia sessioni
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)

---

## 🙏 Grazie!

Ogni contributo, piccolo o grande, è prezioso per il progetto! 💪

Se hai domande, non esitare a:
- Aprire una [Discussion](https://github.com/your-repo/discussions)
- Contattarci a **info@performanceprime.it**

---

<div align="center">

**Fatto con ❤️ dalla Community Performance Prime**

[⬆ Torna su](#-contributing-to-prime-pro-finder)

</div>

