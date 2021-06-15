import React, { useContext, useEffect, useState } from "react";
import { Heatmap } from "ol/layer";
import VectorSource from "ol/source/Vector";
import KML from 'ol/format/KML';
import { MapLayerProps } from "../map-types";
import { MapContext } from "../../../provider/MapProvider";
import { ContextType } from "../../../provider/type";

export const HeatmapLayer: React.FC<MapLayerProps> = ({ map }) => {
  const { heatmapVisible, radius, blur } = useContext(MapContext) as ContextType;
  
  useEffect(()=>{
    fetch("http://127.0.0.1:1234/api/sensors")
      .then((response) => response.json())
      .then((response) =>
        response.sensors.map((element: any) => {
          map.addLayer(new Heatmap({
            className: "heatmap",
            visible: heatmapVisible,
            source: new VectorSource({
              url: 'http://localhost:1234/api/heatmap?sensor=' + element + '&format=kml',
              format: new KML({
                extractStyles: false,
              }),
            }),
            blur: blur,
            radius: radius,
            weight: function (feature) {
              return feature.get('name');
            },
          }));
        })
      );
  },[]);

  return null;
}
