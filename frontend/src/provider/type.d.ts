import { PluginListenerHandle } from '@capacitor/core';
import Geometry from 'ol/geom/Geometry';
import VectorSource from 'ol/source/Vector';
import { ContextType } from 'react';
import { Sensor } from '../data/sensors';
type LocationType = {
    lat: number;
    lon: number;
}

type ContextType = {
    geolocation: LocationType;
    heatmapVisible: boolean;
    markerVisible: boolean;
    locationVisible: boolean;
    centroidsVisible: boolean;
    orientation: number;
    followUser: boolean;
    setFollowUser: (boolean) => void;
    setOrientation: (number) => void;
    blur:number;
    radius:number;
    toggleHeatmap: () => void;
    toggleMarker: () => void;
    toggleCentroids: () => void;
    toggleLocation: () => void;
    setGeolocation: (LocationType) => void;
    startLocationListeners: () => void;
    addMapListener: (fun: (center:LocationType)=>void)=>void;
    goToLocation: (location:LocationType) => void;
    setBlur: (number) => void;
    setRadius:(number) => void;
    sensors: Array<Sensor>;
    setSensors: (sensorsList: Array<Sensor>) => void;
    teams: Array<string>;
    setTeams: (Array) => void;
    team: string;
    setTeam: (string) => void;
};