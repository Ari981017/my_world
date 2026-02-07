import { useFlightStore } from '../store/flightStore';
import { experiences } from '../data/experiences';
import './ExperienceCard.css';

export default function ExperienceCard() {
  const { currentIndex, showCard } = useFlightStore();

  if (!showCard) return null;

  const exp = experiences[currentIndex];

  const formatPeriod = (start: string, end: string) => {
    const startDate = new Date(start + '-01');
    const endStr =
      end === 'present'
        ? 'Present'
        : new Date(end + '-01').toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
          });

    return `${startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - ${endStr}`;
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
          <h4>Key Responsibilities</h4>
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
            {currentIndex === experiences.length - 1 ? 'Ricomincia' : 'Continua'}
          </button>
        </div>
      </div>

      <button
        className="close-button"
        onClick={() => useFlightStore.getState().setShowCard(false)}
        aria-label="Close card"
      >
        ×
      </button>
    </div>
  );
}
