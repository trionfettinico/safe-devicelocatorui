import React from "react";
import {Heatmap} from "ol/layer";
import VectorSource from "ol/source/Vector";
import KML from 'ol/format/KML';
import { MapContext } from "../../map";
import { IMapContext } from "../../map-types";
import { THeatmapLayerProps, THeatmapLayerComponentProps } from "./heatmap-types";

class HeatmapLayerComponent extends React.PureComponent<
  THeatmapLayerComponentProps
> {
  source: VectorSource = new VectorSource();
  layer: Heatmap = new Heatmap();

  componentDidMount() {
    console.log("heatmap mount");
    this.source = new VectorSource({
      url: './assets/file-2.kml',
      format: new KML({
        extractStyles: false,
      }),
    });
    this.layer = new Heatmap({
      source: this.source,
      blur: 20,
      radius: 8,
      weight: function (feature) {
        return feature.get('rssi'); 
      },
    });

    this.props.map.addLayer(this.layer);
  }

  render() {
    console.log("heatmap render");
    return null;
  }
}

export const HeatmapLayerWithContext = (props: THeatmapLayerProps) => {
  return (
    <MapContext.Consumer>
      {(mapContext: IMapContext | void) => {
        if (mapContext) {
          return <HeatmapLayerComponent {...props} map={mapContext.map} />;
        }
      }}
    </MapContext.Consumer>
  );
};
