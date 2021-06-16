import React, { useContext, useState } from "react";
import {
  IonIcon,
  IonItem,
  IonLabel,
  IonPopover,
  IonButton,
  IonToggle,
} from "@ionic/react";
import { settingsOutline } from "ionicons/icons";
import { ContextType } from "../provider/type";
import { MapContext } from "../provider/MapProvider";
import { Sensor } from "../data/sensors";

interface TeamItemProps {
  team: string;
}

const TeamPopOver: React.FC<TeamItemProps> = ({ team }) => {
  const [showPopover, setShowPopover] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({
    open: false,
    event: undefined,
  });

  const { sensors , setSensors } = useContext(MapContext) as ContextType;

  function checkTeam(check:CustomEvent,sensor:Sensor,team:string){
    check.detail.checked ? (sensor.team = team) : (sensor.team = "");
    setSensors(sensors);
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
        {/* <IonList> */}
        {sensors.map((e) =>
        (
          <IonItem>
            <IonLabel>{e.id}</IonLabel>
            <IonToggle  disabled={e.team != team && e.team!=""}
                checked={e.team == team}
                onIonChange={(check) => {
                  checkTeam(check,e,team);
                }}
              />
          </IonItem>
        )
        )}
        {/* </IonList> */}
      </IonPopover>
      <IonButton
        onClick={(e) => setShowPopover({ open: true, event: e.nativeEvent })}>
        <IonIcon icon={settingsOutline} />
      </IonButton>
    </>
  );
};

export default TeamPopOver;
