import 'package:flutter/material.dart';
import 'package:provaproject/widget/CardSensor.dart';
import 'package:provaproject/widget/Maps.dart';

class PrincipalView extends StatefulWidget {
  @override
  _PrincipalView createState() => _PrincipalView();
}

class _PrincipalView extends State<PrincipalView> {
  @override
  void initState() {
    super.initState();
  }

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
          Maps()
        ],
      ),
    );
  }
}
