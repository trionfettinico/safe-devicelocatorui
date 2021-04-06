import 'package:provaproject/controllers/SensorController.dart';
import 'package:provaproject/model/Sensor.dart';
import 'package:provaproject/services/SensorService.dart';

class SensorClass implements SensorService {
  SensorController sensorController;

  SensorClass(String ip) {
    sensorController = new SensorController(ip);
  }

  @override
  Future<List<Sensor>> getSensors(String id) {
    return sensorController.getSensors(id);
  }
}
