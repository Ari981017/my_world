import { experiences } from '../data/experiences';
import { latLonToVector3, GLOBE_RADIUS } from '../utils/coordinates';
import { useFlightStore } from '../store/flightStore';
import LocationMarker from './LocationMarker';

export default function LocationMarkers() {
  const currentIndex = useFlightStore((state) => state.currentIndex);

  return (
    <>
      {experiences.map((exp, index) => {
        const position = latLonToVector3(
          exp.location.coordinates.lat,
          exp.location.coordinates.lon,
          GLOBE_RADIUS
        );

        return (
          <LocationMarker
            key={exp.id}
            position={position}
            label={exp.location.name.split(',')[0]} // First part of location name
            countryCode={exp.countryCode}
            isActive={index === currentIndex}
          />
        );
      })}
    </>
  );
}
