import React, { useContext, useEffect } from "react";
import { Heatmap } from "ol/layer";
import VectorSource from "ol/source/Vector";
import KML from 'ol/format/KML';
import { SensorLayerProps } from "../map-types";
import { MapContext } from "../../../provider/MapProvider";
import { ContextType } from "../../../provider/type";

export const HeatmapLayer: React.FC<SensorLayerProps> = ({ map, sensor }) => {

  const [layer] = React.useState<Heatmap>(new Heatmap({
    className: "heatmap",
    visible: true,
    source: new VectorSource({
      url: 'http://localhost:1234/api/heatmap?sensor=' + sensor.id + '&format=kml',
      format: new KML({
        extractStyles: false,
      }),
    }),
    blur: sensor.heatmapBlur, //TODO aggiungere blue e radio per il singolo sensore
    radius: sensor.heatmapRadius,
    weight: function (feature) {
      return feature.get('name');
    },
  }));

  useEffect(()=>{
    map.addLayer(layer);
  },[]);

  layer.setVisible(sensor.isHeatmapVisible);
  layer.setBlur(sensor.heatmapBlur);
  layer.setRadius(sensor.heatmapRadius);
  return null;
}
