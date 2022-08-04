import { useContext, useEffect, useState } from "react";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "./style.scss";
import { DataContext } from "../../Context/DataContext";
import api from "../../services/api";
import SetAction from "../SetAction";

function NewLocation() {
  const { locations, setLocations, idMission } = useContext(DataContext);
  const [overlay, setOverlay] = useState(false);
  const [newLocation, setNewLocation] = useState({});
  const [selectedAction, setSelectedAction] = useState(1);
  function MyComponent() {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        if (locations.length > 0) {
          setNewLocation({
            latitude: lat,
            longitude: lng,
            locationOrder: 1,
            idMission: idMission,
          });
        } else {
          setNewLocation({
            latitude: lat,
            longitude: lng,
            locationOrder: 1,
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
              CancelClick={() => setOverlay(false)}
              ConfirmClick={(selectedAction) => {
                console.log(newLocation);
                api.post("location", newLocation).then((data) => {
                  api.post("action", {
                    idActionType: selectedAction,
                    idLocation: data.data,
                  });
                  api.get(`locations=${idMission}`).then((response) => {
                    console.log(response.data);
                    setLocations(response.data);
                  });
                });
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
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
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
