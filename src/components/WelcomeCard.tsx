import { useFlightStore } from '../store/flightStore';
import './WelcomeCard.css';

export default function WelcomeCard() {
  const hasStarted = useFlightStore((state) => state.hasStarted);
  const startTour = useFlightStore((state) => state.startTour);

  // Don't render if tour has started
  if (hasStarted) return null;

  return (
    <div className="welcome-card">
      <div className="welcome-content">
        <h1 className="welcome-title">Arianna Toniolo</h1>
        <p className="welcome-subtitle">Full Stack Developer</p>

        <div className="welcome-description">
          <p>Full Stack Developer con 5 anni di esperienza su applicazioni web aziendali scalabili.</p>
          <ul className="welcome-bullets">
            <li>PHP, TypeScript, Vue 3, Node.js, PostgreSQL</li>
            <li>Architetture a microservizi, API REST, automazione flussi</li>
            <li>AWS S3, Redis, Agile — orientata alla qualità del codice</li>
          </ul>
        </div>

        <button
          className="start-journey-button"
          onClick={startTour}
          aria-label="Inizia il viaggio"
        >
          INIZIA VIAGGIO
        </button>
      </div>
    </div>
  );
}
