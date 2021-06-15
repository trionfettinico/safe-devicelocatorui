import {
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React, { useContext, useEffect } from "react";
import { Sensor } from "../../data/sensors";
import { MapContext } from "../../provider/MapProvider";
import { ContextType } from "../../provider/type";
import SensorItem from "./sensoritem/SensorItem";

const SensorList: React.FC = () => {
  const { team, teams, setTeam, sensors, setSensors } = useContext(
    MapContext
  ) as ContextType;

  useEffect(() => {
    let sen: Array<Sensor> = [];
    fetch("http://127.0.0.1:1234/api/sensors")
      .then((response) => response.json())
      .then((response) =>
        response.sensors.map((element: any) => ({
          "id": element,
          "status": false,
          "team": "",
        }))
      )
      .then(response => {
        if (sensors == [])
          setSensors(response);
      });
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
          onIonChange={(val) => {
            setTeam(val.detail.value);
          }}
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
      <IonList>
        {sensors.map((e) => (
          <SensorItem key={e.id} sensor={e} />)
        )}
      </IonList>
    </div>
  );
};

export default SensorList;