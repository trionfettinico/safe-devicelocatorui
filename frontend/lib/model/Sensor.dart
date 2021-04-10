import "package:latlong/latlong.dart";

class Sensor {
  String _id;
  String _name;
  LatLng _latLng;
  bool _status;

  Sensor(this._id, this._name, this._latLng, this._status);

  String getId() {
    return _id;
  }

  LatLng getLatLng() {
    return _latLng;
  }

  double getLat() {
    return _latLng.latitude;
  }

  double getLng() {
    return _latLng.longitude;
  }

  String getName() {
    return _name;
  }

  bool getStatus() {
    return _status;
  }
}
