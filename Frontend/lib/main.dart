import 'package:flutter/material.dart';
import 'package:provaproject/view/PrincipalView.dart';

void main() {
  runApp(SafeProject());
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
