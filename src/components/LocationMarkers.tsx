import { experiences } from '../data/experiences';
import { latLonToVector3 } from '../utils/coordinates';
import { GLOBE_RADIUS } from '../config/constants';
import { useFlightStore } from '../store/flightStore';
import LocationMarker from './LocationMarker';

export default function LocationMarkers() {
  const currentIndex = useFlightStore((state) => state.currentIndex);
  const goToLocation = useFlightStore((state) => state.goToLocation);
  const setShowCard = useFlightStore((state) => state.setShowCard);

  return (
    <>
      {experiences.map((exp, index) => {
        const position = latLonToVector3(
          exp.location.coordinates.lat,
          exp.location.coordinates.lon,
          GLOBE_RADIUS
        );

        const handleClick = () => {
          if (index === currentIndex) {
            setShowCard(true);
          } else {
            goToLocation(index);
          }
        };

        return (
          <LocationMarker
            key={exp.id}
            position={position}
            label={exp.location.name.split(',')[0]}
            countryCode={exp.countryCode}
            isActive={index === currentIndex}
            onClick={handleClick}
          />
        );
      })}
    </>
  );
}
