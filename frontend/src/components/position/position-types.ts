import Map from "ol/Map";
import Feature from "ol/Feature";

export type TPositionLayerProps = {};

export type TPositionLayerComponentProps = TPositionLayerProps & {
  map: Map;
  features?: Feature[];
};