import React, { useContext, useEffect, useState } from "react";
import VectorSource from "ol/source/Vector";
import KML from 'ol/format/KML';
import { MapLayerProps } from "../map-types";
import VectorLayer from "ol/layer/Vector";
import { Style } from "ol/style";
import { MapContext } from "../../../provider/MapProvider";
import { ContextType } from "../../../provider/type";

export const CentroidsLayer: React.FC<MapLayerProps> = ({ map }) => {
  const {centroidsVisible} = useContext(MapContext) as ContextType;

  const [vectorLayer] = useState<VectorLayer>(
    new VectorLayer({
      source: new VectorSource({
        url: "http://localhost:1234/api/centroid-area?sensor=0504&format=kml",
        format: new KML({
          extractStyles: false,
        })
      }),
      className: "centroids",
      visible: centroidsVisible,
    })
  );

  useEffect(() => {
    map.addLayer(vectorLayer);
  }, []);

  vectorLayer.setVisible(true);
  return null;
}
