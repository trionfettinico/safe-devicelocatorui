import React, { useContext } from "react";
import "./Home.css";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import { MapContext } from "../provider/MapProvider";
import { ContextType } from "../provider/type";
import { trashOutline } from "ionicons/icons";
import TeamPopOver from "../components/teamPopOver";


const Team: React.FC = () => {
  const { teams, setTeams } = useContext(MapContext) as ContextType;
  let inputTeam: HTMLInputElement = (document.getElementById("TeamInput") as HTMLInputElement)

  function removeTeam(index: number) {
    teams.splice(index, 1);
    setTeams(teams);
  }

  function insertTeam() {
    if (inputTeam.value != "") {
      teams.push(inputTeam.value);
      setTeams(teams);
      inputTeam.value = "";
    }
  }
  return (
    <IonPage>
      <div>
        <IonItem>
          <IonInput
            placeholder="Enter Team"
            id="TeamInput"
          ></IonInput>
          <IonButton onClick={insertTeam}>load</IonButton>{" "}
        </IonItem>
      </div>
      <IonContent
        scrollEvents={true}
        onIonScrollStart={() => {}}
        onIonScroll={() => {}}
        onIonScrollEnd={() => {}}
      >
        <IonList>
          {teams.map((e) => (
            <IonItem>
              <IonLabel>{e}</IonLabel>
              <TeamPopOver team={e} />
              <IonButton onClick={() => removeTeam(teams.indexOf(e))}>
                <IonIcon slot="end" icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Team;
