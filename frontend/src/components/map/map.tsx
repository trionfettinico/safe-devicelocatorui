import React, { useContext, useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from 'ol/proj';
import "ol/ol.css";
import "./map.css";
import { HeatmapLayer, GeolocationLayer, MarkerLayer } from "./layers";
import { MapContext } from "../../provider/MapProvider";
import { ContextType } from "../../provider/type";

export const MapComponent: React.FC = ()=>{
  const {center} = useContext(MapContext) as ContextType;
  const mapDivRef = useRef<HTMLDivElement>(null);
  const [map] = useState<Map>(new Map({
    layers: [
      new TileLayer({
        source: new XYZ({
          url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        })
      }),
    ],
    view: new View({
      center: fromLonLat([center.lon, center.lat]),
      zoom: 15,
      maxZoom: 22,
      minZoom: 15
    })
  }));

  useEffect(()=>{
    if(mapDivRef.current != null){
      map.setTarget(mapDivRef.current);
    }
    map.getView().setCenter(fromLonLat([center.lon, center.lat]));
  });

  return (
      <div className="map" ref={mapDivRef}>
        <HeatmapLayer map={map} />
        <MarkerLayer map={map} />
        <GeolocationLayer map={map} />
      </div>
  );
}
