
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import React from "react";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import {
  TMarkersLayerComponentProps,
  TMarkersLayerProps,
} from "./marker-types";

import { MapContext } from "../../map";
import { IMapContext } from "../../map-types";
import { Icon, Style } from "ol/style";
import IconAnchorUnits from "ol/style/IconAnchorUnits";
import 'ol/ol.css';



class MarkersLayerComponent extends React.PureComponent<TMarkersLayerComponentProps> {
<<<<<<< Updated upstream
  layer: VectorLayer = new VectorLayer();
  iconFeature: Feature = new Feature();
  iconStyle: Style = new Style();
  vectorSource: VectorSource = new VectorSource();
  vectorLayer: VectorLayer = new VectorLayer();

  componentDidMount() {
    this.iconFeature = new Feature({
      geometry: new Point(fromLonLat([13.382316666666668, 43.61946166666666])),
      name: 'Null Island'
    });

    this.iconStyle = new Style({
      image: new Icon({
        //anchor: [0.5, 46],
        anchorXUnits: IconAnchorUnits.FRACTION,
        anchorYUnits: IconAnchorUnits.PIXELS,
        src: '/assets/marker.png',
        scale: 0.05,
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
=======
    layer: VectorLayer = new VectorLayer;
    componentDidMount() {
      this.layer = new VectorLayer({
            source: new VectorSource({
                features: [new Feature({
                    geometry: new Point(fromLonLat([13.382316666666668,43.61946166666666])),
                    name: 'Null Island',
                    style: new Style({
                      image: new Icon({
                        anchor: [0.5, 46],
                        anchorXUnits: IconAnchorUnits.FRACTION,
                        anchorYUnits: IconAnchorUnits.PIXELS,
                        src: '/assets/marker.png',
                      }),
                  })})],
              }),
          });

      this.props.map.addLayer(this.layer);
    }

    render(){
        return null;
    }
>>>>>>> Stashed changes
}

export const MarkersLayerWithContext = (props: TMarkersLayerProps) => {
  return (
    <MapContext.Consumer>
      {(mapContext: IMapContext | void) => {
        if (mapContext) {
          console.log("mapContextMarker");
          console.log(mapContext);
          return <MarkersLayerComponent {...props} map={mapContext.map} />;
        }
      }}
    </MapContext.Consumer>
  );
};
