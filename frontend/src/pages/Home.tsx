import React from "react";
import {
  IonContent,
  IonMenu,
  IonPage,
  IonSplitPane,
  useIonRouter,
  UseIonRouterResult,
} from "@ionic/react";
import "./Home.css";
import { Map } from "../components/map";
import Popover from "../components/mapControls/Popover";
import { LocationFab } from "../components/mapControls/locationButton";
import SensorList from "../components/sensorList/sensorList";
import { Plugins } from "@capacitor/core";

const { App } = Plugins;

function enableHardwareBackButton(ionRouter: UseIonRouterResult){
  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });
  });
}

const Home: React.FC = () => {
  const ionRouter = useIonRouter();
  enableHardwareBackButton(ionRouter);
  return (
    <IonPage id="home-page">
      <IonSplitPane contentId="map" when="xs">
        <IonMenu contentId="map" id="device-menu">
          <SensorList />
        </IonMenu>
        <IonContent id="map">
          <Map/>
          <LocationFab />
        </IonContent>
      </IonSplitPane>
    </IonPage>
  );
};

export default Home;
