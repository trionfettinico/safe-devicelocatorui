import Map from "ol/Map";
import Feature from "ol/Feature";

export type TMarkersLayerProps = {};

export type TMarkersLayerComponentProps = TMarkersLayerProps & {
  map: Map;
  features?: Feature[];
};
