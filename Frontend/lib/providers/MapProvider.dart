import 'package:flutter/material.dart';
import 'package:provaproject/services/MapService.dart';

class MapProvider with ChangeNotifier {
  MapService _mapService;

  MapProvider(_mapService);

  Future downloadMap() async {
    _mapService.downloadMap(0, 0, 18);
  }
}
