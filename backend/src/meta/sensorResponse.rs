#[derive(Serialize, Deserialize, Debug)]
pub struct GetResponse {
  pub _id: bson::oid::ObjectId,
  pub email: String,
  pub first_name: String,
  pub last_name: String,
}