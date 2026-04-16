# Aurora Glass — Frontend Redesign
**Data:** 2026-04-16  
**Progetto:** my_world  
**Stato:** Approvato

---

## Sommario

Redesign completo del frontend di `my_world` — portfolio interattivo 3D di Arianna Toniolo. Si abbandona la palette ambra/near-black a favore di un'estetica **Aurora Glass — Esplosione**: glassmorphism con aurora boreale animata a saturazione piena (cyan + violet + pink), tipografia Syne, sfondo OLED profondo.

La logica 3D (Globe, Scene, Airplane, LocationMarkers), lo store Zustand e tutti gli hook rimangono **invariati**. Le modifiche riguardano esclusivamente CSS, token, componenti UI overlay e font.

---

## 1. Design System

### Palette — CSS Custom Properties (`src/index.css`)

| Token | Valore | Uso |
|---|---|---|
| `--color-bg` | `#04030c` | Background globale |
| `--color-aurora-cyan` | `#0ea5e9` | Accento primario |
| `--color-aurora-violet` | `#a855f7` | Accento secondario |
| `--color-aurora-pink` | `#f472b6` | Terzo accento (parsimonia) |
| `--color-surface` | `rgba(168,85,247,0.07)` | Superfici vetro |
| `--color-border` | `rgba(168,85,247,0.22)` | Bordi card |
| `--color-border-top` | `rgba(255,255,255,0.15)` | Bordo superiore luminoso |
| `--color-text` | `#f1f5f9` | Testo principale |
| `--color-text-muted` | `#94a3b8` | Testo secondario |

Il token `--color-accent: #f59e0b` (ambra) viene **rimosso**. Tutti i riferimenti ad esso nei CSS vengono migrati ai nuovi token aurora.

### Tipografia

| Font | Peso | Uso |
|---|---|---|
| **Syne** | 700, 800 | Tutti i titoli (`h1`, nomi, location) |
| **Space Grotesk** | 300, 400, 500 | Corpo testo (invariato) |
| **DM Mono** | 400, 500 | Etichette tecniche, badge, contatori |

Caricamento via Google Fonts in `index.html`. Nessuna modifica a font già presenti.

### Signature Details (obbligatori su tutti i componenti)

1. **Bordo superiore luminoso** — `border-top: 1px solid var(--color-border-top)` su ogni superficie vetro
2. **Grain texture** — pseudo-element `::before` con SVG noise filter, `opacity: 0.025`
3. **Aurora background animata** — 3 sfere CSS in `App.tsx` come layer fisso (vedere sezione 6)

---

## 2. WelcomeCard — Corner Card

### Posizione
- Angolo **basso-sinistro**, `position: fixed`, `bottom: 24px`, `left: 24px`
- Desktop: larghezza `300px`
- Mobile (`< 768px`): `width: calc(100vw - 32px)`, centrata, `left: 16px`

### Stile vetro
```css
background: var(--color-surface);
backdrop-filter: blur(32px);
border-radius: 20px 20px 20px 6px; /* angolo basso-sx acuto → ancoraggio */
border: 1px solid var(--color-border);
border-top: 1px solid var(--color-border-top);
box-shadow:
  0 0 80px rgba(168,85,247,0.18),
  0 0 40px rgba(14,165,233,0.10),
  0 24px 60px rgba(0,0,0,0.60);
```

### Struttura JSX (invariata, solo classi CSS aggiornate)
```
ARIANNA TONIOLO          [titolo Syne 800, gradient text]
Full Stack Developer     [DM Mono, cyan opaco]
────────────────────     [divider gradient]
5 anni · PHP · TS · Vue 3 · Node.js · PostgreSQL   [Space Grotesk muted, una riga]

[ INIZIA VIAGGIO ──→ ]   [bottone full-width]
```

### Bottone CTA
```css
background: linear-gradient(135deg, rgba(14,165,233,0.25), rgba(168,85,247,0.35));
border: 1px solid rgba(168,85,247,0.50);
border-radius: 10px;
color: var(--color-text);
font-family: 'DM Mono', monospace;
letter-spacing: 0.15em;
box-shadow: 0 0 24px rgba(168,85,247,0.25);
```
- Hover: freccia `──→` si sposta `translateX(4px)`, glow si intensifica

