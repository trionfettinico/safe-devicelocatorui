import Map from "ol/Map";
import Feature from "ol/Feature";

export type THeatmapLayerProps = {};

export type THeatmapLayerComponentProps = THeatmapLayerProps & {
  map: Map;
  features?: Feature[];
};
