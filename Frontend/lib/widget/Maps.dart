import 'package:flutter/material.dart';

import 'package:flutter_map/flutter_map.dart';
import "package:latlong/latlong.dart";
import 'package:provaproject/providers/MapProvider.dart';
import "package:provider/provider.dart";

class Maps extends StatefulWidget {
  @override
  _Maps createState() => _Maps();
}

class _Maps extends State<Maps> {
  double _currentZoom = 15.0;
  LatLng _currentCenter = LatLng(43.129456, 13.065484);
  MapController _mapController = MapController();

  _zoom() {
    _currentZoom = _currentZoom + 1;
    _mapController.move(_currentCenter, _currentZoom);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 1000,
      alignment: Alignment.centerLeft,
      child: Stack(
        children: [
          FlutterMap(
            mapController: _mapController,
            options: MapOptions(
              center: _currentCenter,
              zoom: _currentZoom,
              maxZoom: 22.0,
              swPanBoundary: LatLng(43.112, 13.028),
              nePanBoundary: LatLng(43.153, 13.098),
              pinchZoomThreshold: 1.0,
            ),
            layers: [
              TileLayerOptions(
                urlTemplate:
                    "http://tile.thunderforest.com/cycle/{z}/{x}/{y}.png",
                maxZoom: 22.0,
              ),
            ],
          ),
          Positioned(
            bottom: 10,
            right: 10,
            child: IconButton(
                icon: Icon(Icons.ac_unit),
                iconSize: 24.0,
                onPressed: () {
                  _zoom();
                  print("$_currentZoom");
                }),
          ),
        ],
      ),
    );
  }
}
