import { useTranslation } from 'react-i18next';
import { useFlightStore } from '../store/flightStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import './WelcomeCard.css';

export default function WelcomeCard() {
  const { t } = useTranslation('welcome');
  const hasStarted = useFlightStore((state) => state.hasStarted);
  const startTour = useFlightStore((state) => state.startTour);

  // Don't render if tour has started
  if (hasStarted) return null;

  return (
    <div className="welcome-overlay">
    <div className="welcome-card">
      <div className="welcome-content">
        <h1 className="welcome-title">{t('name')}</h1>
        <p className="welcome-subtitle">{t('jobTitle')}</p>

        <div className="welcome-description">
          <p className="welcome-quote">"{t('quote')}"</p>
          <p>{t('intro')}</p>
          <p>{t('bio1')}</p>
          <p>{t('bio2')}</p>
          <p className="welcome-tech">{t('techStack')}</p>
        </div>

        <button
          className="start-journey-button"
          onClick={startTour}
          aria-label={t('startJourneyLabel')}
        >
          {t('startJourney')}
          <FontAwesomeIcon icon={faPlane} />
        </button>
      </div>
    </div>
    </div>
  );
}
