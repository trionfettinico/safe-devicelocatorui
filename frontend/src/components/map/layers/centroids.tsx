import React, { useContext, useEffect, useState } from "react";
import VectorSource from "ol/source/Vector";
import KML from 'ol/format/KML';
import { MapLayerProps } from "../map-types";
import VectorLayer from "ol/layer/Vector";
import { Style } from "ol/style";

export const CentroidsLayer: React.FC<MapLayerProps> = ({ map }) => {
  const [vectorLayer] = useState<VectorLayer>(
    new VectorLayer({
      source: new VectorSource({
        url: "http://135.181.24.224:5000/api/sampling/centroid-area?sensor=0504&format=kml",
        format: new KML({
          extractStyles: false,
        })
      }),
      className: "centroids",
      visible: true,
    })
  );

  useEffect(() => {
    map.addLayer(vectorLayer);
  }, []);

  vectorLayer.setVisible(true);
  return null;
}
