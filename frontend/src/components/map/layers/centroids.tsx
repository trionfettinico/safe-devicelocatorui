import React, { useContext, useEffect, useState } from "react";
import { SensorLayerProps } from "../map-types";
import "ol/ol.css";
import "ol/ol.css";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";

export const CentroidsLayer: React.FC<SensorLayerProps> = ({ map, sensor }) => {

  var source = new VectorSource({
    format: new GeoJSON(),
  });

  const [layer] = React.useState<VectorLayer>(new VectorLayer({
    source: source,
    style: [
      new Style({
        stroke: new Stroke({
          color: "blue",
          width: 3,
        }),
        fill: new Fill({
          color: "rgba(0, 0, 255, 0.1)",
        }),
      }),
      new Style({
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({
            color: "orange",
          }),
        }),
      }),
    ],
  }));

  useEffect(() => {
    fetch(
      "http://127.0.0.1:1234/api/centroid-area?sensor=" + sensor.id + "&format=json"
    )
      .then((response) => response.json())
      .then((response) => {
        source.addFeatures(new GeoJSON().readFeatures(response));
        map.addLayer(layer);
      });
  }, []);

  layer.setVisible(sensor.isCentroidVisible);

  return null;
};
