import { Coordinate } from 'ol/coordinate';
import {fromLonLat} from 'ol/proj';


export interface Sensor {
    id: string;
    name: string;
    coordinate: Coordinate;
    status: boolean;
}

const sensors: Sensor[] = [
    {
        id: "2021-04-01 15:02:11",
        name: "2021-04-01 15:02:11",
        coordinate: fromLonLat([13.382316666666668,43.61946166666666]),
        status: false
    },
  ];
  
  export const getSensors = () => sensors;
  
  export const getSensor = (id: string) => sensors.find(s => s.id === id);
  