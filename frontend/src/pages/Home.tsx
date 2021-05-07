import React, { useState } from 'react';
import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSplitPane,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import './Home.css';
import { Map } from "../components/map";
import SensorListItem from '../components/SensorListItem';
import sensors from '../data/sensors.json';
import { menuController } from '@ionic/core';
import { GeolocationLayer } from '../components/map/layers/position/position';

const Home: React.FC = () => {

  return (
    <IonSplitPane contentId="home-page" when="(min-width: 0px)">
      <IonMenu contentId="home-page">
        <IonList>
          {sensors.map(e => <SensorListItem key={e.id} sensor={e} />)}
          <div className="container">
            <GeolocationLayer />
          </div>
        </IonList>
      </IonMenu>
      <IonPage id="home-page">
        <IonContent fullscreen>
          <Map> </Map>
        </IonContent>
      </IonPage>
    </IonSplitPane>
  );
};

export default Home;
