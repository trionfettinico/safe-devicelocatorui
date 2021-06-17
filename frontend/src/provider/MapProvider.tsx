import { Motion, Geolocation } from "@capacitor/core";
import React, { useEffect } from "react";
import { LocationType, ContextType } from "./type";
import { toRadians } from 'ol/math';
import StorageService from "../services/storage";
import { Sensor } from "../data/sensors";
import ApiService from "../services/apiService";

export const MapContext = React.createContext<ContextType | null>(null);

class MapCenterListener {
    notify: (center: LocationType) => void;
    constructor(fun: (center: LocationType) => void) {
        this.notify = fun;
    }
}

const MapProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [apiService] = React.useState<ApiService>(new ApiService());
    const [locationVisible, setLocationVisible] = React.useState<boolean>(true);
    const [geolocation, setGeolocation] = React.useState<LocationType>({ lat: 0, lon: 0 });
    const [orientation, setOrientation] = React.useState<number>(0);
    const [followUser, setFollowUser] = React.useState<boolean>(true);
    const [centerChangeListeners] = React.useState<Array<MapCenterListener>>(new Array());
    const [sensors, setSensorsLocal] = React.useState(new Array<Sensor>());
    const [storageService] = React.useState(new StorageService());
    const [centroidsVisible, setCentroidsVisible] = React.useState<boolean>(true);
    const [teams, setTeamsLocal] = React.useState<Array<string>>([]);
    const [team, setTeamLocal] = React.useState<string>("");

    async function loadData() {
        var sensorsTemp = await storageService.getSensorLocal();
        if(sensorsTemp.length === 0) {
            sensorsTemp = await apiService.loadSensors();
        }
        setSensors(sensorsTemp);
        setLocationVisible(await storageService.getLocationVisible());
        setCentroidsVisible(await storageService.getCentroidsVisible());
        setTeams(await storageService.getTeams());
        setTeam(await storageService.getTeam());
    }

    useEffect(() => {
        loadData();
    }, []);

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

    const setSensors = async (sensorsList: Array<Sensor>) => {
        setSensorsLocal(sensorsList);
        storageService.saveSensorLocal(sensorsList);
    }

    const setTeams = async (teams: Array<string>) => {
        setTeamsLocal(teams);
        storageService.saveTeams(teams);
    }

    const setTeam = async (team: string) => {
        setTeamLocal(team);
        storageService.saveTeam(team);
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
            addMapListener,
            goToLocation,
            sensors,
            setSensors,
            teams,
            setTeams,
            team,
            setTeam,
        }}>
            {children}
        </MapContext.Provider>
    );
};

export default MapProvider;