import 'package:flutter/material.dart';

import 'package:flutter_map/flutter_map.dart';
import "package:latlong/latlong.dart";

class Maps extends StatefulWidget {
  const Maps({Key key}) : super(key: key);

  @override
  _Maps createState() => _Maps();
}

class _Maps extends State<Maps> {
  @override
  Widget build(BuildContext context) {
    return Container(
        width: 550,
        alignment: Alignment.centerLeft,
        child: FlutterMap(
          options: MapOptions(
            center: LatLng(43.13, 13.05),
            zoom: 15.0,
            maxZoom: 18.0,
            swPanBoundary: LatLng(43.112, 13.028),
            nePanBoundary: LatLng(43.153, 13.098),
          ),
          layers: [
            TileLayerOptions(
              tileProvider: AssetTileProvider(),
              urlTemplate: "assets/camerino/{z}_{x}_{y}.png",
            ),
          ],
        ));
  }
}
