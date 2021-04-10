import 'package:flutter/material.dart';
import 'package:frontend/model/Sensor.dart';
import 'package:frontend/services/SensorService.dart';

class SensorProvider with ChangeNotifier {
  SensorService _sensorService;

  Set<Sensor> _sensors = new Set();

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
}
