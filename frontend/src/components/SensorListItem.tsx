import {
    IonItem,
    IonLabel,
    IonNote
    } from '@ionic/react';
  import './MessageListItem.css';
  import { Sensor } from '../data/sensors'
  
  interface SensorListItemProps {
    sensor: Sensor;
  }
  
  const SensorListItem: React.FC<SensorListItemProps> = ({ sensor }) => {
    return (
      <IonItem routerLink={`/message/${sensor.id}`} detail={false} onClick={ ()=> console.log('abc')}>
        <div slot="start" className="dot dot-unread"></div>
        <IonLabel className="ion-text-wrap">
          <h2>
            {sensor.name}
            <span className="date">
              <IonNote>{sensor.status ? "true" : "false"}</IonNote>
            </span>
          </h2>
          <h3>{sensor.lat} {sensor.lng}</h3>
        </IonLabel>
      </IonItem>
    );
  };
  
  export default SensorListItem;
  