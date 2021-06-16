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

var team: string;

const Team: React.FC = () => {
  const { teams, setTeams } = useContext(MapContext) as ContextType;


  function removeTeam(index:number) {
    teams.splice(index,1);
    setTeams(teams);
  }

  function insertTeam() {
    if(team!=""){teams.push(team);
    setTeams(teams);}
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
        onIonScrollStart={() => { }}
        onIonScroll={() => { }}
        onIonScrollEnd={() => { }}>
        <IonList>
          {teams.map((e) =>
            <IonItem>
              <IonLabel>{e}</IonLabel>
              <TeamPopOver team={e}/>
              <IonButton onClick={() => removeTeam(teams.indexOf(e))}>
                <IonIcon slot="end" icon={trashOutline} />
              </IonButton>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Team;
