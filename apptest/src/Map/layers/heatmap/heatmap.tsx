import React from "react";
import { MapBrowserEvent } from "ol";
import {Heatmap} from "ol/layer";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Style from "ol/style/Style";
import Circle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
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
    this.source = new VectorSource({
      url: '/assets/prova.kml',
      format: new KML({
        extractStyles: false,
      }),
    });
    console.log(this.source.getFeatures());
    this.layer = new Heatmap({
      source: this.source,
      blur: 15,
      radius: 8,
      weight: function (feature) {
        // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
        // standards-violating <magnitude> tag in each Placemark.  We extract it from
        // the Placemark's name instead.
        var name = feature.get('name');
        var magnitude = parseFloat(name.substr(2));
        return magnitude - 5;
      },
    });

    this.props.map.addLayer(this.layer);
  }

  render() {
    return null;
  }
}

export const HeatmapLayerWithContext = (props: THeatmapLayerProps) => {
  console.log(props);
  return (
    <MapContext.Consumer>
      {(mapContext: IMapContext | void) => {
        if (mapContext) {
          console.log(mapContext);
          return <HeatmapLayerComponent {...props} map={mapContext.map} />;
        }
      }}
    </MapContext.Consumer>
  );
};
