import React, { useContext, useRef, useState } from "react";
import {
  IonCard,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonPopover,
  IonButton,
  IonToggle,
  IonRange,
  IonList,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
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

  const { sensors } = useContext(MapContext) as ContextType;

  return (
    <>
      <IonPopover
        isOpen={showPopover.open}
        event={showPopover.event}
        onDidDismiss={() => {
          setShowPopover({ open: false, event: undefined });
        }}
      >
        <IonList>
          {sensors.map((e) => {
            console.log(JSON.stringify(e));
            (<>
              <IonItem>{e.id}</IonItem>
              <IonCheckbox
                checked={e.team == team}
                onIonChange={(check) => {
                  check.detail.checked ? (e.team = team) : (e.team = "");
                }}
              />
            </>);
          })}
        </IonList>
      </IonPopover>
      <IonButton
        onClick={(e) => setShowPopover({ open: true, event: e.nativeEvent })}
      >
        <IonIcon icon={settingsOutline} />
      </IonButton>
    </>
  );
};

export default TeamPopOver;
