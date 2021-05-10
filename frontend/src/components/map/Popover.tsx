import React, { ContextType, useRef, useState } from 'react';
import {
  IonCard,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonPopover,
  IonToggle,
} from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import { MapContext } from './map';


const Popover: React.FC = () => {
  
  const context = React.useContext(MapContext);


  const [popoverState, setShowPopover] = useState<boolean>(false);

  const [heatmap, setCheckedHeatmap] = useState(true);
  const [marker, setCheckedMarker] = useState(true);
  const [position, setCheckedPosition] = useState(true);


  function changeHeatMap() {
    if(context!=null)
    context.map.getLayers().getArray()
      .filter(layer => layer.getClassName() == "heatmap")
      .forEach(layer => {
        if (heatmap) {
          setCheckedHeatmap(false);
          layer.setVisible(false);
        } else {
          setCheckedHeatmap(true)
          layer.setVisible(true);
        }
      });
  }

  function changeMarker() {
    if(context!=null)
    context.map.getLayers().getArray()
      .filter(layer => layer.getClassName() == "marker")
      .forEach(layer => {
        if (marker) {
          setCheckedMarker(false)
          layer.setVisible(false);
        } else {
          setCheckedMarker(true)
          layer.setVisible(true);
        }
      });
  }

  function changePosition() {
    if(context!=null)
    context.map.getLayers().getArray()
      .filter(layer => layer.getClassName() == "position")
      .forEach(layer => {
        if (position) {
          setCheckedPosition(false)
          layer.setVisible(false);
        } else {
          setCheckedPosition(true)
          layer.setVisible(true);
        }
      });
  }

  return (
    <>
      <IonPopover
        cssClass='my-custom-class'
        isOpen={popoverState}
        onDidDismiss={() => {
          setShowPopover(false);
        }}
      >
        <IonCard>
          <IonItem>
            <IonLabel>heatmap</IonLabel>
            <IonToggle checked={heatmap} value="heatmap" onIonChange={() => {
              changeHeatMap();
            }}/>
          </IonItem>
          <IonItem>
            <IonLabel>marker</IonLabel>
            <IonToggle checked={marker} value="marker" onIonChange={() => {
              changeMarker();
            }}/>
          </IonItem>
          <IonItem>
            <IonLabel>position</IonLabel>
            <IonToggle checked={position} value="position" onIonChange={() => {
              changePosition();
            }}/>
          </IonItem>
        </IonCard>
      </IonPopover>
      <IonFab vertical="top" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => setShowPopover(true)}>
          <IonIcon icon={settingsOutline} />
        </IonFabButton>
      </IonFab>
    </>
  );
};



export default Popover;
