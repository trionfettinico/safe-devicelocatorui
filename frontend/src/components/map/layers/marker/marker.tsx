import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import React from "react";
import Feature from 'ol/Feature';
import Point from "ol/geom/Point";
import {fromLonLat} from 'ol/proj';
import { TMarkersLayerComponentProps, TMarkersLayerProps } from "./marker-types";

import { MapContext } from "../../map";
import { IMapContext } from "../../map-types";
import { Icon, Style } from 'ol/style';
import IconAnchorUnits from "ol/style/IconAnchorUnits";



class MarkersLayerComponent extends React.PureComponent<TMarkersLayerComponentProps> {
    layer: VectorLayer = new VectorLayer;
    componentDidMount() {
      this.layer = new VectorLayer({
            source: new VectorSource({
                features: [new Feature({
                    geometry: new Point(fromLonLat([13.382316666666668,43.61946166666666])),
                    name: 'Null Island',
                    style: new Style({
                      image: new Icon({
                        src: '/assets/marker.png',
                        scale: 0.5
                      }),
                  })})],
              }),
          });

      this.props.map.addLayer(this.layer);
    }

    render(){
        return null;
    }
}

export const MarkersLayerWithContext = (props : TMarkersLayerProps) => {
    return(
        <MapContext.Consumer>
      {(mapContext: IMapContext | void) => {
        if (mapContext) {
          console.log(mapContext);
          return <MarkersLayerComponent {...props} map={mapContext.map} />;
        }
      }}
    </MapContext.Consumer>
    );
}