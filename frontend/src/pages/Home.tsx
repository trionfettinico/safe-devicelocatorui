import React, { useContext, useEffect } from "react";
import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonMenu,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonSplitPane,
  useIonRouter,
} from "@ionic/react";
import "./Home.css";
import { Map } from "../components/map";
import { Motion, Plugins } from "@capacitor/core";
import SensorList from "../components/sensorList/sensorList";
import Popover from "../components/mapControls/Popover";
import { LocationFab } from "../components/mapControls/locationButton";
import { MapContext } from "../provider/MapProvider";
import { ContextType } from "../provider/type";
import { Sensor } from "../data/sensors";

const { App, JarvisTransferPlugin } = Plugins;

const Home: React.FC = () => {
  const ionRouter = useIonRouter();
  

  async function test() {
    console.log("Starting download");
    await JarvisTransferPlugin.download({
      url: "http://www.lucapatarca.cloud/12/12",
    });
    console.log("Download completed");
    console.log("Starting unzip");
    await JarvisTransferPlugin.unzip({});
    console.log("Unzip completed");
  }

  useEffect(() => {
    // document.addEventListener('ionBackButton', (ev: any) => {
    //  ev.detail.register(-1, () => {
    //    if (!ionRouter.canGoBack()) {
    //      App.exitApp();
    //    }
    //  });
    // });

    // test();
  }, []);

  return (
    <IonPage id="home-page">
      <IonSplitPane contentId="map" when="xs">
        <IonMenu contentId="map" id="device-menu">
          <SensorList />
        </IonMenu>
        <IonContent id="map">
          <Map />
          <Popover />
          <LocationFab />
        </IonContent>
      </IonSplitPane>
    </IonPage>
  );
};

export default Home;
