import 'dart:io';

import 'package:path_provider/path_provider.dart';
import 'package:frontend/components/AnalyzesResponse.dart';
import 'package:frontend/components/BasicAuthConfig.dart';
import 'package:http/http.dart' as http;

class MapController {
  String _baseUrl;

  MapController(String ip) {
    _baseUrl = "http://$ip:8080/safeproject/api/maps";
  }

  Future<File> getMapCompress(int x, int y, int z) async {
    http.Response response = await http.get(Uri.parse("$_baseUrl/$x/$y/$z"),
        headers: BasicAuthConfig().getBaseHeader());
    AnalyzesResponse().checkResponse(response);
    String dir = (await getTemporaryDirectory()).path;
    File file = new File('$dir/maps.zip');
    return await file.writeAsBytes(response.bodyBytes);
  }
}
