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
              center: LatLng(43.129456, 13.055),
              zoom: _currentZoom,
              maxZoom: 22.0,
              swPanBoundary: LatLng(43.120, 13.048),
              nePanBoundary: LatLng(43.140, 13.068),
              pinchZoomThreshold: 1.0,
            ),
            layers: [
              TileLayerOptions(
                tileProvider: FileTileProvider(),
                urlTemplate:
                    "/Users/lorenzotanganelli/Documents/Development/safe-devicelocatorui/mapDownloader/tiles/{z}_{x}_{y}.png",
                maxZoom: 22.0,
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
