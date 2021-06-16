import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React, { useContext, useEffect } from "react";
import { MapContext } from "../../provider/MapProvider";
import { ContextType } from "../../provider/type";
import SensorItem from "./sensoritem/SensorItem";
import "../../pages/Home.css";

const SensorList: React.FC = () => {
  const { team, teams, setTeam, sensors } = useContext(
    MapContext
  ) as ContextType;

  return (
    <div>
      <IonItem>
        <IonLabel>Team</IonLabel>
        <IonSelect
          value={team}
          okText="Select"
          cancelText="Cancel"
          onIonChange={(val) => {
            setTeam(val.detail.value);
          }}
        >
          <IonSelectOption value={"any"}>Any</IonSelectOption>
          {teams.map((e) => (
            <IonSelectOption value={e}>{e}</IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
      <div>
        <IonButton expand="full" routerLink="/welcome">
          MAP
        </IonButton>
        <IonButton expand="full" routerLink="/teams">
          TEAMS
        </IonButton>
      </div>
      <IonContent id="ion-content"
        scrollEvents={true}
      >
        <IonList>
          {team == "any"
            ? sensors.map((e) => <SensorItem key={e.id} sensor={e} />)
            : sensors.map((e) =>
                e.team == team ? <SensorItem key={e.id} sensor={e} /> : null
              )}
        </IonList>
      </IonContent>
    </div>
  );
};

export default SensorList;
