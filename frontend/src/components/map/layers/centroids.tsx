import React, { useEffect, useState } from "react";
import VectorSource from "ol/source/Vector";
import KML from 'ol/format/KML';
import { SensorLayerProps } from "../map-types";
import VectorLayer from "ol/layer/Vector";

export const CentroidsLayer: React.FC<SensorLayerProps> = ({ map, sensor }) => {
  const [vectorLayer] = useState<VectorLayer>(
    new VectorLayer({
      source: new VectorSource({
        url: "http://135.181.24.224:5000/api/sampling/centroid-area?sensor=0504&format=kml",
        format: new KML({
          extractStyles: false,
        })
      }),
      className: "centroids",
      visible: sensor.isCentroidVisible,
    })
  );

  useEffect(() => {
    map.addLayer(vectorLayer);
  }, []);

  vectorLayer.setVisible(sensor.isCentroidVisible);
  return null;
}
