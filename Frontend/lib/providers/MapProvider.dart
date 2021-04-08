import 'package:flutter/material.dart';
import 'package:provaproject/services/MapService.dart';

class MapProvider with ChangeNotifier {
  MapService _mapService;

  double _zoom = 15.0;

  MapProvider(_mapService);

  Future downloadMap() async {
    _mapService.downloadMap(0, 0, 18);
  }

  void setZoom(double zoom) {
    _zoom = zoom;
    notifyListeners();
  }

  double getZoom() {
    return _zoom;
  }
}
