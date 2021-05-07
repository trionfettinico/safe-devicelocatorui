import React, { useState } from 'react';
import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import './Home.css';
import { Map } from "../components/map";
import SensorListItem from '../components/SensorListItem';
import GeolocationButton from '../components/map/layers/position/position';
import sensors from '../data/sensors.json';

const Home: React.FC = () => {

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inbox</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Inbox
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol size='3'>
              <IonList>
                {sensors.map(e => <SensorListItem key={e.id} sensor={e} />)}
                <div className="container">
          <GeolocationButton />
        </div>
              </IonList>
            </IonCol>
            <IonCol>
              <Map> </Map>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
