import './LoadingScreen.css';

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <span className="loading-star" aria-hidden="true">✦</span>
        <h1 className="loading-title">ARIANNA TONIOLO SPACE</h1>
        <div className="loading-progress" aria-hidden="true">
          <div className="loading-progress-bar" />
        </div>
        <p className="loading-text">CARICAMENTO</p>
      </div>
    </div>
  );
}
