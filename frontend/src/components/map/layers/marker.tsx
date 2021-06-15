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
  const { markerVisible } = useContext(MapContext) as ContextType;

  useEffect(() => {
    fetch("http://127.0.0.1:1234/api/sensors")
      .then((response) => response.json())
      .then((response) =>
        response.sensors.map((element: any) => {
          map.addLayer(new VectorLayer({
            source: new VectorSource({
              url: "http://127.0.0.1:1234/api/centroid?sensor=" + element + "&format=kml",
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
          }));
          console.log("marker: " + element);
        })
      );
    
  }, []);

  return null;
}
