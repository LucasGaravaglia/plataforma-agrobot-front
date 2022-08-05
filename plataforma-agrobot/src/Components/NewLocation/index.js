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

const globalDecimal = 7;

function NewLocation() {
  const { locations, setLocations, idMission } = useContext(DataContext);
  const [overlay, setOverlay] = useState(false);
  const [newLocation, setNewLocation] = useState({});
  const [selectedAction, setSelectedAction] = useState(1);

  const getAngularCoefficient = (p1, p2) => {
    let delta_y = p2.lat - p1.lat;
    let delta_x = p2.lng - p1.lng;
    if (delta_x == 0) return Number.POSITIVE_INFINITY;
    return (delta_y / delta_x).toFixed(globalDecimal);
  };

  const difference = (p1, p2) => {
    return [p2.lat - p1.lat, p2.lng - p1.lng];
  };

  const getLinearCoefficient = (p1, angularCoefficient) => {
    if (angularCoefficient == Number.POSITIVE_INFINITY)
      return p1.lat.toFixed(globalDecimal);
    return (p1.lat - angularCoefficient * p1.lng).toFixed(globalDecimal);
  };

  const getPointsBetween = (lineTarget, numberOfPoints = 10) => {
    let longitude = lineTarget.p1.lng;
    let latitude;
    let points = [];
    let diff;
    let angularCoefficient = parseFloat(
      getAngularCoefficient(lineTarget.p1, lineTarget.p2)
    );
    let linearCoefficient = parseFloat(
      getLinearCoefficient(lineTarget.p1, angularCoefficient)
    );
    for (let i = 0; i < numberOfPoints; i++) {
      latitude = angularCoefficient * longitude + linearCoefficient;
      points.push({ lat: latitude, lng: longitude });
      diff =
        Math.abs(difference(lineTarget.p1, lineTarget.p2)[1]) /
        (numberOfPoints - 1);
      if (lineTarget.p2.longitude > lineTarget.p1.longitude) {
        longitude = longitude + diff;
      } else {
        longitude = longitude - diff;
      }
    }
    points.push({ lat: lineTarget.p2.lat, lng: lineTarget.p2.lng });
    return points;
  };

  const createBetweenLines = (points) => {
    let lines = [];
    for (let i = 0; i < points.length - 1; i++) {
      getPointsBetween({ p1: points[i], p2: points[i + 1] }).map((d) => {
        lines.push(d);
      });
    }
    lines.push({
      lat: points[points.length - 1].lat,
      lng: points[points.length - 1].lng,
    });

    getPointsBetween({ p1: points[points.length - 1], p2: points[0] }).map(
      (d) => {
        lines.push(d);
      }
    );
    console.log(lines);
  };

  const _onCreated = (event) => {
    createBetweenLines(event.layer.getLatLngs()[0]);
  };
  const _onDeleted = (event) => {
    console.log(event);
  };
  const _onEditPath = (event) => {
    console.log(event);
  };
  // function MyComponent() {
  //   useMapEvents({
  //     click: (e) => {
  //       const { lat, lng } = e.latlng;
  //       if (locations.length > 0) {
  //         setNewLocation({
  //           latitude: lat,
  //           longitude: lng,
  //           locationOrder: 1,
  //           idMission: idMission,
  //         });
  //       } else {
  //         setNewLocation({
  //           latitude: lat,
  //           longitude: lng,
  //           locationOrder: 1,
  //           idMission: idMission,
  //         });
  //       }
  //       setOverlay(true);
  //     },
  //   });
  //   return null;
  // }

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
            <FeatureGroup>
              <EditControl
                onCreated={_onCreated}
                onDeleted={_onDeleted}
                onEdited={_onEditPath}
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
            {/* <MyComponent /> */}
          </MapContainer>
        )}
      </div>
    </>
  );
}

export default NewLocation;
