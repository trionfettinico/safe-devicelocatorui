import React, { useContext, useState } from "react";
import {
  IonIcon,
  IonPopover,
  IonButton,
  IonInput,
} from "@ionic/react";
import { push } from "ionicons/icons";
import { ContextSensorsType } from "../../provider/type";
import { SensorsContext } from "../../provider/SensorsProvider";



const TeamPopOver: React.FC = () => {
  const { teams, setTeams } = useContext(SensorsContext) as ContextSensorsType;
  const [showPopover, setShowPopover] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({
    open: false,
    event: undefined,
  });

  function insertTeam() {
    var inputTeam: HTMLInputElement = document.getElementById(
      "TeamInput"
    ) as HTMLInputElement;
    if (inputTeam.value != "") {
      teams.push(inputTeam.value);
      setTeams(teams);
      inputTeam.value = "";
    }
  }

  return (
    <>
      <IonPopover
        isOpen={showPopover.open}
        event={showPopover.event}
        onDidDismiss={() => {
          setShowPopover({ open: false, event: undefined });
        }}
      >
        <IonInput placeholder="Enter new team" id="TeamInput" />
        <IonButton
          onClick={(e) => {
            insertTeam();
            setShowPopover({ open: false, event: e.nativeEvent });
          }}
        >
          load
        </IonButton>{" "}
      </IonPopover>
      <IonButton
        onClick={(e) => setShowPopover({ open: true, event: e.nativeEvent })}
      >
        Insert new team
        <IonIcon icon={push} />
      </IonButton>
    </>
  );
};

export default TeamPopOver;
