import { useFlightStore } from '../store/flightStore';
import { experiences } from '../data/experiences';
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
} from 'react-icons/fa';
import './FlightControls.css';

export default function FlightControls() {
  const {
    currentIndex,
    isPlaying,
    isTransitioning,
    play,
    pause,
    nextLocation,
    previousLocation,
  } = useFlightStore();

  return (
    <div className="flight-controls">
      <div className="progress-indicator">
        <span className="current-location">
          {experiences[currentIndex].location.name}
        </span>
        <span className="position-counter">
          {currentIndex + 1} / {experiences.length}
        </span>
      </div>

      <div className="control-buttons">
        <button
          onClick={previousLocation}
          disabled={isTransitioning}
          aria-label="Previous location"
          className="control-btn"
        >
          <FaStepBackward />
        </button>

        <button
          onClick={isPlaying ? pause : play}
          disabled={isTransitioning}
          className="play-pause"
          aria-label={isPlaying ? 'Pause tour' : 'Play tour'}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <button
          onClick={nextLocation}
          disabled={isTransitioning}
          aria-label="Next location"
          className="control-btn"
        >
          <FaStepForward />
        </button>
      </div>

      {/* Location dots navigator */}
      <div className="location-dots">
        {experiences.map((exp, index) => (
          <button
            key={exp.id}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => useFlightStore.getState().goToLocation(index)}
            disabled={isTransitioning}
            title={exp.location.name}
            aria-label={`Go to ${exp.location.name}`}
          />
        ))}
      </div>
    </div>
  );
}
