import React from 'react';
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
import sensors from '../data/sensors.json';

const { App } = Plugins;

const Home: React.FC = () => {

  const ionRouter = useIonRouter();
  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });
  });

  return (
    <IonPage id="home-page">
      <IonSplitPane contentId="map" when="xs">
        <IonMenu contentId="map" id="device-menu">
          <SensorList sensors={sensors} />
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
