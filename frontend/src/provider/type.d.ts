import { PluginListenerHandle } from '@capacitor/core';
import { ContextType } from 'react';
type LocationType = {
    lat: number;
    lon: number;
}

type ContextType = {
    geolocation: LocationType;
    heatmapVisible: boolean;
    markerVisible: boolean;
    locationVisible: boolean;
    orientation: number;
    followUser: boolean;
    setFollowUser: (boolean) => void;
    setOrientation: (number) => void;
    blur:number;
    radius:number;
    toggleHeatmap: () => void;
    toggleMarker: () => void;
    toggleLocation: () => void;
    setGeolocation: (LocationType) => void;
    startLocationListeners: () => void;
    addMapListener: (fun: (center:LocationType)=>void)=>void;
    goToLocation: (location:LocationType) => void;
    setBlur: (number) => void;
    setRadius:(number) => void;
};