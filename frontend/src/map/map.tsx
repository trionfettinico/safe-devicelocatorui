import React from "react";
import XYZ from "ol/source/XYZ";
import { HeatmapLayer, MarkerObject } from "./layers";
import 'ol/ol.css';
import Map from 'ol/Map';
import {Tile as TileLayer} from 'ol/layer';
import { TMapProps, IMapContext, TMapState } from "./map-types";
import "ol/ol.css";
import "./map.css";
import * as olProj from 'ol/proj';

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

    var marker : any = new MarkerObject(this.props);

    const map = new Map({
      target: this.mapDivRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          }),
        }),marker.getMarker
      ],
      // view: new View({
      //   center: [13.068770000000000,43.140362000000000],
      //   zoom: 15,
      // }),
    });
    map.getView().setCenter(olProj.transform([13.068770000000000,43.140362000000000,], 'EPSG:4326', 'EPSG:3857'));
    map.getView().setZoom(10);
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
          </MapContext.Provider>
        )}
      </div>
    );
  }
}
