import { ContextType } from 'react';
type LocationType = {
    lat: number;
    lon: number;
}

type ContextType = {
    center: LocationType;
    geolocation: LocationType;
    heatmapVisible: boolean;
    markerVisible: boolean;
    locationVisible: boolean;
    blur:number;
    radius:number;
    toggleHeatmap: () => void;
    toggleMarker: () => void;
    toggleLocation: () => void;
    setCenter: (LocationType) => void;
    setGeolocation: (LocationType) => void;
    setBlur: (number) => void;
    setRadius:(number) => void;
};