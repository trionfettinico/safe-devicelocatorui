import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import React, { useContext } from "react";
import {location} from "ionicons/icons"
import { MapContext } from "../../provider/MapProvider";
import { ContextType } from "../../provider/type";

export const LocationFab: React.FC = ()=>{
  const {setCenter, geolocation} = useContext(MapContext) as ContextType;
    return (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={()=>{setCenter(geolocation)}}>
            <IonIcon icon={location} />
          </IonFabButton>
        </IonFab>
    );
}