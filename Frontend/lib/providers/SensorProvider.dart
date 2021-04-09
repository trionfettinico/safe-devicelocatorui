import 'package:flutter/material.dart';
import 'package:frontend/model/Sensor.dart';
import 'package:frontend/services/SensorService.dart';
import "package:latlong/latlong.dart";

class SensorProvider with ChangeNotifier {
  SensorService _sensorService;

  List<Sensor> sensors = [
    Sensor("0", LatLng(43.144118, 13.060696)),
    Sensor("1", LatLng(43.145463, 13.067670)),
    Sensor("2", LatLng(43.143224, 13.080657)),
    Sensor("3", LatLng(43.149503, 13.063626))
  ];

  SensorProvider(_sensorService);

  Future updateSensors(String id) async {
    sensors.addAll((await _sensorService.getSensors(id)));
    notifyListeners();
  }

  List<Sensor> getSensors() {
    return sensors;
  }
}
