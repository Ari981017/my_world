import { useFlightStore } from '../store/flightStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import './WelcomeCard.css';

export default function WelcomeCard() {
  const hasStarted = useFlightStore((state) => state.hasStarted);
  const startTour = useFlightStore((state) => state.startTour);

  // Don't render if tour has started
  if (hasStarted) return null;

  return (
    <div className="welcome-overlay">
    <div className="welcome-card">
      <div className="welcome-content">
        <h1 className="welcome-title">Arianna Toniolo</h1>
        <p className="welcome-subtitle">Full Stack Developer</p>

        <div className="welcome-description">
          <p className="welcome-quote">"Credo che ogni luogo lasci qualcosa di sé in chi lo attraversa."</p>
          <p>Ho creato questo portfolio come un globo interattivo perché il viaggio è da sempre una delle mie più grandi fonti di ispirazione. </p>
          <p>Ogni punto sulla mappa rappresenta un luogo che ha lasciato un segno nella mia vita: viaggi con amici, momenti in famiglia, esperienze nuove e prospettive diverse che hanno influenzato anche il mio modo di creare e pensare.</p>
          <p>Sono una Full Stack Developer con 4 anni di esperienza su applicazioni web scalabili.</p>
          <p className="welcome-tech">PHP · TypeScript · Vue 3 · Node.js · PostgreSQL · AWS</p>
        </div>

        <button
          className="start-journey-button"
          onClick={startTour}
          aria-label="Inizia il viaggio"
        >
          INIZIA VIAGGIO
          <FontAwesomeIcon icon={faPlane} />
        </button>
      </div>
    </div>
    </div>
  );
}
