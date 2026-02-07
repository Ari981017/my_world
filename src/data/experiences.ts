import type { Experience } from '../types/experience';

// Arianna Toniolo's CV - Real work experiences and skills mapped to places visited

export const experiences: Experience[] = [
  {
    id: "exp-1",
    location: {
      name: "Reykjavik, Iceland",
      coordinates: { lat: 64.1466, lon: -21.9426 }
    },
    company: "Esosphera",
    jobTitle: "Full Stack Developer",
    period: { start: "2022-11", end: "present" },
    technologies: ["PHP", "Yii2", "PostgreSQL", "Vue.js", "API RESTful", "Swagger", "PHPUnit"],
    description: "Sviluppo e manutenzione di applicazioni web con focus su integrazione API esterne e ottimizzazione delle performance.",
    responsibilities: [
      "Sviluppo applicazioni web con PHP/Yii2 e PostgreSQL",
      "Integrazione API esterne (WhatsApp, SMS, Email)",
      "Sviluppo nodi personalizzati in FlowDesigner",
      "Ottimizzazione query SQL riducendo i tempi di risposta API",
      "Documentazione e testing API con Swagger e PHPUnit",
      "Collaborazione cross-team con designer e project manager"
    ],
    countryCode: "IS"
  },
  {
    id: "exp-2",
    location: {
      name: "Liverpool, UK",
      coordinates: { lat: 53.4084, lon: -2.9916 }
    },
    company: "Esosphera",
    jobTitle: "Vue.js Project - Modulo Multicanale",
    period: { start: "2022-11", end: "present" },
    technologies: ["Vue.js 3", "Yii2", "Pinia", "Vee-Validate", "API RESTful"],
    description: "Sviluppo wizard multicanale per campagne marketing integrate con API esterne.",
    responsibilities: [
      "Creazione wizard per Email, SMS, WhatsApp, Telefono",
      "Integrazione con API esterne per gestione multicanale",
      "Ottimizzazione usabilità e prestazioni",
      "State management con Pinia",
      "Validazione form avanzata con Vee-Validate"
    ],
    countryCode: "GB"
  },
  {
    id: "exp-3",
    location: {
      name: "Los Angeles, California",
      coordinates: { lat: 34.0522, lon: -118.2437 }
    },
    company: "Previnet S.p.A.",
    jobTitle: "Back-End Developer",
    period: { start: "2022-07", end: "2022-09" },
    technologies: ["Perl", "MySQL", "Linux"],
    description: "Sviluppo e manutenzione applicazioni backend con focus su modularità e scalabilità.",
    responsibilities: [
      "Sviluppo e manutenzione applicazioni in Perl",
      "Gestione e ottimizzazione database MySQL",
      "Implementazione moduli scalabili e modulari",
      "Debug e risoluzione problemi backend"
    ],
    countryCode: "US"
  },
  {
    id: "exp-4",
    location: {
      name: "Mumbai, India",
      coordinates: { lat: 19.0760, lon: 72.8777 }
    },
    company: "Skills Focus",
    jobTitle: "API & Documentation Specialist",
    period: { start: "2022-11", end: "present" },
    technologies: ["Swagger", "PHPUnit", "API RESTful", "AWS S3", "Postman"],
    description: "Specializzazione in documentazione API, testing e integrazione servizi cloud.",
    responsibilities: [
      "Documentazione API RESTful con Swagger",
      "Testing automatizzato con PHPUnit",
      "Integrazione AWS S3 per gestione file",
      "Ottimizzazione performance API",
      "Validazione endpoint con Postman"
    ],
    countryCode: "IN"
  },
  {
    id: "exp-5",
    location: {
      name: "Madrid, Spain",
      coordinates: { lat: 40.4168, lon: -3.7038 }
    },
    company: "Esosphera",
    jobTitle: "FlowDesigner Project - Automazione",
    period: { start: "2022-11", end: "present" },
    technologies: ["FlowDesigner", "PHP", "JavaScript", "PostgreSQL"],
    description: "Creazione nodi personalizzati per automazione flussi aziendali complessi.",
    responsibilities: [
      "Sviluppo nodi personalizzati FlowDesigner",
      "Automazione flussi aziendali complessi",
      "Integrazione con sistemi esistenti",
      "Testing e validazione nodi custom",
      "Documentazione tecnica per utenti finali"
    ],
    countryCode: "ES"
  },
  {
    id: "exp-6",
    location: {
      name: "Las Palmas, Canary Islands",
      coordinates: { lat: 28.1235, lon: -15.4363 }
    },
    company: "Skills Focus",
    jobTitle: "Database Expert",
    period: { start: "2022-07", end: "present" },
    technologies: ["PostgreSQL", "MySQL", "Redis", "Sybase SQL"],
    description: "Gestione, ottimizzazione e design di database relazionali e NoSQL.",
    responsibilities: [
      "Design e ottimizzazione schema database",
      "Query optimization per performance",
      "Implementazione caching con Redis",
      "Gestione migrazioni database",
      "Backup e disaster recovery"
    ],
    countryCode: "ES"
  },
  {
    id: "exp-7",
    location: {
      name: "Copenhagen, Denmark",
      coordinates: { lat: 55.6761, lon: 12.5683 }
    },
    company: "Skills Focus",
    jobTitle: "Testing & Quality Assurance",
    period: { start: "2022-11", end: "present" },
    technologies: ["PHPUnit", "Acceptance Testing", "Swagger", "Postman"],
    description: "Focus su testing automatizzato e quality assurance per garantire stabilità del codice.",
    responsibilities: [
      "Implementazione test unitari con PHPUnit",
      "Acceptance testing su funzionalità complete",
      "Testing API con Postman e Swagger",
      "Code coverage analysis",
      "Integrazione testing nel CI/CD pipeline"
    ],
    countryCode: "DK"
  },
  {
    id: "exp-8",
    location: {
      name: "Stockholm, Sweden",
      coordinates: { lat: 59.3293, lon: 18.0686 }
    },
    company: "Skills Focus",
    jobTitle: "Frontend Specialist",
    period: { start: "2022-11", end: "present" },
    technologies: ["Vue.js 3", "JavaScript", "Bootstrap", "Froala Editor", "Pinia"],
    description: "Sviluppo interfacce moderne e responsive con Vue.js e librerie UI avanzate.",
    responsibilities: [
      "Sviluppo componenti Vue.js riutilizzabili",
      "Integrazione Froala Editor per rich text",
      "State management con Pinia",
      "Design responsive con Bootstrap",
      "Ottimizzazione bundle size e performance"
    ],
    countryCode: "SE"
  },
  {
    id: "exp-9",
    location: {
      name: "Oslo, Norway",
      coordinates: { lat: 59.9139, lon: 10.7522 }
    },
    company: "Skills Focus",
    jobTitle: "DevOps & Tools Expert",
    period: { start: "2021-10", end: "present" },
    technologies: ["Git", "GitHub", "GitLab", "Jira", "AWS S3", "Linux", "Agile/SCRUM"],
    description: "Gestione versioning, collaborazione team e metodologie agile per delivery efficiente.",
    responsibilities: [
      "Gestione repository Git (GitHub/GitLab)",
      "Configurazione CI/CD pipeline",
      "Project management con Jira",
      "Implementazione metodologie Agile/SCRUM",
      "Gestione cloud storage con AWS S3",
      "Amministrazione server Linux"
    ],
    countryCode: "NO"
  }
];
