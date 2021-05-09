import {
  IonButton,
  IonFab,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
} from "@ionic/react";
import "./MessageListItem.css";
import { Sensor } from "../../data/sensors";
import React, { useState } from "react";
import { arrowDownSharp, information, searchCircle } from "ionicons/icons";

interface SensorListItemProps {
  sensor: Sensor;
}

const SensorListItem: React.FC<SensorListItemProps> = ({ sensor }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <IonItem detail={false}>
      <div
        slot="start"
        className={sensor.status ? "dot dot-read" : "dot dot-unread"}
      ></div>
      <IonLabel className="ion-text-wrap">
        <h2 onClick={() => setShowMenu(!showMenu)}>
          {sensor.name}
          <span className="date">
            <IonFab vertical="top" horizontal="end" slot="fixed">
              <IonIcon icon={information} />
              <IonIcon icon={arrowDownSharp} />
            </IonFab>
          </span>
        </h2>
        {showMenu ? (
          <div>
            <h3>
              <br />
              {sensor.lat} {sensor.lng} <br />
              Qui ci vanno un pò di stronzate da mostrare <br />
              <br />
            </h3>
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
              <IonIcon
                icon={searchCircle}
              />
            </IonFab>
          </div>
        ) : null}
      </IonLabel>
    </IonItem>
  );
};

export default SensorListItem;
