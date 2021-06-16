import { SelectChangeEventDetail } from "@ionic/core";
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

  const getSensor = async () => {
    let sen: Array<Sensor> = [];
    await fetch("http://127.0.0.1:1234/api/sensors")
      .then((response) => response.json())
      .then((response) =>
        response.sensors.map((element: any) => ({
          id: element,
          status: false,
          team: "",
        }))
      )
      .then((response) => {
        setSensors(response);
      });
  };

  useEffect(() => {
    if (sensors == []) getSensor();
  }, []);

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
        <IonButton routerLink="/welcome">SYNC</IonButton>
        <IonButton routerLink="/teams">TEAMS</IonButton>
      </div>
      <IonList>
        {team == "any"
          ? sensors.map((e) => <SensorItem key={e.id} sensor={e} />)
          : sensors.map((e) =>
              e.team == team ? <SensorItem key={e.id} sensor={e} /> : null
            )}
      </IonList>
    </div>
  );
};

export default SensorList;
