import 'package:flutter/material.dart';
import 'package:frontend/model/Sensor.dart';
import 'package:frontend/services/SensorService.dart';

class SensorProvider with ChangeNotifier {
  SensorService _sensorService;

  List<Sensor> sensors = [];

  SensorProvider(_sensorService);

  Future getSensors(String id) async {
    sensors.addAll((await _sensorService.getSensors(id)));
    notifyListeners();
  }

  List<Sensor> getSensos() {
    return sensors;
  }
}
