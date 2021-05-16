import { IonFab, IonIcon, IonItem, IonLabel } from "@ionic/react";
import "./MessageListItem.css";
import { Sensor } from "../../../data/sensors";
import React, { useContext, useState } from "react";
import { arrowDownSharp, arrowUpSharp, information, searchCircle } from "ionicons/icons";
import { MapContext } from "../../../provider/MapProvider";
import { ContextType } from "../../../provider/type";

interface SensorListItemProps {
  sensor: Sensor;
}

const SensorItem: React.FC<SensorListItemProps> = ({ sensor }) => {
  
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const {setCenter} = useContext(MapContext) as ContextType;

  return (
    <IonItem detail={false}>
      <div
        slot="start"
        className={sensor.status ? "dot dot-read" : "dot dot-unread"}
      ></div>
      <IonLabel className="ion-text-wrap">
        <h2 onClick={() => setShowMenu(!showMenu)} className="clickable">
          {sensor.name}
          <span className="date">
            <IonFab vertical="top" horizontal="end" slot="fixed">
              <IonIcon icon={information} />
              {showMenu ? (<IonIcon icon={arrowUpSharp} />):
              (<IonIcon icon={arrowDownSharp} />)}
            </IonFab>
          </span>
        </h2>
      {showMenu ? (
          <div>
            <h6>
              <br />
              {sensor.lat} {sensor.lng} <br />
              Qui ci vanno un pò di stronzate da mostrare <br />
              <br />
            </h6>
            <IonFab onClick={()=>setCenter({lat: sensor.lat, lon: sensor.lng})} vertical="bottom" horizontal="end" slot="fixed" id={'sensor_'+sensor.id}  className="clickable">
              <span className="date">Find</span>
              <IonIcon icon={searchCircle} />
            </IonFab>
          </div>
        ) : null}
      </IonLabel>
    </IonItem>
  );
};

export default SensorItem;
