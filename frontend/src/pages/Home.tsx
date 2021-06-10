import React, { useEffect } from 'react';
import {
  IonButton,
  IonContent,
  IonItem,
  IonMenu,
  IonPage,
  IonRange,
  IonRow,
  IonSplitPane,
  useIonRouter,
} from '@ionic/react';
import './Home.css';
import { Map } from "../components/map";
import { Motion, Plugins } from '@capacitor/core';
import SensorList from '../components/sensorList/sensorList';
import Popover from '../components/mapControls/Popover';
import { LocationFab } from '../components/mapControls/locationButton';

const { App } = Plugins;

const Home: React.FC = () => {
  const ionRouter = useIonRouter();

  async function test(){
    console.log("Starting download");
    await JarvisTransferPlugin.download({url:"http://192.168.5.99/tiles.zip"});
    console.log("Download completed");
    console.log("Starting unzip");
    await JarvisTransferPlugin.unzip({});
    console.log("Unzip completed");
  }

  useEffect(() => {
    document.addEventListener('ionBackButton', (ev: any) => {
      ev.detail.register(-1, () => {
        if (!ionRouter.canGoBack()) {
          App.exitApp();
        }
      });
    });
  }, []);

  return (
    <IonPage id="home-page">
      <IonSplitPane contentId="map" when="xs">
        <IonMenu contentId="map" id="device-menu">
          <SensorList />
          <IonButton routerLink="/welcome" >SYNC</IonButton>
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
