import 'package:flutter/material.dart';
import 'package:frontend/model/Sensor.dart';
import 'package:frontend/providers/MapProvider.dart';
import 'package:provider/provider.dart';

class CardSensor extends StatefulWidget {
  final Sensor sensor;

  const CardSensor({Key key, @required this.sensor}) : super(key: key);

  @override
  _CardSensor createState() => _CardSensor();
}

class _CardSensor extends State<CardSensor> {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
        child: Card(
          child: ListTile(
            title: Text(widget.sensor.getName()),
            subtitle: widget.sensor.getStatus()
                ? Text(widget.sensor.getId() + "\ntrue")
                : Text(widget.sensor.getId() + "\nfalse"),
            trailing: Text("lat = " +
                widget.sensor.getLat().toString() +
                "\nlng = " +
                widget.sensor.getLng().toString()),
          ),
        ),
        onTap: () => context
            .read<MapProvider>()
            .moveToSensor(widget.sensor.getLatLng()));
  }
}
