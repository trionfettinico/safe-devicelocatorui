import 'dart:io';

import 'package:frontend/components/FileManager.dart';
import 'package:frontend/controllers/MapController.dart';
import 'package:frontend/services/MapService.dart';

class MapClass implements MapService {
  MapController mapController;
  FileManager exctractor;

  MapClass(String ip) {
    mapController = new MapController(ip);
    exctractor = new FileManager();
  }

  @override
  Future<bool> downloadMap(int x, int y, int z) async {
    return exctractor.extractFile(
        await mapController.getMapCompress(x, y, z), Directory("assets"));
  }
}
