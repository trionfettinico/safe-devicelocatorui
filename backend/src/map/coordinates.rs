use crate::map::{TileCoords};
use std::collections::HashSet;
use json::{JsonValue, Error};
use crate::city_api::Bounds;

pub fn get_tiles_coordinates(bounds: Bounds, max_zoom: i32, min_zoom: i32) -> HashSet<TileCoords> {
    let mut coordinates = HashSet::new();

    for z in min_zoom..max_zoom+1 {
        let (min_x, min_y) = deg2num(bounds.north,bounds.west,z);
        let (max_x, max_y) = deg2num(bounds.south,bounds.east,z);
        for _x in min_x..max_x {
            for _y in min_y..max_y {
                coordinates.insert(TileCoords {
                    zoom: z,
                    x: _x,
                    y: _y,
                });
            }
        }
    }
    return coordinates;
}

pub(crate) fn deg2num(lat_deg: f32, lon_deg: f32, _zoom: i32) -> (i32, i32) {
    let lat_rad = lat_deg.to_radians();
    let mut n: f64 = 2.00;
    n = n.powi(_zoom);
    let x_tile = ((lon_deg as f64 + 180.0) / 360.0 * n) as i32;
    let y_tile =
        ((1.0 - (((lat_rad as f64).tan()).asinh()) / std::f64::consts::PI) / 2.0 * n) as i32;
    return (x_tile, y_tile);
}
