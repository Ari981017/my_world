# My World - Interactive 3D Travel Experience

Un'applicazione web interattiva che combina esperienze di viaggio e curriculum professionale attraverso un viaggio virtuale su un globo 3D con animazioni di volo. Il progetto è stato creato da **Arianna Toniolo** come portfolio interattivo che unisce passione per i viaggi e competenze di sviluppo software.

## Specifiche Tecniche

### Stack Tecnologico

#### Core Dependencies

- **React** `19.2.0` - Library UI con supporto completo per hooks e concurrent rendering
- **TypeScript** `5.9.3` - Type safety e developer experience migliorata
- **Vite** `7.2.4` - Build tool ultra-veloce con HMR (Hot Module Replacement)

#### 3D Rendering & Animation

- **Three.js** `0.182.0` - Engine 3D per rendering del globo terrestre
- **@react-three/fiber** `9.5.0` - React renderer per Three.js con dichiarative syntax
- **@react-three/drei** `10.7.7` - Helper components per Three.js (OrbitControls, useGLTF, ecc.)
- **GSAP** `3.14.2` - GreenSock Animation Platform per animazioni fluide e timeline-based

#### State Management & UI

- **Zustand** `5.0.11` - State management leggero e performante
- **React Icons** `5.5.0` - Libreria di icone per UI elements

#### Development Tools

- **ESLint** `9.39.1` - Linting con regole React e TypeScript
- **TypeScript ESLint** `8.46.4` - Parser e rules TypeScript-specifiche

## Features Principali

### Esperienza Visuale

- **Globo 3D Interattivo**:
  - Modello sferico con texture terrestre realistica
  - 64 segmenti per rendering smooth
  - Atmosfera con glow effect (opacità 10%, scala 1.01)
  - Controlli orbit per rotazione e zoom interattivi

- **Animazioni di Volo**:
  - Traiettorie curve realistiche (Quadratic Bezier Curve)
  - Durata volo: 3 secondi con easing `power1.inOut`
  - Altezza di volo: 0.15 unità dal globo
  - Altezza arco: 0.8 unità (punto massimo della parabola)
  - Bank angle: ~18° per effetto inclinazione realistica
  - Bobbing animation per simulare movimento aereo

### Contenuti

- **9 Destinazioni Globali**: Reykjavik, Liverpool, Los Angeles, Mumbai, Madrid, Las Palmas, Copenhagen, Stockholm, Oslo
- **Dual Content**: Ogni destinazione contiene:
  - **VIAGGIO**: Esperienze di viaggio personali (da compilare)
  - **LAVORO**: Esperienze professionali mappate geograficamente

