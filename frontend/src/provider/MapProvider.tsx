import { Motion, Geolocation } from "@capacitor/core";
import React from "react";
import { LocationType, ContextType } from "./type";
import { toRadians } from 'ol/math';
import KML from "ol/format/KML";
import VectorSource from "ol/source/Vector";

export const MapContext = React.createContext<ContextType | null>(null);

class MapCenterListener {
    notify: (center: LocationType) => void;
    constructor(fun: (center: LocationType) => void) {
        this.notify = fun;
    }
}

const MapProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [heatmapVisible, setHeatmapVisible] = React.useState<boolean>(true);
    const [blur, setBlur] = React.useState<number>(20);
    const [radius, setRadius] = React.useState<number>(8);
    const [markerVisible, setMarkerVisible] = React.useState<boolean>(true);
    const [locationVisible, setLocationVisible] = React.useState<boolean>(true);
    const [geolocation, setGeolocationState] = React.useState<LocationType>({ lat: 0, lon: 0 });
    const [orientation, setOrientationState] = React.useState<number>(0);
    const [followUser, setFollowUser] = React.useState<boolean>(true);
    const [centerChangeListeners] = React.useState<Array<MapCenterListener>>(new Array());
    const [sensors, setSensors] = React.useState(new VectorSource());

    const toggleHeatmap = () => {
        setHeatmapVisible(!heatmapVisible);
    };

    const toggleMarker = () => {
        setMarkerVisible(!markerVisible);
    }

    const toggleLocation = () => {
        setLocationVisible(!locationVisible);
    }

    const setGeolocation = (newGeolocation: LocationType) => {
        setGeolocationState(newGeolocation);
    }

    const setOrientation = (newOrientation: number) => {
        setOrientationState(newOrientation);
    }

    const startLocationListeners = () => {
        Geolocation.watchPosition({ enableHighAccuracy: true }, (position) => {
            if (position)
                setGeolocation({ lat: position.coords.latitude, lon: position.coords.longitude });
        });

        Motion.addListener('orientation', (values) => {
            setOrientation(toRadians(values.alpha));
        });
    }

    const addMapListener = (fun: (center: LocationType) => void) => {
        centerChangeListeners.push(new MapCenterListener(fun));
    }

    const goToLocation = (location: LocationType) => {
        setFollowUser(false);
        centerChangeListeners.forEach((it) => it.notify(location));
    }

    return (
        <MapContext.Provider value={{
            heatmapVisible,
            markerVisible,
            locationVisible,
            geolocation,
            orientation,
            followUser,
            setFollowUser,
            setOrientation,
            setGeolocation,
            toggleHeatmap,
            toggleMarker,
            toggleLocation,
            startLocationListeners,
            addMapListener,
            goToLocation,
            blur,
            setBlur,
            radius,
            setRadius,
            sensors,
            setSensors
        }}>
            {children}
        </MapContext.Provider>
    );
};

export default MapProvider;