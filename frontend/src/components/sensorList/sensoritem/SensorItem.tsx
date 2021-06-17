import {
  IonButton,
  IonFab,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonRange,
  IonToggle,
} from "@ionic/react";
import "./MessageListItem.css";
import { Sensor } from "../../../data/sensors";
import React, { useContext, useState } from "react";
import {
  arrowDownSharp,
  arrowUpSharp,
  information,
  searchCircle,
} from "ionicons/icons";
import { settingsOutline } from "ionicons/icons";
import { MapContext } from "../../../provider/MapProvider";
import { ContextMapType, ContextSensorsType } from "../../../provider/type";
import { SensorsContext } from "../../../provider/SensorsProvider";

interface SensorListItemProps {
  sensor: Sensor;
}

const SensorItem: React.FC<SensorListItemProps> = ({ sensor }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { goToLocation } = useContext(
    MapContext
  ) as ContextMapType;
  const {sensors, setSensors} = useContext(SensorsContext) as ContextSensorsType;
  const [showPopover, setShowPopover] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({
    open: false,
    event: undefined,
  });
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
      });
  }

  function changeStatus(sensor: Sensor) {
    sensors.map((e) => {
      if (e.id == sensor.id) e.status = !e.status;
    });
    setSensors(sensors);
  }

  function changeMarkerVisible(sensor: Sensor) {
    sensors.map((e) => {
      if (e.id == sensor.id) e.isMarkerVisible = !e.isMarkerVisible;
    });
    setSensors(sensors);
  }

  function changeHeatMapVisible(sensor: Sensor) {
    sensors.map((e) => {
      if (e.id == sensor.id) e.isHeatmapVisible = !e.isHeatmapVisible;
    });
    setSensors(sensors);
  }

  function changeCentroidVisible(sensor: Sensor) {
    sensors.map((e) => {
      if (e.id == sensor.id) e.isCentroidVisible = !e.isCentroidVisible;
    });
    setSensors(sensors);
  }

  function changeHeatMapBlur(sensor: Sensor, blur: number) {
    sensors.map((e) => {
      if (e.id == sensor.id) e.heatmapBlur = blur;
    });
    setSensors(sensors);
  }

  function changeHeatMapRadius(sensor: Sensor, radius: number) {
    sensors.map((e) => {
      if (e.id == sensor.id) e.heatmapRadius = radius;
    });
    setSensors(sensors);
  }

  return (
    <IonItem detail={false}>
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
              Team: {sensor.team}
              <br />
              <IonPopover
                isOpen={showPopover.open}
                event={showPopover.event}
                onDidDismiss={() => {
                  setShowPopover({ open: false, event: undefined });
                }}
              >
                <IonItem>
                  <IonLabel>heatmap</IonLabel>
                  <IonToggle
                    checked={sensor.isHeatmapVisible}
                    value="heatmap"
                    onIonChange={() => changeHeatMapVisible(sensor)}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel>marker</IonLabel>
                  <IonToggle
                    checked={sensor.isMarkerVisible}
                    value="marker"
                    onIonChange={() => changeMarkerVisible(sensor)}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel>centroids</IonLabel>
                  <IonToggle
                    checked={sensor.isCentroidVisible}
                    value="centroids"
                    onIonChange={() => changeCentroidVisible(sensor)}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel>Radius</IonLabel>
                  <IonRange
                    min={5}
                    max={20}
                    step={1}
                    snaps={true}
                    value={sensor.heatmapRadius}
                    onIonChange={(e) => {
                      changeHeatMapRadius(sensor, e.detail.value as number);
                    }}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel>Blur</IonLabel>
                  <IonRange
                    min={5}
                    max={30}
                    step={1}
                    snaps={true}
                    value={sensor.heatmapBlur}
                    onIonChange={(e) => {
                      changeHeatMapBlur(sensor, e.detail.value as number);
                    }}
                  />
                </IonItem>
              </IonPopover>
              <IonFab vertical="top" horizontal="end" slot="fixed"></IonFab>
              <IonButton onClick={() => changeStatus(sensor)}>
                {sensor.status ? <div>checked</div> : <div>unChecked</div>}
              </IonButton>
            </IonLabel>
              <IonList>
              <IonButton
                onClick={(e) =>
                  setShowPopover({ open: true, event: e.nativeEvent })
                }
              >
                Setting
                <IonIcon icon={settingsOutline} />
              </IonButton>
              <IonButton onClick={findSensor}>
                Find
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
