import React from 'react';
import {
  IonContent,
  IonList,
  IonMenu,
  IonPage,
  IonSplitPane,
} from '@ionic/react';
import './Home.css';
import { Map } from "../components/map";
import SensorListItem from '../components/SensorListItem';
import sensors from '../data/sensors.json';

const Home: React.FC = () => {

  return (
    <IonSplitPane contentId="home-page" when="(min-width: 0px)">
      <IonMenu contentId="home-page">
        <IonList>
          {sensors.map(e => <SensorListItem key={e.id} sensor={e} />)}
        </IonList>
      </IonMenu>
      <IonPage id="home-page">
        <IonContent>
          <Map></Map>
        </IonContent>
      </IonPage>
    </IonSplitPane>
  );
};

export default Home;
