import { useTranslation } from 'react-i18next';
import { useFlightStore } from '../store/flightStore';
import { useExperiences } from '../data/experiences';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt } from 'react-icons/fa';
import './LeftPanel.css';
import { useLanguage } from '../hooks/useLanguage';

export default function LeftPanel() {
  const { t } = useTranslation('common');
  const experiences = useExperiences();
  const { language } = useLanguage();
  const hasStarted = useFlightStore((state) => state.hasStarted);
  const currentIndex = useFlightStore((state) => state.currentIndex);
  const goToLocation = useFlightStore((state) => state.goToLocation);
  const setShowCard = useFlightStore((state) => state.setShowCard);
  const cvFile = language === 'it' ? '/cv/cv_arianna_toniolo.pdf' : '/cv/cv_arianna_toniolo_en.pdf';

  if (!hasStarted) return null;

  const handleClick = (index: number) => {
    if (index === currentIndex) {
      setShowCard(true);
    } else {
      goToLocation(index);
    }
  };

  return (
    <div className="left-panel">
      <p className="left-panel-heading">{t('destinations')}</p>
      <div className="left-panel-divider" />
      <ul className="left-panel-list">
        {experiences.map((exp, index) => (
          <li
            key={exp.id}
            className={`left-panel-item${index === currentIndex ? ' active' : ''}`}
            onClick={() => handleClick(index)}
          >
            <span className="left-panel-dot" />
            <span className="left-panel-label">{exp.location.name.split(',')[0]}</span>
          </li>
        ))}
      </ul>
      <div className="left-panel-divider" />
      <div className="left-panel-socials">
        <a href="https://github.com/Ari981017" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/arianna-toniolo-front-end" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
        <a href="mailto:ariannatoniolo7@gmail.com" aria-label="Email">
          <FaEnvelope />
        </a>
        <a href={cvFile} target="_blank" rel="noopener noreferrer" aria-label="CV">
          <FaFileAlt/>
        </a>
      </div>
    </div>
  );
}
