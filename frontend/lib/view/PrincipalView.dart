import 'package:flutter/material.dart';
import 'package:frontend/providers/SensorProvider.dart';
import 'package:frontend/widget/CardListSensors.dart';
import 'package:frontend/widget/Maps.dart';
import 'package:provider/provider.dart';

class PrincipalView extends StatefulWidget {
  @override
  _PrincipalView createState() => _PrincipalView();
}

class _PrincipalView extends State<PrincipalView> {
  @override
  Widget build(BuildContext context) {
    Future.wait([context.read<SensorProvider>().readLocalDataSensors(),context.read<SensorProvider>().readGeoJson()]);

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
