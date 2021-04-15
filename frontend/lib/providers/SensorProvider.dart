import 'dart:io';

import 'package:flutter/material.dart';
import 'package:frontend/model/Sensor.dart';
import 'package:frontend/services/SensorService.dart';
import 'package:geojson/geojson.dart';

class SensorProvider with ChangeNotifier {
  SensorService _sensorService;

  Set<Sensor> _sensors = new Set();
  Set<GeoJsonPoint> _heatmapPoints = new Set();

  SensorProvider(this._sensorService);

  Future readLocalDataSensors() async {
    _sensors.addAll((await _sensorService.readLocalDataSensors()));
    notifyListeners();
  }

  Future updateSensors(String id) async {
    _sensors.addAll((await _sensorService.getSensors(id)));
    notifyListeners();
  }

  List<Sensor> getSensors() {
    return _sensors.toList();
  }

  Future readGeoJson() async {
    try{
    File file = File("${Platform.environment['LOCALAPPDATA']}\\Safe\\SafeMap\\data\\earthquakes.geojson");
    final points = await featuresFromGeoJsonFile(file);
    points.collection.forEach((element) {_heatmapPoints.add(element.geometry);});
    } catch(e){
      print(e.toString());
    }
  }

  List<GeoJsonPoint> getHeatmapPoints(){
    return _heatmapPoints.toList();
  }
}
