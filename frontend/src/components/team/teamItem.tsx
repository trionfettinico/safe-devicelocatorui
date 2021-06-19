import {
  IonButton,
  IonFab,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonRange,
  IonToggle,
  useIonToast,
} from "@ionic/react";
import React, { useContext, useState } from "react";
import {
  arrowDownSharp,
  arrowUpSharp,
  information,
  searchCircle,
  trashOutline,
} from "ionicons/icons";
import { SensorsContext } from "../../provider/SensorsProvider";
import { ContextSensorsType } from "../../provider/type";
import { Sensor } from "../../data/sensors";
import TeamSensors from "./teamSensors";

interface TeamItemProps {
  team: string;
}

const TeamItem: React.FC<TeamItemProps> = ({ team }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { teams, setTeams, sensors, setSensors } = useContext(
    SensorsContext
  ) as ContextSensorsType;

  function removeTeam() {
    sensors.map((e) => {
      if (e.team === team) e.team = "";
    });
    setSensors(sensors);
    teams.splice(teams.indexOf(team), 1);
    setTeams(teams);
  }

  return (
    <>
      <IonItem onClick={() => setShowMenu(!showMenu)}>
        <IonLabel>{team}</IonLabel>
        <IonButton onClick={() => setShowMenu(!showMenu)}>
          <IonIcon slot="end" icon={information} />
          {showMenu ? (
            <IonIcon icon={arrowUpSharp} />
          ) : (
            <IonIcon icon={arrowDownSharp} />
          )}
        </IonButton>
        <IonButton onClick={() => removeTeam()}>
          <IonIcon slot="end" icon={trashOutline} />
        </IonButton>
      </IonItem>
      {showMenu
        ? (<TeamSensors team={team}/>)
        : null}
    </>
  );
};

export default TeamItem;
