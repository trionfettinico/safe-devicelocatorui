import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import React, { useState } from "react";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import {
  TMarkersLayerComponentProps,
  TMarkersLayerProps,
} from "./marker-types";

import { MapContext } from "../../map";
import { IMapContext } from "../../map-types";
import { Icon, Style } from "ol/style";
import IconAnchorUnits from "ol/style/IconAnchorUnits";
import "ol/ol.css";

import sensors from "../../../../data/sensors.json";

class MarkersLayerComponent extends React.PureComponent<TMarkersLayerComponentProps> {
  layer: VectorLayer = new VectorLayer();
  features: Feature[] = [];
  iconStyle: Style = new Style();
  vectorSource: VectorSource = new VectorSource();
  vectorLayer: VectorLayer = new VectorLayer();

  componentDidMount() {
    this.iconStyle = new Style({
      image: new Icon({
        //anchor: [0.5, 46],
        anchorXUnits: IconAnchorUnits.FRACTION,
        anchorYUnits: IconAnchorUnits.PIXELS,
        src: "/assets/marker.png",
        scale: 0.03,
      }),
    });

    sensors.map(
      (e) => this.features.push(new Feature({
        geometry: new Point(fromLonLat([e.lng, e.lat])),
        name: e.name,
      }))
    );

    this.features.map(e => e.setStyle(this.iconStyle));

    


    this.vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: this.features,
      }),
    });

    this.props.map.addLayer(this.vectorLayer);
  }

  render() {
    return null;
  }
}

export const MarkersLayerWithContext = (props: TMarkersLayerProps) => {
  return (
    <MapContext.Consumer>
      {(mapContext: IMapContext | void) => {
        if (mapContext) {
          console.log("mapContextMarker");
          console.log(mapContext);
          return <MarkersLayerComponent {...props} map={mapContext.map} />;
        }
      }}
    </MapContext.Consumer>
  );
};
