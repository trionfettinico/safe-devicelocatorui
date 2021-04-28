import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:frontend/model/Sensor.dart';
import 'package:frontend/services/SensorService.dart';
import 'package:geojson/geojson.dart';
import "package:latlong/latlong.dart";

class SensorProvider with ChangeNotifier {
  SensorService _sensorService;

  Set<Sensor> _sensors = new Set();
  Set<GeoJsonFeature> _heatmapPoints = new Set();
  List<Marker> _sensorMarkers = [];
  List<Marker> _heatmapMarkers = [];

  SensorProvider(this._sensorService);

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

  Color getColor(double value) {
    int range = 5;
    int red = (255 * (value / range)).toInt();
    int green = (255 * (1 - (value / range))).toInt();
    return Color.fromARGB(0xFF, red, green, 00);
  }

  Marker _createHeatmapMarker(LatLng point, double value) {
    return Marker(
        width: 30.0,
        height: 30.0,
        point: point,
        builder: (context) => DecoratedBox(
              decoration: BoxDecoration(
                  backgroundBlendMode: BlendMode.color,
                  shape: BoxShape.circle,
                  gradient: RadialGradient(
                      colors: [getColor(value), Colors.transparent])),
              position: DecorationPosition.foreground,
            ));
  }

  Future readLocalDataSensors() async {
    _sensors = new Set();
    _sensors.addAll((await _sensorService.readLocalDataSensors()));
    for (Sensor sensor in _sensors) _sensorMarkers.add(_createMarker(sensor));
    notifyListeners();
  }

  Future updateSensors(String id) async {
    _sensors = new Set();
    _sensors.addAll((await _sensorService.getSensors(id)));
    for (Sensor sensor in _sensors) _sensorMarkers.add(_createMarker(sensor));
    notifyListeners();
  }

  List<Sensor> getSensors() {
    return _sensors.toList();
  }

  List<Marker> getSensorMarkers() {
    return _sensorMarkers;
  }

  Future readGeoJson() async {
    try {
      File file = File(Platform.isLinux
          ? "/home/${Platform.environment['USER']}/.local/share/safemap/data/sampling.geojson"
          : "${Platform.environment['LOCALAPPDATA']}\\Safe\\SafeMap\\data\\sampling.geojson");
      final points = await featuresFromGeoJsonFile(file);
      points.collection.forEach((element) {
        _heatmapPoints.add(element);
      });
      for (GeoJsonFeature element in _heatmapPoints)
        _heatmapMarkers.add(_createHeatmapMarker(
            LatLng(element.geometry.geoPoint.latitude,
                element.geometry.geoPoint.longitude),
            element.properties["mag"]));
      notifyListeners();
    } catch (e) {
      print(e.toString());
    }
  }

  List<GeoJsonPoint> getHeatmapPoints() {
    return _heatmapPoints.map((e) => e.geometry);
  }

  List<Marker> getHeatmapMarkers() {
    return _heatmapMarkers;
  }
}
