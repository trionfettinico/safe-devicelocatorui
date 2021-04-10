import 'package:frontend/model/Sensor.dart';

abstract class SensorService {
  Future<List<Sensor>> getSensors(String id);
}
