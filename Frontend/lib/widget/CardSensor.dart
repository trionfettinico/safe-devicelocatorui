import 'package:flutter/material.dart';

class CardSensor extends StatefulWidget {
  const CardSensor({Key key}) : super(key: key);

  @override
  _CardSensor createState() => _CardSensor();
}

class _CardSensor extends State<CardSensor> {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      child: Card(
        child: ListTile(
          title: Text("sensorID"),
          subtitle: Text("State"),
          trailing: Text("directDistance"),
        ),
      ),
    );
  }
}
