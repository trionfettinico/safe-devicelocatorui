import React, { useContext, useRef, useState } from 'react';
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
import { MapContext } from '../../provider/MapProvider';
import { ContextType } from '../../provider/type';


const Popover: React.FC = () => {

  const [popoverState, setShowPopover] = useState<boolean>(false);

  const {heatmapVisible, markerVisible, locationVisible, toggleLocation, toggleMarker, toggleHeatmap} = useContext(MapContext) as ContextType;

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
                  <IonToggle checked={heatmapVisible} value="heatmap" onIonChange={toggleHeatmap} />
                </IonItem>
                <IonItem>
                  <IonLabel>marker</IonLabel>
                  <IonToggle checked={markerVisible} value="marker" onIonChange={toggleMarker} />
                </IonItem>
                <IonItem>
                  <IonLabel>position</IonLabel>
                  <IonToggle checked={locationVisible} value="position" onIonChange={toggleLocation} />
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
