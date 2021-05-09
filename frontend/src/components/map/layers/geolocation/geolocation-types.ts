import Map from "ol/Map";
import Feature from "ol/Feature";

export type TGeolocationLayerProps = {};

export type TGeolocationLayerComponentProps = TGeolocationLayerProps & {
  map: Map;
  features?: Feature[];
};
