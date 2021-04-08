import 'package:flutter/material.dart';
import 'package:frontend/providers/MapProvider.dart';
import 'package:frontend/services/implementation/MapClass.dart';
import 'package:frontend/view/PrincipalView.dart';
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
        home: PrincipalView(),
        theme: ThemeData(
            // Define the default brightness and colors.
            brightness: Brightness.dark,
            primaryColor: Color(0xFF4C9EEA),
            accentColor: Color(0xFF171F2A),
            scaffoldBackgroundColor: Color(0xFF171F2A)));
  }
}
