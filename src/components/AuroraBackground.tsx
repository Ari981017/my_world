import './AuroraBackground.css';

export default function AuroraBackground() {
  return (
    <div className="aurora-background" aria-hidden="true">
      <div className="aurora-sphere aurora-cyan" />
      <div className="aurora-sphere aurora-violet" />
      <div className="aurora-sphere aurora-pink" />
    </div>
  );
}