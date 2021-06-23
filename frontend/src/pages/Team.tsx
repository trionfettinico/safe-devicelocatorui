import React, { useContext, useState } from "react";
import "./Home.css";
import {
  IonContent,
  IonItem,
  IonList,
  IonPage,
  IonSearchbar,
} from "@ionic/react";
import { ContextSensorsType } from "../provider/type";
import { SensorsContext } from "../provider/SensorsProvider";
import TeamItem from "../components/team/teamItem";
import TeamPopOver from "../components/team/teamPopOver";

const Team: React.FC = () => {
  const { teams } = useContext(SensorsContext) as ContextSensorsType;

  const [searchText, setSearchText] = useState("");

  return (
    <IonPage>
      <div>
        <IonItem>
          <IonSearchbar
            placeholder="Filter Team"
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value!)}
            showCancelButton="focus"
            animated
          />
          <TeamPopOver />
        </IonItem>
      </div>
      <IonContent
        scrollEvents={true}
        onIonScrollStart={() => { }}
        onIonScroll={() => { }}
        onIonScrollEnd={() => { }}
      >
        <IonList>
          {teams.map((e) =>
            e.toUpperCase().startsWith(searchText.toUpperCase()) ? (
              <TeamItem team={e} />
            ) : null
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Team;
