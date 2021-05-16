import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import React, { useContext } from "react";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { MapLayerProps } from "../map-types";
import { Icon, Style } from "ol/style";
import "ol/ol.css";

import sensors from "../../../data/sensors.json";
import { MapContext } from "../../../provider/MapProvider";
import { ContextType } from "../../../provider/type";

export const MarkerLayer: React.FC<MapLayerProps> = ({ map }) => {
  const {markerVisible} = useContext(MapContext) as ContextType;
  const marker = map.getLayers().getArray().filter((layer)=>layer.getClassName()=="marker");
  if(marker.length>0){
    //marker exists
    marker.forEach((marker)=>marker.setVisible(markerVisible));
  } else{
    //marker does not exist
    const iconStyle = new Style({
      image: new Icon({
        src: "./assets/icon/location.svg",
        color: "blue",
      }),
    });
    const features = sensors.map((sensor) => new Feature({
      geometry: new Point(fromLonLat([sensor.lng, sensor.lat])),
      name: sensor.name,
    }));
    features.forEach((e) => e.setStyle(iconStyle));
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: features,
      }),
      className: "marker",
      visible: markerVisible,
    });
    map.addLayer(vectorLayer);
  }
  return null;
}
