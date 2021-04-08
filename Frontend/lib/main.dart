import 'package:flutter/material.dart';
import 'package:provaproject/providers/MapProvider.dart';
import 'package:provaproject/services/implementation/MapClass.dart';
import 'package:provaproject/view/PrincipalView.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MultiProvider(providers: [
    ChangeNotifierProvider(
        create: (context) => MapProvider(new MapClass("localhost")))
  ], child: SafeProject()));
}

class SafeProject extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MyApp();
  }
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: "SafeProject",
        debugShowCheckedModeBanner: false,
        home: PrincipalView());
  }
}
