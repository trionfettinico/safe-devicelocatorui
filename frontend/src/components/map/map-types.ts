import Map from "ol/Map";
import { Sensor } from "../../data/sensors";

export interface SingleLayerProps {
  map: Map;
}

export interface SensorLayerProps {
  map: Map;
  sensor: Sensor;
}