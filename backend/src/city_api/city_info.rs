use crate::city_api::{ApiError, Bounds};
use json::{JsonValue, Error};

pub(crate) async fn make_request(city_name: String, api_key: String) -> Result<JsonValue,ApiError> {
    let response = reqwest::get(&format!("http://api.opencagedata.com/geocode/v1/json?q={}&key={}", city_name, api_key)).await.map_err(|e| {ApiError{message: e.to_string()}})?;
    let response_text = response.text().await.map_err(|e| {ApiError{message: e.to_string()}})?;
    json::parse(&response_text).map_err(|e| {ApiError{message: e.to_string()}})
}

pub(crate) fn get_first_city_match(response: JsonValue) -> Result<JsonValue, ApiError> {
    if !response.has_key("results") || !response["results"].is_array() || !response["results"][0].is_object(){
        return Err(ApiError{message: "Response does not contain a city".parse().unwrap() })
    }
    Ok(response["results"][0].clone())
}

pub(crate) fn get_formatted_name(city_json: JsonValue) -> Result<String, ApiError> {
    if !city_json.has_key("formatted") || !city_json["formatted"].is_string(){
        return Err(ApiError{message: "City JSON does not contain a parsed name".parse().unwrap() })
    }
    let formatted = city_json["formatted"].as_str().ok_or(ApiError{message: "Error".parse().unwrap() })?;
    Ok(formatted.parse().unwrap())
}

pub(crate) fn get_json_bounds(city_json: JsonValue) -> Result<JsonValue, ApiError> {
    if !city_json.has_key("bounds") {
        return Err(ApiError{message: "City JSON does not contain bounds".parse().unwrap() })
    }
    Ok(city_json["bounds"].to_owned())
}

impl Bounds {
    pub fn from_json(value: JsonValue) -> Result<Bounds, Error>{
        let north = value["northeast"]["lat"].as_f32().ok_or(Error::FailedUtf8Parsing)?;
        let east = value["northeast"]["lng"].as_f32().ok_or(Error::FailedUtf8Parsing)?;
        let south = value["southwest"]["lat"].as_f32().ok_or(Error::FailedUtf8Parsing)?;
        let west = value["southwest"]["lng"].as_f32().ok_or(Error::FailedUtf8Parsing)?;
        Ok(Bounds{north,south,east,west})
    }
}