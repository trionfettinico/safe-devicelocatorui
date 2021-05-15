import React, { useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from 'ol/proj';
import { HeatmapLayer } from "./layers/heatmap";
import { TMapProps, IMapContext, TMapState } from "./map-types";
import "ol/ol.css";
import "./map.css";
import { Markers } from "./layers/marker";
import sensors from '../../data/sensors.json';
import { Plugins } from "@capacitor/core";
import { GeolocationLayer } from "./layers/geolocation";
import {
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/react';
import {
  IonContent,
  IonList,
  IonMenu,
  IonPage,
  IonSplitPane,
  useIonRouter,
  useIonViewDidEnter,
} from '@ionic/react';
import { location, settingsOutline } from "ionicons/icons";
import Popover from "./Popover";
import SensorItem from "../sensoritem/SensorItem";

const { Geolocation } = Plugins;

export const MapContext = React.createContext<IMapContext | void>(undefined);

export class MapComponent extends React.PureComponent<TMapProps, TMapState> {
  private mapDivRef: React.RefObject<HTMLDivElement>;
  state: TMapState = {};
  statusHeatMap: boolean = true;

  constructor(props: TMapProps) {
    super(props);
    this.mapDivRef = React.createRef<HTMLDivElement>();
    console.log("map created");
  }

  componentDidMount() {
    if (!this.mapDivRef.current) {
      return;
    }
    console.log("map mount");
    const map = new Map({
      target: this.mapDivRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          })
        }),
      ],
      view: new View({
        center: fromLonLat([13.382000, 43.619722]),
        zoom: 15,
        maxZoom: 22,
        minZoom: 15
      }),
    });
    const mapContext: IMapContext = { map };
    this.setState({
      mapContext: mapContext,
    });
    console.log(map.getView().getCenter());

  }

  async setCenter() {
    var coord = await Geolocation.getCurrentPosition();
    this.state.mapContext?.map.getView().setCenter(fromLonLat([coord.coords.longitude, coord.coords.latitude]));
  }

  render() {
    console.log("map render");
    return (
      <IonPage id="home-page">
      <IonSplitPane contentId="map" when="xs">
        <IonMenu contentId="map" id="device-menu">
          <IonList>
            {sensors.map(e => <SensorItem key={e.id} sensor={e} context={this.state.mapContext}/>)}
          </IonList>
        </IonMenu>
        <IonContent id="map">
        <div className="map" ref={this.mapDivRef}>
        {this.state.mapContext && (
          <MapContext.Provider value={this.state.mapContext}>
            <HeatmapLayer />
            <Markers />
            <GeolocationLayer />
            <Popover/>          
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
              <IonFabButton onClick={() => this.setCenter()}>
                <IonIcon icon={location} />
              </IonFabButton>
            </IonFab>
          </MapContext.Provider>
        )}
      </div>
        </IonContent>
      </IonSplitPane>
    </IonPage>
    );
  }
}
