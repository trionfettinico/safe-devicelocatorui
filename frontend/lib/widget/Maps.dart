import 'dart:io';

import 'package:flutter/material.dart';

import 'package:flutter_map/flutter_map.dart';
import 'package:frontend/model/Sensor.dart';
import 'package:frontend/providers/MapProvider.dart';
import 'package:frontend/providers/SensorProvider.dart';
import 'package:geojson/geojson.dart';
import "package:latlong/latlong.dart";
import 'package:provider/provider.dart';

class Maps extends StatefulWidget {
  @override
  _Maps createState() => _Maps();
}

class _Maps extends State<Maps> {
  List<Sensor> sensors = [];
  List<Marker> markers = [];
  double _maxZoom = 22.0;
  double _minZoom = 4.0;
  String tilesPath = Platform.isLinux
      ? "/home/${Platform.environment['USER']}/.local/share/safemap/tiles"
      : "${Platform.environment['LOCALAPPDATA']}\\Safe\\SafeMap\\data\\tiles";
  List<CircleMarker> _heatmapPoints = [];

  Marker _createMarker(Sensor sensor) {
    return Marker(
        width: 35.0,
        height: 35.0,
        point: sensor.getLatLng(),
        builder: (ctx) => CircleAvatar(
            radius: 40,
            backgroundColor: sensor.getStatus() ? Colors.green : Colors.red,
            child: Icon(
              sensor.getStatus()
                  ? Icons.check_outlined
                  : Icons.warning_amber_rounded,
              color: sensor.getStatus() ? Colors.black : Colors.yellow[400],
              size: 30,
            )));
  }

  CircleMarker _createHeatmapPoint(LatLng point) {
    return CircleMarker(
        point: point, radius: 10, color: Colors.red);
  }

  @override
  void initState() {
    sensors.addAll(context.read<SensorProvider>().getSensors());
    for (Sensor sensor in sensors) markers.add(_createMarker(sensor));
    final points = context.read<SensorProvider>().getHeatmapPoints();
    for (GeoJsonPoint point in points) _heatmapPoints.add(_createHeatmapPoint(LatLng(point.geoPoint.latitude, point.geoPoint.longitude)));
    super.initState();
  }

  @override
  Widget build(BuildContext context) {

    return Container(
      width: 1030,
      alignment: Alignment.centerLeft,
      child: Stack(
        children: [
          FlutterMap(
            mapController: context.watch<MapProvider>().getMapController(),
            options: MapOptions(
              center: LatLng(43.140360, 13.068770),
              zoom: context.watch<MapProvider>().getCurrentZoom(),
              maxZoom: _maxZoom,
              pinchZoomThreshold: 1.0,
            ),
            layers: [
              TileLayerOptions(
                urlTemplate:
                    "http://tile.thunderforest.com/cycle/{z}/{x}/{y}.png" /*Platform.isLinux?"$tilesPath/{z}/{x}/{y}.png":"$tilesPath\\{z}\\{x}\\{y}.png"*/,
                maxZoom: _maxZoom,
              ),
              MarkerLayerOptions(
                markers: markers,
              ),
              CircleLayerOptions(circles:_heatmapPoints,)
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
              onPressed:
                  context.read<MapProvider>().getCurrentZoom() == _maxZoom
                      ? null
                      : context.read<MapProvider>().zoomIn,
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
              onPressed:
                  context.read<MapProvider>().getCurrentZoom() == _minZoom
                      ? null
                      : context.read<MapProvider>().zoomOut,
            ),
          ),
        ],
      ),
    );
  }
}
