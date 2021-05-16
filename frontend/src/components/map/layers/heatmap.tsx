import React, { useContext, useState } from "react";
import { Heatmap } from "ol/layer";
import VectorSource from "ol/source/Vector";
import KML from 'ol/format/KML';
import { MapLayerProps } from "../map-types";
import { MapContext } from "../../../provider/MapProvider";
import { ContextType } from "../../../provider/type";

export const HeatmapLayer: React.FC<MapLayerProps> = ({ map }) => {
  const {heatmapVisible} = useContext(MapContext) as ContextType;
  const heatmap = map.getLayers().getArray().filter((layer)=>layer.getClassName()=="heatmap");
  if(heatmap.length>0){
    //heatmap exists
    heatmap.forEach((heatmap)=>heatmap.setVisible(heatmapVisible));
  } else{
    //heatmap does not exists
    const source = new VectorSource({
      url: './assets/file-2.kml',
      format: new KML({
        extractStyles: false,
      }),
    });
    const layer = new Heatmap({
      className: "heatmap",
      visible: heatmapVisible,
      source: source,
      blur: 20,
      radius: 8,
      weight: function (feature) {
        return feature.get('rssi');
      },
    });
    map.addLayer(layer);
  }
  return null;
}
