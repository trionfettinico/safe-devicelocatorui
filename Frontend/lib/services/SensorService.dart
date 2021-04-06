import 'package:provaproject/model/Sensor.dart';

abstract class SensorService {
  Future<List<Sensor>> getSensors(String id);
}
