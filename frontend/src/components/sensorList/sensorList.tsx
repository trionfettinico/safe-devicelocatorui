import { IonList } from '@ionic/react';
import React from 'react';
import { MapContext } from '../../provider/MapProvider';
import { ContextType } from '../../provider/type';
import SensorItem from './sensoritem/SensorItem';

const SensorList: React.FC = () => {
    const {sensors} = React.useContext(MapContext) as ContextType;
    return (
        <IonList>
            {sensors.getFeatures().map(e => <SensorItem key={e.getId()} sensor={e} />)}
        </IonList>
    );
};

export default SensorList;