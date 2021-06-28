import {
  IonButton,
  IonFab,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
} from "@ionic/react";
import "../../MessageListItem.css";
import { Sensor } from "../../../data/sensors";
import React, { useContext, useState } from "react";
import {
  arrowDownSharp,
  arrowUpSharp,
  information,
  searchCircle,
} from "ionicons/icons";
import { MapContext } from "../../../provider/MapProvider";
import { ContextMapType, ContextSensorsType } from "../../../provider/type";
import { SensorsContext } from "../../../provider/SensorsProvider";
import Popover from "../../mapControls/Popover";

interface SensorListItemProps {
  sensor: Sensor;
}

const SensorItem: React.FC<SensorListItemProps> = ({ sensor }) => {
  const [popoverState, setShowPopover] = useState({ showPopover: false, event: undefined });
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { goToLocation } = useContext(
    MapContext
  ) as ContextMapType;
  const { sensors, setSensors } = useContext(SensorsContext) as ContextSensorsType;
  function findSensor() {
    fetch(
      "http://127.0.0.1:1234/api/centroid?sensor=" + sensor.id + "&format=json"
    )
      .then((response) => response.json())
      .then((response) => {
        response.features.map((element: any) => {
          let [lon, lat] = element.geometry.coordinates;
          goToLocation({ lat: lat, lon: lon });
        });
      }).catch(() => {
        setShowPopover({ showPopover: true, event: undefined })
      }
      );
  }

  function changeStatus(sensor: Sensor) {
    sensors.map((e) => {
      if (e.id == sensor.id) e.status = !e.status;
    });
    setSensors(sensors);
  }

  return (
    <IonItem detail={false}>
      <IonPopover
        cssClass='my-custom-class'
        event={popoverState.event}
        isOpen={popoverState.showPopover}
      >
        ATTENZIONE<br />
        Avviare app Safe per abilitare questa funzionalita
      </IonPopover>
      <div
        slot="start"
        className={sensor.status ? "dot dot-read" : "dot dot-unread"}
      ></div>
      <IonLabel className="ion-text-wrap">
        <h2 onClick={() => setShowMenu(!showMenu)} className="clickable">
          ID: {sensor.id}
          <span className="date">
            <IonFab vertical="top" horizontal="end" slot="fixed">
              <IonIcon icon={information} />
              {showMenu ? (
                <IonIcon icon={arrowUpSharp} />
              ) : (
                <IonIcon icon={arrowDownSharp} />
              )}
            </IonFab>
          </span>
        </h2>
        {showMenu ? (
          <div>
            <IonLabel>
              Team: {sensor.team === "" ? "non assegnato" : sensor.team}
              <br />

              <IonFab vertical="top" horizontal="end" slot="fixed"></IonFab>
              <IonButton onClick={() => changeStatus(sensor)}>
                {sensor.status ? <div>controllato</div> : <div>non controllato</div>}
              </IonButton>
            </IonLabel>
            <IonList>
              <Popover sensor={sensor} />
              <IonButton onClick={findSensor}>
                Trova
                <IonIcon icon={searchCircle} />
              </IonButton>
              <span className="date"></span>
            </IonList>
          </div>
        ) : null}
      </IonLabel>
    </IonItem>
  );
};

export default SensorItem;
