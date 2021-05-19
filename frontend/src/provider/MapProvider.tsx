import React from "react";
import { LocationType, ContextType } from "./type";

export const MapContext = React.createContext<ContextType | null>(null);

const MapProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [heatmapVisible, setHeatmapVisible] = React.useState<boolean>(true);
    const [blur,setBlur] = React.useState<number>(20);
    const [radius,setRadius] = React.useState<number>(8);
    const [markerVisible, setMarkerVisible] = React.useState<boolean>(true);
    const [locationVisible, setLocationVisible] = React.useState<boolean>(true);
    const [center, setCenterState] = React.useState<LocationType>({ lat: 0, lon: 0 });
    const [geolocation, setGeolocationState] = React.useState<LocationType>({ lat: 0, lon: 0 });

    const toggleHeatmap = () => {
        setHeatmapVisible(!heatmapVisible);
    };

    const toggleMarker = () => {
        setMarkerVisible(!markerVisible);
    }

    const toggleLocation = () => {
        setLocationVisible(!locationVisible);
    }

    const setCenter = (newCenter: LocationType) => {
        setCenterState(newCenter);
    }

    const setGeolocation = (newGeolocation: LocationType)=>{
        setGeolocationState(newGeolocation);
    }

    return (
        <MapContext.Provider value={{ heatmapVisible, markerVisible, locationVisible,blur,radius, center, geolocation, setGeolocation, toggleHeatmap, toggleMarker, toggleLocation, setCenter,setBlur,setRadius }}>
            {children}
        </MapContext.Provider>
    );
};

export default MapProvider;