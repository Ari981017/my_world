import { useTranslation } from 'react-i18next';
import type { Experience } from '../types/experience';

export const EXPERIENCES_COUNT = 9;

// Static array with location data for non-translated usage (markers, camera, etc.)
export const experiencesLocations = [
  { id: "exp-1", location: { name: "Reykjavik, Iceland", coordinates: { lat: 64.1466, lon: -21.9426 } }, countryCode: "IS" },
  { id: "exp-2", location: { name: "Liverpool, UK", coordinates: { lat: 53.4084, lon: -2.9916 } }, countryCode: "GB" },
  { id: "exp-3", location: { name: "Los Angeles, California", coordinates: { lat: 34.0522, lon: -118.2437 } }, countryCode: "US" },
  { id: "exp-4", location: { name: "New Delhi, India", coordinates: { lat: 28.6139, lon: 77.2090 } }, countryCode: "IN" },
  { id: "exp-5", location: { name: "Madrid, Spain", coordinates: { lat: 40.4168, lon: -3.7038 } }, countryCode: "ES" },
  { id: "exp-6", location: { name: "Canary Islands", coordinates: { lat: 28.1235, lon: -15.4363 } }, countryCode: "ES" },
  { id: "exp-7", location: { name: "Copenhagen, Denmark", coordinates: { lat: 55.6761, lon: 12.5683 } }, countryCode: "DK" },
  { id: "exp-8", location: { name: "Stockholm, Sweden", coordinates: { lat: 59.3293, lon: 18.0686 } }, countryCode: "SE" },
  { id: "exp-9", location: { name: "Oslo, Norway", coordinates: { lat: 59.9139, lon: 10.7522 } }, countryCode: "NO" },
];

export function useExperiences(): Experience[] {
  const { t } = useTranslation('experiences');

  return [
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
        company: t('exp1.company'),
        jobTitle: t('exp1.jobTitle'),
        period: { start: "2022-11", end: "present" },
        technologies: ["PHP", "Yii2", "Node.js", "TypeScript", "Vue 3", "PostgreSQL", "REST APIs"],
        description: t('exp1.description'),
        responsibilities: t('exp1.responsibilities', { returnObjects: true }) as string[]
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
        company: t('exp2.company'),
        jobTitle: t('exp2.jobTitle'),
        period: { start: "2022-11", end: "present" },
        periodLabel: t('periodLabel'),
        technologies: ["Vue 3", "Yii2", "Pinia", "Vee-Validate", "REST APIs", "JavaScript"],
        description: t('exp2.description'),
        responsibilities: t('exp2.responsibilities', { returnObjects: true }) as string[],
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
        company: t('exp3.company'),
        jobTitle: t('exp3.jobTitle'),
        period: { start: "2022-07", end: "2022-09" },
        technologies: ["Perl", "MySQL", "Linux", "SQL"],
        description: t('exp3.description'),
        responsibilities: t('exp3.responsibilities', { returnObjects: true }) as string[]
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
        company: t('exp4.company'),
        jobTitle: t('exp4.jobTitle'),
        period: { start: "2023-01", end: "present" },
        periodLabel: t('periodLabel'),
        technologies: ["Node.js", "TypeScript", "XState v5", "Redis", "Microservices", "REST APIs"],
        description: t('exp4.description'),
        responsibilities: t('exp4.responsibilities', { returnObjects: true }) as string[]
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
        company: t('exp5.company'),
        jobTitle: t('exp5.jobTitle'),
        period: { start: "2022-11", end: "present" },
        periodLabel: "",
        technologies: ["REST APIs", "Swagger", "PHPUnit", "AWS S3", "WhatsApp API", "Postman"],
        description: t('exp5.description'),
        responsibilities: t('exp5.responsibilities', { returnObjects: true }) as string[]
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
        company: t('exp6.company'),
        jobTitle: t('exp6.jobTitle'),
        period: { start: "2022-11", end: "present" },
        periodLabel: "",
        technologies: ["PostgreSQL", "MySQL", "Redis", "Sybase", "SQL"],
        description: t('exp6.description'),
        responsibilities: t('exp6.responsibilities', { returnObjects: true }) as string[]
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
        company: t('exp7.company'),
        jobTitle: t('exp7.jobTitle'),
        period: { start: "2022-11", end: "present" },
        periodLabel: "",
        technologies: ["PHPUnit", "Jest", "Swagger", "Postman", "CI/CD"],
        description: t('exp7.description'),
        responsibilities: t('exp7.responsibilities', { returnObjects: true }) as string[]
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
        company: t('exp8.company'),
        jobTitle: t('exp8.jobTitle'),
        period: { start: "2022-11", end: "present" },
        periodLabel: "",
        technologies: ["Vue 3", "JavaScript", "Pinia", "Bootstrap", "Froala Editor"],
        description: t('exp8.description'),
        responsibilities: t('exp8.responsibilities', { returnObjects: true }) as string[]
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
        company: t('exp9.company'),
        jobTitle: t('exp9.jobTitle'),
        period: { start: "2022-11", end: "present" },
        periodLabel: "",
        technologies: ["Node.js", "Express", "JWT", "AWS S3", "GitLab", "GitHub", "Jira", "Agile/SCRUM"],
        description: t('exp9.description'),
        responsibilities: t('exp9.responsibilities', { returnObjects: true }) as string[]
      }
    }
  ];
}
