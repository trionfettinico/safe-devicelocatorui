import {
  IonButton,
  IonContent,
  IonItem,
  IonList,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
} from "@ionic/react";
import React, { useContext } from "react";
import { ContextSensorsType } from "../../provider/type";
import SensorItem from "./sensoritem/SensorItem";
import "../../pages/Home.css";
import { SensorsContext } from "../../provider/SensorsProvider";

const SensorList: React.FC = () => {
  const { team, teams, setTeam, sensors, setSensors } = useContext(
    SensorsContext
  ) as ContextSensorsType;

  function showSensor(val: string) {
    sensors.forEach((e) => {
      if (e.team != val && val != "any") {
        e.isCentroidVisible = false;
        e.isHeatmapVisible = false;
        e.isMarkerVisible = false;
      } else {
        e.isCentroidVisible = true;
        e.isHeatmapVisible = true;
        e.isMarkerVisible = true;
      }
    })
    setSensors(sensors);
  }

  return (
    <IonContent id="ion-content">
      <div>
        <IonItem>
          <IonRow>
            <img src="assets/icon/Logo.png" height="45 px" width="45 px" />
            
              <IonTitle>Team     </IonTitle>

            <IonItem style={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }}>
              <IonSelect
                value={team}
                okText="Seleziona"
                cancelText="Annulla"
                onIonChange={(val) => {
                  setTeam(val.detail.value);
                  showSensor(val.detail.value);
                }}
              >
                <IonSelectOption value={"any"}>Tutti</IonSelectOption>
                {teams.map((e) => (
                  <IonSelectOption value={e}>{e}</IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonRow>

        </IonItem>
        <IonButton expand="full" routerLink="/welcome">
          MAPPE
        </IonButton>
        <IonButton expand="full" routerLink="/teams">
          TEAM
        </IonButton>
      </div>
      <IonList>
        {team == "any"
          ? sensors.map((e) => <SensorItem key={e.id} sensor={e} />)
          : sensors.map((e) =>
            e.team == team ? <SensorItem key={e.id} sensor={e} /> : null
          )}
      </IonList>
    </IonContent>
  );
};

export default SensorList;
