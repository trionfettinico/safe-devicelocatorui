import {
  IonItem,
  IonLabel,
  IonToggle,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
} from "@ionic/react";
import { useContext, useState } from "react";
import { Sensor } from "../../data/sensors";
import { SensorsContext } from "../../provider/SensorsProvider";
import { ContextSensorsType } from "../../provider/type";
import "../MessageListItem.css";

interface TeamItemProps {
  team: string;
}

const TeamSensors: React.FC<TeamItemProps> = ({ team }) => {
  const { sensors, setSensors } = useContext(
    SensorsContext
  ) as ContextSensorsType;

  const [searchText, setSearchText] = useState("");
  const [viewAviable, setViewAviable] = useState(true);

  function checkTeam(check: CustomEvent, sensor: Sensor, team: string) {
    check.detail.checked ? (sensor.team = team) : (sensor.team = "");
    setSensors(sensors);
  }

  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonSearchbar
              value={searchText}
              onIonChange={(e) => setSearchText(e.detail.value!)}
              showCancelButton="focus"
              animated
            />
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel>view available</IonLabel>
              <IonToggle
                checked={viewAviable}
                onIonChange={() => setViewAviable(!viewAviable)}
              />
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
      {viewAviable
        ? sensors.map((e) =>
            e.id.toUpperCase().startsWith(searchText.toUpperCase()) &&
            (e.team == team || e.team == "") ? (
              <IonItem>
                <IonLabel>{e.id}</IonLabel>
                <IonToggle
                  checked={e.team == team}
                  onIonChange={(check) => {
                    checkTeam(check, e, team);
                  }}
                />
              </IonItem>
            ) : null
          )
        : sensors.map((e) =>
            e.id.toUpperCase().startsWith(searchText.toUpperCase()) ? (
              <IonItem>
                <IonLabel>{e.id}</IonLabel>
                <IonToggle
                  disabled={e.team != team && e.team != ""}
                  checked={e.team == team}
                  onIonChange={(check) => {
                    checkTeam(check, e, team);
                  }}
                />
              </IonItem>
            ) : null
          )}
    </>
  );
};

export default TeamSensors;
