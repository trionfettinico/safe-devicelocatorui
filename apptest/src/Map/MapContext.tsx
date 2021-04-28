import React from "react";
import ol from "ol";

const MapContext = React.createContext({ map: ol.Map });
export default MapContext;
