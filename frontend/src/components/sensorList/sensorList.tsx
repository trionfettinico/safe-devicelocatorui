import {
  IonButton,
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

const SensorList: React.FC = () => {
  const { team, teams, setTeam, sensors, setSensors } = useContext(
    MapContext
  ) as ContextType;

  useEffect(() => {
    var sensorsResponse: Array<string> = [];
    fetch('http://127.0.0.1/api/sensors')
      .then(response => response.json()).then(response => response);
  }, []);

  return (
    <div>
      <IonItem>
        <IonLabel>Team</IonLabel>
        <IonSelect
          multiple
          value={team}
          okText="Select"
          cancelText="Cancel"
          onIonChange={(val) => setTeam(val.detail.value)}
        >
          {teams.map((e) => (
            <IonSelectOption value={e}>{e}</IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
      <div>
        <IonButton routerLink="/welcome">SYNC</IonButton>
        <IonButton routerLink="/teams">TEAMS</IonButton>
      </div>
      <IonList></IonList>
    </div>
  );
};

export default SensorList;

//{sensors.map(e => <SensorItem key={e.id} sensor={e} />)}
