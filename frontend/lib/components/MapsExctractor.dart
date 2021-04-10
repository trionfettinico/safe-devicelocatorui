import 'dart:io';

import 'package:flutter_archive/flutter_archive.dart';

class MapsExctractor {
  static final MapsExctractor _singleton = MapsExctractor._internal();

  factory MapsExctractor() {
    return _singleton;
  }

  MapsExctractor._internal();

  Future<bool> extractMap(
      File mapCompress, Directory extractToDirectory) async {
    ZipFile.extractToDirectory(
        zipFile: mapCompress, destinationDir: extractToDirectory);
    return true;
  }
}
