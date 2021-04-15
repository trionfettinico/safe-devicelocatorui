pub struct Sensor {
    pub id: String,
    pub name: String,
    pub lat: f32,
    pub lng: f32,
    pub status: bool,
    pub lastEdit: String //Iso8601String
}

imp Sensor{
    pub fn toBson() -> bson::ordered::OrderedDocument {
        doc! { 
          "id": self.id.to_owned(),
          "name": self.name.to_owned(),
          "lat": self.lat.to_owned(),
          "lng": self.lng.to_owned(),
          "status": self.status.to_owned(),
          "lastEdit": self.lastEdit.to_owned()
        }
    }

    

}

