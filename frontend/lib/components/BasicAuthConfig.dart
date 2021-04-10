const aMail = "sudo@mail.com";
const aPsw = "Doit";

class BasicAuthConfig {
  static final BasicAuthConfig _singleton = BasicAuthConfig._internal();

  factory BasicAuthConfig() {
    return _singleton;
  }

  BasicAuthConfig._internal();

  Map<String, String> getBaseHeader() {
    return {"content-type": "application/json", "accept": "application/json"};
  }
}
