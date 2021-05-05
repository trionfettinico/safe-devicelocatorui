import React from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import {fromLonLat} from 'ol/proj';
import { HeatmapLayer } from "./layers/heatmap";
import { TMapProps, IMapContext, TMapState } from "./map-types";
import "ol/ol.css";
import "./map.css";
import { Markers } from "./layers/marker";

export const MapContext = React.createContext<IMapContext | void>(undefined);

export class MapComponent extends React.PureComponent<TMapProps, TMapState> {
  private mapDivRef: React.RefObject<HTMLDivElement>;
  state: TMapState = {};

  constructor(props: TMapProps) {
    super(props);
    this.mapDivRef = React.createRef<HTMLDivElement>();
  }

  componentDidMount() {
    if (!this.mapDivRef.current) {
      return;
    }

    const map = new Map({
      target: this.mapDivRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "tiles/assets/{z}/{x}/{y}.png",
          })
        }),
        //marker.getMarker
      ],
      view: new View({
        center: fromLonLat([13.068770,43.140362]),//([13.068309, 43.135764], 'EPSG:4326', 'EPSG:3857'),
        zoom: 15,
      }),
    });
    // map.getView().setCenter(olProj.transform([13.068770000000000,43.140362000000000,], 'EPSG:4326', 'EPSG:3857'));
    // map.getView().setZoom(10);
    const mapContext: IMapContext = { map };
    this.setState({
      mapContext: mapContext,
    });
  }


  render() {
    return (
      <div className="map" ref={this.mapDivRef}>
        {this.state.mapContext && (
          <MapContext.Provider value={this.state.mapContext}>
            <HeatmapLayer />
            <Markers />
          </MapContext.Provider>
        )}
      </div>
    );
  }
}
