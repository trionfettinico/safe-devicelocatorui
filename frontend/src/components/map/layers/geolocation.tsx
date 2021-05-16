import { Plugins } from "@capacitor/core";
import React, { useContext } from 'react';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Icon, Style } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import { MapLayerProps } from "../map-types";
import { ContextType } from "../../../provider/type";
import { MapContext } from "../../../provider/MapProvider";

const { Geolocation } = Plugins;

export const GeolocationLayer: React.FC<MapLayerProps> = ({ map }) => {
    const {locationVisible, setGeolocation, setCenter} = useContext(MapContext) as ContextType;
    const locationLayer = map.getLayers().getArray().filter((layer) => layer.getClassName() == "position");
    if (locationLayer.length > 0) {
        //locationLayer exists
        locationLayer.forEach((locationLayer)=>locationLayer.setVisible(locationVisible));
    } else {
        //locationLayer does not exist
        Geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((position) => {
            const iconFeature = new Feature({
                geometry: new Point(fromLonLat([position.coords.longitude, position.coords.latitude])),
                name: 'Null Island'
            });
            const iconStyle = new Style({
                image: new Icon({
                    src: "./assets/icon/location.svg",
                    color: "green"
                }),
            });
            iconFeature.setStyle(iconStyle);
            const vectorLayer = new VectorLayer({
                source: new VectorSource({
                    features: [iconFeature],
                }),
                className: "position",
                visible: locationVisible,
            });

            map.addLayer(vectorLayer);
            setGeolocation({lat: position.coords.latitude, lon: position.coords.longitude});
            setCenter({lat: position.coords.latitude, lon: position.coords.longitude});
        });
    }
    return null;
}
