import L from "leaflet";

const iconPerson = new L.Icon({
  iconUrl: require("../../Assets/iconmonstr-location-3.svg"),
  iconRetinaUrl: require("../../Assets/iconmonstr-location-3.svg"),
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(60, 75),
  className: "leaflet-div-icon",
});

export { iconPerson };
