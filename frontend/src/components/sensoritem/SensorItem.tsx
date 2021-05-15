import { IonFab, IonIcon, IonItem, IonLabel, IonNote } from "@ionic/react";
import "./MessageListItem.css";
import { Sensor } from "../../data/sensors";
import React, { Context, useContext, useState } from "react";
import { arrowDownSharp, information, searchCircle } from "ionicons/icons";
import { MapContext } from "../map/map";
import { fromLonLat } from "ol/proj";
import { IMapContext, TMapProps } from "../map/map-types";

interface SensorListItemProps {
  sensor: Sensor;
  context:IMapContext|undefined;
}

const SensorItem: React.FC<SensorListItemProps> = ({ sensor , context }) => {
  
  const [showMenu, setShowMenu] = useState<boolean>(false);


  function changePosition(sensor:Sensor){
    context?.map.getView().setCenter(fromLonLat([sensor.lng,sensor.lat]));
  }

  return (
    <IonItem detail={false} className="sensor-item">
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
            <h6>
              <br />
              {sensor.lat} {sensor.lng} <br />
              Qui ci vanno un pò di stronzate da mostrare <br />
              <br />
            </h6>
            <IonFab onClick={()=> changePosition(sensor)} vertical="bottom" horizontal="end" slot="fixed" id={'sensor_'+sensor.id}>
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
