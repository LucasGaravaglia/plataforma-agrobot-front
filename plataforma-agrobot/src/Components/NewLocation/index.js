import { useContext, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  FeatureGroup,
} from "react-leaflet";
import "./style.scss";
import { DataContext } from "../../Context/DataContext";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

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
            style={{ width: "100%", backgroundColor: "#f0f" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            <FeatureGroup>
              <EditControl
                position="bottomright"
                draw={{
                  circle: false,
                  circlemarker: false,
                  marker: true,
                  polygon: true,
                  polyline: false,
                  rectangle: false,
                }}
              />
            </FeatureGroup>
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
