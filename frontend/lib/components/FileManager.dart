import 'dart:io';

import 'package:flutter_archive/flutter_archive.dart';

class FileManager {
  static final FileManager _singleton = FileManager._internal();

  factory FileManager() {
    return _singleton;
  }

  FileManager._internal();

  Future<bool> extractFile(
      File mapCompress, Directory extractToDirectory) async {
    ZipFile.extractToDirectory(
        zipFile: mapCompress, destinationDir: extractToDirectory);
    return true;
  }
}
