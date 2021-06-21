use crate::map;

mod city_info;

pub struct CityInfo{
    pub simple_name: String,
    pub complete_name: String,
    pub bounds: Bounds
}

pub struct Bounds {
    pub(crate) north: f32,
    pub(crate) south: f32,
    pub(crate) east: f32,
    pub(crate) west: f32
}

#[derive(Debug, Clone)]
pub struct ApiError{
    pub(crate) message: String
}

impl CityInfo {
    pub async fn get_for(name: String, api_key: String) -> Result<CityInfo, ApiError>{
        let response = city_info::make_request(name.to_owned(),api_key).await?;
        let city_json = city_info::get_first_city_match(response)?;
        let complete_name = city_info::get_formatted_name(city_json.to_owned())?;
        let json_bounds = city_info::get_json_bounds(city_json.to_owned())?;
        let bounds = Bounds::from_json(json_bounds.to_owned()).map_err(|e| {ApiError{message: e.to_string()}})?;
        Ok(CityInfo{simple_name: str::replace(name.as_str(), " ", "_"), complete_name,bounds})
    }
}