import 'dart:convert';
import 'dart:io';

import 'package:frontend/controllers/SensorController.dart';
import 'package:frontend/model/Sensor.dart';
import 'package:frontend/services/SensorService.dart';
import "package:latlong/latlong.dart";

class SensorClass implements SensorService {
  SensorController sensorController;
  String sensorsPath =
      "/home/${Platform.environment['USER']}/.local/share/safemap/sensors/sensors.json";

  SensorClass(String ip) {
    sensorController = new SensorController(ip);
  }

  @override
  Future<List<Sensor>> getSensors(String id) {
    return sensorController.getSensors(id);
  }

  @override
  Future<List<Sensor>> readLocalDataSensors() async {
    List<Sensor> sensors = [];
    String response = await File(sensorsPath).readAsString();
    var jsonSensors = json.decode(response);
    for (var sensor in jsonSensors) {
      sensors.add(new Sensor(sensor["id"], sensor["name"],
          LatLng(sensor["lat"], sensor["lng"]), sensor["status"]));
    }
    return sensors;
  }
}
