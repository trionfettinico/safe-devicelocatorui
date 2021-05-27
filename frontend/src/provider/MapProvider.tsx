import { Motion, Geolocation } from "@capacitor/core";
import React, { useEffect } from "react";
import { LocationType, ContextType } from "./type";
import { toRadians } from 'ol/math';
import VectorSource from "ol/source/Vector";
import StorageService from "../services/storage";

export const MapContext = React.createContext<ContextType | null>(null);

class MapCenterListener {
    notify: (center: LocationType) => void;
    constructor(fun: (center: LocationType) => void) {
        this.notify = fun;
    }
}

const MapProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [heatmapVisible, setHeatmapVisible] = React.useState<boolean>(true);
    const [blur, setBlurState] = React.useState<number>(20);
    const [radius, setRadiusState] = React.useState<number>(8);
    const [markerVisible, setMarkerVisible] = React.useState<boolean>(true);
    const [locationVisible, setLocationVisible] = React.useState<boolean>(true);
    const [geolocation, setGeolocation] = React.useState<LocationType>({ lat: 0, lon: 0 });
    const [orientation, setOrientation] = React.useState<number>(0);
    const [followUser, setFollowUser] = React.useState<boolean>(true);
    const [centerChangeListeners] = React.useState<Array<MapCenterListener>>(new Array());
    const [sensors, setSensorsLocal] = React.useState(new VectorSource());
    const [storageService] = React.useState(new StorageService());

    async function loadData(){
        setHeatmapVisible(await storageService.getHeatmapVisible());
        setLocationVisible(await storageService.getLocationVisible());
        setBlur(await storageService.getBlur());
        setRadius(await storageService.getRadius());
    }

    useEffect(()=>{
        loadData();
    }, []);

    const toggleHeatmap = () => {
        setHeatmapVisible(!heatmapVisible);
        storageService.saveHeatmapVisible(!heatmapVisible);
    };

    const toggleMarker = () => {
        setMarkerVisible(!markerVisible);
        storageService.saveMarkerVisible(!markerVisible);
    }

    const toggleLocation = () => {
        setLocationVisible(!locationVisible);
        storageService.saveLocationVisible(!locationVisible);
    }

    const setBlur = (value: number)=>{
        setBlurState(value);
        storageService.saveBlur(value);
    }

    const setRadius = (value: number)=>{
        setRadiusState(value);
        storageService.saveRadius(value);
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
        setMarkerVisible(true);
        centerChangeListeners.forEach((it) => it.notify(location));
    }

    const setSensors = async (vector: VectorSource) => {
        setSensorsLocal(vector);
        setMarkerVisible(await storageService.getMarkerVisible());
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