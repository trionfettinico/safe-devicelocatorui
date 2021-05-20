import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import React, { useContext, useEffect, useState } from "react";
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
  const { markerVisible } = useContext(MapContext) as ContextType;
  const [iconStyle] = useState<Style>(
    new Style({
      image: new Icon({
        src: "./assets/icon/location.svg",
        color: "blue",
      }),
    })
  );
  const [features] = useState <any>(
    sensors.map((sensor) => new Feature({
      geometry: new Point(fromLonLat([sensor.lng, sensor.lat])),
      name: sensor.name,
    }))
  );

  const [vectorLayer] = useState<VectorLayer>(
    new VectorLayer({
      source: new VectorSource({
        features: features,
      }),
      className: "marker",
      visible: markerVisible,
      style:iconStyle
    })
  );

  useEffect(() => {
    map.addLayer(vectorLayer);
  }, []);

  vectorLayer.setVisible(markerVisible);
  return null;
}