### Animazioni
- Entrata: `slideInCorner` — `translateY(40px) + opacity:0` → posizione finale, `0.6s cubic-bezier(0.16,1,0.3,1)`, delay `0.3s`
- Uscita (click CTA): `fadeOut + scale(0.95)`, `0.3s ease-in`

---

## 3. ExperienceCard — Right Panel

### Posizione
- Pannello verticale fisso a **destra**, `position: fixed`, `right: 0`, `top: 0`, `height: 100vh`
- Desktop: `width: 380px`
- Mobile (`< 768px`): bottom sheet, `width: 100%`, `height: 65vh`, `bottom: 0`, con drag handle in cima

### Stile vetro
```css
background: rgba(168,85,247,0.06);
backdrop-filter: blur(32px);
border-left: 1px solid rgba(168,85,247,0.28);
border-top: 1px solid var(--color-border-top);
border-radius: 20px 0 0 20px; /* lato sinistro arrotondato, destra incollata allo schermo */
box-shadow: -16px 0 80px rgba(168,85,247,0.15), -4px 0 24px rgba(14,165,233,0.08);
```

### Struttura contenuto
```
🇮🇸  REYKJAVIK, ICELAND                     [✕]
────────────────────────────────────────
Software Architect — Flow Engine AI         [Syne 800, gradient text]
Esosphera  ·  Progetto                      [DM Mono, cyan + muted]
Nov 2022 → presente                         [Space Grotesk muted]

Descrizione ruolo...                        [Space Grotesk 400, line-height 1.7]

RESPONSABILITÀ                              [DM Mono uppercase, opacity 0.5]
· Item uno
· Item due

STACK                                       [DM Mono uppercase, opacity 0.5]
[Node.js]  [TypeScript]  [Redis]            [badge pill, gradient border]

[ PROSSIMA TAPPA ──→ ]                      [CTA full-width, stesso stile Welcome]
```

### Tech badges
```css
border-radius: 20px;
background: transparent;
border: 1px solid rgba(168,85,247,0.35);
font-family: 'DM Mono', monospace;
font-size: 0.65rem;
/* hover: background rgba(168,85,247,0.1) */
```

### Animazioni
- Entrata: `slideInRight` — `translateX(100%)` → `0`, `0.5s cubic-bezier(0.16,1,0.3,1)`
- Stagger interno: titolo `+0s`, company `+0.08s`, descrizione `+0.16s`, badge `+0.24s`, button `+0.32s`
- Uscita: `slideOutRight` — `0.35s ease-in`

### Scrollbar
- Invisibile di default, visibile al hover sul pannello
- `width: 3px`, `thumb: rgba(168,85,247,0.3)`

### Close button
- `position: absolute`, top-right, `24×24px`, `border-radius: 50%`
- `background: rgba(255,255,255,0.06)`, hover `rgba(168,85,247,0.2)`

---

## 4. FlightControls

### Posizione
- `position: fixed`, `bottom: 28px`, centrato orizzontalmente
- Shape: **pill** (`border-radius: 60px`)

### Stile vetro
```css
background: rgba(168,85,247,0.08);
backdrop-filter: blur(28px);
border: 1px solid rgba(168,85,247,0.22);
border-top: 1px solid rgba(255,255,255,0.14);
border-radius: 60px;
box-shadow: 0 0 40px rgba(168,85,247,0.18), 0 8px 40px rgba(0,0,0,0.50);
```

### Struttura interna
```
[ ‹ ]  [● ● ○ ○ ○]  [ REYKJAVIK ]  [ 01/05 ]  [ ▶ ]  [ › ]
```
- Frecce prev/next: `32×32px`, `border-radius: 50%`, border aurora sottile
- Location dots: `8px`, active con `box-shadow: 0 0 10px rgba(14,165,233,0.8)` (glow cyan)
- Location name: Syne 600, gradient text
- Contatore: DM Mono `"01 / 05"`, muted
- Play/pause: `44×44px`, gradient aurora, hover `scale(1.08)`

