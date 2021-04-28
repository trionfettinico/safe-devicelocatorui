import 'dart:io';

import 'package:flutter/material.dart';

import 'package:flutter_map/flutter_map.dart';
import 'package:flutter_map_marker_popup/flutter_map_marker_popup.dart';
import 'package:frontend/providers/MapProvider.dart';
import 'package:frontend/providers/SensorProvider.dart';
import 'package:frontend/widget/PopupSensors.dart';
import "package:latlong/latlong.dart";
import 'package:provider/provider.dart';

class Maps extends StatefulWidget {
  @override
  _Maps createState() => _Maps();
}

class _Maps extends State<Maps> {
  double _maxZoom = 22.0;
  double _minZoom = 3.0;
  final PopupController _popupLayerController = PopupController();
  String tilesPath = Platform.isLinux
      ? "/home/${Platform.environment['USER']}/.local/share/safemap/tiles"
      : "${Platform.environment['LOCALAPPDATA']}\\Safe\\SafeMap\\data\\tiles";

  @override
  void initState() {
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
              plugins: [PopupMarkerPlugin()],
              center: LatLng(43.140360, 13.068770),
              zoom: context.watch<MapProvider>().getCurrentZoom(),
              maxZoom: _maxZoom,
              pinchZoomThreshold: 1.0,
              onTap: (_) => _popupLayerController.hidePopup(),
            ),
            layers: [
              TileLayerOptions(
                urlTemplate:
                    "http://tile.thunderforest.com/cycle/{z}/{x}/{y}.png" /*Platform.isLinux?"$tilesPath/{z}/{x}/{y}.png":"$tilesPath\\{z}\\{x}\\{y}.png"*/,
                maxZoom: _maxZoom,
              ),
              MarkerLayerOptions(
                  markers: context.watch<SensorProvider>().getSensorMarkers()),
              MarkerLayerOptions(
                markers: context.watch<SensorProvider>().getHeatmapMarkers(),
              ),
              PopupMarkerLayerOptions(
                markers: context.watch<SensorProvider>().getSensorMarkers(),
                popupController: _popupLayerController,
                popupBuilder: (BuildContext _, Marker marker) =>
                    MarkerPopup(marker),
              )
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
