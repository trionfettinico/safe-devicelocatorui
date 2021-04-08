import 'package:flutter/material.dart';

import 'package:flutter_map/flutter_map.dart';
import "package:latlong/latlong.dart";

class Maps extends StatefulWidget {
  @override
  _Maps createState() => _Maps();
}

class _Maps extends State<Maps> {
  double _currentZoom = 15.0;
  double _maxZoom = 22.0;
  double _minZoom = 15.0;
  MapController _mapController = MapController();

  _zoomIn() {
    setState(() {
      _currentZoom = _currentZoom + 1;
      _mapController.move(_mapController.center, _currentZoom);
    });
  }

  _zoomOut() {
    setState(() {
      _currentZoom = _currentZoom - 1;
      _mapController.move(_mapController.center, _currentZoom);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 550,
      alignment: Alignment.centerLeft,
      child: Stack(
        children: [
          FlutterMap(
            mapController: _mapController,
            options: MapOptions(
              center: LatLng(43.140360, 13.068770),
              zoom: _currentZoom,
              maxZoom: 22.0,
              swPanBoundary: LatLng(43.095360, 13.023770),
              nePanBoundary: LatLng(43.185360, 13.113770),
              pinchZoomThreshold: 1.0,
            ),
            layers: [
              TileLayerOptions(
                tileProvider: FileTileProvider(),
                urlTemplate:
                    "/home/luca/Scrivania/safe-devicelocatorui/map_downloader/tiles/{z}_{x}_{y}.png",
                maxZoom: 22.0,
              ),
              MarkerLayerOptions(
                markers: [
                  Marker(
                    width: 35.0,
                    height: 35.0,
                    point: LatLng(43.144118, 13.060696),
                    builder: (ctx) => Container(
                      child: FlutterLogo(),
                    ),
                  ),
                  Marker(
                    width: 35.0,
                    height: 35.0,
                    point: LatLng(43.145463, 13.067670),
                    builder: (ctx) => Container(
                      child: FlutterLogo(),
                    ),
                  ),
                  Marker(
                    width: 35.0,
                    height: 35.0,
                    point: LatLng(43.143224, 13.080657),
                    builder: (ctx) => Container(
                      child: FlutterLogo(),
                    ),
                  ),
                  Marker(
                    width: 35.0,
                    height: 35.0,
                    point: LatLng(43.149503, 13.063626),
                    builder: (ctx) => Container(
                      child: FlutterLogo(),
                    ),
                  ),
                ],
              ),
            ],
          ),
          Positioned(
            bottom: 10,
            right: 10,
            child: FloatingActionButton(
              child: Icon(
                Icons.zoom_in,
                size: 36,
              ),
              onPressed: _currentZoom == _maxZoom ? null : _zoomIn,
            ),
          ),
          Positioned(
            bottom: 10,
            right: 80,
            child: FloatingActionButton(
              child: Icon(
                Icons.zoom_out,
                size: 36,
              ),
              onPressed: _currentZoom == _minZoom ? null : _zoomOut,
            ),
          ),
        ],
      ),
    );
  }
}
