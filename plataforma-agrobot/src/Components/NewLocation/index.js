import { useContext, useState } from "react";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "./style.scss";
import { DataContext } from "../../Context/DataContext";
import api from "../../services/api";
import SetAction from "../SetAction";

function NewLocation() {
  const { locations, setLocations, idMission } = useContext(DataContext);
  const [overlay, setOverlay] = useState(false);
  const [newLocation, setNewLocation] = useState({});
  const [idLocation, setIdLocation] = useState(null);
  function MyComponent() {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        if (locations.length > 0) {
          setNewLocation({
            latitude: lat,
            longitude: lng,
            locationOrder: 0,
            idMission: idMission,
          });
        } else {
          setNewLocation({
            latitude: lat,
            longitude: lng,
            locationOrder: 0,
            idMission: idMission,
          });
        }
        setOverlay(true);
      },
    });
    return null;
  }

  return (
    <>
      <div className="Container">
        {overlay ? (
          <div className="overlay">
            <SetAction
              id={idLocation}
              CancelClick={() => setOverlay(false)}
              ConfirmClick={async () => {
                api.post("location", newLocation).then((e) => {
                  setIdLocation(e.data);
                });
                setLocations((await api.get(`locations=${idMission}`)).data);
                setOverlay(false);
              }}
            />
          </div>
        ) : (
          <MapContainer
            center={[-25.5526, -54.5877]}
            zoom={13}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
            />
            {locations.map((i) => (
              <Marker key={i.id} position={[i.latitude, i.longitude]} />
            ))}
            <MyComponent />
          </MapContainer>
        )}
      </div>
    </>
  );
}

export default NewLocation;
