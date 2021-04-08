import 'package:flutter/material.dart';
import 'package:provaproject/providers/MapProvider.dart';
import 'package:provaproject/widget/CardSensor.dart';
import 'package:provaproject/widget/Maps.dart';
import 'package:provider/provider.dart';

class PrincipalView extends StatefulWidget {
  @override
  _PrincipalView createState() => _PrincipalView();
}

class _PrincipalView extends State<PrincipalView> {
  var _zoom = 15.0;

  @override
  void initState() {
    // TODO: implement initState
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
          Maps(),
        ],
      ),
    );
  }
}
