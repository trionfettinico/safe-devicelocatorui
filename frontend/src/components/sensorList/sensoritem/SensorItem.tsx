import { IonFab, IonIcon, IonItem, IonLabel } from "@ionic/react";
import "./MessageListItem.css";
import { Sensor } from "../../../data/sensors";
import React, { useContext, useState } from "react";
import { arrowDownSharp, arrowUpSharp, information, searchCircle } from "ionicons/icons";
import { MapContext } from "../../../provider/MapProvider";
import { ContextType, LocationType } from "../../../provider/type";
import Geometry from "ol/geom/Geometry";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import {toLonLat} from 'ol/proj';

interface SensorListItemProps {
  sensor: Feature<Geometry>;
}

const SensorItem: React.FC<SensorListItemProps> = ({ sensor }) => {

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { goToLocation } = useContext(MapContext) as ContextType;
  const rawPoint = sensor.getGeometry() as Point;
  const [lon,lat] = toLonLat(rawPoint.getFlatCoordinates());

  return (
    <IonItem detail={false}>
      <div
        slot="start"
        // className={sensor.status ? "dot dot-read" : "dot dot-unread"}
      ></div>
      <IonLabel className="ion-text-wrap">
        <h2 onClick={() => setShowMenu(!showMenu)} className="clickable">
          {sensor.getId()}
          <span className="date">
            <IonFab vertical="top" horizontal="end" slot="fixed">
              <IonIcon icon={information} />
              {showMenu ? (<IonIcon icon={arrowUpSharp} />) :
                (<IonIcon icon={arrowDownSharp} />)}
            </IonFab>
          </span>
        </h2>
        {showMenu ? (
          <div>
            <h6>
              <br />
              {lat} {lon} <br />
              Qui ci vanno un pò di stronzate da mostrare <br />
              <br />
            </h6>
            <IonFab onClick={() => goToLocation({ lat: lat, lon: lon })}
              vertical="bottom" horizontal="end" slot="fixed" id={'sensor_' + sensor.getId()} className="clickable">
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
