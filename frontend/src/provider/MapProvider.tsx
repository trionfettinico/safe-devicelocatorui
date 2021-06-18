import { Motion, Geolocation } from "@capacitor/core";
import React, { useEffect } from "react";
import { LocationType, ContextMapType } from "./type";
import { toRadians } from 'ol/math';
import StorageService from "../services/storage";

export const MapContext = React.createContext<ContextMapType | null>(null);

class MapCenterListener {
    notify: (center: LocationType) => void;
    constructor(fun: (center: LocationType) => void) {
        this.notify = fun;
    }
}

const MapProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [locationVisible, setLocationVisible] = React.useState<boolean>(true);
    const [geolocation, setGeolocation] = React.useState<LocationType>({ lat: 0, lon: 0 });
    const [orientation, setOrientation] = React.useState<number>(0);
    const [followUser, setFollowUser] = React.useState<boolean>(true);
    const [centerChangeListeners] = React.useState<Array<MapCenterListener>>(new Array());
    const [storageService] = React.useState(new StorageService());
    const [tilesInit, setTilesInit] = React.useState<boolean>(false);

    async function clearAll() {
        await storageService.clearAll();
    }

    async function loadData() {
        setTilesInit(await storageService.getIsTilesLoaded());
        setLocationVisible(await storageService.getLocationVisible());
    }

    useEffect(() => {
        loadData();
    }, []);

    const setTilesInitLocal = (value:boolean) => {
        setTilesInit(value);
        storageService.saveTilesInit(value);
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

    const toggleLocation = () => {
        setLocationVisible(!locationVisible);
        storageService.saveLocationVisible(!locationVisible);
        
    }

    return (
        <MapContext.Provider value={{
            locationVisible,
            geolocation,
            orientation,
            followUser,
            setFollowUser,
            setOrientation,
            setGeolocation,
            startLocationListeners,
            goToLocation,
            addMapListener,
            toggleLocation,
            tilesInit,
            setTilesInitLocal,
            clearAll
        }}>
            {children}
        </MapContext.Provider>
    );
};

export default MapProvider;