import React, { useContext } from "react";
import "./Home.css";
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSplitPane,
} from "@ionic/react";
import { MapContext } from "../provider/MapProvider";
import { ContextType } from "../provider/type";

var teams: string[];
var team: string;

const Team: React.FC = () => {
const { teams, setTeams } = useContext(MapContext) as ContextType;
  

  function insertTeam(){
    teams.push(team);
    setTeams(teams);
  }

  return (
    <IonPage>
        <div>
          <IonItem>
            <IonInput
              placeholder="Enter Team"
              id="TeamInput"
              onIonChange={(e) => team = ((e.target as HTMLInputElement).value)}
            ></IonInput>
          </IonItem>
          <IonButton onClick={insertTeam}>load</IonButton>{" "}
        </div>
        <IonContent
    scrollEvents={true}
    onIonScrollStart={() => {}}
    onIonScroll={() => {}}
    onIonScrollEnd={() => {}}>
      <IonList>
          {teams.map((e) => 
            <IonItem>
              <IonLabel>{ e}</IonLabel>
            </IonItem>
          )}
        </IonList>
  </IonContent>
    </IonPage>
  );
};

export default Team;
