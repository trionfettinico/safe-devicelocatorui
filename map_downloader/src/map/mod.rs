use crate::device;

mod coordinates;
mod tiles;

#[derive (Eq, PartialEq, Hash)]
pub struct TileCoords {
    pub zoom: i32,
    pub x: i32,
    pub y: i32
}

pub async fn download_map(lat: f32, lon: f32){
    let devices = device::get_devices();

    let coordinates = coordinates::get_tiles_coordinates(lat, lon, devices);

    tiles::get_map_tiles(coordinates).await;
}