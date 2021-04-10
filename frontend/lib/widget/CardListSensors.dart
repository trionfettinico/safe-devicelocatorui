import 'package:flutter/material.dart';
import 'package:frontend/model/Sensor.dart';
import 'package:frontend/providers/SensorProvider.dart';
import 'package:frontend/widget/CardSensor.dart';
import 'package:provider/provider.dart';

class CardListSensor extends StatefulWidget {
  const CardListSensor({Key key}) : super(key: key);

  @override
  _CardListSensor createState() => _CardListSensor();
}

class _CardListSensor extends State<CardListSensor> {
  List<CardSensor> cardsSensor = [];

  @override
  Widget build(BuildContext context) {
    List<Sensor> sensors = context.watch<SensorProvider>().getSensors();
    cardsSensor = [];
    for (Sensor sensor in sensors) cardsSensor.add(CardSensor(sensor: sensor));
    return Container(
        width: 250,
        alignment: Alignment.centerLeft,
        child: ListView(
          children: cardsSensor,
        ));
  }
}
