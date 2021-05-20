import React, { useContext, useEffect, useState } from "react";
import { Heatmap } from "ol/layer";
import VectorSource from "ol/source/Vector";
import KML from 'ol/format/KML';
import { MapLayerProps } from "../map-types";
import { MapContext } from "../../../provider/MapProvider";
import { ContextType } from "../../../provider/type";

export const HeatmapLayer: React.FC<MapLayerProps> = ({ map }) => {
  const { heatmapVisible, radius, blur } = useContext(MapContext) as ContextType;
  const [source] = useState<VectorSource>(
    new VectorSource({
      url: 'http://135.181.24.224:5000/api/sampling/heatmap?sensor=0504&format=kml',
      format: new KML({
        extractStyles: false,
      }),
    })
  );
  const [layer] = useState<Heatmap>(
    new Heatmap({
      className: "heatmap",
      visible: heatmapVisible,
      source: source,
      blur: blur,
      radius: radius,
      weight: function (feature) {
        return feature.get('name');
      },
    })
  )
  useEffect(()=>{
    map.addLayer(layer);
  },[]);
  
  layer.setVisible(heatmapVisible);
  layer.setBlur(blur);
  layer.setRadius(radius);
  return null;
}
