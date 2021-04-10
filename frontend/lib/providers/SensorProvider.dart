import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:frontend/model/Sensor.dart';
import 'package:frontend/services/SensorService.dart';
import "package:latlong/latlong.dart";

class SensorProvider with ChangeNotifier {
  SensorService _sensorService;
  String sensorsPath =
      "/home/${Platform.environment['USER']}/.local/share/safemap/sensors/sensors.json";

  List<Sensor> sensors = [];

  SensorProvider(_sensorService);

  readLocalDataSensors() async {
    String response = await rootBundle.loadString(sensorsPath);
    var jsonSensors = json.decode(response);
    for (var sensor in jsonSensors) {
      sensors.add(new Sensor(sensor["id"], sensor["name"],
          LatLng(sensor["lat"], sensor["lng"]), sensor["status"]));
    }
    notifyListeners();
  }

  Future updateSensors(String id) async {
    sensors.addAll((await _sensorService.getSensors(id)));
    notifyListeners();
  }

  List<Sensor> getSensors() {
    return sensors;
  }
}