- **Experience Cards**:
  - Design responsive con glassmorphism effect
  - Informazioni dettagliate su tecnologie e responsabilità
  - Bandiere nazionali tramite API [flagcdn.com](https://flagcdn.com)
  - Navigazione tra sezioni VIAGGIO/LAVORO

### Interazione

- **Welcome Screen**: Interfaccia iniziale con call-to-action "INIZIA VIAGGIO"
- **Controlli Camera**:
  - Zoom: distanza min 5.0, max 50 unità
  - Rotazione controllata con vincoli polari
  - Speed: 0.05 rad/frame per rotazione smooth
- **Navigazione Sequenziale**: Button "Continue" per avanzare tra destinazioni

## Setup del Progetto

### Prerequisiti

- Node.js (versione 18 o superiore)
- npm o yarn

### Installazione

```bash
# Clona il repository
git clone <repository-url>

# Installa le dipendenze
npm install

# Avvia il dev server
npm run dev
```

L'applicazione sarà disponibile su `http://localhost:5173`

## Comandi Disponibili

```bash
# Avvia il server di sviluppo
npm run dev

# Build di produzione
npm run build

# Preview della build
npm run preview

# Lint del codice
npm run lint
```

## Architettura del Progetto

### Struttura Directory

```
my-world/
├── src/
│   ├── components/              # Componenti React
│   │   ├── Airplane.tsx        # Modello 3D aereo con animazioni
│   │   ├── Globe.tsx           # Globo 3D con texture e markers
│   │   ├── Scene.tsx           # Scena Three.js principale
│   │   ├── ExperienceCard.tsx  # UI card per esperienze
│   │   ├── ExperienceCard.css  # Stili glassmorphism
│   │   └── WelcomeCard.tsx     # Splash screen iniziale
│   ├── hooks/
│   │   └── useFlightAnimation.ts  # Hook per animazioni GSAP
│   ├── store/
│   │   └── flightStore.ts      # Zustand store (state globale)
│   ├── data/
│   │   └── experiences.ts      # 9 destinazioni con dati completi
│   ├── types/
│   │   └── experience.ts       # TypeScript interfaces
│   ├── utils/
│   │   └── coordinates.ts      # Lat/Lon → Vector3 conversion
│   ├── config/
│   │   └── constants.ts        # Configurazioni globali
│   ├── App.tsx                 # Root component
│   ├── App.css                 # Global styles
│   ├── main.tsx                # Entry point
│   └── index.css               # Base CSS
├── public/
│   └── airplane.glb            # Modello 3D aereo (GLTF format)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Pattern Architetturali

#### State Management (Zustand)

```typescript
interface FlightState {
  currentIndex: number;        // Indice esperienza corrente
  previousIndex: number | null; // Posizione fisica aereo
  isPlaying: boolean;          // Stato animazione
  isTransitioning: boolean;    // Flag transizione in corso
  showCard: boolean;           // Visibilità card esperienza
  hasStarted: boolean;         // Tour iniziato
}
```

**Pattern**: Single source of truth con azioni immutabili

#### Animation System

- **Hook Custom**: `useFlightAnimation` gestisce logica GSAP
- **Tre Stati**:
  1. Initial Positioning (`previousIndex === null`)
  2. No Animation (`previousIndex === currentIndex`)
  3. Flight Animation (`previousIndex → currentIndex`)

#### Component Structure

- **Presentational**: ExperienceCard, WelcomeCard (UI pura)
- **Container**: Scene (logica 3D + state)
- **3D Objects**: Airplane, Globe (Three.js mesh)

## Come Funziona

### Sistema di Animazione

Il sistema di animazione utilizza uno state management a due indici:

- **`currentIndex`**: Indica quale esperienza mostrare nella scheda
- **`previousIndex`**: Traccia la posizione fisica corrente dell'aereo

Questo approccio garantisce la sincronizzazione tra la posizione visuale dell'aereo e l'esperienza mostrata.

### Flusso Utente

1. **Avvio**: Click su "INIZIA VIAGGIO" posiziona l'aereo alla prima destinazione
2. **Navigazione**: Click su "Continua" avvia l'animazione verso la destinazione successiva
3. **Visualizzazione**: Dopo l'animazione, appare la scheda dell'esperienza
4. **Loop**: Il viaggio continua attraverso tutte le destinazioni

## Aggiungere Nuove Destinazioni

### Struttura Dati Experience

Ogni esperienza segue questo schema TypeScript in [src/data/experiences.ts](src/data/experiences.ts):

```typescript
interface Experience {
  id: string;
  location: {
    name: string;                    // "City, Country"
    coordinates: {
      lat: number;                   // Latitudine (-90 a 90)
      lon: number;                   // Longitudine (-180 a 180)
    }
  };
  countryCode: string;               // ISO 3166-1 alpha-2 (es: "IT", "US")
  viaggio: {
    visitDate: string;               // Data visita
    visitDuration: string;           // Durata soggiorno
    description: string;             // Descrizione esperienza
    highlights: string[];            // 3 highlight principali
    tripType: string;                // Tipo viaggio (es: "Lavoro", "Vacanza")
  };
  lavoro: {
    company: string;                 // Nome azienda
    jobTitle: string;                // Ruolo/Posizione
    period: {
      start: string;                 // "YYYY-MM" format
      end: string;                   // "YYYY-MM" o "present"
    };
    technologies: string[];          // Array di tech stack
    description: string;             // Descrizione ruolo
    responsibilities: string[];      // Lista responsabilità
  };
}
```

### Esempio Completo

```typescript
{
  id: "exp-10",
  location: {
    name: "Tokyo, Japan",
    coordinates: { lat: 35.6762, lon: 139.6503 }
  },
  countryCode: "JP",
  viaggio: {
    visitDate: "2024-03",
    visitDuration: "10 giorni",
    description: "Viaggio tra tradizione e innovazione nella capitale giapponese.",
    highlights: [
      "Visita al Senso-ji Temple ad Asakusa",
      "Esperienza culinaria a Tsukiji Market",
      "Cherry blossom nel parco Ueno"
    ],
    tripType: "Vacanza"
  },
  lavoro: {
    company: "Tech Company",
    jobTitle: "Senior Full Stack Developer",
    period: { start: "2024-01", end: "present" },
    technologies: ["React", "Node.js", "TypeScript", "MongoDB"],
    description: "Sviluppo applicazioni enterprise scalabili.",
    responsibilities: [
      "Architettura microservizi",
      "Code review e mentoring team",
      "Performance optimization"
    ]
  }
}
```

### Note Importanti

- Coordinate: Usa [LatLong.net](https://www.latlong.net/) per trovare coordinate precise
- Country Code: Segui [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
- L'ordine nell'array `experiences[]` determina la sequenza del tour

## Configurazione Tecnica

Tutte le configurazioni sono centralizzate in [src/config/constants.ts](src/config/constants.ts):

### Globe Configuration

```typescript
GLOBE_RADIUS = 4.7              // Raggio del globo 3D
GLOBE_SEGMENTS = 64             // Smoothness (64x64 mesh grid)
GLOBE_ATMOSPHERE_COLOR = '#4A90E2'  // Colore glow atmosfera
GLOBE_ATMOSPHERE_OPACITY = 0.1  // Trasparenza atmosfera
GLOBE_ATMOSPHERE_SCALE = 1.01   // Scala atmosfera rispetto al globo
```

### Animation Configuration

```typescript
FLIGHT_DURATION = 3              // Durata volo in secondi
FLIGHT_HEIGHT_OFFSET = 0.15     // Altezza minima dal globo
FLIGHT_ARC_HEIGHT = 0.8         // Altezza massima parabola
FLIGHT_BANK_ANGLE = π * 0.1     // ~18° inclinazione aereo
```

### Airplane Configuration

```typescript
AIRPLANE_SCALE = 0.5            // Scala modello 3D
AIRPLANE_BOBBING_FREQUENCY = 2  // Frequenza oscillazione
AIRPLANE_BOBBING_AMPLITUDE = 0.02  // Ampiezza oscillazione
```

### Camera Configuration

```typescript
CAMERA_MIN_DISTANCE = 5.0       // Zoom minimo
CAMERA_MAX_DISTANCE = 50        // Zoom massimo
CAMERA_ZOOM_SPEED = 1.5         // Velocità zoom
CAMERA_ROTATION_SPEED = 0.05    // Velocità rotazione
CAMERA_PHI_MIN = 0.1            // Limite polare superiore
CAMERA_PHI_MAX = π - 0.1        // Limite polare inferiore
```

### Lighting Configuration

```typescript
AMBIENT_LIGHT_INTENSITY = 1.5   // Luce ambientale
DIRECTIONAL_LIGHT_INTENSITY = 0.5  // Luce direzionale
// Due luci direzionali opposte per illuminazione bilanciata
DIRECTIONAL_LIGHT_POSITIONS = [[5,3,5], [-5,-3,-5]]
```

### External APIs

```typescript
FLAG_CDN_BASE_URL = 'https://flagcdn.com/w160'  // Bandiere paesi
```

## Performance & Ottimizzazioni

### Rendering 3D

- **Geometria Ottimizzata**: 64 segmenti per il globo (bilanciamento qualità/performance)
- **Texture Caching**: Modello GLTF dell'aereo caricato una volta con `useGLTF`
- **Culling**: Three.js gestisce automaticamente frustum culling
- **Frame Rate**: Target 60 FPS su hardware moderno

### Animation

- **GSAP Timeline**: Gestione efficiente di animazioni multiple
- **RequestAnimationFrame**: Sync con refresh rate del browser
- **Kill on Unmount**: Cleanup animazioni per prevenire memory leak

### State Management

- **Zustand**: Overhead minimale (~1KB gzipped)
- **Selective Re-renders**: Components si ri-renderizzano solo quando lo stato necessario cambia
- **No Props Drilling**: Store globale accessibile ovunque

### Bundle Size

```bash
npm run build  # Vite tree-shaking e minification
```

- Estimated bundle: ~300KB gzipped (include Three.js)
- Code splitting automatico per lazy loading

## Problemi Risolti & Changelog

### v1.1.0 - Bug Fix: Animazione Aereo Desincronizzato

**Problema**:
All'avvio del tour, l'aereo volava immediatamente dalla prima destinazione (Reykjavik) alla seconda (Liverpool) invece di apparire fermo alla prima. Questo causava:

- Discrepanza visuale: aereo a Liverpool, card mostra Reykjavik
- Confusione utente: posizione aereo sempre "una destinazione avanti"
- UX scadente: impossibile vedere l'aereo alla prima destinazione

**Causa Root**:
La logica in `useFlightAnimation.ts` calcolava sempre:

```typescript
startPos = experiences[currentIndex]      // Reykjavik
endPos = experiences[currentIndex + 1]    // Liverpool
```

Quindi animava DA `currentIndex` A `currentIndex+1` ad ogni cambio di `currentIndex`.

**Soluzione Implementata**:

1. **Nuovo State**: Aggiunto `previousIndex: number | null` a `flightStore.ts`
   - `null` = aereo non ancora posizionato
   - `number` = posizione fisica corrente dell'aereo

2. **Logica a Tre Casi** in `useFlightAnimation.ts`:
   - **Caso 1** (`previousIndex === null`): Posizionamento iniziale senza animazione
   - **Caso 2** (`previousIndex === currentIndex`): Aereo già a destinazione, skip
   - **Caso 3** (`previousIndex !== currentIndex`): Anima DA `previousIndex` A `currentIndex`

3. **Update Actions**: `nextLocation()`, `previousLocation()`, `goToLocation()` ora settano `isPlaying: true`

**Risultato**:

- ✅ Aereo appare a Reykjavik all'avvio (no animazione)
- ✅ Card e posizione aereo sempre sincronizzati
- ✅ Animazione si attiva solo su click "Continue"
- ✅ Supporta navigazione avanti/indietro e salti

**Files Modificati**:

- [src/store/flightStore.ts](src/store/flightStore.ts) - State + actions
- [src/hooks/useFlightAnimation.ts](src/hooks/useFlightAnimation.ts) - Logica animazione

## Build di Produzione

```bash
# Crea la build ottimizzata
npm run build

# La cartella dist/ conterrà i file pronti per il deploy
```

## Deploy

Il progetto può essere deployato su qualsiasi piattaforma che supporti applicazioni React statiche:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop della cartella `dist/`
- **GitHub Pages**: Usando `gh-pages`

## Licenza

Questo progetto è stato creato come progetto educativo/portfolio.

## Credits

- Modello 3D dell'aereo: [Fonte se disponibile]
- Texture del globo: [Fonte se disponibile]
- Dati geografici: Coordinate latitudine/longitudine
