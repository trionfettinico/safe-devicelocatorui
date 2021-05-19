import React, { useContext, useEffect, useState } from "react";
import { Heatmap } from "ol/layer";
import VectorSource from "ol/source/Vector";
import KML from 'ol/format/KML';
import { MapLayerProps } from "../map-types";
import { MapContext } from "../../../provider/MapProvider";
import { ContextType } from "../../../provider/type";
import BaseLayer from "ol/layer/Base";

export const HeatmapLayer: React.FC<MapLayerProps> = ({ map }) => {
  const { heatmapVisible } = useContext(MapContext) as ContextType;
  const { radius } = useContext(MapContext) as ContextType;
  const { blur } = useContext(MapContext) as ContextType;
  const [source] = useState<VectorSource>(
    new VectorSource({
      url: './assets/file-2.kml',
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
        return feature.get('rssi');
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
