export default function LoadingScreen() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#07080e',
      color: '#f59e0b',
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: '1rem',
      letterSpacing: '2px',
      fontWeight: 500,
    }}>
      CARICAMENTO...
    </div>
  );
}
