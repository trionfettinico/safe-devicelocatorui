import React, { useContext, useEffect } from "react";
import { Heatmap } from "ol/layer";
import VectorSource from "ol/source/Vector";
import KML from 'ol/format/KML';
import { SensorLayerProps } from "../map-types";
import { MapContext } from "../../../provider/MapProvider";
import { ContextType } from "../../../provider/type";

export const HeatmapLayer: React.FC<SensorLayerProps> = ({ map, sensor }) => {
  const { heatmapVisible, radius, blur } = useContext(MapContext) as ContextType;

  const [layer] = React.useState<Heatmap>(new Heatmap({
    className: "heatmap",
    visible: heatmapVisible,
    source: new VectorSource({
      url: 'http://localhost:1234/api/heatmap?sensor=' + sensor.id + '&format=kml',
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

  useEffect(()=>{
    map.addLayer(layer);
  },[]);

  layer.setVisible(sensor.isHeatmapVisible);
  layer.setBlur(blur);
  layer.setRadius(radius);
  return null;
}
