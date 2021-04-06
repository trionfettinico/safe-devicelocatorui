import 'package:http/http.dart';
import 'dart:convert';
import 'package:provaproject/exceptions/BackendException.dart';

class AnalyzesResponse {
  static final AnalyzesResponse _singleton = AnalyzesResponse._internal();

  factory AnalyzesResponse() {
    return _singleton;
  }

  AnalyzesResponse._internal();

  checkResponse(Response response) {
    if (response.statusCode == 200)
      return;
    else {
      throw (BackendException(json.decode(response.body)["message"]));
    }
  }
}
