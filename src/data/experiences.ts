import type { Experience } from '../types/experience';

export const experiences: Experience[] = [
  {
    id: "exp-1",
    location: {
      name: "Reykjavik, Iceland",
      coordinates: { lat: 64.1466, lon: -21.9426 }
    },
    countryCode: "IS",
    viaggio: {
      visitDate: "[DA COMPILARE]",
      visitDuration: "[DA COMPILARE]",
      description: "[PLACEHOLDER] Inserisci qui la tua esperienza di viaggio in Islanda.",
      highlights: [
        "[Da compilare - esperienza memorabile 1]",
        "[Da compilare - esperienza memorabile 2]",
        "[Da compilare - esperienza memorabile 3]"
      ],
      tripType: "[Da compilare]"
    },
    lavoro: {
      company: "Esosphera",
      jobTitle: "Full Stack Developer",
      period: { start: "2022-11", end: "present" },
      technologies: ["PHP", "Yii2", "Node.js", "TypeScript", "Vue 3", "PostgreSQL", "REST APIs"],
      description: "Sviluppo di applicazioni web aziendali scalabili presso una software house specializzata in soluzioni enterprise. Ruolo full stack tra backend PHP/Node.js e frontend Vue 3, con forte focus su qualità del codice, integrazione API e architetture modulari.",
      responsibilities: [
        "Progettazione e sviluppo backend con PHP/Yii2, Node.js e TypeScript",
        "Realizzazione interfacce dinamiche con Vue 3",
        "Integrazione API esterne (WhatsApp, SMS, Email)",
        "Implementazione autenticazione JWT e autorizzazione basata su ruoli (RBAC)",
        "Documentazione API con Swagger e testing con PHPUnit",
        "Collaborazione cross-team in metodologia Agile per rilasci iterativi"
      ]
    }
  },
  {
    id: "exp-2",
    location: {
      name: "Liverpool, UK",
      coordinates: { lat: 53.4084, lon: -2.9916 }
    },
    countryCode: "GB",
    viaggio: {
      visitDate: "[DA COMPILARE]",
      visitDuration: "[DA COMPILARE]",
      description: "[PLACEHOLDER] Inserisci qui la tua esperienza di viaggio a Liverpool.",
      highlights: [
        "[Da compilare - esperienza memorabile 1]",
        "[Da compilare - esperienza memorabile 2]",
        "[Da compilare - esperienza memorabile 3]"
      ],
      tripType: "[Da compilare]"
    },
    lavoro: {
      company: "",
      jobTitle: "Frontend Lead — Modulo Multicanale",
      period: { start: "2022-11", end: "present" },
      periodLabel: "Progetto",
      technologies: ["Vue 3", "Yii2", "Pinia", "Vee-Validate", "REST APIs", "JavaScript"],
      description: "Sviluppo del wizard di configurazione per campagne marketing omnicanale, uno degli strumenti core della piattaforma. Gestione dell'intero ciclo frontend: architettura dei componenti, validazioni, state management e ottimizzazione UX per flussi complessi.",
      responsibilities: [
        "Wizard avanzato per configurare campagne Email, SMS, WhatsApp e Telefono",
        "Architettura componenti Vue 3 riutilizzabili e scalabili",
        "State management con Pinia per flussi multi-step",
        "Validazione dinamica form con Vee-Validate",
        "Integrazione con API backend per la gestione campagne",
        "Performance tuning frontend per ridurre la latenza percepita"
      ],
      video: "/omnichannel_campaign_configuration.mp4"
    }
  },
  {
    id: "exp-3",
    location: {
      name: "Los Angeles, California",
      coordinates: { lat: 34.0522, lon: -118.2437 }
    },
    countryCode: "US",
    viaggio: {
      visitDate: "[DA COMPILARE]",
      visitDuration: "[DA COMPILARE]",
      description: "[PLACEHOLDER] Inserisci qui la tua esperienza di viaggio a Los Angeles.",
      highlights: [
        "[Da compilare - esperienza memorabile 1]",
        "[Da compilare - esperienza memorabile 2]",
        "[Da compilare - esperienza memorabile 3]"
      ],
      tripType: "[Da compilare]"
    },
    lavoro: {
      company: "Previnet S.p.A.",
      jobTitle: "Back-End Developer",
      period: { start: "2022-07", end: "2022-09" },
      technologies: ["Perl", "MySQL", "Linux", "SQL"],
      description: "Sviluppo e refactoring di applicazioni backend legacy per un'azienda nel settore previdenziale. Focus su robustezza del codice, ottimizzazione database e collaborazione con team QA per il rilascio in produzione.",
      responsibilities: [
        "Sviluppo e manutenzione applicazioni backend in Perl",
        "Refactoring codice legacy per migliorare leggibilità e robustezza",
        "Ottimizzazione query MySQL e struttura del database",
        "Progettazione moduli riutilizzabili con documentazione tecnica",
        "Collaborazione con team QA e operations per deployment e monitoraggio"
      ]
    }
  },
  {
    id: "exp-4",
    location: {
      name: "New Delhi, India",
      coordinates: { lat: 28.6139, lon: 77.2090 }
    },
    countryCode: "IN",
    viaggio: {
      visitDate: "[DA COMPILARE]",
      visitDuration: "[DA COMPILARE]",
      description: "[PLACEHOLDER] Inserisci qui la tua esperienza di viaggio a Mumbai.",
      highlights: [
        "[Da compilare - esperienza memorabile 1]",
        "[Da compilare - esperienza memorabile 2]",
        "[Da compilare - esperienza memorabile 3]"
      ],
      tripType: "[Da compilare]"
    },
    lavoro: {
      company: "",
      jobTitle: "Software Architect — Flow Engine AI",
      period: { start: "2023-01", end: "present" },
      periodLabel: "Progetto",
      technologies: ["Node.js", "TypeScript", "XState v5", "Redis", "Microservices", "REST APIs"],
      description: "Progettazione e sviluppo del runtime conversazionale AI-driven, il progetto architetturalmente più complesso della piattaforma. Basato su Finite State Machines con XState v5 in architettura a microservizi, gestisce l'intera logica di esecuzione dei flussi conversazionali.",
      responsibilities: [
        "Architettura a microservizi per il runtime conversazionale AI",
        "Compilazione dinamica di Flow JSON in FSM con XState v5",
        "Snapshot persistence e resume delle conversazioni su Redis",
        "Memory model 3-hash con priorità deterministica",
        "Esposizione di API runtime versionate",
        "Riduzione tempi di risposta del 40% tramite ottimizzazione microservizi"
      ]
    }
  },
  {
    id: "exp-5",
    location: {
      name: "Madrid, Spain",
      coordinates: { lat: 40.4168, lon: -3.7038 }
    },
    countryCode: "ES",
    viaggio: {
      visitDate: "[DA COMPILARE]",
      visitDuration: "[DA COMPILARE]",
      description: "[PLACEHOLDER] Inserisci qui la tua esperienza di viaggio a Madrid.",
      highlights: [
        "[Da compilare - esperienza memorabile 1]",
        "[Da compilare - esperienza memorabile 2]",
        "[Da compilare - esperienza memorabile 3]"
      ],
      tripType: "[Da compilare]"
    },
    lavoro: {
      company: "",
      jobTitle: "API & Integration Specialist",
      period: { start: "2022-11", end: "present" },
      periodLabel: "",
      technologies: ["REST APIs", "Swagger", "PHPUnit", "AWS S3", "WhatsApp API", "Postman"],
      description: "Integrazione di canali di comunicazione esterni nella piattaforma enterprise e definizione degli standard di qualità API. Responsabile della documentazione tecnica e del testing automatizzato degli endpoint.",
      responsibilities: [
        "Integrazione API WhatsApp Business, SMS provider ed Email transazionali",
        "Documentazione API RESTful con Swagger/OpenAPI",
        "Testing automatizzato endpoint con PHPUnit",
        "Gestione file e asset su AWS S3",
        "Definizione standard interni per qualità e manutenibilità API",
        "Validazione contratti API con Postman"
      ]
    }
  },
  {
    id: "exp-6",
    location: {
      name: "Canary Islands",
      coordinates: { lat: 28.1235, lon: -15.4363 }
    },
    countryCode: "ES",
    viaggio: {
      visitDate: "[DA COMPILARE]",
      visitDuration: "[DA COMPILARE]",
      description: "[PLACEHOLDER] Inserisci qui la tua esperienza di viaggio a Las Palmas.",
      highlights: [
        "[Da compilare - esperienza memorabile 1]",
        "[Da compilare - esperienza memorabile 2]",
        "[Da compilare - esperienza memorabile 3]"
      ],
      tripType: "[Da compilare]"
    },
    lavoro: {
      company: "",
      jobTitle: "Database & Performance Engineer",
      period: { start: "2022-11", end: "present" },
      periodLabel: "",
      technologies: ["PostgreSQL", "MySQL", "Redis", "Sybase", "SQL"],
      description: "Ottimizzazione delle performance database sull'intera piattaforma enterprise. Interventi su query critiche, indexing e caching che hanno portato a un miglioramento del 35% nelle performance applicative complessive.",
      responsibilities: [
        "Analisi e riscrittura query SQL critiche per ridurre i tempi di risposta",
        "Miglioramento performance del 35% tramite ottimizzazione PostgreSQL",
        "Implementazione layer di caching con Redis",
        "Refactoring degli schemi database per scalabilità",
        "Gestione migrazioni con zero downtime",
        "Supporto a database Sybase in contesti legacy"
      ]
    }
  },
  {
    id: "exp-7",
    location: {
      name: "Copenhagen, Denmark",
      coordinates: { lat: 55.6761, lon: 12.5683 }
    },
    countryCode: "DK",
    viaggio: {
      visitDate: "[DA COMPILARE]",
      visitDuration: "[DA COMPILARE]",
      description: "[PLACEHOLDER] Inserisci qui la tua esperienza di viaggio a Copenhagen.",
      highlights: [
        "[Da compilare - esperienza memorabile 1]",
        "[Da compilare - esperienza memorabile 2]",
        "[Da compilare - esperienza memorabile 3]"
      ],
      tripType: "[Da compilare]"
    },
    lavoro: {
      company: "",
      jobTitle: "QA & Testing Specialist",
      period: { start: "2022-11", end: "present" },
      periodLabel: "",
      technologies: ["PHPUnit", "Jest", "Swagger", "Postman", "CI/CD"],
      description: "Presidio della qualità del codice attraverso testing automatizzato integrato nel ciclo Agile. Riferimento del team per standard di test, code coverage e processi di quality assurance end-to-end.",
      responsibilities: [
        "Test unitari e di integrazione con PHPUnit",
        "Testing frontend con Jest",
        "Validazione e testing API con Swagger e Postman",
        "Analisi code coverage e individuazione aree critiche",
        "Integrazione test nel pipeline CI/CD",
        "Definizione best practice di testing per il team"
      ]
    }
  },
  {
    id: "exp-8",
    location: {
      name: "Stockholm, Sweden",
      coordinates: { lat: 59.3293, lon: 18.0686 }
    },
    countryCode: "SE",
    viaggio: {
      visitDate: "[DA COMPILARE]",
      visitDuration: "[DA COMPILARE]",
      description: "[PLACEHOLDER] Inserisci qui la tua esperienza di viaggio a Stoccolma.",
      highlights: [
        "[Da compilare - esperienza memorabile 1]",
        "[Da compilare - esperienza memorabile 2]",
        "[Da compilare - esperienza memorabile 3]"
      ],
      tripType: "[Da compilare]"
    },
    lavoro: {
      company: "",
      jobTitle: "Frontend Developer — Vue 3",
      period: { start: "2022-11", end: "present" },
      periodLabel: "",
      technologies: ["Vue 3", "JavaScript", "Pinia", "Bootstrap", "Froala Editor"],
      description: "Sviluppo delle interfacce utente della piattaforma enterprise con Vue 3. Focus su componenti riutilizzabili, esperienza utente fluida e performance lato client.",
      responsibilities: [
        "Sviluppo componenti Vue 3 modulari e riutilizzabili",
        "Integrazione Froala Editor per funzionalità rich text",
        "State management con Pinia per applicazioni multi-modulo",
        "UI responsive con Bootstrap",
        "Ottimizzazione bundle size e caricamento asincrono dei moduli",
        "Implementazione UI fedeli ai mockup in collaborazione con i designer"
      ]
    }
  },
  {
    id: "exp-9",
    location: {
      name: "Oslo, Norway",
      coordinates: { lat: 59.9139, lon: 10.7522 }
    },
    countryCode: "NO",
    viaggio: {
      visitDate: "[DA COMPILARE]",
      visitDuration: "[DA COMPILARE]",
      description: "[PLACEHOLDER] Inserisci qui la tua esperienza di viaggio a Oslo.",
      highlights: [
        "[Da compilare - esperienza memorabile 1]",
        "[Da compilare - esperienza memorabile 2]",
        "[Da compilare - esperienza memorabile 3]"
      ],
      tripType: "[Da compilare]"
    },
    lavoro: {
      company: "",
      jobTitle: "Tech Lead — Backend & Architettura",
      period: { start: "2022-11", end: "present" },
      periodLabel: "",
      technologies: ["Node.js", "Express", "JWT", "AWS S3", "GitLab", "GitHub", "Jira", "Agile/SCRUM"],
      description: "Presidio dell'architettura applicativa e dei processi di sviluppo. Responsabile di sicurezza, versionamento e metodologia Agile nei progetti della piattaforma enterprise.",
      responsibilities: [
        "Implementazione microservizi RESTful con Node.js ed Express",
        "Sicurezza applicativa: autenticazione JWT e sistemi RBAC",
        "Gestione repository Git con GitLab e GitHub",
        "Cloud storage e gestione asset con AWS S3",
        "Facilitazione processi Agile/SCRUM con Jira",
        "Code review e mentoring tecnico del team"
      ]
    }
  }
];
