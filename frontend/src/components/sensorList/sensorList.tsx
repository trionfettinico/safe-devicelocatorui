import { IonList } from '@ionic/react';
import React from 'react';
import { Sensor } from '../../data/sensors';
import SensorItem from './sensoritem/SensorItem';

interface SensorListProps {
    sensors: Array<Sensor>;
}

const SensorList: React.FC<SensorListProps> = ({ sensors }) => {
    return (
        <IonList>
            {sensors.map(e => <SensorItem key={e.id} sensor={e} />)}
        </IonList>
    );
};

export default SensorList;