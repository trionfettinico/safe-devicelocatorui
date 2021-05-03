import React from "react";
import 'ol/ol.css';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import { Vector as VectorLayer } from 'ol/layer';
import "ol/ol.css";
import * as olProj from 'ol/proj';
import IconAnchorUnits from "ol/style/IconAnchorUnits";

var iconFeature: Feature;
var iconStyle: Style;
var vectorSource: VectorSource;
var vectorLayer: VectorLayer;



export class MarkerObject extends React.PureComponent {

  constructor(prop: any) {

    super(prop);

    iconFeature = new Feature({
      geometry: new Point(olProj.fromLonLat([13.068770 , 43.140362])),
      name: 'Null Island',
    });

    iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: IconAnchorUnits.FRACTION,
        anchorYUnits: IconAnchorUnits.PIXELS,
        src: 'https://openlayers.org/en/latest/examples/data/icon.png'
      }),
    });

    iconFeature.setStyle(iconStyle);

    vectorSource = new VectorSource({
      features: [iconFeature],
    });

    vectorLayer = new VectorLayer({
      source: vectorSource,
    });

  }

  render() {
    return (
      vectorLayer
    );
  }

  get getMarker() {
    return vectorLayer;
  }
}