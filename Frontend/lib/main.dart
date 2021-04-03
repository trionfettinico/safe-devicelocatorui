import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import "package:latlong/latlong.dart";

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FlutterMap(
        options: MapOptions(
          center: LatLng(43.13, 13.05),
          zoom: 15.0,
          maxZoom: 20,
          swPanBoundary: LatLng(43.112, 13.028),
          nePanBoundary: LatLng(43.153, 13.098),
        ),
        layers: [
          TileLayerOptions(
            tileProvider: AssetTileProvider(),
            urlTemplate: "assets/camerino/{z}_{x}_{y}.png",
          ),
        ],
      ),
    );
  }
}
