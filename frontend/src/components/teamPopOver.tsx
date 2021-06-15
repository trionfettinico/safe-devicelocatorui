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
      <IonList>
        {sensors.map((e) => (
          <>
            <IonItem></IonItem>
            <IonCheckbox
              checked={checked}
              onIonChange={(e) => setChecked(e.detail.checked)}
            />
          </>
        ))}
      </IonList>
      <IonSelect
        multiple
        value={sensors}
        okText="Select"
        cancelText="Cancel"
        onIonChange={(val) => {
          let sensor: any = sensors.find((e) => {
            val.detail.value.find(e.id);
          });
          sensor.team = team;
        }}
      >
        {sensors.map((e) => {
          console.log("sensor lenght team" + sensors.length);
          // if (e.team == team || e.team.length == 0)
          <IonSelectOption value={e.id}>{e.id}</IonSelectOption>;
        })}
      </IonSelect>
    </>
  );
};

export default TeamPopOver;
