import { useState } from "react";
import { Sensor, getSensor } from "../data/sensors";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { personCircle } from "ionicons/icons";
import { useParams } from "react-router";
import "./ViewMessage.css";

function ViewSensor() {
  const [sensor, setSensors] = useState<Sensor>();
  const params = useParams<{ id: string }>();

  useIonViewWillEnter(() => {
    const msg = getSensor(params.id);
    setSensors(msg);
  });

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons>
            <IonBackButton text="Inbox" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {sensor ? (
          <>
            <IonItem>
              <IonLabel className="ion-text-wrap">
                <h2>
                  {sensor.name}
                  <span className="date">
                    <IonNote>{sensor.status ? "true" : "false"}</IonNote>
                  </span>
                </h2>
                <h3>{sensor.coordinate}</h3>
              </IonLabel>
            </IonItem>
          </>
        ) : (
          <div>Sensor not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewSensor;
