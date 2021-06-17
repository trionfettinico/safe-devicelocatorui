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
import { CentroidsLayer } from "./layers/centroids";

export const MapComponent: React.FC = () => {
  const { orientation, setFollowUser, followUser, geolocation, addMapListener, sensors } = useContext(MapContext) as ContextType;
  const mapDivRef = useRef<HTMLDivElement>(null);
  const [map] = useState<Map>(new Map({
    layers: [
      new TileLayer({
        source: new XYZ({
          url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",//(window['Ionic' as any]['WebView' as any] as any).convertFileSrc("file:///storage/emulated/0/Android/data/io.ionic.starter/files/tiles/tiles/{z}/{x}/{y}.png"),
        })
      }),
    ],
    view: new View({
      center: fromLonLat([0, 0]),
      zoom: 15,
      maxZoom: 22,
      minZoom: 2
    })
  }));

  useEffect(() => {
    setTimeout(() => {
      if (mapDivRef.current != null) {
        map.setTarget(mapDivRef.current);
        addMapListener((location) => map.getView().setCenter(fromLonLat([location.lon, location.lat])))
      }
    }, 1000);
  }, []);

  if (followUser) {
    map.getView().setRotation(orientation);
    map.getView().setCenter(fromLonLat([geolocation.lon, geolocation.lat]));
  }

  map.on("pointermove", () => {
    if (followUser)
      setFollowUser(false);
  });

  return (
    <div className="map" ref={mapDivRef}>
      {sensors.map((e)=><CentroidsLayer map={map} sensor={e}/>)}
      {sensors.map((e)=><MarkerLayer map={map} sensor={e}/>)}
      {sensors.map((e)=><HeatmapLayer map={map} sensor={e}/>)}
      <GeolocationLayer map={map} />
    </div>
  );
}