import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:frontend/model/Sensor.dart';

class MarkerPopup extends StatefulWidget {
  final Marker marker;

  MarkerPopup(this.marker, {Key key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _MarkerPopupState(marker);
}

class _MarkerPopupState extends State<MarkerPopup> {
  final Marker _marker;

  _MarkerPopupState(this._marker);

  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Padding(
              padding: EdgeInsets.only(left: 20, right: 10),
            ),
            _cardDescription(context),
          ],
        ),
      ),
    );
  }

  Widget _cardDescription(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: Container(
        constraints: BoxConstraints(minWidth: 100, maxWidth: 200),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Text(
              'Position: ${_marker.point.latitude}, ${_marker.point.longitude}',
              overflow: TextOverflow.fade,
              softWrap: false,
              style: const TextStyle(
                fontWeight: FontWeight.w500,
                fontSize: 14.0,
              ),
            ),
            const Padding(padding: EdgeInsets.symmetric(vertical: 4.0)),
            // Text(
            //   'Position: ${_marker.getLat()}, ${_marker.getLng()}',
            //   style: const TextStyle(fontSize: 12.0),
            // ),
            // Text(
            //   'Status = ${_marker.getStatus()}',
            //   style: const TextStyle(fontSize: 12.0),
            // ),
          ],
        ),
      ),
    );
  }
}
