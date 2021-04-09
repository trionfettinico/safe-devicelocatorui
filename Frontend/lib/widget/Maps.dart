import 'dart:io';

import 'package:flutter/material.dart';

import 'package:flutter_map/flutter_map.dart';
import 'package:frontend/model/Sensor.dart';
import 'package:frontend/providers/MapProvider.dart';
import 'package:frontend/providers/SensorProvider.dart';
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
  double _minZoom = 15.0;
  MapController _mapController = MapController();
  String tilesPath =
      "/home/${Platform.environment['USER']}/.local/share/safemap/tiles";

  Marker _createMarker(Sensor sensor) {
    return Marker(
        width: 35.0,
        height: 35.0,
        point: sensor.getLatLng(),
        builder: (ctx) => CircleAvatar(
            radius: 40,
            backgroundColor: Colors.red,
            child: Icon(
              Icons.warning_amber_rounded,
              color: Colors.yellow[400],
              size: 30,
            )));
  }

  @override
  Widget build(BuildContext context) {
    context.read<>().
    sensors.addAll(context.watch<SensorProvider>().getSensors());
    for (Sensor sensor in sensors) markers.add(_createMarker(sensor));

    return Container(
      width: 1030, //1030,
      alignment: Alignment.centerLeft,
      child: Stack(
        children: [
          FlutterMap(
            mapController: context.watch<MapProvider>().getMapController(),
            options: MapOptions(
              center: LatLng(43.140360, 13.068770),
              zoom: context.watch<MapProvider>().getCurrentZoom(),
              maxZoom: 22.0,
              swPanBoundary: LatLng(43.095360, 13.023770),
              nePanBoundary: LatLng(43.185360, 13.113770),
              pinchZoomThreshold: 1.0,
            ),
            layers: [
              TileLayerOptions(
                tileProvider: FileTileProvider(),
                urlTemplate: "$tilesPath/{z}/{x}/{y}.png",
                maxZoom: 22.0,
              ),
              MarkerLayerOptions(
                markers: markers,
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
