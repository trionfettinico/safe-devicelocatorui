import React from "react";
import {
  IonContent,
  IonMenu,
  IonPage,
  IonSplitPane,
} from "@ionic/react";
import "./Home.css";
import { Map } from "../components/map";
import Popover from "../components/mapControls/Popover";
import { LocationFab } from "../components/mapControls/locationButton";
import SensorList from "../components/sensorList/sensorList";


const Home: React.FC = () => {

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
