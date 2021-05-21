import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import React, { useContext, useEffect, useState } from "react";
import { MapLayerProps } from "../map-types";
import { Icon, Style } from "ol/style";
import "ol/ol.css";

import { MapContext } from "../../../provider/MapProvider";
import { ContextType } from "../../../provider/type";
import KML from "ol/format/KML";

export const MarkerLayer: React.FC<MapLayerProps> = ({ map }) => {
  const { markerVisible, setSensors } = useContext(MapContext) as ContextType;

  const [vectorLayer] = useState<VectorLayer>(
    new VectorLayer({
      source: new VectorSource({
        url: "http://135.181.24.224:5000/api/sampling/centroid?sensor=0504&format=kml",
        format: new KML({
          extractStyles: false,
        })
      }),
      className: "marker",
      visible: markerVisible,
      style: new Style({
        image: new Icon({
          src: "./assets/icon/location.svg",
          color: "blue",
        }),
      })
    })
  );

  useEffect(() => {
    map.addLayer(vectorLayer);
    vectorLayer.getSource().on('change', (e) => {
      setSensors(e.target);
    });
  }, []);

  vectorLayer.setVisible(markerVisible);
  return null;
}
