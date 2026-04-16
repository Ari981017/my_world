import { FaTimes } from 'react-icons/fa';
import { useFlightStore } from '../store/flightStore';
import { experiences } from '../data/experiences';
import { UI_TEXT } from '../config/constants';
import './ExperienceCard.css';

export default function ExperienceCard() {
  const { currentIndex, showCard } = useFlightStore();
  if (!showCard) return null;

  const exp = experiences[currentIndex];

  const formatPeriod = (start: string, end: string): string => {
    try {
      const datePattern = /^\d{4}-\d{2}$/;
      if (!datePattern.test(start)) {
        console.error(`Invalid start date format: ${start}`);
        return 'Invalid date range';
      }

      const startDate = new Date(start + '-01');

      if (isNaN(startDate.getTime())) {
        console.error(`Invalid start date: ${start}`);
        return 'Invalid date range';
      }

      let endStr = UI_TEXT.present;

      if (end !== 'present') {
        if (!datePattern.test(end)) {
          console.error(`Invalid end date format: ${end}`);
          return 'Invalid date range';
        }

        const endDate = new Date(end + '-01');

        if (isNaN(endDate.getTime())) {
          console.error(`Invalid end date: ${end}`);
          return 'Invalid date range';
        }

        endStr = endDate.toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        });
      }

      return `${startDate.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      })} - ${endStr}`;
    } catch (error) {
      console.error('Error formatting period:', error);
      return 'Invalid date range';
    }
  };

  return (
    <div className="experience-card">
      {/* Close button */}
      <button
        className="close-button"
        onClick={() => useFlightStore.getState().setShowCard(false)}
        aria-label={UI_TEXT.close}
      >
        <FaTimes />
      </button>

      {/* Location Header */}
      <div className="location-header">
        <img
          src={`https://flagcdn.com/w80/${exp.countryCode.toLowerCase()}.png`}
          alt={exp.countryCode}
          className="country-flag"
        />
        <h2 className="location-name">{exp.location.name}</h2>
      </div>


      {(
        <div className="section lavoro-section">
          <div className="work-meta">
            <h4 className="job-title">{exp.lavoro.jobTitle}</h4>
            {exp.lavoro.company && (
              <p className="company">{exp.lavoro.company}</p>
            )}
            {(exp.lavoro.periodLabel ?? formatPeriod(exp.lavoro.period.start, exp.lavoro.period.end)) && (
              <p className="period">
                {exp.lavoro.periodLabel ?? formatPeriod(exp.lavoro.period.start, exp.lavoro.period.end)}
              </p>
            )}
          </div>

          <div className="technologies">
            {exp.lavoro.technologies.map((tech) => (
              <span key={tech} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>

          {exp.lavoro.video && (
            <div className="work-video">
              <video
                src={exp.lavoro.video}
                controls
                muted
                playsInline
                preload="metadata"
                className="work-video-player"
              />
            </div>
          )}

          <p className="work-description">{exp.lavoro.description}</p>

          <div className="responsibilities">
            <h5>{UI_TEXT.keyResponsibilities}</h5>
            <ul>
              {exp.lavoro.responsibilities.map((resp, idx) => (
                <li key={idx}>{resp}</li>
              ))}
            </ul>
          </div>
        </div>
      )}


      {/* Continue button */}
      <div className="card-actions">
        <button
          className="continue-button"
          onClick={() => {
            const { setShowCard, nextLocation } = useFlightStore.getState();
            setShowCard(false);
            nextLocation();
          }}
          aria-label="Continue to next location"
        >
          {currentIndex === experiences.length - 1 ? UI_TEXT.restart : UI_TEXT.continue}
        </button>
      </div>
    </div>
  );
}