---

## 5. LoadingScreen

### Layout
- Full screen, stesso background aurora (`#04030c` + sfere animate)
- Contenuto centrato verticalmente

### Elementi
```
        ✦                    [ruota 360° in 8s, colore aurora gradient]
   MY  WORLD                 [Syne 800, clamp(2.5rem,6vw,5rem), gradient text]
   ──────────────            [progress line animata sx→dx]
   CARICAMENTO               [DM Mono, 0.7rem, letter-spacing 0.3em, opacity 0.5]
```

### Animazione uscita
- `opacity: 0 + scale(0.98)`, `0.4s ease-in` quando il globo è pronto

---

## 6. Aurora Background (nuovo componente)

### Componente: `AuroraBackground.tsx`
- Layer `position: fixed`, `inset: 0`, `z-index: 0`, `pointer-events: none`
- 3 sfere `div` con `border-radius: 50%`, `filter: blur(80px)`, `opacity: 0.35`

| Sfera | Colore | Dimensioni | Animazione |
|---|---|---|---|
| 1 — Cyan | `#0ea5e9` | `300×300px` | ellisse top-left, `20s` loop |
| 2 — Violet | `#a855f7` | `400×400px` | direzione opposta top-right, `25s` loop |
| 3 — Pink | `#f472b6` | `200×200px` | pulse in/out bottom, `15s` loop |

- `@media (prefers-reduced-motion)`: animazioni disabilitate, sfere statiche

### Montaggio in `App.tsx`
```tsx
<div className="App">
  <AuroraBackground />   {/* z-index: 0 */}
  <DotGrid ...>          {/* z-index: 1 */}
    <Canvas>...</Canvas>
  </DotGrid>
  <WelcomeCard />        {/* z-index: 10 */}
  <ExperienceCard />     {/* z-index: 10 */}
  <FlightControls />     {/* z-index: 10 */}
</div>
```

---

## 7. DotGrid — modifiche prop

In `App.tsx`:
```tsx
<DotGrid
  baseColor="#04030c"    // era #07080e
  activeColor="#0ea5e9"  // era #f59e0b (ambra → cyan)
  ...
/>
```

---

## 8. Scope — cosa NON cambia

- `Globe.tsx`, `Scene.tsx`, `Airplane.tsx`, `Lighting.tsx`, `LocationMarkers.tsx`, `LocationMarker.tsx`
- `src/store/flightStore.ts`
- `src/hooks/useFlightAnimation.ts`, `src/hooks/useCameraFlightFollow.ts`
- `src/data/experiences.ts`, `src/types/experience.ts`, `src/utils/coordinates.ts`
- Struttura JSX di tutti i componenti UI (solo CSS e token cambiano, salvo nuovo `AuroraBackground`)

---

## 9. Note implementative

- **z-index**: i valori 0/1/10 indicati in sezione 6 sono indicativi. Durante l'implementazione verificare i valori esistenti nei CSS per evitare conflitti.
- **Grain texture**: applicata tramite `::before` pseudo-element su ogni singola card (non globalmente) per non interferire con il canvas Three.js.
- **Google Fonts**: aggiungere Syne e DM Mono in `index.html` prima di qualsiasi altra modifica CSS.

---

## 10. File coinvolti

| File | Tipo modifica |
|---|---|
| `src/index.css` | Token palette, import font |
| `index.html` | Import Google Fonts (Syne, DM Mono) |
| `src/App.tsx` | Aggiunta `AuroraBackground`, DotGrid props |
| `src/components/AuroraBackground.tsx` | **Nuovo file** |
| `src/components/WelcomeCard.css` | Redesign completo |
| `src/components/ExperienceCard.css` | Redesign completo |
| `src/components/FlightControls.css` | Redesign completo |
| `src/components/LoadingScreen.tsx` | Inline styles + struttura aggiornate |
