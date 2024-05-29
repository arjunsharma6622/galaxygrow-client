import { useEffect, useRef, useState } from "react";

const MapComponent = ({ businessDetails, setBusinessDetails }) => {
  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const google = window.google;
    const initialCoordinates = businessDetails?.address?.coordinates;

    const map = new google.maps.Map(mapRef.current, {
      center: {
        lat: parseFloat(initialCoordinates[1]),
        lng: parseFloat(initialCoordinates[0]),
      },
      zoom: 16,
    });

    const newMarker = new google.maps.Marker({
      position: {
        lat: parseFloat(initialCoordinates[1]),
        lng: parseFloat(initialCoordinates[0]),
      },
      map: map,
      draggable: true,
    });

    setMarker(newMarker);

    google.maps.event.addListener(newMarker, "dragend", function (event) {
      const newCoords = [event.latLng.lng(), event.latLng.lat()];
      setBusinessDetails({
        ...businessDetails,
        address: {
          ...businessDetails.address,
          coordinates: newCoords,
        },
      });
    });
  }, [businessDetails.address.coordinates]);

  return (
    <div>
      <div ref={mapRef} style={{ height: "400px", width: "100%" }}></div>
    </div>
  );
};

export default MapComponent;
