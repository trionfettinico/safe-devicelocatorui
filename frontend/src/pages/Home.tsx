import React, { useEffect } from 'react';
import {
  IonButton,
  IonContent,
  IonMenu,
  IonPage,
  IonSplitPane,
  useIonRouter,
} from '@ionic/react';
import './Home.css';
import { Map } from "../components/map";
import { Plugins } from '@capacitor/core';
import SensorList from '../components/sensorList/sensorList';
import Popover from '../components/mapControls/Popover';
import { LocationFab } from '../components/mapControls/locationButton';

const { App, JarvisTransferPlugin } = Plugins;

const Home: React.FC = () => {
  const ionRouter = useIonRouter();

  async function test(){
    const test = await JarvisTransferPlugin.test({value:"http://192.168.5.99/tiles.zip"});
    console.log(test.value);
  }

  useEffect(() => {
    document.addEventListener('ionBackButton', (ev: any) => {
      ev.detail.register(-1, () => {
        if (!ionRouter.canGoBack()) {
          App.exitApp();
        }
      });
    });
    test();
  },[]);

  return (
    <IonPage id="home-page">
      <IonSplitPane contentId="map" when="xs">
        <IonMenu contentId="map" id="device-menu">
          <SensorList />
          <IonButton>SYNC</IonButton>
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
