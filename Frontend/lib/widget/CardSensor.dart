import 'package:flutter/material.dart';
import 'package:frontend/model/Sensor.dart';
import 'package:frontend/providers/MapProvider.dart';
import 'package:provider/provider.dart';

class CardSensor extends StatefulWidget {
  final Sensor sensor;

  const CardSensor({Key key, this.sensor}) : super(key: key);

  @override
  _CardSensor createState() => _CardSensor();
}

class _CardSensor extends State<CardSensor> {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
        child: Card(
          child: ListTile(
            title: Text(widget.sensor.getId()),
            subtitle: Text("State"),
            trailing: Text("directDistance"),
          ),
        ),
        onTap: () => context
            .read<MapProvider>()
            .moveToSensor(widget.sensor.getLatLng()));
  }
}
