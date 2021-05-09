import { Plugins } from "@capacitor/core";
import React from "react";
import VectorLayer from "ol/layer/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import IconAnchorUnits from "ol/style/IconAnchorUnits";
import { Icon, Style } from "ol/style";
import VectorSource from "ol/source/Vector";
import { TPositionLayerComponentProps } from "./position-types";
import { TMarkersLayerProps } from "../map/layers/marker/marker-types";
import { MapContext } from "../map/map";
import { IMapContext } from "../map/map-types";
const { Geolocation } = Plugins;

class GeolocationButton extends React.PureComponent<TPositionLayerComponentProps> {
  layer: VectorLayer = new VectorLayer();
  iconFeature: Feature = new Feature();
  iconStyle: Style = new Style();
  vectorSource: VectorSource = new VectorSource();
  vectorLayer: VectorLayer = new VectorLayer();

  async componentDidMount() {
    var position = await Geolocation.getCurrentPosition();
    var coordinates = fromLonLat([position.coords.longitude, position.coords.latitude]);
    this.iconFeature = new Feature({
      geometry: new Point(
        coordinates
      ),
      name: "Null Island",
    });

    this.iconStyle = new Style({
      image: new Icon({
        anchorXUnits: IconAnchorUnits.FRACTION,
        anchorYUnits: IconAnchorUnits.PIXELS,
        src: "/assets/current.png",
        scale: 0.05,
      }),
    });

    this.iconFeature.setStyle(this.iconStyle);

    this.vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [this.iconFeature],
      }),
    });
    this.props.map.getView().setCenter(coordinates);
    this.props.map.addLayer(this.vectorLayer);
  }

  render() {
    return null;
  }
}

export const GeolocationLayer = (props: TMarkersLayerProps) => {
  return (
    <MapContext.Consumer>
      {(mapContext: IMapContext | void) => {
        if (mapContext) {
          console.log("mapContextGeoLocation");
          console.log(mapContext);
          return <GeolocationButton {...props} map={mapContext.map} />;
        }
      }}
    </MapContext.Consumer>
  );
};
