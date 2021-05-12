import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import React from "react";
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
import "ol/ol.css";

import sensors from "../../../../data/sensors.json";

class MarkersLayerComponent extends React.PureComponent<TMarkersLayerComponentProps> {
  layer: VectorLayer = new VectorLayer();
  features: Feature[] = [];
  iconStyle: Style = new Style();
  vectorSource: VectorSource = new VectorSource();
  vectorLayer: VectorLayer = new VectorLayer();


  componentDidMount() {
    console.log("marker mount");
    this.iconStyle = new Style({
      image: new Icon({
        src: "./assets/icon/location.svg",
        color: "blue",
      }),
    });

    sensors.forEach((e) =>
      this.features.push(
        new Feature({
          geometry: new Point(fromLonLat([e.lng, e.lat])),
          name: e.name,
        })
      )
    );

    this.features.forEach((e) => e.setStyle(this.iconStyle));

    this.vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: this.features,
      }),
      className: "marker",
      visible: true,
    });

    this.props.map.addLayer(this.vectorLayer);
  }

  render() {
    console.log("marker render");
    return null;
  }
}

export const MarkersLayerWithContext = (props: TMarkersLayerProps) => {
  return (
    <MapContext.Consumer>
      {(mapContext: IMapContext | void) => {
        if (mapContext) {
          return <MarkersLayerComponent {...props} map={mapContext.map} />;
        }
      }}
    </MapContext.Consumer>
  );
};
