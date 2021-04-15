type ID = String;

#[get("/sensor/<id>", format = "application/json")]
pub fn get(id: ID) -> JsonValue {
  let document = models::user::find_one(id.to_owned()).unwrap();
  let result = bson::from_bson::<meta::user::GetResponse>(bson::Bson::Document(document.unwrap()));

  match result {
    Ok(user) => {
      json!({
        "code": 200,
        "success": true,
        "data": user,
        "error": ""
      })
    },
    Err (_e) => {
      json!({
        "code": 400,
        "success": false,
        "data": {},
        "error": "An error has occured"
      })
    }
  }

}