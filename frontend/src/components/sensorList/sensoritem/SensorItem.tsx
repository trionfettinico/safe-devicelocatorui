import { IonFab, IonIcon, IonItem, IonLabel } from "@ionic/react";
import "./MessageListItem.css";
import { Sensor } from "../../../data/sensors";
import React, { useContext, useState } from "react";
import {
  arrowDownSharp,
  arrowUpSharp,
  information,
  searchCircle,
} from "ionicons/icons";
import { MapContext } from "../../../provider/MapProvider";
import { ContextType } from "../../../provider/type";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Icon, Style } from "ol/style";
import KML from "ol/format/KML";

interface SensorListItemProps {
  sensor: Sensor;
}

const SensorItem: React.FC<SensorListItemProps> = ({ sensor }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { goToLocation,  } = useContext(MapContext) as ContextType;

  function findSensor() {
    fetch(
      "http://127.0.0.1:1234/api/centroid?sensor=" + sensor.id + "&format=json"
    )
      .then((response) => response.json())
      .then((response) => {
        response.features.map((element: any) => {
          let [lon, lat] = element.geometry.coordinates;
          goToLocation({ lat: lon, lon: lat });
          console.log("lon: " + lon + " lat: " + lat);
        });
      });    
  }

  return (
    <IonItem detail={false}>
      <div
        slot="start"
        className={sensor.status ? "dot dot-read" : "dot dot-unread"}
      ></div>
      <IonLabel className="ion-text-wrap">
        <h2 onClick={() => setShowMenu(!showMenu)} className="clickable">
          {sensor.id}
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
              {sensor.team}
              <br />
              {sensor.status ? <div>checked</div> : <div>unChecked</div>}
            </IonLabel>
            <IonFab
              onClick={findSensor}
              vertical="bottom"
              horizontal="end"
              slot="fixed"
              id={"sensor_" + sensor.id}
              className="clickable"
            >
              <span className="date">Find</span>
              <IonIcon icon={searchCircle} />
            </IonFab> */}
          </div>
        ) : null}
      </IonLabel>
    </IonItem>
  );
};

export default SensorItem;
