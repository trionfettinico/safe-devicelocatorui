import 'package:flutter/material.dart';
import 'package:frontend/widget/CardSensor.dart';
import 'package:frontend/widget/Maps.dart';

class PrincipalView extends StatefulWidget {
  @override
  _PrincipalView createState() => _PrincipalView();
}

class _PrincipalView extends State<PrincipalView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Row(
        children: [
          Container(
              width: 250,
              alignment: Alignment.centerLeft,
              child: ListView(
                children: [
                  CardSensor(),
                  CardSensor(),
                  CardSensor(),
                  CardSensor(),
                  CardSensor(),
                  CardSensor(),
                ],
              )),
          Maps(),
        ],
      ),
    );
  }
}
