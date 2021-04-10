import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import "package:latlong/latlong.dart";
import 'package:frontend/services/MapService.dart';

class MapProvider with ChangeNotifier {
  MapService _mapService;

  MapController _mapController = MapController();
  double _currentZoom = 15.0;

  MapProvider(_mapService);

  Future downloadMap() async {
    _mapService.downloadMap(0, 0, 18);
  }

  MapController getMapController() {
    return _mapController;
  }

  double getCurrentZoom() {
    return _currentZoom;
  }

  zoomOut() {
    _currentZoom = _currentZoom - 1;
    _mapController.move(_mapController.center, _currentZoom);
    notifyListeners();
  }

  zoomIn() {
    _currentZoom = _currentZoom + 1;
    _mapController.move(_mapController.center, _currentZoom);
    notifyListeners();
  }

  moveToSensor(LatLng latLng) {
    _mapController.move(latLng, _currentZoom);
  }
}
