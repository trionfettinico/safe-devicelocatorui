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
import sensors from '../data/sensors.json';
import { Plugins } from '@capacitor/core';
import SensorItem from '../components/sensoritem/SensorItem';
import { locationOutline } from 'ionicons/icons';

import SerialPort from "serialport";
import GPS from "gps";

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

  const port = new SerialPort("/dev/ttyS0", { baudRate: 9600 });
  const gps = new GPS();

  const parser = port.pipe(new SerialPort.parsers.Readline({delimiter:'\n'}));
  gps.on("data", async data => {
    if(data.type == "GGA") {
      if(data.quality != null) {
          console.log(data);
      } else {
          console.log("error");
      }
  }
  });
  parser.on("data", data => {gps.update(data)});

  return (
    <IonPage id="home-page">
      <IonSplitPane contentId="map" when="xs">
        <IonMenu contentId="map" id="device-menu">
          <IonList>
            {sensors.map(e => <SensorItem key={e.id} sensor={e} />)}
          </IonList>
        </IonMenu>
        <IonContent id="map">
          <Map />
        </IonContent>
      </IonSplitPane>
    </IonPage>
  );
};

export default Home;
