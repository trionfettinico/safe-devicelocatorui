import 'package:frontend/controllers/SensorController.dart';
import 'package:frontend/model/Sensor.dart';
import 'package:frontend/services/SensorService.dart';

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
