import { useContext, useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  FeatureGroup,
} from "react-leaflet";
import "./style.scss";
import { DataContext } from "../../Context/DataContext";
import api from "../../services/api";
import SetAction from "../SetAction";
import { EditControl } from "react-leaflet-draw";

const globalDecimal = 7;
const sizeSprayRod = 2; // in meters

function NewLocation() {
  const { locations, setLocations, idMission } = useContext(DataContext);
  const [overlay, setOverlay] = useState(false);
  const [newLocation, setNewLocation] = useState({});
  const [selectedAction, setSelectedAction] = useState(1);

  const getAngularCoefficient = (p1, p2) => {
    let delta_y = p2.lat - p1.lat;
    let delta_x = p2.lng - p1.lng;
    if (delta_x === 0) return Number.POSITIVE_INFINITY;
    return (delta_y / delta_x).toFixed(globalDecimal);
  };

  const difference = (p1, p2) => {
    return [p2.lat - p1.lat, p2.lng - p1.lng];
  };

  const getLinearCoefficient = (p1, angularCoefficient) => {
    if (angularCoefficient === Number.POSITIVE_INFINITY)
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
      if (lineTarget.p2.lng > lineTarget.p1.lng) {
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
    return lines;
  };

  const getLineBetweenPoints = (Lines) => {
    let newLines = [];
    let i = 0;
    let min = Number.MAX_VALUE;
    let idxMin = 0;
    let idxs = [];
    Lines.sort((a, b) => {
      return a.lat - b.lat;
    });
    while (idxs.length - 1 < Lines.length - 3) {
      idxs.push(i);
      min = Number.MAX_VALUE;
      for (let j = 0; j < Lines.length - 1; j++) {
        if (idxs.includes(j)) continue;
        if (getAngularCoefficient(Lines[i], Lines[j]) < min) {
          min = getAngularCoefficient(Lines[i], Lines[j]);
          idxMin = j;
        }
      }
      newLines.push(Lines[i]);
      getPointsBetween({ p1: Lines[i], p2: Lines[idxMin] }, 7).map((d) => {
        if (
          d.lat == Number.POSITIVE_INFINITY ||
          d.lat == Number.NEGATIVE_INFINITY
        )
          return;
        newLines.push(d);
      });
      i = idxMin;
    }
    console.log(newLines);
    return newLines;
  };

  const _onCreated = (event) => {
    if (event.layerType === "polygon") {
      let allPoints = getLineBetweenPoints(
        createBetweenLines(event.layer.getLatLngs()[0])
      );
      allPoints.map((d) => {
        d.latitude = d.lat;
        d.longitude = d.lng;
        d.locationOrder = 1;
        d.idMission = idMission;
      });
      // console.log(allPoints);
      allPoints.map((d) => {
        api.post("location", d).then((data) => {
          api.post("action", {
            idActionType: 1,
            idLocation: data.data,
          });
        });
        // api.get(`locations=${idMission}`).then((response) => {
        //   setLocations([...locations, response.data]);
        // });
      });
    }
    if (event.layerType === "marker") {
      const { lat, lng } = event.layer.getLatLng();
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
    }
  };
  const _onDeleted = (event) => {
    console.log(event);
  };
  const _onEditPath = (event) => {
    console.log(event);
  };

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
                    setLocations([...locations, response.data]);
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
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
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
          </MapContainer>
        )}
      </div>
    </>
  );
}

export default NewLocation;
