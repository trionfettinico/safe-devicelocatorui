import { Plugins } from "@capacitor/core";
import React, { useContext, useEffect, useState } from 'react';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Icon, Style } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import { MapLayerProps } from "../map-types";
import { ContextType } from "../../../provider/type";
import { MapContext } from "../../../provider/MapProvider";
import BaseLayer from "ol/layer/Base";

const { Geolocation } = Plugins;

export const GeolocationLayer: React.FC<MapLayerProps> = ({ map }) => {
    const { locationVisible, geolocation, startLocationListeners } = useContext(MapContext) as ContextType;
    const [iconFeature] = useState<Feature>(new Feature({
        geometry: new Point(fromLonLat([geolocation.lon, geolocation.lat])),
        name: 'Null Island'
    }));
    const [layer] = useState<BaseLayer>(new VectorLayer({
        source: new VectorSource({
            features: [iconFeature],
        }),
        className: "position",
        visible: locationVisible,
    }));

    useEffect(() => {
        iconFeature.setStyle(new Style({
            image: new Icon({
                src: "./assets/icon/arrow.png",
                scale: 0.05
            }),
        }));

        map.addLayer(layer);

        startLocationListeners();
        console.log("started location listeners");

    }, []);

    layer.setVisible(locationVisible);
    iconFeature.setGeometry(new Point(fromLonLat([geolocation.lon, geolocation.lat])));

    return null;
}
