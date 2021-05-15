import React from 'react';
import {
  IonContent,
  IonList,
  IonMenu,
  IonPage,
  IonSplitPane,
  useIonRouter,
  useIonViewDidEnter,
} from '@ionic/react';
import './Home.css';
import { Map } from "../components/map";
import { Plugins } from '@capacitor/core';
import SensorItem from '../components/sensoritem/SensorItem';
import { locationOutline } from 'ionicons/icons';
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

  console.log(locationOutline);

  return (
   <Map></Map>
  );
};

export default Home;
