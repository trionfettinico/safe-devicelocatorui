import React, { useEffect, useState } from "react";
import VectorSource from "ol/source/Vector";
import KML from "ol/format/KML";
import { SensorLayerProps } from "../map-types";
import VectorLayer from "ol/layer/Vector";
import Polygon from "ol/geom/Polygon";
import { Feature } from "ol";
import { Fill, Style } from "ol/style";
import { Sensor } from "../../../data/sensors";
import { validMethods } from "workbox-routing/utils/constants";
import { Coordinate } from "ol/coordinate";

export const CentroidsLayer: React.FC<SensorLayerProps> = ({ map, sensor }) => {
  const [vectorLayer] = useState<VectorLayer>(
    new VectorLayer()
  );

  const [polyone, setPolyone] = useState<Polygon> ();

  async function loadSensors() {
    var sensorsPoint: Array<Coordinate> = [];
    await fetch(
      "http://127.0.0.1:1234/api/centroid-area?sensor=" +
        sensor.id +
        "&format=json"
    )
      .then((response) => response.json())
      .then((response) =>
        response.features.map((element: any) => {
          let [lon, lat] = element.geometry.coordinates;
          sensorsPoint.push([lat,lon]);
        })
      );
    
    var featureone = new Feature(new Polygon([[sensorsPoint[0], sensorsPoint[1], sensorsPoint[2], sensorsPoint[0]]])); 
    var vectorSource = new VectorSource({  
        features: [featureone] 
    }); 
 
    featureone.setStyle(new Style({ 
        fill: new Fill({ 
            color: [0, 0, 255, 0.2] 
        }) 
    })); 

    vectorLayer.setSource(vectorSource);

    map.addLayer(vectorLayer);
    
  }

  useEffect(() => { 
    loadSensors();
  }, []);

  vectorLayer.setVisible(sensor.isCentroidVisible);
  return null;
};
