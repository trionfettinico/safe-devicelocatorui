import { PluginListenerHandle } from '@capacitor/core';
import Geometry from 'ol/geom/Geometry';
import VectorSource from 'ol/source/Vector';
import { ContextType } from 'react';
import { Sensor } from '../data/sensors';
type LocationType = {
    lat: number;
    lon: number;
}

type ContextMapType = {
    locationVisible: boolean;
    geolocation: LocationType;
    orientation: number;
    followUser: boolean;
    setFollowUser: (boolean) => void;
    setOrientation: (number) => void;
    setGeolocation: (LocationType) => void;
    startLocationListeners: () => void;
    addMapListener: (fun: (center:LocationType)=>void)=>void;
    goToLocation: (location:LocationType) => void;
    toggleLocation: () => void;
    tilesInit:boolean;
    setTilesInit : (boolean) => void;
};

type ContextSensorsType = {
    sensors: Array<Sensor>;
    setSensors: (sensorsList: Array<Sensor>) => void;
    teams: Array<string>;
    setTeams: (Array) => void;
    team: string;
    setTeam: (string) => void;
};