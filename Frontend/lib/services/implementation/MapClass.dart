import 'dart:io';

import 'package:frontend/components/MapsExctractor.dart';
import 'package:frontend/controllers/MapController.dart';
import 'package:frontend/services/MapService.dart';

class MapClass implements MapService {
  MapController mapController;
  MapsExctractor exctractor;

  MapClass(String ip) {
    mapController = new MapController(ip);
    exctractor = new MapsExctractor();
  }

  @override
  Future<bool> downloadMap(int x, int y, int z) async {
    return exctractor.extractMap(
        await mapController.getMapCompress(x, y, z), Directory("assets"));
  }
}
