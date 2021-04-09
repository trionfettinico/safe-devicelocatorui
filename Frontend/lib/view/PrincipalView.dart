import 'package:flutter/material.dart';
import 'package:frontend/widget/CardListSensors.dart';
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
          CardListSensor(),
          Maps(),
        ],
      ),
    );
  }
}
