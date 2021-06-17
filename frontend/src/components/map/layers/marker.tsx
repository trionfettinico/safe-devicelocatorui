import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import React, { useEffect } from "react";
import { SensorLayerProps } from "../map-types";
import { Icon, Style } from "ol/style";
import "ol/ol.css";
import KML from "ol/format/KML";

export const MarkerLayer: React.FC<SensorLayerProps> = ({ map, sensor }) => {

  const [layer] = React.useState<VectorLayer>(new VectorLayer({
    source: new VectorSource({
      url: "http://127.0.0.1:1234/api/centroid?sensor=" + sensor.id + "&format=kml",
      format: new KML({
        extractStyles: false,
      })
    }),
    className: "marker",
    visible: true,
    style: new Style({
      image: new Icon({
        src: "./assets/icon/sensor.png",
        color: "yellow",
      }),
    })
  }));

  useEffect(() => {
    map.addLayer(layer);
  }, []);

  layer.setVisible(sensor.isMarkerVisible);
  return null;
}
