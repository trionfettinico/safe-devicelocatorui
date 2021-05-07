import { Plugins } from "@capacitor/core";
import React from 'react';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Icon, Style } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import { TPositionLayerComponentProps } from "./position-types";
import { TMarkersLayerProps } from "../marker/marker-types";
import { MapContext } from "../../map";
import { IMapContext } from "../../map-types";

const { Geolocation } = Plugins;

class GeolocationButton extends React.PureComponent<TPositionLayerComponentProps> {

    layer: VectorLayer = new VectorLayer();
    iconFeature: Feature = new Feature();
    iconStyle: Style = new Style();
    vectorSource: VectorSource = new VectorSource();
    vectorLayer: VectorLayer = new VectorLayer();

    componentDidMount() {
        this.addPositionLayer();
    }

    async addPositionLayer(){
        var position = await Geolocation.getCurrentPosition();

        this.iconFeature = new Feature({
            geometry: new Point(fromLonLat([position.coords.longitude, position.coords.latitude])),
            name: 'Null Island'
        });

        this.iconStyle = new Style({
            image: new Icon({
                src: "/assets/icon/location.svg",
                color: "green"
            }),
        });

        this.iconFeature.setStyle(this.iconStyle);

        this.vectorLayer = new VectorLayer({
            source: new VectorSource({
                features: [this.iconFeature],
            }),
        });

        this.props.map.addLayer(this.vectorLayer);
    }

    render() {
        return null;
    }

}


export const GeolocationLayer = (props: TMarkersLayerProps) => {
    return (
        <MapContext.Consumer>
            {(mapContext: IMapContext | void) => {
                if (mapContext) {
                    console.log("mapContextMarker");
                    console.log(mapContext);
                    return <GeolocationButton {...props} map={mapContext.map} />;
                }
            }}
        </MapContext.Consumer>
    );
};
