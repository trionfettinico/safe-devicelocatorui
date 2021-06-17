import { Sensor } from "../data/sensors";

class ApiService{
    async loadSensors(): Promise<Array<Sensor>> {
        return await fetch("http://127.0.0.1:1234/api/sensors")
          .then((response) => response.json())
          .then((response) =>
            response.sensors.map((element: any) => ({
              id: element,
              status: false,
              team: "",
              isHeatmapVisible: true,
              isMarkerVisible: true,
              isCentroidVisible: true,
              heatmapRadius: 20,
              heatmapBlur: 18,
            })));
      };
}

export default ApiService;