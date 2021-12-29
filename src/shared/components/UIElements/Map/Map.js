import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

import "./Map.css";

mapboxgl.accessToken = process.env.REACT_APP_MAP_ACCESS_TOKEN;

const Map = (props) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const {
    center: { lng, lat },
    zoom,
  } = props;

  useEffect(() => {
    if (map.current) return;
    const coordinates = [lng, lat];
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: coordinates,
      zoom: zoom,
      logoPosition: "top-right",
    });
    new mapboxgl.Marker({
      color: "red",
    })
      .setLngLat(coordinates)
      .addTo(map.current);
  }, [lat, lng, zoom]);

  return (
    <div
      ref={mapContainer}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
