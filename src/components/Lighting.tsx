export default function Lighting() {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 3, 5]} intensity={0.5} />
      <directionalLight position={[-5, -3, -5]} intensity={0.5} />
    </>
  );
}
