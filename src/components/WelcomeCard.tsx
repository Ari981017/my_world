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
          <p>
            Benvenuto nel mio portfolio interattivo! Sono una Full Stack Developer
            con oltre 4 anni di esperienza nello sviluppo di applicazioni web.
          </p>
          <p>
            Specializzata in sviluppo back-end con PHP, JavaScript (Vue.js, Node.js)
            e integrazione di API RESTful complesse. Appassionata di tecnologia,
            problem solving e innovazione.
          </p>
          <p>
            Questo viaggio interattivo ti porterà attraverso le mie esperienze
            professionali in giro per il mondo. Clicca sul pulsante qui sotto per iniziare!
          </p>
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
