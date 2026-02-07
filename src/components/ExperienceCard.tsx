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
      // Validate date format (YYYY-MM)
      const datePattern = /^\d{4}-\d{2}$/;
      if (!datePattern.test(start)) {
        console.error(`Invalid start date format: ${start}`);
        return 'Invalid date range';
      }

      const startDate = new Date(start + '-01');

      // Check if date is valid
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
      <div className="card-header">
        <h2>{exp.jobTitle}</h2>
        <h3>{exp.company}</h3>
        <p className="location">{exp.location.name}</p>
        <p className="period">{formatPeriod(exp.period.start, exp.period.end)}</p>
      </div>

      <div className="card-body">
        <div className="technologies">
          {exp.technologies.map((tech) => (
            <span key={tech} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>

        <p className="description">{exp.description}</p>

        <div className="responsibilities">
          <h4>{UI_TEXT.keyResponsibilities}</h4>
          <ul>
            {exp.responsibilities.map((resp, idx) => (
              <li key={idx}>{resp}</li>
            ))}
          </ul>
        </div>

        {/* Continue button to advance to next location */}
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

      <button
        className="close-button"
        onClick={() => useFlightStore.getState().setShowCard(false)}
        aria-label={UI_TEXT.close}
      >
        ×
      </button>
    </div>
  );
}
