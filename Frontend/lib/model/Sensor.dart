import "package:latlong/latlong.dart";

class Sensor {
  String _id;
  LatLng _latLng;

  Sensor(this._id, this._latLng);

  String getId() {
    return _id;
  }

  LatLng getLatLng() {
    return _latLng;
  }
}
